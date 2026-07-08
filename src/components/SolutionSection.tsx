import { FadeUp } from "./FadeUp";
import { TrainingLoop } from "./backdrops/TrainingLoop";
import { useLanguage } from "../hooks/useLanguage";

export function SolutionSection() {
  const { t } = useLanguage();
  const heading = t.solutionSection.heading;
  const serifWord = t.solutionSection.headingSerifWord;
  const parts = heading.split(serifWord);
  const before = parts[0] ?? "";
  const after = parts.slice(1).join(serifWord) ?? "";

  return (
    <section id="usecases" className="py-32 md:py-44 border-t border-border/30 text-center">
      <div className="container flex flex-col items-center">
        <FadeUp as="div" delay={0}>
          <span className="block text-xs tracking-[3px] uppercase text-muted-foreground mb-[18px]">
            {t.solutionSection.tag}
          </span>
        </FadeUp>

        <FadeUp as="h2" delay={0.08}>
          <span className="block text-4xl md:text-6xl font-medium tracking-tightish leading-tight max-w-[760px] mb-12 mx-auto">
            {before}<span className="serif">{serifWord}</span>{after}
          </span>
        </FadeUp>

        <FadeUp delay={0.16} className="w-full">
          <div className="w-full aspect-[3/1] rounded-2xl overflow-hidden mb-16 border border-border/40">
            <TrainingLoop />
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full text-center">
          {t.solutionSection.features.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.06}>
              <div className="flex flex-col items-center">
                <h4 className="text-base font-semibold mb-2.5">{f.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{f.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}