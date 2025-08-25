"use client"

/**
 * Main application context that combines all other contexts.
 */

import React from 'react'
import { AuthProvider } from './auth-context'
import { BettingProvider } from './betting-context'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/primitives'

interface AppProviderProps {
  children: React.ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider
      defaultTheme="system"
      defaultBettingContext="sportsbook"
      storageKey="wagerbabe-ui-theme"
      bettingContextKey="wagerbabe-betting-context"
    >
      <AuthProvider>
        <BettingProvider>
          {children}
          <Toaster />
        </BettingProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
