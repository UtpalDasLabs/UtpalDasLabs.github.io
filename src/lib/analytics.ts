// Privacy-conscious GA4 wrapper.
//
// - Dormant until VITE_GA_MEASUREMENT_ID is set: no script, no banner, no
//   tracking. So the code can ship before the GA property exists.
// - Strict opt-in: Consent Mode v2 defaults are queued locally, but gtag.js
//   itself is not fetched until the visitor accepts (or on a later visit that
//   already accepted). Declining never contacts Google. The choice persists
//   and can be reopened from the footer ("Privacy settings").
// - The Labs apps under this origin (/German-Citizenship-App/ etc.) share the
//   same GA4 property but ask separately, each with its own stored choice.
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

// Fallback when storage is blocked (private mode): the choice holds for this visit.
let sessionChoice: ConsentChoice = null;

export function getConsent(): ConsentChoice {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return sessionChoice;
  }
}

function storeChoice(choice: "granted" | "denied") {
  sessionChoice = choice;
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Private mode: sessionChoice carries it.
  }
}

// The footer's "Privacy settings" reopens the banner through this.
const reopenListeners = new Set<() => void>();
export function onConsentReopen(listener: () => void): () => void {
  reopenListeners.add(listener);
  return () => reopenListeners.delete(listener);
}
export function openConsentSettings() {
  reopenListeners.forEach((l) => l());
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// IMPORTANT: gtag.js only executes dataLayer entries that are real
// `arguments` objects. Pushing a plain array (e.g. from rest parameters) is
// silently ignored, so commands never reach GA. This must stay a classic
// function that pushes `arguments` itself — matching Google's own snippet:
//   function gtag(){dataLayer.push(arguments);}
function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  void args;
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

let initialised = false;
let scriptInjected = false;

function loadScript() {
  if (scriptInjected) return;
  scriptInjected = true;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

/**
 * Queue Consent Mode defaults and config. Safe to call once on startup.
 * gtag.js is only fetched when consent is already granted; otherwise it waits
 * for grantConsent(), so a visitor who never accepts never contacts Google.
 */
export function initAnalytics() {
  if (!analyticsEnabled || initialised || typeof window === "undefined") return;
  initialised = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = gtag;

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: getConsent() === "granted" ? "granted" : "denied",
  });

  gtag("js", new Date());
  // We send page_view manually on SPA route changes. (GA4 never stores IP
  // addresses, so the old anonymize_ip flag is gone.) content_group, here and
  // on every event, splits the portfolio from the Labs apps that report into
  // the same property.
  gtag("config", GA_ID, {
    send_page_view: false,
    content_group: "portfolio",
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  if (getConsent() === "granted") loadScript();
}

export function grantConsent() {
  if (typeof window === "undefined") return;
  storeChoice("granted");
  if (!analyticsEnabled) return;
  gtag("consent", "update", { analytics_storage: "granted" });
  loadScript();
  // First page after consent isn't captured by the manual router hook.
  trackPageView(window.location.pathname + window.location.search);
}

export function denyConsent() {
  if (typeof window === "undefined") return;
  storeChoice("denied");
  if (!analyticsEnabled) return;
  gtag("consent", "update", { analytics_storage: "denied" });
}

/** Fire a custom event. No-op unless enabled AND consent granted. */
export function track(event: string, params: GtagParams = {}) {
  if (debug) console.debug("[analytics]", event, params);
  if (!analyticsEnabled || getConsent() !== "granted") return;
  gtag("event", event, { content_group: "portfolio", ...params });
}

export function trackPageView(path: string) {
  if (debug) console.debug("[analytics] page_view", path);
  if (!analyticsEnabled || getConsent() !== "granted") return;
  gtag("event", "page_view", {
    content_group: "portfolio",
    page_path: path,
    page_location: window.location.href,
  });
}
