"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Log = {
  id: string;
  cmd: string;
  output: string;
  variant: "ok" | "info" | "warn";
};

const LOGS_BY_SECTION: Record<string, Log> = {
  top: { id: "top", cmd: "$ boot --portfolio", output: "→ hello, visitor.", variant: "info" },
  about: { id: "about", cmd: "$ cat about.md", output: "→ 9 years · ai · web · software", variant: "info" },
  services: { id: "services", cmd: "$ ls ./services", output: "→ 3 disciplines, 1 brain", variant: "info" },
  products: { id: "products", cmd: "$ ps aux | grep shipped", output: "→ 5 products · status: live", variant: "ok" },
  work: { id: "work", cmd: "$ git log --client", output: "→ selected work from thenotperfect", variant: "info" },
  stack: { id: "stack", cmd: "$ stack --dump", output: "→ next · react · ts · claude · node", variant: "info" },
  contact: { id: "contact", cmd: "$ open mailto:", output: "→ available for q3_2026", variant: "ok" },
};

const DEFAULT_LOG = LOGS_BY_SECTION.top;

export function ConsoleStrip() {
  const [current, setCurrent] = useState<Log>(DEFAULT_LOG);
  const [time, setTime] = useState("");

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = Object.keys(LOGS_BY_SECTION);
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const log = LOGS_BY_SECTION[visible.target.id];
          if (log) setCurrent(log);
        }
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Tick clock
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, "0");
      const m = String(d.getMinutes()).padStart(2, "0");
      const s = String(d.getSeconds()).padStart(2, "0");
      setTime(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const variantColor =
    current.variant === "ok"
      ? "text-[var(--color-accent-500)]"
      : current.variant === "warn"
      ? "text-amber-400"
      : "text-[var(--color-electric)]";

  return (
    <div
      aria-hidden
      className="fixed bottom-0 left-0 right-0 z-30 hidden border-t border-white/[0.05] bg-black/50 backdrop-blur-md md:block"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-1.5 font-mono text-[10.5px] lg:px-10">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex items-center gap-1.5 shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-500)] animate-pulse-dot" />
            <span className="text-white/40">status:</span>
            <span className="text-white/70">online</span>
          </span>
          <span className="text-white/15">│</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={current.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex min-w-0 items-center gap-2 truncate"
            >
              <span className="text-white/60 truncate">{current.cmd}</span>
              <span className="text-white/15">│</span>
              <span className={`${variantColor} truncate`}>{current.output}</span>
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-white/35">
          <span>
            <kbd className="rounded border border-white/15 bg-white/5 px-1 py-0.5">⌘K</kbd>{" "}
            command palette
          </span>
          <span className="text-white/15">│</span>
          <span className="tabular-nums">{time}</span>
        </div>
      </div>
    </div>
  );
}
