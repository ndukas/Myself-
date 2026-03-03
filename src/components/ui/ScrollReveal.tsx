import { motion } from "motion/react";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  staggerChildren?: number;
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  y = 30,
  className = "",
  staggerChildren = 0,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Custom ease-out
        staggerChildren,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
