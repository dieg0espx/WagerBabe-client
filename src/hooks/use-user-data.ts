/**
 * User Data Management Hook
 * 
 * Manages user profile data, preferences, and wallet information.
 * Provides a centralized interface for user-related data operations.
 */

"use client"

import { useState, useEffect, useCallback } from "react"

export interface UserProfile {
  id: string
  email: string
  username: string
  firstName?: string
  lastName?: string
  avatar?: string
  verified: boolean
  createdAt: Date
  lastLogin?: Date
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  currency: string
  timezone: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  betting: {
    defaultStake: number
    autoAcceptOddsChanges: boolean
    showBalance: boolean
  }
}

export interface WalletData {
  balance: number
  currency: string
  pendingDeposits: number
  pendingWithdrawals: number
  lastTransaction?: {
    id: string
    type: 'deposit' | 'withdrawal' | 'bet' | 'win'
    amount: number
    timestamp: Date
  }
}

export function useUserData() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUserData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Mock API calls - replace with actual user data fetching
      const [profileResponse, preferencesResponse] = await Promise.all([
        fetch('/api/user/profile'),
        fetch('/api/user/preferences'),
      ])

      if (!profileResponse.ok || !preferencesResponse.ok) {
        throw new Error('Failed to fetch user data')
      }

      const profileData = await profileResponse.json()
      const preferencesData = await preferencesResponse.json()

      setProfile(profileData)
      setPreferences(preferencesData)
    } catch (err) {
      console.warn('User data fetch failed:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      
      // Set mock data for development
      setProfile({
        id: 'user-1',
        email: 'user@example.com',
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        verified: true,
        createdAt: new Date(),
        lastLogin: new Date(),
      })
      
      setPreferences({
        theme: 'system',
        currency: 'USD',
        timezone: 'UTC',
        notifications: {
          email: true,
          push: true,
          sms: false,
        },
        betting: {
          defaultStake: 10,
          autoAcceptOddsChanges: false,
          showBalance: true,
        },
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      const updatedProfile = await response.json()
      setProfile(updatedProfile)
      return updatedProfile
    } catch (err) {
      console.error('Profile update failed:', err)
      throw err
    }
  }, [])

  const updatePreferences = useCallback(async (updates: Partial<UserPreferences>) => {
    try {
      const response = await fetch('/api/user/preferences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        throw new Error('Failed to update preferences')
      }

      const updatedPreferences = await response.json()
      setPreferences(updatedPreferences)
      return updatedPreferences
    } catch (err) {
      console.error('Preferences update failed:', err)
      throw err
    }
  }, [])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  return {
    profile,
    preferences,
    isLoading,
    error,
    updateProfile,
    updatePreferences,
    refresh: fetchUserData,
  }
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWalletData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/user/wallet')
      
      if (!response.ok) {
        throw new Error('Failed to fetch wallet data')
      }

      const walletData = await response.json()
      setWallet(walletData)
    } catch (err) {
      console.warn('Wallet data fetch failed:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      
      // Set mock data for development
      setWallet({
        balance: 1250.50,
        currency: 'USD',
        pendingDeposits: 0,
        pendingWithdrawals: 0,
        lastTransaction: {
          id: 'tx-1',
          type: 'win',
          amount: 45.00,
          timestamp: new Date(),
        },
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWalletData()
  }, [fetchWalletData])

  return {
    wallet,
    isLoading,
    error,
    refresh: fetchWalletData,
  }
}

export default useUserData
