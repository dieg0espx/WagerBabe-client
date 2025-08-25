/**
 * Retro Grid Component
 *
 * Animated retro-style grid background component that provides
 * a futuristic, cyberpunk-inspired visual effect. Perfect for
 * login pages, hero sections, and decorative backgrounds.
 *
 * This is a primitive component that provides low-level animated
 * background functionality.
 */

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface RetroGridProps {
  className?: string
  angle?: number
  speed?: number
  opacity?: number
  gridSize?: number
  color?: string
}

export function RetroGrid({
  className,
  angle = 65,
  speed = 15,
  opacity = 0.5,
  gridSize = 50,
  color = "rgba(59, 130, 246, 0.5)" // blue-500 with opacity
}: RetroGridProps) {
  const gridRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    // Set CSS custom properties for animation
    grid.style.setProperty('--grid-angle', `${angle}deg`)
    grid.style.setProperty('--grid-speed', `${speed}s`)
    grid.style.setProperty('--grid-opacity', opacity.toString())
    grid.style.setProperty('--grid-size', `${gridSize}px`)
    grid.style.setProperty('--grid-color', color)
  }, [angle, speed, opacity, gridSize, color])

  return (
    <div
      ref={gridRef}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        "[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
        className
      )}
      style={{
        background: `
          linear-gradient(
            var(--grid-angle),
            transparent 24%,
            var(--grid-color) 25%,
            var(--grid-color) 26%,
            transparent 27%,
            transparent 74%,
            var(--grid-color) 75%,
            var(--grid-color) 76%,
            transparent 77%
          ),
          linear-gradient(
            calc(var(--grid-angle) + 90deg),
            transparent 24%,
            var(--grid-color) 25%,
            var(--grid-color) 26%,
            transparent 27%,
            transparent 74%,
            var(--grid-color) 75%,
            var(--grid-color) 76%,
            transparent 77%
          )
        `,
        backgroundSize: `var(--grid-size) var(--grid-size)`,
        opacity: 'var(--grid-opacity)',
        animation: `retro-grid var(--grid-speed) linear infinite`
      }}
    >
      {/* Gradient overlay for better visual effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              transparent 0%,
              transparent 40%,
              rgba(0, 0, 0, 0.1) 70%,
              rgba(0, 0, 0, 0.3) 100%
            )
          `
        }}
      />
      
      {/* Additional animated elements for enhanced effect */}
      <div className="absolute inset-0 animate-pulse">
        <div 
          className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full"
          style={{ 
            backgroundColor: color,
            boxShadow: `0 0 20px ${color}`,
            animation: 'retro-glow 3s ease-in-out infinite alternate'
          }}
        />
        <div 
          className="absolute top-3/4 right-1/3 w-1 h-1 rounded-full"
          style={{ 
            backgroundColor: color,
            boxShadow: `0 0 15px ${color}`,
            animation: 'retro-glow 2s ease-in-out infinite alternate-reverse'
          }}
        />
        <div 
          className="absolute bottom-1/4 left-2/3 w-1.5 h-1.5 rounded-full"
          style={{ 
            backgroundColor: color,
            boxShadow: `0 0 18px ${color}`,
            animation: 'retro-glow 2.5s ease-in-out infinite alternate'
          }}
        />
      </div>

      <style jsx>{`
        @keyframes retro-grid {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(var(--grid-size));
          }
        }

        @keyframes retro-glow {
          0% {
            opacity: 0.3;
            transform: scale(1);
          }
          100% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  )
}

// Preset variants for common use cases
export const RetroGridVariants = {
  default: {
    angle: 65,
    speed: 15,
    opacity: 0.5,
    gridSize: 50,
    color: "rgba(59, 130, 246, 0.5)"
  },
  subtle: {
    angle: 65,
    speed: 20,
    opacity: 0.3,
    gridSize: 40,
    color: "rgba(59, 130, 246, 0.3)"
  },
  intense: {
    angle: 65,
    speed: 10,
    opacity: 0.7,
    gridSize: 60,
    color: "rgba(59, 130, 246, 0.7)"
  },
  purple: {
    angle: 65,
    speed: 15,
    opacity: 0.5,
    gridSize: 50,
    color: "rgba(147, 51, 234, 0.5)"
  },
  green: {
    angle: 65,
    speed: 15,
    opacity: 0.5,
    gridSize: 50,
    color: "rgba(34, 197, 94, 0.5)"
  },
  red: {
    angle: 65,
    speed: 15,
    opacity: 0.5,
    gridSize: 50,
    color: "rgba(239, 68, 68, 0.5)"
  }
}

// Convenience component with preset variants
export function RetroGridPreset({ 
  variant = "default", 
  className,
  ...props 
}: Omit<RetroGridProps, keyof typeof RetroGridVariants.default> & {
  variant?: keyof typeof RetroGridVariants
  className?: string
}) {
  const presetProps = RetroGridVariants[variant]
  
  return (
    <RetroGrid
      className={className}
      {...presetProps}
      {...props}
    />
  )
}
