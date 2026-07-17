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
      className={`flex flex-col items-start justify-center gap-3 bg-[#0a0a0a] px-6 ${className ?? ""}`}
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--accent) / 0.14) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent) / 0.14) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <p className="font-display text-3xl font-bold leading-none tracking-tight text-accent md:text-4xl">
        {headline}
      </p>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
        {caption}
      </p>
    </div>
  );
}
