import { Link } from "react-router-dom";
import { home, teardowns } from "@/data/home";
import { track } from "@/lib/analytics";
import { Pill, StatusDot } from "./primitives";

const ARC = [
  { year: "2008", label: "AVIONICS · DO-178B", note: "cockpit displays, CAD kernels" },
  { year: "2013", label: "METROLOGY · 3D VISION", note: "robot cells, point clouds" },
  { year: "2019", label: "MARKETPLACES · FINTECH", note: "subscriptions, apps at scale" },
  { year: "2024", label: "MOBILITY · PRIVATE LLMs", note: "autonomous movers, agents" },
];

/** Career arc rendered as a monospace flight-log schematic (no imagery). */
function ArcSchematic() {
  return (
    <figure
      aria-label="Career arc from avionics to accountable AI"
      className="relative border border-border bg-surface/70 p-5 md:p-6"
    >
      <figcaption className="telemetry mb-5 flex items-center justify-between text-muted-foreground">
        <span>FLIGHT LOG · 18+ YRS</span>
        <span className="text-faint">SYS / ARC-01</span>
      </figcaption>
      <ol className="relative space-y-5 border-l border-border pl-6">
        {ARC.map((s, i) => (
          <li key={s.year} className="relative">
            <span
              aria-hidden="true"
              className={`absolute -left-[1.72rem] top-1 h-2.5 w-2.5 border ${
                i === ARC.length - 1 ? "border-accent bg-accent" : "border-border-focus bg-background"
              }`}
            />
            <p className="telemetry text-foreground">
              <span className="text-accent">{s.year}</span>
              <span className="mx-2 text-faint">→</span>
              {s.label}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{s.note}</p>
          </li>
        ))}
        <li className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[1.72rem] top-1 h-2.5 w-2.5 border border-dashed border-accent"
          />
          <p className="telemetry text-accent">NEXT → ACCOUNTABLE AGENTS</p>
          <p className="mt-1 text-sm text-muted-foreground">the same bar, applied to AI</p>
        </li>
      </ol>
    </figure>
  );
}

export function Hero() {
  const h = home.hero;
  const [eyebrowLeft, eyebrowRight] = h.eyebrow.split(" — ");
  return (
    <section
      id="intro"
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-border pt-24 md:pt-28"
    >
      <div aria-hidden="true" className="hairline-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background"
      />

      <div className="container-wide relative">
        <div className="telemetry flex items-center justify-between border-b border-border pb-4 text-muted-foreground">
          <span>{eyebrowLeft}</span>
          <span>{eyebrowRight}</span>
        </div>

        <div className="grid gap-12 py-12 md:py-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <p className="telemetry mb-6 inline-flex items-center gap-2 border border-accent/50 px-3 py-1.5 text-accent">
              <StatusDot tone="amber" />
              {h.roleBadge}
            </p>
            <h1
              id="hero-title"
              className="font-display text-[clamp(4rem,13vw,10.5rem)] leading-[0.9] tracking-[-0.03em] text-foreground"
            >
              {h.headline}
            </h1>
            <p className="mt-5 font-display text-2xl italic text-foreground/80 md:text-3xl">
              {h.subPositioning}
            </p>
            <p className="mt-8 max-w-2xl text-base leading-[1.65] text-muted-foreground md:text-lg">
              {h.body}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Proof points">
              {h.proofPills.map((p) => (
                <li key={p}>
                  <Pill>{p}</Pill>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to="/#projects"
                onClick={() => track("cta_click", { label: "see_the_work", from: "home_hero" })}
                className="mech telemetry inline-flex items-center gap-2 border border-accent bg-accent px-5 py-3.5 text-accent-foreground transition-colors hover:bg-accent/90"
              >
                {h.primaryCta}
              </Link>
              <Link
                to="/#thesis"
                onClick={() => track("cta_click", { label: "ai_thesis", from: "home_hero" })}
                className="mech telemetry inline-flex items-center gap-2 border border-border-focus px-5 py-3.5 text-foreground transition-colors hover:border-foreground"
              >
                {h.secondaryCta}
              </Link>
              <Link
                to="/#labs"
                onClick={() => track("cta_click", { label: "launch_labs", from: "home_hero" })}
                className="mech telemetry inline-flex items-center gap-2 px-3 py-3.5 text-muted-foreground underline decoration-border-focus underline-offset-4 transition-colors hover:text-foreground"
              >
                <StatusDot />
                {h.ghostCta} ({teardowns.length})
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 lg:pt-16">
            <ArcSchematic />
          </div>
        </div>
      </div>
    </section>
  );
}
