import { useEffect, useRef } from "react";

type Variant = "mesh" | "flow" | "grid";

interface CinematicBackgroundProps {
  variant?: Variant;
  className?: string;
  /** 0..1 — overall opacity of the animated layer */
  intensity?: number;
}

/**
 * Full-bleed animated background rendered on <canvas>.
 * Cheap, GPU-free, and respects prefers-reduced-motion.
 *
 * variants:
 *  - "mesh": drifting particle network (hero)
 *  - "flow": flowing sine-wave data streams (project chapters)
 *  - "grid": scanning grid lines (about / tech chapters)
 */
export function CinematicBackground({
  variant = "mesh",
  className = "",
  intensity = 1,
}: CinematicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    let raf = 0;
    let t = 0;

    // Read accent color from CSS var (cyan)
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim() || "190 100% 50%";
    const stroke = `hsl(${accent} / ${0.55 * intensity})`;
    const dot = `hsl(${accent} / ${0.9 * intensity})`;

    // Particle system for mesh variant
    const N = variant === "mesh" ? 44 : 0;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * (width || 1),
      y: Math.random() * (height || 1),
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));

    const drawMesh = () => {
      ctx.clearRect(0, 0, width, height);
      // Slow radial cyan wash
      const g = ctx.createRadialGradient(
        width * 0.5,
        height * 0.55,
        0,
        width * 0.5,
        height * 0.55,
        Math.max(width, height) * 0.7,
      );
      g.addColorStop(0, `hsl(${accent} / ${0.08 * intensity})`);
      g.addColorStop(1, "hsl(0 0% 0% / 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      const maxDist = Math.min(width, height) * 0.18;
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.55 * intensity;
            ctx.strokeStyle = `hsl(${accent} / ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = dot;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawFlow = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1;
      const lines = 14;
      for (let i = 0; i < lines; i++) {
        const yBase = (i / lines) * height;
        ctx.globalAlpha = 0.15 + 0.35 * (i / lines) * intensity;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 8) {
          const y =
            yBase +
            Math.sin((x + t * 40) * 0.005 + i * 0.7) * 24 +
            Math.sin((x - t * 20) * 0.011 + i) * 10;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, width, height);
      const step = 60;
      ctx.strokeStyle = `hsl(${accent} / ${0.12 * intensity})`;
      ctx.lineWidth = 1;
      for (let x = 0; x <= width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      // Scan line
      const scanY = ((t * 30) % (height + 200)) - 100;
      const scanG = ctx.createLinearGradient(0, scanY - 80, 0, scanY + 80);
      scanG.addColorStop(0, `hsl(${accent} / 0)`);
      scanG.addColorStop(0.5, `hsl(${accent} / ${0.35 * intensity})`);
      scanG.addColorStop(1, `hsl(${accent} / 0)`);
      ctx.fillStyle = scanG;
      ctx.fillRect(0, scanY - 80, width, 160);
    };

    const loop = () => {
      t += 1 / 60;
      if (variant === "mesh") drawMesh();
      else if (variant === "flow") drawFlow();
      else drawGrid();
      if (!reduce) raf = requestAnimationFrame(loop);
    };

    if (reduce) {
      // Draw once, no animation
      if (variant === "mesh") drawMesh();
      else if (variant === "flow") drawFlow();
      else drawGrid();
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [variant, intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  );
}
