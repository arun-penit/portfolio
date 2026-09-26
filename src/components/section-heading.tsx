import { Reveal } from "./reveal";

export function SectionHeading({
  label,
  index,
  title,
  intro,
}: {
  label: string;
  index: string;
  title: React.ReactNode;
  intro?: string;
}) {
  return (
    <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12">
      <Reveal className="md:col-span-3">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="text-acid">{index}</span>
          <span className="h-px w-8 bg-line-2" />
          {label}
        </div>
      </Reveal>
      <div className="md:col-span-9">
        <Reveal delay={0.05}>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">{title}</h2>
        </Reveal>
        {intro && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">{intro}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
