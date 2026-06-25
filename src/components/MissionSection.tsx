import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { LossCurveCanvas } from "./backdrops/LossCurveCanvas";

const PARAGRAPH_1 =
  "I build systems where raw data meets advanced algorithms — designing optimized pipelines, exploring high-dimensional features, and crafting neural models that turn complexity into clarity.";
const PARAGRAPH_2 =
  "An engineering approach focused on mathematical precision, computational scale, and model reproducibility — filtering out the noise to deliver actual predictive value.";

const HIGHLIGHTS = new Set(["data", "meets", "algorithms", "precision", "scale"]);

function tokenize(text: string): string[] {
  return text.split(/(\s+)/);
}

export function MissionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 30%"],
  });

  const p1 = useMemo(() => tokenize(PARAGRAPH_1), []);
  const p2 = useMemo(() => tokenize(PARAGRAPH_2), []);
  const totalWords = p1.filter((w) => /\S/.test(w)).length + p2.filter((w) => /\S/.test(w)).length;

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="pt-0 pb-32 md:pb-44 text-center container"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-[min(800px,92vw)] h-[min(800px,92vw)] mx-auto mb-14 rounded-md overflow-hidden"
      >
        <LossCurveCanvas />
      </motion.div>

      <div className="max-w-[900px] mx-auto">
        <p className="text-2xl md:text-4xl lg:text-5xl font-medium leading-snug tracking-tightish">
          {p1.map((token, i) => (
            <Word key={`p1-${i}`} token={token} index={i} totalWords={totalWords} progress={scrollYProgress} />
          ))}
        </p>
        <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-snug mt-10">
          {p2.map((token, i) => {
            const wordIdx = p1.filter((w) => /\S/.test(w)).length + i;
            return (
              <Word
                key={`p2-${i}`}
                token={token}
                index={wordIdx}
                totalWords={totalWords}
                progress={scrollYProgress}
              />
            );
          })}
        </p>
      </div>
    </section>
  );
}

function Word({
  token,
  index,
  totalWords,
  progress,
}: {
  token: string;
  index: number;
  totalWords: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const clean = token.replace(/[^a-zA-Z]/g, "").toLowerCase();
  const isWord = /\S/.test(token) && clean.length > 0;
  const isHighlight = HIGHLIGHTS.has(clean);

  const wordStart = index / totalWords;
  const wordEnd = (index + 1) / totalWords;
  const opacity = useTransform(progress, [Math.max(0, wordStart - 0.05), wordEnd], [0.15, 1]);
  const colorOpacity = useTransform(progress, [wordEnd - 0.05, wordEnd + 0.02], [0, 1]);
  const [onState, setOnState] = useState(false);

  useEffect(() => {
    const unsub = colorOpacity.on("change", (v) => setOnState(v > 0.6));
    return () => unsub();
  }, [colorOpacity]);

  if (!isWord) return <span>{token}</span>;

  return (
    <motion.span
      className="mw"
      style={{
        opacity,
        color: isHighlight && onState ? "hsl(var(--foreground))" : "hsl(var(--hero-subtitle))",
      }}
    >
      {token}
    </motion.span>
  );
}