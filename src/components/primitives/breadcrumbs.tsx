import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const breadcrumbsVariants = cva(
  "flex items-center space-x-1 text-sm text-muted-foreground"
)

const breadcrumbItemVariants = cva(
  "flex items-center",
  {
    variants: {
      variant: {
        default: "",
        active: "text-foreground font-medium",
        link: "hover:text-foreground transition-colors cursor-pointer",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BreadcrumbsProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbsVariants> {
  separator?: React.ReactNode
}

function Breadcrumbs({ 
  className, 
  separator = "/", 
  children, 
  ...props 
}: BreadcrumbsProps) {
  const items = React.Children.toArray(children)
  
  return (
    <nav
      data-slot="breadcrumbs"
      aria-label="Breadcrumb"
      className={cn(breadcrumbsVariants(), className)}
      {...props}
    >
      <ol className="flex items-center space-x-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item}
            {index < items.length - 1 && (
              <span 
                className="mx-2 text-muted-foreground/60" 
                aria-hidden="true"
              >
                {separator}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export interface BreadcrumbItemProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof breadcrumbItemVariants> {
  href?: string
  active?: boolean
  isLast?: boolean
}

function BreadcrumbItem({
  className,
  variant,
  href,
  active = false,
  isLast = false,
  children,
  ...restProps
}: BreadcrumbItemProps) {
  const itemVariant = active || isLast ? "active" : href ? "link" : variant

  // Filter out isLast from props to prevent it from being passed to DOM
  const { isLast: _, ...domProps } = restProps as Record<string, unknown>

  if (href && !active && !isLast) {
    return (
      <a
        href={href}
        data-slot="breadcrumb-item"
        className={cn(breadcrumbItemVariants({ variant: itemVariant }), className)}
        {...domProps}
      >
        {children}
      </a>
    )
  }

  return (
    <span
      data-slot="breadcrumb-item"
      className={cn(breadcrumbItemVariants({ variant: itemVariant }), className)}
      aria-current={active || isLast ? "page" : undefined}
      {...domProps}
    >
      {children}
    </span>
  )
}

// Breadcrumb separator component for custom separators
function BreadcrumbSeparator({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="breadcrumb-separator"
      className={cn("mx-2 text-muted-foreground/60", className)}
      aria-hidden="true"
      {...props}
    />
  )
}

export { 
  Breadcrumbs, 
  BreadcrumbItem, 
  BreadcrumbSeparator,
  breadcrumbsVariants, 
  breadcrumbItemVariants 
}
