# marcelwiskow.de

Personal Portfolio von Marcel Wiskow — Fullstack-Developer & AI-Automatisierung.
Gebaut mit **Next.js 16**, **React 19**, **Tailwind v4**, **Framer Motion**.

## Quick Start

```bash
# Einmalig: node_modules neu installieren (in der Session wurde auf thenotperfect verlinkt)
rm -rf node_modules
npm install

# Dev-Server starten
npm run dev          # → http://localhost:3000

# Production-Build
npm run build
npm run start
```

## Was drin ist

- **Hero** — massiver Bold-Display-Hero mit Scroll-Parallax und Name-Reveal
- **About** — Bio + animierter Counter (9 Jahre, 50+ Projekte)
- **Services** — 3 Kategorien: AI-Automation, Web, Software (Spotlight-Hover)
- **Selected Work** — 6 Highlight-Projekte → Link-out auf thenotperfect.de
- **Stack** — Marquee + strukturierte Tool-Tabelle + 4 Arbeitsprinzipien
- **Kontakt** — Mail, GitHub, LinkedIn, Agentur-Link

## SEO & Performance

- `metadata` + `openGraph` + `twitter` Meta komplett
- JSON-LD `Person`-Schema im `<head>`
- Auto-generated OG-Image via `app/opengraph-image.tsx`
- `sitemap.xml` und `robots.txt` als Route-Handler
- Google Fonts via `next/font` (kein externer Request, `display: swap`)
- `reduce-motion` wird respektiert
- Skip-Link, aria-labels, semantic HTML (`<nav>`, `<main>`, `<footer>`, `<section aria-labelledby=…>`)

## Design-Tokens

- Akzentfarbe: `#38e078` (Electric Green — eigenständig gegenüber thenotperfect's Lime)
- Fonts: Space Grotesk (Display) · Inter (Body) · JetBrains Mono (Code)
- Dark-Terminal-Aesthetic mit animated Grid-Backdrop, Cursor-Spotlight, Noise-Overlay

## Deploy

Empfohlen: **Vercel** (Zero-Config). Einfach Repo connecten, Domain `marcelwiskow.de` einhängen.

---

**Agentur:** [thenotperfect.de](https://thenotperfect.de)
