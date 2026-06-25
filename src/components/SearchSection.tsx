import { FadeUp } from "./FadeUp";
import { TransformerDiagram } from "./backdrops/TransformerDiagram";

export function SearchSection() {
  return (
    <section id="how" className="pt-52 md:pt-64 pb-6 md:pb-9 text-center container">
      <FadeUp as="h2" delay={0}>
        <span className="block text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.02] tracking-tighter3 mb-6">
          Search has <span className="serif">changed.</span> Have you?
        </span>
      </FadeUp>

      <FadeUp as="p" delay={0.08}>
        <span className="block text-muted-foreground text-lg max-w-2xl mx-auto mb-24 leading-relaxed">
          Three platforms now sit between your work and the people looking for it. Mindloop is how thoughtful writers make sure they still get found — and felt.
        </span>
      </FadeUp>

      <div className="mb-20">
        <FadeUp delay={0}>
          <TransformerDiagram />
        </FadeUp>
      </div>

      <FadeUp as="p" delay={0}>
        <span className="block text-sm text-muted-foreground text-center">
          If you don't answer the questions, someone else will.
        </span>
      </FadeUp>
    </section>
  );
}