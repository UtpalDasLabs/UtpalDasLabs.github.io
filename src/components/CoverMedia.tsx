import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

// Muted looping product footage where we have it; SVG cover otherwise.
// Loads and plays only while on screen (perf), and falls back to the still
// image when the user prefers reduced motion.
export function CoverMedia({ project, className }: { project: Project; className?: string }) {
  const [reduced, setReduced] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!project.coverVideo || reduced || !el) return;
    // preload="none" means no bytes load until play(); IO only gates
    // play/pause so offscreen clips stay idle. If IO is unavailable the
    // video simply autoplays.
    if (typeof IntersectionObserver === "undefined") {
      el.play().catch(() => {});
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [project.coverVideo, reduced]);

  if (!project.coverVideo || reduced) {
    return (
      <img
        src={project.coverPoster ?? project.coverImage}
        alt={`${project.title} cover artwork`}
        className={className}
        loading="lazy"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={className}
      src={project.coverVideo}
      poster={project.coverPoster ?? project.coverImage}
      muted
      loop
      playsInline
      preload="none"
      aria-label={`${project.title} — product footage`}
    />
  );
}
