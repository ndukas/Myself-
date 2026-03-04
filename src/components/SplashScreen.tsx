"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "motion/react";
const AppleHelloEnglishEffect = lazy(() => import("@/components/ui/apple-hello-effect").then(m => ({ default: m.AppleHelloEnglishEffect })));

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Skip splash on return visits
    const hasVisited = sessionStorage.getItem('splash-shown');
    if (hasVisited) {
      onComplete();
      return;
    }
    sessionStorage.setItem('splash-shown', 'true');

    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onComplete();
      }, 250);
    }, 2400);
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
            <Suspense fallback={null}>
              <AppleHelloEnglishEffect
                speed={1.8}
                className="h-24 md:h-32 text-white"
              />
            </Suspense>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
