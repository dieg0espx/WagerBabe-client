"use client"

import { UnifiedLayout } from "@/components/layout"
import { GameList } from "@/components/composite/sports"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives"
import { Button } from "@/components/primitives"
import { Badge } from "@/components/primitives"
import { Input } from "@/components/primitives"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/primitives"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/primitives"
import {
  Search,
  Filter,
  TrendingUp,
  Clock,
  Star,
  Trophy,
  Calendar,
  MapPin,
  Users,
  Zap
} from "lucide-react"
import { MOCK_GAMES } from "@/lib/mock-data"

// Mock data for sports categories and leagues
const SPORTS_CATEGORIES = [
  { id: "all", name: "All Sports", count: 156 },
  { id: "football", name: "Football", count: 45 },
  { id: "basketball", name: "Basketball", count: 38 },
  { id: "baseball", name: "Baseball", count: 28 },
  { id: "hockey", name: "Hockey", count: 22 },
  { id: "soccer", name: "Soccer", count: 18 },
  { id: "tennis", name: "Tennis", count: 5 }
]

const POPULAR_LEAGUES = [
  { id: "nfl", name: "NFL", sport: "football", games: 16, live: 3 },
  { id: "nba", name: "NBA", sport: "basketball", games: 12, live: 2 },
  { id: "mlb", name: "MLB", sport: "baseball", games: 15, live: 4 },
  { id: "nhl", name: "NHL", sport: "hockey", games: 8, live: 1 },
  { id: "epl", name: "Premier League", sport: "soccer", games: 6, live: 0 },
  { id: "ncaaf", name: "College Football", sport: "football", games: 24, live: 5 }
]

// Use featured games from centralized mock data
const FEATURED_GAMES = MOCK_GAMES.filter(game => game.featured)

export default function SportsPage() {
  const handleSearch = (query: string) => {
    // Implement search functionality
    console.log("Searching for:", query)
  }

  const handleFilterChange = (filter: string, value: string) => {
    // Implement filter functionality
    console.log("Filter changed:", filter, value)
  }

  const handleBetClick = (gameId: string, betType: string, odds: number, team?: string) => {
    // Implement bet click functionality
    console.log("Bet clicked:", { gameId, betType, odds, team })
  }

  return (
    <UnifiedLayout
      title="Sports Betting"
      subtitle="Live odds, expert insights, and comprehensive sports coverage"
      showBreadcrumbs
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Sports" }
      ]}
      showRefresh
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button size="sm">
            <Star className="h-4 w-4 mr-2" />
            Favorites
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Search and Quick Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search teams, leagues, or games..."
              className="pl-10"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select onValueChange={(value) => handleFilterChange("sport", value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Sports" />
              </SelectTrigger>
              <SelectContent>
                {SPORTS_CATEGORIES.map((sport) => (
                  <SelectItem key={sport.id} value={sport.id}>
                    {sport.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilterChange("time", value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="live">Live Now</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Sports Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Sports Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {SPORTS_CATEGORIES.map((sport) => (
                <Button
                  key={sport.id}
                  variant={sport.id === "all" ? "default" : "outline"}
                  className="flex flex-col h-auto py-3"
                >
                  <span className="font-medium">{sport.name}</span>
                  <span className="text-xs text-muted-foreground">{sport.count} games</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="featured" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Featured
            </TabsTrigger>
            <TabsTrigger value="live" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Live
            </TabsTrigger>
            <TabsTrigger value="today" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Today
            </TabsTrigger>
            <TabsTrigger value="leagues" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Leagues
            </TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-6">
            {/* Featured Games */}
            <GameList
              games={FEATURED_GAMES}
              onBetClick={handleBetClick}
              title="Featured Games"
            />
          </TabsContent>

          <TabsContent value="live" className="space-y-6">
            {/* Live Games */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="border-red-200 bg-red-50/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="destructive" className="animate-pulse">
                      LIVE
                    </Badge>
                    <span className="text-sm text-muted-foreground">Q3 8:42</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Lakers</span>
                      <span className="text-xl font-bold">98</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Warriors</span>
                      <span className="text-xl font-bold">102</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        LAL +2.5
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        GSW -2.5
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="today" className="space-y-6">
            {/* Today's Games */}
            <GameList
              games={FEATURED_GAMES}
              onBetClick={handleBetClick}
              title="Today's Games"
            />
          </TabsContent>

          <TabsContent value="leagues" className="space-y-6">
            {/* Popular Leagues */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Leagues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {POPULAR_LEAGUES.map((league) => (
                    <div key={league.id} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{league.name}</h3>
                        <Badge variant="outline">{league.sport}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {league.games} games
                        </span>
                        {league.live > 0 && (
                          <span className="flex items-center gap-1 text-red-600">
                            <Zap className="h-3 w-3" />
                            {league.live} live
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">156</div>
              <div className="text-sm text-muted-foreground">Total Games</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">12</div>
              <div className="text-sm text-muted-foreground">Live Now</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">89</div>
              <div className="text-sm text-muted-foreground">Today</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">55</div>
              <div className="text-sm text-muted-foreground">Tomorrow</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </UnifiedLayout>
  )
}
