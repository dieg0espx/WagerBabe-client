"use client"

import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { LucideIcon, RefreshCw, Settings, AlertCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Alert,
  AlertDescription,
  Skeleton
} from "@/components/primitives"

const widgetVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "",
        betting: "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50",
        casino: "border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-950/50",
        poker: "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50",
        analytics: "border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/50",
      },
      size: {
        sm: "",
        default: "",
        lg: "",
      },
      priority: {
        low: "opacity-90",
        normal: "",
        high: "ring-2 ring-blue-500/20",
        critical: "ring-2 ring-red-500/20",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default", 
      priority: "normal",
    },
  }
)

const cardVariants = cva(
  "transition-all duration-200",
  {
    variants: {
      variant: {
        default: "",
        betting: "hover:border-blue-300 dark:hover:border-blue-700",
        casino: "hover:border-purple-300 dark:hover:border-purple-700",
        poker: "hover:border-green-300 dark:hover:border-green-700",
        analytics: "hover:border-orange-300 dark:hover:border-orange-700",
      },
      compact: {
        true: "space-y-2",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      compact: false,
    },
  }
)

export interface BaseWidgetProps extends VariantProps<typeof widgetVariants> {
  title: string
  description?: string
  icon?: LucideIcon
  isLoading?: boolean
  error?: string | null
  onRefresh?: () => void
  onSettings?: () => void
  refreshDisabled?: boolean
  className?: string
  compact?: boolean
  children: React.ReactNode
  badge?: string
  badgeVariant?: "default" | "secondary" | "destructive" | "outline"
  variant?: "default" | "betting" | "casino" | "poker" | "analytics"
  size?: "sm" | "default" | "lg"
  priority?: "low" | "normal" | "high" | "critical"
}

export function BaseWidget({
  title,
  description,
  icon: Icon,
  isLoading = false,
  error = null,
  onRefresh,
  onSettings,
  refreshDisabled = false,
  className,
  compact = false,
  children,
  badge,
  badgeVariant = "secondary",
  variant = "default",
  size = "default",
  priority = "normal",
}: BaseWidgetProps) {
  return (
    <div className={cn(widgetVariants({ variant, size, priority }), className)}>
      <Card className={cn(cardVariants({ variant, compact }))}>
        <CardHeader className={cn(
          "flex flex-row items-center justify-between space-y-0",
          compact ? "pb-2" : "pb-3",
          size === "sm" && "p-4",
          size === "lg" && "p-8"
        )}>
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <CardTitle className="flex items-center gap-2 min-w-0">
              {Icon && (
                <Icon className={cn(
                  "shrink-0",
                  size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5",
                  variant === "betting" && "text-blue-600 dark:text-blue-400",
                  variant === "casino" && "text-purple-600 dark:text-purple-400",
                  variant === "poker" && "text-green-600 dark:text-green-400",
                  variant === "analytics" && "text-orange-600 dark:text-orange-400"
                )} />
              )}
              <span className="truncate min-w-0">{title}</span>
            </CardTitle>
            {badge && (
              <Badge variant={badgeVariant} className={cn(
                "text-xs shrink-0",
                size === "sm" && "text-[10px] px-1.5 py-0.5"
              )}>
                {badge}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onRefresh && (
              <Button
                variant="outline"
                size={size === "sm" ? "sm" : "sm"}
                onClick={onRefresh}
                disabled={isLoading || refreshDisabled}
                className="flex items-center gap-2"
              >
                <RefreshCw className={cn(
                  "h-4 w-4",
                  isLoading && "animate-spin"
                )} />
                {!compact && size !== "sm" && "Refresh"}
              </Button>
            )}
            {onSettings && (
              <Button
                variant="ghost"
                size={size === "sm" ? "sm" : "sm"}
                onClick={onSettings}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                {!compact && size !== "sm" && "Settings"}
              </Button>
            )}
          </div>
        </CardHeader>
        
        {description && !compact && (
          <div className={cn(
            "px-6 -mt-2 mb-4",
            size === "sm" && "px-4 mb-2",
            size === "lg" && "px-8 mb-6"
          )}>
            <p className={cn(
              "text-sm text-muted-foreground",
              size === "sm" && "text-xs",
              size === "lg" && "text-base"
            )}>
              {description}
            </p>
          </div>
        )}

        <CardContent className={cn(
          compact && "pt-0",
          size === "sm" && "p-4",
          size === "lg" && "p-8"
        )}>
          {error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : (
            children
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Loading skeleton for widgets
export function WidgetSkeleton({ 
  compact = false, 
  className,
  variant = "default",
  size = "default"
}: { 
  compact?: boolean
  className?: string
  variant?: "default" | "betting" | "casino" | "poker" | "analytics"
  size?: "sm" | "default" | "lg"
}) {
  return (
    <Card className={cn(cardVariants({ variant, compact }), "w-full", className)}>
      <CardHeader className={cn(
        "flex flex-row items-center justify-between space-y-0",
        compact ? "pb-2" : "pb-3",
        size === "sm" && "p-4",
        size === "lg" && "p-8"
      )}>
        <div className="flex items-center gap-2">
          <Skeleton className={cn(
            "rounded",
            size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"
          )} />
          <Skeleton className={cn(
            "h-5",
            size === "sm" ? "w-24" : size === "lg" ? "w-40" : "w-32"
          )} />
        </div>
        <Skeleton className={cn(
          "h-8",
          size === "sm" ? "w-16" : "w-20"
        )} />
      </CardHeader>
      
      {!compact && (
        <div className={cn(
          "px-6 -mt-2 mb-4",
          size === "sm" && "px-4 mb-2",
          size === "lg" && "px-8 mb-6"
        )}>
          <Skeleton className={cn(
            "h-4",
            size === "sm" ? "w-32" : size === "lg" ? "w-64" : "w-48"
          )} />
        </div>
      )}

      <CardContent className={cn(
        compact && "pt-0",
        size === "sm" && "p-4",
        size === "lg" && "p-8"
      )}>
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardContent>
    </Card>
  )
}

// Error state for widgets
export function WidgetError({ 
  error, 
  onRetry, 
  compact = false,
  className,
  variant = "default",
  size = "default"
}: { 
  error: string
  onRetry?: () => void
  compact?: boolean
  className?: string
  variant?: "default" | "betting" | "casino" | "poker" | "analytics"
  size?: "sm" | "default" | "lg"
}) {
  return (
    <Card className={cn(cardVariants({ variant, compact }), "w-full", className)}>
      <CardContent className={cn(
        "p-6",
        compact && "p-4",
        size === "sm" && "p-4",
        size === "lg" && "p-8"
      )}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            {onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="ml-2"
              >
                Retry
              </Button>
            )}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

export { widgetVariants, cardVariants }
