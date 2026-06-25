import { FadeUp } from "./FadeUp";
import { TrainingLoop } from "./backdrops/TrainingLoop";

const FEATURES = [
  {
    title: "Curated Feed",
    body: "Long-form writing from independent voices, lightly edited, never optimized for the timeline.",
  },
  {
    title: "Writer Tools",
    body: "Subscriptions, paywalls, and analytics that respect the reader and reward the work.",
  },
  {
    title: "Community",
    body: "Quiet threads, real replies, and the kind of conversations you actually want to be in.",
  },
  {
    title: "Distribution",
    body: "One post, every surface — email, RSS, web — without rewriting yourself for the algorithm.",
  },
];

export function SolutionSection() {
  return (
    <section id="usecases" className="py-32 md:py-44 border-t border-border/30">
      <div className="container">
        <FadeUp as="div" delay={0}>
          <span className="block text-xs tracking-[3px] uppercase text-muted-foreground mb-[18px]">
            SOLUTION
          </span>
        </FadeUp>

        <FadeUp as="h2" delay={0.08}>
          <span className="block text-4xl md:text-6xl font-medium tracking-tightish leading-tight max-w-[760px] mb-12">
            The platform for <span className="serif">meaningful</span> content
          </span>
        </FadeUp>

        <FadeUp delay={0.16}>
          <div className="w-full aspect-[3/1] rounded-2xl overflow-hidden mb-16 border border-border/40">
            <TrainingLoop />
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {FEATURES.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.06}>
              <div>
                <h4 className="text-base font-semibold mb-2.5">{f.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}