import { profile, sections } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-2/60">
      <div className="shell py-10">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-line-strong bg-white/[0.03] font-mono text-[12px] font-bold text-accent">
              {profile.initials}
            </span>
            <div className="leading-tight">
              <div className="font-display text-[14px] font-semibold tracking-tight">
                {profile.name}
              </div>
              <div className="mt-0.5 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                {profile.location}
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase transition-colors hover:text-accent"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-9 flex flex-col-reverse gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10.5px] tracking-[0.1em] text-muted">
            © {new Date().getFullYear()} {profile.name}. Built with Next.js.
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase transition-colors hover:text-accent"
          >
            Back to top
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
