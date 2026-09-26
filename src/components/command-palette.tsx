"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Briefcase, Copy, FileText, Hash, Mail, Search } from "lucide-react";
import { caseStudies, site } from "@/lib/data";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string; group: string; hint?: string; icon: React.ReactNode; run: () => void };

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
  }, []);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => {
      close();
      router.push(href);
    };
    const ext = (href: string) => () => {
      close();
      window.open(href, "_blank", "noopener,noreferrer");
    };
    return [
      ...["about", "work", "experience", "skills", "contact"].map((s) => ({
        id: s,
        label: s[0].toUpperCase() + s.slice(1),
        group: "Navigate",
        icon: <Hash className="size-4" />,
        run: go(`/#${s}`),
      })),
      ...caseStudies.map((c) => ({
        id: c.slug,
        label: c.title,
        hint: c.kicker,
        group: "Case studies",
        icon: <Briefcase className="size-4" />,
        run: go(`/work/${c.slug}`),
      })),
      {
        id: "copy-email",
        label: "Copy email address",
        hint: site.email,
        group: "Actions",
        icon: <Copy className="size-4" />,
        run: () => {
          navigator.clipboard?.writeText(site.email);
          close();
          setToast("Email copied");
          setTimeout(() => setToast(""), 1800);
        },
      },
      { id: "email", label: "Send an email", group: "Actions", icon: <Mail className="size-4" />, run: ext(`mailto:${site.email}`) },
      { id: "resume", label: "Download résumé", group: "Actions", icon: <FileText className="size-4" />, run: ext(site.resume) },
      { id: "linkedin", label: "LinkedIn", group: "Elsewhere", icon: <ArrowUpRight className="size-4" />, run: ext(site.linkedin) },
      { id: "github", label: "GitHub", group: "Elsewhere", icon: <ArrowUpRight className="size-4" />, run: ext(site.github) },
    ];
  }, [close, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") close();
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, [close]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 20);
  }, [open]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      filtered[index]?.run();
    }
  };

  let lastGroup = "";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command menu"
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-line-2 bg-ink-2/95 shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search className="size-4 text-muted" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIndex(0);
                  }}
                  onKeyDown={onInputKey}
                  placeholder="Search projects, sections, actions…"
                  className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-faint"
                />
                <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
              </div>
              <ul className="max-h-[50vh] overflow-y-auto p-2" data-lenis-prevent>
                {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">No results</li>}
                {filtered.map((item, i) => {
                  const header = item.group !== lastGroup;
                  lastGroup = item.group;
                  return (
                    <li key={item.id}>
                      {header && (
                        <div className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                          {item.group}
                        </div>
                      )}
                      <button
                        onMouseEnter={() => setIndex(i)}
                        onClick={item.run}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm",
                          i === index ? "bg-white/[0.07] text-fg" : "text-muted",
                        )}
                      >
                        <span className={i === index ? "text-acid" : ""}>{item.icon}</span>
                        <span className="flex-1">{item.label}</span>
                        {item.hint && <span className="truncate font-mono text-xs text-faint">{item.hint}</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-acid px-5 py-2.5 text-sm font-medium text-ink"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
