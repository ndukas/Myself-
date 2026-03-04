import * as React from "react";
import { motion, useAnimation, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export const Marquee = ({
  children,
  direction = "left",
  speed = 40,
  pauseOnHover = true,
  className,
  ...props
}: MarqueeProps) => {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = React.useState(false);
  const [contentWidth, setContentWidth] = React.useState(0);
  const resumeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Calculate content width for seamless loop
  React.useEffect(() => {
    if (containerRef.current) {
      const firstSet = containerRef.current.firstElementChild as HTMLElement;
      if (firstSet) {
        requestAnimationFrame(() => {
          setContentWidth(firstSet.getBoundingClientRect().width);
        });
      }
    }
  }, [children]);

  const startAnimation = React.useCallback(async () => {
    if (contentWidth === 0) return;

    const currentX = x.get();
    const targetX = direction === "left" ? -contentWidth : 0;

    // If we're at the end, snap back to start (seamlessly)
    if (direction === "left" && currentX <= -contentWidth) {
      x.set(0);
    } else if (direction === "right" && currentX >= 0) {
      x.set(-contentWidth);
    }

    // Calculate remaining distance and duration
    const remainingDistance = direction === "left"
      ? Math.abs(x.get() - (-contentWidth))
      : Math.abs(x.get() - 0);

    const duration = (remainingDistance / contentWidth) * speed;

    await controls.start({
      x: direction === "left" ? -contentWidth : 0,
      transition: {
        duration: duration,
        ease: "linear",
      },
    });

    // Loop
    if (!isInteracting) {
      x.set(direction === "left" ? 0 : -contentWidth);
      startAnimation();
    }
  }, [controls, contentWidth, direction, speed, x, isInteracting]);

  React.useEffect(() => {
    if (!isInteracting && contentWidth > 0) {
      startAnimation();
    }
    return () => controls.stop();
  }, [isInteracting, contentWidth, startAnimation, controls]);

  const handleDragStart = () => {
    setIsInteracting(true);
    controls.stop();
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handleDragEnd = (event: any, info: any) => {
    // Resume after 3 seconds of inactivity
    resumeTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 3000);
  };

  const wasDragged = React.useRef(false);

  // Handle wrap around during drag
  React.useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      if (contentWidth <= 0) return;

      // Only wrap if we've actually crossed the boundaries
      // Use a small epsilon to avoid floating point issues and infinite loops at 0
      if (latest <= -contentWidth) {
        x.set(latest + contentWidth);
      } else if (latest > 0) {
        x.set(latest - contentWidth);
      }
    });
    return () => unsubscribe();
  }, [contentWidth, x]);

  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row cursor-grab active:cursor-grabbing",
        className
      )}
      onClickCapture={(e) => {
        if (wasDragged.current) {
          e.stopPropagation();
          e.preventDefault();
          // We reset it after a short delay to allow the click event to finish
          setTimeout(() => {
            wasDragged.current = false;
          }, 50);
        }
      }}
      {...props}
    >
      <motion.div
        ref={containerRef}
        className="flex shrink-0 justify-around [gap:var(--gap)] flex-row min-w-full"
        style={{
          x,
          display: "flex",
          width: "max-content",
        }}
        animate={controls}
        drag="x"
        onDragStart={() => {
          handleDragStart();
          wasDragged.current = false;
        }}
        onDrag={(e, info) => {
          if (Math.abs(info.offset.x) > 5) {
            wasDragged.current = true;
          }
        }}
        onDragEnd={handleDragEnd}
        {...(pauseOnHover && !isInteracting && {
          onHoverStart: () => controls.stop(),
          onHoverEnd: () => startAnimation(),
        })}
      >
        <div className="flex shrink-0 justify-around [gap:var(--gap)] flex-row">
          {children}
        </div>
        <div className="flex shrink-0 justify-around [gap:var(--gap)] flex-row">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
