// Privacy-conscious GA4 wrapper.
//
// - Dormant until VITE_GA_MEASUREMENT_ID is set: no script, no banner, no
//   tracking. So the code can ship before the GA property exists.
// - Google Consent Mode v2: analytics storage defaults to "denied"; nothing is
//   sent until the visitor accepts in the consent banner. The choice persists.
// - Provider-agnostic surface (track / trackPageView) so events read the same
//   regardless of the backend, and could be repointed later.

type GtagParams = Record<string, string | number | boolean | undefined>;

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const CONSENT_KEY = "ud-analytics-consent"; // "granted" | "denied"

export const analyticsEnabled = Boolean(GA_ID);

const debug =
  import.meta.env.DEV ||
  (typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).has("ga_debug"));

type ConsentChoice = "granted" | "denied" | null;

export function getConsent(): ConsentChoice {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(CONSENT_KEY);
  return v === "granted" || v === "denied" ? v : null;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

let scriptInjected = false;

/**
 * Set Consent Mode defaults and inject gtag.js. Safe to call once on startup.
 * With no stored consent, analytics_storage stays "denied" until the user
 * accepts — so gtag loads but sends nothing trackable.
 */
export function initAnalytics() {
  if (!analyticsEnabled || scriptInjected || typeof window === "undefined") return;
  scriptInjected = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = gtag;

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: getConsent() === "granted" ? "granted" : "denied",
    wait_for_update: 500,
  });

  gtag("js", new Date());
  // We send page_view manually on SPA route changes.
  gtag("config", GA_ID, { send_page_view: false, anonymize_ip: true });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

export function grantConsent() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, "granted");
  if (!analyticsEnabled) return;
  gtag("consent", "update", { analytics_storage: "granted" });
  // First page after consent isn't captured by the manual router hook.
  trackPageView(window.location.pathname + window.location.search);
}

export function denyConsent() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, "denied");
  if (!analyticsEnabled) return;
  gtag("consent", "update", { analytics_storage: "denied" });
}

/** Fire a custom event. No-op unless enabled AND consent granted. */
export function track(event: string, params: GtagParams = {}) {
  if (debug) console.debug("[analytics]", event, params);
  if (!analyticsEnabled || getConsent() !== "granted") return;
  gtag("event", event, params);
}

export function trackPageView(path: string) {
  if (debug) console.debug("[analytics] page_view", path);
  if (!analyticsEnabled || getConsent() !== "granted") return;
  gtag("event", "page_view", { page_path: path, page_location: window.location.href });
}
