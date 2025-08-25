/**
 * Dashboard Widget - Base component for dashboard widgets and metrics
 * 
 * Provides consistent styling and layout for dashboard widgets with
 * support for icons, badges, trends, and compact modes.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/theme"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives"
import { Badge } from "@/components/primitives"
import { LucideIcon } from "lucide-react"

const dashboardWidgetVariants = cva(
  "h-full flex flex-col transition-all duration-200",
  {
    variants: {
      variant: {
        default: "sports-card-primary",
        secondary: "sports-card-secondary", 
        minimal: "sports-card-minimal",
        elevated: "sports-card-primary shadow-lg",
      },
      size: {
        compact: "",
        default: "",
        large: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const dashboardWidgetHeaderVariants = cva(
  "",
  {
    variants: {
      size: {
        compact: "pb-3",
        default: "pb-4",
        large: "pb-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const dashboardWidgetContentVariants = cva(
  "",
  {
    variants: {
      size: {
        compact: "p-4",
        default: "p-6",
        large: "p-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface DashboardWidgetProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dashboardWidgetVariants> {
  title: string
  description?: string
  icon?: LucideIcon
  badge?: {
    text: string
    variant?: "default" | "secondary" | "destructive" | "outline"
  }
  actions?: React.ReactNode
  children: React.ReactNode
  headerClassName?: string
  contentClassName?: string
}

const DashboardWidget = React.forwardRef<HTMLDivElement, DashboardWidgetProps>(
  ({ 
    className,
    variant,
    size,
    title,
    description,
    icon: Icon,
    badge,
    actions,
    children,
    headerClassName,
    contentClassName,
    ...props 
  }, ref) => {
    const compact = size === "compact"

    return (
      <Card
        ref={ref}
        className={cn(dashboardWidgetVariants({ variant, size }), className)}
        {...props}
      >
        <CardHeader className={cn(
          dashboardWidgetHeaderVariants({ size }),
          headerClassName
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {Icon && (
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <CardTitle className={cn(
                  "flex items-center gap-2",
                  compact ? "text-base" : "text-lg"
                )}>
                  <span className="truncate">{title}</span>
                  {badge && (
                    <Badge variant={badge.variant || "default"} className="text-xs shrink-0">
                      {badge.text}
                    </Badge>
                  )}
                </CardTitle>
                {description && !compact && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {description}
                  </p>
                )}
              </div>
            </div>
            {actions && (
              <div className="shrink-0">
                {actions}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className={cn(
          dashboardWidgetContentVariants({ size }),
          "flex-1 flex flex-col",
          contentClassName
        )}>
          {children}
        </CardContent>
      </Card>
    )
  }
)
DashboardWidget.displayName = "DashboardWidget"

// Dashboard Metric Component
const dashboardMetricVariants = cva(
  "flex items-center justify-between",
  {
    variants: {
      layout: {
        horizontal: "flex-row",
        vertical: "flex-col items-start gap-2",
      },
    },
    defaultVariants: {
      layout: "horizontal",
    },
  }
)

const dashboardMetricValueVariants = cva(
  "font-bold tabular-nums",
  {
    variants: {
      size: {
        sm: "text-lg",
        default: "text-2xl",
        lg: "text-3xl",
        xl: "text-4xl",
      },
      trend: {
        up: "text-win",
        down: "text-loss",
        neutral: "text-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      trend: "neutral",
    },
  }
)

export interface DashboardMetricProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dashboardMetricVariants> {
  label: string
  value: string | number
  trend?: "up" | "down" | "neutral"
  trendIcon?: React.ReactNode
  size?: "sm" | "default" | "lg" | "xl"
  icon?: LucideIcon
  compact?: boolean
}

const DashboardMetric = React.forwardRef<HTMLDivElement, DashboardMetricProps>(
  ({ 
    className,
    layout,
    label,
    value,
    trend = "neutral",
    trendIcon,
    size = "default",
    icon: Icon,
    compact = false,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(dashboardMetricVariants({ layout }), className)}
        {...props}
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground truncate">{label}</p>
          <div className="flex items-center gap-2 mt-1">
            <p className={cn(
              dashboardMetricValueVariants({ size, trend }),
              compact && size === "default" && "text-lg"
            )}>
              {value}
            </p>
            {trendIcon && (
              <span className={cn(
                "shrink-0",
                trend === "up" && "text-win",
                trend === "down" && "text-loss",
                trend === "neutral" && "text-muted-foreground"
              )}>
                {trendIcon}
              </span>
            )}
          </div>
        </div>
        {Icon && (
          <div className="p-3 bg-primary/10 rounded-full shrink-0">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
      </div>
    )
  }
)
DashboardMetric.displayName = "DashboardMetric"

// Dashboard Grid Component
const dashboardGridVariants = cva(
  "grid gap-4",
  {
    variants: {
      cols: {
        1: "grid-cols-1",
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        auto: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      },
      gap: {
        sm: "gap-2",
        default: "gap-4",
        lg: "gap-6",
        xl: "gap-8",
      },
    },
    defaultVariants: {
      cols: "auto",
      gap: "default",
    },
  }
)

export interface DashboardGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dashboardGridVariants> {
  children: React.ReactNode
}

const DashboardGrid = React.forwardRef<HTMLDivElement, DashboardGridProps>(
  ({ className, cols, gap, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(dashboardGridVariants({ cols, gap }), className)}
      {...props}
    >
      {children}
    </div>
  )
)
DashboardGrid.displayName = "DashboardGrid"

export { 
  DashboardWidget, 
  DashboardMetric,
  DashboardGrid,
  dashboardWidgetVariants,
  dashboardMetricVariants,
  dashboardGridVariants 
}
