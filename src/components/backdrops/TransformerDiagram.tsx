import { motion } from "framer-motion";

const W = 1200;
const H = 360;

type Box = { x: number; y: number; w: number; h: number; label: string; sub?: string };
type Arrow = { from: Box; to: Box; label?: string };

const COL_W = 170;
const COL_GAP = 38;
const ROW_TOP = 70;
const BOX_H = 60;

const input: Box = { x: 0, y: ROW_TOP + 90, w: COL_W, h: BOX_H, label: "input", sub: "tokens" };
const embed: Box = { x: 0, y: ROW_TOP + 90, w: COL_W, h: BOX_H, label: "embed", sub: "+ pos" };
const attn: Box = { x: 0, y: ROW_TOP + 90, w: COL_W, h: BOX_H, label: "multi-head attn", sub: "Q · K · V" };
const norm1: Box = { x: 0, y: ROW_TOP + 90, w: COL_W, h: BOX_H, label: "add & norm" };
const ffn: Box = { x: 0, y: ROW_TOP + 90, w: COL_W, h: BOX_H, label: "feed-forward", sub: "GeLU · 4d" };
const norm2: Box = { x: 0, y: ROW_TOP + 90, w: COL_W, h: BOX_H, label: "add & norm" };
const head: Box = { x: 0, y: ROW_TOP + 90, w: COL_W, h: BOX_H, label: "lm head", sub: "softmax" };

const startX = (W - (7 * COL_W + 6 * COL_GAP)) / 2;
let cx = startX;
const cols: Box[] = [input, embed, attn, norm1, ffn, norm2, head];
cols.forEach((b) => {
  b.x = cx;
  cx += COL_W + COL_GAP;
});

const arrows: Arrow[] = [
  { from: input, to: embed },
  { from: embed, to: attn },
  { from: attn, to: norm1 },
  { from: norm1, to: ffn },
  { from: ffn, to: norm2 },
  { from: norm2, to: head },
];

export function TransformerDiagram() {
  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto"
        role="img"
        aria-label="Transformer block diagram"
      >
        <defs>
          <marker
            id="arrow"
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

        {/* faint baseline */}
        <line x1={40} y1={H / 2} x2={W - 40} y2={H / 2} stroke="hsl(240 5% 90%)" strokeWidth="0.6" />

        {/* arrows */}
        {arrows.map((a, i) => {
          const x1 = a.from.x + a.from.w;
          const x2 = a.to.x;
          const y = a.from.y + a.from.h / 2;
          return (
            <g key={`a-${i}`}>
              <line
                x1={x1 + 2}
                y1={y}
                x2={x2 - 2}
                y2={y}
                stroke="hsl(240 4% 46%)"
                strokeWidth="1"
                markerEnd="url(#arrow)"
              />
            </g>
          );
        })}

        {/* skip connection 1: around attn */}
        <SkipPath from={embed} to={norm1} yOffset={-32} />
        {/* skip connection 2: around ffn */}
        <SkipPath from={norm1} to={norm2} yOffset={-32} />

        {/* output bar */}
        <line
          x1={head.x + head.w + 4}
          y1={head.y + head.h / 2}
          x2={head.x + head.w + 60}
          y2={head.y + head.h / 2}
          stroke="hsl(240 4% 46%)"
          strokeWidth="1"
          markerEnd="url(#arrow)"
        />
        <text
          x={head.x + head.w + 64}
          y={head.y + head.h / 2 + 3}
          fill="hsl(240 4% 46%)"
          fontSize="10"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          p(next token)
        </text>

        {/* boxes */}
        {cols.map((b, i) => (
          <g key={`b-${i}`}>
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx={6}
              ry={6}
              fill="hsl(0 0% 100%)"
              stroke="hsl(240 5% 86%)"
              strokeWidth="1"
            />
            <text
              x={b.x + b.w / 2}
              y={b.y + b.h / 2 - (b.sub ? 4 : 0)}
              fill="hsl(240 6% 12%)"
              fontSize="13"
              fontWeight="500"
              textAnchor="middle"
              fontFamily="Inter, system-ui, sans-serif"
            >
              {b.label}
            </text>
            {b.sub && (
              <text
                x={b.x + b.w / 2}
                y={b.y + b.h / 2 + 14}
                fill="hsl(240 4% 46%)"
                fontSize="10"
                textAnchor="middle"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              >
                {b.sub}
              </text>
            )}
          </g>
        ))}

        {/* caption */}
        <text
          x={W / 2}
          y={H - 24}
          fill="hsl(240 4% 46%)"
          fontSize="11"
          textAnchor="middle"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          letterSpacing="2"
        >
          TRANSFORMER · N_LAYERS · CONTEXT WINDOW
        </text>
      </svg>

      {/* animated dots flowing along the diagram */}
      <FlowDots />
    </div>
  );
}

function SkipPath({ from, to, yOffset }: { from: Box; to: Box; yOffset: number }) {
  const x1 = from.x + from.w / 2;
  const x2 = to.x + to.w / 2;
  const y = from.y + from.h / 2;
  const path = `M ${x1} ${y} C ${x1} ${y + yOffset}, ${x2} ${y + yOffset}, ${x2} ${y}`;
  return (
    <g>
      <path d={path} fill="none" stroke="hsl(240 4% 60%)" strokeWidth="0.8" strokeDasharray="3 3" />
    </g>
  );
}

function FlowDots() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 w-full h-auto pointer-events-none"
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          r={1.8}
          fill="hsl(240 6% 12%)"
          initial={{ opacity: 0 }}
          animate={{
            cx: [120, 1080],
            cy: [H / 2, H / 2],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            delay: i * 1.8,
            ease: "linear",
          }}
        />
      ))}
    </svg>
  );
}