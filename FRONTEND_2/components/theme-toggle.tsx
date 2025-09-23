"use client"

import * as React from "react"
import { Moon, University } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "unal" ? "dark" : "unal")
  }

  const getIcon = () => {
    return theme === "unal" ? <University className="h-4 w-4" /> : <Moon className="h-4 w-4" />
  }

  const getTitle = () => {
    return theme === "unal" ? "Cambiar a modo oscuro" : "Cambiar a modo UNAL"
  }

  return (
    <Button
      variant="outline"
      size="default"
      onClick={toggleTheme}
      className="gap-2 px-3"
      title={getTitle()}
    >
      {getIcon()}
      <span className="text-sm font-medium">
        {theme === "unal" ? "UNAL" : "Oscuro"}
      </span>
    </Button>
  )
}
