import { Link } from "react-router-dom";
import { siteCopy } from "@/data/site";

interface FooterProps {
  variant?: "default" | "echelon";
}

export function Footer({ variant = "default" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  if (variant === "echelon") {
    return (
      <footer className="border-t border-separator mt-auto">
        {/* Big CTA */}
        <div className="container-wide py-16 md:py-24 border-b border-separator">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Next chapter
          </p>
          <Link
            to="/contact"
            className="group inline-flex flex-wrap items-baseline gap-x-4 gap-y-2 font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground transition-colors hover:text-accent"
          >
            <span>Let's build</span>
            <span className="text-accent">something.</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform group-hover:translate-x-2"
            >
              →
            </span>
          </Link>
          <p className="mt-6 max-w-xl text-base text-muted-foreground">
            AI strategy, local LLMs, agentic systems, or something else at the
            seam of humans + models — get in touch.
          </p>
        </div>

        {/* Main Footer Content */}
        <div className="container-wide py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {/* Location */}
            <div className="space-y-3">
              <p className="text-label">Location</p>
              <div className="text-sm text-foreground space-y-1">
                <p>Berlin</p>
                <p>Germany</p>
              </div>
            </div>

            {/* Navigate */}
            <div className="space-y-3">
              <p className="text-label">Navigate</p>
              <div className="text-sm space-y-1">
                <Link to="/work" className="block text-foreground hover:text-accent transition-colors">Projects</Link>
                <Link to="/about" className="block text-foreground hover:text-accent transition-colors">About</Link>
                <Link to="/contact" className="block text-foreground hover:text-accent transition-colors">Contact</Link>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <p className="text-label">Contact</p>
              <div className="text-sm text-foreground space-y-1">
                <a href="mailto:utpal.inbox@hotmail.com" className="block hover:text-accent transition-colors">
                  utpal.inbox@hotmail.com
                </a>
                <a href="https://www.linkedin.com/in/iamdasutpal/" target="_blank" rel="noopener noreferrer" className="block hover:text-accent transition-colors">
                  LinkedIn
                </a>
                <a href="https://github.com/UtpalDasLabs" target="_blank" rel="noopener noreferrer" className="block hover:text-accent transition-colors">
                  GitHub
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="space-y-3">
              <p className="text-label">Legal</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>© {currentYear} Utpal Das</p>
              </div>
            </div>
          </div>
        </div>

        {/* Signature quotes strip */}
        {siteCopy.signatureQuotes && siteCopy.signatureQuotes.length > 0 && (
          <div className="border-t border-separator overflow-hidden py-5">
            <div className="flex whitespace-nowrap animate-marquee">
              {Array.from({ length: 3 }).flatMap((_, loop) =>
                siteCopy.signatureQuotes.map((q, i) => (
                  <span
                    key={`${loop}-${i}`}
                    className="mx-8 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
                  >
                    {q}
                    <span aria-hidden="true" className="ml-8 text-accent">
                      ///
                    </span>
                  </span>
                )),
              )}
            </div>
          </div>
        )}

        {/* Large Scrolling Text */}
        <div className="border-t border-separator overflow-hidden py-6 md:py-8">
          <div className="flex whitespace-nowrap animate-marquee">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="font-display text-6xl md:text-8xl lg:text-[10rem] font-bold text-foreground mx-12"
              >
                @IAMDASUTPAL
              </span>
            ))}
          </div>
        </div>
      </footer>
    );
  }

  // Default footer
  return (
    <footer className="border-t border-separator">
      <div className="container-wide py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left */}
          <div className="space-y-4">
            <p className="font-display text-xl font-semibold">Utpal Das</p>
            <p className="text-muted-foreground text-sm">
              AI Strategy & Digital Solutions
            </p>
          </div>

          {/* Center */}
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link to="/work" className="hover-highlight">Work</Link>
            <Link to="/about" className="hover-highlight">About</Link>
            <Link to="/contact" className="hover-highlight">Contact</Link>
          </div>

          {/* Right */}
          <div className="text-sm text-muted-foreground">
            <p>© {currentYear} Utpal Das</p>
            <p className="mt-1">Berlin, Germany</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
