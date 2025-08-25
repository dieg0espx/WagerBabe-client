"use client"

/**
 * Betting context for managing betting slip, odds, and betting state.
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react'

export interface BetSelection {
  id: string
  eventId: string
  marketId: string
  selectionId: string
  odds: number
  stake?: number
  eventName: string
  marketName: string
  selectionName: string
  isLive?: boolean
}

export interface BettingSlip {
  selections: BetSelection[]
  totalStake: number
  potentialPayout: number
  betType: 'single' | 'multiple'
}

interface PlacedBet {
  id: string
  selections: BetSelection[]
  totalStake: number
  potentialPayout: number
  status: string
  placedAt: string
}

interface BettingState {
  bettingSlip: BettingSlip
  isSlipOpen: boolean
  balance: number
  recentBets: PlacedBet[] // TODO: Create proper Bet interface
  liveBets: PlacedBet[] // TODO: Create proper LiveBet interface
}

type BettingAction =
  | { type: 'ADD_SELECTION'; payload: BetSelection }
  | { type: 'REMOVE_SELECTION'; payload: string }
  | { type: 'UPDATE_STAKE'; payload: { selectionId: string; stake: number } }
  | { type: 'CLEAR_SLIP' }
  | { type: 'TOGGLE_SLIP' }
  | { type: 'SET_BALANCE'; payload: number }
  | { type: 'ADD_RECENT_BET'; payload: PlacedBet }
  | { type: 'UPDATE_LIVE_BETS'; payload: PlacedBet[] }

const initialState: BettingState = {
  bettingSlip: {
    selections: [],
    totalStake: 0,
    potentialPayout: 0,
    betType: 'single',
  },
  isSlipOpen: false,
  balance: 0,
  recentBets: [],
  liveBets: [],
}

function bettingReducer(state: BettingState, action: BettingAction): BettingState {
  switch (action.type) {
    case 'ADD_SELECTION': {
      const existingIndex = state.bettingSlip.selections.findIndex(
        s => s.id === action.payload.id
      )
      
      let newSelections
      if (existingIndex >= 0) {
        // Update existing selection
        newSelections = state.bettingSlip.selections.map((selection, index) =>
          index === existingIndex ? action.payload : selection
        )
      } else {
        // Add new selection
        newSelections = [...state.bettingSlip.selections, action.payload]
      }
      
      const totalStake = newSelections.reduce((sum, s) => sum + (s.stake || 0), 0)
      const potentialPayout = newSelections.reduce((sum, s) => {
        const stake = s.stake || 0
        const odds = s.odds > 0 ? (s.odds / 100) + 1 : (100 / Math.abs(s.odds)) + 1
        return sum + (stake * odds)
      }, 0)
      
      return {
        ...state,
        bettingSlip: {
          ...state.bettingSlip,
          selections: newSelections,
          totalStake,
          potentialPayout,
        },
        isSlipOpen: true,
      }
    }
    
    case 'REMOVE_SELECTION': {
      const newSelections = state.bettingSlip.selections.filter(
        s => s.id !== action.payload
      )
      
      const totalStake = newSelections.reduce((sum, s) => sum + (s.stake || 0), 0)
      const potentialPayout = newSelections.reduce((sum, s) => {
        const stake = s.stake || 0
        const odds = s.odds > 0 ? (s.odds / 100) + 1 : (100 / Math.abs(s.odds)) + 1
        return sum + (stake * odds)
      }, 0)
      
      return {
        ...state,
        bettingSlip: {
          ...state.bettingSlip,
          selections: newSelections,
          totalStake,
          potentialPayout,
        },
      }
    }
    
    case 'UPDATE_STAKE': {
      const newSelections = state.bettingSlip.selections.map(selection =>
        selection.id === action.payload.selectionId
          ? { ...selection, stake: action.payload.stake }
          : selection
      )
      
      const totalStake = newSelections.reduce((sum, s) => sum + (s.stake || 0), 0)
      const potentialPayout = newSelections.reduce((sum, s) => {
        const stake = s.stake || 0
        const odds = s.odds > 0 ? (s.odds / 100) + 1 : (100 / Math.abs(s.odds)) + 1
        return sum + (stake * odds)
      }, 0)
      
      return {
        ...state,
        bettingSlip: {
          ...state.bettingSlip,
          selections: newSelections,
          totalStake,
          potentialPayout,
        },
      }
    }
    
    case 'CLEAR_SLIP':
      return {
        ...state,
        bettingSlip: {
          selections: [],
          totalStake: 0,
          potentialPayout: 0,
          betType: 'single',
        },
      }
    
    case 'TOGGLE_SLIP':
      return {
        ...state,
        isSlipOpen: !state.isSlipOpen,
      }
    
    case 'SET_BALANCE':
      return {
        ...state,
        balance: action.payload,
      }
    
    case 'ADD_RECENT_BET':
      return {
        ...state,
        recentBets: [action.payload, ...state.recentBets.slice(0, 9)], // Keep last 10
      }
    
    case 'UPDATE_LIVE_BETS':
      return {
        ...state,
        liveBets: action.payload,
      }
    
    default:
      return state
  }
}

interface BettingContextType {
  state: BettingState
  addSelection: (selection: BetSelection) => void
  removeSelection: (selectionId: string) => void
  updateStake: (selectionId: string, stake: number) => void
  clearSlip: () => void
  toggleSlip: () => void
  setBalance: (balance: number) => void
  placeBet: () => Promise<{ success: boolean; error?: string }>
}

const BettingContext = createContext<BettingContextType | undefined>(undefined)

export function BettingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(bettingReducer, initialState)

  // Load betting slip from localStorage on mount
  useEffect(() => {
    const savedSlip = localStorage.getItem('wagerbabe-betting-slip')
    if (savedSlip) {
      try {
        const parsedSlip = JSON.parse(savedSlip)
        parsedSlip.selections.forEach((selection: BetSelection) => {
          dispatch({ type: 'ADD_SELECTION', payload: selection })
        })
      } catch (error) {
        console.error('Failed to load betting slip from localStorage:', error)
      }
    }
  }, [])

  // Save betting slip to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('wagerbabe-betting-slip', JSON.stringify(state.bettingSlip))
  }, [state.bettingSlip])

  const addSelection = (selection: BetSelection) => {
    dispatch({ type: 'ADD_SELECTION', payload: selection })
  }

  const removeSelection = (selectionId: string) => {
    dispatch({ type: 'REMOVE_SELECTION', payload: selectionId })
  }

  const updateStake = (selectionId: string, stake: number) => {
    dispatch({ type: 'UPDATE_STAKE', payload: { selectionId, stake } })
  }

  const clearSlip = () => {
    dispatch({ type: 'CLEAR_SLIP' })
  }

  const toggleSlip = () => {
    dispatch({ type: 'TOGGLE_SLIP' })
  }

  const setBalance = (balance: number) => {
    dispatch({ type: 'SET_BALANCE', payload: balance })
  }

  const placeBet = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      // TODO: Implement actual bet placement logic with backend API
      // For now, simulate bet placement
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Add to recent bets
      const bet = {
        id: Date.now().toString(),
        selections: state.bettingSlip.selections,
        totalStake: state.bettingSlip.totalStake,
        potentialPayout: state.bettingSlip.potentialPayout,
        status: 'pending',
        placedAt: new Date().toISOString(),
      }
      
      dispatch({ type: 'ADD_RECENT_BET', payload: bet })
      dispatch({ type: 'CLEAR_SLIP' })
      
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Failed to place bet' }
    }
  }

  const value = {
    state,
    addSelection,
    removeSelection,
    updateStake,
    clearSlip,
    toggleSlip,
    setBalance,
    placeBet,
  }

  return (
    <BettingContext.Provider value={value}>
      {children}
    </BettingContext.Provider>
  )
}

export function useBetting() {
  const context = useContext(BettingContext)
  if (context === undefined) {
    throw new Error('useBetting must be used within a BettingProvider')
  }
  return context
}
