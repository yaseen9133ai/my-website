import { marquee } from "@/lib/data";

export default function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="relative border-y border-line bg-ink-2/60 py-4">
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-10 pr-10">
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-10 font-mono text-[11.5px] tracking-[0.16em] text-muted uppercase"
            >
              {item}
              <span className="h-1 w-1 rotate-45 bg-accent/50" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
