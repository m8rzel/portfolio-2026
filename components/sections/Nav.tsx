"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Über", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Produkte", href: "#products" },
  { label: "Projekte", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Kontakt", href: "#contact" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 40);
  });

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink-950/70 backdrop-blur-xl border-b border-white/[0.06]"
          : ""
      }`}
      style={{ backgroundColor: scrolled ? "rgba(5, 6, 10, 0.7)" : "transparent" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-mono text-sm tracking-tight"
          aria-label="Marcel Wiskow — zur Startseite"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-accent-500)] text-black font-bold">
            MW
          </span>
          <span className="hidden sm:inline text-white/90 group-hover:text-white transition-colors">
            marcelwiskow<span className="text-white/40">.de</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.02] px-2 py-1.5 backdrop-blur-xl">
          {NAV_ITEMS.map((it) => (
            <a
              key={it.href}
              href={it.href}
              className="rounded-full px-4 py-1.5 font-mono text-[13px] text-white/70 transition-all hover:bg-white/[0.06] hover:text-white"
            >
              {it.label}
            </a>
          ))}
        </div>

        <a
          href="https://thenotperfect.de"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 font-mono text-xs text-white/60 hover:text-white transition-colors"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-lime-400 animate-pulse-dot" />
          <span className="hidden sm:inline">thenotperfect.de</span>
          <span className="sm:hidden">Agentur</span>
          <svg
            className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" />
          </svg>
        </a>
      </div>
    </motion.nav>
  );
}
