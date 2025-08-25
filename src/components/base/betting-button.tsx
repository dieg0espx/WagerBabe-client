/**
 * Betting-specific button component that extends the primitive button
 * with sports betting themed styling and behavior.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/theme"
import { Button } from "@/components/primitives"

const bettingButtonVariants = cva(
  "transition-all duration-200 font-medium",
  {
    variants: {
      variant: {
        // Standard betting actions - Using CSS custom properties
        bet: "sports-bg-blue text-white hover:bg-[hsl(var(--sports-blue-dark))] shadow-lg hover:shadow-xl sports-border-blue",
        cashout: "bg-[hsl(var(--sports-warning))] text-white hover:bg-[hsl(var(--sports-warning-light))]",

        // Betting states - Using proper CSS variables
        win: "bg-[hsl(var(--sports-success))] text-white hover:bg-[hsl(var(--sports-success-light))]",
        loss: "bg-[hsl(var(--sports-danger))] text-white hover:bg-[hsl(var(--sports-danger-light))]",
        pending: "bg-[hsl(var(--status-pending))] text-white hover:bg-[hsl(var(--sports-blue-light))]",

        // Live betting
        live: "bg-[hsl(var(--status-live))] text-white hover:bg-[hsl(var(--sports-danger-light))] animate-pulse",

        // Odds related - Using sports blue variants
        favorite: "bg-[hsl(var(--sports-blue-dark))] text-white hover:bg-[hsl(var(--sports-blue))] border-[hsl(var(--sports-blue-dark))]",
        underdog: "sports-bg-blue text-white hover:bg-[hsl(var(--sports-blue-light))] sports-border-blue",

        // Context specific - Using sports blue for sportsbook
        sportsbook: "sports-bg-blue text-white hover:bg-[hsl(var(--sports-blue-dark))] shadow-md hover:shadow-lg sports-border-blue",
        casino: "bg-purple-600 text-white hover:bg-purple-700",
        poker: "bg-amber-600 text-white hover:bg-amber-700",

        // Promotional - Using sports colors
        bonus: "bg-gradient-to-r from-[hsl(var(--sports-blue))] to-[hsl(var(--sports-info))] text-white hover:from-[hsl(var(--sports-blue-dark))] hover:to-[hsl(var(--sports-info-light))]",
        promo: "bg-gradient-to-r from-[hsl(var(--sports-blue))] to-purple-600 text-white hover:from-[hsl(var(--sports-blue-dark))] hover:to-purple-700",
      },
      size: {
        xs: "h-6 px-2 text-xs",
        sm: "h-8 px-3 text-sm",
        default: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
        xl: "h-14 px-8 text-xl",
      },
      emphasis: {
        low: "opacity-80 hover:opacity-100",
        normal: "",
        high: "shadow-lg hover:shadow-xl transform hover:scale-105",
      },
    },
    defaultVariants: {
      variant: "bet",
      size: "default",
      emphasis: "normal",
    },
  }
)

export interface BettingButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof bettingButtonVariants> {
  asChild?: boolean
  loading?: boolean
  amount?: number
  odds?: number
}

const BettingButton = React.forwardRef<HTMLButtonElement, BettingButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    emphasis, 
    asChild = false, 
    loading = false,
    amount,
    odds,
    children,
    disabled,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading

    return (
      <Button
        ref={ref}
        className={cn(
          bettingButtonVariants({ variant, size, emphasis }),
          loading && "opacity-70 cursor-not-allowed",
          className
        )}
        disabled={isDisabled}
        asChild={asChild}
        {...props}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {children}
            {amount && (
              <span className="text-xs opacity-90">
                ${amount.toFixed(2)}
              </span>
            )}
            {odds && (
              <span className="text-xs opacity-90">
                {odds > 0 ? `+${odds}` : odds}
              </span>
            )}
          </div>
        )}
      </Button>
    )
  }
)
BettingButton.displayName = "BettingButton"

export { BettingButton, bettingButtonVariants }
