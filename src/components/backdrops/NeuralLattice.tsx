const W = 1600;
const H = 900;

const COLS = 18;
const ROWS = 10;
const STEP_X = W / COLS;
const STEP_Y = H / ROWS;

const NODES: { x: number; y: number }[] = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    NODES.push({ x: c * STEP_X + STEP_X / 2, y: r * STEP_Y + STEP_Y / 2 });
  }
}

const EDGES: [number, number][] = [];
NODES.forEach((_, i) => {
  const c = i % COLS;
  const r = Math.floor(i / COLS);
  if (c < COLS - 1) EDGES.push([i, i + 1]);
  if (r < ROWS - 1) EDGES.push([i, i + COLS]);
  // Diagonals for richer lattice
  if (c < COLS - 1 && r < ROWS - 1) EDGES.push([i, i + COLS + 1]);
  if (c > 0 && r < ROWS - 1) EDGES.push([i, i + COLS - 1]);
});

export function NeuralLattice() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full"
      aria-hidden
    >
      {EDGES.map(([a, b], i) => (
        <line
          key={`e-${i}`}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          stroke="hsl(240 6% 50%)"
          strokeWidth="0.5"
          strokeOpacity="0.35"
        />
      ))}
      {NODES.map((n, i) => (
        <circle key={`n-${i}`} cx={n.x} cy={n.y} r="1.4" fill="hsl(240 6% 18%)" fillOpacity="0.55" />
      ))}
    </svg>
  );
}