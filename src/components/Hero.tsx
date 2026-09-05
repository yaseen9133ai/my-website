"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import GraphField from "./GraphField";
import { CountUp, GhostLink, PrimaryLink } from "./primitives";
import { profile, stats } from "@/lib/data";

const consoleLines = [
  { k: "focus", v: "Sukuk Integrity Verification Framework" },
  { k: "method", v: "GNN + symbolic reasoning" },
  { k: "corpus", v: "200–350 Malaysian sukuk prospectuses" },
  { k: "taxonomy", v: "12 risks / 6 categories" },
  { k: "institution", v: "INCEIF University, Kuala Lumpur" },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % profile.roles.length),
      2800,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative isolate min-h-screen overflow-hidden pt-28 pb-6">
      {/* Backdrop layers */}
      <div className="pointer-events-none absolute inset-0 -z-20 grid-bg grid-fade" />
      <GraphField className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[880px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(61,242,192,0.12),transparent)] blur-2xl" />
      <div className="pointer-events-none absolute top-1/3 -right-40 -z-10 h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(123,97,255,0.16),transparent)] blur-2xl" />
      <div className="noise pointer-events-none absolute inset-0 -z-10 opacity-[0.035] mix-blend-overlay" />

      <div className="shell flex min-h-[calc(100vh-8.5rem)] flex-col justify-between">
        <div className="grid flex-1 items-center gap-14 py-10 lg:grid-cols-12 lg:gap-10">
          {/* ── Left: identity ── */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] py-1.5 pr-4 pl-2 backdrop-blur-sm"
            >
              <span className="pulse-dot ml-1 h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="font-mono text-[10.5px] tracking-[0.14em] text-fg-dim uppercase">
                <span className="sm:hidden">Open to AI roles &amp; research</span>
                <span className="hidden sm:inline">{profile.status}</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 text-[clamp(2.9rem,8.2vw,6.4rem)] leading-[0.92] font-bold tracking-[-0.04em]"
            >
              <span className="text-gradient block">Ahmed</span>
              <span className="text-gradient block">Yaseen</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 flex h-7 items-center gap-3"
            >
              <span className="h-px w-10 bg-accent/60" />
              <div className="relative h-7 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ y: 26, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -26, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="block font-mono text-[13px] tracking-[0.18em] text-accent uppercase sm:text-[14px]"
                  >
                    {profile.roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="mt-8 max-w-xl text-[16px] leading-relaxed text-fg-dim sm:text-[17px]"
            >
              Two decades building enterprise systems that finance ministries and
              global corporations run on — now applying{" "}
              <span className="text-fg">graph neural networks and symbolic reasoning</span>{" "}
              to verify the integrity of financial instruments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <PrimaryLink href="#contact">Start a conversation</PrimaryLink>
              <GhostLink href={profile.resume} external>
                View résumé
              </GhostLink>
              <a
                href="#journey"
                className="ml-1 hidden font-mono text-[11px] tracking-[0.16em] text-muted uppercase transition-colors hover:text-accent sm:inline"
              >
                ↓ Career journey
              </a>
            </motion.div>
          </div>

          {/* ── Right: research console ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="float-slow relative">
              <div className="panel relative overflow-hidden rounded-2xl">
                <div className="flex items-center justify-between border-b border-line px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent/70" />
                    <span className="h-2 w-2 rounded-full bg-accent-3/50" />
                    <span className="h-2 w-2 rounded-full bg-accent-2/50" />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                    active_research
                  </span>
                </div>

                <div className="space-y-3 px-5 py-5">
                  {consoleLines.map((line, i) => (
                    <motion.div
                      key={line.k}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.75 + i * 0.11 }}
                      className="flex items-baseline gap-3 font-mono text-[11.5px] leading-relaxed"
                    >
                      <span className="w-[76px] shrink-0 text-right text-muted">
                        {line.k}
                      </span>
                      <span className="text-accent/50">›</span>
                      <span className="text-fg-dim">{line.v}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-line px-5 py-4">
                  <div className="mb-2 flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                    <span>Pipeline</span>
                    <span className="text-accent">LLM → KG → GNN</span>
                  </div>
                  <div className="flex gap-1.5">
                    {[
                      "Prospectus ingest",
                      "Entity extraction",
                      "Graph assembly",
                      "GNN inference",
                      "Symbolic check",
                    ].map((step, i) => (
                      <motion.div
                        key={step}
                        title={step}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 1.35 + i * 0.1 }}
                        className="h-1 flex-1 origin-left rounded-full"
                        style={{
                          background: `linear-gradient(90deg, rgba(61,242,192,${0.85 - i * 0.13}), rgba(123,97,255,${0.25 + i * 0.1}))`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,rgba(61,242,192,0.09),transparent)] blur-xl" />
            </div>
          </motion.div>
        </div>

        {/* ── Stat bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="grid grid-cols-2 border-t border-line lg:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`group px-1 py-5 sm:px-5 ${
                i > 0 ? "lg:border-l lg:border-line" : ""
              } ${i % 2 === 1 ? "border-l border-line pl-4 sm:pl-5 lg:pl-5" : ""}`}
            >
              <div className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                <CountUp value={s.value} />
              </div>
              <div className="mt-1.5 font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
                {s.label}
              </div>
              <p className="mt-2 max-w-[24ch] text-[12px] leading-snug text-muted">
                {s.detail}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
