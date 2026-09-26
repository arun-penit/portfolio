"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { caseStudies, skills } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const norm = (s: string) => s.split("(")[0].trim().toLowerCase().replace(/\.js$/, "");

function projectsFor(skill: string) {
  const k = norm(skill);
  return caseStudies.filter((c) =>
    c.stack.some((s) => {
      const t = norm(s);
      return t === k || t.endsWith(` ${k}`);
    }),
  );
}

export function Skills() {
  const [selected, setSelected] = useState<string | null>("FastAPI");
  const used = useMemo(() => (selected ? projectsFor(selected) : []), [selected]);

  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:px-6 md:py-36">
      <SectionHeading
        index="04"
        label="Toolkit"
        title={
          <>
            The stack behind <span className="font-serif italic text-acid">the work</span>
          </>
        }
        intro="Tap any skill to see where I've used it in production."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, gi) => (
          <Reveal key={g.group} delay={(gi % 3) * 0.06} className="rounded-3xl border border-line bg-ink-2/40 p-6">
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-medium tracking-tight">{g.group}</h3>
              <span className="font-mono text-xs text-faint">{String(g.items.length).padStart(2, "0")}</span>
            </div>
            <p className="mt-1 text-sm text-muted">{g.blurb}</p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {g.items.map((s) => {
                const has = projectsFor(s).length > 0;
                const active = selected === s;
                return (
                  <button
                    key={s}
                    onClick={() => setSelected(active ? null : s)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-[13px] transition-all",
                      active
                        ? "border-acid bg-acid text-ink"
                        : "border-line text-fg/80 hover:border-line-2 hover:text-fg",
                    )}
                  >
                    {s}
                    {has && !active && <span className="ml-1.5 inline-block size-1 rounded-full bg-acid/70 align-middle" />}
                  </button>
                );
              })}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 min-h-24 rounded-3xl border border-dashed border-line-2 p-6" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected ?? "none"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {!selected ? (
              <p className="text-muted">Select a skill above.</p>
            ) : used.length === 0 ? (
              <p className="text-muted">
                <span className="text-fg">{selected}</span> — part of my everyday toolkit across projects.
              </p>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-muted">
                  <span className="text-fg">{selected}</span> used in
                </span>
                {used.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/work/${c.slug}`}
                    className="rounded-full bg-white/[0.06] px-4 py-2 text-sm transition-colors hover:bg-acid hover:text-ink"
                  >
                    {c.title} →
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
