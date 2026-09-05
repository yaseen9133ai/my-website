import { Reveal, Section, SectionHeading } from "./primitives";
import { certifications, education } from "@/lib/data";

export default function Credentials() {
  return (
    <Section id="credentials" className="border-t border-line">
      <div className="shell">
        <SectionHeading
          index="07"
          eyebrow="Credentials"
          title={
            <>
              Education and{" "}
              <span className="text-accent-gradient">certification.</span>
            </>
          }
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="eyebrow">Education</div>
            <ol className="mt-6 space-y-px overflow-hidden rounded-2xl border border-line bg-line">
              {education.map((e) => (
                <Reveal as="li" key={e.degree}>
                  <div className="group bg-ink px-7 py-7 transition-colors duration-500 hover:bg-ink-3 sm:px-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="font-display text-[18px] leading-tight font-semibold tracking-tight sm:text-[19px]">
                        {e.degree}
                      </h3>
                      <span className="font-mono text-[11px] tracking-[0.1em] text-accent">
                        {e.period}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 font-mono text-[11.5px] text-muted">
                      <span className="text-fg-dim">{e.school}</span>
                      <span className="text-line-strong">/</span>
                      <span>{e.location}</span>
                    </div>
                    {e.note ? (
                      <p className="mt-4 text-[14px] leading-relaxed text-muted">{e.note}</p>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5">
            <div className="eyebrow">Certifications</div>
            <ul className="mt-6 space-y-2.5">
              {certifications.map((c, i) => (
                <Reveal as="li" key={c} delay={i * 0.05}>
                  <div className="group flex items-start gap-4 rounded-xl border border-line bg-white/[0.015] px-5 py-4 transition-all duration-400 hover:border-accent/30 hover:bg-accent/[0.035]">
                    <span className="mt-0.5 font-mono text-[10px] tracking-[0.16em] text-accent/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[13.5px] leading-snug text-fg-dim">{c}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
