"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sliderVariants = cva(
  "relative flex w-full touch-none select-none items-center",
  {
    variants: {
      size: {
        sm: "h-4",
        default: "h-6", 
        lg: "h-8",
      },
      variant: {
        default: "",
        betting: "",
        success: "",
        warning: "",
        destructive: "",
      }
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

const sliderTrackVariants = cva(
  "relative w-full grow overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        sm: "h-1.5",
        default: "h-2",
        lg: "h-3",
      }
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const sliderRangeVariants = cva(
  "absolute h-full",
  {
    variants: {
      variant: {
        default: "bg-primary",
        betting: "bg-gradient-to-r from-blue-600 to-blue-500",
        success: "bg-gradient-to-r from-green-600 to-green-500", 
        warning: "bg-gradient-to-r from-yellow-600 to-yellow-500",
        destructive: "bg-gradient-to-r from-red-600 to-red-500",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const sliderThumbVariants = cva(
  "block rounded-full border-2 bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        default: "h-5 w-5",
        lg: "h-6 w-6",
      },
      variant: {
        default: "border-primary",
        betting: "border-blue-600 shadow-lg",
        success: "border-green-600",
        warning: "border-yellow-600", 
        destructive: "border-red-600",
      }
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    VariantProps<typeof sliderVariants> {
  size?: "sm" | "default" | "lg"
  variant?: "default" | "betting" | "success" | "warning" | "destructive"
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, size, variant, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(sliderVariants({ size, variant, className }))}
    {...props}
  >
    <SliderPrimitive.Track className={cn(sliderTrackVariants({ size }))}>
      <SliderPrimitive.Range className={cn(sliderRangeVariants({ variant }))} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={cn(sliderThumbVariants({ size, variant }))} />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider, sliderVariants }
