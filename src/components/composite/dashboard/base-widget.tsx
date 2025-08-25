"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives/card"
import { Button } from "@/components/primitives/button"
import { Badge } from "@/components/primitives/badge"
import { Loading } from "@/components/primitives/loading"
import { Alert, AlertDescription } from "@/components/primitives/alert"
import { LucideIcon, RefreshCw, Settings, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Flex } from "@/components/primitives/layout"

export interface BaseWidgetProps {
  title: string
  description?: string
  icon?: LucideIcon
  isLoading?: boolean
  error?: string | null
  onRefresh?: () => void
  onSettings?: () => void
  compact?: boolean
  className?: string
  headerClassName?: string
  contentClassName?: string
  children?: React.ReactNode
  badge?: {
    text: string
    variant?: "default" | "secondary" | "destructive" | "outline"
  }
  delay?: number
}

export function BaseWidget({
  title,
  description,
  icon: Icon,
  isLoading = false,
  error = null,
  onRefresh,
  onSettings,
  compact = false,
  className,
  headerClassName,
  contentClassName,
  children,
  badge,
  delay = 0,
}: BaseWidgetProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  if (!mounted) {
    return <WidgetSkeleton compact={compact} />
  }

  if (error) {
    return (
      <Card className={cn("h-full", className)}>
        <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
          <WidgetError error={error} onRetry={onRefresh} />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader className={cn(
        compact ? "pb-3" : "pb-4",
        headerClassName
      )}>
        <Flex align="center" justify="between">
          <Flex align="center" gap={2}>
            {Icon && (
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="h-4 w-4 text-primary" />
              </div>
            )}
            <div>
              <CardTitle className={cn(
                "flex items-center gap-2",
                compact ? "text-base" : "text-lg"
              )}>
                {title}
                {badge && (
                  <Badge variant={badge.variant || "default"} className="text-xs">
                    {badge.text}
                  </Badge>
                )}
              </CardTitle>
              {description && !compact && (
                <p className="text-sm text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
          </Flex>
          
          <Flex gap={1}>
            {onRefresh && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onRefresh}
                disabled={isLoading}
                className="h-8 w-8"
              >
                <RefreshCw className={cn(
                  "h-4 w-4",
                  isLoading && "animate-spin"
                )} />
              </Button>
            )}
            {onSettings && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onSettings}
                className="h-8 w-8"
              >
                <Settings className="h-4 w-4" />
              </Button>
            )}
          </Flex>
        </Flex>
      </CardHeader>
      
      <CardContent className={cn(
        "flex-1 flex flex-col",
        compact ? "p-4 pt-0" : "p-6 pt-0",
        contentClassName
      )}>
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center min-h-[120px]">
            <Loading text="Loading..." showText />
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  )
}

// Widget Skeleton Component
export function WidgetSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <Card className="h-full">
      <CardHeader className={compact ? "pb-3" : "pb-4"}>
        <Flex align="center" justify="between">
          <Flex align="center" gap={2}>
            <div className="w-8 h-8 bg-muted rounded-lg animate-pulse" />
            <div>
              <div className={cn(
                "bg-muted rounded animate-pulse",
                compact ? "h-4 w-24" : "h-5 w-32"
              )} />
              {!compact && (
                <div className="h-3 w-48 bg-muted rounded animate-pulse mt-2" />
              )}
            </div>
          </Flex>
          <div className="flex gap-1">
            <div className="w-8 h-8 bg-muted rounded animate-pulse" />
            <div className="w-8 h-8 bg-muted rounded animate-pulse" />
          </div>
        </Flex>
      </CardHeader>
      <CardContent className={compact ? "p-4 pt-0" : "p-6 pt-0"}>
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
          <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
        </div>
      </CardContent>
    </Card>
  )
}

// Widget Error Component
export function WidgetError({ 
  error, 
  onRetry 
}: { 
  error: string
  onRetry?: () => void 
}) {
  return (
    <Alert variant="destructive" className="border-destructive/20">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex flex-col gap-3">
        <span>{error}</span>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="self-start"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}
