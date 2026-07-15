import { useState } from "react";
import type { Recommendation } from "@/data/recommendations";
import { useInView } from "@/hooks/use-in-view";

interface KindWordCardProps {
  rec: Recommendation;
  index: number;
}

const CLAMP_AT = 320;

export function KindWordCard({ rec, index }: KindWordCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [expanded, setExpanded] = useState(false);
  const needsClamp = rec.quote.length > CLAMP_AT;
  const shown = expanded || !needsClamp ? rec.quote : `${rec.quote.slice(0, CLAMP_AT).trimEnd()}…`;

  return (
    <div
      ref={ref}
      className={`mb-6 break-inside-avoid border border-separator bg-card p-7 transition-all duration-500 ease-out hover:border-accent/60 ${
        rec.featured ? "border-l-2 border-l-accent" : ""
      } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      <span aria-hidden="true" className="font-display text-5xl leading-none text-accent">
        &ldquo;
      </span>
      <blockquote
        className={`mt-2 leading-relaxed text-muted-foreground ${
          rec.featured ? "text-lg" : "text-base"
        }`}
      >
        {shown}
      </blockquote>
      {needsClamp && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 cursor-pointer text-xs uppercase tracking-widest text-accent hover:opacity-70 transition-opacity"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Read full"}
        </button>
      )}
      <figcaption className="mt-5 border-t border-separator pt-4 text-sm">
        <span className="block text-foreground">{rec.author}</span>
        <span className="block text-muted-foreground">{rec.role}</span>
        <span className="mt-2 inline-block border border-separator px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
          {rec.company}
        </span>
      </figcaption>
    </div>
  );
}
