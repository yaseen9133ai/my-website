"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile, suggestedQuestions } from "@/lib/data";

type Role = "user" | "assistant";
type Message = { id: string; role: Role; content: string };

const GREETING =
  "I'm Ahmed's digital twin — an AI that knows his career, research and stack. Ask me anything about his work.";

let seq = 0;
const nextId = () => `m${++seq}`;

/**
 * gpt-oss reliably emits light markdown despite instructions not to. Rather
 * than fight the model, render a tiny safe subset — bullets and **bold** — as
 * real elements. No HTML is ever interpreted, so nothing can be injected.
 */
function inline(text: string, keyBase: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={`${keyBase}-${i}`} className="font-semibold text-fg">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

function RichText({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let bullets: string[] = [];

  const flush = () => {
    if (!bullets.length) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="my-1.5 space-y-1.5">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="mt-[0.55rem] h-1 w-1 shrink-0 rotate-45 bg-accent/60" />
            <span>{inline(b, `li-${blocks.length}-${i}`)}</span>
          </li>
        ))}
      </ul>,
    );
    bullets = [];
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    if (bullet) {
      bullets.push(bullet[1]);
      continue;
    }
    flush();
    const stripped = line.replace(/^#{1,6}\s*/, "");
    if (!stripped.trim()) continue;
    blocks.push(
      <p key={`p-${blocks.length}`} className="my-1.5 first:mt-0 last:mb-0">
        {inline(stripped, `p-${blocks.length}`)}
      </p>,
    );
  }
  flush();

  return <>{blocks}</>;
}

export default function DigitalTwin() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Keep the transcript pinned to the newest content.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streaming]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Abort any in-flight request when the component goes away.
  useEffect(() => () => abortRef.current?.abort(), []);

  // Runs a completion for an existing transcript. `send` appends the question
  // first; `retry` reuses the transcript as-is so a failed turn is not doubled.
  const runCompletion = useCallback(
    async (history: Message[]) => {
      setError(null);
      const replyId = nextId();
      setMessages([...history, { id: replyId, role: "assistant", content: "" }]);
      setStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history.map(({ role, content }) => ({ role, content })),
          }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const detail = await res.json().catch(() => null);
          throw new Error(detail?.error ?? "The digital twin could not answer that one.");
        }
        if (!res.body) throw new Error("No response from the model.");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let answer = "";

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          answer += decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) => (m.id === replyId ? { ...m, content: answer } : m)),
          );
        }

        if (!answer.trim()) {
          throw new Error("The model returned an empty answer. Try rephrasing.");
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          // Stopped on purpose: drop the empty placeholder, keep any partial text.
          setMessages((prev) =>
            prev.filter((m) => !(m.id === replyId && m.content.trim() === "")),
          );
        } else {
          setMessages((prev) => prev.filter((m) => m.id !== replyId));
          setError((err as Error).message);
        }
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [],
  );

  const send = useCallback(
    (text: string) => {
      const question = text.trim();
      if (!question || streaming) return;
      setInput("");
      void runCompletion([
        ...messages,
        { id: nextId(), role: "user" as const, content: question },
      ]);
    },
    [messages, streaming, runCompletion],
  );

  const retry = useCallback(() => {
    if (streaming) return;
    const last = messages[messages.length - 1];
    if (last?.role === "user") void runCompletion(messages);
  }, [messages, streaming, runCompletion]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  function reset() {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setInput("");
    inputRef.current?.focus();
  }

  return (
    <>
      {/* ── Launcher ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setOpen(true)}
            aria-label="Open the digital twin chat"
            className="group fixed right-5 bottom-5 z-40 flex items-center gap-3 rounded-full border border-accent/30 bg-ink/90 py-2.5 pr-5 pl-3 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-colors duration-300 hover:border-accent/60 sm:right-7 sm:bottom-7"
          >
            <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/[0.1] font-mono text-[11px] font-bold text-accent">
              {profile.initials}
              <span className="pulse-dot absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="flex flex-col items-start leading-none">
              <span className="font-display text-[13.5px] font-semibold tracking-tight text-fg">
                Ask my digital twin
              </span>
              <span className="mt-1 font-mono text-[9.5px] tracking-[0.16em] text-muted uppercase">
                AI · trained on my CV
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Digital twin chat"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-3 z-50 flex h-[min(34rem,calc(100vh-3rem))] flex-col overflow-hidden rounded-2xl border border-line-strong bg-ink/95 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:inset-x-auto sm:right-7 sm:bottom-7 sm:h-[min(38rem,calc(100vh-6rem))] sm:w-[26rem]"
          >
            {/* Header */}
            <header className="flex shrink-0 items-center gap-3 border-b border-line px-4 py-3.5">
              <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/[0.1] font-mono text-[11px] font-bold text-accent">
                {profile.initials}
                <span className="pulse-dot absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent" />
              </span>
              <div className="min-w-0 flex-1 leading-none">
                <div className="font-display text-[14px] font-semibold tracking-tight">
                  Digital twin
                </div>
                <div className="mt-1 truncate font-mono text-[9.5px] tracking-[0.16em] text-muted uppercase">
                  AI · not Ahmed himself
                </div>
              </div>

              {messages.length > 0 && (
                <button
                  onClick={reset}
                  className="rounded-md px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-muted uppercase transition-colors hover:text-accent"
                >
                  Reset
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d="m4 4 8 8M12 4l-8 8" strokeLinecap="round" />
                </svg>
              </button>
            </header>

            {/* Transcript */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
              {messages.length === 0 && (
                <div>
                  <div className="panel rounded-xl rounded-tl-sm px-4 py-3 text-[13.5px] leading-relaxed text-fg-dim">
                    {GREETING}
                  </div>
                  <div className="mt-5">
                    <div className="font-mono text-[9.5px] tracking-[0.18em] text-muted uppercase">
                      Try asking
                    </div>
                    <div className="mt-3 flex flex-col gap-2">
                      {suggestedQuestions.map((q) => (
                        <button
                          key={q}
                          onClick={() => send(q)}
                          className="group rounded-lg border border-line bg-white/[0.02] px-3.5 py-2.5 text-left text-[13px] text-fg-dim transition-colors duration-300 hover:border-accent/40 hover:bg-accent/[0.05] hover:text-fg"
                        >
                          <span className="mr-2 text-accent/60">›</span>
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {messages.map((m, i) => {
                const isUser = m.role === "user";
                const isLast = i === messages.length - 1;
                return (
                  <div key={m.id} className={isUser ? "flex justify-end" : ""}>
                    <div
                      className={
                        isUser
                          ? "max-w-[85%] rounded-xl rounded-br-sm bg-accent/[0.12] px-4 py-2.5 text-[13.5px] leading-relaxed whitespace-pre-wrap text-fg"
                          : "panel max-w-[92%] rounded-xl rounded-tl-sm px-4 py-3 text-[13.5px] leading-relaxed text-fg-dim"
                      }
                    >
                      {isUser ? m.content : <RichText content={m.content} />}
                      {!isUser && isLast && streaming && (
                        <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-accent" />
                      )}
                    </div>
                  </div>
                );
              })}

              {error && (
                <div className="rounded-xl border border-accent-3/30 bg-accent-3/[0.07] px-4 py-3 text-[13px] leading-relaxed text-accent-3">
                  {error}
                  {messages[messages.length - 1]?.role === "user" && (
                    <button
                      onClick={retry}
                      disabled={streaming}
                      className="mt-2.5 block rounded-md border border-accent-3/40 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] uppercase transition-colors hover:bg-accent-3/10 disabled:opacity-50"
                    >
                      Try again
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={onSubmit}
              className="shrink-0 border-t border-line bg-ink-2/60 px-3 py-3"
            >
              <div className="flex items-end gap-2 rounded-xl border border-line bg-white/[0.02] px-3 py-2 transition-colors focus-within:border-accent/40">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = `${Math.min(e.target.scrollHeight, 112)}px`;
                  }}
                  onKeyDown={onKeyDown}
                  rows={1}
                  maxLength={1200}
                  placeholder="Ask about my career…"
                  aria-label="Ask the digital twin a question"
                  className="max-h-28 min-h-[1.5rem] flex-1 resize-none bg-transparent text-[13.5px] leading-relaxed text-fg placeholder:text-muted focus:outline-none"
                />
                {streaming ? (
                  <button
                    type="button"
                    onClick={() => abortRef.current?.abort()}
                    aria-label="Stop generating"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line-strong text-fg-dim transition-colors hover:text-fg"
                  >
                    <span className="h-2.5 w-2.5 rounded-[2px] bg-current" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    aria-label="Send question"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-[#04150f] transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:bg-white/[0.06] disabled:text-muted disabled:hover:scale-100"
                  >
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
                      <path d="M8 13V3M4 7l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
              </div>
              <p className="mt-2 px-1 text-center font-mono text-[9.5px] tracking-[0.1em] text-muted">
                AI-generated · verify details against the résumé
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
