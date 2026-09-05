import { Reveal, Section, SectionHeading } from "./primitives";
import { capabilities, skills } from "@/lib/data";

export default function Capabilities() {
  return (
    <Section id="capabilities" className="border-t border-line bg-ink-2/40">
      <div className="shell">
        <SectionHeading
          index="06"
          eyebrow="Capabilities & stack"
          title={
            <>
              What I can take from{" "}
              <span className="text-accent-gradient">prototype to production.</span>
            </>
          }
        />

        {/* Capability statements */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="group relative h-full bg-ink px-7 py-9 transition-colors duration-500 hover:bg-ink-3 sm:px-9 sm:py-10">
                <span className="font-mono text-[11px] tracking-[0.2em] text-accent/70">
                  {c.index}
                </span>
                <h3 className="mt-5 font-display text-[21px] leading-tight font-semibold tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-4 text-[14px] leading-relaxed text-muted">{c.body}</p>
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Skill matrix */}
        <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={0.04 + i * 0.04}>
              <div className="h-full bg-ink px-7 py-7 transition-colors duration-500 hover:bg-ink-3 sm:px-8">
                <div className="flex items-center gap-3">
                  <h3 className="font-mono text-[10.5px] tracking-[0.2em] text-accent uppercase">
                    {group.group}
                  </h3>
                  <span className="h-px flex-1 bg-line" />
                  <span className="font-mono text-[10px] text-muted">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-line bg-white/[0.025] px-2.5 py-1.5 text-[12.5px] text-fg-dim transition-colors duration-300 hover:border-accent/40 hover:text-fg"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
