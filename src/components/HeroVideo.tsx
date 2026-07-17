import { useEffect, useRef, useState } from "react";

// Full-bleed hero footage: the career arc in one shot — cockpit avionics,
// robot cell, machine vision, marketplace, AI. Muted, looping, slowed.
// Reduced-motion users get the poster still instead.
export function HeroVideo() {
  const [reduced, setReduced] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {reduced ? (
        <img
          src="/videos/hero-poster.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/videos/hero.mp4"
          poster="/videos/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      )}
      {/* Scrim + vignette so the kinetic name stays legible over bright frames */}
      <div className="absolute inset-0 bg-background/65" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-background/70" />
    </div>
  );
}
