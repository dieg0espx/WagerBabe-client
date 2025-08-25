import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sidebarVariants = cva(
  "flex flex-col border-r bg-background",
  {
    variants: {
      variant: {
        default: "border-border",
        sportsbook: "border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-950/10",
        casino: "border-purple-200 dark:border-purple-800 bg-purple-50/30 dark:bg-purple-950/10",
        poker: "border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/10",
      },
      size: {
        sm: "w-48",
        default: "w-64",
        lg: "w-80",
      },
      collapsible: {
        true: "transition-all duration-300 ease-in-out",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      collapsible: false,
    },
  }
)

const sidebarItemVariants = cva(
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "",
        active: "bg-accent text-accent-foreground font-medium",
        destructive: "text-destructive hover:bg-destructive/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  collapsed?: boolean
}

function Sidebar({ 
  className, 
  variant, 
  size, 
  collapsible, 
  collapsed = false,
  ...props 
}: SidebarProps) {
  return (
    <div
      data-slot="sidebar"
      className={cn(
        sidebarVariants({ variant, size, collapsible }),
        collapsed && collapsible && "w-16",
        className
      )}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn("flex items-center gap-2 border-b px-3 py-4", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn("flex-1 overflow-auto py-4", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn("border-t px-3 py-4", className)}
      {...props}
    />
  )
}

export interface SidebarItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarItemVariants> {
  icon?: React.ReactNode
  href?: string
  active?: boolean
}

function SidebarItem({
  className,
  variant,
  icon,
  href,
  active = false,
  children,
  ...props
}: SidebarItemProps) {
  const itemVariant = active ? "active" : variant

  if (href) {
    return (
      <a
        data-slot="sidebar-item"
        href={href}
        className={cn(sidebarItemVariants({ variant: itemVariant }), className)}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className="truncate">{children}</span>
      </a>
    )
  }

  return (
    <div
      data-slot="sidebar-item"
      className={cn(sidebarItemVariants({ variant: itemVariant }), className)}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
    </div>
  )
}

function SidebarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn("px-3 py-2", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="sidebar-group-label"
      className={cn("px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider", className)}
      {...props}
    />
  )
}

function SidebarGroupContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="sidebar-group-content"
      className={cn("space-y-1", className)}
      {...props}
    />
  )
}

export { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter, 
  SidebarItem, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent,
  sidebarVariants, 
  sidebarItemVariants 
}
