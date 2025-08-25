"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/primitives/input"
import { Button } from "@/components/primitives/button"
import { Badge } from "@/components/primitives/badge"
import { Flex } from "@/components/primitives/layout"
import { SimpleTooltip } from "@/components/primitives/tooltip"
import { cn } from "@/lib/utils"
import { DollarSign, Plus, Check, X } from "lucide-react"
import { useBetting, BetSelection as ContextBetSelection } from "@/contexts/betting-context"

export interface BetSelection {
  id: string
  gameTitle: string
  teamName: string
  marketType: string
  selection: string
  odds: string
  gameTime: string
  league?: string
}

export interface InlineBetInputProps {
  selection: BetSelection
  onAddWager?: (selection: BetSelection, amount: number) => void
  minAmount?: number
  maxAmount?: number
  className?: string
  disabled?: boolean
  placeholder?: string
  quickAmounts?: number[]
  useContext?: boolean // New prop to control whether to use context or callback
}

export function InlineBetInput({
  selection,
  onAddWager,
  minAmount = 1,
  maxAmount = 10000,
  className,
  disabled = false,
  placeholder = "$0",
  quickAmounts = [10, 25, 50, 100, 250, 500],
  useContext = true
}: InlineBetInputProps) {
  const { addSelection } = useBetting()
  const [value, setValue] = useState("")
  const [isValid, setIsValid] = useState(true)
  const [error, setError] = useState<string>()
  const [isSuccess, setIsSuccess] = useState(false)
  const [showQuickAmounts, setShowQuickAmounts] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Validate amount
  const validateAmount = (amount: string): { isValid: boolean; error?: string } => {
    if (!amount || amount.trim() === "") {
      return { isValid: false, error: "Enter an amount" }
    }

    const numAmount = parseFloat(amount)
    
    if (isNaN(numAmount)) {
      return { isValid: false, error: "Invalid amount" }
    }

    if (numAmount < minAmount) {
      return { isValid: false, error: `Minimum bet is $${minAmount}` }
    }

    if (numAmount > maxAmount) {
      return { isValid: false, error: `Maximum bet is $${maxAmount}` }
    }

    return { isValid: true }
  }

  const handleValueChange = (newValue: string) => {
    // Remove non-numeric characters except decimal point
    const cleanValue = newValue.replace(/[^0-9.]/g, '')
    
    // Prevent multiple decimal points
    const parts = cleanValue.split('.')
    const formattedValue = parts.length > 2 
      ? parts[0] + '.' + parts.slice(1).join('')
      : cleanValue

    setValue(formattedValue)

    const validation = validateAmount(formattedValue)
    setIsValid(validation.isValid)
    setError(validation.error)
    setIsSuccess(false)
  }

  const handleQuickAmount = (amount: number) => {
    setValue(amount.toString())
    setIsValid(true)
    setError(undefined)
    setIsSuccess(false)
    setShowQuickAmounts(false)
    inputRef.current?.focus()
  }

  const handleSubmit = () => {
    const validation = validateAmount(value)
    
    if (!validation.isValid) {
      setIsValid(false)
      setError(validation.error)
      return
    }

    const amount = parseFloat(value)
    
    if (useContext) {
      // Use betting context
      const contextSelection: ContextBetSelection = {
        id: selection.id,
        eventId: selection.id.split('-')[0], // Extract game ID from selection ID
        marketId: selection.marketType,
        selectionId: selection.id,
        odds: parseInt(selection.odds),
        stake: amount,
        eventName: selection.gameTitle,
        marketName: selection.marketType,
        selectionName: selection.selection,
        isLive: false
      }
      
      addSelection(contextSelection)
    } else {
      // Use callback (for backward compatibility)
      onAddWager?.(selection, amount)
    }
    
    // Show success state
    setIsSuccess(true)
    setTimeout(() => {
      setValue("")
      setIsSuccess(false)
      setIsValid(true)
      setError(undefined)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValid && value) {
      handleSubmit()
    }
  }

  const calculatePayout = (risk: number, odds: string): number => {
    const numOdds = parseInt(odds)
    if (numOdds > 0) {
      return risk + (risk * numOdds / 100)
    } else {
      return risk + (risk * 100 / Math.abs(numOdds))
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getOddsColor = (odds: string) => {
    const numOdds = parseInt(odds)
    return numOdds > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
  }

  const potentialPayout = value && isValid ? calculatePayout(parseFloat(value), selection.odds) : 0

  return (
    <div className={cn("relative", className)}>
      {/* Selection Info */}
      <div className="mb-3 p-3 bg-muted/30 rounded-lg">
        <Flex justify="between" align="center" className="mb-2">
          <div>
            <p className="font-medium text-sm">{selection.selection}</p>
            <p className="text-xs text-muted-foreground">{selection.marketType}</p>
          </div>
          <div className="text-right">
            <p className={cn("font-bold text-sm", getOddsColor(selection.odds))}>
              {selection.odds}
            </p>
          </div>
        </Flex>
        
        <div className="text-xs text-muted-foreground">
          <p>{selection.gameTitle}</p>
          <Flex justify="between" align="center">
            <span>{selection.gameTime}</span>
            {selection.league && (
              <Badge variant="outline" className="text-xs">
                {selection.league}
              </Badge>
            )}
          </Flex>
        </div>
      </div>

      {/* Bet Input */}
      <div className="space-y-3">
        <div className="relative">
          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => handleValueChange(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setShowQuickAmounts(true)}
            onBlur={() => setTimeout(() => setShowQuickAmounts(false), 200)}
            placeholder={placeholder}
            disabled={disabled || isSuccess}
            className={cn(
              "pl-10 pr-20 text-center font-medium",
              !isValid && "border-destructive",
              isSuccess && "border-green-500 bg-green-50 dark:bg-green-950"
            )}
          />
          
          {/* Submit Button */}
          <div className="absolute right-1 top-1 bottom-1">
            <Button
              onClick={handleSubmit}
              disabled={!isValid || !value || disabled || isSuccess}
              size="sm"
              className={cn(
                "h-full px-3",
                isSuccess && "bg-green-600 hover:bg-green-600"
              )}
            >
              {isSuccess ? (
                <Check className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && !isValid && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <X className="h-3 w-3" />
            {error}
          </p>
        )}

        {/* Potential Payout */}
        {value && isValid && potentialPayout > 0 && (
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Potential Payout</p>
            <p className="font-bold text-green-600 dark:text-green-400">
              {formatCurrency(potentialPayout)}
            </p>
          </div>
        )}

        {/* Quick Amount Buttons */}
        {showQuickAmounts && (
          <div className="grid grid-cols-3 gap-2">
            {quickAmounts.map((amount) => (
              <Button
                key={amount}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAmount(amount)}
                className="text-xs"
              >
                ${amount}
              </Button>
            ))}
          </div>
        )}

        {/* Success Message */}
        {isSuccess && (
          <div className="text-center">
            <p className="text-sm text-green-600 dark:text-green-400 flex items-center justify-center gap-2">
              <Check className="h-4 w-4" />
              Added to bet slip!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
