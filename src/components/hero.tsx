"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { site } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "./icons";
import { LocalTime } from "./local-time";

const ease = [0.22, 1, 0.36, 1] as const;

const headline: { text: string; serif?: boolean }[] = [
  { text: "I" },
  { text: "build" },
  { text: "AI" },
  { text: "agents" },
  { text: "that" },
  { text: "talk,", serif: true },
  { text: "see", serif: true },
  { text: "&" },
  { text: "reason", serif: true },
  { text: "—" },
  { text: "and" },
  { text: "ship" },
  { text: "them" },
  { text: "to" },
  { text: "production." },
];

const glance = [
  ["Role", "Applied AI & Backend Engineer · Full-stack"],
  ["Experience", "2+ years · PenIT Technology"],
  ["Focus", "AI agents · RAG · Voice AI · APIs & integrations"],
  ["Based in", "Noida, India · IST (UTC+5:30)"],
  ["Open to", "Full-time · Remote · Relocation"],
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 18 });

  return (
    <section ref={ref} className="relative isolate overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
      <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgb(205 251 82 / 0.35), rgb(120 90 255 / 0.15), transparent)" }}
      />

      <motion.div style={{ opacity: fade }} className="mx-auto grid max-w-6xl gap-14 px-5 md:px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mb-8 flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs text-fg/90">
              <span className="size-1.5 animate-pulse-dot rounded-full bg-acid" />
              Open to international roles · remote or relocation
            </span>
            <span className="font-mono text-xs text-muted">
              Noida, IN · <LocalTime timeZone={site.timezone} /> IST
            </span>
          </motion.div>

          <h1 className="text-balance text-[2.6rem] font-medium leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.6rem]">
            {headline.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className={
                    w.serif
                      ? "inline-block pr-[0.06em] font-serif font-normal italic tracking-normal text-acid"
                      : "inline-block"
                  }
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.045, ease }}
                >
                  {w.text}
                </motion.span>
                {i < headline.length - 1 && " "}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease }}
            className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted"
          >
            I&apos;m <span className="text-fg">Arun Rawat</span>, an Applied AI &amp; Backend Engineer who ships full-stack.
            I build LLM-powered products end to end — voice agents, RAG systems and multimodal pipelines, the
            high-performance APIs and integrations behind them, and the apps that put them in users&apos; hands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 rounded-full bg-acid px-6 py-3.5 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
            >
              Explore case studies
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </Link>
            <a
              href={site.resume}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full border border-line-2 px-6 py-3.5 text-sm transition-colors hover:bg-white/5"
            >
              <Download className="size-4" /> Résumé
            </a>
            <div className="ml-1 flex items-center gap-1">
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-fg">
                <LinkedinIcon className="size-[18px]" />
              </a>
              <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-fg">
                <GithubIcon className="size-[18px]" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
          className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:mt-4 lg:max-w-none"
        >
          <motion.div
            onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              mx.set((e.clientX - r.left) / r.width - 0.5);
              my.set((e.clientY - r.top) / r.height - 0.5);
            }}
            onPointerLeave={() => {
              mx.set(0);
              my.set(0);
            }}
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
            className="relative"
          >
            <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-b from-acid/50 via-white/10 to-transparent" />
            <div className="relative overflow-hidden rounded-[2rem] bg-ink-2">
              <Image
                src="/arun.png"
                alt="Portrait of Arun Rawat"
                width={800}
                height={800}
                priority
                className="aspect-[4/5] w-full object-cover object-top brightness-[0.92] grayscale-[35%] contrast-[1.05] transition-[filter] duration-700 hover:grayscale-0"
                sizes="(min-width: 1024px) 420px, 90vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <div className="font-serif text-3xl italic leading-none">Arun Rawat</div>
                  <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    Software Engineer · PenIT
                  </div>
                </div>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open LinkedIn profile"
                  className="grid size-10 place-items-center rounded-full bg-fg text-ink transition-transform hover:rotate-45"
                >
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {[
            { t: "LangGraph · RAG", c: "-left-6 top-10", d: 0 },
            { t: "Voice agents", c: "-right-4 top-1/3", d: 0.6 },
            { t: "FastAPI · async", c: "-left-4 bottom-28", d: 1.2 },
          ].map((chip) => (
            <motion.span
              key={chip.t}
              className={`absolute ${chip.c} hidden rounded-full border border-line-2 bg-ink-2/80 px-3 py-1.5 font-mono text-[11px] text-fg/90 shadow-xl backdrop-blur-md sm:block`}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: chip.d }}
            >
              <span className="mr-1.5 text-acid">◆</span>
              {chip.t}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      <div className="mx-auto max-w-6xl px-5 md:px-6">
      <motion.dl
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.2, ease }}
        aria-label="At a glance"
        className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-20 lg:grid-cols-5"
      >
        {glance.map(([k, v]) => (
          <div key={k} className="bg-ink/90 p-4 backdrop-blur last:col-span-2 md:p-5 lg:last:col-span-1">
            <dt className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">{k}</dt>
            <dd className="mt-1.5 text-sm leading-snug text-fg/90">{v}</dd>
          </div>
        ))}
      </motion.dl>
      </div>
    </section>
  );
}
