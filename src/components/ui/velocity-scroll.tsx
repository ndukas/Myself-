import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "motion/react";
import { wrap } from "@motionone/utils";
import { cn } from "@/lib/utils";

interface VelocityScrollProps {
  text: string;
  default_velocity?: number;
  className?: string;
}

interface ParallaxProps {
  children: string;
  baseVelocity: number;
  className?: string;
}

function ParallaxText({
  children,
  baseVelocity = 100,
  className,
}: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    if (!isInView) return; // Pause when off-screen

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={containerRef} className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div
        className={cn("text-4xl font-bold tracking-[-0.02em] md:text-7xl", className)}
        style={{ x }}
      >
        <span className="mr-4">{children} </span>
        <span className="mr-4">{children} </span>
        <span className="mr-4">{children} </span>
        <span className="mr-4">{children} </span>
      </motion.div>
    </div>
  );
}

export function VelocityScroll({
  text,
  default_velocity = 5,
  className,
}: VelocityScrollProps) {
  return (
    <section className="relative w-full">
      <ParallaxText baseVelocity={default_velocity} className={className}>
        {text}
      </ParallaxText>
      <ParallaxText baseVelocity={-default_velocity} className={className}>
        {text}
      </ParallaxText>
    </section>
  );
}
