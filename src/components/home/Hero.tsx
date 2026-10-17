import { Link } from "react-router-dom";
import { home, teardowns } from "@/data/home";
import { track } from "@/lib/analytics";
import { Pill, StatusDot } from "./primitives";

export function Hero() {
  const h = home.hero;
  const [eyebrowLeft, eyebrowRight] = h.eyebrow.split(" — ");
  return (
    <section id="intro" aria-labelledby="hero-title" className="relative border-b border-border pt-24 md:pt-28">
      <div className="container-wide relative">
        <div className="telemetry flex items-center justify-between border-b border-border pb-4 text-muted-foreground">
          <span>{eyebrowLeft}</span>
          <span>{eyebrowRight}</span>
        </div>

        <div className="grid gap-12 py-12 md:py-16 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7 lg:pt-6">
            <p className="telemetry mb-7 inline-flex items-center gap-2 border border-bronze/60 px-3 py-1.5 text-accent">
              <StatusDot tone="amber" />
              {h.roleBadge}
            </p>
            <h1
              id="hero-title"
              className="font-display text-[clamp(3.4rem,10vw,8.25rem)] font-medium leading-[0.92] tracking-[-0.02em] text-foreground"
            >
              {h.headline}
            </h1>
            <p className="mt-5 font-display text-2xl italic text-accent md:text-3xl">{h.subPositioning}</p>
            <p className="mt-8 max-w-xl text-base leading-[1.7] text-muted-foreground md:text-lg">{h.body}</p>

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

          <div className="lg:col-span-5">
            <figure className="relative">
              <div aria-hidden="true" className="absolute -left-3 -top-3 h-full w-full border border-bronze/50" />
              <img
                src={h.portrait}
                srcSet="/images/utpal-portrait-480.webp 480w, /images/utpal-portrait-800.webp 800w"
                sizes="(min-width: 1024px) 34vw, 90vw"
                alt={h.portraitAlt}
                width={800}
                height={1000}
                className="relative aspect-[4/5] w-full object-cover"
              />
              <figcaption className="telemetry mt-3 flex justify-between text-muted-foreground">
                <span>Utpal Das</span>
                <span>Berlin</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-surface">
        <dl className="container-wide grid grid-cols-2 md:grid-cols-4">
          {h.stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-7 pr-4 md:py-9 ${i > 0 ? "md:border-l md:border-border md:pl-8" : ""} ${
                i % 2 === 1 ? "border-l border-border pl-5 md:pl-8" : ""
              } ${i > 1 ? "border-t border-border md:border-t-0" : ""}`}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-4xl text-foreground md:text-5xl">{s.value}</dd>
              <dd className="telemetry mt-2 text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
