"use client"

import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
  isDark: boolean
  onToggle: () => void
}

export function ThemeToggle({ className, isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 focus:outline-none shadow-sm",
        isDark 
          ? "bg-white text-black hover:bg-gray-200 border border-white/10" 
          : "bg-black text-white border border-black hover:bg-zinc-900",
        className
      )}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  )
}
