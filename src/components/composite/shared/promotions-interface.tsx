/**
 * Promotions Interface Component
 *
 * Displays available promotions, bonuses, and special offers for users.
 * Handles promotion categories, eligibility, and claim functionality.
 */

"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives"
import { Button } from "@/components/primitives"
import { Badge } from "@/components/primitives"
import { BettingCard } from "@/components/base"
import { cn } from "@/lib/utils"
import {
  Gift,
  Star,
  Clock,
  Users,
  Trophy,
  Zap,
  Target,
  Calendar,
  CheckCircle,
  ArrowRight,
  Percent,
  DollarSign
} from "lucide-react"

export interface PromotionsInterfaceProps {
  className?: string
}

// Mock promotions data
const FEATURED_PROMOTIONS = [
  {
    id: "1",
    title: "Welcome Bonus",
    description: "Get 100% match on your first deposit up to $500",
    type: "deposit_match",
    value: "$500",
    percentage: 100,
    requirements: "Min deposit $20, 5x rollover",
    expiresAt: "2024-02-15T23:59:59Z",
    isFeatured: true,
    isEligible: true,
    category: "new_user"
  },
  {
    id: "2",
    title: "Free Bet Friday",
    description: "Place a $50 bet and get a $10 free bet",
    type: "free_bet",
    value: "$10",
    requirements: "Min bet $50 on any sport",
    expiresAt: "2024-01-19T23:59:59Z",
    isFeatured: true,
    isEligible: true,
    category: "weekly"
  },
  {
    id: "3",
    title: "Parlay Boost",
    description: "Get up to 50% profit boost on 4+ leg parlays",
    type: "odds_boost",
    value: "50%",
    requirements: "4+ selections, min odds -200 each",
    expiresAt: "2024-01-31T23:59:59Z",
    isFeatured: true,
    isEligible: true,
    category: "betting"
  }
]

const ALL_PROMOTIONS = [
  ...FEATURED_PROMOTIONS,
  {
    id: "4",
    title: "Refer a Friend",
    description: "Earn $25 for each friend you refer",
    type: "referral",
    value: "$25",
    requirements: "Friend must deposit and bet $100",
    expiresAt: null,
    isFeatured: false,
    isEligible: true,
    category: "referral"
  },
  {
    id: "5",
    title: "VIP Cashback",
    description: "Get 5% cashback on all losses",
    type: "cashback",
    value: "5%",
    requirements: "VIP status required",
    expiresAt: null,
    isFeatured: false,
    isEligible: false,
    category: "vip"
  },
  {
    id: "6",
    title: "Live Betting Bonus",
    description: "20% profit boost on live bets",
    type: "odds_boost",
    value: "20%",
    requirements: "Live bets only, max boost $50",
    expiresAt: "2024-01-25T23:59:59Z",
    isFeatured: false,
    isEligible: true,
    category: "live"
  }
]

const CATEGORIES = [
  { id: "all", name: "All Offers", icon: Gift, count: ALL_PROMOTIONS.length },
  { id: "new_user", name: "New User", icon: Star, count: 1 },
  { id: "weekly", name: "Weekly", icon: Calendar, count: 1 },
  { id: "betting", name: "Betting", icon: Target, count: 2 },
  { id: "vip", name: "VIP", icon: Trophy, count: 1 }
]

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(dateString))
}

function getPromotionIcon(type: string) {
  switch (type) {
    case 'deposit_match':
      return DollarSign
    case 'free_bet':
      return Gift
    case 'odds_boost':
      return Zap
    case 'cashback':
      return Percent
    case 'referral':
      return Users
    default:
      return Gift
  }
}

function getPromotionColor(type: string) {
  switch (type) {
    case 'deposit_match':
      return 'bg-green-500'
    case 'free_bet':
      return 'bg-blue-500'
    case 'odds_boost':
      return 'bg-yellow-500'
    case 'cashback':
      return 'bg-purple-500'
    case 'referral':
      return 'bg-pink-500'
    default:
      return 'bg-gray-500'
  }
}

export function PromotionsInterface({ className }: PromotionsInterfaceProps) {
  const [selectedCategory, setSelectedCategory] = React.useState("all")

  const filteredPromotions = ALL_PROMOTIONS.filter(promo =>
    selectedCategory === "all" || promo.category === selectedCategory
  )

  return (
    <div className={cn("space-y-6 space-y-6 h-[calc(100vh-160px)] overflow-y-auto scrollbar-hide pb-[100px]")}>
      {/* Available Offers Badge */}
      <div className="flex justify-end">
        <Badge variant="secondary" className="w-fit">
          {ALL_PROMOTIONS.filter(p => p.isEligible).length} Available Offers
        </Badge>
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

      {/* Featured Promotions */}
      {selectedCategory === "all" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Featured Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_PROMOTIONS.map((promo) => {
              const Icon = getPromotionIcon(promo.type)
              const iconColor = getPromotionColor(promo.type)

              return (
                <BettingCard key={promo.id} variant="featured" className="group">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className={cn("p-3 rounded-full text-white", iconColor)}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <Badge variant="secondary">Featured</Badge>
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{promo.title}</h3>
                        <p className="text-sm text-muted-foreground">{promo.description}</p>
                      </div>

                      {/* Value */}
                      <div className="text-center py-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{promo.value}</div>
                        <div className="text-xs text-muted-foreground">Bonus Value</div>
                      </div>

                      {/* Requirements */}
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">
                          <strong>Requirements:</strong> {promo.requirements}
                        </div>
                        {promo.expiresAt && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            Expires {formatDate(promo.expiresAt)}
                          </div>
                        )}
                      </div>

                      {/* Action */}
                      <Button
                        className="w-full"
                        disabled={!promo.isEligible}
                      >
                        {promo.isEligible ? (
                          <>
                            Claim Offer
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Not Eligible
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </BettingCard>
              )
            })}
          </div>
        </div>
      )}

      {/* All Promotions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {selectedCategory === "all" ? "All Promotions" : CATEGORIES.find(c => c.id === selectedCategory)?.name}
        </h2>

        <div className="space-y-4">
          {filteredPromotions.map((promo) => {
            const Icon = getPromotionIcon(promo.type)
            const iconColor = getPromotionColor(promo.type)

            return (
              <Card key={promo.id} className="group hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={cn("p-3 rounded-full text-white flex-shrink-0", iconColor)}>
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{promo.title}</h3>
                          <p className="text-sm text-muted-foreground">{promo.description}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="text-right">
                            <div className="font-bold text-primary">{promo.value}</div>
                            <div className="text-xs text-muted-foreground">Value</div>
                          </div>
                          {promo.isFeatured && (
                            <Badge variant="secondary">Featured</Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">
                            <strong>Requirements:</strong> {promo.requirements}
                          </div>
                          {promo.expiresAt && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              Expires {formatDate(promo.expiresAt)}
                            </div>
                          )}
                        </div>

                        <Button
                          size="sm"
                          disabled={!promo.isEligible}
                        >
                          {promo.isEligible ? "Claim" : "Not Eligible"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* No Results */}
      {filteredPromotions.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No promotions found</h3>
            <p className="text-muted-foreground">
              Try selecting a different category
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
