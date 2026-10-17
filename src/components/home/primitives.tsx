import { ReactNode, useEffect, useRef } from "react";

/** Monospace section index, e.g. "04 · FLAGSHIP CASE STUDIES". */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`telemetry flex items-center gap-3 text-accent ${className}`}>
      <span aria-hidden="true" className="inline-block h-1.5 w-1.5 bg-accent" />
      {children}
    </p>
  );
}

/** Hairline-bordered monospace badge. */
export function Pill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`telemetry inline-flex items-center gap-2 border border-border bg-surface px-3 py-2 text-foreground/85 ${className}`}
    >
      {children}
    </span>
  );
}

export function StatusDot({ tone = "emerald" }: { tone?: "emerald" | "amber" }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2 w-2 rounded-full ${tone === "emerald" ? "bg-emerald" : "bg-accent"}`}
    />
  );
}

/**
 * Accessible disclosure. The panel is always rendered (so pre-rendered HTML
 * carries the full text for search and answer engines); when closed it is
 * collapsed, `inert`, and hidden from assistive tech. Escape closes it and
 * returns focus to the trigger.
 */
export function Drawer({
  open,
  onClose,
  id,
  labelledBy,
  children,
}: {
  open: boolean;
  onClose: () => void;
  id: string;
  labelledBy: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) el.removeAttribute("inert");
    else el.setAttribute("inert", "");
  }, [open]);

  return (
    <div
      ref={ref}
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      data-open={open ? "true" : "false"}
      className="drawer"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          onClose();
          document.getElementById(labelledBy)?.focus();
        }
      }}
    >
      <div className="drawer-inner">{children}</div>
    </div>
  );
}
