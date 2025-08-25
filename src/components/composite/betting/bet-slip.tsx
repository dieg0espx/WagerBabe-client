"use client"

import React, { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives/card"
import { Button } from "@/components/primitives/button"
import { Input } from "@/components/primitives/input"
import { Badge } from "@/components/primitives/badge"
import { Divider, Stack, Flex } from "@/components/primitives/layout"
import { SimpleTooltip } from "@/components/primitives/tooltip"
import { ConfirmationModal } from "@/components/primitives/modal"
import {
  BettingInput,
  BettingButton,
  BettingCard
} from "@/components/base"
import {
  Receipt,
  Trash2,
  DollarSign,
  TrendingUp,
  X,
  AlertCircle,
  CheckCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

// Types for bet slip
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

export interface Wager {
  id: string
  selection: BetSelection
  riskAmount: number
  potentialPayout: number
  timestamp: number
}

export interface BetSlipProps {
  className?: string
  maxWagers?: number
  minRiskAmount?: number
  maxRiskAmount?: number
  onBetPlaced?: (wagers: Wager[]) => void
}

// Mock data for demonstration
const mockWagers: Wager[] = [
  {
    id: "wager-1",
    selection: {
      id: "sel-1",
      gameTitle: "Lakers vs Warriors",
      teamName: "Lakers",
      marketType: "Spread",
      selection: "Lakers +7.5",
      odds: "-110",
      gameTime: "8:00 PM ET",
      league: "NBA"
    },
    riskAmount: 50,
    potentialPayout: 95.45,
    timestamp: Date.now()
  },
  {
    id: "wager-2",
    selection: {
      id: "sel-2",
      gameTitle: "Cowboys vs Giants",
      teamName: "Cowboys",
      marketType: "Moneyline",
      selection: "Cowboys ML",
      odds: "-150",
      gameTime: "1:00 PM ET",
      league: "NFL"
    },
    riskAmount: 75,
    potentialPayout: 125,
    timestamp: Date.now() - 1000
  }
]

function WagerItem({ 
  wager, 
  onRemove, 
  onUpdateRisk 
}: { 
  wager: Wager
  onRemove: (id: string) => void
  onUpdateRisk: (id: string, amount: number) => void
}) {
  const [riskAmount, setRiskAmount] = useState(wager.riskAmount.toString())
  const [isEditing, setIsEditing] = useState(false)

  const handleRiskChange = (value: string) => {
    setRiskAmount(value)
    const numValue = parseFloat(value)
    if (!isNaN(numValue) && numValue > 0) {
      onUpdateRisk(wager.id, numValue)
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

  return (
    <BettingCard className="relative" variant="default" size="sm">
      <CardContent className="p-2 sm:p-3">
        <Flex justify="between" align="start" className="mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-1">
              <h4 className="font-medium text-xs sm:text-sm truncate">{wager.selection.gameTitle}</h4>
              {wager.selection.league && (
                <Badge variant="outline" className="text-xs px-1 py-0">
                  {wager.selection.league}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{wager.selection.gameTime}</p>
          </div>
          <BettingButton
            variant="cashout"
            size="xs"
            onClick={() => onRemove(wager.id)}
            className="min-h-[32px] min-w-[32px] text-muted-foreground hover:text-destructive touch-manipulation"
            aria-label="Remove bet"
          >
            <X className="h-3 w-3" />
          </BettingButton>
        </Flex>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-xs sm:text-sm truncate">{wager.selection.selection}</p>
              <p className="text-xs text-muted-foreground">{wager.selection.marketType}</p>
            </div>
            <div className="text-right ml-2">
              <p className={cn("font-bold text-xs sm:text-sm", getOddsColor(wager.selection.odds))}>
                {wager.selection.odds}
              </p>
            </div>
          </div>

          <Divider />

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-muted-foreground">Risk</label>
              <BettingInput
                variant="amount"
                inputType="currency"
                type="number"
                value={riskAmount}
                onChange={(e) => handleRiskChange(e.target.value)}
                className="text-xs h-8"
                min={1}
                step={0.01}
                prefix="$"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">To Win</label>
              <div className="relative">
                <TrendingUp className="absolute left-1.5 top-2 h-3 w-3 text-muted-foreground" />
                <Input
                  value={formatCurrency(wager.potentialPayout)}
                  readOnly
                  className="pl-6 text-xs h-8 bg-muted"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </BettingCard>
  )
}

export function BetSlip({
  className,
  maxWagers = 10,
  minRiskAmount = 1,
  maxRiskAmount = 10000,
  onBetPlaced
}: BetSlipProps) {
  const [wagers, setWagers] = useState<Wager[]>(mockWagers)
  const [isPlacing, setIsPlacing] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const handleRemoveWager = useCallback((wagerId: string) => {
    setWagers(prev => prev.filter(w => w.id !== wagerId))
  }, [])

  const handleUpdateRisk = useCallback((wagerId: string, riskAmount: number) => {
    setWagers(prev => prev.map(w => 
      w.id === wagerId 
        ? { 
            ...w, 
            riskAmount,
            potentialPayout: calculatePayout(riskAmount, w.selection.odds)
          }
        : w
    ))
  }, [])

  const calculatePayout = (risk: number, odds: string): number => {
    const numOdds = parseInt(odds)
    if (numOdds > 0) {
      return risk + (risk * numOdds / 100)
    } else {
      return risk + (risk * 100 / Math.abs(numOdds))
    }
  }

  const handleClearAll = () => {
    setWagers([])
    setShowClearConfirm(false)
  }

  const handlePlaceBets = async () => {
    if (wagers.length === 0) return

    setIsPlacing(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      onBetPlaced?.(wagers)
      setWagers([])
      // Show success message
      alert("Bets placed successfully!")
    } catch (error) {
      alert("Failed to place bets. Please try again.")
    } finally {
      setIsPlacing(false)
    }
  }

  const totalRisk = wagers.reduce((sum, w) => sum + w.riskAmount, 0)
  const totalPayout = wagers.reduce((sum, w) => sum + w.potentialPayout, 0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <>
      <Card className={cn("flex flex-col max-h-screen lg:max-h-[calc(100vh-2rem)]", className)}>
        <CardHeader className="pb-2 sm:pb-3 flex-shrink-0">
          <Flex align="center" justify="between">
            <Flex align="center" gap={2}>
              <Receipt className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <CardTitle className="text-base sm:text-lg">Bet Slip</CardTitle>
              {wagers.length > 0 && (
                <Badge variant="default" className="text-xs">{wagers.length}</Badge>
              )}
            </Flex>
            {wagers.length > 0 && (
              <BettingButton
                variant="cashout"
                size="xs"
                onClick={() => setShowClearConfirm(true)}
                className="min-h-[32px] min-w-[32px] sm:min-h-[44px] sm:min-w-[44px] touch-manipulation"
                aria-label="Clear all bets"
              >
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
              </BettingButton>
            )}
          </Flex>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-3 sm:p-4 pt-0 min-h-0">
          {wagers.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-4 sm:py-6">
              <Receipt className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground mb-3" />
              <h3 className="font-medium text-sm sm:text-base mb-1">Your bet slip is empty</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Click on odds to add bets to your slip
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 min-h-0 mb-3 sm:mb-4">
                <div className="h-full overflow-y-auto space-y-2 sm:space-y-3 pr-1">
                  {wagers.map((wager) => (
                    <WagerItem
                      key={wager.id}
                      wager={wager}
                      onRemove={handleRemoveWager}
                      onUpdateRisk={handleUpdateRisk}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3 flex-shrink-0">
                <Divider />

                <div className="space-y-1 sm:space-y-2">
                  <Flex justify="between">
                    <span className="text-xs sm:text-sm text-muted-foreground">Total Risk:</span>
                    <span className="font-medium text-xs sm:text-sm">{formatCurrency(totalRisk)}</span>
                  </Flex>
                  <Flex justify="between">
                    <span className="text-xs sm:text-sm text-muted-foreground">Potential Payout:</span>
                    <span className="font-bold text-xs sm:text-sm text-green-600 dark:text-green-400">
                      {formatCurrency(totalPayout)}
                    </span>
                  </Flex>
                </div>

                <BettingButton
                  variant="bet"
                  size="sm"
                  emphasis="high"
                  onClick={handlePlaceBets}
                  disabled={isPlacing || wagers.length === 0}
                  loading={isPlacing}
                  className="w-full min-h-[44px]"
                >
                  {!isPlacing && (
                    <>
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      <span className="text-xs sm:text-sm">
                        Place {wagers.length} Bet{wagers.length !== 1 ? 's' : ''}
                      </span>
                    </>
                  )}
                </BettingButton>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <ConfirmationModal
        open={showClearConfirm}
        onOpenChange={setShowClearConfirm}
        title="Clear All Bets"
        description="Are you sure you want to remove all bets from your slip? This action cannot be undone."
        onConfirm={handleClearAll}
        confirmText="Clear All"
        variant="destructive"
      />
    </>
  )
}
