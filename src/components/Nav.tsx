"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { profile, sections } from "@/lib/data";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.6] },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-ink/72 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="shell flex h-16 items-center justify-between sm:h-[72px]">
          <a href="#top" className="group flex items-center gap-3" aria-label="Back to top">
            <span className="relative grid h-9 w-9 place-items-center rounded-lg border border-line-strong bg-white/[0.03] font-mono text-[12px] font-bold tracking-tight text-accent transition-colors duration-300 group-hover:border-accent/50">
              {profile.initials}
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-[14px] font-semibold tracking-tight">
                {profile.name}
              </span>
              <span className="mt-1 font-mono text-[9.5px] tracking-[0.18em] text-muted uppercase">
                AI Engineer / Researcher
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-1 xl:flex">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`relative rounded-full px-3.5 py-2 text-[13px] transition-colors duration-300 ${
                  active === s.id ? "text-fg" : "text-muted hover:text-fg-dim"
                }`}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-line bg-white/[0.05]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{s.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.08] px-4 py-2 font-mono text-[11px] tracking-[0.12em] text-accent uppercase transition-colors duration-300 hover:bg-accent/[0.16] sm:inline-flex"
            >
              Résumé
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M8 2v9m0 0 3.2-3.2M8 11 4.8 7.8M3 13.5h10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white/[0.03] text-fg-dim transition-colors hover:text-fg xl:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-px w-4 bg-current transition-all duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-4 bg-current transition-all duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        <motion.div
          style={{ scaleX: progress }}
          className="h-px origin-left bg-gradient-to-r from-accent via-accent-2 to-transparent"
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl xl:hidden"
          >
            <div className="shell flex h-full flex-col justify-center gap-1 pt-16">
              {sections.map((s, i) => (
                <motion.a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                  className="group flex items-baseline gap-4 border-b border-line py-4 font-display text-3xl font-semibold tracking-tight text-fg-dim transition-colors hover:text-accent"
                >
                  <span className="font-mono text-[11px] text-muted">
                    0{i + 1}
                  </span>
                  {s.label}
                </motion.a>
              ))}
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-3 text-[13px] font-semibold text-[#04150f]"
              >
                Download résumé
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
