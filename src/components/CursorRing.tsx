import { useEffect, useRef, useState } from "react";

// Custom cursor ring: lerp-follows the pointer, grows over interactive
// elements, shows a VIEW label over project chapters ([data-cursor-label]).
// Desktop (fine pointer) only; never blocks events.
export function CursorRing() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const pos = { x: -100, y: -100 };
    const target = { x: -100, y: -100 };
    let raf = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible && ringRef.current) {
        pos.x = target.x;
        pos.y = target.y;
        ringRef.current.style.opacity = "1";
        visible = true;
      }
    };
    const onLeave = () => {
      if (ringRef.current) ringRef.current.style.opacity = "0";
      visible = false;
    };
    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest?.(
        "a, button, [role='button'], [data-cursor-label]",
      );
      const labelled = (e.target as Element).closest?.("[data-cursor-label]");
      setHovering(!!el);
      setLabel(labelled ? labelled.getAttribute("data-cursor-label") : null);
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[199] hidden md:block"
      style={{ opacity: 0, willChange: "transform" }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-300 ease-out ${
          label
            ? "h-14 w-14 border-accent bg-background/60 backdrop-blur-[2px]"
            : hovering
              ? "h-10 w-10 border-accent/50 bg-transparent"
              : "h-7 w-7 border-accent/70 bg-transparent"
        }`}
      >
        {label && (
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
