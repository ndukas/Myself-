import { motion } from "motion/react";
import { memo, useMemo } from "react";

const Bubbles = memo(function Bubbles() {
  const bubbles = useMemo(() => Array.from({ length: 5 }), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 100 + "%",
            y: "110%",
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.2 + 0.05,
          }}
          animate={{
            y: "-10%",
            x: [null, (Math.random() - 0.5) * 30 + "%"],
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
          className="absolute w-16 h-16 bg-blue-500/10 rounded-full blur-2xl"
        />
      ))}
    </div>
  );
});

export default Bubbles;
