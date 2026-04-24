"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Counter } from "@/components/motion/Counter";

const STATS = [
  { value: 9, suffix: "+", label: "Jahre Entwicklungs­erfahrung" },
  { value: 50, suffix: "+", label: "Ausgelieferte Projekte" },
  { value: 3, suffix: "", label: "Kern-Disziplinen" },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-heading"
      className="relative border-t border-white/[0.05] px-6 py-28 lg:px-10 lg:py-36"
    >
      {/* Section label */}
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionLabel number="02" label="Über mich" />
        </FadeIn>

        {/* Headline — scrolling horizontal display text */}
        <motion.h2
          id="about-heading"
          style={{ x }}
          className="pointer-events-none mt-6 font-display text-[14vw] leading-[0.9] tracking-[-0.04em] text-white/[0.04] whitespace-nowrap md:text-[10vw]"
        >
          builder / shipper / thinker
        </motion.h2>

        <div className="mt-16 grid gap-16 lg:grid-cols-12">
          {/* Bio */}
          <div className="lg:col-span-7">
            <FadeIn>
              <p className="font-display text-3xl leading-[1.15] tracking-tight text-white md:text-[40px]">
                Seit 2016 baue ich Software — von der ersten WordPress-Seite
                zu produktionsreifen SaaS-Plattformen und AI-Agenten.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-white/70">
                <p>
                  Ich bin <b className="text-white">Marcel Wiskow</b>, Fullstack-Developer aus
                  Deutschland und Gründer der Software-Agentur{" "}
                  <a
                    href="https://thenotperfect.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-accent-500)] underline decoration-[var(--color-accent-500)]/30 underline-offset-4 transition-colors hover:decoration-[var(--color-accent-500)]"
                  >
                    thenotperfect
                  </a>
                  . Mein Schwerpunkt liegt auf{" "}
                  <b className="text-white">AI-Automatisierung</b>,{" "}
                  <b className="text-white">Web-Development</b> und{" "}
                  <b className="text-white">Software-Engineering</b> mit Next.js,
                  React, TypeScript und Node.
                </p>
                <p>
                  Was mich antreibt: Systeme, die funktionieren statt beeindrucken. Code,
                  der in 2 Jahren noch Sinn ergibt. Und AI-Tooling, das echte Probleme löst —
                  nicht nur Demo-Videos.
                </p>
                <p>
                  Was das in der Praxis heißt: Ich baue MVPs in Wochen statt Monaten, denke
                  Frontend und Backend zusammen, und automatisiere alles, was sich
                  zweimal tun lässt. Wenn du etwas baust, das echten Impact haben soll —
                  lass uns reden.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Stats column */}
          <div className="lg:col-span-5 lg:pl-10">
            <FadeIn delay={0.15}>
              <div className="sticky top-32 flex flex-col gap-0 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
                {STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`relative flex flex-col gap-2 px-7 py-7 ${
                      i !== STATS.length - 1 ? "border-b border-white/[0.06]" : ""
                    }`}
                  >
                    <div className="font-display text-6xl tracking-tight text-white md:text-7xl">
                      <Counter to={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="font-mono text-xs uppercase tracking-wider text-white/50">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-white/40">
      <span className="text-[var(--color-accent-500)]">{number}</span>
      <span className="h-px w-10 bg-white/20" />
      <span>{label}</span>
    </div>
  );
}
