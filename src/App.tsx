import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { CursorRing } from "@/components/CursorRing";
import { RevealLayer } from "@/components/RevealLayer";
import { ScrollManager } from "@/components/ScrollManager";
import { ConsentBanner } from "@/components/ConsentBanner";
import { useLenis } from "@/hooks/use-lenis";
import Index from "./pages/Index";

// The landing page loads eagerly (it's the primary entry); every other route
// is code-split so the main bundle stays small — notably the Supabase/OAuth
// sign-in flow only downloads when someone actually visits /login.
const Work = lazy(() => import("./pages/Work"));
const Project = lazy(() => import("./pages/Project"));
const Labs = lazy(() => import("./pages/Labs"));
const About = lazy(() => import("./pages/About"));
const KindWords = lazy(() => import("./pages/KindWords"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const OAuthConsent = lazy(() => import("./pages/OAuthConsent"));

const App = () => {
  useLenis();
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RevealLayer />
        <CursorRing />
        <ConsentBanner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <ScrollManager />
          <Suspense fallback={<div className="min-h-[100svh] bg-background" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:id" element={<Project />} />
              <Route path="/labs" element={<Labs />} />
              <Route path="/about" element={<About />} />
              <Route path="/kind-words" element={<KindWords />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
              {/* Old project-site URLs (utpaldaslabs.github.io/dasutpal/...) */}
              <Route path="/dasutpal" element={<Navigate to="/" replace />} />
              <Route path="/dasutpal/*" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default App;
