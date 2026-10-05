"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Thin wrapper for scroll-triggered reveals. When the user has requested
 * reduced motion, content simply appears with no transform — the animation
 * is skipped entirely rather than just shortened.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 16,
  className = "",
  as = "div",
}) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  if (shouldReduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
