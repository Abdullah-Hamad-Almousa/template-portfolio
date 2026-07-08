import { motion } from "framer-motion";
import { FadeUp } from "./FadeUp";
import { NeuralLattice } from "./backdrops/NeuralLattice";
import { useLanguage } from "../hooks/useLanguage";

export function CtaSection() {
  const { t } = useLanguage();
  const heading = t.ctaSection.heading;
  const serifWord = t.ctaSection.headingSerifWord;
  const parts = heading.split(serifWord);
  const before = parts[0] ?? "";
  const after = parts.slice(1).join(serifWord) ?? "";

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
          <div className="relative w-12 h-12 mx-auto mb-7 grid place-items-center float-water">
            <div className="relative w-12 h-12 rounded-xl shadow-md overflow-hidden liquid-glass grid place-items-center water-shine">
              <img
                src="logo.png"
                alt="Logo"
                className="w-[1.8rem] h-[1.8rem] object-contain"
              />
            </div>
          </div>
        </FadeUp>

        <FadeUp as="h2" delay={0.08}>
          <span className="block text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.02] tracking-tighter3 mb-5">
            {before}<span className="serif">{serifWord}</span>{after}
          </span>
        </FadeUp>

        <FadeUp as="p" delay={0.16}>
          <span className="block text-muted-foreground text-[1.05rem] max-w-[560px] mx-auto mb-9 leading-relaxed">
            {t.ctaSection.text}
          </span>
        </FadeUp>

        <FadeUp delay={0.24}>
          <div className="flex gap-3.5 justify-center flex-wrap">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              onClick={() => window.location.href = "mailto:abdullahalmousa@modelai.website?subject=Project%20Inquiry"}
              className="bg-foreground text-background rounded-[10px] px-8 py-3.5 font-semibold text-[0.9rem]"
            >
              {t.ctaSection.button1}
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
              {t.ctaSection.button2}
            </motion.a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}