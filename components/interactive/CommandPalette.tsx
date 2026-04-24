"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  Brain,
  Code2,
  CornerDownLeft,
  Github,
  Home,
  Layers,
  Mail,
  Linkedin,
  Search,
  Terminal as TerminalIcon,
  User,
  Wrench,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Command = {
  id: string;
  label: string;
  hint?: string;
  keywords: string[];
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  action?: () => void;
  external?: boolean;
  section: string;
};

const COMMANDS: Command[] = [
  { id: "top", label: "Zur Startseite", keywords: ["home", "top", "start", "hero"], icon: Home, href: "#top", section: "Navigation" },
  { id: "about", label: "Über mich", keywords: ["about", "bio", "marcel", "9 jahre"], icon: User, href: "#about", section: "Navigation" },
  { id: "services", label: "Services", keywords: ["services", "leistungen", "was"], icon: Wrench, href: "#services", section: "Navigation" },
  { id: "products", label: "Produkte", keywords: ["produkte", "products", "skolli", "vegap", "sayvo"], icon: Boxes, href: "#products", section: "Navigation" },
  { id: "work", label: "Kundenprojekte", keywords: ["work", "projects", "projekte", "showcase"], icon: Layers, href: "#work", section: "Navigation" },
  { id: "stack", label: "Stack & Arbeitsweise", keywords: ["stack", "tools", "next.js", "react"], icon: TerminalIcon, href: "#stack", section: "Navigation" },
  { id: "contact", label: "Kontakt", keywords: ["kontakt", "contact", "hire", "mail"], icon: Mail, href: "#contact", section: "Navigation" },

  { id: "mail", label: "E-Mail schreiben", hint: "m.wiskow96@gmail.com", keywords: ["mail", "email", "schreiben", "contact"], icon: Mail, href: "mailto:m.wiskow96@gmail.com", section: "Kontakt" },
  { id: "github", label: "GitHub öffnen", hint: "github.com/m8rzel", keywords: ["github", "code", "repos"], icon: Github, href: "https://github.com/m8rzel", external: true, section: "Kontakt" },
  { id: "linkedin", label: "LinkedIn öffnen", keywords: ["linkedin", "network"], icon: Linkedin, href: "https://www.linkedin.com/in/marcel-wiskow-a95b42243/", external: true, section: "Kontakt" },

  { id: "agency", label: "Agentur: thenotperfect.de", keywords: ["agentur", "agency", "thenotperfect"], icon: Code2, href: "https://thenotperfect.de", external: true, section: "Extern" },
  { id: "agency-products", label: "Agentur: Produkte", keywords: ["produkte", "agentur"], icon: Brain, href: "https://thenotperfect.de/produkte", external: true, section: "Extern" },
  { id: "agency-showcase", label: "Agentur: Showcase", keywords: ["showcase", "agentur"], icon: Layers, href: "https://thenotperfect.de/showcase", external: true, section: "Extern" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMacRef = useRef<boolean>(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const mac = /Mac|iPhone|iPad/i.test(navigator.userAgent);
      isMacRef.current = mac;
      setIsMac(mac);
    }
  }, []);

  // Global shortcut — ⌘K / Ctrl+K / "/"
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const metaK = (isMacRef.current ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "k";
      if (metaK) {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === "/" && !open) {
        const target = e.target as HTMLElement | null;
        if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
        e.preventDefault();
        setOpen(true);
        return;
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 40);
      setQuery("");
      setIdx(0);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [query]);

  const grouped = useMemo(() => {
    const groups: Record<string, Command[]> = {};
    filtered.forEach((c) => {
      (groups[c.section] ||= []).push(c);
    });
    return Object.entries(groups);
  }, [filtered]);

  const run = (cmd: Command) => {
    setOpen(false);
    if (cmd.action) return cmd.action();
    if (cmd.href) {
      if (cmd.external || cmd.href.startsWith("mailto:")) {
        window.open(cmd.href, cmd.href.startsWith("mailto:") ? "_self" : "_blank", "noopener");
      } else {
        window.location.hash = cmd.href;
      }
    }
  };

  const handleInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[idx];
      if (cmd) run(cmd);
    }
  };

  useEffect(() => setIdx(0), [query]);

  return (
    <>
      {/* Mobile trigger — small floating button (ConsoleStrip is hidden on mobile) */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3.5 py-2 font-mono text-[11px] text-white/60 backdrop-blur-md transition-all hover:border-[var(--color-accent-500)]/50 hover:bg-black/80 hover:text-white md:hidden"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Suche</span>
      </button>
      {/* Suppress unused warning on desktop */}
      <span aria-hidden className="hidden">{isMac ? "⌘" : "Ctrl"}</span>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
              aria-hidden
            />

            {/* Palette */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-1/2 top-[14vh] z-[90] w-[min(640px,92vw)] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0b0d12]/95 shadow-2xl shadow-black/50 backdrop-blur-xl"
            >
              {/* Input */}
              <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
                <Search className="h-4 w-4 shrink-0 text-white/40" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleInputKey}
                  placeholder="Springe zu… (z.B. kontakt, skolli, stack)"
                  className="flex-1 bg-transparent font-mono text-sm text-white placeholder:text-white/30 focus:outline-none"
                  spellCheck={false}
                  autoComplete="off"
                />
                <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-white/60">
                  esc
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto py-2">
                {filtered.length === 0 && (
                  <div className="px-5 py-8 text-center font-mono text-sm text-white/40">
                    Nichts gefunden. Versuch&apos;s mit <span className="text-white">produkte</span>,{" "}
                    <span className="text-white">stack</span> oder <span className="text-white">kontakt</span>.
                  </div>
                )}
                {grouped.map(([section, cmds]) => (
                  <div key={section}>
                    <div className="px-5 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                      {section}
                    </div>
                    {cmds.map((cmd) => {
                      const globalIdx = filtered.indexOf(cmd);
                      const active = globalIdx === idx;
                      const Icon = cmd.icon;
                      return (
                        <button
                          key={cmd.id}
                          onMouseEnter={() => setIdx(globalIdx)}
                          onClick={() => run(cmd)}
                          className={`flex w-full items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                            active ? "bg-[var(--color-accent-500)]/10" : ""
                          }`}
                        >
                          <Icon
                            className={`h-4 w-4 shrink-0 ${
                              active ? "text-[var(--color-accent-500)]" : "text-white/50"
                            }`}
                          />
                          <span className={`flex-1 font-mono text-sm ${active ? "text-white" : "text-white/80"}`}>
                            {cmd.label}
                          </span>
                          {cmd.hint && (
                            <span className="hidden font-mono text-[11px] text-white/35 md:block">
                              {cmd.hint}
                            </span>
                          )}
                          {active && <CornerDownLeft className="h-3.5 w-3.5 text-[var(--color-accent-500)]" />}
                          {!active && cmd.external && <ArrowRight className="h-3 w-3 text-white/20" />}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] bg-white/[0.015] px-5 py-2.5 font-mono text-[10px] text-white/40">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <kbd className="rounded border border-white/15 bg-white/5 px-1 py-0.5">↑↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="rounded border border-white/15 bg-white/5 px-1 py-0.5">↵</kbd>
                    select
                  </span>
                </div>
                <span>command_palette v1.0</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
