"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { Variants } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ── Scroll reveal ─────────────────────────────────────────────── */

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  shown: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "span";
}) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}

/* ── Section scaffolding ───────────────────────────────────────── */

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative scroll-mt-24 py-24 sm:py-32 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Reveal>
        <div
          className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
        >
          <span className="font-mono text-[11px] tracking-[0.22em] text-accent">{index}</span>
          <span className="h-px w-8 bg-line-strong" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.04] font-semibold text-balance">
          {title}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal delay={0.12}>
          <p className="mt-5 text-[15px] leading-relaxed text-muted sm:text-base">{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ── Tag / chip ────────────────────────────────────────────────── */

export function Tag({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "accent" }) {
  const tones = {
    default: "border-line bg-white/[0.03] text-fg-dim",
    accent: "border-accent/30 bg-accent/[0.07] text-accent",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10.5px] tracking-[0.08em] whitespace-nowrap uppercase ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/* ── Cursor-tracking spotlight card ────────────────────────────── */

export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`spotlight edge-glow relative overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

/* ── Count-up number ───────────────────────────────────────────── */

export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const numeric = parseFloat(value.replace(/[^\d.]/g, ""));
  const suffix = value.replace(/[\d.]/g, "");
  const reduced = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });
  const rounded = useTransform(spring, (v) => Math.round(v).toString());
  // Always starts at "0" so the server and the client agree on first paint —
  // the count only starts once the effects run.
  const [text, setText] = useState("0");

  useEffect(() => {
    if (!inView) return;
    // Reduced motion: land on the final value without the spring.
    if (reduced) spring.jump(numeric);
    else mv.set(numeric);
  }, [reduced, inView, mv, spring, numeric]);

  useEffect(() => rounded.on("change", setText), [rounded]);

  if (Number.isNaN(numeric)) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref} className="tabular-nums">
      {text}
      {suffix}
    </span>
  );
}

/* ── Buttons ───────────────────────────────────────────────────── */

export function PrimaryLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="shimmer group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-5 py-3 text-[13px] font-semibold tracking-tight text-[#04150f] transition-transform duration-300 hover:scale-[1.03] active:scale-100"
    >
      <span className="relative z-10">{children}</span>
      <svg
        className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

export function GhostLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.02] px-5 py-3 text-[13px] font-medium text-fg-dim transition-colors duration-300 hover:border-accent/40 hover:bg-accent/[0.06] hover:text-fg"
    >
      {children}
    </a>
  );
}
