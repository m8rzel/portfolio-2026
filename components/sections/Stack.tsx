"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { Marquee } from "@/components/motion/Marquee";
import { SectionLabel } from "./About";

const STACK_ROWS: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Go", "SQL", "Bash"],
  },
  {
    label: "Frontend",
    items: ["Next.js", "React", "React Native", "Tailwind CSS", "Framer Motion", "shadcn/ui", "Vue"],
  },
  {
    label: "Backend & Data",
    items: ["Node.js", "Express", "tRPC", "MongoDB", "Postgres", "Redis", "Prisma"],
  },
  {
    label: "AI & Automation",
    items: ["Claude", "GPT-4", "MCP", "LangChain", "n8n", "Pinecone", "Whisper"],
  },
  {
    label: "Infrastructure",
    items: ["Vercel", "AWS", "Docker", "GitHub Actions", "Cloudflare", "Plausible"],
  },
];

const PRINCIPLES = [
  {
    title: "Ship fast, ship often.",
    body: "Ein MVP in 2 Wochen sagt mehr als ein Pitch-Deck in 3 Monaten. Feedback aus Prod schlägt Annahmen.",
  },
  {
    title: "AI-first, nicht AI-only.",
    body: "Claude & Co. übernehmen Grunzarbeit. Aber das Produkt gehört dem Menschen — und die Architektur auch.",
  },
  {
    title: "Code fürs nächste Jahr.",
    body: "TypeScript strict. Tests für Critical Paths. Dokumentation, wo sie zählt. Keine Cleverness um der Cleverness willen.",
  },
  {
    title: "Design ist kein Add-on.",
    body: "Langsame, hässliche, unverständliche Software ist schlechte Software — selbst wenn das Backend perfekt ist.",
  },
];

export function Stack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="relative border-t border-white/[0.05] py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <FadeIn>
          <SectionLabel number="06" label="Stack & Arbeitsweise" />
        </FadeIn>

        <FadeIn delay={0.08}>
          <h2
            id="stack-heading"
            className="mt-6 font-display text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            Tools, die ich kenne.
            <br />
            <span className="text-white/30">Prinzipien, die ich lebe.</span>
          </h2>
        </FadeIn>
      </div>

      {/* Marquee of stack items */}
      <FadeIn delay={0.15}>
        <div className="mt-16 border-y border-white/[0.05] bg-white/[0.01] py-6">
          <Marquee>
            {STACK_ROWS.flatMap((r) => r.items).map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="font-display text-4xl tracking-tight text-white/50 transition-colors hover:text-white md:text-5xl lg:text-6xl"
              >
                {item}
                <span className="ml-12 text-[var(--color-accent-500)]">*</span>
              </span>
            ))}
          </Marquee>
        </div>
      </FadeIn>

      <div className="mx-auto mt-20 max-w-7xl px-6 lg:px-10">
        {/* Stack — structured table */}
        <FadeIn>
          <div className="grid gap-0 rounded-2xl border border-white/[0.08] bg-white/[0.015] overflow-hidden">
            {STACK_ROWS.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[140px_1fr] gap-6 px-6 py-5 md:grid-cols-[200px_1fr] md:px-8 md:py-6 ${
                  i !== STACK_ROWS.length - 1 ? "border-b border-white/[0.05]" : ""
                }`}
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 md:text-xs">
                  {row.label}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {row.items.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-sm text-white/80 md:text-[15px]"
                    >
                      {item}
                      <span className="text-white/20 ml-3">/</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Principles */}
        <FadeIn delay={0.1}>
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/[0.08] md:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.title}
                className="relative bg-[var(--color-ink-950)] p-8 md:p-10"
              >
                <div className="font-mono text-[11px] text-white/30">
                  0{i + 1} / 04
                </div>
                <h3 className="mt-5 font-display text-2xl leading-tight tracking-tight text-white md:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-white/65">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
