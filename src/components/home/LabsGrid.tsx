import { Link } from "react-router-dom";
import { home, teardowns, type Teardown } from "@/data/home";
import { track } from "@/lib/analytics";
import { Eyebrow, StatusDot } from "./primitives";
import { Figure } from "./Figure";

function host(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function LabCard({ t, index, wide }: { t: Teardown; index: number; wide: boolean }) {
  return (
    <article
      id={`lab-${t.id}`}
      aria-labelledby={`lab-title-${t.id}`}
      className={`flex flex-col bg-surface p-6 md:p-7 ${wide ? "lg:col-span-3" : "lg:col-span-2"}`}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="telemetry inline-flex items-center gap-2 text-foreground">
          <StatusDot />
          {t.status}
        </p>
        <span aria-hidden="true" className="telemetry text-faint">
          LAB {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 id={`lab-title-${t.id}`} className="mt-6 font-display text-3xl text-foreground">
        {t.name}
      </h3>
      <p className="telemetry mt-1 text-muted-foreground">{t.kind}</p>
      <p className="mt-5 text-sm leading-[1.65] text-muted-foreground">{t.summary}</p>

      <div className="mt-6 border-t border-border">
        <p className="telemetry pt-4 text-faint">Engineering tear-down</p>
        <ul className="mt-3 space-y-4">
          {t.points.map((pt) => (
            <li key={pt.title}>
              <p className="text-sm font-medium text-foreground">
                {pt.title} <code className="telemetry ml-1 text-[10px] text-accent md:text-[11px]">{pt.code}</code>
              </p>
              <p className="mt-1 text-sm leading-[1.65] text-muted-foreground">{pt.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-7">
        <a
          href={t.url}
          target="_blank"
          rel="noopener"
          onClick={() => track("lab_launch", { lab: t.id, from: "home_labs" })}
          className="mech telemetry inline-flex items-center gap-2 border border-emerald/70 px-4 py-2.5 text-foreground transition-colors hover:bg-emerald/15"
        >
          Launch {host(t.url)} ↗
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        {t.repoUrl && (
          <a
            href={t.repoUrl}
            target="_blank"
            rel="noopener"
            onClick={() => track("outbound_click", { dest: "github", lab: t.id })}
            className="telemetry text-muted-foreground underline decoration-border-focus underline-offset-4 transition-colors hover:text-foreground"
          >
            Source ↗<span className="sr-only"> on GitHub (opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}

export function LabsGrid() {
  const l = home.labs;
  return (
    <section id="labs" aria-labelledby="labs-title" className="border-b border-border">
      <div className="container-wide py-20 md:py-28">
        <div className="mb-12 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-3">
            <Eyebrow>{l.eyebrow}</Eyebrow>
          </div>
          <div className="md:col-span-9 lg:col-span-5">
            <h2 id="labs-title" className="font-display text-4xl text-foreground md:text-5xl">
              {l.title}
            </h2>
            <p className="mt-5 max-w-2xl leading-[1.65] text-muted-foreground">{l.lead}</p>
          </div>
          <div className="md:col-span-9 md:col-start-4 lg:col-span-4 lg:col-start-auto">
            <Figure src={l.image} alt={l.imageAlt} sizes="(min-width: 1024px) 30vw, 100vw" />
          </div>
        </div>
        <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-6">
          {teardowns.map((t, i) => (
            <LabCard key={t.id} t={t} index={i} wide={i < 2} />
          ))}
        </div>
        <Link
          to="/labs"
          className="telemetry mt-8 inline-flex items-center gap-2 border-b border-accent/60 pb-1 text-foreground transition-colors hover:text-accent"
        >
          {l.allLabsCta} →
        </Link>
      </div>
    </section>
  );
}
