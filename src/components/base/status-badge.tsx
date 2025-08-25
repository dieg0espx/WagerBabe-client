/**
 * Base status badge component for betting statuses.
 * Shows how theming system handles different status states.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/theme"
import { Badge } from "@/components/primitives"

const statusBadgeVariants = cva(
  "font-medium transition-all duration-200",
  {
    variants: {
      status: {
        live: "sports-status-live",
        pending: "sports-status-pending",
        won: "sports-success-indicator",
        lost: "sports-danger-indicator",
        push: "bg-muted text-muted-foreground",
        cancelled: "bg-muted text-muted-foreground",
        settled: "sports-status-upcoming",
      },
      size: {
        sm: "px-1.5 py-0.5 text-xs",
        md: "px-2 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
      },
      animated: {
        true: "animate-pulse",
        false: "",
      },
    },
    defaultVariants: {
      status: "pending",
      size: "md",
      animated: false,
    },
  }
)

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  status: "live" | "pending" | "won" | "lost" | "push" | "cancelled" | "settled"
  children?: React.ReactNode
}

const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ className, status, size, animated, children, ...props }, ref) => {
    // Auto-animate live status
    const shouldAnimate = animated || status === "live"

    // Default status text if no children provided
    const statusText = children || status.charAt(0).toUpperCase() + status.slice(1)

    return (
      <Badge
        ref={ref}
        className={cn(statusBadgeVariants({ 
          status, 
          size, 
          animated: shouldAnimate,
          className 
        }))}
        {...props}
      >
        {statusText}
      </Badge>
    )
  }
)
StatusBadge.displayName = "StatusBadge"

export { StatusBadge, statusBadgeVariants }
