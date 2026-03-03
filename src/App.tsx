import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, Suspense, lazy, memo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

// Lazy load pages for code splitting
import Home from "./pages/Home";
const Portfolio = lazy(() => import("./pages/Portfolio"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));

// Lazy load global components
const FloatingNav = lazy(() => import("./components/FloatingNav"));
const Header = lazy(() => import("./components/Header"));
import SplashScreen from "./components/SplashScreen";
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));

// Memoize static layout components to prevent unnecessary re-renders
const MemoizedHeader = memo(Header);
const MemoizedFloatingNav = memo(FloatingNav);

function AppContent() {
  const [isDark, setIsDark] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  useEffect(() => {
    // Force dark mode on all pages except home
    if (location.pathname !== "/" && !isDark) {
      setIsDark(true);
    }

    // Throttled scroll listener using requestAnimationFrame for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (location.pathname === "/") {
            // If scrolled past hero (approx 600px), force dark mode
            if (window.scrollY > 600 && !isDark) {
              setIsDark(true);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDark, location.pathname]);

  return (
    <>
      <div className="bg-fixed-gradient" />
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>

      <div className={`font-sans text-white selection:bg-blue-500 selection:text-white pb-32 transition-colors duration-500 ${isDark ? 'bg-[#0B1120]' : 'bg-white'}`}>
        <Suspense fallback={null}>
          <MemoizedHeader isDark={isDark} />
          <MemoizedFloatingNav />
        </Suspense>

        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-500">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home isDark={isDark} />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

// Main application component wrapper
export default function App() {
  return (
    <Router>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
      <AppContent />
    </Router>
  );
}
