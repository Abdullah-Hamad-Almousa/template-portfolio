import { FadeUp } from "./FadeUp";
import { TransformerDiagram } from "./backdrops/TransformerDiagram";
import { useLanguage } from "../hooks/useLanguage";

export function SearchSection() {
  const { t } = useLanguage();
  const heading = t.searchSection.heading;
  const serifWord = t.searchSection.headingSerifWord;
  const parts = heading.split(serifWord);
  const before = parts[0] ?? "";
  const after = parts.slice(1).join(serifWord) ?? "";

  return (
    <section id="how" className="pt-52 md:pt-64 pb-6 md:pb-9 text-center container">
      <FadeUp as="h2" delay={0}>
        <span className="block text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.02] tracking-tighter3 mb-6">
          {before}<span className="serif">{serifWord}</span>{after}
        </span>
      </FadeUp>

      <FadeUp as="p" delay={0.08}>
        <span className="block text-muted-foreground text-lg max-w-2xl mx-auto mb-24 leading-relaxed">
          {t.searchSection.description}
        </span>
      </FadeUp>

      <div className="mb-20">
        <FadeUp delay={0}>
          <TransformerDiagram />
        </FadeUp>
      </div>

      <FadeUp as="p" delay={0}>
        <span className="block text-sm text-muted-foreground text-center">
          {t.searchSection.bottomLine}
        </span>
      </FadeUp>
    </section>
  );
}