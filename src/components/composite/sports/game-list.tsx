/**
 * Game List - Modernized composite component for displaying a list of games
 * Updated with new styling system and clean architecture
 */

import * as React from "react"
import { GameCard } from "./game-card"
import { BettingButton, BettingCard, StatusBadge } from "@/components/base"
import { Alert, AlertDescription } from "@/components/primitives"
import { Loader2, AlertCircle, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

// Game interface matching the simplified GameCard
interface Game {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
  status: "upcoming" | "live" | "final"
  startTime?: string
  league: string
  sport?: string
  odds?: {
    homeWin: number
    awayWin: number
    spread?: {
      line: number
      homeOdds: number
      awayOdds: number
    }
    total?: {
      line: number
      overOdds: number
      underOdds: number
    }
  }
}

interface GameListProps {
  games?: Game[]
  loading?: boolean
  error?: string | null
  onRefresh?: () => void
  onBetClick?: (gameId: string, betType: string, odds: number, team?: string) => void
  title?: string
  className?: string
}

// Mock data for demonstration
const mockGames: Game[] = [
  {
    id: "1",
    sport: "basketball",
    league: "NBA",
    homeTeam: "Lakers",
    awayTeam: "Warriors",
    status: "upcoming",
    startTime: "2024-01-15T20:00:00Z",
    odds: {
      homeWin: -110,
      awayWin: +120,
      spread: {
        line: -2.5,
        homeOdds: -110,
        awayOdds: -110
      },
      total: {
        line: 225.5,
        overOdds: -110,
        underOdds: -110
      }
    }
  },
  {
    id: "2",
    sport: "football",
    league: "NFL",
    homeTeam: "Chiefs",
    awayTeam: "Bills",
    status: "live",
    homeScore: 14,
    awayScore: 7,
    startTime: "2024-01-15T18:00:00Z",
    odds: {
      homeWin: -150,
      awayWin: +130,
      spread: {
        line: -3.5,
        homeOdds: -110,
        awayOdds: -110
      },
      total: {
        line: 47.5,
        overOdds: -105,
        underOdds: -115
      }
    }
  },
  {
    id: "3",
    sport: "baseball",
    league: "MLB",
    homeTeam: "Dodgers",
    awayTeam: "Yankees",
    status: "final",
    homeScore: 8,
    awayScore: 3,
    startTime: "2024-01-15T16:00:00Z",
    odds: {
      homeWin: +105,
      awayWin: -125
    }
  }
]

export function GameList({
  games = mockGames,
  loading = false,
  error = null,
  onRefresh,
  onBetClick,
  title = "Today's Games",
  className
}: GameListProps) {
  const [refreshing, setRefreshing] = React.useState(false)

  const handleRefresh = async () => {
    if (onRefresh) {
      setRefreshing(true)
      await onRefresh()
      setRefreshing(false)
    }
  }

  const handleBetClick = (game: Game) => (betType: string, odds: number, team?: string) => {
    onBetClick?.(game.id, betType, odds, team)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin mr-3 text-primary" />
        <span className="text-muted-foreground">Loading games...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}. Please try refreshing the page.
          </AlertDescription>
        </Alert>
        <div className="flex justify-center">
          <BettingButton
            onClick={handleRefresh}
            variant="sportsbook"
            size="sm"
            disabled={refreshing}
            loading={refreshing}
            className="flex items-center gap-2"
          >
            {!refreshing && <RefreshCw className="h-4 w-4" />}
            Retry
          </BettingButton>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("w-full max-w-full space-y-4 sm:space-y-6 overflow-x-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h2>
          <StatusBadge status="settled" size="sm" className="font-mono">
            {games.length} GAMES
          </StatusBadge>
        </div>

        {onRefresh && (
          <BettingButton
            onClick={handleRefresh}
            variant="sportsbook"
            size="sm"
            disabled={refreshing}
            loading={refreshing}
            className="flex items-center gap-2"
          >
            {!refreshing && <RefreshCw className="h-4 w-4" />}
            Refresh
          </BettingButton>
        )}
      </div>

      {/* Bet Type Selector */}
      <BettingCard variant="default" size="sm" className="p-1 sm:p-2">
        <div className="flex w-full gap-1 overflow-x-auto">
          {["STRAIGHT", "PARLAY", "TEASER", "IF BET", "REVERSE"].map((betType, index) => (
            <BettingButton
              key={betType}
              variant={index === 0 ? "sportsbook" : "cashout"}
              size="xs"
              className={cn(
                "font-mono text-xs uppercase tracking-wider flex-shrink-0 min-w-[60px] sm:min-w-[70px]",
                index !== 0 && "opacity-60 hover:opacity-100"
              )}
            >
              {betType}
            </BettingButton>
          ))}
        </div>
      </BettingCard>

      {/* Games List */}
      {games.length === 0 ? (
        <BettingCard variant="default" size="lg" className="text-center py-12">
          <p className="text-lg font-medium text-muted-foreground mb-2">No games available</p>
          <p className="text-sm text-muted-foreground">Check back later for upcoming games</p>
        </BettingCard>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onBetClick={handleBetClick(game)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export type { GameListProps, Game }
