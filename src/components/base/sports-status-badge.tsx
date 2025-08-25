/**
 * Sports Status Badge - Base component for displaying game/event status
 * 
 * Provides consistent styling for sports status indicators with proper
 * colors, animations, and accessibility for live events.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/theme"
import { Badge } from "@/components/primitives"

const sportsStatusBadgeVariants = cva(
  "font-semibold uppercase tracking-wider transition-all duration-200",
  {
    variants: {
      status: {
        live: "sports-status-live animate-pulse",
        upcoming: "sports-status-upcoming",
        final: "sports-status-final",
        halftime: "sports-status-halftime",
        postponed: "bg-muted text-muted-foreground",
        cancelled: "bg-destructive/20 text-destructive border-destructive/30",
        suspended: "bg-warning/20 text-warning border-warning/30",
      },
      size: {
        xs: "text-xs px-1.5 py-0.5",
        sm: "text-xs px-2 py-1",
        default: "text-sm px-3 py-1.5",
        lg: "text-base px-4 py-2",
      },
      variant: {
        default: "",
        outline: "bg-transparent border-2",
        subtle: "bg-opacity-20",
      },
    },
    defaultVariants: {
      status: "upcoming",
      size: "default",
      variant: "default",
    },
  }
)

export interface SportsStatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sportsStatusBadgeVariants> {
  status: "live" | "upcoming" | "final" | "halftime" | "postponed" | "cancelled" | "suspended"
  children?: React.ReactNode
  showIcon?: boolean
  customText?: string
}

const SportsStatusBadge = React.forwardRef<HTMLDivElement, SportsStatusBadgeProps>(
  ({ 
    className, 
    status, 
    size, 
    variant,
    children, 
    showIcon = false,
    customText,
    ...props 
  }, ref) => {
    // Default status text if no children or customText provided
    const getStatusText = () => {
      if (customText) return customText
      if (children) return children
      
      switch (status) {
        case "live": return "LIVE"
        case "upcoming": return "UPCOMING"
        case "final": return "FINAL"
        case "halftime": return "HALFTIME"
        case "postponed": return "POSTPONED"
        case "cancelled": return "CANCELLED"
        case "suspended": return "SUSPENDED"
        default: return "UNKNOWN"
      }
    }

    const getStatusIcon = () => {
      if (!showIcon) return null
      
      switch (status) {
        case "live":
          return <span className="inline-block w-2 h-2 bg-current rounded-full mr-1 animate-pulse" />
        case "final":
          return <span className="inline-block w-2 h-2 bg-current rounded-full mr-1" />
        default:
          return null
      }
    }

    return (
      <Badge
        ref={ref}
        className={cn(sportsStatusBadgeVariants({ status, size, variant }), className)}
        {...props}
      >
        {getStatusIcon()}
        {getStatusText()}
      </Badge>
    )
  }
)
SportsStatusBadge.displayName = "SportsStatusBadge"

// Time Display Component for games
const sportsTimeDisplayVariants = cva(
  "font-medium text-center",
  {
    variants: {
      variant: {
        default: "text-muted-foreground",
        primary: "text-primary",
        live: "text-live font-semibold",
        final: "text-muted-foreground opacity-75",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface SportsTimeDisplayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sportsTimeDisplayVariants> {
  time: string
  status?: "live" | "upcoming" | "final"
  showStatus?: boolean
}

const SportsTimeDisplay = React.forwardRef<HTMLDivElement, SportsTimeDisplayProps>(
  ({ className, variant, size, time, status, showStatus = false, ...props }, ref) => {
    // Auto-set variant based on status
    const effectiveVariant = variant || (
      status === "live" ? "live" : 
      status === "final" ? "final" : 
      "default"
    )

    return (
      <div
        ref={ref}
        className={cn(sportsTimeDisplayVariants({ variant: effectiveVariant, size }), className)}
        {...props}
      >
        {time}
        {showStatus && status && (
          <SportsStatusBadge 
            status={status} 
            size="xs" 
            className="ml-2"
          />
        )}
      </div>
    )
  }
)
SportsTimeDisplay.displayName = "SportsTimeDisplay"

// Score Display Component
const sportsScoreDisplayVariants = cva(
  "font-mono font-bold tabular-nums",
  {
    variants: {
      variant: {
        default: "text-foreground",
        winning: "text-win",
        losing: "text-loss",
        tied: "text-muted-foreground",
      },
      size: {
        sm: "text-lg",
        default: "text-xl sm:text-2xl",
        lg: "text-2xl sm:text-3xl",
        xl: "text-3xl sm:text-4xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface SportsScoreDisplayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sportsScoreDisplayVariants> {
  score: number
  opponentScore?: number
  showComparison?: boolean
}

const SportsScoreDisplay = React.forwardRef<HTMLDivElement, SportsScoreDisplayProps>(
  ({ 
    className, 
    variant, 
    size, 
    score, 
    opponentScore, 
    showComparison = false,
    ...props 
  }, ref) => {
    // Auto-determine variant based on score comparison
    const effectiveVariant = variant || (
      showComparison && opponentScore !== undefined
        ? score > opponentScore ? "winning"
        : score < opponentScore ? "losing"
        : "tied"
        : "default"
    )

    return (
      <div
        ref={ref}
        className={cn(sportsScoreDisplayVariants({ variant: effectiveVariant, size }), className)}
        {...props}
      >
        {score}
      </div>
    )
  }
)
SportsScoreDisplay.displayName = "SportsScoreDisplay"

export { 
  SportsStatusBadge, 
  SportsTimeDisplay,
  SportsScoreDisplay,
  sportsStatusBadgeVariants,
  sportsTimeDisplayVariants,
  sportsScoreDisplayVariants 
}
