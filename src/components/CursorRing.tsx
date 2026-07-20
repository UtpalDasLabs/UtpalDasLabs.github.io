import { useEffect, useRef, useState } from "react";

// Custom cursor ring. Tracks the pointer 1:1 (no easing, so it never feels
// like it lags behind a click) and only appears over interactive elements —
// links, buttons and project chapters ([data-cursor-label]). Everywhere else
// the normal system cursor shows and text stays selectable. It never blurs or
// covers content. Desktop (fine pointer) only; never blocks events.
export function CursorRing() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const INTERACTIVE = "a, button, [role='button'], [data-cursor-label]";

    const onMove = (e: MouseEvent) => {
      // Position exactly on the pointer — no interpolation, no trailing.
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      const el = (e.target as Element).closest?.(INTERACTIVE);
      const labelled = (e.target as Element).closest?.("[data-cursor-label]");
      setActive(!!el);
      setLabel(labelled ? labelled.getAttribute("data-cursor-label") : null);
    };
    const onLeave = () => setActive(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[199] hidden md:block"
      style={{ willChange: "transform" }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border border-accent transition-[width,height,opacity] duration-200 ease-out ${
          active
            ? label
              ? "h-14 w-14 opacity-100"
              : "h-9 w-9 opacity-100"
            : "h-9 w-9 opacity-0"
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
