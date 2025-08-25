"use client"



import { UnifiedLayout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives"
import { Button } from "@/components/primitives"
import { Input } from "@/components/primitives"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/primitives"
import {
  Search,
  Star,
  Trophy,
  Dice1,
  Spade,
  Crown,
  Users,
  Gift,
  Filter
} from "lucide-react"
import { CASINO_GAMES, PROMO_IMAGES } from "@/lib/mock-data"
import { CasinoGameCard } from "@/components/composite/casino"


// Game categories with actual counts from our data
const GAME_CATEGORIES = [
  { id: "all", name: "All Games", count: CASINO_GAMES.length, icon: Crown },
  { id: "slots", name: "Slots", count: CASINO_GAMES.filter(g => g.category === "slots").length, icon: Dice1 },
  { id: "table", name: "Table Games", count: CASINO_GAMES.filter(g => g.category === "table").length, icon: Spade },
  { id: "live", name: "Live Dealer", count: CASINO_GAMES.filter(g => g.category === "live").length, icon: Users },
  { id: "jackpot", name: "Jackpots", count: CASINO_GAMES.filter(g => g.category === "jackpot").length, icon: Trophy },
  { id: "new", name: "New Games", count: CASINO_GAMES.filter(g => g.new).length, icon: Star }
]

// Use featured games from centralized casino data
const FEATURED_GAMES = CASINO_GAMES.filter(game => game.featured)



export default function CasinoPage() {
  const handleGameClick = (gameId: string) => {
    // Implement game launch functionality
    console.log("Launching game:", gameId)
  }

  const handleSearch = (query: string) => {
    // Implement search functionality
    console.log("Searching for:", query)
  }

  return (
    <UnifiedLayout
      title="Casino Games"
      subtitle="Premium gaming experience with hundreds of slots, table games, and live dealers"
      showBreadcrumbs
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Casino" }
      ]}
      showRefresh
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button size="sm">
            <Gift className="h-4 w-4 mr-2" />
            Promotions
          </Button>
        </div>
      }
    >
      <div className="space-y-6 h-[calc(100vh-160px)] overflow-y-auto scrollbar-hide pb-[100px]">
        {/* Casino Hero Banner */}
        <Card className="overflow-hidden border-0 shadow-2xl">
          <CardContent className="p-0">
            <div className="relative group">
              <img
                src={PROMO_IMAGES.casinoHeader}
                alt="Casino Games"
                className="w-full h-[500px] object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
             
              
              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-20 right-20 w-16 h-16 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-300"></div>
                <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-700"></div>
              </div>
              
              {/* Main content with enhanced styling */}
              <div className="absolute inset-0 p-8 flex items-center justify-center text-white">
                <div className="text-center max-w-4xl mx-auto">
                  {/* Animated badge */}
                  <div className="inline-flex items-center gap-2 bg-yellow-500/90 backdrop-blur-sm text-yellow-900 px-4 py-2 rounded-full mb-6 animate-bounce">
                    <Trophy className="h-4 w-4" />
                    <span className="font-semibold text-sm">🎰 LIVE CASINO</span>
                  </div>
                  
                  {/* Enhanced title with gradient text */}
                  <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-yellow-400 via-white to-purple-400 bg-clip-text text-transparent animate-pulse">
                    Premium Casino Experience
                  </h2>
                  
                  {/* Enhanced subtitle */}
                  <p className="text-xl md:text-2xl text-white/95 mb-8 font-medium leading-relaxed">
                    Play hundreds of slots, table games, and live dealer games with 
                    <span className="text-yellow-400 font-bold"> massive jackpots</span>
                  </p>
                  
                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-yellow-900 font-bold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Dice1 className="h-5 w-5 mr-2" />
                      Play Now
                    </Button>
                    <Button 
                      size="lg"
                      className="text-white px-8 py-3 text-lg font-semibold transition-all duration-300 shadow-lg bg-trasparent bg-black" 
                    >
                      <Trophy className="h-5 w-5 mr-2" />
                      View Jackpots
                    </Button>
                  </div>
                  
                  {/* Live stats */}
                  <div className="flex justify-center items-center gap-8 mt-8 text-white/80">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">1,247 players online</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-medium">$12.4M in jackpots</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Quick Stats */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search games, providers, or categories..."
              className="pl-10"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>1,247 players online</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span>$12.4M in jackpots</span>
            </div>
          </div>
        </div>

        {/* Game Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5" />
              Game Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {GAME_CATEGORIES.map((category) => {
                const IconComponent = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={category.id === "all" ? "default" : "outline"}
                    className="flex flex-col h-auto py-4"
                  >
                    <IconComponent className="h-5 w-5 mb-2" />
                    <span className="font-medium">{category.name}</span>
                    <span className="text-xs text-muted-foreground">{category.count} games</span>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Promotions Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={PROMO_IMAGES.promo1}
                  alt="Casino Welcome Promotion"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 p-4 flex items-center justify-between text-white">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">🎉 Welcome Bonus!</h3>
                    <p className="text-white/90 text-sm">100% match up to $500 + 200 spins</p>
                  </div>
                  <Button size="sm" className="bg-white text-black hover:bg-white/90">
                    <Gift className="h-4 w-4 mr-2" />
                    Claim
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={PROMO_IMAGES.promo2}
                  alt="Weekly Reload Bonus"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 p-4 flex items-center justify-between text-white">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">🔄 Weekly Reload</h3>
                    <p className="text-white/90 text-sm">50% bonus every weekend up to $250</p>
                  </div>
                  <Button size="sm" className="bg-white text-black hover:bg-white/90">
                    <Gift className="h-4 w-4 mr-2" />
                    Reload
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={PROMO_IMAGES.promo5}
                  alt="Casino Package Bonus"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 p-4 flex items-center justify-between text-white">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">🎰 Casino Package</h3>
                    <p className="text-white/90 text-sm">Up to $1,000 + 100 free spins</p>
                  </div>
                  <Button size="sm" className="bg-white text-black hover:bg-white/90">
                    <Gift className="h-4 w-4 mr-2" />
                    Get
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Casino Interface */}
        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="featured" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Featured
            </TabsTrigger>
            <TabsTrigger value="slots" className="flex items-center gap-2">
              <Dice1 className="h-4 w-4" />
              Slots
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center gap-2">
              <Spade className="h-4 w-4" />
              Table
            </TabsTrigger>
            <TabsTrigger value="live" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Live
            </TabsTrigger>
            <TabsTrigger value="jackpots" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Jackpots
            </TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-6">
            {/* Featured Games Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURED_GAMES.map((game) => (
                <CasinoGameCard
                  key={game.id}
                  game={game}
                  onPlay={handleGameClick}
                  variant="featured"
                  showStats={true}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="slots" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CASINO_GAMES.filter(game => game.category === "slots").map((game) => (
                <CasinoGameCard
                  key={game.id}
                  game={game}
                  onPlay={handleGameClick}
                  variant="default"
                  showStats={true}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="table" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CASINO_GAMES.filter(game => game.category === "table").map((game) => (
                <CasinoGameCard
                  key={game.id}
                  game={game}
                  onPlay={handleGameClick}
                  variant="default"
                  showStats={true}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="live" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CASINO_GAMES.filter(game => game.category === "live").map((game) => (
                <CasinoGameCard
                  key={game.id}
                  game={game}
                  onPlay={handleGameClick}
                  variant="default"
                  showStats={true}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="jackpots" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CASINO_GAMES.filter(game => game.category === "jackpot").map((game) => (
                <CasinoGameCard
                  key={game.id}
                  game={game}
                  onPlay={handleGameClick}
                  variant="featured"
                  showStats={true}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{CASINO_GAMES.length}</div>
              <div className="text-sm text-muted-foreground">Total Games</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {CASINO_GAMES.filter(game => game.category === "live").length}
              </div>
              <div className="text-sm text-muted-foreground">Live Tables</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">$24.6M</div>
              <div className="text-sm text-muted-foreground">Jackpot Pool</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {CASINO_GAMES.filter(game => game.players).reduce((sum, game) => sum + (game.players || 0), 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Players Online</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </UnifiedLayout>
  )
}
