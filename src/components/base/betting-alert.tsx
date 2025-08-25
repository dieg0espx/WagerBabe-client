/**
 * Betting-specific alert component that extends the primitive alert
 * with sports betting themed styling and behavior.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/theme"
import { Alert, AlertTitle, AlertDescription } from "@/components/primitives"

const bettingAlertVariants = cva(
  "border-l-4",
  {
    variants: {
      variant: {
        // Betting outcomes
        win: "border-l-green-500 bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-200",
        loss: "border-l-red-500 bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-200",
        pending: "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 text-yellow-800 dark:text-yellow-200",
        
        // Live betting
        live: "border-l-orange-500 bg-orange-50 dark:bg-orange-950/20 text-orange-800 dark:text-orange-200 animate-pulse",
        
        // Account related
        balance: "border-l-blue-500 bg-blue-50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-200",
        deposit: "border-l-green-500 bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-200",
        withdrawal: "border-l-purple-500 bg-purple-50 dark:bg-purple-950/20 text-purple-800 dark:text-purple-200",
        
        // Promotional
        bonus: "border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 text-yellow-800 dark:text-yellow-200",
        promo: "border-l-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 text-pink-800 dark:text-pink-200",
        
        // System alerts
        maintenance: "border-l-gray-500 bg-gray-50 dark:bg-gray-950/20 text-gray-800 dark:text-gray-200",
        error: "border-l-red-500 bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-200",
        warning: "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 text-yellow-800 dark:text-yellow-200",
        info: "border-l-blue-500 bg-blue-50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-200",
      },
      priority: {
        low: "opacity-80",
        normal: "",
        high: "shadow-lg border-2",
        urgent: "shadow-xl border-2 animate-pulse",
      },
    },
    defaultVariants: {
      variant: "info",
      priority: "normal",
    },
  }
)

export interface BettingAlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bettingAlertVariants> {
  title?: string
  description?: string
  dismissible?: boolean
  onDismiss?: () => void
  icon?: React.ReactNode
  action?: React.ReactNode
  amount?: number
  odds?: number
}

const BettingAlert = React.forwardRef<HTMLDivElement, BettingAlertProps>(
  ({ 
    className, 
    variant, 
    priority,
    title,
    description,
    dismissible = false,
    onDismiss,
    icon,
    action,
    amount,
    odds,
    children,
    ...props 
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true)

    const handleDismiss = () => {
      setIsVisible(false)
      onDismiss?.()
    }

    if (!isVisible) return null

    return (
      <Alert
        ref={ref}
        className={cn(bettingAlertVariants({ variant, priority }), className)}
        {...props}
      >
        <div className="flex items-start gap-3">
          {icon && (
            <div className="flex-shrink-0 mt-0.5">
              {icon}
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            {title && (
              <AlertTitle className="flex items-center gap-2">
                {title}
                {amount && (
                  <span className="text-sm font-mono">
                    ${amount.toFixed(2)}
                  </span>
                )}
                {odds && (
                  <span className="text-sm font-mono">
                    {odds > 0 ? `+${odds}` : odds}
                  </span>
                )}
              </AlertTitle>
            )}
            
            {description && (
              <AlertDescription>
                {description}
              </AlertDescription>
            )}
            
            {children}
          </div>
          
          <div className="flex items-center gap-2">
            {action && (
              <div className="flex-shrink-0">
                {action}
              </div>
            )}
            
            {dismissible && (
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label="Dismiss alert"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </Alert>
    )
  }
)
BettingAlert.displayName = "BettingAlert"

export { BettingAlert, bettingAlertVariants }
