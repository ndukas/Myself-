import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  width?: string | number;
  height?: string | number;
}

export function LazyImage({ 
  src, 
  alt, 
  className, 
  containerClassName,
  ...props 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-white/5", containerClassName)}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/10 border-t-white/30 rounded-full animate-spin" />
        </div>
      )}
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 1.05
        }}
        transition={{ 
          duration: 0.7, 
          ease: [0.21, 0.47, 0.32, 0.98] 
        }}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        decoding="async"
        className={cn(
          "w-full h-full object-cover transition-transform duration-700",
          className
        )}
        {...props}
      />
    </div>
  );
}
