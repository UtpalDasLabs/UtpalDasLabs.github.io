import { useEffect } from "react";
import Lenis from "lenis";

// Inertia smooth-scroll for the whole site. Skipped for reduced-motion users.
// The live instance is stashed on window so the router's ScrollManager can
// jump to a position immediately without Lenis animating back to the old one.
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 });
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;
    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);
}
