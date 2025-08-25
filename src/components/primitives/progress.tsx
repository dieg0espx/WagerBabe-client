"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const progressVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        sm: "h-1",
        default: "h-2",
        lg: "h-3",
        xl: "h-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 bg-primary transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-secondary-foreground",
        destructive: "bg-destructive",
        success: "bg-green-500",
        warning: "bg-yellow-500",
        info: "bg-blue-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressIndicatorVariants> {
  value?: number
  max?: number
  showValue?: boolean
  showPercentage?: boolean
  label?: string
  className?: string
  indicatorClassName?: string
}

function Progress({
  className,
  value = 0,
  max = 100,
  size,
  variant,
  showValue = false,
  showPercentage = false,
  label,
  indicatorClassName,
  ...props
}: ProgressProps) {
  const percentage = Math.round((value / max) * 100)
  const clampedValue = Math.min(Math.max(value, 0), max)

  return (
    <div className="w-full space-y-2">
      {(label || showValue || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="font-medium">{label}</span>}
          {(showValue || showPercentage) && (
            <span className="text-muted-foreground">
              {showValue && `${clampedValue}/${max}`}
              {showValue && showPercentage && " "}
              {showPercentage && `(${percentage}%)`}
            </span>
          )}
        </div>
      )}
      <ProgressPrimitive.Root
        className={cn(progressVariants({ size }), className)}
        value={clampedValue}
        max={max}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(progressIndicatorVariants({ variant }), indicatorClassName)}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
}

// Circular Progress Component
interface CircularProgressProps extends VariantProps<typeof progressIndicatorVariants> {
  value?: number
  max?: number
  size?: number
  strokeWidth?: number
  showValue?: boolean
  showPercentage?: boolean
  label?: string
  className?: string
}

function CircularProgress({
  value = 0,
  max = 100,
  size = 40,
  strokeWidth = 4,
  variant = "default",
  showValue = false,
  showPercentage = false,
  label,
  className,
}: CircularProgressProps) {
  const percentage = Math.round((value / max) * 100)
  const clampedValue = Math.min(Math.max(value, 0), max)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (clampedValue / max) * circumference

  const colorClasses = {
    default: "stroke-primary",
    secondary: "stroke-secondary-foreground",
    destructive: "stroke-destructive",
    success: "stroke-green-500",
    warning: "stroke-yellow-500",
    info: "stroke-blue-500",
  }

  return (
    <div className={cn("inline-flex flex-col items-center gap-2", className)}>
      {label && <span className="text-sm font-medium">{label}</span>}
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-secondary"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn("transition-all duration-300", colorClasses[variant || "default"])}
          />
        </svg>
        {(showValue || showPercentage) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium">
              {showValue && `${clampedValue}`}
              {showValue && showPercentage && "/"}
              {showPercentage && `${percentage}%`}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// Stepped Progress Component
interface SteppedProgressProps extends VariantProps<typeof progressIndicatorVariants> {
  currentStep: number
  totalSteps: number
  steps?: Array<{ label: string; description?: string }>
  orientation?: "horizontal" | "vertical"
  showLabels?: boolean
  className?: string
}

function SteppedProgress({
  currentStep,
  totalSteps,
  steps,
  orientation = "horizontal",
  showLabels = true,
  variant = "default",
  className,
}: SteppedProgressProps) {
  const isHorizontal = orientation === "horizontal"

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "flex",
          isHorizontal ? "flex-row items-center" : "flex-col",
          isHorizontal ? "space-x-2" : "space-y-4"
        )}
      >
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber <= currentStep
          const isCurrent = stepNumber === currentStep
          const step = steps?.[index]

          return (
            <div
              key={stepNumber}
              className={cn(
                "flex items-center",
                isHorizontal ? "flex-1" : "flex-row",
                !isHorizontal && "w-full"
              )}
            >
              {/* Step indicator */}
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium transition-colors",
                  isCompleted
                    ? "bg-primary text-primary-foreground border-primary"
                    : isCurrent
                    ? "border-primary text-primary bg-background"
                    : "border-muted text-muted-foreground bg-background"
                )}
              >
                {isCompleted ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>

              {/* Step content */}
              {showLabels && step && (
                <div className={cn("ml-3", isHorizontal && "hidden sm:block")}>
                  <div className="text-sm font-medium">{step.label}</div>
                  {step.description && (
                    <div className="text-xs text-muted-foreground">
                      {step.description}
                    </div>
                  )}
                </div>
              )}

              {/* Connector line */}
              {stepNumber < totalSteps && (
                <div
                  className={cn(
                    "bg-muted",
                    isHorizontal
                      ? "flex-1 h-0.5 mx-2"
                      : "w-0.5 h-8 ml-4 mt-2"
                  )}
                >
                  <div
                    className={cn(
                      "h-full transition-all duration-300",
                      isCompleted ? "bg-primary" : "bg-transparent",
                      isHorizontal ? "w-full" : "h-full"
                    )}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export {
  Progress,
  CircularProgress,
  SteppedProgress,
  progressVariants,
  progressIndicatorVariants,
  type ProgressProps,
  type CircularProgressProps,
  type SteppedProgressProps,
}
