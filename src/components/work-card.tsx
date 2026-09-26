"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/data";
import { cn } from "@/lib/utils";

export function WorkCard({ study, featured = false }: { study: CaseStudy; featured?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const accent = `oklch(0.85 0.17 ${study.hue})`;

  return (
    <Link
      ref={ref}
      href={`/work/${study.slug}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      style={{ "--accent": accent } as React.CSSProperties}
      className={cn(
        "group relative flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-line bg-ink-2/60 p-6 transition-colors duration-500 hover:border-line-2 md:p-8",
        featured && "md:p-10",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(500px circle at var(--x) var(--y), color-mix(in oklch, var(--accent) 12%, transparent), transparent 60%)" }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span style={{ color: accent }}>{study.index}</span> · {study.kicker}
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-fg group-hover:text-ink">
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      {/* mini pipeline preview */}
      <div className={cn("relative my-8 grid grid-cols-2 gap-2 sm:flex sm:items-stretch", featured ? "md:my-12" : "")}>
        {study.architecture.map((stage, i) => (
          <div key={stage.title} className="flex min-w-0 flex-1 items-center gap-2">
            <div
              className="min-w-0 flex-1 rounded-xl border border-line bg-ink/70 px-3 py-3 transition-all duration-500 group-hover:-translate-y-1"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="mb-2 h-1 w-6 rounded-full" style={{ background: accent, opacity: 0.35 + i * 0.2 }} />
              <div className="line-clamp-2 text-[11px] leading-tight text-fg/80 md:text-xs">{stage.title}</div>
            </div>
            {i < study.architecture.length - 1 && <div className="hidden h-px w-2 shrink-0 bg-line-2 sm:block" />}
          </div>
        ))}
      </div>

      <div className="relative mt-auto">
        <div className="mb-2 font-mono text-xs text-faint">{study.period} · {study.context}</div>
        <h3 className={cn("text-2xl font-medium tracking-tight", featured && "md:text-4xl")}>{study.title}</h3>
        <p className="mt-3 max-w-xl text-pretty leading-relaxed text-muted">{study.tagline}</p>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {study.stack.slice(0, featured ? 6 : 4).map((s) => (
              <span key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
                {s}
              </span>
            ))}
          </div>
          <div className="flex gap-6">
            {study.metrics.slice(0, 2).map((m) => (
              <div key={m.label} className="text-right">
                <div className="text-xl font-medium tracking-tight" style={{ color: accent }}>{m.value}</div>
                <div className="text-[11px] text-muted">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
