import { useEffect, useRef, useState } from "react";

// The "look underneath" layer: a blueprint version of the viewport —
// engineering grid + mono annotations from the career — revealed inside a
// circle that follows the cursor (CSS mask). Desktop only, respects
// prefers-reduced-motion, never intercepts events.
const annotations = [
  { top: "12%", left: "8%", text: "52.5200° N · 13.4050° E" },
  { top: "22%", left: "62%", text: "agent.plan() → act() → verify()" },
  { top: "38%", left: "18%", text: "±0.01 mm" },
  { top: "48%", left: "74%", text: "2M+ listings" },
  { top: "62%", left: "10%", text: "DO-178B · V-model" },
  { top: "70%", left: "56%", text: "scan → mesh → cad" },
  { top: "84%", left: "26%", text: "131 dealerships · 100% digital" },
  { top: "88%", left: "72%", text: "tokens/s" },
  { top: "30%", left: "40%", text: "fleet.route(a→b)" },
];

export function RevealLayer() {
  const layerRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const pos = { x: -400, y: -400, r: 0 };
    const target = { x: -400, y: -400, r: 0 };
    let raf = 0;
    let idleTimer: number;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      target.r = 160;
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        target.r = 0;
      }, 900);
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.14;
      pos.y += (target.y - pos.y) * 0.14;
      pos.r += (target.r - pos.r) * 0.1;
      if (layerRef.current) {
        const mask = `radial-gradient(circle ${pos.r}px at ${pos.x}px ${pos.y}px, #000 0%, #000 70%, transparent 100%)`;
        layerRef.current.style.maskImage = mask;
        (layerRef.current.style as CSSStyleDeclaration & { webkitMaskImage: string }).webkitMaskImage = mask;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      window.clearTimeout(idleTimer);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[150] hidden md:block"
      style={{
        maskImage: "radial-gradient(circle 0px at -400px -400px, #000 0, transparent 0)",
        WebkitMaskImage: "radial-gradient(circle 0px at -400px -400px, #000 0, transparent 0)",
        backgroundColor: "hsl(var(--background))",
        backgroundImage:
          "linear-gradient(hsl(var(--accent) / 0.22) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent) / 0.22) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    >
      {annotations.map((a) => (
        <span
          key={a.text}
          className="absolute font-mono text-xs tracking-widest text-accent"
          style={{ top: a.top, left: a.left }}
        >
          {a.text}
        </span>
      ))}
      {/* crosshair center marks on the grid */}
      <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 border border-accent/50" />
    </div>
  );
}
