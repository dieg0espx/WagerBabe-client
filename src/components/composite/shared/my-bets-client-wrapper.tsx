/**
 * My Bets Client Wrapper Component
 * 
 * Client-side wrapper for the My Bets interface that handles
 * user betting history, active bets, and bet management functionality.
 * Provides a comprehensive view of all user betting activity.
 */

"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives"
import { Button } from "@/components/primitives"
import { Badge } from "@/components/primitives"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/primitives"
import { BettingCard } from "@/components/base"
import { cn } from "@/lib/utils"
import { 
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  Search,
  RefreshCw,
  Eye,
  BarChart3
} from "lucide-react"

export interface MyBetsClientWrapperProps {
  className?: string
}

// Mock bet data for demonstration
const ACTIVE_BETS = [
  {
    id: "1",
    type: "single",
    sport: "Basketball",
    event: "Lakers vs Warriors",
    selection: "Lakers ML",
    odds: -110,
    stake: 50.00,
    potentialWin: 95.45,
    status: "pending",
    placedAt: "2024-01-15T19:30:00Z"
  },
  {
    id: "2", 
    type: "parlay",
    selections: [
      { event: "Chiefs vs Bills", selection: "Chiefs -3.5", odds: -110 },
      { event: "Cowboys vs Eagles", selection: "Over 47.5", odds: -105 }
    ],
    stake: 25.00,
    potentialWin: 89.50,
    status: "pending",
    placedAt: "2024-01-15T16:15:00Z"
  }
]

const BET_HISTORY = [
  {
    id: "3",
    type: "single", 
    sport: "Football",
    event: "Patriots vs Jets",
    selection: "Patriots -7",
    odds: -110,
    stake: 100.00,
    payout: 190.91,
    status: "won",
    settledAt: "2024-01-14T22:45:00Z"
  },
  {
    id: "4",
    type: "single",
    sport: "Basketball", 
    event: "Celtics vs Heat",
    selection: "Under 215.5",
    odds: -105,
    stake: 75.00,
    payout: 0,
    status: "lost",
    settledAt: "2024-01-13T21:30:00Z"
  },
  {
    id: "5",
    type: "parlay",
    selections: [
      { event: "Rams vs Cardinals", selection: "Rams ML", odds: -150 },
      { event: "49ers vs Seahawks", selection: "Over 42.5", odds: -110 }
    ],
    stake: 50.00,
    payout: 0,
    status: "lost",
    settledAt: "2024-01-12T20:15:00Z"
  }
]

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

function formatOdds(odds: number): string {
  return odds > 0 ? `+${odds}` : `${odds}`
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString))
}

function getBetStatusIcon(status: string) {
  switch (status) {
    case 'won':
      return CheckCircle
    case 'lost':
      return XCircle
    case 'pending':
      return Clock
    case 'void':
      return RefreshCw
    default:
      return Clock
  }
}

function getBetStatusColor(status: string) {
  switch (status) {
    case 'won':
      return 'text-green-600'
    case 'lost':
      return 'text-red-600'
    case 'pending':
      return 'text-yellow-600'
    case 'void':
      return 'text-gray-600'
    default:
      return 'text-gray-600'
  }
}

export function MyBetsClientWrapper({ className }: MyBetsClientWrapperProps) {
  const [activeTab, setActiveTab] = React.useState("active")

  // Calculate stats
  const totalActiveBets = ACTIVE_BETS.length
  const totalActiveStake = ACTIVE_BETS.reduce((sum, bet) => sum + bet.stake, 0)
  const totalPotentialWin = ACTIVE_BETS.reduce((sum, bet) => sum + bet.potentialWin, 0)
  
  const wonBets = BET_HISTORY.filter(bet => bet.status === 'won')
  const lostBets = BET_HISTORY.filter(bet => bet.status === 'lost')
  const totalProfit = wonBets.reduce((sum, bet) => sum + bet.payout, 0) - 
                     [...wonBets, ...lostBets].reduce((sum, bet) => sum + bet.stake, 0)

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <BettingCard>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Active Bets</span>
            </div>
            <div className="text-2xl font-bold">{totalActiveBets}</div>
            <div className="text-xs text-muted-foreground">
              {formatCurrency(totalActiveStake)} staked
            </div>
          </CardContent>
        </BettingCard>

        <BettingCard>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Potential Win</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(totalPotentialWin)}
            </div>
            <div className="text-xs text-muted-foreground">
              From active bets
            </div>
          </CardContent>
        </BettingCard>

        <BettingCard>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Won Bets</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{wonBets.length}</div>
            <div className="text-xs text-muted-foreground">
              This month
            </div>
          </CardContent>
        </BettingCard>

        <BettingCard>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Net Profit</span>
            </div>
            <div className={cn(
              "text-2xl font-bold",
              totalProfit >= 0 ? "text-green-600" : "text-red-600"
            )}>
              {totalProfit >= 0 ? "+" : ""}{formatCurrency(totalProfit)}
            </div>
            <div className="text-xs text-muted-foreground">
              All time
            </div>
          </CardContent>
        </BettingCard>
      </div>

      {/* Bets Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Bets ({totalActiveBets})</TabsTrigger>
          <TabsTrigger value="history">Bet History ({BET_HISTORY.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {ACTIVE_BETS.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Bets</h3>
                <p className="text-muted-foreground">
                  You don&apos;t have any active bets at the moment
                </p>
              </CardContent>
            </Card>
          ) : (
            ACTIVE_BETS.map((bet) => (
              <BettingCard key={bet.id} variant="live">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{bet.type.toUpperCase()}</Badge>
                      <Badge className="bg-yellow-500 text-white">PENDING</Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>

                  {bet.type === 'single' ? (
                    <div className="space-y-2">
                      <div className="font-semibold">{bet.event}</div>
                      <div className="text-sm text-muted-foreground">
                        {bet.selection} ({formatOdds(bet.odds || 0)})
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="font-semibold">Parlay ({bet.selections?.length} legs)</div>
                      {bet.selections?.map((selection, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          {selection.event}: {selection.selection} ({formatOdds(selection.odds)})
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4 pt-3 border-t">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Stake: </span>
                      <span className="font-medium">{formatCurrency(bet.stake)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">To Win: </span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(bet.potentialWin)}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(bet.placedAt)}
                    </div>
                  </div>
                </CardContent>
              </BettingCard>
            ))
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {BET_HISTORY.map((bet) => {
            const StatusIcon = getBetStatusIcon(bet.status)
            const statusColor = getBetStatusColor(bet.status)
            
            return (
              <BettingCard key={bet.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{bet.type.toUpperCase()}</Badge>
                      <Badge variant={bet.status === 'won' ? 'default' : 'destructive'}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {bet.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(bet.settledAt)}
                    </div>
                  </div>

                  {bet.type === 'single' ? (
                    <div className="space-y-2">
                      <div className="font-semibold">{bet.event}</div>
                      <div className="text-sm text-muted-foreground">
                        {bet.selection} ({formatOdds(bet.odds || 0)})
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="font-semibold">Parlay ({bet.selections?.length} legs)</div>
                      {bet.selections?.map((selection, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          {selection.event}: {selection.selection} ({formatOdds(selection.odds)})
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4 pt-3 border-t">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Stake: </span>
                      <span className="font-medium">{formatCurrency(bet.stake)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Payout: </span>
                      <span className={cn("font-medium", statusColor)}>
                        {bet.status === 'won' ? formatCurrency(bet.payout) : formatCurrency(0)}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">P&L: </span>
                      <span className={cn("font-medium", statusColor)}>
                        {bet.status === 'won' 
                          ? `+${formatCurrency(bet.payout - bet.stake)}`
                          : `-${formatCurrency(bet.stake)}`
                        }
                      </span>
                    </div>
                  </div>
                </CardContent>
              </BettingCard>
            )
          })}
        </TabsContent>
      </Tabs>
    </div>
  )
}
