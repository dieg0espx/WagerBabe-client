import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const navbarVariants = cva(
  "flex items-center justify-between w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
  {
    variants: {
      variant: {
        default: "border-border",
        sportsbook: "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20",
        casino: "border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20",
        poker: "border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20",
      },
      size: {
        sm: "h-12 px-4",
        default: "h-16 px-6",
        lg: "h-20 px-8",
      },
      sticky: {
        true: "sticky top-0 z-50",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      sticky: true,
    },
  }
)

export interface NavbarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navbarVariants> {}

function Navbar({ className, variant, size, sticky, ...props }: NavbarProps) {
  return (
    <nav
      data-slot="navbar"
      className={cn(navbarVariants({ variant, size, sticky }), className)}
      {...props}
    />
  )
}

function NavbarBrand({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="navbar-brand"
      className={cn("flex items-center space-x-2 font-bold text-lg", className)}
      {...props}
    />
  )
}

function NavbarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="navbar-content"
      className={cn("flex items-center space-x-4", className)}
      {...props}
    />
  )
}

function NavbarActions({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="navbar-actions"
      className={cn("flex items-center space-x-2", className)}
      {...props}
    />
  )
}

export { Navbar, NavbarBrand, NavbarContent, NavbarActions, navbarVariants }
