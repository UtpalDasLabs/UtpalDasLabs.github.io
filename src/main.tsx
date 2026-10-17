import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import { initAnalytics } from "./lib/analytics";
import "./index.css";

// Initialise before React mounts. React runs child effects before parent
// effects, so initialising inside App would let ScrollManager's page_view be
// queued ahead of the consent/config commands — and GA drops events that
// arrive before config.
initAnalytics();

const root = document.getElementById("root")!;
// Pre-rendered pages arrive with full HTML: hydrate it. Unknown/dev routes
// arrive empty: render from scratch.
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
