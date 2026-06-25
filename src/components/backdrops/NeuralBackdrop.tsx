import { useEffect, useRef } from "react";

const W = 1600;
const H = 900;

const LAYERS: number[] = [6, 8, 8, 6, 4];
const LAYER_X = (i: number) => 180 + (i * (W - 360)) / (LAYERS.length - 1);

function buildNodes() {
  const nodes: { x: number; y: number; r: number; layer: number; idx: number }[] = [];
  LAYERS.forEach((count, li) => {
    const x = LAYER_X(li);
    const span = H - 220;
    const top = 110;
    for (let i = 0; i < count; i++) {
      const y = top + (span / Math.max(1, count - 1)) * i;
      nodes.push({ x, y, r: li === 0 || li === LAYERS.length - 1 ? 5 : 4, layer: li, idx: i });
    }
  });
  return nodes;
}

const NODES = buildNodes();

const EDGES: { a: number; b: number }[] = [];
NODES.forEach((n) => {
  if (n.layer === LAYERS.length - 1) return;
  const nextLayer = LAYERS[n.layer + 1];
  for (let j = 0; j < nextLayer; j++) {
    const target = NODES.find((m) => m.layer === n.layer + 1 && m.idx === j);
    if (target) EDGES.push({ a: NODES.indexOf(n), b: NODES.indexOf(target) });
  }
});

export function NeuralBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    ctx.scale(dpr, dpr);

    // Pre-seed a deterministic pseudo-random for the loss curve
    const seedRand = mulberry32(0x4d1c55f);
    const lossHistory: { x: number; y: number }[] = [];
    const LOSS_LEN = 280;
    let lossT = 0;
    for (let i = 0; i < LOSS_LEN; i++) {
      const x = 1100 + i * 4.2;
      const baseY = 720 - Math.exp(-i / 60) * 380 - i * 0.4;
      const y = baseY + (seedRand() - 0.5) * 14;
      lossHistory.push({ x, y });
    }

    // Activation pulses traveling along edges
    const pulses: { edge: number; t: number; speed: number; bright: boolean }[] = [];
    const PULSE_COUNT = 36;
    for (let i = 0; i < PULSE_COUNT; i++) {
      pulses.push({
        edge: Math.floor(seedRand() * EDGES.length),
        t: seedRand(),
        speed: 0.0008 + seedRand() * 0.0014,
        bright: seedRand() > 0.7,
      });
    }

    let frame = 0;

    function draw() {
      if (!ctx) return;
      frame++;

      // Off-white canvas to match the Apple-style page
      ctx.fillStyle = "hsl(0 0% 99%)";
      ctx.fillRect(0, 0, W, H);

      // Faint dot grid (light)
      ctx.fillStyle = "hsl(240 5% 88%)";
      const gridStep = 28;
      for (let gx = 0; gx < W; gx += gridStep) {
        for (let gy = 0; gy < H; gy += gridStep) {
          ctx.beginPath();
          ctx.arc(gx, gy, 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Edges
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = "hsl(240 6% 78%)";
      for (const e of EDGES) {
        const a = NODES[e.a];
        const b = NODES[e.b];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Edge pulses — tiny dots traveling along edges
      for (const p of pulses) {
        p.t += p.speed;
        if (p.t > 1) {
          p.t = 0;
          p.edge = Math.floor(seedRand() * EDGES.length);
          p.bright = seedRand() > 0.85;
        }
        const a = NODES[EDGES[p.edge].a];
        const b = NODES[EDGES[p.edge].b];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx.beginPath();
        ctx.arc(x, y, p.bright ? 1.6 : 1.0, 0, Math.PI * 2);
        ctx.fillStyle = p.bright ? "hsl(240 6% 12%)" : "hsl(240 4% 46%)";
        ctx.fill();
      }

      // Nodes
      for (const n of NODES) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.layer === 0 || n.layer === LAYERS.length - 1 ? "hsl(240 6% 12%)" : "hsl(240 4% 46%)";
        ctx.fill();
        ctx.strokeStyle = "hsl(240 5% 70%)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Layer labels (top)
      ctx.fillStyle = "hsl(240 4% 46%)";
      ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "center";
      const labels = ["input", "h₁", "h₂", "h₃", "ŷ"];
      LAYERS.forEach((_, li) => {
        ctx.fillText(labels[li], LAYER_X(li), 60);
      });

      // Foreground loss curve panel (bottom-right)
      const PX = 1080;
      const PY = 640;
      const PW = 460;
      const PH = 200;
      ctx.strokeStyle = "hsl(240 5% 82%)";
      ctx.lineWidth = 0.6;
      ctx.strokeRect(PX, PY, PW, PH);
      ctx.fillStyle = "hsl(240 4% 46%)";
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "left";
      ctx.fillText("loss · 1 epoch", PX + 12, PY + 18);

      // Axes
      ctx.strokeStyle = "hsl(240 5% 78%)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(PX + 18, PY + 30);
      ctx.lineTo(PX + 18, PY + PH - 18);
      ctx.lineTo(PX + PW - 12, PY + PH - 18);
      ctx.stroke();

      // Slowly add new loss points
      if (frame % 6 === 0 && lossT < 80) {
        lossT++;
        const i = lossHistory.length - 1 + lossT;
        const x = 1100 + i * 4.2;
        const baseY = 720 - Math.exp(-i / 60) * 380 - i * 0.4;
        const y = baseY + (seedRand() - 0.5) * 14;
        lossHistory.push({ x, y });
      }

      // Clip to plot area
      ctx.save();
      ctx.beginPath();
      ctx.rect(PX + 18, PY + 30, PW - 30, PH - 48);
      ctx.clip();

      // Trend line (smoothed background)
      ctx.strokeStyle = "hsl(240 5% 70%)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      lossHistory.forEach((p, i) => {
        if (p.x < PX + 18 || p.x > PX + PW - 12) return;
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();

      // Animated head — a darker leading dot
      const head = lossHistory[lossHistory.length - 1];
      if (head) {
        ctx.fillStyle = "hsl(240 6% 12%)";
        ctx.beginPath();
        ctx.arc(head.x, head.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Tiny metric readouts under the plot
      ctx.fillStyle = "hsl(240 4% 46%)";
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "right";
      ctx.fillText("step " + lossHistory.length.toString().padStart(4, "0"), PX + PW - 14, PY + PH - 4);
      ctx.textAlign = "left";
      ctx.fillText("lr 3e-4", PX + 14, PY + PH - 4);

      // Tick marks on the y axis
      ctx.strokeStyle = "hsl(240 5% 78%)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 4; i++) {
        const ty = PY + 30 + ((PH - 48) / 3) * i;
        ctx.beginPath();
        ctx.moveTo(PX + 14, ty);
        ctx.lineTo(PX + 18, ty);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.35]"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <radialGradient id="hero-vignette" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="hsl(0 0% 99%)" stopOpacity="0" />
            <stop offset="100%" stopColor="hsl(0 0% 99%)" stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#hero-vignette)" />
      </svg>
    </div>
  );
}

// Tiny deterministic PRNG so the loss curve & pulse layout look the same each load
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}