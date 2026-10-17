import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { ScrollManager } from "@/components/ScrollManager";
import { ConsentBanner } from "@/components/ConsentBanner";
import Index from "./pages/Index";
import Work from "./pages/Work";
import Project from "./pages/Project";
import Labs from "./pages/Labs";
import About from "./pages/About";
import KindWords from "./pages/KindWords";
import Contact from "./pages/Contact";
import Note from "./pages/Note";
import NotFound from "./pages/NotFound";

// Every public page is imported eagerly so it can be pre-rendered to static
// HTML at build time (scripts/prerender.mjs) and hydrated without a flash.
// Only the Supabase/OAuth sign-in flow stays code-split: it is never
// pre-rendered and only downloads when someone visits /login.
const Login = lazy(() => import("./pages/Login"));
const OAuthConsent = lazy(() => import("./pages/OAuthConsent"));

export function AppRoutes() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ConsentBanner />
        <ScrollManager />
        <Suspense fallback={<div className="min-h-[100svh] bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:id" element={<Project />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/about" element={<About />} />
            <Route path="/kind-words" element={<KindWords />} />
            <Route path="/notes/agent-accountability" element={<Note />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
            {/* Old project-site URLs (utpaldaslabs.github.io/dasutpal/...) */}
            <Route path="/dasutpal" element={<Navigate to="/" replace />} />
            <Route path="/dasutpal/*" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </TooltipProvider>
    </ThemeProvider>
  );
}
