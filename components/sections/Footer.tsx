export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/[0.05] px-6 py-10 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 font-mono text-xs text-white/40">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-[var(--color-accent-500)] text-black font-bold text-[10px]">
            MW
          </span>
          <span>© {year} Marcel Wiskow — alle Rechte vorbehalten.</span>
        </div>

        <div className="flex flex-wrap items-center gap-5 font-mono text-xs text-white/50">
          <a
            href="https://thenotperfect.de/impressum"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Impressum
          </a>
          <a
            href="https://thenotperfect.de/datenschutz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Datenschutz
          </a>
          <a
            href="https://thenotperfect.de"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Agentur →
          </a>
        </div>
      </div>
    </footer>
  );
}
