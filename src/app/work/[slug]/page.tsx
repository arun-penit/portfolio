import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { caseStudies } from "@/lib/data";
import { Architecture } from "@/components/architecture";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { title: `${study.title} — Case study`, description: study.summary, type: "article" },
  };
}

const toc = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The problem" },
  { id: "approach", label: "Approach" },
  { id: "architecture", label: "Architecture" },
  { id: "features", label: "What I built" },
  { id: "decisions", label: "Key decisions" },
  { id: "outcomes", label: "Outcomes" },
];

function Block({ id, n, title, children }: { id: string; n: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line py-14 md:py-20">
      <Reveal>
        <div className="mb-8 flex items-baseline gap-4">
          <span className="font-mono text-xs text-faint">{n}</span>
          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">{title}</h2>
        </div>
      </Reveal>
      {children}
    </section>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const idx = caseStudies.findIndex((c) => c.slug === slug);
  if (idx === -1) notFound();
  const study = caseStudies[idx];
  const next = caseStudies[(idx + 1) % caseStudies.length];
  const accent = `oklch(0.86 0.17 ${study.hue})`;

  return (
    <>
      <main className="relative z-10">
        <header className="relative isolate overflow-hidden pb-16 pt-32 md:pt-40">
          <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
          <div
            aria-hidden
            className="absolute -top-32 left-1/3 -z-10 h-[420px] w-[800px] rounded-full opacity-30 blur-[120px]"
            style={{ background: `radial-gradient(closest-side, ${accent}, transparent)` }}
          />
          <div className="mx-auto max-w-6xl px-5 md:px-6">
            <Reveal>
              <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
                <ArrowLeft className="size-4" /> All work
              </Link>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                <span style={{ color: accent }}>Case study {study.index}</span> · {study.kicker}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 max-w-4xl text-balance text-5xl font-medium leading-[1.02] tracking-[-0.035em] md:text-7xl">
                {study.title}
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-2xl text-pretty font-serif text-2xl italic leading-snug text-fg/80 md:text-3xl">
                {study.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Role", study.role],
                  ["Timeline", study.period],
                  ["Context", study.context],
                  ["Stack", study.stack.slice(0, 5).join(" · ")],
                ].map(([k, v]) => (
                  <div key={k} className="bg-ink p-5">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">{k}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-fg/90">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <div className="mt-4 grid grid-cols-3 gap-4">
              {study.metrics.map((m, i) => (
                <Reveal key={m.label} delay={0.25 + i * 0.05} className="rounded-2xl border border-line bg-ink-2/50 p-5 md:p-7">
                  <div className="text-3xl font-medium tracking-tight md:text-5xl" style={{ color: accent }}>
                    {m.value}
                  </div>
                  <div className="mt-2 text-xs text-muted md:text-sm">{m.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:px-6 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <nav className="sticky top-28 pt-14" aria-label="On this page">
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">On this page</div>
              <ul className="space-y-2.5 border-l border-line">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-muted transition-colors hover:border-fg hover:text-fg">
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
              {study.link && (
                <a href={study.link.href} target="_blank" rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-line-2 px-4 py-2 text-sm hover:bg-white/5">
                  {study.link.label} <ArrowUpRight className="size-4" />
                </a>
              )}
            </nav>
          </aside>

          <article className="min-w-0 lg:col-span-9">
            <Block id="overview" n="01" title="Overview">
              <Reveal>
                <p className="text-pretty text-xl leading-relaxed text-fg/85 md:text-2xl">{study.summary}</p>
              </Reveal>
              <Reveal delay={0.05} className="mt-8 flex flex-wrap gap-1.5">
                {study.stack.map((s) => (
                  <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">{s}</span>
                ))}
              </Reveal>
            </Block>

            <Block id="problem" n="02" title="The problem">
              <Reveal>
                <p className="border-l-2 pl-6 text-pretty text-lg leading-relaxed text-fg/80" style={{ borderColor: accent }}>
                  {study.problem}
                </p>
              </Reveal>
            </Block>

            <Block id="approach" n="03" title="Approach">
              <div className="space-y-6">
                {study.approach.map((p, i) => (
                  <Reveal key={i} delay={i * 0.04} className="grid gap-4 md:grid-cols-[3rem_1fr]">
                    <span className="font-serif text-3xl italic text-faint">{i + 1}.</span>
                    <p className="text-pretty text-lg leading-relaxed text-fg/80">{p}</p>
                  </Reveal>
                ))}
              </div>
            </Block>

            <Block id="architecture" n="04" title="Architecture">
              <Reveal>
                <p className="mb-8 max-w-2xl text-muted">
                  How data and control flow through the system, stage by stage.
                </p>
              </Reveal>
              <Architecture stages={study.architecture} accent={accent} />
            </Block>

            <Block id="features" n="05" title="What I built">
              <div className="grid gap-4 md:grid-cols-2">
                {study.features.map((f, i) => (
                  <Reveal key={f.title} delay={(i % 2) * 0.06} className="rounded-2xl border border-line bg-ink-2/40 p-6">
                    <div className="mb-4 h-1 w-8 rounded-full" style={{ background: accent }} />
                    <h3 className="text-lg font-medium tracking-tight">{f.title}</h3>
                    <p className="mt-2 text-pretty leading-relaxed text-muted">{f.body}</p>
                  </Reveal>
                ))}
              </div>
            </Block>

            <Block id="decisions" n="06" title="Key engineering decisions">
              <div className="divide-y divide-line rounded-2xl border border-line">
                {study.decisions.map((d, i) => (
                  <Reveal key={d.title} delay={i * 0.04} className="grid gap-2 p-6 md:grid-cols-[1fr_1.6fr] md:gap-8">
                    <h3 className="font-medium">{d.title}</h3>
                    <p className="text-pretty leading-relaxed text-muted">{d.body}</p>
                  </Reveal>
                ))}
              </div>
            </Block>

            <Block id="outcomes" n="07" title="Outcomes">
              <ul className="space-y-4">
                {study.outcomes.map((o, i) => (
                  <Reveal key={o} delay={i * 0.04}>
                    <li className="flex items-start gap-4 text-lg leading-relaxed text-fg/85">
                      <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full text-ink" style={{ background: accent }}>
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                      {o}
                    </li>
                  </Reveal>
                ))}
              </ul>
              {study.link && (
                <a href={study.link.href} target="_blank" rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-2 rounded-full border border-line-2 px-5 py-2.5 text-sm hover:bg-white/5 lg:hidden">
                  {study.link.label} <ArrowUpRight className="size-4" />
                </a>
              )}
            </Block>
          </article>
        </div>

        <Link href={`/work/${next.slug}`} className="group mt-10 block border-t border-line">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-16 md:px-6 md:py-24">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Next case study</div>
              <div className="mt-4 text-balance text-3xl font-medium tracking-tight transition-colors group-hover:text-acid md:text-6xl">
                {next.title}
              </div>
            </div>
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line-2 transition-all group-hover:bg-acid group-hover:text-ink md:size-20">
              <ArrowRight className="size-6" />
            </span>
          </div>
        </Link>
      </main>
      <Footer />
    </>
  );
}
