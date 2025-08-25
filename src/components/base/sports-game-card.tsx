/**
 * Sports Game Card - Base component for displaying sports games with betting options
 * 
 * Provides consistent styling and layout for sports game cards across the application.
 * Supports both mobile and desktop layouts with proper responsive design.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/theme"
import { Card, CardContent, CardHeader } from "@/components/primitives"

const sportsGameCardVariants = cva(
  "overflow-visible transition-all duration-200 border bg-card group w-full min-w-0",
  {
    variants: {
      variant: {
        default: "hover:border-primary/30 hover:shadow-md",
        live: "border-live bg-live/5 hover:border-live/50 hover:shadow-lg",
        featured: "border-primary bg-primary/5 hover:border-primary/50 hover:shadow-lg",
        final: "opacity-75 hover:opacity-100",
      },
      size: {
        compact: "",
        default: "",
        expanded: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const sportsGameCardHeaderVariants = cva(
  "bg-muted/30 border-b",
  {
    variants: {
      size: {
        compact: "py-2 px-3",
        default: "py-2 px-4 sm:py-3 sm:px-5",
        expanded: "py-3 px-5 sm:py-4 sm:px-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const sportsGameCardTimeVariants = cva(
  "text-primary uppercase tracking-widest font-semibold text-center",
  {
    variants: {
      size: {
        compact: "text-xs",
        default: "text-xs sm:text-sm",
        expanded: "text-sm sm:text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface SportsGameCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sportsGameCardVariants> {
  children: React.ReactNode
  timeDisplay?: string
  status?: "upcoming" | "live" | "final"
}

const SportsGameCard = React.forwardRef<HTMLDivElement, SportsGameCardProps>(
  ({ className, variant, size, children, timeDisplay, status, ...props }, ref) => {
    // Auto-set variant based on status
    const effectiveVariant = status === "live" ? "live" : status === "final" ? "final" : variant

    return (
      <Card
        ref={ref}
        className={cn(sportsGameCardVariants({ variant: effectiveVariant, size }), className)}
        {...props}
      >
        {timeDisplay && (
          <CardHeader className={sportsGameCardHeaderVariants({ size })}>
            <p className={sportsGameCardTimeVariants({ size })}>
              {timeDisplay}
            </p>
          </CardHeader>
        )}
        <CardContent className="p-0">
          {children}
        </CardContent>
      </Card>
    )
  }
)
SportsGameCard.displayName = "SportsGameCard"

// Team Display Component
const sportsTeamDisplayVariants = cva(
  "flex items-center gap-3",
  {
    variants: {
      layout: {
        horizontal: "flex-row",
        vertical: "flex-col text-center",
      },
      size: {
        sm: "gap-2",
        default: "gap-3",
        lg: "gap-4",
      },
    },
    defaultVariants: {
      layout: "horizontal",
      size: "default",
    },
  }
)

export interface SportsTeamDisplayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sportsTeamDisplayVariants> {
  teamName: string
  score?: number
  showScore?: boolean
  logoSize?: "sm" | "default" | "lg"
}

const SportsTeamDisplay = React.forwardRef<HTMLDivElement, SportsTeamDisplayProps>(
  ({ className, layout, size, teamName, score, showScore, logoSize = "default", ...props }, ref) => {
    const logoSizeClasses = {
      sm: "w-8 h-8 text-xs",
      default: "w-10 h-10 text-xs sm:w-12 sm:h-12",
      lg: "w-12 h-12 text-sm sm:w-14 sm:h-14",
    }

    return (
      <div
        ref={ref}
        className={cn(sportsTeamDisplayVariants({ layout, size }), className)}
        {...props}
      >
        <div className={cn(
          "bg-muted rounded-full flex items-center justify-center",
          logoSizeClasses[logoSize]
        )}>
          <span className="font-bold">{teamName.slice(0, 3).toUpperCase()}</span>
        </div>
        <div className={layout === "vertical" ? "text-center" : ""}>
          <p className="font-semibold text-foreground">{teamName}</p>
          {showScore && score !== undefined && (
            <p className="text-xl sm:text-2xl font-mono font-bold">{score}</p>
          )}
        </div>
      </div>
    )
  }
)
SportsTeamDisplay.displayName = "SportsTeamDisplay"

// Desktop Layout Component
export interface SportsGameCardDesktopLayoutProps {
  children: React.ReactNode
  className?: string
}

const SportsGameCardDesktopLayout = React.forwardRef<HTMLDivElement, SportsGameCardDesktopLayoutProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn("hidden md:block", className)}>
      {children}
    </div>
  )
)
SportsGameCardDesktopLayout.displayName = "SportsGameCardDesktopLayout"

// Mobile Layout Component
export interface SportsGameCardMobileLayoutProps {
  children: React.ReactNode
  className?: string
}

const SportsGameCardMobileLayout = React.forwardRef<HTMLDivElement, SportsGameCardMobileLayoutProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn("md:hidden", className)}>
      {children}
    </div>
  )
)
SportsGameCardMobileLayout.displayName = "SportsGameCardMobileLayout"

export { 
  SportsGameCard, 
  SportsTeamDisplay,
  SportsGameCardDesktopLayout,
  SportsGameCardMobileLayout,
  sportsGameCardVariants,
  sportsTeamDisplayVariants 
}
