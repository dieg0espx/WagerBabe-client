/**
 * Betting-specific input component that extends the primitive input
 * with sports betting themed styling and validation.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/theme"
import { Input } from "@/components/primitives"

const bettingInputVariants = cva(
  "transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-border focus:border-primary",
        amount: "border-green-300 focus:border-green-500 focus:ring-green-500/20",
        odds: "border-blue-300 focus:border-blue-500 focus:ring-blue-500/20",
        error: "border-red-500 focus:border-red-600 focus:ring-red-500/20 bg-red-50 dark:bg-red-950/20",
        success: "border-green-500 focus:border-green-600 focus:ring-green-500/20 bg-green-50 dark:bg-green-950/20",
        warning: "border-yellow-500 focus:border-yellow-600 focus:ring-yellow-500/20 bg-yellow-50 dark:bg-yellow-950/20",
      },
      inputType: {
        text: "",
        number: "text-right font-mono",
        currency: "text-right font-mono",
        percentage: "text-right font-mono",
      },
    },
    defaultVariants: {
      variant: "default",
      inputType: "text",
    },
  }
)

export interface BettingInputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof bettingInputVariants> {
  label?: string
  error?: string
  helper?: string
  prefix?: string
  suffix?: string
  currency?: string
  min?: number
  max?: number
  step?: number
}

const BettingInput = React.forwardRef<HTMLInputElement, BettingInputProps>(
  ({
    className,
    variant,
    inputType,
    label,
    error,
    helper,
    prefix,
    suffix,
    currency = "$",
    type = "text",
    size: _size, // Excluded to avoid conflict with HTML input size prop
    ...props
  }, ref) => {
    const [value, setValue] = React.useState(props.value || "")
    
    // Determine input type based on variant
    const actualType = inputType === "currency" || inputType === "number" || inputType === "percentage" 
      ? "number" 
      : type

    // Format display value for currency
    const formatValue = (val: string | number | readonly string[]): string | number => {
      // Handle array values by taking the first element or empty string
      let processedVal: string | number
      if (Array.isArray(val)) {
        processedVal = val.length > 0 ? val[0] : ""
      } else {
        processedVal = val as string | number
      }

      if (inputType === "currency" && processedVal) {
        const num = typeof processedVal === "string" ? parseFloat(processedVal) : processedVal
        return isNaN(num) ? processedVal : num.toFixed(2)
      }
      return processedVal
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setValue(newValue)
      props.onChange?.(e)
    }

    return (
      <div className="space-y-1">
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {prefix && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
              {prefix}
            </div>
          )}
          
          {inputType === "currency" && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
              {currency}
            </div>
          )}
          
          <Input
            ref={ref}
            type={actualType}
            className={cn(
              bettingInputVariants({ variant, inputType }),
              prefix && "pl-8",
              (suffix || inputType === "percentage") && "pr-8",
              inputType === "currency" && "pl-8",
              error && "border-red-500 focus:border-red-600",
              className
            )}
            value={formatValue(value)}
            onChange={handleChange}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${props.id}-error` : helper ? `${props.id}-helper` : undefined}
            {...props}
          />
          
          {suffix && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
              {suffix}
            </div>
          )}
          
          {inputType === "percentage" && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
              %
            </div>
          )}
        </div>
        
        {error && (
          <p id={`${props.id}-error`} className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        
        {helper && !error && (
          <p id={`${props.id}-helper`} className="text-sm text-muted-foreground">
            {helper}
          </p>
        )}
      </div>
    )
  }
)
BettingInput.displayName = "BettingInput"

export { BettingInput, bettingInputVariants }
