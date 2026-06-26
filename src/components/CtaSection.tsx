import { motion } from "framer-motion";
import { FadeUp } from "./FadeUp";
import { NeuralLattice } from "./backdrops/NeuralLattice";

export function CtaSection() {
  return (
    <section className="relative py-32 md:py-44 border-t border-border/60 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <NeuralLattice />
      </div>
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background) / 0.4) 30%, hsl(var(--background) / 0.4) 70%, hsl(var(--background)) 100%)",
        }}
      />

      <div className="relative z-10 container text-center">
        <FadeUp delay={0}>
          <div className="relative w-12 h-12 mx-auto mb-7 grid place-items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
        </FadeUp>

        <FadeUp as="h2" delay={0.08}>
          <span className="block text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.02] tracking-tighter3 mb-5">
            Let's <span className="serif">Connect</span>
          </span>
        </FadeUp>

        <FadeUp as="p" delay={0.16}>
          <span className="block text-muted-foreground text-[1.05rem] max-w-[560px] mx-auto mb-9 leading-relaxed">
            Looking for a machine learning developer to solve complex algorithmic challenges, build neural models, or optimize data pipelines? Let's build together.
          </span>
        </FadeUp>

        <FadeUp delay={0.24}>
          <div className="flex gap-3.5 justify-center flex-wrap">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              onClick={() => window.location.href = "mailto:abdullahmlwork@gmail.com?subject=Project%20Inquiry"}
              className="bg-foreground text-background rounded-[10px] px-8 py-3.5 font-semibold text-[0.9rem]"
            >
              Email Me
            </motion.button>
            <motion.a
              href="https://abdullah-hamad-almousa.github.io/MyNewPortfolio/pages/almousa_CV3.html"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="liquid-glass rounded-[10px] px-8 py-3.5 font-semibold text-[0.9rem] text-foreground flex items-center justify-center"
            >
              View CV
            </motion.a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}