/**
 * Sports Data Preloading Hook
 * 
 * Automatically preloads sports data for better user experience.
 * Manages caching and background updates of sports betting data.
 */

"use client"

import { useEffect, useCallback, useState } from "react"

export interface SportsPreloadConfig {
  enabled?: boolean
  preloadInterval?: number
  maxCacheAge?: number
}

export interface SportsData {
  games: Record<string, unknown>[]
  leagues: Record<string, unknown>[]
  lastUpdated: Date
}

export function useAutoPreloadSports(config: SportsPreloadConfig = {}) {
  const {
    enabled = true,
    preloadInterval = 30000, // 30 seconds
    maxCacheAge = 300000, // 5 minutes
  } = config

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<SportsData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const preloadSportsData = useCallback(async () => {
    if (!enabled) return

    try {
      setIsLoading(true)
      setError(null)

      // Mock API call - replace with actual sports data fetching
      const response = await fetch('/api/sports/preload', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to preload sports data: ${response.statusText}`)
      }

      const sportsData = await response.json()
      
      setData({
        games: sportsData.games || [],
        leagues: sportsData.leagues || [],
        lastUpdated: new Date(),
      })
    } catch (err) {
      console.warn('Sports preload failed:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      
      // Set mock data for development
      setData({
        games: [],
        leagues: [],
        lastUpdated: new Date(),
      })
    } finally {
      setIsLoading(false)
    }
  }, [enabled])

  // Initial preload
  useEffect(() => {
    if (enabled) {
      preloadSportsData()
    }
  }, [enabled, preloadSportsData])

  // Periodic updates
  useEffect(() => {
    if (!enabled) return

    const interval = setInterval(() => {
      const now = Date.now()
      const lastUpdate = data?.lastUpdated?.getTime() || 0
      
      if (now - lastUpdate > maxCacheAge) {
        preloadSportsData()
      }
    }, preloadInterval)

    return () => clearInterval(interval)
  }, [enabled, preloadInterval, maxCacheAge, data?.lastUpdated, preloadSportsData])

  const refresh = useCallback(() => {
    preloadSportsData()
  }, [preloadSportsData])

  return {
    data,
    isLoading,
    error,
    refresh,
    lastUpdated: data?.lastUpdated,
  }
}

export default useAutoPreloadSports
