import { Link } from "react-router-dom";
import { siteCopy } from "@/data/site";
import { analyticsEnabled, openConsentSettings, track } from "@/lib/analytics";

interface FooterProps {
  /** Kept for API compatibility with existing pages; both render the same footer. */
  variant?: "default" | "echelon";
}

const linkCls = "block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground";

export function Footer(_props: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border">
      <div className="container-wide grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-display text-3xl text-foreground">Utpal Das</p>
          <p className="mt-2 text-sm text-muted-foreground">{siteCopy.tagline}</p>
          <p className="telemetry mt-6 text-faint">BERLIN · {currentYear}</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="telemetry mb-3 text-faint">Navigate</p>
          <Link to="/#projects" className={linkCls}>Work</Link>
          <Link to="/#thesis" className={linkCls}>AI Thesis</Link>
          <Link to="/#labs" className={linkCls}>Labs</Link>
          <Link to="/#about" className={linkCls}>About &amp; Kind Words</Link>
          <Link to="/work" className={linkCls}>Full archive</Link>
          <Link to="/about" className={linkCls}>Full bio</Link>
        </nav>

        <div className="md:col-span-3">
          <p className="telemetry mb-3 text-faint">Elsewhere</p>
          <a
            href={`mailto:${siteCopy.contactEmail}`}
            onClick={() => track("contact_intent", { method: "email", from: "footer" })}
            className={linkCls}
          >
            {siteCopy.contactEmail}
          </a>
          <a
            href={siteCopy.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("contact_intent", { method: "linkedin", from: "footer" })}
            className={linkCls}
          >
            LinkedIn
          </a>
          <a
            href={siteCopy.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("outbound_click", { dest: "github", from: "footer" })}
            className={linkCls}
          >
            GitHub
          </a>
          {siteCopy.socials?.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("outbound_click", { dest: s.name.toLowerCase(), from: "footer" })}
              className={linkCls}
            >
              {s.name}
            </a>
          ))}
        </div>

        <div className="md:col-span-2">
          <p className="telemetry mb-3 text-faint">Privacy</p>
          <p className="text-sm text-muted-foreground">© {currentYear} Utpal Das</p>
          {analyticsEnabled ? (
            <button
              type="button"
              onClick={openConsentSettings}
              className="mt-1 block cursor-pointer text-left text-sm text-muted-foreground underline decoration-border-focus underline-offset-4 transition-colors hover:text-foreground"
            >
              Privacy settings
            </button>
          ) : null}
          <p className="mt-3 text-xs leading-relaxed text-faint">
            Analytics only load after you accept. No ads, no advertising profile.
          </p>
        </div>
      </div>
    </footer>
  );
}
