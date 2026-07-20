import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import type Lenis from "lenis";

// Deterministic scroll position on every navigation.
//  - Project detail pages (/work/:id) land directly on the text content, so
//    the reader can choose to scroll up to the hero or down for more — instead
//    of arriving at a seemingly random position.
//  - Every other route starts at the top.
// Uses the Lenis instance when present so the smooth-scroller doesn't animate
// back to the previous position; falls back to native scrolling otherwise.
export function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const isProject = /^\/work\/.+/.test(pathname);
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis;

    // Wait a frame so the new route's DOM (and the #project-content anchor)
    // has rendered before we measure and scroll.
    const raf = requestAnimationFrame(() => {
      const target = isProject ? document.getElementById("project-content") : null;
      if (target) {
        if (lenis) lenis.scrollTo(target, { immediate: true, offset: -88 });
        else {
          const y = target.getBoundingClientRect().top + window.scrollY - 88;
          window.scrollTo(0, y);
        }
        return;
      }
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
