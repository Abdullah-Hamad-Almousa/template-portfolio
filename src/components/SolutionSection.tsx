import { FadeUp } from "./FadeUp";
import { TrainingLoop } from "./backdrops/TrainingLoop";

const FEATURES = [
  {
    title: "Malware Detection ML",
    body: "Developed an ML detection system using static features, achieving 99.1% classification accuracy on large Android malware datasets.",
  },
  {
    title: "GandI Adventure Game",
    body: "Engineered using Java and Kotlin, featuring complex JSON state management and partnered distribution with Kinetic Hosting.",
  },
  {
    title: "Advanced EDA & Algorithms",
    body: "Statistical analysis on high-dimensional datasets with custom mathematical optimization algorithms.",
  },
  {
    title: "Power BI Business Intelligence",
    body: "Interactive dashboards visualizing core metrics, ML pipeline stability, and operational downtime.",
  },
];

export function SolutionSection() {
  return (
    <section id="usecases" className="py-32 md:py-44 border-t border-border/30 text-center">
      <div className="container flex flex-col items-center">
        <FadeUp as="div" delay={0}>
          <span className="block text-xs tracking-[3px] uppercase text-muted-foreground mb-[18px]">
            PORTFOLIO
          </span>
        </FadeUp>

        <FadeUp as="h2" delay={0.08}>
          <span className="block text-4xl md:text-6xl font-medium tracking-tightish leading-tight max-w-[760px] mb-12 mx-auto">
            Selected projects and <span className="serif">featured</span> work
          </span>
        </FadeUp>

        <FadeUp delay={0.16} className="w-full">
          <div className="w-full aspect-[3/1] rounded-2xl overflow-hidden mb-16 border border-border/40">
            <TrainingLoop />
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full text-center">
          {FEATURES.map((f, i) => (
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