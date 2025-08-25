"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives/card"
import { Button } from "@/components/primitives/button"
import { Badge } from "@/components/primitives/badge"
import { useBetting } from "@/contexts/betting-context"
import { RecentBetsWidget } from "@/components/composite/dashboard"
import { 
  Plus, 
  Trash2, 
  DollarSign, 
  TrendingUp, 
  Clock,
  Zap 
} from "lucide-react"

export default function BettingContextDemoPage() {
  const { 
    state, 
    addSelection, 
    removeSelection, 
    updateStake, 
    clearSlip, 
    placeBet 
  } = useBetting()

  const { bettingSlip, recentBets } = state

  // Demo function to add a sample bet
  const addSampleBet = () => {
    const sampleSelection = {
      id: `demo-${Date.now()}`,
      eventId: "demo-game-1",
      marketId: "moneyline",
      selectionId: "demo-selection-1",
      odds: 150,
      stake: 50,
      eventName: "Demo Team A vs Demo Team B",
      marketName: "moneyline",
      selectionName: "Demo Team A",
      isLive: false
    }
    
    addSelection(sampleSelection)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Betting Context Demo</h1>
        <p className="text-muted-foreground">
          This page demonstrates how bets are stored in the centralized betting context
        </p>
      </div>

      {/* Current Bet Slip */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Current Bet Slip
            <Badge variant="secondary">{bettingSlip.selections.length} selections</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {bettingSlip.selections.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No selections in bet slip</p>
              <Button onClick={addSampleBet} className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Sample Bet
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {bettingSlip.selections.map((selection) => (
                <div
                  key={selection.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium">{selection.eventName}</div>
                    <div className="text-sm text-muted-foreground">
                      {selection.marketName} - {selection.selectionName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Odds: {selection.odds > 0 ? '+' : ''}{selection.odds}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium">
                        {formatCurrency(selection.stake || 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Stake
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeSelection(selection.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Total Stake:</span>
                  <span className="font-bold">{formatCurrency(bettingSlip.totalStake)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Potential Payout:</span>
                  <span className="font-bold text-green-600">
                    {formatCurrency(bettingSlip.potentialPayout)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={async () => {
                      const result = await placeBet()
                      if (result.success) {
                        alert('Bet placed successfully!')
                      } else {
                        alert(`Failed to place bet: ${result.error}`)
                      }
                    }}
                    className="flex-1"
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Place Bet
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={clearSlip}
                  >
                    Clear Slip
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Bets Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentBetsWidget />
        
        {/* Context Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Context Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span>Total Bets Placed:</span>
                <Badge variant="secondary">{recentBets.length}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span>Current Selections:</span>
                <Badge variant="secondary">{bettingSlip.selections.length}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span>Total Stake:</span>
                <span className="font-medium">{formatCurrency(bettingSlip.totalStake)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span>Potential Payout:</span>
                <span className="font-medium text-green-600">
                  {formatCurrency(bettingSlip.potentialPayout)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p>
              <strong>1. Bet Creation:</strong> When you create a bet (by clicking on odds or entering stakes), 
              it gets added to the betting context using <code>addSelection()</code>.
            </p>
            <p>
              <strong>2. Context Storage:</strong> The bet is stored in the centralized betting context, 
              which maintains the current bet slip and recent bets.
            </p>
            <p>
              <strong>3. Persistence:</strong> The betting context automatically saves to localStorage 
              and persists across page refreshes.
            </p>
            <p>
              <strong>4. Bet Placement:</strong> When you place a bet, it moves from the current slip 
              to the recent bets list and gets cleared from the slip.
            </p>
            <p>
              <strong>5. Global Access:</strong> Any component in the app can access the betting context 
              using the <code>useBetting()</code> hook.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
