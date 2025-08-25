/**
 * Wallet Management Hook
 * 
 * Manages wallet operations, pending amounts, and transaction history.
 * Provides real-time updates for wallet balance and pending transactions.
 */

"use client"

import { useState, useEffect, useCallback } from "react"

export interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal' | 'bet' | 'win' | 'refund'
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  description: string
  timestamp: Date
  reference?: string
}

export interface PendingAmounts {
  deposits: number
  withdrawals: number
  bets: number
  wins: number
  total: number
}

export interface WalletState {
  balance: number
  currency: string
  isLoading: boolean
  error: string | null
  lastUpdated: Date | null
}

export function usePendingAmounts() {
  const [pendingAmounts, setPendingAmounts] = useState<PendingAmounts>({
    deposits: 0,
    withdrawals: 0,
    bets: 0,
    wins: 0,
    total: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPendingAmounts = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/wallet/pending')
      
      if (!response.ok) {
        throw new Error('Failed to fetch pending amounts')
      }

      const data = await response.json()
      
      const pending: PendingAmounts = {
        deposits: data.deposits || 0,
        withdrawals: data.withdrawals || 0,
        bets: data.bets || 0,
        wins: data.wins || 0,
        total: (data.deposits || 0) + (data.withdrawals || 0) + (data.bets || 0) + (data.wins || 0),
      }
      
      setPendingAmounts(pending)
    } catch (err) {
      console.warn('Pending amounts fetch failed:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      
      // Set mock data for development
      setPendingAmounts({
        deposits: 100.00,
        withdrawals: 50.00,
        bets: 25.00,
        wins: 0,
        total: 175.00,
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPendingAmounts()
    
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchPendingAmounts, 30000)
    return () => clearInterval(interval)
  }, [fetchPendingAmounts])

  return {
    pendingAmounts,
    isLoading,
    error,
    refresh: fetchPendingAmounts,
  }
}

export function useWalletTransactions(limit: number = 10) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)

  const fetchTransactions = useCallback(async (offset: number = 0) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/wallet/transactions?limit=${limit}&offset=${offset}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch transactions')
      }

      const data = await response.json()
      
      if (offset === 0) {
        setTransactions(data.transactions || [])
      } else {
        setTransactions(prev => [...prev, ...(data.transactions || [])])
      }
      
      setHasMore(data.hasMore || false)
    } catch (err) {
      console.warn('Transactions fetch failed:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
      
      // Set mock data for development
      const mockTransactions: Transaction[] = [
        {
          id: 'tx-1',
          type: 'deposit',
          amount: 100.00,
          currency: 'USD',
          status: 'completed',
          description: 'Credit card deposit',
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        },
        {
          id: 'tx-2',
          type: 'bet',
          amount: -25.00,
          currency: 'USD',
          status: 'completed',
          description: 'Lakers vs Warriors - Lakers ML',
          timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        },
        {
          id: 'tx-3',
          type: 'win',
          amount: 45.00,
          currency: 'USD',
          status: 'completed',
          description: 'Lakers vs Warriors - Lakers ML (Win)',
          timestamp: new Date(Date.now() - 900000), // 15 minutes ago
        },
      ]
      
      setTransactions(mockTransactions)
      setHasMore(false)
    } finally {
      setIsLoading(false)
    }
  }, [limit])

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchTransactions(transactions.length)
    }
  }, [isLoading, hasMore, transactions.length, fetchTransactions])

  useEffect(() => {
    fetchTransactions(0)
  }, [fetchTransactions])

  return {
    transactions,
    isLoading,
    error,
    hasMore,
    loadMore,
    refresh: () => fetchTransactions(0),
  }
}

export function useWalletOperations() {
  const [isProcessing, setIsProcessing] = useState(false)

  const deposit = useCallback(async (amount: number, method: string) => {
    try {
      setIsProcessing(true)
      
      const response = await fetch('/api/wallet/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, method }),
      })

      if (!response.ok) {
        throw new Error('Deposit failed')
      }

      return await response.json()
    } catch (err) {
      console.error('Deposit failed:', err)
      throw err
    } finally {
      setIsProcessing(false)
    }
  }, [])

  const withdraw = useCallback(async (amount: number, method: string) => {
    try {
      setIsProcessing(true)
      
      const response = await fetch('/api/wallet/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, method }),
      })

      if (!response.ok) {
        throw new Error('Withdrawal failed')
      }

      return await response.json()
    } catch (err) {
      console.error('Withdrawal failed:', err)
      throw err
    } finally {
      setIsProcessing(false)
    }
  }, [])

  return {
    deposit,
    withdraw,
    isProcessing,
  }
}

export default usePendingAmounts
