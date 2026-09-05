/**
 * Small schematic glyphs used as the visual plate for portfolio slots that
 * have not shipped yet — each one hints at what the case study will contain.
 */
export default function SlotGlyph({ kind }: { kind: "graph" | "eval" | "agents" | "notes" }) {
  const stroke = "rgba(61,242,192,0.55)";
  const faint = "rgba(255,255,255,0.16)";

  return (
    <svg
      viewBox="0 0 220 84"
      className="h-full w-full"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {kind === "graph" && (
        <g>
          <path
            d="M34 54 L70 26 M70 26 L112 44 M112 44 L156 22 M156 22 L192 46 M34 54 L112 44 M70 26 L156 22"
            stroke={faint}
            strokeWidth="1"
          />
          {[
            [34, 54, 4.5],
            [70, 26, 3],
            [112, 44, 6],
            [156, 22, 3],
            [192, 46, 4.5],
          ].map(([cx, cy, r], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              stroke={stroke}
              strokeWidth="1.2"
              fill="rgba(6,7,10,0.9)"
            />
          ))}
        </g>
      )}

      {kind === "eval" && (
        <g>
          {[
            [40, 30],
            [72, 46],
            [104, 22],
            [136, 52],
            [168, 34],
          ].map(([x, h], i) => (
            <rect
              key={i}
              x={x}
              y={68 - h}
              width="14"
              height={h}
              rx="2"
              stroke={i % 2 === 0 ? stroke : faint}
              strokeWidth="1.2"
            />
          ))}
          <path d="M28 68 H196" stroke={faint} strokeWidth="1" />
        </g>
      )}

      {kind === "agents" && (
        <g>
          <rect x="26" y="30" width="40" height="24" rx="4" stroke={stroke} strokeWidth="1.2" />
          <rect x="90" y="14" width="40" height="24" rx="4" stroke={faint} strokeWidth="1.2" />
          <rect x="90" y="46" width="40" height="24" rx="4" stroke={faint} strokeWidth="1.2" />
          <rect x="154" y="30" width="40" height="24" rx="4" stroke={stroke} strokeWidth="1.2" />
          <path
            d="M66 42 H78 M78 26 H90 M78 58 H90 M78 26 V58 M130 26 H142 M130 58 H142 M142 26 V58 M142 42 H154"
            stroke={faint}
            strokeWidth="1"
          />
        </g>
      )}

      {kind === "notes" && (
        <g>
          <rect x="62" y="12" width="96" height="60" rx="5" stroke={faint} strokeWidth="1.2" />
          {[26, 38, 50, 62].map((y, i) => (
            <path
              key={y}
              d={`M76 ${y} H${i === 3 ? 118 : 144}`}
              stroke={i === 0 ? stroke : faint}
              strokeWidth="1.2"
            />
          ))}
        </g>
      )}
    </svg>
  );
}
