import { useState } from "react";
import { Link } from "react-router-dom";
import { home } from "@/data/home";
import { track } from "@/lib/analytics";
import { Drawer, Eyebrow } from "./primitives";
import { Figure } from "./Figure";

export function Manifesto() {
  const m = home.manifesto;
  return (
    <section aria-label="Manifesto" className="border-b border-border">
      <div className="container-wide grid gap-8 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-3">
          <Eyebrow>{m.eyebrow}</Eyebrow>
        </div>
        <blockquote className="font-display text-3xl leading-[1.1] tracking-[-0.02em] md:col-span-9 md:text-5xl lg:text-6xl">
          <span className="text-foreground">{m.lead}</span>{" "}
          <span className="text-muted-foreground">{m.middle}</span>{" "}
          <span className="text-accent">{m.accent}</span>
        </blockquote>
        <ol
          aria-label="Career arc"
          className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-5 md:col-span-12"
        >
          {m.arc.map((a, i) => (
            <li key={a.year} className={`bg-background p-4 ${i === m.arc.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}>
              <p className={`telemetry ${i === m.arc.length - 1 ? "text-accent" : "text-foreground"}`}>{a.year}</p>
              <p className="mt-1 text-sm text-muted-foreground">{a.label}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Pipeline() {
  const t = home.thesis;
  return (
    <div>
      <p className="telemetry mb-5 text-muted-foreground">2 · {t.pipelineTitle}</p>
      <ol className="grid gap-px border border-border bg-border md:grid-cols-4">
        {t.stages.map((s, i) => (
          <li key={s.index} className="relative flex flex-col bg-surface p-5">
            <div className="flex items-center justify-between">
              <span className="telemetry text-accent">{s.index}</span>
              {i < t.stages.length - 1 ? (
                <span aria-hidden="true" className="telemetry text-faint">
                  <span className="hidden md:inline">──▶</span>
                  <span className="md:hidden">▼</span>
                </span>
              ) : (
                <span aria-hidden="true" className="telemetry text-emerald-ink">
                  RELEASE
                </span>
              )}
            </div>
            <h4 className="mt-4 font-display text-2xl text-foreground">{s.name}</h4>
            <p className="telemetry mt-1 text-muted-foreground">{s.mode}</p>
            <p className="mt-4 text-sm leading-[1.65] text-muted-foreground">{s.body}</p>
          </li>
        ))}
      </ol>
      <p aria-hidden="true" className="telemetry mt-3 text-faint">
        ↺ FAIL AT ANY STAGE → RETURN TO QUARANTINE
      </p>
    </div>
  );
}

export function Thesis() {
  const t = home.thesis;
  const [open, setOpen] = useState(false);
  const triggerId = "blueprint-trigger";
  const panelId = "blueprint-panel";

  return (
    <section id="thesis" aria-labelledby="thesis-title" className="dark border-b border-border bg-background text-foreground">
      <div className="container-wide py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <Eyebrow>{t.eyebrow}</Eyebrow>
          </div>
          <div className="md:col-span-9 lg:col-span-5">
            <h2
              id="thesis-title"
              className="font-display text-4xl leading-[1.1] tracking-[-0.02em] text-foreground md:text-5xl"
            >
              {t.headline} <span className="text-accent">{t.headlineAccent}</span>
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-[1.65] text-muted-foreground md:text-lg">
              {t.lead}
            </p>
            <button
              id={triggerId}
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => {
                setOpen((o) => !o);
                if (!open) track("blueprint_open", { from: "home_thesis" });
              }}
              className="mech telemetry mt-10 inline-flex items-center gap-3 border border-accent/60 px-5 py-3.5 text-foreground transition-colors hover:border-accent hover:bg-accent/10"
            >
              [ {t.trigger}{" "}
              <span aria-hidden="true" className={`mech inline-block transition-transform ${open ? "rotate-180" : ""}`}>
                ↓
              </span>{" "}
              ]
            </button>
          </div>
          <div className="md:col-span-9 md:col-start-4 lg:col-span-4 lg:col-start-auto">
            <Figure src={t.image} alt={t.imageAlt} ratio="aspect-[4/5] lg:aspect-[3/4]" sizes="(min-width: 1024px) 30vw, 100vw" />
          </div>
        </div>

        <Drawer open={open} onClose={() => setOpen(false)} id={panelId} labelledBy={triggerId}>
          <article className="mt-12 border border-border bg-background">
            <header className="telemetry flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4 text-foreground">
              <span>{t.blueprintTitle}</span>
              <span className="text-faint">REV 2.0 · BERLIN</span>
            </header>
            <div className="grid gap-10 p-5 md:p-8">
              <div className="grid gap-6 md:grid-cols-12">
                <p className="telemetry text-muted-foreground md:col-span-3">1 · {t.premiseTitle}</p>
                <div className="space-y-4 md:col-span-9">
                  {t.premise.map((para) => (
                    <p key={para.slice(0, 24)} className="leading-[1.65] text-muted-foreground">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
              <Pipeline />
              <Link
                to="/notes/agent-accountability"
                className="telemetry inline-flex w-fit items-center gap-2 border-b border-accent/60 pb-1 text-foreground transition-colors hover:text-accent"
              >
                {t.noteLink} →
              </Link>
            </div>
          </article>
        </Drawer>
      </div>
    </section>
  );
}
