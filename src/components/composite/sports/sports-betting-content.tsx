"use client"

import * as React from "react"
import { MLBBettingTable, BetSlipPanel } from "./index"
import { MLB_BETTING_GAMES } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useBetting, BetSelection } from "@/contexts/betting-context"

interface SportsBettingContentProps {
  className?: string
}

export function SportsBettingContent({ className }: SportsBettingContentProps) {
  const { state, addSelection, removeSelection, updateStake, clearSlip, placeBet } = useBetting()



  // Handle adding a bet to the slip
  const handleBetClick = (gameId: string, betType: string, odds: string, team?: string, stake?: number) => {
    const game = MLB_BETTING_GAMES.find(g => g.id === gameId)
    if (!game) return

    // Map team identifier to actual team name
    let selectionName = team || 'total'
    if (team === 'away') {
      selectionName = game.awayTeam.name
    } else if (team === 'home') {
      selectionName = game.homeTeam.name
    }

    const selectionId = `${gameId}-${betType}-${team || 'total'}`
    const oddsNumber = parseInt(odds)
    const stakeAmount = stake || 0

    const betSelection: BetSelection = {
      id: selectionId,
      eventId: gameId,
      marketId: betType,
      selectionId: selectionId,
      odds: oddsNumber,
      stake: stakeAmount,
      eventName: `${game.awayTeam.name} vs ${game.homeTeam.name}`,
      marketName: betType,
      selectionName: selectionName,
      isLive: false
    }

    addSelection(betSelection)
  }

  // Handle stake change
  const handleStakeChange = (itemId: string, stake: number) => {
    updateStake(itemId, stake)
  }

  // Handle removing an item
  const handleRemoveItem = (itemId: string) => {
    removeSelection(itemId)
  }

  // Handle clearing all items
  const handleClearAll = () => {
    clearSlip()
  }

  // Handle placing wager
  const handlePlaceWager = async () => {
    // The toast notifications are now handled in the BetSlipPanel component
    await placeBet()
  }

  return (
    <div className={cn("flex h-full", className)}>
      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0 gap-2 ">
        {/* Center Content - MLB Betting Table */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <MLBBettingTable 
            games={MLB_BETTING_GAMES}
            onBetClick={handleBetClick}
          />
        </div>

        {/* Right Panel - Bet Slip */}
        <BetSlipPanel
          onRemoveItem={handleRemoveItem}
          onClearAll={handleClearAll}
          onPlaceWager={handlePlaceWager}
        />
      </div>
    </div>
  )
}
