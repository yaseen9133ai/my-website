import { GhostLink, Reveal, Section, SectionHeading, SpotlightCard, Tag } from "./primitives";
import SlotGlyph from "./SlotGlyph";
import { profile } from "@/lib/data";

const slots = [
  {
    glyph: "graph" as const,
    title: "Sukuk graph explorer",
    blurb:
      "An interactive walkthrough of the verification pipeline — drop in a prospectus, watch it become a knowledge graph, and inspect where the GNN flags structural risk.",
    tags: ["GNN", "Knowledge Graph", "Next.js"],
    status: "In build",
  },
  {
    glyph: "eval" as const,
    title: "RAG evaluation playground",
    blurb:
      "Side-by-side retrieval strategies scored with RAGAS and DeepEval, so the trade-off between recall, faithfulness and latency is visible rather than argued.",
    tags: ["RAG", "RAGAS", "FastAPI"],
    status: "Planned",
  },
  {
    glyph: "agents" as const,
    title: "Multi-agent research desk",
    blurb:
      "A LangGraph crew that reads filings, cross-checks claims against sources, and hands back an annotated brief with every assertion traceable.",
    tags: ["LangGraph", "MCP", "Agents"],
    status: "Planned",
  },
  {
    glyph: "notes" as const,
    title: "Field notes",
    blurb:
      "Short technical write-ups on neuro-symbolic architectures, evaluation design, and what actually breaks when ML meets regulated finance.",
    tags: ["Writing", "Research"],
    status: "Planned",
  },
];

export default function Portfolio() {
  return (
    <Section id="portfolio" className="border-t border-line">
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="05"
            eyebrow="Portfolio"
            title={
              <>
                Case studies,{" "}
                <span className="text-accent-gradient">currently in build.</span>
              </>
            }
            lead="This section will hold deep-dive write-ups and live demos. The slots below are the ones being built first — links go live as each ships."
          />

          <Reveal delay={0.18}>
            <div className="flex shrink-0 flex-wrap gap-3">
              <GhostLink href={profile.github} external>
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                </svg>
                GitHub
              </GhostLink>
              <GhostLink href={profile.linkedin} external>
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M3.6 5.3H.9V16h2.7V5.3ZM2.25 0a1.57 1.57 0 1 0 0 3.13 1.57 1.57 0 0 0 0-3.13ZM16 9.9c0-3.1-1.66-4.55-3.87-4.55-1.79 0-2.59.98-3.03 1.67V5.3H6.4c.04.76 0 10.7 0 10.7h2.7V10.1c0-.24.02-.48.09-.65.19-.48.63-.98 1.37-.98.96 0 1.35.74 1.35 1.81V16H16V9.9Z" />
                </svg>
                LinkedIn
              </GhostLink>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {slots.map((slot, i) => (
            <Reveal key={slot.title} delay={i * 0.07}>
              <SpotlightCard className="group panel h-full rounded-2xl">
                {/* Hatched placeholder plate */}
                <div className="relative h-36 overflow-hidden border-b border-line bg-ink-2/50">
                  <div
                    className="absolute inset-0 opacity-[0.5]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 9px)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center px-10 pt-4 opacity-70 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100">
                    <SlotGlyph kind={slot.glyph} />
                  </div>
                  <span className="absolute top-4 left-6 font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                    slot / {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute top-4 right-6 rounded-full border border-line bg-ink/80 px-2.5 py-1 font-mono text-[9.5px] tracking-[0.14em] text-fg-dim uppercase backdrop-blur">
                    {slot.status}
                  </span>
                </div>

                <div className="p-7 sm:p-8">
                  <h3 className="font-display text-[21px] leading-tight font-semibold tracking-tight">
                    {slot.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{slot.blurb}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {slot.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                      soon →
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
