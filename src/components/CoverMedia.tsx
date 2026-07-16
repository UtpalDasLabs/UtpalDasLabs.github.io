import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

// Muted looping product footage where we have it; SVG cover otherwise.
// Falls back to the still image when the user prefers reduced motion.
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

  if (!project.coverVideo || reduced) {
    return (
      <img
        src={project.coverImage}
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
      poster={project.coverImage}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={`${project.title} — product footage`}
    />
  );
}
