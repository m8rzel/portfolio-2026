"use client";

import { motion, useMotionValue, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionLabel } from "./About";

type Project = {
  name: string;
  tagline: string;
  year: string;
  tags: string[];
  url: string;
  featureColor: string;
  accentHex: string;
  number: string;
};

/* Curated subset of thenotperfect showcases — the 6 that best demonstrate range. */
const PROJECTS: Project[] = [
  {
    number: "01",
    name: "DoorVision 3D",
    tagline: "Interaktiver 3D-Türkonfigurator mit Echtzeit-Preview und Share-Links.",
    year: "2025",
    tags: ["React", "Three.js", "WebGL"],
    url: "https://door-configurator-seven.vercel.app",
    featureColor: "from-amber-500/20 to-orange-500/5",
    accentHex: "#f59e0b",
  },
  {
    number: "02",
    name: "Huddle",
    tagline: "Virtueller Workspace mit Spatial-Audio, Focus Mode und Team-Channels.",
    year: "2025",
    tags: ["Next.js", "SaaS", "WebRTC"],
    url: "https://huddle-taupe-eta.vercel.app",
    featureColor: "from-violet-500/20 to-fuchsia-500/5",
    accentHex: "#a855f7",
  },
  {
    number: "03",
    name: "VeganMentor",
    tagline: "Mentoring-Plattform mit Matching-Algorithmus, 1:1 Chat und Community.",
    year: "2025",
    tags: ["Matching", "Real-time", "Auth"],
    url: "https://veganmentor.vercel.app",
    featureColor: "from-lime-500/20 to-emerald-500/5",
    accentHex: "#84cc16",
  },
  {
    number: "04",
    name: "BAUHAUS Architekten",
    tagline: "Editorial-Portfolio für ein Züricher Architekturbüro — ruhig, typografisch.",
    year: "2025",
    tags: ["Editorial", "CMS", "Animation"],
    url: "https://architect-portfolio-drab.vercel.app",
    featureColor: "from-stone-400/20 to-zinc-400/5",
    accentHex: "#a8a29e",
  },
  {
    number: "05",
    name: "BLACKBLADE",
    tagline: "Barbershop-Landingpage mit Online-Booking und starker Visual Identity.",
    year: "2025",
    tags: ["Booking", "Landing", "Brand"],
    url: "https://barbershop-website-red.vercel.app",
    featureColor: "from-red-500/20 to-rose-500/5",
    accentHex: "#ef4444",
  },
  {
    number: "06",
    name: "TheCup",
    tagline: "Produkt-Landingpage für ein NFC-basiertes Mehrweg-Pfandsystem.",
    year: "2024",
    tags: ["Product", "Landing", "B2B"],
    url: "https://thecup-landing.vercel.app",
    featureColor: "from-sky-500/20 to-cyan-500/5",
    accentHex: "#0ea5e9",
  },
];

export function SelectedWork() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      ref={ref}
      id="work"
      aria-labelledby="work-heading"
      className="relative border-t border-white/[0.05] px-6 py-28 lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionLabel number="05" label="Kundenprojekte" />
        </FadeIn>

        <FadeIn delay={0.08}>
          <h2
            id="work-heading"
            className="mt-6 font-display text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            Was ich baue,
            <br />
            <span className="text-white/30">wenn Kunden fragen.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.16}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60">
            Ein Auszug aus Kundenprojekten, die wir bei{" "}
            <a
              href="https://thenotperfect.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-[var(--color-accent-500)] hover:decoration-[var(--color-accent-500)]"
            >
              thenotperfect
            </a>{" "}
            ausgeliefert haben. Die vollständige Sammlung und Case-Studies findest
            du auf der Agentur-Seite.
          </p>
        </FadeIn>

        <motion.div style={{ x }} className="mt-14">
          <div
            className="pointer-events-none font-mono text-[10vw] leading-none tracking-[-0.03em] text-white/[0.04] whitespace-nowrap md:text-[7vw]"
            aria-hidden
          >
            <span className="text-[var(--color-accent-500)]/40">//</span> case_studies &nbsp;&nbsp;<span className="text-[var(--color-accent-500)]/40">//</span> client_work &nbsp;&nbsp;<span className="text-[var(--color-accent-500)]/40">//</span> shipped
          </div>
        </motion.div>

        {/* Project grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.name} delay={(i % 2) * 0.1}>
              <ProjectCard project={p} />
            </FadeIn>
          ))}
        </div>

        {/* CTA → thenotperfect */}
        <FadeIn delay={0.1}>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 md:flex-row md:items-center md:p-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-white/40">
                Weitere Projekte →
              </div>
              <p className="mt-3 font-display text-3xl leading-tight tracking-tight text-white md:text-4xl">
                Alle Showcases auf <span className="text-[var(--color-accent-500)]">thenotperfect.de</span>
              </p>
            </div>
            <a
              href="https://thenotperfect.de/showcase"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 font-mono text-sm text-white transition-all hover:border-[var(--color-accent-500)]/50 hover:bg-[var(--color-accent-500)]/10"
            >
              Zur Showcase-Seite
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, ${hexToRgba(project.accentHex, 0.12)}, transparent 70%)`;

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
      aria-label={`${project.name} — öffne Live-Demo in neuem Tab`}
      className="group relative block overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.015] transition-colors hover:border-white/[0.2]"
    >
      {/* Decorative visual panel */}
      <div
        className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${project.featureColor}`}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 80% 20%, ${hexToRgba(
              project.accentHex,
              0.28
            )} 0%, transparent 45%)`,
          }}
        />
        <div className="absolute inset-0 bg-grid opacity-[0.35] mix-blend-overlay" />

        {/* Big number */}
        <div className="absolute bottom-6 left-8 font-display text-[120px] leading-none text-white/10 tracking-tighter md:text-[150px]">
          {project.number}
        </div>

        {/* Project title overlay */}
        <div className="absolute bottom-6 right-6 text-right">
          <div className="font-display text-2xl leading-none tracking-tight text-white md:text-3xl">
            {project.name}
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            {project.year}
          </div>
        </div>

        {/* Spotlight on hover */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        {/* Hover arrow */}
        <div className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur-sm transition-all group-hover:border-white/50 group-hover:bg-white group-hover:text-black">
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6 md:p-7">
        <p className="text-[15px] leading-relaxed text-white/70">
          {project.tagline}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-white/60"
            >
              {t}
            </span>
          ))}
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
