"use client"

import * as React from "react"
import { GameList } from "@/components/composite/sports"
import { BetSlip } from "@/components/composite/betting"
import { Button } from "@/components/primitives"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/primitives"
import { Badge } from "@/components/primitives"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/primitives"
import { UnifiedLayout } from "@/components/layout"
import {
  Receipt,
  RefreshCw,
  TrendingUp,
  Target,
  Clock,
  Zap,
  BarChart3,
  DollarSign,
  Activity
} from "lucide-react"
import { MOCK_GAMES } from "@/lib/mock-data"
import { useBetting, BetSelection } from "@/contexts/betting-context"

// Define types for this page
interface BetSlipItem {
  id: string
  gameId: string
  betType: string
  team?: string
  odds: number
  stake: number
  potentialWin: number
  description: string
  gameInfo: {
    homeTeam: string
    awayTeam: string
    league: string
    startTime: string
  }
}

// Use centralized mock data
const mockGames = MOCK_GAMES

export default function BettingPage() {
  const { state, addSelection, removeSelection, updateStake, clearSlip, placeBet } = useBetting()
  const [isPlacingBets, setIsPlacingBets] = React.useState(false)
  const [refreshKey, setRefreshKey] = React.useState(0)

  // Convert betting context selections to BetSlipItem format for the UI
  const betSlipItems: BetSlipItem[] = state.bettingSlip.selections.map(selection => {
    const game = mockGames.find(g => g.id === selection.eventId)
    if (!game) return null

    let description = ""
    if (selection.marketName === "moneyline") {
      description = `${selection.selectionName} to win`
    } else if (selection.marketName === "spread") {
      const spreadLine = game.odds?.spread?.line
      if (spreadLine) {
        const line = selection.selectionName === game.homeTeam ? spreadLine : -spreadLine
        description = `${selection.selectionName} ${line > 0 ? '+' : ''}${line}`
      }
    } else if (selection.marketName === "total") {
      const totalLine = game.odds?.total?.line
      description = `${selection.selectionName === 'over' ? 'Over' : 'Under'} ${totalLine}`
    }

    // Calculate potential win based on American odds
    let potentialWin = 0
    if (selection.stake && selection.stake > 0) {
      if (selection.odds > 0) {
        potentialWin = selection.stake + (selection.stake * selection.odds / 100)
      } else {
        potentialWin = selection.stake + (selection.stake * 100 / Math.abs(selection.odds))
      }
    }

    return {
      id: selection.id,
      gameId: selection.eventId,
      betType: selection.marketName,
      team: selection.selectionName,
      odds: selection.odds,
      stake: selection.stake || 0,
      potentialWin,
      description,
      gameInfo: {
        homeTeam: game.homeTeam,
        awayTeam: game.awayTeam,
        league: game.league,
        startTime: game.startTime || ""
      }
    }
  }).filter(Boolean) as BetSlipItem[]

  // Handle adding a bet to the slip
  const handleBetClick = (gameId: string, betType: string, odds: number, team?: string) => {
    const game = mockGames.find(g => g.id === gameId)
    if (!game) return

    const selectionId = `${gameId}-${betType}-${team || 'total'}`
    
    const betSelection: BetSelection = {
      id: selectionId,
      eventId: gameId,
      marketId: betType,
      selectionId: selectionId,
      odds: odds,
      stake: 0,
      eventName: `${game.awayTeam} vs ${game.homeTeam}`,
      marketName: betType,
      selectionName: team || 'total',
      isLive: false
    }

    addSelection(betSelection)
  }

  // Handle updating stake
  const handleUpdateStake = (itemId: string, stake: number) => {
    updateStake(itemId, stake)
  }

  // Handle removing item
  const handleRemoveItem = (itemId: string) => {
    removeSelection(itemId)
  }

  // Handle clearing all bets
  const handleClearAll = () => {
    clearSlip()
  }

  // Handle placing bets
  const handlePlaceBets = async () => {
    setIsPlacingBets(true)
    
    const result = await placeBet()
    
    if (result.success) {
      console.log("Bets placed successfully!")
    } else {
      console.error("Failed to place bets:", result.error)
    }
    
    setIsPlacingBets(false)
  }

  // Handle refresh
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  const totalBets = betSlipItems.length

  return (
    <UnifiedLayout
      title="Sports Betting"
      subtitle="Place bets on your favorite teams and games with live odds"
      showBreadcrumbs
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Betting" }
      ]}
      showRefresh
      onRefresh={handleRefresh}
      actions={
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="default"
                size="sm"
                className="flex items-center gap-2 lg:hidden"
              >
                <Receipt className="h-4 w-4" />
                Bet Slip
                {totalBets > 0 && (
                  <Badge variant="secondary" className="bg-background text-foreground">
                    {totalBets}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Bet Slip</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <BetSlip />
              </div>
            </SheetContent>
          </Sheet>
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Betting Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Bets</p>
                  <p className="text-2xl font-bold">{totalBets}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Potential Win</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${betSlipItems.reduce((sum, item) => sum + item.potentialWin, 0).toFixed(2)}
                  </p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Stake</p>
                  <p className="text-2xl font-bold">
                    ${betSlipItems.reduce((sum, item) => sum + item.stake, 0).toFixed(2)}
                  </p>
                </div>
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <DollarSign className="h-4 w-4 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Live Games</p>
                  <p className="text-2xl font-bold text-red-600">
                    {mockGames.filter(game => game.status === 'live').length}
                  </p>
                </div>
                <div className="p-2 bg-red-100 rounded-lg">
                  <Zap className="h-4 w-4 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Betting Interface Tabs */}
        <Tabs defaultValue="all-games" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all-games">All Games</TabsTrigger>
            <TabsTrigger value="live">Live</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="all-games" className="space-y-6">
            {/* Main Content */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Games Section */}
              <div className="lg:col-span-2">
                <GameList
                  key={refreshKey}
                  games={mockGames}
                  onBetClick={handleBetClick}
                  title="Today's Games"
                  onRefresh={handleRefresh}
                />
              </div>

              {/* Desktop Bet Slip */}
              <div className="hidden lg:block">
                <div className="sticky top-4">
                  <BetSlip />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="live" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <GameList
                  key={refreshKey}
                  games={mockGames.filter(game => game.status === 'live')}
                  onBetClick={handleBetClick}
                  title="Live Games"
                  onRefresh={handleRefresh}
                />
              </div>
              <div className="hidden lg:block">
                <div className="sticky top-4">
                  <BetSlip />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <GameList
                  key={refreshKey}
                  games={mockGames.filter(game => game.status === 'upcoming')}
                  onBetClick={handleBetClick}
                  title="Upcoming Games"
                  onRefresh={handleRefresh}
                />
              </div>
              <div className="hidden lg:block">
                <div className="sticky top-4">
                  <BetSlip />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-8 text-center">
                    <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Favorite Games Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Mark games as favorites to see them here for quick access
                    </p>
                    <Button variant="outline">
                      Browse All Games
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <div className="hidden lg:block">
                <div className="sticky top-4">
                  <BetSlip />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col">
                <Zap className="h-5 w-5 mb-2" />
                <span>Live Betting</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col">
                <Target className="h-5 w-5 mb-2" />
                <span>Parlay Builder</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col">
                <BarChart3 className="h-5 w-5 mb-2" />
                <span>Bet Analytics</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col">
                <Activity className="h-5 w-5 mb-2" />
                <span>Bet History</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </UnifiedLayout>
  )
}
