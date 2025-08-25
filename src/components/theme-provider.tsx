"use client"

/**
 * Theme provider component for managing light/dark themes and sports betting contexts.
 */

import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useThemeTransition } from "./layout/theme-transition"

type Theme = "dark" | "light" | "system"
type BettingContext = "sportsbook" | "casino" | "poker"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultBettingContext?: BettingContext
  storageKey?: string
  bettingContextKey?: string
}

type ThemeProviderState = {
  theme: Theme
  bettingContext: BettingContext
  setTheme: (theme: Theme) => void
  setBettingContext: (context: BettingContext) => void
  setThemeWithAnimation: (theme: Theme, event?: React.MouseEvent) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  bettingContext: "sportsbook",
  setTheme: () => null,
  setBettingContext: () => null,
  setThemeWithAnimation: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultBettingContext = "sportsbook",
  storageKey = "wagerbabe-ui-theme",
  bettingContextKey = "wagerbabe-betting-context",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => {
      if (typeof window !== 'undefined') {
        return (localStorage?.getItem(storageKey) as Theme) || defaultTheme
      }
      return defaultTheme
    }
  )
  const [bettingContext, setBettingContext] = useState<BettingContext>(
    () => {
      if (typeof window !== 'undefined') {
        return (localStorage?.getItem(bettingContextKey) as BettingContext) || defaultBettingContext
      }
      return defaultBettingContext
    }
  )

  const { startTransition } = useThemeTransition()

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  useEffect(() => {
    const root = window.document.documentElement
    
    // Remove existing betting context classes
    root.classList.remove("sportsbook", "casino", "poker")
    
    // Add current betting context class
    root.classList.add(bettingContext)
  }, [bettingContext])

  // Animated theme switching function
  const setThemeWithAnimation = (newTheme: Theme, event?: React.MouseEvent) => {
    if (!event) {
      // Fallback to instant theme change if no event
      localStorage?.setItem(storageKey, newTheme)
      setTheme(newTheme)
      return
    }

    // Use the View Transitions API for smooth animation
    startTransition(event, () => {
      localStorage?.setItem(storageKey, newTheme)
      setTheme(newTheme)
    })
  }

  const value = {
    theme,
    bettingContext,
    setTheme: (theme: Theme) => {
      localStorage?.setItem(storageKey, theme)
      setTheme(theme)
    },
    setBettingContext: (context: BettingContext) => {
      localStorage?.setItem(bettingContextKey, context)
      setBettingContext(context)
    },
    setThemeWithAnimation,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
