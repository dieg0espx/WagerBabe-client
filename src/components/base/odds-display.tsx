/**
 * Odds display component for showing betting odds
 * with proper formatting and styling.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/theme"

const oddsDisplayVariants = cva(
  "font-mono font-semibold",
  {
    variants: {
      variant: {
        default: "text-foreground",
        positive: "text-green-600 dark:text-green-400",
        negative: "text-blue-600 dark:text-blue-400",
        even: "text-blue-600 dark:text-blue-400",
        favorite: "text-blue-700 dark:text-blue-300",
        underdog: "text-cyan-600 dark:text-cyan-400",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      },
      format: {
        american: "",
        decimal: "",
        fractional: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      format: "american",
    },
  }
)

export interface OddsDisplayProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof oddsDisplayVariants> {
  odds: number
  autoVariant?: boolean
  showSign?: boolean
}

const OddsDisplay = React.forwardRef<HTMLSpanElement, OddsDisplayProps>(
  ({ 
    className, 
    variant, 
    size, 
    format = "american",
    odds,
    autoVariant = true,
    showSign = true,
    ...props 
  }, ref) => {
    // Auto-determine variant based on odds if not explicitly set
    const displayVariant = autoVariant && !variant ? (
      odds > 0 ? "positive" :
      odds < 0 ? "negative" :
      "even"
    ) : variant

    // Format odds based on format type
    const formatOdds = (odds: number, format: string): string => {
      switch (format) {
        case "decimal":
          // Convert American odds to decimal
          if (odds > 0) {
            return (odds / 100 + 1).toFixed(2)
          } else {
            return (100 / Math.abs(odds) + 1).toFixed(2)
          }
        
        case "fractional":
          // Convert American odds to fractional
          if (odds > 0) {
            return `${odds}/100`
          } else {
            return `100/${Math.abs(odds)}`
          }
        
        case "american":
        default:
          // American odds format
          if (odds > 0) {
            return showSign ? `+${odds}` : `${odds}`
          } else if (odds < 0) {
            return `${odds}`
          } else {
            return "EVEN"
          }
      }
    }

    const formattedOdds = formatOdds(odds, format || "american")

    return (
      <span
        ref={ref}
        className={cn(oddsDisplayVariants({ variant: displayVariant, size, format }), className)}
        title={`Odds: ${formattedOdds}`}
        {...props}
      >
        {formattedOdds}
      </span>
    )
  }
)
OddsDisplay.displayName = "OddsDisplay"

export { OddsDisplay, oddsDisplayVariants }
