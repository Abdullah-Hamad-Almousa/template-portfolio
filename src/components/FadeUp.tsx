import { motion, type MotionProps, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function FadeUp({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "li";
}) {
  const MotionTag = motion[as] as React.ComponentType<MotionProps & { children?: ReactNode; className?: string }>;
  return (
    <MotionTag
      className={className}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px 0px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </MotionTag>
  );
}

export function FadeUpStagger({
  children,
  step = 0.08,
  className,
}: {
  children: ReactNode[];
  step?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <FadeUp key={i} delay={i * step}>
          {child}
        </FadeUp>
      ))}
    </div>
  );
}