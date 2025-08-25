/**
 * Base betting card component that demonstrates the theming system.
 * Styles automatically propagate from base components to composite components.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/theme"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives"

const bettingCardVariants = cva(
  "transition-all duration-200 hover:shadow-md",
  {
    variants: {
      variant: {
        default: "border-border",
        live: "border-live bg-live/5 live-indicator",
        featured: "border-primary bg-primary/5",
        promoted: "border-bonus bg-bonus/5",
      },
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      },
      interactive: {
        true: "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      interactive: false,
    },
  }
)

export interface BettingCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bettingCardVariants> {
  title?: string
  subtitle?: string
  children?: React.ReactNode
}

const BettingCard = React.forwardRef<HTMLDivElement, BettingCardProps>(
  ({ className, variant, size, interactive, title, subtitle, children, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(bettingCardVariants({ variant, size, interactive, className }))}
        {...props}
      >
        {(title || subtitle) && (
          <CardHeader className="pb-3">
            {title && <CardTitle className="text-lg">{title}</CardTitle>}
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </CardHeader>
        )}
        {children && <CardContent className="pt-0">{children}</CardContent>}
      </Card>
    )
  }
)
BettingCard.displayName = "BettingCard"

export { BettingCard, bettingCardVariants }
