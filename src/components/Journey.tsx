"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Reveal, Section, SectionHeading, Tag } from "./primitives";
import { journey, profile } from "@/lib/data";

const glance = [
  { value: "21", label: "Years of professional engineering, 2004 to today" },
  { value: "4", label: "Countries: Saudi Arabia, Egypt, UAE, Malaysia" },
  { value: "2", label: "Disciplines bridged: enterprise systems and applied AI" },
  { value: "3", label: "Degrees, culminating in PhD research at INCEIF" },
];

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 70%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <Section id="journey" className="border-t border-line">
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="Career journey"
          title={
            <>
              From ABAP in Dammam to{" "}
              <span className="text-accent-gradient">graph neural networks in KL.</span>
            </>
          }
          lead="Twenty-one years across four countries, two disciplines and one consistent thread: making systems that regulated industries can trust."
        />

        <div className="mt-14 grid gap-12 sm:mt-16 lg:grid-cols-12">
        <div ref={ref} className="relative lg:col-span-8">
          {/* Rail */}
          <div className="absolute top-2 bottom-2 left-[7px] w-px bg-line sm:left-[calc(6.5rem+7px)] lg:left-[calc(8.5rem+7px)]" />
          <motion.div
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-gradient-to-b from-accent via-accent to-accent-2 sm:left-[calc(6.5rem+7px)] lg:left-[calc(8.5rem+7px)]"
          />

          <ol className="space-y-3">
            {journey.map((role, i) => (
              <Reveal as="li" key={`${role.company}-${role.period}`} delay={i * 0.05}>
                <div className="group relative flex gap-6 sm:gap-10">
                  {/* Year gutter */}
                  <div className="hidden w-[6.5rem] shrink-0 pt-6 text-right lg:w-[8.5rem] sm:block">
                    <span className="font-mono text-[13px] tracking-[0.1em] text-muted transition-colors duration-300 group-hover:text-accent">
                      {role.start}
                    </span>
                  </div>

                  {/* Node */}
                  <div className="relative shrink-0 pt-[1.85rem]">
                    <span
                      className={`relative z-10 block h-[15px] w-[15px] rounded-full border-2 transition-all duration-300 ${
                        role.kind === "research"
                          ? "border-accent bg-ink shadow-[0_0_0_4px_rgba(61,242,192,0.12)]"
                          : "border-line-strong bg-ink group-hover:border-accent/70"
                      }`}
                    />
                  </div>

                  {/* Card */}
                  <div className="min-w-0 flex-1 rounded-xl border border-transparent px-1 py-6 transition-all duration-500 group-hover:border-line group-hover:bg-white/[0.018] group-hover:px-6 sm:py-7">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-display text-[19px] leading-tight font-semibold tracking-tight sm:text-[21px]">
                        {role.title}
                      </h3>
                      {role.kind === "research" && (
                        <span className="rounded-full border border-accent/30 bg-accent/[0.08] px-2 py-0.5 font-mono text-[9.5px] tracking-[0.14em] text-accent uppercase">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11.5px] text-muted">
                      <span className="text-fg-dim">{role.company}</span>
                      <span className="text-line-strong">/</span>
                      <span>{role.location}</span>
                      <span className="text-line-strong">/</span>
                      <span>{role.period}</span>
                    </div>

                    <ul className="mt-5 space-y-2.5">
                      {role.points.map((p) => (
                        <li key={p} className="flex gap-3 text-[14.5px] leading-relaxed text-muted">
                          <span className="mt-[0.6rem] h-1 w-1 shrink-0 rotate-45 bg-accent/50" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {role.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* At-a-glance rail */}
        <aside className="lg:col-span-4">
          <Reveal delay={0.12}>
            <div className="panel rounded-2xl p-7 lg:sticky lg:top-28">
              <div className="eyebrow">At a glance</div>
              <dl className="mt-6 space-y-5">
                {glance.map((g) => (
                  <div key={g.label} className="flex items-baseline gap-4">
                    <dt className="font-display text-2xl font-semibold tracking-tight text-accent">
                      {g.value}
                    </dt>
                    <dd className="text-[13.5px] leading-snug text-muted">{g.label}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 border-t border-line pt-6">
                <p className="text-[13.5px] leading-relaxed text-muted">
                  The full history — including certifications and localization
                  scope — is in the résumé.
                </p>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group mt-4 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-accent uppercase"
                >
                  Download PDF
                  <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                    ↓
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </aside>
        </div>
      </div>
    </Section>
  );
}
