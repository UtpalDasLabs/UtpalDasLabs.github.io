import { useEffect, useState } from "react";
import { analyticsEnabled, getConsent, grantConsent, denyConsent } from "@/lib/analytics";

// Cookie-consent banner for GA4 (EU/GDPR). Renders only when analytics is
// configured and the visitor hasn't chosen yet. Cookieless until "Accept".
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (analyticsEnabled && getConsent() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const accept = () => {
    grantConsent();
    setVisible(false);
  };
  const decline = () => {
    denyConsent();
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Analytics consent"
      className="fixed inset-x-0 bottom-0 z-[300] border-t border-separator bg-background/95 backdrop-blur-sm"
    >
      <div className="container-wide flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between md:py-4">
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          I use privacy-friendly analytics (Google Analytics, IP anonymised) to
          understand what's useful here. Nothing loads until you choose.{" "}
          <span className="text-foreground/80">No ads, no cross-site tracking.</span>
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={decline}
            className="cursor-pointer border border-separator px-5 py-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={accept}
            className="cursor-pointer border border-accent bg-accent px-5 py-2 text-xs uppercase tracking-widest text-accent-foreground transition-all hover:accent-glow"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
