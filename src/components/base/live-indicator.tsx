/**
 * Live indicator component for showing live betting status
 * with pulsing animation and themed styling.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/theme"

const liveIndicatorVariants = cva(
  "inline-flex items-center gap-1.5 font-medium",
  {
    variants: {
      variant: {
        default: "text-blue-600 dark:text-blue-400",
        badge: "bg-blue-600 text-white px-2 py-1 rounded-full text-xs",
        dot: "text-blue-600 dark:text-blue-400",
        subtle: "text-orange-600 dark:text-orange-400",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg",
      },
      animated: {
        true: "animate-pulse",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animated: true,
    },
  }
)

const dotVariants = cva(
  "rounded-full",
  {
    variants: {
      variant: {
        default: "bg-blue-500",
        badge: "bg-white",
        dot: "bg-blue-500",
        subtle: "bg-orange-500",
      },
      size: {
        xs: "w-1.5 h-1.5",
        sm: "w-2 h-2",
        default: "w-2.5 h-2.5",
        lg: "w-3 h-3",
      },
      animated: {
        true: "animate-pulse",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animated: true,
    },
  }
)

export interface LiveIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof liveIndicatorVariants> {
  showText?: boolean
  text?: string
  showDot?: boolean
}

const LiveIndicator = React.forwardRef<HTMLSpanElement, LiveIndicatorProps>(
  ({ 
    className, 
    variant, 
    size, 
    animated = true,
    showText = true,
    text = "LIVE",
    showDot = true,
    ...props 
  }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(liveIndicatorVariants({ variant, size, animated }), className)}
        {...props}
      >
        {showDot && (
          <span 
            className={cn(dotVariants({ variant, size, animated }))}
            aria-hidden="true"
          />
        )}
        {showText && (
          <span className="font-semibold tracking-wide">
            {text}
          </span>
        )}
      </span>
    )
  }
)
LiveIndicator.displayName = "LiveIndicator"

export { LiveIndicator, liveIndicatorVariants }
