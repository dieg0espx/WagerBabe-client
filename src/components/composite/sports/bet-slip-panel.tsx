"use client"

import * as React from "react"
import { ChevronDown, Trash2 } from "lucide-react"
import { Button } from "@/components/primitives/button"
import { Input } from "@/components/primitives/input"
import { BetSlipItem } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useBetting } from "@/contexts/betting-context"
import { MLB_BETTING_GAMES } from "@/lib/mock-data"
import { bettingToasts } from "@/components/base/betting-toast"

interface BetSlipPanelProps {
  onRemoveItem?: (itemId: string) => void
  onClearAll?: () => void
  onPlaceWager?: () => void
  className?: string
}

export function BetSlipPanel({ 
  onRemoveItem, 
  onClearAll, 
  onPlaceWager,
  className 
}: BetSlipPanelProps) {
  const { state, removeSelection, updateStake, clearSlip, placeBet } = useBetting()
  const { bettingSlip } = state

  // Convert betting context selections to BetSlipItem format for the UI
  const betSlipItems: BetSlipItem[] = bettingSlip.selections.map(selection => {
    const game = MLB_BETTING_GAMES.find(g => g.id === selection.eventId)
    if (!game) return null

    console.log('Processing selection in bet slip:', {
      id: selection.id,
      stake: selection.stake,
      odds: selection.odds,
      team: selection.selectionName
    })

    let description = ""
    if (selection.marketName === "moneyline") {
      description = `${selection.selectionName} to win`
    } else if (selection.marketName === "spread") {
      description = `${selection.selectionName} spread`
    } else if (selection.marketName === "total") {
      description = `${selection.selectionName === 'over' ? 'Over' : 'Under'} total`
    }

    // Calculate potential win based on American odds
    let potentialWin = 0
    if (selection.stake && selection.stake > 0) {
      if (selection.odds > 0) {
        // Positive odds: win $odds for every $100 bet
        potentialWin = selection.stake * (selection.odds / 100)
      } else {
        // Negative odds: need to bet $|odds| to win $100
        potentialWin = selection.stake * (100 / Math.abs(selection.odds))
      }
    }

    return {
      id: selection.id,
      gameId: selection.eventId,
      betType: selection.marketName as "spread" | "moneyline" | "total",
      team: selection.selectionName,
      odds: selection.odds,
      stake: selection.stake || 0,
      potentialWin,
      description,
      gameInfo: {
        homeTeam: game.homeTeam.name,
        awayTeam: game.awayTeam.name,
        league: "MLB",
        startTime: game.time
      }
    }
  }).filter(Boolean) as BetSlipItem[]



  // Handle remove item using context
  const handleRemoveItem = (itemId: string) => {
    removeSelection(itemId)
    onRemoveItem?.(itemId)
  }

  // Handle clear all using context
  const handleClearAll = () => {
    clearSlip()
    onClearAll?.()
  }

  // Handle place wager using context
  const handlePlaceWager = async () => {
    const result = await placeBet()
    if (result.success) {
      bettingToasts.wagerPlaced(totalWagered)
      onPlaceWager?.()
    } else {
      bettingToasts.wagerFailed(result.error || "An error occurred while placing your bet.")
    }
  }

  const totalWagered = betSlipItems.reduce((sum, item) => sum + item.stake, 0)
  const totalPossibleWin = betSlipItems.reduce((sum, item) => sum + item.potentialWin, 0)

  return (
    <div className={cn(
      "bg-white w-80 flex flex-col",
      "h-full h-[calc(100vh-160px)] rounded-t-sm shadow-lg border border-gray-200",
    )}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between rounded-t-sm">
        <span className="font-semibold text-sm text-gray-800">Review and Confirm</span>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-600">{betSlipItems.length} Wager{betSlipItems.length !== 1 ? 's' : ''}</span>
          <ChevronDown className="h-3 w-3 text-gray-500" />
        </div>
      </div>

      {/* MLB Section */}
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
          <span className="font-medium text-sm text-gray-800">MLB</span>
        </div>
        <ChevronDown className="h-3 w-3 text-gray-500" />
      </div>

      {/* Bet Slip Items */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-3 space-y-3">
        {betSlipItems.map((item) => (
          <div key={item.id} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
            {/* Item Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <span className="font-medium text-xs text-gray-800">{item.team}</span>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>

            {/* Bet Details */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">Stake:</span>
                <span className="font-medium text-gray-800">${item.stake.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">To Win:</span>
                <span className="font-medium text-gray-800">${item.potentialWin?.toFixed(2) || '0.00'}</span>
              </div>
              
              <div className="flex items-center text-xs">
                <span className="w-12 text-gray-600">Odds:</span>
                <span className="font-medium ml-auto w-20 text-right text-gray-800">{item.odds > 0 ? '+' : ''}{item.odds}</span>
              </div>
            </div>

            {/* Game Info */}
            <div className="mt-2 pt-2 border-t border-gray-100">
              <div className="text-xs text-gray-600">
                {item.gameInfo.homeTeam} vs {item.gameInfo.awayTeam}
              </div>
              <div className="text-xs text-gray-500">
                {item.gameInfo.league} • {item.gameInfo.startTime}
              </div>
            </div>
          </div>
        ))}

        {betSlipItems.length === 0 && (
          <div className="flex items-center justify-center h-full text-center text-gray-500">
            <div>
              <p className="text-sm">No bets selected</p>
              <p className="text-xs">Select odds to add bets to your slip</p>
            </div>
          </div>
        )}
      </div>

      {/* Summary and Actions */}
      <div className="border-t border-gray-200 p-3 space-y-3 bg-gray-50">
        {/* Summary */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Total Wagered:</span>
            <span className="font-semibold text-gray-800">${totalWagered.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Total Possible Win:</span>
            <span className="font-semibold text-green-600">${totalPossibleWin.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
            onClick={handleClearAll}
            disabled={betSlipItems.length === 0}
          >
            Clear All
          </Button>
          <Button
            size="sm"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs"
            onClick={handlePlaceWager}
            disabled={betSlipItems.length === 0 || totalWagered === 0}
          >
            Place Wager{betSlipItems.length !== 1 ? 's' : ''}
          </Button>
        </div>
      </div>
    </div>
  )
}
