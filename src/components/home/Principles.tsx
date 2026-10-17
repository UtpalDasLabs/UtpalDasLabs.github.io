import { Link } from "react-router-dom";
import { endorsements, home } from "@/data/home";
import { siteCopy } from "@/data/site";
import { Eyebrow } from "./primitives";

export function Principles() {
  const p = home.principles;
  return (
    <section id="kind-words" aria-labelledby="kind-words-title" className="border-b border-border">
      <div id="about" className="container-wide py-20 md:py-28">
        <div className="mb-12 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-3">
            <Eyebrow>{p.eyebrow}</Eyebrow>
          </div>
          <div className="md:col-span-9">
            <h2 id="kind-words-title" className="font-display text-4xl text-foreground md:text-6xl">
              {p.title}
            </h2>
          </div>
        </div>

        <ul className="mb-12 grid gap-px border border-border bg-border md:grid-cols-3" aria-label="Operating principles">
          {siteCopy.pillars.map((pl, i) => (
            <li key={pl.title} className="bg-surface p-6">
              <p className="telemetry text-faint">P-{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-3 font-display text-2xl text-foreground">{pl.title}</p>
              <p className="mt-2 text-sm leading-[1.65] text-muted-foreground">{pl.note}</p>
            </li>
          ))}
        </ul>

        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          {endorsements.map((e) => (
            <figure key={e.author} className="flex flex-col bg-surface p-6 md:p-8">
              <p className="telemetry inline-flex items-center gap-2 text-accent">
                <span aria-hidden="true">PROVES →</span>
                <span className="sr-only">Standard demonstrated:</span>
                {e.standard}
              </p>
              <blockquote className="mt-5 flex-1 font-display text-xl leading-[1.35] text-foreground/90 md:text-2xl">
                “{e.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground">{e.author}</p>
                <p className="telemetry mt-1 text-muted-foreground">
                  {e.role} · {e.context}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
        <Link
          to="/kind-words"
          className="telemetry mt-8 inline-flex items-center gap-2 border-b border-accent/60 pb-1 text-foreground transition-colors hover:text-accent"
        >
          {p.allKindWordsCta} →
        </Link>
      </div>
    </section>
  );
}
