import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#05060a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://marcelwiskow.de"),
  title: {
    default: "Marcel Wiskow — Fullstack-Developer & AI-Automatisierung",
    template: "%s · Marcel Wiskow",
  },
  description:
    "Marcel Wiskow baut seit 9 Jahren Web-Apps, Software und AI-Automatisierung. Fullstack-Developer aus Deutschland, Gründer von thenotperfect. Next.js, React, TypeScript, Claude & Co.",
  keywords: [
    "Marcel Wiskow",
    "Fullstack Developer",
    "AI Automatisierung",
    "Webentwicklung",
    "Software Development",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Freelance Entwickler",
    "thenotperfect",
  ],
  authors: [{ name: "Marcel Wiskow", url: "https://marcelwiskow.de" }],
  creator: "Marcel Wiskow",
  publisher: "Marcel Wiskow",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://marcelwiskow.de",
    siteName: "Marcel Wiskow",
    title: "Marcel Wiskow — Fullstack-Developer & AI-Automatisierung",
    description:
      "9 Jahre Entwicklungserfahrung. Spezialisiert auf AI-Automatisierung, Web- & Software-Development. Gründer von thenotperfect.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcel Wiskow — Fullstack-Developer & AI-Automatisierung",
    description:
      "9 Jahre Entwicklungserfahrung. AI-Automatisierung, Web- & Software-Development.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Marcel Wiskow",
  url: "https://marcelwiskow.de",
  jobTitle: "Fullstack-Developer & AI-Automation Engineer",
  worksFor: {
    "@type": "Organization",
    name: "thenotperfect",
    url: "https://thenotperfect.de",
  },
  sameAs: [
    "https://thenotperfect.de",
    "https://github.com/m8rzel",
  ],
  knowsAbout: [
    "Webentwicklung",
    "AI Automatisierung",
    "Software Development",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Claude",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} dark`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[var(--color-accent-500)] focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-black"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
