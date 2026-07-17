import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const navItems = [
  { label: "Projects", path: "/work" },
  { label: "About", path: "/about" },
  { label: "Kind Words", path: "/kind-words" },
  { label: "Contact", path: "/contact" },
];

interface HeaderProps {
  revealMode?: boolean;
}

export function Header({ revealMode = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(!revealMode);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!revealMode) {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-full pointer-events-none'
      } ${isMenuOpen ? 'bg-background' : ''}`}
    >
      <div className="container-wide relative">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-foreground hover:opacity-70 transition-opacity"
          >
            {/* Triple-line UD monogram */}
            <svg
              viewBox="0 0 150 116"
              className="h-8 w-auto"
              role="img"
              aria-label="UD monogram"
            >
              <defs>
                <linearGradient id="ud-gold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e8c37a" />
                  <stop offset="45%" stopColor="#f7e2b0" />
                  <stop offset="100%" stopColor="#b8873c" />
                </linearGradient>
              </defs>
              <g
                fill="none"
                stroke="url(#ud-gold)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* U */}
                <path d="M14 14 V56 A28 28 0 0 0 70 56 V14" />
                <path d="M21 14 V56 A21 21 0 0 0 63 56 V14" />
                <path d="M28 14 V56 A14 14 0 0 0 56 56 V14" />
                {/* D */}
                <path d="M74 14 H84 A44 44 0 1 1 84 102 H68 L74 96 V14" />
                <path d="M81 21 H84 A37 37 0 1 1 84 95 H81 V21" />
                <path d="M88 28 A30 30 0 1 1 88 88 V28" />
              </g>
            </svg>
            Utpal Das
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs font-sans tracking-widest uppercase transition-all duration-300 hover:tracking-[0.2em] ${
                  location.pathname === item.path
                    ? "text-foreground"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right - Theme Toggle */}
          <div className="hidden md:flex items-center">
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
        <nav className="container-wide mt-20 border-t border-separator py-12 flex flex-col gap-8">
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`text-4xl font-display animate-fade-in-up ${
                location.pathname === item.path ? "text-accent" : "text-foreground"
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
