import { useState } from "react";
import { Link } from "react-router-dom";
import { caseStudies, home, type CaseStudy } from "@/data/home";
import { projects } from "@/data/projects";
import { track } from "@/lib/analytics";
import { Drawer, Eyebrow } from "./primitives";

const MATRIX_ROWS: { key: keyof CaseStudy["matrix"]; label: string }[] = [
  { key: "domain", label: "System Domain" },
  { key: "constraints", label: "Hard Constraints" },
  { key: "scope", label: "Ownership & Scope" },
  { key: "outcome", label: "Verified Outcome" },
];

const TRADEOFF_ROWS: { key: keyof CaseStudy["tradeoff"]; label: string }[] = [
  { key: "context", label: "Context" },
  { key: "decision", label: "Decision" },
  { key: "result", label: "Result" },
];

function CaseCard({ c }: { c: CaseStudy }) {
  const [open, setOpen] = useState(false);
  const triggerId = `tradeoff-trigger-${c.id}`;
  const panelId = `tradeoff-panel-${c.id}`;
  const related = c.related
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <article
      id={`case-${c.id}`}
      aria-labelledby={`case-title-${c.id}`}
      className="flex flex-col bg-surface p-6 md:p-8"
    >
      <p className="telemetry text-accent">{c.tag}</p>
      <p className="telemetry mt-2 text-muted-foreground">{c.meta}</p>
      <h3
        id={`case-title-${c.id}`}
        className="mt-6 font-display text-3xl leading-[1.1] tracking-[-0.02em] text-foreground md:text-[2.1rem]"
      >
        {c.headline}
      </h3>

      <dl className="mt-8 border-t border-border">
        {MATRIX_ROWS.map((r) => (
          <div key={r.key} className="grid gap-2 border-b border-border py-4 sm:grid-cols-[9.5rem_1fr] sm:gap-5">
            <dt className={`telemetry ${r.key === "outcome" ? "text-emerald-ink" : "text-faint"}`}>{r.label}</dt>
            <dd className={`text-sm leading-[1.65] ${r.key === "outcome" ? "text-foreground" : "text-muted-foreground"}`}>
              {c.matrix[r.key]}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-6">
        <button
          id={triggerId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => {
            setOpen((o) => !o);
            if (!open) track("tradeoff_open", { case: c.id });
          }}
          className="mech telemetry inline-flex items-center gap-2 text-foreground transition-colors hover:text-accent"
        >
          [ Read Architectural Tradeoff{" "}
          <span aria-hidden="true" className={`mech inline-block transition-transform ${open ? "rotate-45" : ""}`}>
            +
          </span>{" "}
          ]
        </button>
        <Drawer open={open} onClose={() => setOpen(false)} id={panelId} labelledBy={triggerId}>
          <div className="mt-5 border-l-2 border-accent bg-background/60 p-5">
            <p className="telemetry mb-4 text-foreground">The Hard Architectural Tradeoff</p>
            <dl className="space-y-4">
              {TRADEOFF_ROWS.map((r) => (
                <div key={r.key}>
                  <dt className="telemetry text-accent">{r.label}</dt>
                  <dd className="mt-1 text-sm leading-[1.65] text-muted-foreground">{c.tradeoff[r.key]}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Drawer>
      </div>

      {related.length > 0 && (
        <div className="mt-auto pt-8">
          <p className="telemetry mb-2 text-faint">Deep dives</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {related.map((p) => (
              <li key={p.id}>
                <Link
                  to={`/work/${p.id}`}
                  className="text-sm text-muted-foreground underline decoration-border-focus underline-offset-4 transition-colors hover:text-foreground"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export function CaseStudies() {
  const p = home.projects;
  return (
    <section id="projects" aria-labelledby="projects-title" className="border-b border-border">
      <div className="container-wide py-20 md:py-28">
        <div className="mb-12 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-3">
            <Eyebrow>{p.eyebrow}</Eyebrow>
          </div>
          <div className="md:col-span-9">
            <h2 id="projects-title" className="font-display text-4xl text-foreground md:text-6xl">
              {p.title}
            </h2>
            <p className="mt-5 max-w-2xl leading-[1.65] text-muted-foreground">{p.lead}</p>
          </div>
        </div>
        <div className="grid gap-px border border-border bg-border lg:grid-cols-2">
          {caseStudies.map((c) => (
            <CaseCard key={c.id} c={c} />
          ))}
        </div>
        <Link
          to="/work"
          className="telemetry mt-8 inline-flex items-center gap-2 border-b border-accent/60 pb-1 text-foreground transition-colors hover:text-accent"
        >
          {p.archiveCta} →
        </Link>
      </div>
    </section>
  );
}
