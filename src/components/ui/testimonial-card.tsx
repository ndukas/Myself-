"use client";

import * as React from "react";
import { motion, useInView, useSpring, useTransform, useMotionValue } from "motion/react";
import { Star } from "lucide-react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// --- OLD Testimonial Card (to maintain compatibility) ---

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
  key?: React.Key
}

export function TestimonialCard({
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const CardElement = href ? 'a' : 'div'

  return (
    <CardElement
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-lg border-t",
        "bg-white/5 backdrop-blur-sm",
        "p-4 text-start sm:p-6",
        "hover:bg-white/10",
        "max-w-[320px] sm:max-w-[320px]",
        "transition-colors duration-300",
        "border border-white/10 shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 border border-white/10">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback className="bg-white/10 text-white">{author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-md font-semibold leading-none text-white">
            {author.name}
          </h3>
          <p className="text-sm text-slate-400">
            {author.handle}
          </p>
        </div>
      </div>
      <p className="sm:text-md mt-4 text-sm text-slate-300">
        {text}
      </p>
    </CardElement>
  )
}

// --- NEW Clients Section Components ---

export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  name: string;
  title: string;
  quote?: string;
  avatarSrc: string;
  rating: number;
}

export interface ClientsSectionProps {
  tagLabel: string;
  title: string;
  description: string;
  stats: Stat[];
  testimonials: Testimonial[];
  primaryActionLabel: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  className?: string;
}

// StatCard using theme-consistent styling with counter animation
const Counter: React.FC<{ value: string }> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  // Parse the numeric part and any prefix/suffix
  const numericMatch = value.match(/(\d+\.?\d*)/);
  const number = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const prefix = value.split(numericMatch ? numericMatch[0] : "")[0] || "";
  const suffix = value.split(numericMatch ? numericMatch[0] : "")[1] || "";
  const isDecimal = value.includes(".");

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  // Subscribe to spring changes first, then trigger when in view
  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (counterRef.current) {
        const formatted = isDecimal ? latest.toFixed(1) : Math.floor(latest).toString();
        counterRef.current.textContent = `${prefix}${formatted}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix, isDecimal]);

  useEffect(() => {
    if (isInView) {
      motionValue.set(number);
    }
  }, [isInView, number, motionValue]);

  return (
    <span ref={ref}>
      <span ref={counterRef}>{prefix}0{suffix}</span>
    </span>
  );
};


const StatCard: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 text-center rounded-2xl p-4 flex flex-col items-center justify-center">
    <p className="text-3xl font-bold text-white tracking-tight">
      <Counter value={value} />
    </p>
    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">{label}</p>
  </div>
);

// A sticky testimonial card for the stacking effect.
const StickyTestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => {
  return (
    <motion.div
      className="sticky w-full"
      style={{
        top: `${60 + index * 40}px`, // Slightly more spacing for better visibility
        zIndex: index + 1
      }}
    >
      <div className={cn(
        "p-8 rounded-[2rem] shadow-2xl flex flex-col h-auto w-full",
        "bg-[#111827]/80 backdrop-blur-xl border border-white/10" // Slightly darker for better contrast when stacking
      )}>
        {/* Top section: Image and Author */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
            <img
              src={testimonial.avatarSrc}
              alt={testimonial.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-grow">
            <p className="font-bold text-xl text-white tracking-tight">{testimonial.name}</p>
            <p className="text-sm font-medium text-slate-400">{testimonial.title}</p>
          </div>
        </div>

        {/* Middle section: Rating */}
        <div className="flex items-center gap-2 my-6">
          <span className="font-bold text-lg text-white">{testimonial.rating.toFixed(1)}</span>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-5 w-5",
                  i < Math.floor(testimonial.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-white/10"
                )}
              />
            ))}
          </div>
        </div>

        {/* Bottom section: Quote */}
        {testimonial.quote && (
          <p className="text-lg leading-relaxed text-slate-300 font-medium italic">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        )}
      </div>
    </motion.div>
  );
};

// --- Main Exported Component ---

export const ClientsSection = ({
  tagLabel,
  title,
  description,
  stats,
  testimonials,
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
  className,
}: ClientsSectionProps) => {
  // Increased multiplier to ensure enough scroll room for all cards to stack
  const scrollContainerHeight = `calc(100vh + ${testimonials.length * 250}px)`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <section className={cn("w-full bg-transparent text-white py-24 md:py-32", className)}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -30% 0px" }}
        className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
      >

        {/* Left Column: Sticky Content */}
        <div className="flex flex-col gap-8 lg:sticky lg:top-24">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium"
          >
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-300">{tagLabel}</span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-white">
            {title}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-slate-400 max-w-md leading-relaxed font-medium">
            {description}
          </motion.p>

          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mt-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-4 mt-8">
            {secondaryActionLabel && (
              <Button
                variant="outline"
                size="lg"
                onClick={onSecondaryAction}
                className="rounded-full px-8 h-14 text-base font-bold border-white/10 bg-white/5 hover:bg-white/10 transition-all"
              >
                {secondaryActionLabel}
              </Button>
            )}
            <Button
              size="lg"
              onClick={onPrimaryAction}
              className="rounded-full px-8 h-14 text-base font-bold bg-white text-black hover:bg-white/90 transition-all"
            >
              {primaryActionLabel}
            </Button>
          </motion.div>
        </div>

        {/* Right Column: Container for the sticky card stack */}
        <div className="relative flex flex-col gap-6" style={{ height: scrollContainerHeight }}>
          {testimonials.map((testimonial, index) => (
            <StickyTestimonialCard
              key={testimonial.name}
              index={index}
              testimonial={testimonial}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};
