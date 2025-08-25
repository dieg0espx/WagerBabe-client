import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Label } from "./typography"

const formFieldVariants = cva(
  "space-y-2",
  {
    variants: {
      variant: {
        default: "",
        inline: "flex items-center space-y-0 space-x-3",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const formErrorVariants = cva(
  "text-sm font-medium",
  {
    variants: {
      variant: {
        destructive: "text-destructive",
        warning: "text-yellow-600 dark:text-yellow-400",
      },
    },
    defaultVariants: {
      variant: "destructive",
    },
  }
)

const formHelperVariants = cva(
  "text-sm text-muted-foreground"
)

export interface FormFieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formFieldVariants> {
  label?: string
  error?: string
  helper?: string
  required?: boolean
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
}

function FormField({ 
  className, 
  variant, 
  label, 
  error, 
  helper, 
  required = false,
  labelProps,
  children,
  ...props 
}: FormFieldProps) {
  const fieldId = React.useId()
  const errorId = error ? `${fieldId}-error` : undefined
  const helperId = helper ? `${fieldId}-helper` : undefined

  // Clone children to add proper IDs and aria attributes
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const childProps = child.props as any
      return React.cloneElement(child, {
        id: fieldId,
        "aria-describedby": cn(
          childProps["aria-describedby"],
          errorId,
          helperId
        ).trim() || undefined,
        "aria-invalid": error ? true : childProps["aria-invalid"],
        ...childProps,
      })
    }
    return child
  })

  return (
    <div
      data-slot="form-field"
      className={cn(formFieldVariants({ variant }), className)}
      {...props}
    >
      {label && (
        <Label
          htmlFor={fieldId}
          required={required}
          variant={error ? "destructive" : "default"}
          {...labelProps}
        >
          {label}
        </Label>
      )}
      {enhancedChildren}
      {helper && !error && (
        <p
          id={helperId}
          data-slot="form-helper"
          className={cn(formHelperVariants())}
        >
          {helper}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          data-slot="form-error"
          className={cn(formErrorVariants({ variant: "destructive" }))}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}

// Form Group component for grouping related fields
export interface FormGroupProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  legend?: string
  description?: string
}

function FormGroup({ 
  className, 
  legend, 
  description, 
  children, 
  ...props 
}: FormGroupProps) {
  return (
    <fieldset
      data-slot="form-group"
      className={cn("space-y-4", className)}
      {...props}
    >
      {legend && (
        <legend className="text-lg font-semibold leading-none tracking-tight">
          {legend}
        </legend>
      )}
      {description && (
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {children}
    </fieldset>
  )
}

// Form Section component for larger form organization
export interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
}

function FormSection({ 
  className, 
  title, 
  description, 
  children, 
  ...props 
}: FormSectionProps) {
  return (
    <div
      data-slot="form-section"
      className={cn("space-y-6", className)}
      {...props}
    >
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h3 className="text-lg font-semibold leading-none tracking-tight">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

export { 
  FormField, 
  FormGroup, 
  FormSection,
  formFieldVariants, 
  formErrorVariants, 
  formHelperVariants 
}
