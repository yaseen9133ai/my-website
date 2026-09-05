import { Reveal, Section, SectionHeading, SpotlightCard, Tag } from "./primitives";
import { impact } from "@/lib/data";

export default function Impact() {
  return (
    <Section id="impact" className="border-t border-line bg-ink-2/40">
      <div className="shell">
        <SectionHeading
          index="02"
          eyebrow="AI Impact"
          title={
            <>
              Models that left the notebook and{" "}
              <span className="text-accent-gradient">went to production.</span>
            </>
          }
          lead="Three bodies of work that moved from research question to deployed system — and the constraints that shaped each one."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {impact.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.09}>
              <SpotlightCard className="panel h-full rounded-2xl p-7 sm:p-8">
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 mx-4 bg-line" />
                    <span className="h-1.5 w-1.5 rotate-45 bg-accent/60" />
                  </div>

                  <h3 className="mt-7 font-display text-[22px] leading-tight font-semibold tracking-tight text-balance">
                    {item.title}
                  </h3>

                  <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-muted">
                    {item.body}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {item.tags.map((t) => (
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
