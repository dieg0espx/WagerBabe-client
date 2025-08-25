"use client"

import * as React from "react"

/**
 * ThemeTransition - Modern theme switching with View Transitions API
 *
 * Uses the browser's native View Transitions API to create smooth ripple effects
 * when switching themes. Falls back gracefully for browsers that don't support it.
 */

// Global styles to disable default view transition animations
const TRANSITION_STYLES = `
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
  }
`

/**
 * Hook to manage theme transitions with ripple effect using View Transitions API
 */
export function useThemeTransition() {
  const [isTransitioning, setIsTransitioning] = React.useState(false)

  React.useEffect(() => {
    // Inject global styles for view transitions
    const styleElement = document.createElement('style')
    styleElement.textContent = TRANSITION_STYLES
    document.head.appendChild(styleElement)

    return () => {
      // Clean up styles on unmount
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement)
      }
    }
  }, [])

  const startTransition = React.useCallback((
    event: React.MouseEvent,
    themeChangeCallback: () => void
  ) => {
    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
      // Fallback for unsupported browsers
      themeChangeCallback()
      return
    }

    setIsTransitioning(true)

    // Get click coordinates
    const x = event.clientX
    const y = event.clientY

    // Calculate the radius needed to cover the entire viewport
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    // Start the view transition
    const transition = document.startViewTransition(() => {
      themeChangeCallback()
    })

    // When the transition is ready, start the ripple animation
    transition.ready.then(() => {
      requestAnimationFrame(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)',
          }
        )
      })
    })

    // Clean up when transition finishes
    transition.finished.finally(() => {
      setIsTransitioning(false)
    })
  }, [])

  return {
    isTransitioning,
    startTransition
  }
}
