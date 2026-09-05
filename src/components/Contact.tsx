"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { GhostLink, PrimaryLink, Reveal, Section } from "./primitives";
import { profile } from "@/lib/data";

const linkedinHandle = `/${profile.linkedin.split("/").filter(Boolean).slice(-2).join("/")}`;
const githubHandle = `@${profile.github.split("/").filter(Boolean).pop()}`;

const channels = [
  { label: "Location", value: profile.location, href: null },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s|-/g, "")}` },
  { label: "LinkedIn", value: linkedinHandle, href: profile.linkedin },
  { label: "GitHub", value: githubHandle, href: profile.github },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  }

  return (
    <Section id="contact" className="relative overflow-hidden border-t border-line">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full grid-bg opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_100%,#000_10%,transparent_75%)]" />
      <div className="pointer-events-none absolute -bottom-52 left-1/2 -z-10 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(61,242,192,0.13),transparent)] blur-2xl" />

      <div className="shell">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.22em] text-accent">08</span>
              <span className="h-px w-8 bg-line-strong" />
              <span className="eyebrow">Contact</span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="mt-7 text-[clamp(2.2rem,6vw,4.4rem)] leading-[0.98] font-bold tracking-[-0.035em] text-balance">
              <span className="text-gradient">Let&apos;s build something</span>
              <br />
              <span className="text-accent-gradient">worth verifying.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mx-auto mt-7 max-w-2xl text-[15.5px] leading-relaxed text-muted">
              Open to AI engineering roles, applied research collaborations, and
              advisory work at the intersection of machine learning and regulated
              finance.
            </p>
          </Reveal>

          {/* Email */}
          <Reveal delay={0.18}>
            <div className="mt-12 flex flex-col items-center gap-4">
              <div className="group flex w-full max-w-xl items-center justify-between gap-4 rounded-full border border-line bg-white/[0.025] py-2.5 pr-2.5 pl-6 backdrop-blur-sm transition-colors duration-400 hover:border-accent/35">
                <a
                  href={`mailto:${profile.email}`}
                  className="truncate font-mono text-[13px] text-fg-dim transition-colors group-hover:text-fg sm:text-[15px]"
                >
                  {profile.email}
                </a>
                <button
                  onClick={copyEmail}
                  className="relative shrink-0 rounded-full border border-line bg-ink px-4 py-2 font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase transition-colors hover:border-accent/40 hover:text-accent"
                  aria-label="Copy email address"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? "copied" : "copy"}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                      className="block"
                    >
                      {copied ? "Copied" : "Copy"}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <PrimaryLink href={`mailto:${profile.email}`}>Send an email</PrimaryLink>
                <GhostLink href={profile.resume} external>
                  Download résumé
                </GhostLink>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Channels */}
        <Reveal delay={0.24}>
          <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
            {channels.map((c) => {
              const inner = (
                <div className="h-full bg-ink px-6 py-7 transition-colors duration-400 group-hover:bg-ink-3">
                  <div className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                    {c.label}
                  </div>
                  <div className="mt-2.5 text-[14px] text-fg-dim transition-colors group-hover:text-accent">
                    {c.value}
                  </div>
                </div>
              );
              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="group"
                >
                  {inner}
                </a>
              ) : (
                <div key={c.label} className="group">
                  {inner}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
