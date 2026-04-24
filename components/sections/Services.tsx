"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Brain, Code2, Boxes } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionLabel } from "./About";

type Service = {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  tag: string;
  description: string;
  bullets: string[];
  accent: string;
  command: string;
  output: string;
};

const SERVICES: Service[] = [
  {
    icon: Brain,
    title: "AI-Automatisierung",
    tag: "Agents · Workflows · RAG",
    description:
      "Ich baue Claude- und GPT-basierte Agenten, die echte Arbeit übernehmen — von Ticket-Erstellung über Content-Pipelines bis hin zu ganzen Back-Office-Flows.",
    bullets: [
      "Claude-, GPT- und Open-Source-Modelle",
      "Multi-Agent-Systeme & MCP-Server",
      "RAG, Vektor-DBs, Knowledge Retrieval",
      "n8n, LangChain, eigene Orchestrierung",
    ],
    accent: "var(--color-accent-500)",
    command: "$ agent run --task='process tickets'",
    output: "→ 247 tickets routed · 0 manual touches",
  },
  {
    icon: Code2,
    title: "Web-Development",
    tag: "Next.js · React · TypeScript",
    description:
      "Schnelle, SEO-starke Websites und Web-Apps. Von der Landing Page mit <100ms TTI bis zur SaaS-Plattform mit Multi-Tenant-Backend.",
    bullets: [
      "Next.js 15/16 · React 19 · Server Components",
      "Tailwind, Framer Motion, Radix UI",
      "Headless CMS, MDX, E-Commerce",
      "Core Web Vitals 100/100 als Standard",
    ],
    accent: "var(--color-electric)",
    command: "$ lighthouse --url=marcelwiskow.de",
    output: "→ perf 100 · a11y 100 · seo 100",
  },
  {
    icon: Boxes,
    title: "Software-Development",
    tag: "APIs · SaaS · Mobile",
    description:
      "Produktionsreife Systeme: Node-APIs, Mongo/Postgres-Backends, React-Native-Apps. End-to-end aus einer Hand — Architektur, Code, Deployment, Monitoring.",
    bullets: [
      "Node.js, Express, tRPC, GraphQL",
      "React Native, Expo, iOS/Android",
      "Docker, Vercel, AWS, CI/CD",
      "Architektur-Reviews & Refactorings",
    ],
    accent: "var(--color-accent-500)",
    command: "$ deploy production --zero-downtime",
    output: "→ built in 38s · shipped · live",
  },
];

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative border-t border-white/[0.05] px-6 py-28 lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionLabel number="03" label="Was ich baue" />
        </FadeIn>

        <FadeIn delay={0.08}>
          <h2
            id="services-heading"
            className="mt-6 font-display text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            Drei Disziplinen.
            <br />
            <span className="text-white/30">Ein Kopf.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.16}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60">
            Ich spezialisiere mich absichtlich nicht. AI, Web und Software
            greifen in modernen Produkten so stark ineinander, dass Silos nur
            bremsen. Ich baue alles — oder hole mir gezielt Verstärkung aus
            meinem Netzwerk bei&nbsp;
            <a
              href="https://thenotperfect.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-[var(--color-accent-500)] hover:decoration-[var(--color-accent-500)]"
            >
              thenotperfect
            </a>
            .
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.08}>
              <ServiceCard service={s} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, ${service.accent === "var(--color-electric)" ? "rgba(109, 245, 255, 0.08)" : "rgba(56, 224, 120, 0.08)"}, transparent 70%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.015] p-8 backdrop-blur-sm transition-colors hover:border-white/[0.18]"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <div
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10"
          style={{ backgroundColor: `color-mix(in srgb, ${service.accent} 8%, transparent)` }}
        >
          <Icon className="h-5 w-5" style={{ color: service.accent }} />
        </div>

        <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
          {service.tag}
        </div>
        <h3 className="mt-3 font-display text-3xl tracking-tight text-white md:text-[32px]">
          {service.title}
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-white/65">
          {service.description}
        </p>

        <ul className="mt-8 space-y-2.5">
          {service.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 font-mono text-[13px] text-white/55"
            >
              <span
                aria-hidden
                className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                style={{ backgroundColor: service.accent }}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* Mini terminal output — appears on hover, peeks when idle */}
        <div className="mt-auto pt-8">
          <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-black/30 transition-colors group-hover:border-white/15">
            <div className="flex items-center gap-2 border-b border-white/[0.05] px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
            </div>
            <div className="space-y-1 p-3 font-mono text-[11.5px]">
              <div className="text-white/70">{service.command}</div>
              <div style={{ color: service.accent }}>{service.output}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
