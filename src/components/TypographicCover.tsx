// Bold word + caption on a faint engineering grid, for projects that have
// no product footage and were sharing a generic abstract-SVG cover with
// two or three other projects. Text is grounded in the project's own
// description — no invented metrics.
export function TypographicCover({
  headline,
  caption,
  className,
}: {
  headline: string;
  caption: string;
  className?: string;
}) {
  return (
    <div
      // Top-anchored (below the card's index row), not centered: the project
      // card overlays its title/description block across the middle and
      // bottom on small screens, and a centered headline collides with it.
      className={`flex flex-col items-start justify-start gap-3 bg-[#0a0a0a] px-6 pt-12 md:pt-14 ${className ?? ""}`}
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--accent) / 0.14) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent) / 0.14) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* On phones the card's title/description overlay fills most of the
          card, so the decorative cover text is hidden there — only the grid
          backdrop shows. */}
      <p className="hidden font-display text-3xl font-bold leading-none tracking-tight text-accent md:block md:text-4xl">
        {headline}
      </p>
      <p className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60 md:block">
        {caption}
      </p>
    </div>
  );
}
