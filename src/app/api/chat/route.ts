import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/twin-context";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Override in .env to switch models without touching code.
const MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
// Overridable so the route can be pointed at a proxy or a local stub in tests.
const GROQ_URL =
  process.env.GROQ_BASE_URL || "https://api.groq.com/openai/v1/chat/completions";

const MAX_MESSAGES = 12; // trailing turns kept as context
const MAX_CHARS = 1200; // per message
const RATE_LIMIT = 20; // requests per window, per client
const WINDOW_MS = 60_000;
const RETRY_DELAYS_MS = [700, 1800]; // transient 429 / 5xx

type ChatMessage = { role: "user" | "assistant"; content: string };

const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Opportunistically drop stale buckets so the map cannot grow unbounded.
  if (hits.size > 500) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > RATE_LIMIT;
}

function isValid(m: unknown): m is ChatMessage {
  if (typeof m !== "object" || m === null) return false;
  const { role, content } = m as Record<string, unknown>;
  return (
    (role === "user" || role === "assistant") &&
    typeof content === "string" &&
    content.trim().length > 0
  );
}

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "The digital twin is not configured: GROQ_API_KEY is missing." },
      { status: 500 },
    );
  }

  const client =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(client)) {
    return NextResponse.json(
      { error: "That is a lot of questions at once — give it a minute and try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw) || raw.length === 0) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }

  const messages: ChatMessage[] = raw
    .filter(isValid)
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "No question to answer." }, { status: 400 });
  }

  const payload = JSON.stringify({
    model: MODEL,
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    stream: true,
    temperature: 0.4,
    max_tokens: 900,
    // gpt-oss is a reasoning model: keep the private reasoning short so the
    // answer starts quickly and the token budget goes to the answer itself.
    reasoning_effort: "low",
  });

  let upstream: Response | null = null;
  let lastStatus = 0;
  let retryAfterS = 0;
  let waitMs = 0;

  for (let attempt = 0; attempt < RETRY_DELAYS_MS.length + 1; attempt++) {
    if (attempt > 0) {
      await new Promise((r) => setTimeout(r, waitMs || RETRY_DELAYS_MS[attempt - 1]));
    }

    let res: Response;
    try {
      res = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: payload,
      });
    } catch (err) {
      console.error("Groq request failed:", err);
      return NextResponse.json(
        { error: "Could not reach Groq. Check your connection and try again." },
        { status: 502 },
      );
    }

    if (res.ok && res.body) {
      upstream = res;
      break;
    }

    lastStatus = res.status;
    const detail = await res.text().catch(() => "");
    console.error(`Groq error (attempt ${attempt + 1})`, lastStatus, detail.slice(0, 300));

    // Groq reports exactly how long the token/request window needs. Honour it
    // when the wait is short; otherwise stop and tell the user the real number.
    retryAfterS = Number(res.headers.get("retry-after")) || 0;
    waitMs = retryAfterS > 0 && retryAfterS <= 8 ? retryAfterS * 1000 : 0;
    if (lastStatus === 429 && retryAfterS > 8) break;

    // Only transient failures are worth retrying.
    if (lastStatus !== 429 && lastStatus < 500) break;
  }

  if (!upstream || !upstream.body) {
    const wait = retryAfterS > 0 ? ` Try again in about ${Math.ceil(retryAfterS)}s.` : "";
    const message =
      lastStatus === 401
        ? "Groq rejected the API key."
        : lastStatus === 429
          ? `Groq's rate limit was hit.${wait || " Give it a few seconds and ask again."}`
          : "The model is unavailable right now. Try again shortly.";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  // Translate the OpenAI-style SSE into a plain text stream of deltas. A
  // TransformStream is driven by the upstream body itself; an equivalent
  // ReadableStream with a pull() would stall once backpressure kicks in.
  //
  // Only `delta.content` is forwarded. gpt-oss also streams `delta.reasoning`
  // — its private chain of thought — which must never reach the browser.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const toPlainText = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      buffer += decoder.decode(chunk, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? ""; // keep the trailing partial line

      for (const line of lines) {
        const trimmed = line.trim();
        // SSE comment / keep-alive lines.
        if (!trimmed || trimmed.startsWith(":")) continue;
        if (!trimmed.startsWith("data:")) continue;

        const data = trimmed.slice(5).trim();
        if (data === "[DONE]") {
          controller.terminate();
          return;
        }

        try {
          const delta = JSON.parse(data)?.choices?.[0]?.delta?.content;
          if (typeof delta === "string" && delta.length > 0) {
            controller.enqueue(encoder.encode(delta));
          }
        } catch {
          // A frame split mid-JSON: the next chunk completes it.
        }
      }
    },
  });

  return new Response(upstream.body.pipeThrough(toPlainText), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
