"use client"

import * as React from "react"
import { SportsBettingGame } from "@/lib/mock-data"
import { MLBBettingGameRow } from "./mlb-betting-game-row"

interface MLBBettingTableProps {
  games: SportsBettingGame[]
  onBetClick?: (gameId: string, betType: string, odds: string, team?: string, stake?: number) => void
  className?: string
}

export function MLBBettingTable({ games, onBetClick, className }: MLBBettingTableProps) {
  const [stakes, setStakes] = React.useState<Record<string, number>>({})

  const handleStakeChange = (inputId: string, value: string) => {
    const stake = parseFloat(value) || 0
    console.log('Updating stake:', { inputId, value, stake })
    setStakes(prev => {
      const newStakes = { ...prev, [inputId]: stake }
      console.log('New stakes state:', newStakes)
      return newStakes
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent, gameId: string, betType: string, odds: string, team?: string) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      
      // Get the stake directly from the input field value
      const stake = parseFloat((event.target as HTMLInputElement).value) || 0
      
      if (stake > 0) {
        onBetClick?.(gameId, betType, odds, team, stake)
        // Don't clear the input immediately - let the user see the value
        // setStakes(prev => ({ ...prev, [inputId]: 0 }))
      }
    }
  }

  return (
    <div className="h-[calc(100vh-160px)] overflow-y-auto scrollbar-hide">

      {/* Games List */}
      <div className="divide-y divide-gray-200">
        {games.map((game) => (
          <MLBBettingGameRow
            key={game.id}
            game={game}
            stakes={stakes}
            onStakeChange={handleStakeChange}
            onKeyDown={handleKeyDown}
            onBetClick={onBetClick}
          />
        ))}
      </div>
      
    </div>
  )
}
