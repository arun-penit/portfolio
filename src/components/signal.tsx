import { heroMetrics } from "@/lib/data";
import { AgentTrace } from "./agent-trace";
import { Counter } from "./counter";
import { Reveal } from "./reveal";

const stack = [
  "OpenAI GPT-5", "LangGraph", "FastAPI", "Retell AI", "Pinecone", "Whisper", "Gemini", "MongoDB",
  "Docker", "PostgreSQL", "FAISS", "React", "Vue.js", "Laravel", "Nginx", "GitHub Actions", "Prometheus", "Playwright",
];

export function Signal() {
  return (
    <section className="relative border-y border-line bg-ink-2/40">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:px-6 md:py-28 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">In production, right now</p>
            <h2 className="mt-4 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Real systems. Real traffic. <span className="font-serif italic text-acid">Measurable</span> outcomes.
            </h2>
          </Reveal>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {heroMetrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.06} className="bg-ink p-5 md:p-6">
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <div className="text-4xl font-medium tracking-tight md:text-5xl">
                    <Counter to={m.value} suffix={m.suffix} />
                  </div>
                  <div className="mt-2 text-sm leading-snug text-muted">{m.label}</div>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7">
          <AgentTrace />
        </Reveal>
      </div>

      <div className="relative overflow-hidden border-t border-line py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap hover:[animation-play-state:paused]">
          {[...stack, ...stack].map((s, i) => (
            <span key={i} className="flex items-center gap-10 text-lg text-muted">
              {s}
              <span className="text-acid/60">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
