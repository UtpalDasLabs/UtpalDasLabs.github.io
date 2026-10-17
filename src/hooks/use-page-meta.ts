import { useEffect } from "react";

const SITE_URL = "https://utpaldas.com";

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute(attr, value);
}

// During build-time pre-rendering there is no document: the page's metadata
// is recorded here and written into the static HTML by scripts/prerender.mjs.
export const collectedMeta: { title?: string; description?: string; path?: string } = {};
export function resetMeta() {
  delete collectedMeta.title;
  delete collectedMeta.description;
  delete collectedMeta.path;
}

// Per-route title/description/canonical so metadata is unique across routes.
export function usePageMeta(title: string, description: string, path: string) {
  if (typeof window === "undefined") {
    collectedMeta.title = title;
    collectedMeta.description = description;
    collectedMeta.path = path;
  }
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:description"]', "content", description);
    const url = `${SITE_URL}${path}`;
    setMeta('meta[property="og:url"]', "content", url);
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = url;
  }, [title, description, path]);
}
