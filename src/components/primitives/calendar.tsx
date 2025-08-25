"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

const calendarVariants = cva(
  "p-3",
  {
    variants: {
      variant: {
        default: "",
        betting: "border border-blue-200 rounded-lg bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50",
        compact: "p-2",
      },
      size: {
        sm: "text-xs",
        default: "text-sm", 
        lg: "text-base",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type CalendarProps = React.ComponentProps<typeof DayPicker> &
  VariantProps<typeof calendarVariants> & {
    variant?: "default" | "betting" | "compact"
    size?: "sm" | "default" | "lg"
  }

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  variant,
  size,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(calendarVariants({ variant, size }), className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: cn(
          "font-medium",
          size === "sm" && "text-xs",
          size === "default" && "text-sm", 
          size === "lg" && "text-base"
        ),
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          variant === "betting" && "border-blue-300 hover:border-blue-400"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: cn(
          "text-muted-foreground rounded-md w-9 font-normal",
          size === "sm" && "text-[0.7rem] w-8",
          size === "default" && "text-[0.8rem] w-9",
          size === "lg" && "text-sm w-10"
        ),
        row: "flex w-full mt-2",
        cell: cn(
          "text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          size === "sm" && "h-8 w-8 text-xs",
          size === "default" && "h-9 w-9 text-sm",
          size === "lg" && "h-10 w-10 text-base"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "p-0 font-normal aria-selected:opacity-100",
          size === "sm" && "h-8 w-8",
          size === "default" && "h-9 w-9",
          size === "lg" && "h-10 w-10"
        ),
        day_range_end: "day-range-end",
        day_selected: cn(
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          variant === "betting" && "bg-blue-600 text-white hover:bg-blue-700"
        ),
        day_today: cn(
          "bg-accent text-accent-foreground",
          variant === "betting" && "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
        ),
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: (props) => {
          if (props.orientation === "left") {
            return <ChevronLeft className="h-4 w-4" />
          }
          return <ChevronRight className="h-4 w-4" />
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar, calendarVariants }
