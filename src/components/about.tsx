import { about, education } from "@/lib/data";
import { Capabilities } from "./capabilities";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:px-6 md:py-36">
      <SectionHeading
        index="01"
        label="About"
        title={
          <>
            {about.lead.split("—")[0]}—{" "}
            <span className="font-serif italic text-muted">{about.lead.split("—")[1]}</span>
          </>
        }
      />
      <div className="grid gap-12 md:grid-cols-12">
        <div className="space-y-6 md:col-span-7 md:col-start-4">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-pretty text-lg leading-relaxed text-fg/80 md:text-xl">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.15}>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 font-mono text-xs text-muted">
              <span><span className="text-faint">Based in</span> Noida, India</span>
              <span><span className="text-faint">Education</span> {education.degree}, {education.school}</span>
              <span><span className="text-faint">Working</span> since 2024</span>
            </div>
          </Reveal>
        </div>
      </div>

      <Capabilities />
    </section>
  );
}
