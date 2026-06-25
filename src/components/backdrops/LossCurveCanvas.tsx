import { useEffect, useRef } from "react";

const W = 800;
const H = 800;

export function LossCurveCanvas() {
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

    // Deterministic RNG
    const rand = mulberry32(0xc0ffee);

    // Train/val loss series
    const STEPS = 220;
    const train: number[] = [];
    const val: number[] = [];
    for (let i = 0; i < STEPS; i++) {
      const decay = 2.6 * Math.exp(-i / 70) + 0.55 + i * 0.0008;
      train.push(decay + (rand() - 0.5) * 0.12);
      // Val diverges slightly later
      const valDecay = 2.55 * Math.exp(-i / 80) + 0.62 + i * 0.0010 + Math.max(0, i - 150) * 0.002;
      val.push(valDecay + (rand() - 0.5) * 0.14);
    }

    // A "weight update" heatmap underneath — 2D grid that slowly breathes
    const heatRows = 40;
    const heatCols = 60;
    const heatData: number[] = [];
    for (let r = 0; r < heatRows; r++) {
      for (let c = 0; c < heatCols; c++) {
        heatData.push(0);
      }
    }

    let t = 0;

    function frame() {
      if (!ctx) return;
      t += 0.015;

      // Off-white canvas to match the Apple-style page
      ctx.fillStyle = "hsl(0 0% 99%)";
      ctx.fillRect(0, 0, W, H);

      // Soft heatmap background — only fills the bottom half (darker = higher activation)
      const heatTop = H * 0.55;
      const heatH = H - heatTop - 40;
      const heatW = W - 80;
      const cellW = heatW / heatCols;
      const cellH = heatH / heatRows;

      // Slowly evolving heat values
      for (let r = 0; r < heatRows; r++) {
        for (let c = 0; c < heatCols; c++) {
          const i = r * heatCols + c;
          // Centered gaussian + radial wave from the middle + slow drift
          const cx = heatCols / 2;
          const cy = heatRows / 2;
          const dx = (c - cx) / cx;
          const dy = (r - cy) / cy;
          const r2 = dx * dx + dy * dy;
          const wave = Math.exp(-r2 * 3) * (0.6 + 0.4 * Math.sin(t * 1.4 + c * 0.4 + r * 0.3));
          const noise = (rand() - 0.5) * 0.06;
          heatData[i] = Math.max(0, Math.min(1, wave + noise));
        }
      }

      // Draw heatmap as grayscale dots (darker = higher activation on light bg)
      for (let r = 0; r < heatRows; r++) {
        for (let c = 0; c < heatCols; c++) {
          const v = heatData[r * heatCols + c];
          if (v < 0.05) continue;
          const x = 40 + c * cellW;
          const y = heatTop + r * cellH;
          const alpha = v * 0.45;
          ctx.fillStyle = `hsla(240, 6%, ${Math.round(40 - v * 28)}%, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x + cellW / 2, y + cellH / 2, Math.min(cellW, cellH) * 0.32, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Plot frame (top half)
      const PX = 80;
      const PY = 80;
      const PW = W - 160;
      const PH = 360;

      // Border + frame
      ctx.strokeStyle = "hsl(240 5% 82%)";
      ctx.lineWidth = 1;
      ctx.strokeRect(PX, PY, PW, PH);

      // Grid lines
      ctx.strokeStyle = "hsl(240 5% 92%)";
      ctx.lineWidth = 0.5;
      for (let g = 1; g < 8; g++) {
        const gx = PX + (PW / 8) * g;
        ctx.beginPath();
        ctx.moveTo(gx, PY);
        ctx.lineTo(gx, PY + PH);
        ctx.stroke();
      }
      for (let g = 1; g < 4; g++) {
        const gy = PY + (PH / 4) * g;
        ctx.beginPath();
        ctx.moveTo(PX, gy);
        ctx.lineTo(PX + PW, gy);
        ctx.stroke();
      }

      // y-axis tick labels
      ctx.fillStyle = "hsl(240 4% 46%)";
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "right";
      ["3.0", "2.0", "1.0", "0.0"].forEach((label, i) => {
        const y = PY + (PH / 3) * i + 3;
        ctx.fillText(label, PX - 10, y);
      });

      // x-axis tick labels
      ctx.textAlign = "center";
      ["0", "50", "100", "150", "200"].forEach((label, i) => {
        const x = PX + (PW / 4) * i;
        ctx.fillText(label, x, PY + PH + 18);
      });

      // Axis labels
      ctx.fillStyle = "hsl(240 4% 46%)";
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.fillText("step", PX + PW / 2, PY + PH + 36);
      ctx.save();
      ctx.translate(PX - 36, PY + PH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText("loss", 0, 0);
      ctx.restore();

      // Helper to map data → plot coords
      const xMap = (i: number) => PX + (i / (STEPS - 1)) * PW;
      const yMap = (v: number) => PY + PH - (v / 3.2) * PH;

      // Val curve (lighter, drawn first so train sits on top)
      ctx.strokeStyle = "hsl(240 4% 60%)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      val.forEach((v, i) => {
        const x = xMap(i);
        const y = yMap(v);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Train curve (main, dark)
      ctx.strokeStyle = "hsl(240 6% 12%)";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      train.forEach((v, i) => {
        const x = xMap(i);
        const y = yMap(v);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Animated cursor on the train curve
      const cursorIdx = Math.floor(((t * 30) % 220));
      const cx = xMap(cursorIdx);
      const cy = yMap(train[cursorIdx]);
      ctx.fillStyle = "hsl(240 6% 12%)";
      ctx.beginPath();
      ctx.arc(cx, cy, 2.6, 0, Math.PI * 2);
      ctx.fill();
      // crosshair
      ctx.strokeStyle = "hsl(240 5% 70%)";
      ctx.lineWidth = 0.6;
      ctx.setLineDash([2, 3]);
      ctx.beginPath();
      ctx.moveTo(PX, cy);
      ctx.lineTo(cx, cy);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, PY);
      ctx.lineTo(cx, PY + PH);
      ctx.stroke();
      ctx.setLineDash([]);

      // Cursor readout
      ctx.fillStyle = "hsl(240 6% 12%)";
      ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "left";
      const readout = `step ${cursorIdx.toString().padStart(3, "0")}   train ${train[cursorIdx].toFixed(3)}   val ${val[cursorIdx].toFixed(3)}`;
      ctx.fillText(readout, PX + 12, PY + 22);

      // Top-right legend
      ctx.textAlign = "right";
      ctx.fillStyle = "hsl(240 6% 12%)";
      ctx.fillText("── train", PX + PW - 18, PY + 20);
      ctx.fillStyle = "hsl(240 4% 60%)";
      ctx.fillText("── val", PX + PW - 18, PY + 36);

      // Title at top
      ctx.fillStyle = "hsl(240 4% 46%)";
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "left";
      ctx.fillText("training · convnet · 1.2M params · bs 256", PX, PY - 16);

      // Subtle bottom panel — parameter update strip
      const stripY = heatTop - 18;
      ctx.fillStyle = "hsl(240 4% 46%)";
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "left";
      ctx.fillText("∇W · weight updates", PX, stripY);

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="relative w-full h-full bg-background">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

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