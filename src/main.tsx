import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initAnalytics } from "./lib/analytics";
import "./index.css";

// Initialise before React mounts. React runs child effects before parent
// effects, so initialising inside App would let ScrollManager's page_view be
// queued ahead of the consent/config commands — and GA drops events that
// arrive before config.
initAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
