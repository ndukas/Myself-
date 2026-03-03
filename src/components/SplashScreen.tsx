"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onComplete();
      }, 250);
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#05070A]"
        >
          <div className="relative flex flex-col items-center">
            <AppleHelloEnglishEffect
              speed={1.8}
              className="h-24 md:h-32 text-white"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

