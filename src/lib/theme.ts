/**
 * Theme configuration and utilities for WagerBabe.
 * Extends shadcn/ui theming with sports betting specific colors and variants.
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Sports betting specific color palette
export const sportsTheme = {
  // Betting status colors
  win: {
    light: "oklch(0.7 0.15 142)", // Green
    DEFAULT: "oklch(0.6 0.18 142)",
    dark: "oklch(0.5 0.2 142)",
  },
  loss: {
    light: "oklch(0.7 0.15 27)", // Red
    DEFAULT: "oklch(0.6 0.18 27)",
    dark: "oklch(0.5 0.2 27)",
  },
  pending: {
    light: "oklch(0.8 0.1 60)", // Yellow/Orange
    DEFAULT: "oklch(0.7 0.15 60)",
    dark: "oklch(0.6 0.18 60)",
  },
  push: {
    light: "oklch(0.7 0.05 240)", // Blue/Gray
    DEFAULT: "oklch(0.6 0.08 240)",
    dark: "oklch(0.5 0.1 240)",
  },
  
  // Odds display colors
  favorite: {
    light: "oklch(0.8 0.1 300)", // Purple
    DEFAULT: "oklch(0.7 0.15 300)",
    dark: "oklch(0.6 0.18 300)",
  },
  underdog: {
    light: "oklch(0.8 0.1 200)", // Cyan
    DEFAULT: "oklch(0.7 0.15 200)",
    dark: "oklch(0.6 0.18 200)",
  },
  
  // Live betting
  live: {
    light: "oklch(0.8 0.15 15)", // Bright red/orange
    DEFAULT: "oklch(0.7 0.2 15)",
    dark: "oklch(0.6 0.25 15)",
  },
  
  // Promotional/bonus
  bonus: {
    light: "oklch(0.85 0.1 85)", // Gold
    DEFAULT: "oklch(0.75 0.15 85)",
    dark: "oklch(0.65 0.18 85)",
  }
} as const

// Component size variants
export const sizeVariants = {
  xs: "text-xs px-2 py-1",
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-6 py-3",
  xl: "text-xl px-8 py-4",
} as const

// Animation variants for betting interactions
export const animationVariants = {
  pulse: "animate-pulse",
  bounce: "animate-bounce",
  spin: "animate-spin",
  ping: "animate-ping",
  slideIn: "animate-in slide-in-from-left-5 duration-300",
  slideOut: "animate-out slide-out-to-right-5 duration-300",
  fadeIn: "animate-in fade-in duration-300",
  fadeOut: "animate-out fade-out duration-300",
} as const

// Betting specific utility classes
export const bettingStyles = {
  odds: {
    positive: "text-[hsl(var(--sports-success))] font-semibold",
    negative: "text-[hsl(var(--sports-danger))] font-semibold",
    even: "sports-accent-blue font-medium",
  },
  stake: {
    input: "font-mono text-right tabular-nums border-[hsl(var(--sports-blue)/0.3)] focus:sports-border-blue dark:border-[hsl(var(--sports-blue)/0.3)] dark:focus:sports-border-blue",
    display: "font-mono font-semibold tabular-nums sports-accent-blue",
  },
  payout: {
    potential: "sports-accent-blue font-medium tabular-nums",
    confirmed: "text-[hsl(var(--sports-success))] font-semibold tabular-nums",
  },
  status: {
    live: "sports-status-live animate-pulse",
    pending: "sports-status-pending",
    won: "bg-[hsl(var(--sports-success))] text-white",
    lost: "bg-[hsl(var(--sports-danger))] text-white",
    push: "bg-muted text-muted-foreground",
  }
} as const

// Theme variants for different betting contexts
export const contextVariants = {
  sportsbook: {
    primary: "sports-bg-blue text-white hover:bg-[hsl(var(--sports-blue-dark))] sports-border-blue hover:border-[hsl(var(--sports-blue-dark))]",
    secondary: "bg-[hsl(var(--sports-blue-light))] text-white hover:bg-[hsl(var(--sports-blue))] border-[hsl(var(--sports-blue-light))] hover:border-[hsl(var(--sports-blue))]",
    accent: "bg-[hsl(var(--sports-blue)/0.1)] sports-accent-blue hover:bg-[hsl(var(--sports-blue)/0.2)] dark:bg-[hsl(var(--sports-blue)/0.1)] dark:hover:bg-[hsl(var(--sports-blue)/0.2)]",
  },
  casino: {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700",
    secondary: "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700",
    accent: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600",
  },
  poker: {
    primary: "bg-gradient-to-r from-green-700 to-green-800 text-white hover:from-green-800 hover:to-green-900",
    secondary: "bg-gradient-to-r from-slate-700 to-slate-800 text-white hover:from-slate-800 hover:to-slate-900",
    accent: "bg-gradient-to-r from-amber-600 to-yellow-600 text-white hover:from-amber-700 hover:to-yellow-700",
  }
} as const

// Responsive breakpoint utilities
export const breakpoints = {
  mobile: "max-w-sm",
  tablet: "max-w-md",
  desktop: "max-w-lg",
  wide: "max-w-xl",
} as const
