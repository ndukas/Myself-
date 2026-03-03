import { Home, LayoutGrid, User, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Portfolio", icon: LayoutGrid, href: "/portfolio" },
  { name: "About", icon: User, href: "/about" },
  { name: "Contact", icon: Mail, href: "/contact" },
];

export default function FloatingNav() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Show nav after scrolling down 100px (past hero start)
          if (window.scrollY > 100) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
      )}
    >
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-2 rounded-full shadow-2xl border border-white/10">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-16 rounded-full transition-all duration-300",
                isActive ? "bg-white text-black" : "hover:bg-white/10 text-slate-400"
              )}
            >
              <item.icon
                size={20}
                className={cn(
                  "mb-1 transition-colors",
                  isActive ? "text-black" : "text-slate-400"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-medium transition-colors",
                  isActive ? "text-black" : "text-slate-400"
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
