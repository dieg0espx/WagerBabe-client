/**
 * Casino Interface Component
 *
 * Main casino gaming interface that provides game selection, categories,
 * and casino lobby functionality. Handles casino game navigation and
 * integrates with game providers.
 */

"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/primitives"
import { Button } from "@/components/primitives"
import { Badge } from "@/components/primitives"
import { Input } from "@/components/primitives"
import { BettingCard } from "@/components/base"
import { cn } from "@/lib/utils"
import { CASINO_GAMES } from "@/lib/mock-data"
import {
  Dice1,
  Spade,
  Diamond,
  Search,
  Filter,
  Star,
  Zap
} from "lucide-react"

export interface CasinoInterfaceProps {
  className?: string
}

// Transform centralized casino games to match component interface
const transformedGames = CASINO_GAMES.map(game => ({
  id: game.id,
  name: game.name,
  category: game.category === "live" ? "Live Casino" :
           game.category === "table" ? "Table Games" :
           game.category === "slots" ? "Slots" :
           game.category === "jackpot" ? "Slots" : "Slots",
  provider: game.provider,
  image: game.image,
  isLive: game.category === "live",
  isFeatured: game.featured,
  players: game.players,
  jackpot: game.jackpot,
  minBet: game.minBet,
  maxBet: game.maxBet,
  rtp: game.rtp
}))

const CATEGORIES = [
  { id: "all", name: "All Games", icon: Dice1, count: 1200 },
  { id: "slots", name: "Slots", icon: Diamond, count: 800 },
  { id: "live", name: "Live Casino", icon: Zap, count: 45 },
  { id: "table", name: "Table Games", icon: Spade, count: 120 },
  { id: "jackpots", name: "Jackpots", icon: Star, count: 35 }
]

export function CasinoInterface({ className }: CasinoInterfaceProps) {
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredGames = transformedGames.filter(game => {
    const matchesCategory = selectedCategory === "all" || 
      game.category.toLowerCase().includes(selectedCategory)
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.provider.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className={cn("space-y-6", className)}>
      {/* Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Badge variant="secondary" className="w-fit">
            {transformedGames.length} Games Available
          </Badge>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => {
          const Icon = category.icon
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {category.name}
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            </Button>
          )
        })}
      </div>

      {/* Featured Games */}
      {selectedCategory === "all" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Featured Games
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {transformedGames.filter(game => game.isFeatured).map((game) => (
              <BettingCard
                key={game.id}
                variant="featured"
                interactive
                className="group cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="relative">
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={game.image}
                        alt={game.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    </div>
                    {game.isLive && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        LIVE
                      </Badge>
                    )}
                    {game.jackpot && (
                      <Badge className="absolute top-2 right-2 bg-yellow-500 text-black">
                        {game.jackpot}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{game.name}</h3>
                    <p className="text-sm text-muted-foreground">{game.provider}</p>
                    {game.players && (
                      <p className="text-xs text-muted-foreground">
                        {game.players} players
                      </p>
                    )}
                  </div>
                </div>
              </BettingCard>
            ))}
          </div>
        </div>
      )}

      {/* All Games Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {selectedCategory === "all" ? "All Games" : CATEGORIES.find(c => c.id === selectedCategory)?.name}
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            {filteredGames.length} games
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredGames.map((game) => (
            <Card key={game.id} className="group cursor-pointer hover:shadow-md transition-all">
              <CardContent className="p-3">
                <div className="space-y-2">
                  <div className="relative">
                    <div className="aspect-square rounded-lg overflow-hidden">
                      <img
                        src={game.image}
                        alt={game.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    </div>
                    {game.isLive && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm truncate">{game.name}</h4>
                    <p className="text-xs text-muted-foreground truncate">{game.provider}</p>
                    {game.rtp && (
                      <p className="text-xs text-green-600">RTP: {game.rtp}</p>
                    )}
                    {game.minBet && (
                      <p className="text-xs text-muted-foreground">
                        {game.minBet} - {game.maxBet}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* No Results */}
      {filteredGames.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No games found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or category filter
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
