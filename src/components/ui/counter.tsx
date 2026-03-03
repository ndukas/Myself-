import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "motion/react";

interface CounterProps {
  value: number;
  direction?: "up" | "down";
  className?: string;
  suffix?: string;
  prefix?: string;
  stiffness?: number;
  damping?: number;
  decimals?: number;
  shiny?: boolean;
  isDark?: boolean;
}

export default function Counter({
  value,
  direction = "up",
  className,
  suffix = "",
  prefix = "",
  stiffness = 100,
  damping = 30,
  decimals = 0,
  shiny = false,
  isDark = true,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? 0 : value);
    }
  }, [motionValue, isInView, value, direction]);

  useEffect(() => {
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    return springValue.on("change", (latest) => {
      if (counterRef.current) {
        counterRef.current.textContent = formatter.format(latest);
      }
    });
  }, [springValue, decimals]);

  const shinyStyles = shiny ? {
    background: isDark
      ? "linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.4) 100%)"
      : "linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.4) 100%)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block",
  } : {};

  const initialValue = Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(direction === "down" ? value : 0);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shiny ? (
        <motion.span
          ref={counterRef}
          initial={{ backgroundPosition: "200% 0" }}
          whileInView={{ backgroundPosition: ["200% 0", "-200% 0"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          viewport={{ once: false }}
          style={shinyStyles}
        >
          {initialValue}
        </motion.span>
      ) : (
        <span ref={counterRef}>{initialValue}</span>
      )}
      {suffix}
    </span>
  );
}
