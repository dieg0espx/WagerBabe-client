import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Heading component
const headingVariants = cva(
  "font-semibold tracking-tight text-foreground",
  {
    variants: {
      level: {
        1: "text-4xl lg:text-5xl",
        2: "text-3xl lg:text-4xl",
        3: "text-2xl lg:text-3xl",
        4: "text-xl lg:text-2xl",
        5: "text-lg lg:text-xl",
        6: "text-base lg:text-lg",
      },
      variant: {
        default: "",
        muted: "text-muted-foreground",
        destructive: "text-destructive",
        success: "text-green-600 dark:text-green-400",
        warning: "text-yellow-600 dark:text-yellow-400",
        primary: "text-primary",
      },
    },
    defaultVariants: {
      level: 1,
      variant: "default",
    },
  }
)

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

function Heading({ 
  className, 
  level = 1, 
  variant, 
  as,
  ...props 
}: HeadingProps) {
  const Comp = as || (`h${level}` as React.ElementType)
  
  return React.createElement(
    Comp,
    {
      "data-slot": "heading",
      className: cn(headingVariants({ level, variant }), className),
      ...props,
    }
  )
}

// Text/Paragraph component
const textVariants = cva(
  "text-foreground",
  {
    variants: {
      variant: {
        default: "",
        muted: "text-muted-foreground",
        destructive: "text-destructive",
        success: "text-green-600 dark:text-green-400",
        warning: "text-yellow-600 dark:text-yellow-400",
        primary: "text-primary",
        secondary: "text-secondary-foreground",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      weight: "normal",
    },
  }
)

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div" | "label"
}

function Text({ 
  className, 
  variant, 
  size, 
  weight, 
  as = "p",
  ...props 
}: TextProps) {
  return React.createElement(
    as,
    {
      "data-slot": "text",
      className: cn(textVariants({ variant, size, weight }), className),
      ...props,
    }
  )
}

// Label component (enhanced version)
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        destructive: "text-destructive",
        success: "text-green-600 dark:text-green-400",
        warning: "text-yellow-600 dark:text-yellow-400",
      },
      required: {
        true: "after:content-['*'] after:ml-0.5 after:text-destructive",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      required: false,
    },
  }
)

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

function Label({ 
  className, 
  variant, 
  required, 
  ...props 
}: LabelProps) {
  return (
    <label
      data-slot="label"
      className={cn(labelVariants({ variant, required }), className)}
      {...props}
    />
  )
}

// Code component
function Code({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      data-slot="code"
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className
      )}
      {...props}
    />
  )
}

// Blockquote component
function Blockquote({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      data-slot="blockquote"
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  )
}

export { 
  Heading, 
  Text, 
  Label, 
  Code, 
  Blockquote,
  headingVariants, 
  textVariants, 
  labelVariants 
}
