import { site } from "@/lib/data";
import { LocalTime } from "./local-time";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 font-mono text-xs text-muted md:flex-row md:items-center md:justify-between md:px-6">
        <span>© {new Date().getFullYear()} {site.name} · Built with Next.js, Tailwind & Motion</span>
        <span>
          Noida · <LocalTime timeZone={site.timezone} /> IST · Press <kbd className="rounded border border-line px-1">⌘K</kbd> to navigate
        </span>
      </div>
    </footer>
  );
}
