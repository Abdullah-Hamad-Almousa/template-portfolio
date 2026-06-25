import { motion } from "framer-motion";
import { useState } from "react";
import { AVATAR_SVG_1, AVATAR_SVG_2, AVATAR_SVG_3 } from "../assets";
import { FadeUp } from "./FadeUp";
import { NeuralBackdrop } from "./backdrops/NeuralBackdrop";

export function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    window.location.href = `mailto:abdullahmlwork@gmail.com?subject=Portfolio%20Connection&body=Hi%20Abdullah,%0D%0A%0D%0AMy%20email%20is%20${email}.%20I'd%20love%20to%20connect%20and%20discuss%20ML%20opportunities!`;
    setTimeout(() => setSubmitted(false), 2200);
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <NeuralBackdrop />
      <div
        className="absolute left-0 right-0 bottom-0 h-64 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to top, hsl(var(--background)), transparent)",
        }}
      />

      <div className="relative z-10 text-center px-6 pt-28 md:pt-32 max-w-[760px] w-full">
        <FadeUp className="flex items-center justify-center gap-3 mb-7" delay={0}>
          <div className="flex">
            {[AVATAR_SVG_1, AVATAR_SVG_2, AVATAR_SVG_3].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="w-8 h-8 rounded-full border-2 border-background object-cover"
                style={{ marginLeft: i === 0 ? 0 : -8 }}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">Machine Learning Engineer</span>
        </FadeUp>

        <FadeUp as="h1" delay={0.08}>
          <span className="block text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.02] tracking-tighter3 mb-6">
            Abdullah <span className="serif">Almousa</span>
          </span>
        </FadeUp>

        <FadeUp as="p" delay={0.16}>
          <span className="block text-lg leading-relaxed text-hero-subtitle max-w-[600px] mx-auto mb-9">
            Advancing EDA and Algorithms to solve complex business problems.
          </span>
        </FadeUp>

        <FadeUp delay={0.24}>
          <form
            onSubmit={handleSubmit}
            className="liquid-glass flex items-center gap-2 p-2 rounded-full max-w-lg mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              aria-label="Email"
              className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground text-[0.95rem] px-4 py-2.5"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="bg-foreground text-background rounded-full px-8 py-3 font-semibold text-[0.9rem] tracking-wider"
            >
              {submitted ? "SENT" : "CONNECT"}
            </motion.button>
          </form>
        </FadeUp>
      </div>
    </header>
  );
}