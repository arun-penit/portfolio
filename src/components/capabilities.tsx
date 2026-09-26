"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { about } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

const GAP = 58; // vertical distance between layers in the 3D stack
const layers = about.pillars;

export function Capabilities() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setActive((a) => (a + 1) % layers.length), 4200);
    return () => clearInterval(id);
  }, [auto]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <div className="mt-28">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h3 className="max-w-2xl text-balance text-3xl font-medium leading-tight tracking-tight md:text-5xl">
            Every layer a request touches — <span className="font-serif italic text-acid">one engineer.</span>
          </h3>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            What I bring to your team, as a cross-section of a real product. Select a layer to see the proof.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* 3D stack */}
        <Reveal className="relative mx-auto h-[340px] w-full max-w-[460px] sm:h-[420px]">
          <div
            aria-hidden
            className="absolute inset-0 rounded-full opacity-40 blur-[90px]"
            style={{ background: "radial-gradient(closest-side, rgb(205 251 82 / 0.25), transparent)" }}
          />
          <div className="absolute inset-0 grid place-items-center [perspective:1400px]">
            <div
              className="relative size-[190px] sm:size-[230px]"
              style={{ transformStyle: "preserve-3d", transform: "rotateX(58deg) rotateZ(-42deg) translateZ(-60px)" }}
            >
              {layers.map((l, i) => {
                const on = i === active;
                const z = (layers.length - 1 - i) * GAP;
                return (
                  <motion.button
                    key={l.layer}
                    type="button"
                    tabIndex={-1}
                    onClick={() => pick(i)}
                    animate={{ z: on ? z + 34 : z, opacity: on ? 1 : 0.55 }}
                    transition={{ type: "spring", stiffness: 160, damping: 20 }}
                    className={cn(
                      "absolute inset-0 cursor-pointer overflow-hidden rounded-[22px] border text-left transition-[border-color,box-shadow,background-color] duration-500",
                      on
                        ? "border-acid/80 bg-ink-3 shadow-[0_0_60px_-10px_rgb(205_251_82/0.45)]"
                        : "border-line-2 bg-ink-2/85",
                    )}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="grid-bg absolute inset-0 opacity-80 [background-size:22px_22px] [mask-image:none]" />
                    <div className="absolute left-4 top-4 flex items-center gap-2">
                      <span className={cn("size-1.5 rounded-full", on ? "bg-acid" : "bg-faint")} />
                      <span className={cn("font-mono text-[10px] uppercase tracking-[0.2em]", on ? "text-acid" : "text-muted")}>
                        {String(i + 1).padStart(2, "0")} · {l.layer}
                      </span>
                    </div>
                    {/* port markings */}
                    <div className="absolute bottom-4 right-4 flex gap-1">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <span key={k} className={cn("h-3 w-1 rounded-full", on && k <= i + 1 ? "bg-acid/80" : "bg-white/10")} />
                      ))}
                    </div>
                  </motion.button>
                );
              })}

              {/* request signal travelling down through every layer */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 -ml-1.5 -mt-1.5 size-3 rounded-full bg-acid"
                style={{ boxShadow: "0 0 18px 4px rgb(205 251 82 / 0.7)" }}
                animate={{ z: [(layers.length - 1) * GAP + 90, -10], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeIn", times: [0, 0.1, 0.85, 1] }}
              />
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
            request path ↓
          </div>
        </Reveal>

        {/* layer details */}
        <div role="tablist" aria-label="Capabilities" className="border-t border-line">
          {layers.map((l, i) => {
            const on = i === active;
            return (
              <div key={l.layer} className="border-b border-line">
                <button
                  role="tab"
                  aria-selected={on}
                  onClick={() => pick(i)}
                  className="group flex w-full items-baseline gap-5 py-5 text-left"
                >
                  <span className={cn("font-mono text-xs transition-colors", on ? "text-acid" : "text-faint")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "text-2xl tracking-tight transition-colors md:text-3xl",
                      on ? "text-fg" : "text-muted group-hover:text-fg",
                    )}
                  >
                    {l.title} <span className="font-serif italic">{l.emphasis}</span>
                  </span>
                  <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.18em] text-faint sm:block">
                    {l.layer}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pl-9">
                        <p className="max-w-lg text-pretty leading-relaxed text-fg/75">{l.body}</p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {l.tags.map((t) => (
                            <span key={t} className="rounded-full border border-line-2 px-2.5 py-1 font-mono text-[11px] text-fg/80">
                              {t}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={`/work/${l.proof.slug}`}
                          className="group/proof mt-5 inline-flex items-center gap-2 rounded-full bg-acid/10 px-4 py-2 text-sm text-acid transition-colors hover:bg-acid hover:text-ink"
                        >
                          <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">Proof</span>
                          {l.proof.text}
                          <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover/proof:rotate-45" />
                        </Link>
                      </div>
                      {auto && (
                        <motion.div
                          className="h-px origin-left bg-acid/60"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 4.2, ease: "linear" }}
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
