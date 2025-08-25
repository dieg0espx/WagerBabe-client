/**
 * Sports Bet Button - Base component for displaying betting options with odds
 * 
 * Provides consistent styling for betting buttons with odds display,
 * point spreads, and proper hover/active states for sports betting.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/theme"
import { Button } from "@/components/primitives"

const sportsBetButtonVariants = cva(
  "w-full transition-all duration-200 tracking-wide text-center border rounded-md flex flex-col items-center justify-center font-medium",
  {
    variants: {
      variant: {
        default: "bg-muted/30 text-foreground border-border hover:bg-[hsl(var(--sports-blue)/0.1)] hover:border-[hsl(var(--sports-blue)/0.3)] dark:hover:bg-[hsl(var(--sports-blue)/0.1)]",
        active: "sports-bg-blue text-white sports-border-blue shadow-md hover:bg-[hsl(var(--sports-blue-dark))] hover:border-[hsl(var(--sports-blue-dark))]",
        disabled: "bg-muted/20 text-muted-foreground border-border/50 cursor-not-allowed opacity-60",
        live: "bg-[hsl(var(--status-live)/0.1)] text-[hsl(var(--status-live))] border-[hsl(var(--status-live)/0.3)] hover:bg-[hsl(var(--status-live)/0.2)] hover:border-[hsl(var(--status-live)/0.5)]",
      },
      size: {
        sm: "min-h-[28px] px-1 py-1 text-xs",
        default: "min-h-[32px] px-2 py-1 text-xs sm:text-sm",
        lg: "min-h-[36px] px-3 py-2 text-sm",
        compact: "min-h-[24px] px-1 py-0.5 text-xs",
      },
      emphasis: {
        low: "opacity-80 hover:opacity-100",
        normal: "",
        high: "shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      emphasis: "normal",
    },
  }
)

export interface SportsBetButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sportsBetButtonVariants> {
  odds: string | number
  point?: number
  team?: string
  betType?: "spread" | "moneyline" | "total"
  isSelected?: boolean
  loading?: boolean
}

const SportsBetButton = React.forwardRef<HTMLButtonElement, SportsBetButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    emphasis,
    odds, 
    point, 
    team, 
    betType,
    isSelected = false,
    loading = false,
    disabled,
    children,
    ...props 
  }, ref) => {
    const effectiveVariant = isSelected ? "active" : disabled ? "disabled" : variant
    const isDisabled = disabled || loading

    const formatOdds = (odds: string | number) => {
      const numOdds = typeof odds === "string" ? parseFloat(odds) : odds
      if (isNaN(numOdds)) return odds.toString()
      return numOdds > 0 ? `+${numOdds}` : numOdds.toString()
    }

    const formatPoint = (point: number, betType?: string) => {
      if (betType === "total") {
        return point > 0 ? `O ${point}` : `U ${Math.abs(point)}`
      }
      return point > 0 ? `+${point}` : point.toString()
    }

    return (
      <Button
        ref={ref}
        className={cn(sportsBetButtonVariants({ variant: effectiveVariant, size, emphasis }), className)}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
          </div>
        ) : children ? (
          children
        ) : (
          <div className="flex flex-col items-center justify-center min-h-full">
            {/* Team name for spread/moneyline */}
            {team && betType !== "total" && (
              <span className="text-xs opacity-90 truncate max-w-full">
                {team.length > 8 ? team.slice(0, 8) + "..." : team}
              </span>
            )}
            
            {/* Point spread or total line */}
            {point !== undefined && (
              <span className="text-xs opacity-90">
                {formatPoint(point, betType)}
              </span>
            )}
            
            {/* Odds display */}
            <span className="font-semibold">
              {formatOdds(odds)}
            </span>
          </div>
        )}
      </Button>
    )
  }
)
SportsBetButton.displayName = "SportsBetButton"

// Odds Display Component (non-interactive)
const sportsOddsDisplayVariants = cva(
  "flex flex-col items-center justify-center text-center font-medium",
  {
    variants: {
      variant: {
        default: "text-foreground",
        positive: "text-win",
        negative: "text-loss",
        even: "text-muted-foreground",
      },
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface SportsOddsDisplayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sportsOddsDisplayVariants> {
  odds: string | number
  point?: number
  team?: string
  betType?: "spread" | "moneyline" | "total"
}

const SportsOddsDisplay = React.forwardRef<HTMLDivElement, SportsOddsDisplayProps>(
  ({ className, variant, size, odds, point, team, betType, ...props }, ref) => {
    const formatOdds = (odds: string | number) => {
      const numOdds = typeof odds === "string" ? parseFloat(odds) : odds
      if (isNaN(numOdds)) return odds.toString()
      return numOdds > 0 ? `+${numOdds}` : numOdds.toString()
    }

    const formatPoint = (point: number, betType?: string) => {
      if (betType === "total") {
        return point > 0 ? `O ${point}` : `U ${Math.abs(point)}`
      }
      return point > 0 ? `+${point}` : point.toString()
    }

    // Auto-determine variant based on odds
    const numOdds = typeof odds === "string" ? parseFloat(odds) : odds
    const effectiveVariant = variant || (
      !isNaN(numOdds) 
        ? numOdds > 0 ? "positive" : numOdds < 0 ? "negative" : "even"
        : "default"
    )

    return (
      <div
        ref={ref}
        className={cn(sportsOddsDisplayVariants({ variant: effectiveVariant, size }), className)}
        {...props}
      >
        {team && betType !== "total" && (
          <span className="text-xs opacity-90 truncate max-w-full">
            {team.length > 8 ? team.slice(0, 8) + "..." : team}
          </span>
        )}
        
        {point !== undefined && (
          <span className="text-xs opacity-90">
            {formatPoint(point, betType)}
          </span>
        )}
        
        <span className="font-semibold">
          {formatOdds(odds)}
        </span>
      </div>
    )
  }
)
SportsOddsDisplay.displayName = "SportsOddsDisplay"

export { 
  SportsBetButton, 
  SportsOddsDisplay,
  sportsBetButtonVariants,
  sportsOddsDisplayVariants 
}
