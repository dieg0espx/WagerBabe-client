"use client"

import { useState, useRef, useEffect, ReactNode } from "react"
import { RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface SportsPullToRefreshProps {
  onRefresh: () => Promise<void> | void
  children: ReactNode
  className?: string
  threshold?: number
  disabled?: boolean
}

export function SportsPullToRefresh({
  onRefresh,
  children,
  className,
  threshold = 80,
  disabled = false
}: SportsPullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const startY = useRef(0)
  const currentY = useRef(0)

  const handleTouchStart = (e: TouchEvent) => {
    if (disabled || isRefreshing) return
    
    const container = containerRef.current
    if (!container || container.scrollTop > 0) return

    startY.current = e.touches[0].clientY
    setIsPulling(true)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isPulling || disabled || isRefreshing) return

    currentY.current = e.touches[0].clientY
    const distance = Math.max(0, currentY.current - startY.current)
    
    if (distance > 0) {
      e.preventDefault()
      setPullDistance(Math.min(distance, threshold * 1.5))
    }
  }

  const handleTouchEnd = async () => {
    if (!isPulling || disabled || isRefreshing) return

    setIsPulling(false)

    if (pullDistance >= threshold) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } catch (error) {
        console.error('Refresh failed:', error)
      } finally {
        setIsRefreshing(false)
      }
    }

    setPullDistance(0)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('touchstart', handleTouchStart, { passive: false })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd)

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isPulling, pullDistance, threshold, disabled, isRefreshing])

  const refreshProgress = Math.min(pullDistance / threshold, 1)
  const shouldTrigger = pullDistance >= threshold

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-auto touch-pan-y",
        className
      )}
      style={{
        transform: isPulling ? `translateY(${Math.min(pullDistance * 0.5, 40)}px)` : undefined,
        transition: isPulling ? 'none' : 'transform 0.3s ease-out'
      }}
    >
      {/* Pull to refresh indicator */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 flex items-center justify-center",
          "bg-background/90 backdrop-blur-sm border-b border-border/50",
          "transition-all duration-300 ease-out z-10",
          (isPulling || isRefreshing) ? "opacity-100" : "opacity-0"
        )}
        style={{
          height: isPulling || isRefreshing ? '60px' : '0px',
          transform: `translateY(${isPulling || isRefreshing ? '0' : '-60px'})`
        }}
      >
        <div className="flex items-center gap-3 text-muted-foreground">
          <RefreshCw 
            className={cn(
              "h-5 w-5 transition-transform duration-200",
              isRefreshing && "animate-spin",
              shouldTrigger && !isRefreshing && "text-primary"
            )}
            style={{
              transform: `rotate(${refreshProgress * 180}deg)`
            }}
          />
          <span className={cn(
            "text-sm font-medium transition-colors duration-200",
            shouldTrigger && !isRefreshing && "text-primary"
          )}>
            {isRefreshing 
              ? "Refreshing..." 
              : shouldTrigger 
                ? "Release to refresh" 
                : "Pull to refresh"
            }
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        className={cn(
          "transition-all duration-300 ease-out",
          (isPulling || isRefreshing) && "pt-4"
        )}
      >
        {children}
      </div>
    </div>
  )
}
