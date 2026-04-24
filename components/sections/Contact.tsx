"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionLabel } from "./About";
import { CopyButton } from "@/components/interactive/CopyButton";

const LINKS: {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  note: string;
  copy?: string;
}[] = [
  {
    label: "m.wiskow96@gmail.com",
    href: "mailto:m.wiskow96@gmail.com",
    icon: Mail,
    note: "Mail — Antwort meist in 24h",
    copy: "m.wiskow96@gmail.com",
  },
  {
    label: "github.com/m8rzel",
    href: "https://github.com/m8rzel",
    icon: Github,
    note: "GitHub — Code, Experimente, OSS",
    copy: "github.com/m8rzel",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/marcel-wiskow-a95b42243/",
    icon: Linkedin,
    note: "LinkedIn — Werdegang & Netzwerk",
  },
  {
    label: "thenotperfect.de",
    href: "https://thenotperfect.de",
    icon: ArrowUpRight,
    note: "Agentur — für größere Projekte mit Team",
  },
];

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  return (
    <section
      ref={ref}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden border-t border-white/[0.05] px-6 py-28 lg:px-10 lg:py-40"
    >
      {/* Massive background word */}
      <motion.div
        style={{ scale }}
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="font-display text-[30vw] leading-none tracking-[-0.05em] text-white/[0.03] whitespace-nowrap">
          hello.
        </div>
      </motion.div>

      <div className="relative mx-auto max-w-7xl">
        <FadeIn>
          <SectionLabel number="07" label="Kontakt" />
        </FadeIn>

        <FadeIn delay={0.08}>
          <h2
            id="contact-heading"
            className="mt-6 font-display text-6xl leading-[0.92] tracking-tight text-white md:text-8xl lg:text-[9rem]"
          >
            Lass uns
            <br />
            <span className="inline-flex items-center gap-4">
              bauen
              <span className="inline-block h-[0.7em] w-[0.14em] bg-[var(--color-accent-500)] animate-blink translate-y-[0.05em]" />
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.16}>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/70">
            Egal ob MVP, AI-Integration, Refactoring oder komplettes Produkt —
            schreib mir. Im ersten 30-Min-Call klären wir, ob&apos;s passt.
            Unverbindlich, kostenlos.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {LINKS.map((l, i) => (
            <FadeIn key={l.href} delay={i * 0.07}>
              <ContactLink {...l} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactLink({
  label,
  href,
  icon: Icon,
  note,
  copy,
}: {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  note: string;
  copy?: string;
}) {
  const external = href.startsWith("http");
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.015] p-6 backdrop-blur-sm transition-all hover:border-[var(--color-accent-500)]/40 hover:bg-[var(--color-accent-500)]/[0.03] md:p-7"
    >
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="absolute inset-0 z-10 rounded-2xl"
        aria-label={`${label} öffnen`}
      />
      <div className="relative z-20 flex min-w-0 items-center gap-5 pointer-events-none">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors group-hover:border-[var(--color-accent-500)]/40 group-hover:bg-[var(--color-accent-500)]/[0.08]">
          <Icon className="h-5 w-5 text-white/80 transition-colors group-hover:text-[var(--color-accent-500)]" />
        </div>
        <div className="min-w-0">
          <div className="font-display text-xl tracking-tight text-white truncate md:text-2xl">
            {label}
          </div>
          <div className="mt-1 font-mono text-xs text-white/45">{note}</div>
        </div>
      </div>
      <div className="relative z-20 flex shrink-0 items-center gap-2">
        {copy && <CopyButton text={copy} size="sm" />}
        <ArrowUpRight className="h-5 w-5 text-white/30 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white pointer-events-none" />
      </div>
    </motion.div>
  );
}
