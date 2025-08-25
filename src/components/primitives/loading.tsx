import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const loadingVariants = cva(
  "animate-spin rounded-full border-solid border-current border-r-transparent",
  {
    variants: {
      variant: {
        default: "text-primary",
        secondary: "text-secondary",
        muted: "text-muted-foreground",
        destructive: "text-destructive",
        success: "text-green-500",
        warning: "text-yellow-500",
        live: "text-orange-500",
      },
      size: {
        xs: "h-3 w-3 border",
        sm: "h-4 w-4 border",
        default: "h-6 w-6 border-2",
        lg: "h-8 w-8 border-2",
        xl: "h-12 w-12 border-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const loadingContainerVariants = cva(
  "flex items-center justify-center",
  {
    variants: {
      fullScreen: {
        true: "fixed inset-0 bg-background/80 backdrop-blur-sm z-50",
        false: "",
      },
    },
    defaultVariants: {
      fullScreen: false,
    },
  }
)

export interface LoadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants>,
    VariantProps<typeof loadingContainerVariants> {
  text?: string
  showText?: boolean
}

function Loading({ 
  className, 
  variant, 
  size, 
  fullScreen, 
  text = "Loading...", 
  showText = false,
  ...props 
}: LoadingProps) {
  return (
    <div
      data-slot="loading-container"
      className={cn(loadingContainerVariants({ fullScreen }), className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2">
        <div
          data-slot="loading-spinner"
          className={cn(loadingVariants({ variant, size }))}
          role="status"
          aria-label={text}
        />
        {showText && (
          <span 
            data-slot="loading-text"
            className="text-sm text-muted-foreground"
          >
            {text}
          </span>
        )}
      </div>
    </div>
  )
}

// Inline spinner for use within other components
export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {}

function Spinner({ className, variant, size, ...props }: SpinnerProps) {
  return (
    <div
      data-slot="spinner"
      className={cn(loadingVariants({ variant, size }), className)}
      role="status"
      aria-hidden="true"
      {...props}
    />
  )
}

export { Loading, Spinner, loadingVariants }
