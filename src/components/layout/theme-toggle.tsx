/**
 * Theme Toggle Component
 *
 * Provides a toggle button to switch between light and dark themes.
 * Uses the custom theme provider for theme management and persistence.
 */

"use client"

import * as React from "react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/primitives"
import { Moon, Sun, Monitor } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/primitives"

type Theme = "dark" | "light" | "system"

export interface ThemeToggleProps {
  variant?: "button" | "dropdown"
  size?: "sm" | "md" | "lg"
  className?: string
}

/**
 * ThemeToggle - Theme switching component
 * 
 * Provides theme switching functionality with:
 * - Light/Dark/System theme options
 * - Button or dropdown variants
 * - Proper icons for each theme
 * - Keyboard accessibility
 */
export function ThemeToggle({
  variant = "button",
  size = "md",
  className
}: ThemeToggleProps) {
  const { theme, setTheme, setThemeWithAnimation } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
        className={className}
        disabled
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  // Get the current resolved theme for display
  const getResolvedTheme = () => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return theme
  }

  if (variant === "dropdown") {
    const resolvedTheme = getResolvedTheme()

    const handleThemeChange = (newTheme: Theme, event: React.MouseEvent) => {
      setThemeWithAnimation(newTheme, event)
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
            className={className}
          >
            {resolvedTheme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={(event) => handleThemeChange("light", event)}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(event) => handleThemeChange("dark", event)}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(event) => handleThemeChange("system", event)}>
            <Monitor className="mr-2 h-4 w-4" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Simple button variant - cycles through themes
  const handleToggle = (event: React.MouseEvent) => {
    let newTheme: Theme
    if (theme === "light") {
      newTheme = "dark"
    } else if (theme === "dark") {
      newTheme = "system"
    } else {
      newTheme = "light"
    }

    setThemeWithAnimation(newTheme, event)
  }

  const getIcon = () => {
    if (theme === "dark") {
      return <Moon className="h-4 w-4" />
    } else if (theme === "system") {
      return <Monitor className="h-4 w-4" />
    } else {
      return <Sun className="h-4 w-4" />
    }
  }

  const getLabel = () => {
    if (theme === "dark") {
      return "Switch to system theme"
    } else if (theme === "system") {
      return "Switch to light theme"
    } else {
      return "Switch to dark theme"
    }
  }

  return (
    <Button
      variant="ghost"
      size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
      onClick={handleToggle}
      className={className}
      title={getLabel()}
    >
      {getIcon()}
      <span className="sr-only">{getLabel()}</span>
    </Button>
  )
}

export default ThemeToggle
