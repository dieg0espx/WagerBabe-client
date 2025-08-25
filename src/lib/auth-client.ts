/**
 * Authentication Client
 * 
 * Provides authentication utilities and session management.
 * Integrates with Supabase Auth for user authentication.
 */

"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"
import type { AuthChangeEvent, Session as SupabaseSession } from '@supabase/supabase-js'

export interface User {
  id: string
  email: string
  username?: string
  firstName?: string
  lastName?: string
  avatar?: string
  verified: boolean
  createdAt: Date
  lastLogin?: Date
}

export interface Session {
  user: User
  accessToken: string
  refreshToken: string
  expiresAt: Date
}

export interface AuthState {
  user: User | null
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
}

// Global auth state
let authState: AuthState = {
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,
}

// Listeners for auth state changes
const listeners = new Set<(state: AuthState) => void>()

function notifyListeners() {
  listeners.forEach(listener => listener(authState))
}

function updateAuthState(updates: Partial<AuthState>) {
  authState = { ...authState, ...updates }
  notifyListeners()
}

// Initialize auth state
async function initializeAuth() {
  try {
    const supabase = createClient()
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      console.error('Auth initialization error:', error)
      updateAuthState({ isLoading: false, isAuthenticated: false })
      return
    }

    if (session?.user) {
      const user: User = {
        id: session.user.id,
        email: session.user.email || '',
        username: session.user.user_metadata?.username,
        firstName: session.user.user_metadata?.firstName,
        lastName: session.user.user_metadata?.lastName,
        avatar: session.user.user_metadata?.avatar,
        verified: session.user.email_confirmed_at != null,
        createdAt: new Date(session.user.created_at),
        lastLogin: session.user.last_sign_in_at ? new Date(session.user.last_sign_in_at) : undefined,
      }

      const sessionData: Session = {
        user,
        accessToken: session.access_token,
        refreshToken: session.refresh_token || '',
        expiresAt: new Date(session.expires_at ? session.expires_at * 1000 : Date.now() + 3600000),
      }

      updateAuthState({
        user,
        session: sessionData,
        isLoading: false,
        isAuthenticated: true,
      })
    } else {
      updateAuthState({
        user: null,
        session: null,
        isLoading: false,
        isAuthenticated: false,
      })
    }

    // Listen for auth changes
    supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: SupabaseSession | null) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const user: User = {
          id: session.user.id,
          email: session.user.email || '',
          username: session.user.user_metadata?.username,
          firstName: session.user.user_metadata?.firstName,
          lastName: session.user.user_metadata?.lastName,
          avatar: session.user.user_metadata?.avatar,
          verified: session.user.email_confirmed_at != null,
          createdAt: new Date(session.user.created_at),
          lastLogin: session.user.last_sign_in_at ? new Date(session.user.last_sign_in_at) : undefined,
        }

        const sessionData: Session = {
          user,
          accessToken: session.access_token,
          refreshToken: session.refresh_token || '',
          expiresAt: new Date(session.expires_at ? session.expires_at * 1000 : Date.now() + 3600000),
        }

        updateAuthState({
          user,
          session: sessionData,
          isAuthenticated: true,
        })
      } else if (event === 'SIGNED_OUT') {
        updateAuthState({
          user: null,
          session: null,
          isAuthenticated: false,
        })
      }
    })
  } catch (error) {
    console.error('Auth initialization failed:', error)
    updateAuthState({ isLoading: false, isAuthenticated: false })
  }
}

// Initialize on module load
initializeAuth()

export function useSession() {
  const [state, setState] = useState<AuthState>(authState)

  useEffect(() => {
    setState(authState)
    listeners.add(setState)
    
    return () => {
      listeners.delete(setState)
    }
  }, [])

  return state
}

export async function signIn(email: string, password: string) {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw new Error(error.message)
    }

    return data
  } catch (error) {
    console.error('Sign in failed:', error)
    throw error
  }
}

export async function signUp(email: string, password: string, metadata?: Record<string, unknown>) {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })

    if (error) {
      throw new Error(error.message)
    }

    return data
  } catch (error) {
    console.error('Sign up failed:', error)
    throw error
  }
}

export async function signOut() {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw new Error(error.message)
    }

    updateAuthState({
      user: null,
      session: null,
      isAuthenticated: false,
    })
  } catch (error) {
    console.error('Sign out failed:', error)
    throw error
  }
}

export async function resetPassword(email: string) {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email)

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    console.error('Password reset failed:', error)
    throw error
  }
}

export async function updateProfile(updates: Partial<User>) {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({
      data: updates,
    })

    if (error) {
      throw new Error(error.message)
    }

    // Update local state
    if (authState.user) {
      const updatedUser = { ...authState.user, ...updates }
      updateAuthState({ user: updatedUser })
    }
  } catch (error) {
    console.error('Profile update failed:', error)
    throw error
  }
}

export function getSession(): Session | null {
  return authState.session
}

export function getUser(): User | null {
  return authState.user
}

export function isAuthenticated(): boolean {
  return authState.isAuthenticated
}

export default {
  useSession,
  signIn,
  signUp,
  signOut,
  resetPassword,
  updateProfile,
  getSession,
  getUser,
  isAuthenticated,
}
