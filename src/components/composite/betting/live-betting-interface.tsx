"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/primitives/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives/card"
import { Button } from "@/components/primitives/button"
import { Badge } from "@/components/primitives/badge"
import { Grid, Stack, Flex } from "@/components/primitives/layout"
import { Loading } from "@/components/primitives/loading"
import { InlineBetInput, type BetSelection } from "./inline-bet-input"
import { Zap, Clock, RefreshCw, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import { useBetting, BetSelection as ContextBetSelection } from "@/contexts/betting-context"

interface LiveGame {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  quarter: string
  timeRemaining: string
  sport: string
  league: string
  status: "live" | "halftime" | "final"
  lastUpdate: string
}

interface LiveMarket {
  id: string
  gameId: string
  type: "spread" | "moneyline" | "total"
  homeOdds: string
  awayOdds: string
  line?: string
  total?: string
}

// Mock live games data
const mockLiveGames: LiveGame[] = [
  {
    id: "game-1",
    homeTeam: "Lakers",
    awayTeam: "Warriors",
    homeScore: 78,
    awayScore: 82,
    quarter: "3rd Qtr",
    timeRemaining: "8:45",
    sport: "basketball",
    league: "NBA",
    status: "live",
    lastUpdate: new Date().toISOString()
  },
  {
    id: "game-2",
    homeTeam: "Cowboys",
    awayTeam: "Giants",
    homeScore: 14,
    awayScore: 10,
    quarter: "2nd Qtr",
    timeRemaining: "3:22",
    sport: "football",
    league: "NFL",
    status: "live",
    lastUpdate: new Date().toISOString()
  },
  {
    id: "game-3",
    homeTeam: "Celtics",
    awayTeam: "Heat",
    homeScore: 45,
    awayScore: 38,
    quarter: "Halftime",
    timeRemaining: "",
    sport: "basketball",
    league: "NBA",
    status: "halftime",
    lastUpdate: new Date().toISOString()
  }
]

// Mock live markets data
const mockLiveMarkets: LiveMarket[] = [
  {
    id: "market-1",
    gameId: "game-1",
    type: "spread",
    homeOdds: "-110",
    awayOdds: "-110",
    line: "Lakers -2.5"
  },
  {
    id: "market-2",
    gameId: "game-1",
    type: "moneyline",
    homeOdds: "-125",
    awayOdds: "+105"
  },
  {
    id: "market-3",
    gameId: "game-1",
    type: "total",
    homeOdds: "-110",
    awayOdds: "-110",
    total: "O/U 215.5"
  }
]

function LiveGameCard({ 
  game, 
  markets, 
  onAddWager 
}: { 
  game: LiveGame
  markets: LiveMarket[]
  onAddWager: (selection: BetSelection, amount: number) => void
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "live": return "bg-red-500"
      case "halftime": return "bg-yellow-500"
      case "final": return "bg-gray-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusText = (game: LiveGame) => {
    if (game.status === "halftime") return "Halftime"
    if (game.status === "final") return "Final"
    return `${game.quarter} ${game.timeRemaining}`
  }

  const createBetSelection = (market: LiveMarket, team: "home" | "away"): BetSelection => {
    const isHome = team === "home"
    const teamName = isHome ? game.homeTeam : game.awayTeam
    const odds = isHome ? market.homeOdds : market.awayOdds
    
    let selection = ""
    switch (market.type) {
      case "moneyline":
        selection = `${teamName} ML`
        break
      case "spread":
        selection = market.line || `${teamName} Spread`
        break
      case "total":
        selection = market.total || "Total"
        break
    }

    return {
      id: `${market.id}-${team}`,
      gameTitle: `${game.awayTeam} @ ${game.homeTeam}`,
      teamName,
      marketType: market.type.charAt(0).toUpperCase() + market.type.slice(1),
      selection,
      odds,
      gameTime: getStatusText(game),
      league: game.league
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <Flex justify="between" align="center">
          <div>
            <CardTitle className="text-lg">
              {game.awayTeam} @ {game.homeTeam}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {game.league}
              </Badge>
              <div className={cn("w-2 h-2 rounded-full", getStatusColor(game.status))} />
              <span className="text-xs text-muted-foreground">
                {getStatusText(game)}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </Flex>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Score */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-8">
            <div className="text-center">
              <p className="text-sm font-medium">{game.awayTeam}</p>
              <p className="text-2xl font-bold">{game.awayScore}</p>
            </div>
            <div className="text-muted-foreground">vs</div>
            <div className="text-center">
              <p className="text-sm font-medium">{game.homeTeam}</p>
              <p className="text-2xl font-bold">{game.homeScore}</p>
            </div>
          </div>
        </div>

        {/* Markets */}
        <div className="space-y-3">
          {markets.map((market) => (
            <div key={market.id} className="space-y-2">
              <h4 className="text-sm font-medium capitalize">{market.type}</h4>
              <Grid cols={2} gap={2}>
                <Button
                  variant="outline"
                  className="h-auto p-3 flex flex-col items-center"
                  onClick={() => {
                    const selection = createBetSelection(market, "away")
                    // For demo, we'll show the inline bet input in a modal or drawer
                    // For now, just add with a default amount
                    onAddWager(selection, 50)
                  }}
                >
                  <span className="text-xs">{game.awayTeam}</span>
                  <span className="font-bold">{market.awayOdds}</span>
                  {market.line && market.type === "spread" && (
                    <span className="text-xs text-muted-foreground">
                      {market.line.includes(game.awayTeam) ? market.line : `+${Math.abs(parseFloat(market.line.split(' ')[1]))}`}
                    </span>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-3 flex flex-col items-center"
                  onClick={() => {
                    const selection = createBetSelection(market, "home")
                    onAddWager(selection, 50)
                  }}
                >
                  <span className="text-xs">{game.homeTeam}</span>
                  <span className="font-bold">{market.homeOdds}</span>
                  {market.line && market.type === "spread" && (
                    <span className="text-xs text-muted-foreground">
                      {market.line.includes(game.homeTeam) ? market.line : `-${Math.abs(parseFloat(market.line.split(' ')[1]))}`}
                    </span>
                  )}
                </Button>
              </Grid>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function LiveBettingInterface() {
  const { addSelection } = useBetting()
  const [activeTab, setActiveTab] = useState("all")
  const [liveGames, setLiveGames] = useState<LiveGame[]>([])
  const [liveMarkets, setLiveMarkets] = useState<LiveMarket[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Mock data loading and live updates
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setLiveGames(mockLiveGames)
      setLiveMarkets(mockLiveMarkets)
      setIsLoading(false)
    }

    loadData()

    // Simulate live updates every 5 seconds
    const interval = setInterval(() => {
      setLastUpdate(new Date())
      // In a real app, this would fetch updated scores and odds
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleAddWager = (selection: BetSelection, amount: number) => {
    // Convert to context format and add to betting context
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
      isLive: true
    }
    
    addSelection(contextSelection)
    alert(`Added ${selection.selection} for $${amount} to bet slip!`)
  }

  const filteredGames = liveGames.filter(game => {
    if (activeTab === "all") return true
    return game.sport === activeTab
  })

  const getMarketsForGame = (gameId: string) => {
    return liveMarkets.filter(market => market.gameId === gameId)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Loading fullScreen text="Loading live games..." showText />
      </div>
    )
  }

  return (
    <div className="space-y-6 h-[calc(100vh-160px)] overflow-y-auto scrollbar-hide pb-[100px]">
      {/* Live Status and Last Update */}
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="animate-pulse">
          <Activity className="h-3 w-3 mr-1" />
          LIVE
        </Badge>
        <div className="text-sm text-muted-foreground">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </div>
      </div>

      {/* Sport Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Sports</TabsTrigger>
          <TabsTrigger value="basketball">Basketball</TabsTrigger>
          <TabsTrigger value="football">Football</TabsTrigger>
          <TabsTrigger value="baseball">Baseball</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredGames.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-lg mb-2">No live games</h3>
                <p className="text-muted-foreground">
                  Check back later for live betting opportunities
                </p>
              </CardContent>
            </Card>
          ) : (
            <Grid cols={1} gap={6} className="lg:grid-cols-2">
              {filteredGames.map((game) => (
                <LiveGameCard
                  key={game.id}
                  game={game}
                  markets={getMarketsForGame(game.id)}
                  onAddWager={handleAddWager}
                />
              ))}
            </Grid>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
