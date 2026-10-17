import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { track, trackPageView } from "@/lib/analytics";

// Deterministic scroll position on every navigation.
//  - Project detail pages (/work/:id) land directly on the text content, so
//    the reader can choose to scroll up to the hero or down for more — instead
//    of arriving at a seemingly random position.
//  - Every other route starts at the top.
//  - A URL hash (/#projects) scrolls to that homepage section.
// Native scrolling only — no scroll hijacking.
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  // SPA page-view: GA4 doesn't auto-fire on client-side navigation.
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  // Scroll-depth milestones — one event per threshold per page.
  useEffect(() => {
    const fired = new Set<number>();
    const milestones = [25, 50, 75, 100];
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.min(100, Math.round((window.scrollY / max) * 100));
      for (const m of milestones) {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          track("scroll_depth", { page: pathname, percent: m });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const isProject = /^\/work\/.+/.test(pathname);
    const anchorId = hash ? decodeURIComponent(hash.slice(1)) : isProject ? "project-content" : "";
    let raf = 0;
    let cancelled = false;

    const scrollTo = (target: HTMLElement | null) => {
      if (target) window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - 72);
      else window.scrollTo(0, 0);
    };

    if (!anchorId) {
      raf = requestAnimationFrame(() => scrollTo(null));
      return () => cancelAnimationFrame(raf);
    }

    const deadline = performance.now() + 1500;
    const waitForAnchor = () => {
      if (cancelled) return;
      const target = document.getElementById(anchorId);
      if (target) {
        scrollTo(target);
        return;
      }
      if (performance.now() < deadline) raf = requestAnimationFrame(waitForAnchor);
      else scrollTo(null);
    };
    raf = requestAnimationFrame(waitForAnchor);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [pathname, hash]);

  return null;
}
