import { KeyboardEvent, useRef, useState } from "react";
import { home, intents } from "@/data/home";
import { siteCopy } from "@/data/site";
import { track } from "@/lib/analytics";
import { Eyebrow } from "./primitives";

function mailto(subject: string) {
  return `mailto:${siteCopy.contactEmail}?subject=${encodeURIComponent(subject)}`;
}

/** WAI-ARIA tabs: arrow keys / Home / End move between paths; Tab enters the panel. */
export function ContactSelector() {
  const c = home.contact;
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = intents[active];

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = intents.length - 1;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="contact" aria-labelledby="contact-title">
      <div className="container-wide py-20 md:py-28">
        <div className="mb-12 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-3">
            <Eyebrow>{c.eyebrow}</Eyebrow>
          </div>
          <div className="md:col-span-9">
            <h2 id="contact-title" className="font-display text-4xl text-foreground md:text-5xl">
              {c.title}
            </h2>
            <p className="mt-5 max-w-2xl leading-[1.65] text-muted-foreground">{c.lead}</p>
          </div>
        </div>

        <div className="grid border border-border md:grid-cols-12">
          <div
            role="tablist"
            aria-label="Why are you getting in touch?"
            aria-orientation="vertical"
            className="flex flex-col border-b border-border md:col-span-5 md:border-b-0 md:border-r"
          >
            {intents.map((it, i) => {
              const selected = i === active;
              return (
                <button
                  key={it.id}
                  ref={(el) => (tabs.current[i] = el)}
                  id={`intent-tab-${it.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`intent-panel-${it.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={onKeyDown}
                  className={`mech group flex items-start gap-4 border-b border-border px-5 py-5 text-left transition-colors last:border-b-0 ${
                    selected ? "bg-surface-elevated" : "hover:bg-surface"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`telemetry mt-1 ${selected ? "text-accent" : "text-faint"}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className={`block font-display text-2xl ${selected ? "text-foreground" : "text-foreground/80"}`}>
                      {it.label}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{it.audience}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {intents.map((it, i) => (
            <div
              key={it.id}
              id={`intent-panel-${it.id}`}
              role="tabpanel"
              aria-labelledby={`intent-tab-${it.id}`}
              hidden={i !== active}
              tabIndex={0}
              className={`${i === active ? "flex" : "hidden"} flex-col justify-between gap-10 bg-surface p-6 md:col-span-7 md:p-10`}
            >
              <div>
                <p className="telemetry text-accent">PATH {String(i + 1).padStart(2, "0")} · {it.id.toUpperCase()}</p>
                <p className="mt-5 max-w-xl text-lg leading-[1.65] text-foreground/90">{it.summary}</p>
                <p className="telemetry mt-6 text-faint">Subject line</p>
                <p className="mt-1 font-mono text-sm text-muted-foreground">{it.subject}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={mailto(it.subject)}
                  onClick={() => track("contact_intent", { method: "email", intent: it.id, from: "home_contact" })}
                  className="mech telemetry inline-flex items-center gap-2 border border-accent bg-accent px-5 py-3.5 text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  {it.cta} →
                </a>
                <a
                  href={siteCopy.linkedin}
                  target="_blank"
                  rel="noopener"
                  onClick={() => track("contact_intent", { method: "linkedin", intent: it.id, from: "home_contact" })}
                  className="telemetry text-muted-foreground underline decoration-border-focus underline-offset-4 transition-colors hover:text-foreground"
                >
                  Or message on LinkedIn ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Prefer plain email?{" "}
          <a href={`mailto:${siteCopy.contactEmail}`} className="text-foreground underline underline-offset-4">
            {siteCopy.contactEmail}
          </a>
        </p>
      </div>
    </section>
  );
}
