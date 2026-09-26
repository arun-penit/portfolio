"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Command, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function openPalette() {
  window.dispatchEvent(new Event("open-palette"));
}

export function Nav() {
  const pathname = usePathname();
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [pathname]);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-acid"
      />
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
        <nav
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-500",
            scrolled || open
              ? "border-line bg-ink-2/70 shadow-[0_8px_40px_-12px_rgb(0_0_0/0.8)] backdrop-blur-xl"
              : "border-transparent",
          )}
        >
          <Link href="/" className="group flex items-center gap-2.5 pl-1" aria-label="Arun Rawat — home">
            <span className="grid size-8 place-items-center rounded-full bg-fg font-serif text-lg italic text-ink transition-transform duration-500 group-hover:rotate-[360deg]">
              a
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">Arun Rawat</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.id}>
                <Link
                  href={`/#${l.id}`}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors",
                    active === l.id ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={openPalette}
              className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-line-2 hover:text-fg sm:flex"
              aria-label="Open command menu"
            >
              <Command className="size-3" /> K
            </button>
            <Link
              href="/#contact"
              className="hidden rounded-full bg-acid px-4 py-2 text-sm font-medium text-ink transition-transform hover:scale-[1.03] sm:block"
            >
              Hire me
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              className="grid size-9 place-items-center rounded-full border border-line md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mx-auto mt-2 max-w-6xl rounded-3xl border border-line bg-ink-2/90 p-3 backdrop-blur-xl md:hidden"
            >
              {links.map((l, i) => (
                <Link
                  key={l.id}
                  href={`/#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-lg hover:bg-white/5"
                >
                  {l.label}
                  <span className="font-mono text-xs text-faint">0{i + 1}</span>
                </Link>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  openPalette();
                }}
                className="mt-1 w-full rounded-2xl px-4 py-3 text-left font-mono text-sm text-muted hover:bg-white/5"
              >
                Search everything…
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
