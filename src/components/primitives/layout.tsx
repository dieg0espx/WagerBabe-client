"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Container Component
const containerVariants = cva(
  "w-full mx-auto px-4 sm:px-6 lg:px-8",
  {
    variants: {
      size: {
        sm: "max-w-screen-sm",
        md: "max-w-screen-md",
        lg: "max-w-screen-lg",
        xl: "max-w-screen-xl",
        "2xl": "max-w-screen-2xl",
        full: "max-w-full",
        none: "max-w-none",
      },
      padding: {
        none: "px-0",
        sm: "px-2 sm:px-4",
        default: "px-4 sm:px-6 lg:px-8",
        lg: "px-6 sm:px-8 lg:px-12",
        xl: "px-8 sm:px-12 lg:px-16",
      },
    },
    defaultVariants: {
      size: "xl",
      padding: "default",
    },
  }
)

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType
}

function Container({
  className,
  size,
  padding,
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(containerVariants({ size, padding }), className)}
      {...props}
    />
  )
}

// Grid Component
const gridVariants = cva(
  "grid",
  {
    variants: {
      cols: {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
        12: "grid-cols-12",
        none: "grid-cols-none",
        subgrid: "grid-cols-subgrid",
      },
      rows: {
        1: "grid-rows-1",
        2: "grid-rows-2",
        3: "grid-rows-3",
        4: "grid-rows-4",
        5: "grid-rows-5",
        6: "grid-rows-6",
        none: "grid-rows-none",
        subgrid: "grid-rows-subgrid",
      },
      gap: {
        0: "gap-0",
        1: "gap-1",
        2: "gap-2",
        3: "gap-3",
        4: "gap-4",
        5: "gap-5",
        6: "gap-6",
        8: "gap-8",
        10: "gap-10",
        12: "gap-12",
        16: "gap-16",
      },
      responsive: {
        true: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        false: "",
      },
    },
    defaultVariants: {
      cols: 1,
      gap: 4,
      responsive: false,
    },
  }
)

interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  as?: React.ElementType
}

function Grid({
  className,
  cols,
  rows,
  gap,
  responsive,
  as: Component = "div",
  ...props
}: GridProps) {
  return (
    <Component
      className={cn(gridVariants({ cols, rows, gap, responsive }), className)}
      {...props}
    />
  )
}

// Flex Component
const flexVariants = cva(
  "flex",
  {
    variants: {
      direction: {
        row: "flex-row",
        "row-reverse": "flex-row-reverse",
        col: "flex-col",
        "col-reverse": "flex-col-reverse",
      },
      wrap: {
        nowrap: "flex-nowrap",
        wrap: "flex-wrap",
        "wrap-reverse": "flex-wrap-reverse",
      },
      justify: {
        start: "justify-start",
        end: "justify-end",
        center: "justify-center",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
      },
      align: {
        start: "items-start",
        end: "items-end",
        center: "items-center",
        baseline: "items-baseline",
        stretch: "items-stretch",
      },
      gap: {
        0: "gap-0",
        1: "gap-1",
        2: "gap-2",
        3: "gap-3",
        4: "gap-4",
        5: "gap-5",
        6: "gap-6",
        8: "gap-8",
        10: "gap-10",
        12: "gap-12",
        16: "gap-16",
      },
    },
    defaultVariants: {
      direction: "row",
      wrap: "nowrap",
      justify: "start",
      align: "start",
      gap: 0,
    },
  }
)

interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {
  as?: React.ElementType
}

function Flex({
  className,
  direction,
  wrap,
  justify,
  align,
  gap,
  as: Component = "div",
  ...props
}: FlexProps) {
  return (
    <Component
      className={cn(flexVariants({ direction, wrap, justify, align, gap }), className)}
      {...props}
    />
  )
}

// Stack Component (Vertical spacing utility)
const stackVariants = cva(
  "flex",
  {
    variants: {
      direction: {
        vertical: "flex-col",
        horizontal: "flex-row",
      },
      spacing: {
        0: "gap-0",
        1: "gap-1",
        2: "gap-2",
        3: "gap-3",
        4: "gap-4",
        5: "gap-5",
        6: "gap-6",
        8: "gap-8",
        10: "gap-10",
        12: "gap-12",
        16: "gap-16",
        20: "gap-20",
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
      },
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
      },
    },
    defaultVariants: {
      direction: "vertical",
      spacing: 4,
      align: "stretch",
      justify: "start",
    },
  }
)

interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  as?: React.ElementType
}

function Stack({
  className,
  direction,
  spacing,
  align,
  justify,
  as: Component = "div",
  ...props
}: StackProps) {
  return (
    <Component
      className={cn(stackVariants({ direction, spacing, align, justify }), className)}
      {...props}
    />
  )
}

// Center Component (Centering utility)
interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  inline?: boolean
}

function Center({
  className,
  as: Component = "div",
  inline = false,
  ...props
}: CenterProps) {
  return (
    <Component
      className={cn(
        inline ? "inline-flex" : "flex",
        "items-center justify-center",
        className
      )}
      {...props}
    />
  )
}

// Spacer Component (Flexible space)
interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number | string
  axis?: "horizontal" | "vertical" | "both"
}

function Spacer({ className, size, axis = "both", ...props }: SpacerProps) {
  const sizeStyle = typeof size === "number" ? `${size}px` : size

  return (
    <div
      className={cn(
        axis === "horizontal" && "flex-shrink-0",
        axis === "vertical" && "flex-shrink-0",
        axis === "both" && "flex-1",
        className
      )}
      style={{
        ...(axis === "horizontal" && { width: sizeStyle }),
        ...(axis === "vertical" && { height: sizeStyle }),
        ...(axis === "both" && !size && { flex: 1 }),
      }}
      {...props}
    />
  )
}

// Divider Component
const dividerVariants = cva(
  "border-border",
  {
    variants: {
      orientation: {
        horizontal: "w-full border-t",
        vertical: "h-full border-l",
      },
      variant: {
        solid: "border-solid",
        dashed: "border-dashed",
        dotted: "border-dotted",
      },
      size: {
        sm: "border-t-[1px]",
        default: "border-t-[1px]",
        lg: "border-t-2",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      variant: "solid",
      size: "default",
    },
  }
)

interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  label?: string
}

function Divider({
  className,
  orientation,
  variant,
  size,
  label,
  ...props
}: DividerProps) {
  if (label && orientation === "horizontal") {
    return (
      <div className={cn("relative flex items-center", className)} {...props}>
        <div className={cn(dividerVariants({ orientation, variant, size }), "flex-1")} />
        <span className="px-3 text-sm text-muted-foreground bg-background">
          {label}
        </span>
        <div className={cn(dividerVariants({ orientation, variant, size }), "flex-1")} />
      </div>
    )
  }

  return (
    <div
      className={cn(dividerVariants({ orientation, variant, size }), className)}
      {...props}
    />
  )
}

export {
  Container,
  Grid,
  Flex,
  Stack,
  Center,
  Spacer,
  Divider,
  containerVariants,
  gridVariants,
  flexVariants,
  stackVariants,
  dividerVariants,
  type ContainerProps,
  type GridProps,
  type FlexProps,
  type StackProps,
  type CenterProps,
  type SpacerProps,
  type DividerProps,
}
