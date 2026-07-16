import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { CursorRing } from "@/components/CursorRing";
import { RevealLayer } from "@/components/RevealLayer";
import { useLenis } from "@/hooks/use-lenis";
import Index from "./pages/Index";
import Work from "./pages/Work";
import Project from "./pages/Project";
import About from "./pages/About";
import KindWords from "./pages/KindWords";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useLenis();
  return (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RevealLayer />
        <CursorRing />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:id" element={<Project />} />
            <Route path="/about" element={<About />} />
            <Route path="/kind-words" element={<KindWords />} />
            <Route path="/contact" element={<Contact />} />
            {/* Old project-site URLs (utpaldaslabs.github.io/dasutpal/...) */}
            <Route path="/dasutpal" element={<Navigate to="/" replace />} />
            <Route path="/dasutpal/*" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
  );
};

export default App;
