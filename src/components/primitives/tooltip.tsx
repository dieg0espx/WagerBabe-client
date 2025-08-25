"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tooltipContentVariants = cva(
  "z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "bg-background text-foreground border border-border",
        dark: "bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        default: "px-3 py-1.5 text-xs",
        lg: "px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function TooltipProvider({
  children,
  delayDuration = 400,
  skipDelayDuration = 300,
  disableHoverableContent = false,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      disableHoverableContent={disableHoverableContent}
      {...props}
    >
      {children}
    </TooltipPrimitive.Provider>
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root {...props} />
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger {...props} />
}

function TooltipContent({
  className,
  sideOffset = 4,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> &
  VariantProps<typeof tooltipContentVariants>) {
  return (
    <TooltipPrimitive.Content
      sideOffset={sideOffset}
      className={cn(tooltipContentVariants({ variant, size }), className)}
      {...props}
    />
  )
}

// Convenience component for simple tooltips
interface SimpleTooltipProps extends VariantProps<typeof tooltipContentVariants> {
  children: React.ReactNode
  content: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  delayDuration?: number
  disabled?: boolean
  className?: string
  contentClassName?: string
}

function SimpleTooltip({
  children,
  content,
  side = "top",
  align = "center",
  delayDuration = 400,
  disabled = false,
  className,
  contentClassName,
  variant,
  size,
}: SimpleTooltipProps) {
  if (disabled) {
    return <>{children}</>
  }

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild className={className}>
          {children}
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          variant={variant}
          size={size}
          className={contentClassName}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Icon tooltip - specialized for icon buttons
interface IconTooltipProps extends Omit<SimpleTooltipProps, 'children'> {
  children: React.ReactNode
  label: string
}

function IconTooltip({
  children,
  label,
  side = "bottom",
  ...props
}: IconTooltipProps) {
  // Remove content from props to avoid conflicts
  const { content: _content, ...restProps } = props as Record<string, unknown>

  return (
    <SimpleTooltip
      content={label}
      side={side}
      {...restProps}
    >
      <div className="inline-flex items-center justify-center">
        {children}
      </div>
    </SimpleTooltip>
  )
}

// Help tooltip - specialized for help text
interface HelpTooltipProps extends Omit<SimpleTooltipProps, 'children' | 'content'> {
  helpText: string
  maxWidth?: string
}

function HelpTooltip({
  helpText,
  maxWidth = "200px",
  variant = "dark",
  size = "sm",
  ...props
}: HelpTooltipProps) {
  return (
    <SimpleTooltip
      content={
        <div style={{ maxWidth }} className="text-left">
          {helpText}
        </div>
      }
      variant={variant}
      size={size}
      {...props}
    >
      <button
        type="button"
        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
        aria-label="Help"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      </button>
    </SimpleTooltip>
  )
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  SimpleTooltip,
  IconTooltip,
  HelpTooltip,
  tooltipContentVariants,
  type SimpleTooltipProps,
  type IconTooltipProps,
  type HelpTooltipProps,
}
