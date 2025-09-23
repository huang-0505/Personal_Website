"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

type Theme = "light" | "dark"

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = (localStorage.getItem("theme") as Theme) || "light"
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const initialTheme = savedTheme || (prefersDark ? "dark" : "light")
    setTheme(initialTheme)
    applyTheme(initialTheme)
  }, [])

  const applyTheme = (newTheme: Theme) => {
    // Remove all theme classes first
    document.documentElement.classList.remove("dark")

    // Apply the new theme class
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    }
    // light theme doesn't need a class

    localStorage.setItem("theme", newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="sm"
      className="fixed top-6 right-6 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-2 border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
    >
      <div className="relative w-5 h-5 mr-2">
        {theme === "light" ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-blue-400" />}
      </div>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {theme === "light" ? "Light" : "Dark"}
      </span>
    </Button>
  )
}
