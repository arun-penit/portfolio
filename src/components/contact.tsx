import { ArrowUpRight, Download } from "lucide-react";
import { site } from "@/lib/data";
import { CopyEmail } from "./copy-email";
import { GithubIcon, LinkedinIcon } from "./icons";
import { Reveal } from "./reveal";

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-line">
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -z-10 h-[500px] w-[1000px] -translate-x-1/2 translate-y-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgb(205 251 82 / 0.5), transparent)" }}
      />
      <div className="mx-auto max-w-6xl px-5 py-28 md:px-6 md:py-40">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            <span className="text-acid">05</span>
            <span className="h-px w-8 bg-line-2" />
            Contact
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-8 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.04em] md:text-8xl">
            Building something <span className="font-serif font-normal italic tracking-normal text-acid">ambitious</span> with AI?
            <br className="hidden md:block" /> Let&apos;s talk.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            I&apos;m open to full-time roles with international teams — remote, or relocation for the right opportunity.
            The fastest way to reach me is email; I usually reply within a day.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            href={`mailto:${site.email}`}
            className="group mt-12 inline-flex max-w-full items-center gap-4 border-b border-line-2 pb-3 text-2xl tracking-tight transition-colors hover:border-acid sm:text-4xl md:text-5xl"
          >
            <span className="truncate">{site.email}</span>
            <ArrowUpRight className="size-8 shrink-0 text-muted transition-all group-hover:rotate-45 group-hover:text-acid md:size-10" />
          </a>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <CopyEmail email={site.email} />
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-2 px-5 py-3 text-sm transition-colors hover:bg-white/5">
              <LinkedinIcon className="size-4" /> LinkedIn
            </a>
            <a href={site.github} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-2 px-5 py-3 text-sm transition-colors hover:bg-white/5">
              <GithubIcon className="size-4" /> GitHub
            </a>
            <a href={site.resume} target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03]">
              <Download className="size-4" /> Résumé (PDF)
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
