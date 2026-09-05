import { Reveal, Section, SectionHeading, Tag } from "./primitives";
import { profile, researchInterests } from "@/lib/data";

const pillars = [
  {
    title: "Enterprise depth",
    body: "Twenty years inside SAP and IBM delivery — S/4HANA, CDS modelling, and financial localization for regulated MENA markets. I know what it takes for software to survive an audit.",
  },
  {
    title: "Applied ML",
    body: "Five years shipping machine learning that reached production: NER anonymization over millions of records, outage prediction, time-series forecasting on enterprise infrastructure.",
  },
  {
    title: "Research edge",
    body: "PhD work at INCEIF on neuro-symbolic AI — pairing graph neural networks with symbolic reasoning so a model's verdict on a financial instrument can actually be explained.",
  },
];

export default function About() {
  return (
    <Section id="about">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              index="01"
              eyebrow="About"
              title={
                <>
                  Enterprise rigour,{" "}
                  <span className="text-accent-gradient">research ambition.</span>
                </>
              }
            />

            <Reveal delay={0.16}>
              <p className="mt-8 text-[15px] leading-relaxed text-muted">
                {profile.summary}
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-8 border-l-2 border-accent/40 pl-5">
                <p className="font-display text-lg leading-snug font-medium text-fg-dim text-balance">
                  {profile.positioning}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-10">
                <div className="eyebrow">Research interests</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {researchInterests.map((r) => (
                    <Tag key={r}>{r}</Tag>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {pillars.map((p, i) => (
                <Reveal key={p.title} delay={0.1 + i * 0.09}>
                  <div className="group relative bg-ink px-7 py-8 transition-colors duration-500 hover:bg-ink-3 sm:px-9 sm:py-10">
                    <div className="flex items-start gap-5">
                      <span className="mt-1 font-mono text-[11px] tracking-[0.2em] text-accent/70">
                        0{i + 1}
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                          {p.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-muted">
                          {p.body}
                        </p>
                      </div>
                    </div>
                    <span className="absolute top-0 bottom-0 left-0 w-px origin-top scale-y-0 bg-gradient-to-b from-accent to-transparent transition-transform duration-500 group-hover:scale-y-100" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
