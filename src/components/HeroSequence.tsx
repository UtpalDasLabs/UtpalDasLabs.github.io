import { useEffect, useState } from "react";
import { siteCopy } from "@/data/site";

const FIRST = siteCopy.heroFirstName; // "UTPAL"
const LAST = siteCopy.heroLastName; // "DAS"
const TOTAL = FIRST.length + LAST.length;

// Timing (ms)
const PER_LETTER = 120; // typing speed
const TAGLINE_DELAY = 500; // after typing finishes, before the tagline shows
const HOLD = 2400; // how long the finished name + tagline stay on screen
const EXIT = 700; // fade-out duration before handing off to the bio/CTA

// The hero title sequence: types "UTPAL" then "DAS", reveals the
// Father · Builder · Problem Solver tagline, holds, then fades everything out
// and calls onDone so the persistent bio + CTA can take over. Reduced-motion
// users skip the choreography and see the name, tagline and content at rest.
export function HeroSequence({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [showTagline, setShowTagline] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(TOTAL);
      setShowTagline(true);
      onDone();
      return;
    }

    const timers: number[] = [];
    let typed = 0;
    const typer = window.setInterval(() => {
      typed += 1;
      setCount(typed);
      if (typed >= TOTAL) {
        window.clearInterval(typer);
        timers.push(window.setTimeout(() => setShowTagline(true), TAGLINE_DELAY));
        timers.push(window.setTimeout(() => setExiting(true), TAGLINE_DELAY + HOLD));
        timers.push(window.setTimeout(() => onDone(), TAGLINE_DELAY + HOLD + EXIT));
      }
    }, PER_LETTER);

    return () => {
      window.clearInterval(typer);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [onDone]);

  const firstShown = FIRST.slice(0, Math.min(count, FIRST.length));
  const lastShown = LAST.slice(0, Math.max(0, count - FIRST.length));
  const typingFirst = count < FIRST.length;
  const typingLast = count >= FIRST.length && count < TOTAL;

  const nameClass =
    "text-center font-display text-6xl font-bold leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem]";

  return (
    <div
      className={`flex flex-col items-center gap-2 transition-opacity duration-700 ease-out md:gap-4 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* First name */}
      <h1 className={nameClass}>
        {firstShown}
        {typingFirst && <span className="type-caret text-accent">|</span>}
      </h1>

      {/* Tagline mid-strip — appears only after the name has finished typing.
          The row keeps its height reserved so nothing jumps when it fades in. */}
      <div className="flex min-h-[1.5rem] items-center gap-3 py-1 md:min-h-[2rem]">
        <span
          className={`flex items-center gap-3 transition-opacity duration-500 ${
            showTagline ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="h-px w-8 bg-accent md:w-14" />
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/90 md:text-xs">
            {siteCopy.tagline}
          </span>
          <span className="h-px w-8 bg-accent md:w-14" />
        </span>
      </div>

      {/* Last name */}
      <h1 className={`${nameClass} text-accent`}>
        {lastShown}
        {typingLast && <span className="type-caret text-foreground">|</span>}
      </h1>
    </div>
  );
}
