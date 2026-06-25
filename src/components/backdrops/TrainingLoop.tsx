import { motion } from "framer-motion";

const W = 1200;
const H = 400;

type Stage = { x: number; y: number; w: number; h: number; label: string; sub?: string };

const stages: Stage[] = [
  { x: 80, y: 130, w: 200, h: 140, label: "forward", sub: "ŷ = f(x; θ)" },
  { x: 360, y: 130, w: 200, h: 140, label: "loss", sub: "L(ŷ, y)" },
  { x: 640, y: 130, w: 200, h: 140, label: "backward", sub: "∂L/∂θ" },
  { x: 920, y: 130, w: 200, h: 140, label: "step", sub: "θ ← θ - η∇L" },
];

export function TrainingLoop() {
  return (
    <div className="relative w-full h-full bg-card">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
      >
        <defs>
          <marker
            id="loop-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(240 4% 46%)" />
          </marker>
        </defs>

        {/* background grid */}
        <g opacity="0.6">
          {Array.from({ length: 30 }).map((_, i) => (
            <line
              key={`vx-${i}`}
              x1={i * 40}
              y1={0}
              x2={i * 40}
              y2={H}
              stroke="hsl(240 5% 93%)"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={`hx-${i}`}
              x1={0}
              y1={i * 40}
              x2={W}
              y2={i * 40}
              stroke="hsl(240 5% 93%)"
              strokeWidth="0.5"
            />
          ))}
        </g>

        {/* stage cards */}
        {stages.map((s, i) => (
          <g key={`s-${i}`}>
            <rect
              x={s.x}
              y={s.y}
              width={s.w}
              height={s.h}
              rx={10}
              ry={10}
              fill="hsl(0 0% 100%)"
              stroke="hsl(240 5% 86%)"
              strokeWidth="1"
            />
            {/* tiny node grid inside each stage */}
            <g opacity="0.7">
              {Array.from({ length: 4 }).map((_, r) =>
                Array.from({ length: 5 }).map((_, c) => (
                  <circle
                    key={`n-${i}-${r}-${c}`}
                    cx={s.x + 20 + c * 16}
                    cy={s.y + 18 + r * 14}
                    r="1.3"
                    fill={i === 3 ? "hsl(240 6% 12%)" : "hsl(240 4% 60%)"}
                  />
                ))
              )}
            </g>
            <text
              x={s.x + s.w / 2}
              y={s.y + s.h - 36}
              fill="hsl(240 6% 12%)"
              fontSize="15"
              fontWeight="600"
              textAnchor="middle"
              fontFamily="Inter, system-ui, sans-serif"
            >
              {s.label}
            </text>
            <text
              x={s.x + s.w / 2}
              y={s.y + s.h - 18}
              fill="hsl(240 4% 46%)"
              fontSize="11"
              textAnchor="middle"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            >
              {s.sub}
            </text>
          </g>
        ))}

        {/* arrows between stages */}
        {[0, 1, 2].map((i) => {
          const a = stages[i];
          const b = stages[i + 1];
          const x1 = a.x + a.w + 4;
          const x2 = b.x - 4;
          const y = a.y + a.h / 2;
          return (
            <line
              key={`la-${i}`}
              x1={x1}
              y1={y}
              x2={x2}
              y2={y}
              stroke="hsl(240 4% 46%)"
              strokeWidth="1.2"
              markerEnd="url(#loop-arrow)"
            />
          );
        })}

        {/* loop-back arc from "step" back to "forward" */}
        <path
          d="M 1020 270 C 1020 340, 180 340, 180 270"
          fill="none"
          stroke="hsl(240 4% 60%)"
          strokeWidth="1"
          strokeDasharray="4 4"
          markerEnd="url(#loop-arrow)"
        />
        <text
          x={600}
          y={330}
          fill="hsl(240 4% 46%)"
          fontSize="11"
          textAnchor="middle"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          letterSpacing="2"
        >
          REPEAT · NEXT BATCH
        </text>
      </svg>

      {/* animated data pulses along the arrows */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden
      >
        {[
          { x1: 280, x2: 360, y: 200, dur: 1.6, delay: 0 },
          { x1: 560, x2: 640, y: 200, dur: 1.6, delay: 0.4 },
          { x1: 840, x2: 920, y: 200, dur: 1.6, delay: 0.8 },
        ].map((seg, i) => (
          <motion.circle
            key={`p-${i}`}
            r={2.4}
            fill="hsl(240 6% 12%)"
            initial={{ cx: seg.x1, cy: seg.y, opacity: 0 }}
            animate={{ cx: [seg.x1, seg.x2], cy: seg.y, opacity: [0, 1, 1, 0] }}
            transition={{ duration: seg.dur, repeat: Infinity, delay: seg.delay, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
}