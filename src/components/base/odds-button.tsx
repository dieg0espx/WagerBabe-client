/**
 * Base odds button component with automatic styling based on odds value.
 * Demonstrates how theming propagates to specialized components.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/theme"
import { Button } from "@/components/primitives"

const oddsButtonVariants = cva(
  "font-mono tabular-nums transition-all duration-200 odds-button",
  {
    variants: {
      variant: {
        default: "hover:bg-primary/10",
        positive: "text-win hover:bg-win/10 hover:border-win",
        negative: "text-loss hover:bg-loss/10 hover:border-loss",
        even: "text-muted-foreground hover:bg-muted/50",
        live: "border-live text-live hover:bg-live/10 animate-pulse",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-3 text-base",
      },
      state: {
        disabled: "opacity-50 cursor-not-allowed hover:scale-100",
        enabled: "hover:scale-105 active:scale-95",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      state: "enabled",
    },
  }
)

export interface OddsButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof oddsButtonVariants> {
  odds: number
  isLive?: boolean
  formatOdds?: (odds: number) => string
  disabled?: boolean
}

const OddsButton = React.forwardRef<HTMLButtonElement, OddsButtonProps>(
  ({ className, variant, size, disabled, odds, isLive, formatOdds, children, ...props }, ref) => {
    // Auto-determine variant based on odds if not explicitly set
    const autoVariant = variant || (
      isLive ? "live" :
      odds > 0 ? "positive" :
      odds < 0 ? "negative" :
      "even"
    )

    // Default odds formatting
    const defaultFormatOdds = (odds: number): string => {
      if (odds > 0) return `+${odds}`
      if (odds < 0) return `${odds}`
      return "EVEN"
    }

    const formattedOdds = formatOdds ? formatOdds(odds) : defaultFormatOdds(odds)
    const isDisabled = disabled

    return (
      <Button
        ref={ref}
        variant="outline"
        className={cn(oddsButtonVariants({
          variant: autoVariant,
          size,
          state: isDisabled ? "disabled" : "enabled",
          className
        }))}
        disabled={isDisabled}
        {...props}
      >
        {children || formattedOdds}
      </Button>
    )
  }
)
OddsButton.displayName = "OddsButton"

export { OddsButton, oddsButtonVariants }
