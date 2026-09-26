import { ArrowUpRight } from "lucide-react";
import { caseStudies, site } from "@/lib/data";
import { GithubIcon } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { WorkCard } from "./work-card";

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:px-6 md:py-36">
      <SectionHeading
        index="02"
        label="Selected work"
        title={
          <>
            Case studies in <span className="font-serif italic text-acid">applied AI</span> & full-stack engineering
          </>
        }
        intro="Each project below has a full write-up: the problem, the architecture, the engineering decisions and what shipped. Open one to go deep."
      />
      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {caseStudies.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 2) * 0.08} className={i === 0 ? "min-w-0 md:col-span-2" : "min-w-0"}>
            <WorkCard study={s} featured={i === 0} />
          </Reveal>
        ))}
        <Reveal delay={0.08} className="min-w-0">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full flex-col justify-between gap-10 rounded-3xl border border-dashed border-line-2 p-6 transition-colors hover:border-acid/60 hover:bg-ink-2/40 md:p-8"
          >
            <div className="flex items-start justify-between">
              <GithubIcon className="size-8 text-muted transition-colors group-hover:text-acid" />
              <ArrowUpRight className="size-5 text-muted transition-transform group-hover:rotate-45" />
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Open source & experiments</div>
              <h3 className="mt-3 text-2xl font-medium tracking-tight">More on GitHub</h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted">
                Earlier builds and learning projects — ML regression models, Laravel exercises, React apps and the
                StudyNotion source. PenIT client projects are private under contract.
              </p>
              <div className="mt-6 font-mono text-sm text-fg/80">github.com/arunrawat14 →</div>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
