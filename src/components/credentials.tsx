import { GraduationCap, Trophy } from "lucide-react";
import { education, leadership } from "@/lib/data";
import { Reveal } from "./reveal";

export function Credentials() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 md:px-6 md:pb-36">
      <div className="grid gap-4 lg:grid-cols-3">
        <Reveal className="rounded-3xl border border-line bg-gradient-to-br from-ink-3 to-ink p-8">
          <GraduationCap className="size-6 text-acid" />
          <div className="mt-10 font-mono text-xs uppercase tracking-[0.18em] text-muted">Education</div>
          <h3 className="mt-3 text-2xl font-medium tracking-tight">{education.degree}</h3>
          <div className="mt-2 font-serif text-xl italic text-muted">{education.school}</div>
          <div className="mt-6 font-mono text-xs text-faint">
            {education.period} · {education.location}
          </div>
        </Reveal>
        {leadership.map((l, i) => (
          <Reveal key={l.title} delay={(i + 1) * 0.08} className="rounded-3xl border border-line bg-ink-2/40 p-8">
            <Trophy className="size-6 text-muted" />
            <div className="mt-10 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              {l.event} · {l.period}
            </div>
            <h3 className="mt-3 text-xl font-medium tracking-tight">{l.title}</h3>
            <p className="mt-3 text-pretty leading-relaxed text-muted">{l.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
