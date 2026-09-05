import { Reveal, Section, SectionHeading, SpotlightCard, Tag } from "./primitives";
import { projects } from "@/lib/data";

export default function Research() {
  const [featured, ...rest] = projects;

  return (
    <Section id="research" className="border-t border-line bg-ink-2/40">
      <div className="shell">
        <SectionHeading
          index="04"
          eyebrow="Research & projects"
          title={
            <>
              Systems that reason about{" "}
              <span className="text-accent-gradient">documents, risk and structure.</span>
            </>
          }
        />

        {/* Featured */}
        <Reveal>
          <SpotlightCard className="panel mt-16 rounded-2xl">
            <div className="grid gap-10 p-8 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-accent uppercase">
                    <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
                    {featured.status}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-[clamp(1.7rem,3.2vw,2.4rem)] leading-[1.08] font-semibold tracking-tight text-balance">
                  {featured.name}
                </h3>

                <p className="mt-3 font-mono text-[11.5px] tracking-[0.1em] text-muted">
                  {featured.org}
                </p>

                <p className="mt-6 text-[15px] leading-relaxed text-fg-dim">
                  {featured.summary}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {featured.tags.map((t) => (
                    <Tag key={t} tone="accent">
                      {t}
                    </Tag>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="eyebrow">Approach</div>
                <ol className="mt-5 space-y-px overflow-hidden rounded-xl border border-line bg-line">
                  {featured.points.map((p, i) => (
                    <li
                      key={p}
                      className="flex gap-5 bg-ink px-6 py-6 transition-colors duration-400 hover:bg-ink-3"
                    >
                      <span className="font-mono text-[11px] tracking-[0.16em] text-accent/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[14.5px] leading-relaxed text-muted">{p}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>

        {/* Rest */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.name} delay={0.08 + i * 0.08}>
              <SpotlightCard className="panel h-full rounded-2xl p-8 sm:p-9">
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                      {p.org}
                    </span>
                    <span className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[9.5px] tracking-[0.14em] text-fg-dim uppercase">
                      {p.status}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-[22px] leading-tight font-semibold tracking-tight text-balance">
                    {p.name}
                  </h3>

                  <p className="mt-3 text-[14.5px] leading-relaxed text-fg-dim">{p.summary}</p>

                  <ul className="mt-6 flex-1 space-y-2.5">
                    {p.points.map((point) => (
                      <li key={point} className="flex gap-3 text-[14px] leading-relaxed text-muted">
                        <span className="mt-[0.55rem] h-1 w-1 shrink-0 rotate-45 bg-accent/50" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
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
