"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Terminal — ein Fake-Terminal-Fenster mit Traffic-Lights + Title.
 * Interaktiv: Mouse-Tilt, Cursor-Spotlight, hover-glow.
 */
export function Terminal({
  title = "marcel@dev ~ %",
  children,
  className = "",
  accent = false,
  compact = false,
  tilt = true,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  accent?: boolean;
  compact?: boolean;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const rx = e.clientX - rect.left;
    const ry = e.clientY - rect.top;
    mouseX.set(rx);
    mouseY.set(ry);
    if (tilt) {
      const nx = (rx / rect.width - 0.5) * 2;
      const ny = (ry / rect.height - 0.5) * 2;
      rotateY.set(nx * 3);
      rotateX.set(-ny * 2);
    }
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, ${
    accent ? "rgba(56, 224, 120, 0.08)" : "rgba(255, 255, 255, 0.04)"
  }, transparent 70%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={`group relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b0d12]/90 backdrop-blur-xl shadow-2xl shadow-black/50 ${
        accent ? "hover:border-[var(--color-accent-500)]/30" : "hover:border-white/15"
      } transition-colors ${className}`}
    >
      {/* Spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      {/* Window chrome */}
      <div className="relative flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.015] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56] transition-transform hover:scale-110" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e] transition-transform hover:scale-110" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f] transition-transform hover:scale-110" />
        </div>
        <div className="mx-auto font-mono text-[11px] text-white/40">{title}</div>
        <div className="w-[52px]" />
      </div>

      {/* Body */}
      <div
        className={`relative font-mono text-[13px] leading-relaxed text-white/80 ${
          compact ? "p-4" : "p-5 md:p-6"
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}

/**
 * TerminalLine — eine Zeile im Terminal mit optional prompt prefix und color class.
 */
export function TerminalLine({
  prompt,
  children,
  className = "",
}: {
  prompt?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-start gap-2.5 ${className}`}>
      {prompt && (
        <span className="shrink-0 select-none text-[var(--color-accent-500)]">
          {prompt}
        </span>
      )}
      <span className="min-w-0 break-words">{children}</span>
    </div>
  );
}

export const tokens = {
  keyword: "text-[#ff7b9c]",
  string: "text-[var(--color-accent-400)]",
  number: "text-[#f6b44e]",
  comment: "text-white/35 italic",
  fn: "text-[var(--color-electric)]",
  prop: "text-[#c8a4ff]",
  punct: "text-white/50",
  dim: "text-white/50",
};
