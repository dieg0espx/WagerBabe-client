"use client"

import { Card, CardContent } from "@/components/primitives"
import { Button } from "@/components/primitives"
import { Badge } from "@/components/primitives"
import { Trophy, Users, Star } from "lucide-react"
import { CasinoGame } from "@/lib/mock-data"

interface CasinoGameCardProps {
  game: CasinoGame
  onPlay?: (gameId: string) => void
  variant?: "default" | "featured" | "compact"
  showStats?: boolean
}

export function CasinoGameCard({ 
  game, 
  onPlay, 
  variant = "default",
  showStats = true 
}: CasinoGameCardProps) {
  const handlePlay = () => {
    onPlay?.(game.id)
  }

  const isCompact = variant === "compact"
  const isFeatured = variant === "featured"

  return (
    <Card 
      className={`
        group cursor-pointer hover:shadow-lg transition-all duration-300
        ${isFeatured ? "border-yellow-200 bg-yellow-50/50 shadow-md" : ""}
        ${isCompact ? "h-auto" : ""}
      `}
    >
      <CardContent className="p-0">
        {/* Game Image */}
        <div className={`
          relative overflow-hidden rounded-t-lg
          ${isCompact ? "aspect-square" : "aspect-video"}
        `}>
          <img
            src={game.image}
            alt={game.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {game.featured && (
              <Badge className="bg-yellow-500 text-yellow-900 animate-pulse">
                <Star className="h-3 w-3 mr-1" />
                FEATURED
              </Badge>
            )}
            {game.new && (
              <Badge variant="destructive">
                NEW
              </Badge>
            )}
            {game.category === "live" && (
              <Badge variant="destructive" className="animate-pulse">
                LIVE
              </Badge>
            )}
            {game.jackpot && (
              <Badge className="bg-yellow-500 text-yellow-900 animate-pulse">
                <Trophy className="h-3 w-3 mr-1" />
                JACKPOT
              </Badge>
            )}
          </div>
        </div>

        {/* Game Info */}
        <div className={`p-4 ${isCompact ? "p-3" : ""}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`font-semibold truncate ${isCompact ? "text-sm" : ""}`}>
              {game.name}
            </h3>
            <Badge variant="outline" className={isCompact ? "text-xs" : ""}>
              {game.provider}
            </Badge>
          </div>

          {/* Game Stats */}
          {showStats && !isCompact && (
            <div className="space-y-2 mb-3">
              {game.jackpot && (
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-bold text-yellow-600">{game.jackpot}</span>
                </div>
              )}
              
              {game.rtp && (
                <div className="text-xs text-muted-foreground">
                  RTP: {game.rtp}
                </div>
              )}
              
              {game.players && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{game.players} playing</span>
                </div>
              )}
              
              {game.minBet && game.maxBet && (
                <div className="text-xs text-muted-foreground">
                  Limits: {game.minBet} - {game.maxBet}
                </div>
              )}
            </div>
          )}

          {/* Play Button */}
          <Button
            className={`
              w-full transition-all duration-200
              ${isFeatured ? "bg-yellow-500 hover:bg-yellow-600 text-yellow-900" : ""}
              ${isCompact ? "text-sm py-2" : ""}
            `}
            onClick={handlePlay}
          >
            {game.category === "live" ? "Join Table" : 
             game.jackpot ? "Play for Jackpot" : "Play Now"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
