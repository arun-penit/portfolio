import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { experience } from "@/lib/data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:px-6 md:py-36">
      <SectionHeading
        index="03"
        label="Experience"
        title={
          <>
            Two years of <span className="font-serif italic text-acid">shipping</span> for international clients
          </>
        }
      />
      <div className="grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <div className="font-mono text-xs text-muted">{experience.period}</div>
            <h3 className="mt-3 text-3xl font-medium tracking-tight">{experience.title}</h3>
            <div className="mt-1 font-serif text-2xl italic text-muted">{experience.company}</div>
            <div className="mt-1 text-sm text-faint">{experience.location}</div>
            <p className="mt-6 text-pretty leading-relaxed text-muted">{experience.summary}</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs">
              <span className="size-1.5 animate-pulse-dot rounded-full bg-acid" /> Current role
            </div>
          </div>
        </Reveal>

        <ol className="relative md:col-span-8">
          <div aria-hidden className="absolute bottom-4 left-[7px] top-4 w-px bg-gradient-to-b from-acid/60 via-line-2 to-transparent" />
          {experience.highlights.map((h, i) => (
            <Reveal key={h.slug} delay={i * 0.06}>
              <li className="relative pb-4 pl-10">
                <span className="absolute left-0 top-8 size-[15px] rounded-full border-2 border-ink bg-acid/80 ring-1 ring-acid/40" />
                <Link
                  href={`/work/${h.slug}`}
                  className="group block rounded-2xl border border-transparent p-5 transition-colors hover:border-line hover:bg-ink-2/60"
                >
                  <div className="font-mono text-xs text-faint">{h.period}</div>
                  <div className="mt-2 flex items-center justify-between gap-4">
                    <h4 className="text-xl font-medium tracking-tight md:text-2xl">{h.title}</h4>
                    <ArrowUpRight className="size-5 shrink-0 text-muted transition-all group-hover:rotate-45 group-hover:text-acid" />
                  </div>
                  <p className="mt-2 text-muted">{h.note}</p>
                </Link>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
