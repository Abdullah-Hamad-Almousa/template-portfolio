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
          <div className="relative w-10 h-10 mx-auto mb-7 grid place-items-center">
            <div className="w-10 h-10 rounded-full border-2 border-foreground/60" />
            <div className="absolute w-5 h-5 rounded-full border border-foreground/60" />
          </div>
        </FadeUp>

        <FadeUp as="h2" delay={0.08}>
          <span className="block text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.02] tracking-tighter3 mb-5">
            Start Your <span className="serif">Journey</span>
          </span>
        </FadeUp>

        <FadeUp as="p" delay={0.16}>
          <span className="block text-muted-foreground text-[1.05rem] max-w-[560px] mx-auto mb-9 leading-relaxed">
            A quieter place to read, write, and think — together. Join thousands of curious minds building something worth following.
          </span>
        </FadeUp>

        <FadeUp delay={0.24}>
          <div className="flex gap-3.5 justify-center flex-wrap">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="bg-foreground text-background rounded-[10px] px-8 py-3.5 font-semibold text-[0.9rem]"
            >
              Subscribe Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="liquid-glass rounded-[10px] px-8 py-3.5 font-semibold text-[0.9rem] text-foreground"
            >
              Start Writing
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}