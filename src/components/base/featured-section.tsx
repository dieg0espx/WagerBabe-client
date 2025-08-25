/**
 * Featured Section - Base components for featured content sections
 * 
 * Provides consistent styling for featured sections, headers, and
 * content layouts used across different parts of the application.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/theme"
import { Badge } from "@/components/primitives"
import { LucideIcon } from "lucide-react"

const featuredSectionVariants = cva(
  "space-y-4",
  {
    variants: {
      variant: {
        default: "",
        elevated: "sports-card-primary p-6",
        minimal: "space-y-3",
        highlighted: "sports-card-enhanced p-6 border-primary/20",
      },
      spacing: {
        tight: "space-y-2",
        default: "space-y-4",
        loose: "space-y-6",
        xl: "space-y-8",
      },
    },
    defaultVariants: {
      variant: "default",
      spacing: "default",
    },
  }
)

export interface FeaturedSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof featuredSectionVariants> {
  children: React.ReactNode
}

const FeaturedSection = React.forwardRef<HTMLDivElement, FeaturedSectionProps>(
  ({ className, variant, spacing, children, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(featuredSectionVariants({ variant, spacing }), className)}
      {...props}
    >
      {children}
    </section>
  )
)
FeaturedSection.displayName = "FeaturedSection"

// Featured Section Header Component
const featuredSectionHeaderVariants = cva(
  "flex items-center justify-between",
  {
    variants: {
      variant: {
        default: "",
        centered: "flex-col text-center space-y-2",
        minimal: "border-b border-border pb-3",
      },
      size: {
        sm: "",
        default: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const featuredSectionTitleVariants = cva(
  "font-semibold tracking-tight",
  {
    variants: {
      size: {
        sm: "text-lg",
        default: "text-xl",
        lg: "text-2xl",
        xl: "text-3xl",
      },
      variant: {
        default: "text-foreground",
        primary: "text-primary",
        muted: "text-muted-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

export interface FeaturedSectionHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof featuredSectionHeaderVariants> {
  title: string
  subtitle?: string
  icon?: LucideIcon
  badge?: {
    text: string
    variant?: "default" | "secondary" | "destructive" | "outline"
  }
  actions?: React.ReactNode
  titleSize?: "sm" | "default" | "lg" | "xl"
  titleVariant?: "default" | "primary" | "muted"
}

const FeaturedSectionHeader = React.forwardRef<HTMLDivElement, FeaturedSectionHeaderProps>(
  ({ 
    className,
    variant,
    size,
    title,
    subtitle,
    icon: Icon,
    badge,
    actions,
    titleSize = "default",
    titleVariant = "default",
    ...props 
  }, ref) => (
    <div
      ref={ref}
      className={cn(featuredSectionHeaderVariants({ variant, size }), className)}
      {...props}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {Icon && (
          <div className="p-2 bg-primary/10 rounded-lg shrink-0">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className={cn(
              featuredSectionTitleVariants({ size: titleSize, variant: titleVariant }),
              "truncate"
            )}>
              {title}
            </h2>
            {badge && (
              <Badge variant={badge.variant || "default"} className="shrink-0">
                {badge.text}
              </Badge>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {subtitle}
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
  )
)
FeaturedSectionHeader.displayName = "FeaturedSectionHeader"

// Featured Grid Component
const featuredGridVariants = cva(
  "grid gap-4",
  {
    variants: {
      cols: {
        1: "grid-cols-1",
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
        auto: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      },
      gap: {
        sm: "gap-2",
        default: "gap-4",
        lg: "gap-6",
        xl: "gap-8",
      },
      responsive: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      cols: "auto",
      gap: "default",
      responsive: true,
    },
  }
)

export interface FeaturedGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof featuredGridVariants> {
  children: React.ReactNode
}

const FeaturedGrid = React.forwardRef<HTMLDivElement, FeaturedGridProps>(
  ({ className, cols, gap, responsive, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(featuredGridVariants({ cols, gap, responsive }), className)}
      {...props}
    >
      {children}
    </div>
  )
)
FeaturedGrid.displayName = "FeaturedGrid"

// Featured Card Component
const featuredCardVariants = cva(
  "sports-card-enhanced transition-all duration-200",
  {
    variants: {
      variant: {
        default: "",
        elevated: "shadow-lg hover:shadow-xl",
        minimal: "border-0 bg-transparent hover:bg-muted/50",
        highlighted: "border-primary/30 bg-primary/5",
      },
      size: {
        sm: "p-3",
        default: "p-4",
        lg: "p-6",
      },
      interactive: {
        true: "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      interactive: false,
    },
  }
)

export interface FeaturedCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof featuredCardVariants> {
  children: React.ReactNode
}

const FeaturedCard = React.forwardRef<HTMLDivElement, FeaturedCardProps>(
  ({ className, variant, size, interactive, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(featuredCardVariants({ variant, size, interactive }), className)}
      {...props}
    >
      {children}
    </div>
  )
)
FeaturedCard.displayName = "FeaturedCard"

// Featured List Component
const featuredListVariants = cva(
  "space-y-2",
  {
    variants: {
      variant: {
        default: "",
        divided: "divide-y divide-border",
        spaced: "space-y-4",
      },
      size: {
        sm: "space-y-1",
        default: "space-y-2",
        lg: "space-y-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface FeaturedListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof featuredListVariants> {
  children: React.ReactNode
}

const FeaturedList = React.forwardRef<HTMLDivElement, FeaturedListProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(featuredListVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </div>
  )
)
FeaturedList.displayName = "FeaturedList"

export { 
  FeaturedSection,
  FeaturedSectionHeader,
  FeaturedGrid,
  FeaturedCard,
  FeaturedList,
  featuredSectionVariants,
  featuredSectionHeaderVariants,
  featuredGridVariants,
  featuredCardVariants,
  featuredListVariants 
}
