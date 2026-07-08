import { motion } from "framer-motion";
import { useState } from "react";
import { FadeUp } from "./FadeUp";
import { NeuralBackdrop } from "./backdrops/NeuralBackdrop";

export function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    window.location.href = `mailto:abdullahalmousa@modelai.website?subject=Portfolio%20Connection&body=Hi%20Abdullah,%0D%0A%0D%0AMy%20email%20is%20${email}.%20I'd%20love%20to%20connect%20and%20discuss%20ML%20opportunities!`;
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
        <FadeUp className="flex flex-col items-center justify-center gap-4 mb-7" delay={0}>
          <div className="relative group float-water">
            <div className="absolute inset-0 bg-cyan-500/10 rounded-2xl blur-xl group-hover:bg-cyan-500/20 transition-all duration-500" />
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden liquid-glass shadow-md water-shine flex items-center justify-center p-1">
              <img
                src="full-logo.png"
                alt="Abdullah Almousa Full Logo"
                className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
          <span className="text-sm text-muted-foreground tracking-wider uppercase">Machine Learning Developer</span>
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