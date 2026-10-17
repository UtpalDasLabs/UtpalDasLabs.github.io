import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

// Homepage anchors — every section is pre-rendered on "/", deep pages remain.
const navItems = [
  { label: "Projects", path: "/#projects" },
  { label: "Thesis", path: "/#thesis" },
  { label: "Labs", path: "/#labs" },
  { label: "Kind Words", path: "/#kind-words" },
];
const ctaItem = { label: "Start a conversation", path: "/#contact" };

interface HeaderProps {
  revealMode?: boolean;
}

export function Header({ revealMode = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(!revealMode);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname + location.hash === path;
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!revealMode) {
      setIsVisible(true);
      return;
    }

    // Touch devices never fire mousemove, so reveal-on-hover would leave the
    // header (and with it all navigation) permanently hidden there.
    if (window.matchMedia("(hover: none)").matches) {
      setIsVisible(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(e.clientY < 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [revealMode]);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = theme === "dark" ? "light" : "dark";
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => void;
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (doc.startViewTransition && !reduced) {
      // Circular wipe from the toggle button
      const rect = e.currentTarget.getBoundingClientRect();
      document.documentElement.style.setProperty(
        "--wipe-x",
        `${rect.left + rect.width / 2}px`,
      );
      document.documentElement.style.setProperty(
        "--wipe-y",
        `${rect.top + rect.height / 2}px`,
      );
      doc.startViewTransition(() => setTheme(next));
    } else {
      setTheme(next);
    }
  };

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/[0.82] backdrop-blur-md transition-all duration-300 ease-mech ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-full pointer-events-none'
      } ${isMenuOpen ? 'bg-background' : ''}`}
    >
      <div className="container-wide relative">
        <div className="flex items-center justify-between h-16 md:h-[4.5rem]">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 font-display text-xl tracking-tight text-foreground hover:opacity-70 transition-opacity"
          >
            {/* Interlocking Heritage UD monogram — bronze PNG so it reads
                identically on the ivory and near-black grounds */}
            <img
              src="/brand/ud-monogram.webp"
              alt=""
              className="h-8 w-auto"
              width="34"
              height="32"
              loading="eager"
            />
            Utpal Das
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`telemetry transition-colors ${
                  isActive(item.path)
                    ? "text-foreground"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right - CTA + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to={ctaItem.path}
              className="telemetry border border-accent/70 px-4 py-2 text-foreground transition-colors ease-mech hover:bg-accent hover:text-accent-foreground"
            >
              {ctaItem.label}
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 text-foreground/60 hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {mounted && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-foreground/60 hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {mounted && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
            </button>
            <button
              className="p-2 -mr-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

    </header>

    {/* Mobile Navigation — rendered OUTSIDE the header: the header's reveal
        transform would otherwise make this fixed overlay position against the
        80px header box instead of the viewport, leaving links floating
        transparently over page content. */}
    {isMenuOpen && (
      <div
        className="md:hidden fixed inset-0 z-40"
        style={{ backgroundColor: "hsl(var(--background))" }}
      >
        <nav aria-label="Mobile" className="container-wide mt-16 border-t border-separator py-12 flex flex-col gap-8">
          {[...navItems, ctaItem].map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`text-4xl font-display animate-fade-in-up ${
                isActive(item.path) ? "text-accent" : "text-foreground"
              }`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    )}
    </>
  );
}
