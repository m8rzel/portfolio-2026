"use client";

import { motion, useMotionValue, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, GraduationCap, Code2, FileText, PawPrint, Bike } from "lucide-react";
import { useRef } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionLabel } from "./About";

type Product = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
  status: "live" | "beta";
};

const PRODUCTS: Product[] = [
  {
    name: "Skolli",
    tagline: "Die Lernplattform, die mitdenkt.",
    description:
      "KI-gestützte Lernplattform für Unternehmen, Coaches und Akademien — mit Drag&Drop-Kurs-Builder, Auto-Transkription und generiertem Quiz.",
    url: "https://skolli.de",
    category: "EdTech SaaS",
    tags: ["AI", "LMS", "White-Label", "Gamification"],
    icon: GraduationCap,
    accent: "#38e078",
    status: "live",
  },
  {
    name: "vegap",
    tagline: "Standardize APIs in seconds, not weeks.",
    description:
      "API-Standardisierungsplattform für Enterprise-Teams mit komplexen API-Ökosystemen. Statt wochenlang manuell — automatisiert.",
    url: "https://vegap.de",
    category: "Developer Tools",
    tags: ["API", "OpenAPI", "Enterprise", "B2B"],
    icon: Code2,
    accent: "#6df5ff",
    status: "live",
  },
  {
    name: "sayvo",
    tagline: "Rechnungen. Per Chat.",
    description:
      "AI-Rechnungssoftware für Freelancer. Erstellt Rechnungen per Chat, berechnet Steuern, versendet automatisch. XRechnung- und ZUGFeRD-konform.",
    url: "https://sayvo.de",
    category: "Fintech SaaS",
    tags: ["AI", "Fintech", "Telegram Bot", "Compliance"],
    icon: FileText,
    accent: "#a855f7",
    status: "live",
  },
  {
    name: "SaferPaws",
    tagline: "Jedes Tier verdient ein sicheres Zuhause.",
    description:
      "Plattform für verifizierte Tiervermittlung. Interaktive Kurse, Smart-Matching zwischen Adoptanten und Tierheimen, Gamification-Flow.",
    url: "https://saferpaws.de",
    category: "Impact SaaS",
    tags: ["Matching", "Gamification", "B2B2C", "Social"],
    icon: PawPrint,
    accent: "#f59e0b",
    status: "live",
  },
  {
    name: "dreamride",
    tagline: "Dein Abenteuer. Dein Spot. Dein Ride.",
    description:
      "Mobile App für Radfahrer und Mountainbiker — Spots entdecken, Routen teilen, Riding-Partner finden. Mit Strava-Integration.",
    url: "https://www.dream-ride.de",
    category: "Social Mobile App",
    tags: ["React Native", "Location", "Strava API", "Community"],
    icon: Bike,
    accent: "#ef4444",
    status: "live",
  },
];

export function Products() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ref}
      id="products"
      aria-labelledby="products-heading"
      className="relative border-t border-white/[0.05] px-6 py-28 lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionLabel number="04" label="Eigene Produkte" />
        </FadeIn>

        <FadeIn delay={0.08}>
          <h2
            id="products-heading"
            className="mt-6 font-display text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            Was ich baue,
            <br />
            <span className="text-white/30">wenn niemand fragt.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.16}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60">
            Fünf Produkte, die über{" "}
            <a
              href="https://thenotperfect.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-[var(--color-accent-500)] hover:decoration-[var(--color-accent-500)]"
            >
              thenotperfect
            </a>{" "}
            entstanden sind. Kein Kundenauftrag, sondern eigene Wetten —
            von EdTech bis Developer Tools. Jedes davon live.
          </p>
        </FadeIn>

        {/* Ghost display text */}
        <motion.div style={{ x }} className="mt-12" aria-hidden>
          <div className="pointer-events-none font-display text-[18vw] leading-none tracking-[-0.05em] text-white/[0.035] whitespace-nowrap md:text-[13vw]">
            shipped &nbsp;·&nbsp; live &nbsp;·&nbsp; revenue &nbsp;·&nbsp;
          </div>
        </motion.div>

        {/* Hero product — Skolli gets the big slot */}
        <FadeIn>
          <div className="mt-6">
            <HeroProductCard product={PRODUCTS[0]} />
          </div>
        </FadeIn>

        {/* Rest in grid */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {PRODUCTS.slice(1).map((p, i) => (
            <FadeIn key={p.name} delay={(i % 2) * 0.08}>
              <ProductCard product={p} />
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.1}>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 md:flex-row md:items-center md:p-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-white/40">
                Alle Produkte im Detail →
              </div>
              <p className="mt-3 font-display text-3xl leading-tight tracking-tight text-white md:text-4xl">
                Case-Studies auf <span className="text-[var(--color-accent-500)]">thenotperfect.de/produkte</span>
              </p>
            </div>
            <a
              href="https://thenotperfect.de/produkte"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 font-mono text-sm text-white transition-all hover:border-[var(--color-accent-500)]/50 hover:bg-[var(--color-accent-500)]/10"
            >
              Zur Produkt-Seite
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO PRODUCT — big featured card for Skolli
   ═══════════════════════════════════════════════════════════ */
function HeroProductCard({ product }: { product: Product }) {
  const Icon = product.icon;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(700px circle at ${mouseX}px ${mouseY}px, ${hexToRgba(product.accent, 0.14)}, transparent 65%)`;

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
  };

  return (
    <motion.a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
      aria-label={`${product.name} — öffne Live-Seite in neuem Tab`}
      className="group relative grid overflow-hidden rounded-3xl border border-white/[0.1] bg-white/[0.015] transition-colors hover:border-white/[0.25] md:grid-cols-5"
    >
      {/* Left visual */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-transparent to-black/30 md:col-span-2 md:aspect-auto">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, ${hexToRgba(
              product.accent,
              0.35
            )} 0%, transparent 55%), radial-gradient(circle at 80% 80%, ${hexToRgba(
              product.accent,
              0.15
            )} 0%, transparent 40%)`,
          }}
        />
        <div className="absolute inset-0 bg-grid opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon
            className="h-28 w-28 animate-glow md:h-40 md:w-40"
            style={{ color: product.accent }}
          />
        </div>
        <div className="absolute top-6 left-6 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-500)] animate-pulse-dot" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
            {product.status}
          </span>
        </div>
      </div>

      {/* Right content */}
      <div className="relative flex flex-col justify-between gap-8 p-8 md:col-span-3 md:p-12">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
            <span>flagship</span>
            <span className="h-px w-8 bg-white/20" />
            <span>{product.category}</span>
          </div>
          <h3 className="mt-5 font-display text-5xl leading-[0.95] tracking-tight text-white md:text-7xl">
            {product.name}
          </h3>
          <p className="mt-4 font-display text-xl leading-tight tracking-tight text-white/80 md:text-2xl">
            {product.tagline}
          </p>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/65">
            {product.description}
          </p>
        </div>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-2 font-mono text-sm text-white/80 transition-colors group-hover:text-[var(--color-accent-500)]">
            {product.url.replace(/^https?:\/\//, "")}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════════════════
   PRODUCT CARD — compact grid version
   ═══════════════════════════════════════════════════════════ */
function ProductCard({ product }: { product: Product }) {
  const Icon = product.icon;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, ${hexToRgba(product.accent, 0.14)}, transparent 70%)`;

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
  };

  return (
    <motion.a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
      aria-label={`${product.name} — öffne Live-Seite in neuem Tab`}
      className="group relative block overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.015] p-7 transition-colors hover:border-white/[0.2] md:p-8"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
            style={{
              backgroundColor: hexToRgba(product.accent, 0.08),
              borderColor: hexToRgba(product.accent, 0.25),
            }}
          >
            <Icon className="h-5 w-5" style={{ color: product.accent }} />
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-500)] animate-pulse-dot" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
              {product.status}
            </span>
          </div>
        </div>

        <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
          {product.category}
        </div>
        <h3 className="mt-2 font-display text-3xl leading-tight tracking-tight text-white md:text-[34px]">
          {product.name}
        </h3>
        <p className="mt-2 font-display text-lg leading-snug tracking-tight text-white/75">
          {product.tagline}
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-white/60">
          {product.description}
        </p>

        <div className="mt-auto pt-6 flex items-end justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {product.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10.5px] text-white/55"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-white/60 transition-colors group-hover:text-white">
            {product.url.replace(/^https?:\/\//, "").replace(/^www\./, "")}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
