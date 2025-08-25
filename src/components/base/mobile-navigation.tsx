/**
 * Mobile Navigation - Base components for mobile navigation patterns
 * 
 * Provides consistent styling for mobile navigation items, containers,
 * and touch-friendly interactions with proper accessibility.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/theme"
import { Badge } from "@/components/primitives"
import { LucideIcon } from "lucide-react"

const mobileNavContainerVariants = cva(
  "fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border/50 safe-area-bottom",
  {
    variants: {
      variant: {
        default: "",
        elevated: "shadow-lg",
        minimal: "bg-background border-t-0",
      },
      size: {
        compact: "px-1 py-1",
        default: "px-2 py-2",
        comfortable: "px-3 py-3",
      },
      visibility: {
        mobile: "md:hidden",
        always: "",
        tablet: "lg:hidden",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      visibility: "mobile",
    },
  }
)

export interface MobileNavContainerProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof mobileNavContainerVariants> {
  children: React.ReactNode
}

const MobileNavContainer = React.forwardRef<HTMLElement, MobileNavContainerProps>(
  ({ className, variant, size, visibility, children, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(mobileNavContainerVariants({ variant, size, visibility }), className)}
      {...props}
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {children}
      </div>
    </nav>
  )
)
MobileNavContainer.displayName = "MobileNavContainer"

// Mobile Nav Item Component
const mobileNavItemVariants = cva(
  "relative flex flex-col items-center justify-center rounded-xl transition-all duration-200 touch-target-44",
  {
    variants: {
      variant: {
        default: "hover:bg-muted/50 hover:scale-105 active:scale-95",
        active: "bg-primary/10 scale-105",
        minimal: "hover:opacity-80 active:opacity-60",
      },
      size: {
        compact: "p-1 min-w-[48px]",
        default: "p-2 min-w-[60px]",
        comfortable: "p-3 min-w-[72px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const mobileNavItemIconVariants = cva(
  "relative rounded-lg transition-all duration-200",
  {
    variants: {
      variant: {
        default: "p-2 text-muted-foreground",
        active: "p-2 bg-primary text-primary-foreground shadow-lg",
        minimal: "p-1 text-muted-foreground",
      },
      size: {
        compact: "p-1",
        default: "p-2",
        comfortable: "p-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const mobileNavItemLabelVariants = cva(
  "font-medium mt-1 transition-colors leading-tight text-center",
  {
    variants: {
      variant: {
        default: "text-muted-foreground",
        active: "text-primary",
        minimal: "text-muted-foreground",
      },
      size: {
        compact: "text-xs",
        default: "text-xs",
        comfortable: "text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface MobileNavItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof mobileNavItemVariants> {
  icon: LucideIcon
  label: string
  isActive?: boolean
  badge?: {
    count: number
    variant?: "default" | "destructive" | "secondary"
    max?: number
  }
  href: string
}

const MobileNavItem = React.forwardRef<HTMLAnchorElement, MobileNavItemProps>(
  ({ 
    className,
    variant,
    size,
    icon: Icon,
    label,
    isActive = false,
    badge,
    href,
    ...props 
  }, ref) => {
    const effectiveVariant = isActive ? "active" : variant
    const showBadge = badge && badge.count > 0

    const formatBadgeCount = (count: number, max: number = 99) => {
      return count > max ? `${max}+` : count.toString()
    }

    return (
      <a
        ref={ref}
        href={href}
        className={cn(mobileNavItemVariants({ variant: effectiveVariant, size }), className)}
        {...props}
      >
        <div className={mobileNavItemIconVariants({ variant: effectiveVariant, size })}>
          <Icon className="h-5 w-5" />
          
          {/* Badge for notifications/counts */}
          {showBadge && (
            <Badge 
              variant={badge.variant || "destructive"}
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs font-bold min-w-[20px]"
            >
              {formatBadgeCount(badge.count, badge.max)}
            </Badge>
          )}
        </div>
        
        <span className={mobileNavItemLabelVariants({ variant: effectiveVariant, size })}>
          {label}
        </span>
      </a>
    )
  }
)
MobileNavItem.displayName = "MobileNavItem"

// Mobile Container Component (for general mobile layouts)
const mobileContainerVariants = cva(
  "w-full mx-auto",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        default: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "max-w-full",
      },
      padding: {
        none: "",
        sm: "px-2",
        default: "px-4",
        lg: "px-6",
      },
    },
    defaultVariants: {
      size: "default",
      padding: "default",
    },
  }
)

export interface MobileContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mobileContainerVariants> {
  children: React.ReactNode
}

const MobileContainer = React.forwardRef<HTMLDivElement, MobileContainerProps>(
  ({ className, size, padding, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(mobileContainerVariants({ size, padding }), className)}
      {...props}
    >
      {children}
    </div>
  )
)
MobileContainer.displayName = "MobileContainer"

// Mobile Touch Target Component
const mobileTouchTargetVariants = cva(
  "inline-flex items-center justify-center transition-all duration-200 touch-target-44",
  {
    variants: {
      variant: {
        default: "hover:bg-muted/50 active:bg-muted",
        primary: "hover:bg-primary/10 active:bg-primary/20",
        ghost: "hover:bg-accent/50 active:bg-accent",
      },
      size: {
        sm: "min-h-[40px] min-w-[40px] p-2",
        default: "min-h-[44px] min-w-[44px] p-3",
        lg: "min-h-[48px] min-w-[48px] p-4",
      },
      shape: {
        square: "rounded-md",
        rounded: "rounded-lg",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "rounded",
    },
  }
)

export interface MobileTouchTargetProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof mobileTouchTargetVariants> {
  children: React.ReactNode
}

const MobileTouchTarget = React.forwardRef<HTMLButtonElement, MobileTouchTargetProps>(
  ({ className, variant, size, shape, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(mobileTouchTargetVariants({ variant, size, shape }), className)}
      {...props}
    >
      {children}
    </button>
  )
)
MobileTouchTarget.displayName = "MobileTouchTarget"

export { 
  MobileNavContainer,
  MobileNavItem,
  MobileContainer,
  MobileTouchTarget,
  mobileNavContainerVariants,
  mobileNavItemVariants,
  mobileContainerVariants,
  mobileTouchTargetVariants 
}
