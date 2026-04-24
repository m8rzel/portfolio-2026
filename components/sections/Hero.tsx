"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { Terminal, TerminalLine } from "@/components/code/Terminal";
import { TypewriterLines } from "@/components/code/Typewriter";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-28 pb-16 lg:px-10"
    >
      {/* background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5]"
      >
        <div className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent-500)]/10 blur-[160px]" />
        <div className="absolute right-[10%] top-[20%] h-[280px] w-[280px] rounded-full bg-[var(--color-electric)]/5 blur-[140px]" />
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative mx-auto w-full max-w-7xl"
      >
        {/* status line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mb-10 flex items-center gap-3 font-mono text-xs text-white/50"
        >
          <span className="inline-flex h-2 w-2 items-center justify-center">
            <span className="absolute h-2 w-2 rounded-full bg-[var(--color-accent-500)]" />
            <span className="absolute h-2 w-2 animate-pulse-dot rounded-full bg-[var(--color-accent-500)]" />
          </span>
          <span className="uppercase tracking-[0.2em]">available_q3_2026</span>
          <span className="text-white/20">//</span>
          <span>based_in_germany</span>
        </motion.div>

        {/* Name — massive */}
        <div className="space-y-1">
          <Line delay={0.15}>
            <span className="text-white/50 font-mono text-[0.45em] align-top tracking-tight mr-4">
              01
            </span>
            Marcel
          </Line>
          <Line delay={0.3}>
            Wiskow<span className="text-[var(--color-accent-500)]">.</span>
          </Line>
        </div>

        {/* tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
          className="mt-10 max-w-2xl text-balance text-lg leading-relaxed text-white/70 md:text-xl"
        >
          Fullstack-Developer mit <b className="text-white">9 Jahren</b> Erfahrung.
          Ich baue <b className="text-white">Web-Apps</b>, <b className="text-white">Software</b> und
          <b className="text-white"> AI-Automatisierung</b> — schnell, wartbar, mit Liebe zum Detail.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-500)] px-7 py-3.5 font-mono text-sm font-semibold text-black transition-all hover:bg-[var(--color-accent-400)] hover:shadow-[0_0_40px_rgba(56,224,120,0.4)]"
          >
            <span>Projekt starten</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#products"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-7 py-3.5 font-mono text-sm text-white/80 backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/[0.05] hover:text-white"
          >
            <span>Arbeit ansehen</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">↓</span>
          </a>
        </motion.div>

        {/* Live Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
          className="mt-12 max-w-2xl"
        >
          <Terminal title="marcel@dev ~ %" accent>
            <TypewriterLines
              speed={22}
              lineDelay={200}
              startDelay={1600}
              lines={[
                "$ whoami",
                "→ marcel wiskow · fullstack developer",
                "$ cat skills.json",
                '  { "years": 9, "ai": true, "ships": "fast" }',
                "$ status --current",
                "→ building @thenotperfect · available for q3_2026",
              ]}
              lineClassName="whitespace-pre"
            />
          </Terminal>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
      >
        <span>scroll</span>
        <ArrowDown className="h-3 w-3 animate-bounce" />
      </motion.div>
    </section>
  );
}

/* ── Massive line with per-word stagger ── */
function Line({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="overflow-hidden">
      <motion.h1
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay }}
        className="font-display text-[18vw] leading-[0.88] tracking-[-0.055em] md:text-[15vw] lg:text-[12vw] xl:text-[11rem]"
      >
        {children}
      </motion.h1>
    </div>
  );
}
