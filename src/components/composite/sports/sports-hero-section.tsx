"use client"

import { Card, CardContent } from "@/components/primitives"
import { Button } from "@/components/primitives"
import { Badge } from "@/components/primitives"
import { TrendingUp, Users, Trophy, Zap } from "lucide-react"

interface SportsHeroSectionProps {
  className?: string
  onRefresh?: () => void
  isRefreshing?: boolean
}

export function SportsHeroSection({ 
  className = "",
  onRefresh,
  isRefreshing = false 
}: SportsHeroSectionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Hero Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Live Sports Betting
        </h1>
        <p className="text-muted-foreground text-lg">
          Enter your stake amount in the input fields below each odds to add bets to your slip
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-foreground">150+</div>
            <div className="text-sm text-muted-foreground">Live Games</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-foreground">12.4K</div>
            <div className="text-sm text-muted-foreground">Active Bettors</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-foreground">$2.1M</div>
            <div className="text-sm text-muted-foreground">Daily Volume</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Zap className="h-5 w-5 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-foreground">98.2%</div>
            <div className="text-sm text-muted-foreground">Payout Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Promotions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="absolute top-2 right-2">
                <Badge className="bg-white text-blue-600">NEW</Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">Welcome Bonus</h3>
              <p className="text-blue-100 mb-4">
                Get 100% match on your first deposit up to $500
              </p>
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Claim Now
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
              <div className="absolute top-2 right-2">
                <Badge className="bg-white text-green-600">HOT</Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">Parlay Boost</h3>
              <p className="text-green-100 mb-4">
                Get up to 50% profit boost on 4+ leg parlays
              </p>
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-white text-green-600 hover:bg-green-50"
              >
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
