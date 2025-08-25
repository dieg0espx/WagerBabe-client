"use client"

import * as React from "react"
import { 
  SportsBettingHeader, 
  SportsNavigationSidebar, 
  MLBBettingTable, 
  BetSlipPanel 
} from "./index"
import { Button } from "@/components/primitives/button"
import { MLB_BETTING_GAMES } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useBetting, BetSelection } from "@/contexts/betting-context"

interface SportsBettingInterfaceProps {
  className?: string
}

export function SportsBettingInterface({ className }: SportsBettingInterfaceProps) {
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

    console.log('Adding bet to context:', {
      gameId,
      betType,
      odds,
      team,
      selectionName,
      stake,
      stakeAmount,
      selectionId,
      receivedStake: stake,
      finalStakeAmount: stakeAmount
    })

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
    <div className={cn("flex h-screen bg-gray-100", className)}>
      {/* Left Sidebar - Sports Navigation */}
      <SportsNavigationSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <SportsBettingHeader />

        {/* Main Content */}
        <div className="flex-1 flex min-h-0">
          {/* Center Content - MLB Betting Table */}
          <div className="flex-1 overflow-y-auto">
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
          
          {/* Debug Panel */}
          <div className="w-64 bg-gray-100 p-4 border-l border-gray-200">
            <h3 className="font-semibold mb-2">Debug Panel</h3>
            <Button 
              onClick={() => {
                const testBet: BetSelection = {
                  id: `test-${Date.now()}`,
                  eventId: "test-game",
                  marketId: "moneyline",
                  selectionId: "test-selection",
                  odds: 150,
                  stake: 100, // Fixed stake for testing
                  eventName: "Test Team A vs Test Team B",
                  marketName: "moneyline",
                  selectionName: "Test Team A",
                  isLive: false
                }
                console.log('Adding test bet with stake 100:', testBet)
                addSelection(testBet)
              }}
              className="w-full mb-2"
            >
              Add Test Bet ($100)
            </Button>
            <div className="text-xs">
              <p>Context selections: {state.bettingSlip.selections.length}</p>
              <p>Total stake: ${state.bettingSlip.totalStake}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
