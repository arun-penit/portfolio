"use client";

import { motion } from "motion/react";
import type { Stage } from "@/lib/data";

export function Architecture({ stages, accent }: { stages: Stage[]; accent: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-ink-2/50 p-4 md:p-6">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-60" />

      {/* flow rail */}
      <div aria-hidden className="relative mb-5 hidden h-px bg-line-2 xl:block">
        <motion.span
          className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full"
          style={{ background: accent, boxShadow: `0 0 14px ${accent}` }}
          animate={{ left: ["0%", "100%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <ol className="relative grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stages.map((stage, i) => (
          <motion.li
            key={stage.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl border border-line-2 bg-ink/90 p-4 backdrop-blur"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="grid size-6 place-items-center rounded-md font-mono text-[11px] text-ink" style={{ background: accent }}>
                {i + 1}
              </span>
              {i < stages.length - 1 && <span className="font-mono text-xs text-faint">→</span>}
            </div>
            <div className="mt-3 text-sm font-medium">{stage.title}</div>
            <ul className="mt-3 space-y-1.5">
              {stage.items.map((it) => (
                <li key={it} className="flex items-start gap-2 font-mono text-[11.5px] leading-snug text-muted">
                  <span className="mt-[5px] size-1 shrink-0 rounded-full" style={{ background: accent }} />
                  {it}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
