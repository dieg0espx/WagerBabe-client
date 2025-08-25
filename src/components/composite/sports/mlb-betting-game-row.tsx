"use client"

import * as React from "react"
import { SportsBettingGame } from "@/lib/mock-data"
import { Input } from "@/components/primitives/input"
import { Button } from "@/components/primitives/button"

interface MLBBettingGameRowProps {
  game: SportsBettingGame
  stakes: Record<string, number>
  onStakeChange: (inputId: string, value: string) => void
  onKeyDown: (event: React.KeyboardEvent, gameId: string, betType: string, odds: string, team?: string) => void
  onBetClick?: (gameId: string, betType: string, odds: string, team?: string, stake?: number) => void
}

export function MLBBettingGameRow({ 
  game, 
  stakes, 
  onStakeChange, 
  onKeyDown, 
  onBetClick 
}: MLBBettingGameRowProps) {
  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 mb-4 overflow-hidden">
      {/* Game Header with Date, Time, Channel */}
      <div className="bg-gray-50 text-gray-700 p-4 border-b border-gray-200">
        <div className="text-sm font-semibold text-gray-900">{game.date}</div>
        <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
          <span className="font-medium">{game.time}</span>
          {game.channel && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="font-medium text-gray-600">{game.channel}</span>
            </div>
          )}
        </div>
      </div>

      {/* Betting Categories Header */}
      <div className="bg-gray-100 text-gray-700 p-3 border-b border-gray-200">
        <div className="grid grid-cols-6 gap-3 text-xs font-semibold text-gray-900">
          <div></div>
          <div className="text-center">MAX</div>
          <div className="text-center">SPREAD</div>
          <div className="text-center">MONEYLINE</div>
          <div className="text-center">TOTAL</div>
          <div className="text-center">TEAM TOTAL</div>
        </div>
        <div className="grid grid-cols-6 gap-3 text-xs text-gray-500 mt-2">
          <div></div>
          <div></div>
          <div className="text-center">$50,000</div>
          <div className="text-center">$50,000</div>
          <div className="text-center">$50,000</div>
          <div className="text-center">$500</div>
        </div>
      </div>

      {/* Away Team Row */}
      <div className="grid grid-cols-6 gap-3 p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm bg-white">
            <img 
              src={game.awayTeam.logo} 
              alt={game.awayTeam.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-semibold text-sm text-gray-900">{game.awayTeam.name}</div>
            <div className="text-xs text-gray-500 font-medium">({game.awayTeam.record})</div>
          </div>
        </div>
        
        {/* MAX Column - Empty for away team */}
        <div></div>
        
        {/* Spread */}
        <div className="flex items-center justify-center space-x-2">
          {game.odds.spread ? (
            <>
              <div className="flex items-center space-x-1">
                <div 
                  className="text-sm font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={(e) => {
                    // Get stake directly from the input field
                    const inputElement = e.currentTarget.parentElement?.parentElement?.querySelector('input[type="number"]') as HTMLInputElement
                    const stake = inputElement ? parseFloat(inputElement.value) || 0 : 0
                    console.log('Clicking spread away odds:', {
                      gameId: game.id,
                      stake,
                      inputValue: inputElement?.value
                    })
                    onBetClick?.(game.id, "spread", game.odds.spread!.away.odds, game.awayTeam.name, stake)
                  }}
                >
                  {game.odds.spread.away.line}
                </div>
                <div 
                  className="text-sm font-semibold text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => {
                    const stake = stakes[`${game.id}-spread-away`] || 0
                    onBetClick?.(game.id, "spread", game.odds.spread!.away.odds, game.awayTeam.name, stake)
                  }}
                >
                  {game.odds.spread.away.odds}
                </div>
              </div>
              <Input 
                className="w-20 h-8 text-xs text-center rounded-md border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-200 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                placeholder="Bet"
                type="number"
                value={stakes[`${game.id}-spread-away`] || ''}
                onChange={(e) => onStakeChange(`${game.id}-spread-away`, e.target.value)}
                onKeyDown={(e) => onKeyDown(e, game.id, "spread", game.odds.spread!.away.odds, "away")}
              />
            </>
          ) : (
            <div className="text-sm text-gray-400">N/A</div>
          )}
        </div>
        
        {/* Moneyline */}
        <div className="flex items-center justify-center space-x-2">
                      <div 
              className="text-sm font-bold text-center text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                console.log('MONEYLINE CLICK DETECTED!')
                // Get stake directly from the input field
                const inputElement = e.currentTarget.parentElement?.querySelector('input[type="number"]') as HTMLInputElement
                const stake = inputElement ? parseFloat(inputElement.value) || 0 : 0
                console.log('Clicking moneyline away odds:', {
                  gameId: game.id,
                  stake,
                  inputValue: inputElement?.value,
                  stakes: stakes,
                  inputKey: `${game.id}-moneyline-away`
                })
                onBetClick?.(game.id, "moneyline", game.odds.moneyline.away, game.awayTeam.name, stake)
              }}
            >
            {game.odds.moneyline.away}
          </div>
          <Input 
            className="w-20 h-9 text-xs text-center rounded-md border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
            placeholder="Bet"
            type="number"
            value={stakes[`${game.id}-moneyline-away`] || ''}
            onChange={(e) => onStakeChange(`${game.id}-moneyline-away`, e.target.value)}
            onKeyDown={(e) => onKeyDown(e, game.id, "moneyline", game.odds.moneyline.away, "away")}
          />
        </div>
        
        {/* Total */}
        <div className="flex items-center justify-center space-x-2">
          {game.odds.total ? (
            <>
              <div className="flex items-center space-x-1">
                <div 
                  className="text-sm font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => {
                    const stake = stakes[`${game.id}-total-over`] || 0
                    onBetClick?.(game.id, "total", game.odds.total!.over.odds, "over", stake)
                  }}
                >
                  {game.odds.total.over.line}
                </div>
                <div 
                  className="text-sm font-semibold text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => {
                    const stake = stakes[`${game.id}-total-over`] || 0
                    onBetClick?.(game.id, "total", game.odds.total!.over.odds, "over", stake)
                  }}
                >
                  {game.odds.total.over.odds}
                </div>
              </div>
              <Input 
                className="w-20 h-9 text-xs text-center rounded-md border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                placeholder="Bet"
                type="number"
                value={stakes[`${game.id}-total-over`] || ''}
                onChange={(e) => onStakeChange(`${game.id}-total-over`, e.target.value)}
                onKeyDown={(e) => onKeyDown(e, game.id, "total", game.odds.total!.over.odds, "over")}
              />
            </>
          ) : (
            <div className="text-sm text-gray-400">N/A</div>
          )}
        </div>
        
        {/* Team Total */}
        <div className="flex items-center justify-center space-x-2">
          <Input 
            className="w-20 h-9 text-xs text-center rounded-md border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
            placeholder="Bet"
            type="number"
            value={stakes[`${game.id}-teamtotal-away`] || ''}
            onChange={(e) => onStakeChange(`${game.id}-teamtotal-away`, e.target.value)}
            onKeyDown={(e) => onKeyDown(e, game.id, "teamtotal", "0", "away")}
          />
        </div>
      </div>

      {/* Home Team Row */}
      <div className="grid grid-cols-6 gap-3 p-4 border-b border-gray-100 bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm bg-white">
            <img 
              src={game.homeTeam.logo} 
              alt={game.homeTeam.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-semibold text-sm text-gray-900">{game.homeTeam.name}</div>
            <div className="text-xs text-gray-500 font-medium">({game.homeTeam.record})</div>
          </div>
        </div>
        
        {/* MAX Column - Blue badge for home team */}
        <div className="flex items-center justify-center">
          <Button 
            className="w-20 h-8 text-xs bg-blue-600/80 hover:bg-blue-700 text-white font-semibold rounded shadow-sm transition-all duration-200"
            onClick={(e) => {
              // Get stake directly from the input field
              const inputElement = e.currentTarget.parentElement?.parentElement?.querySelector('input[type="number"]') as HTMLInputElement
              const stake = inputElement ? parseFloat(inputElement.value) || 0 : 0
              console.log('MAX button clicked:', {
                gameId: game.id,
                stake,
                inputValue: inputElement?.value
              })
              onBetClick?.(game.id, "spread", game.odds.spread?.home.odds || "0", game.homeTeam.name, stake)
            }}
          >
            {game.betButton}
          </Button>
        </div>
        
        {/* Spread */}
        <div className="flex items-center justify-center space-x-2">
          {game.odds.spread ? (
            <>
              <div className="flex items-center space-x-1">
                <div 
                  className="text-sm font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => {
                    const stake = stakes[`${game.id}-spread-home`] || 0
                    onBetClick?.(game.id, "spread", game.odds.spread!.home.odds, game.homeTeam.name, stake)
                  }}
                >
                  {game.odds.spread.home.line}
                </div>
                <div 
                  className="text-sm font-semibold text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => {
                    const stake = stakes[`${game.id}-spread-home`] || 0
                    onBetClick?.(game.id, "spread", game.odds.spread!.home.odds, game.homeTeam.name, stake)
                  }}
                >
                  {game.odds.spread.home.odds}
                </div>
              </div>
              <Input 
                className="w-20 h-8 text-xs text-center rounded-md border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-200 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                placeholder="Bet"
                type="number"
                value={stakes[`${game.id}-spread-home`] || ''}
                onChange={(e) => onStakeChange(`${game.id}-spread-home`, e.target.value)}
                onKeyDown={(e) => onKeyDown(e, game.id, "spread", game.odds.spread!.home.odds, "home")}
              />
            </>
          ) : (
            <div className="text-sm text-gray-400">N/A</div>
          )}
        </div>
        
        {/* Moneyline */}
        <div className="flex items-center justify-center space-x-2">
          <div 
            className="text-sm font-bold text-center text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={(e) => {
              // Get stake directly from the input field
              const inputElement = e.currentTarget.parentElement?.querySelector('input[type="number"]') as HTMLInputElement
              const stake = inputElement ? parseFloat(inputElement.value) || 0 : 0
              console.log('Clicking moneyline home odds:', {
                gameId: game.id,
                stake,
                inputValue: inputElement?.value
              })
              onBetClick?.(game.id, "moneyline", game.odds.moneyline.home, game.homeTeam.name, stake)
            }}
          >
            {game.odds.moneyline.home}
          </div>
          <Input 
            className="w-20 h-9 text-xs text-center rounded-md border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
            placeholder="Bet"
            type="number"
            value={stakes[`${game.id}-moneyline-home`] || ''}
            onChange={(e) => onStakeChange(`${game.id}-moneyline-home`, e.target.value)}
            onKeyDown={(e) => onKeyDown(e, game.id, "moneyline", game.odds.moneyline.home, "home")}
          />
        </div>
        
        {/* Total */}
        <div className="flex items-center justify-center space-x-2">
          {game.odds.total ? (
            <>
              <div className="flex items-center space-x-1">
                <div 
                  className="text-sm font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => {
                    const stake = stakes[`${game.id}-total-under`] || 0
                    onBetClick?.(game.id, "total", game.odds.total!.under.odds, "under", stake)
                  }}
                >
                  {game.odds.total.under.line}
                </div>
                <div 
                  className="text-sm font-semibold text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => {
                    const stake = stakes[`${game.id}-total-under`] || 0
                    onBetClick?.(game.id, "total", game.odds.total!.under.odds, "under", stake)
                  }}
                >
                  {game.odds.total.under.odds}
                </div>
              </div>
              <Input 
                className="w-20 h-9 text-xs text-center rounded-md border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                placeholder="Bet"
                type="number"
                value={stakes[`${game.id}-total-under`] || ''}
                onChange={(e) => onStakeChange(`${game.id}-total-under`, e.target.value)}
                onKeyDown={(e) => onKeyDown(e, game.id, "total", game.odds.total!.under.odds, "under")}
              />
            </>
          ) : (
            <div className="text-sm text-gray-400">N/A</div>
          )}
        </div>
        
        {/* Team Total */}
        <div className="flex items-center justify-center space-x-2">
          <Input 
            className="w-20 h-9 text-xs text-center rounded-md border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
            placeholder="Bet"
            type="number"
            value={stakes[`${game.id}-teamtotal-home`] || ''}
            onChange={(e) => onStakeChange(`${game.id}-teamtotal-home`, e.target.value)}
            onKeyDown={(e) => onKeyDown(e, game.id, "teamtotal", "0", "home")}
          />
        </div>
      </div>

      {/* Player Information */}
      {game.players && (
        <div className="bg-gray-50 p-4 rounded-b-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500 focus:ring-2" />
              <span className="text-sm text-gray-700 font-medium">
                {game.players.away.name} {game.players.away.details && `- ${game.players.away.details}`}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500 focus:ring-2" />
              <span className="text-sm text-gray-700 font-medium">
                {game.players.home.name} {game.players.home.details && `- ${game.players.home.details}`}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
