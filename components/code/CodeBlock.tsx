"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

/**
 * CodeBlock — File-Header + Line-Numbers + colored tokens.
 * Children sollen <CodeLine /> sein (oder plain strings).
 */
export function CodeBlock({
  filename = "self.ts",
  lang = "ts",
  copyText,
  children,
  className = "",
  highlightLine,
}: {
  filename?: string;
  lang?: string;
  copyText?: string;
  children: ReactNode;
  className?: string;
  highlightLine?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [copied, setCopied] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(56, 224, 120, 0.05), transparent 70%)`;

  const handleCopy = async () => {
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  // Wrap children array into CodeLines with highlight support
  const items = Array.isArray(children) ? children : [children];

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      className={`group relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b0d12]/95 shadow-2xl shadow-black/40 ${className}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      {/* Header */}
      <div className="relative flex items-center justify-between border-b border-white/[0.06] bg-white/[0.015] px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="font-mono text-[11px] text-white/45">{filename}</span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/30 rounded border border-white/10 px-1.5 py-0.5">
            {lang}
          </span>
        </div>
        {copyText && (
          <button
            onClick={handleCopy}
            aria-label="Copy code"
            className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] text-white/60 transition-colors hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
          >
            {copied ? <Check className="h-3 w-3 text-[var(--color-accent-500)]" /> : <Copy className="h-3 w-3" />}
            {copied ? "copied" : "copy"}
          </button>
        )}
      </div>

      {/* Body with line numbers */}
      <div className="relative grid grid-cols-[auto_1fr] font-mono text-[13px] leading-[1.75]">
        <div className="select-none border-r border-white/[0.04] bg-white/[0.01] px-3 py-4 text-right text-white/25">
          {items.map((_, i) => (
            <div key={i} className={highlightLine === i + 1 ? "text-[var(--color-accent-500)]" : ""}>
              {i + 1}
            </div>
          ))}
        </div>
        <div className="py-4 px-5 overflow-x-auto">
          {items.map((line, i) => (
            <div
              key={i}
              className={
                highlightLine === i + 1
                  ? "relative -mx-5 bg-[var(--color-accent-500)]/[0.06] px-5 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-[var(--color-accent-500)]"
                  : ""
              }
            >
              {line || <span>&nbsp;</span>}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* Syntax-Token-Helpers — use in CodeBlock children */
export const t = {
  k: (s: string | number) => <span className="text-[#ff7b9c]">{s}</span>,
  s: (s: string | number) => <span className="text-[var(--color-accent-400)]">{s}</span>,
  n: (s: string | number) => <span className="text-[#f6b44e]">{s}</span>,
  c: (s: string) => <span className="text-white/35 italic">{s}</span>,
  fn: (s: string) => <span className="text-[var(--color-electric)]">{s}</span>,
  p: (s: string) => <span className="text-[#c8a4ff]">{s}</span>,
  d: (s: string) => <span className="text-white/50">{s}</span>,
  w: (s: string) => <span className="text-white">{s}</span>,
};
