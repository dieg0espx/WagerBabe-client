"use client"

import * as React, { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { UnifiedLayout } from "@/components/layout"
import { SportsBettingContent } from "@/components/composite/sports"

// Sport emoji mapping
const SPORT_EMOJIS: Record<string, string> = {
  football: "🏈",
  basketball: "🏀",
  baseball: "⚾",
  hockey: "🏒",
  soccer: "⚽",
  tennis: "🎾",
  golf: "⛳",
  mma: "🥊",
  boxing: "🥊",
  "auto-racing": "🏎️",
  cricket: "🏏",
  rugby: "🏉"
}

function SportsbookContent() {
  const searchParams = useSearchParams()
  const sport = searchParams.get('sport')
  const league = searchParams.get('league')

  // Default title and subtitle
  let title = "Sports Betting"
  let subtitle = "Place your bets on MLB games and more"

  // Update title and subtitle based on sport and league
  if (sport && league) {
    const sportEmoji = SPORT_EMOJIS[sport] || "🏈"
    title = `${sportEmoji} ${league.toUpperCase()} Betting`
    subtitle = `Place your bets on ${league} games`
  } else if (sport) {
    const sportEmoji = SPORT_EMOJIS[sport] || "🏈"
    const sportName = sport.charAt(0).toUpperCase() + sport.slice(1)
    title = `${sportEmoji} ${sportName} Betting`
    subtitle = `Place your bets on ${sportName} games`
  }

  return (
    <UnifiedLayout 
      title={title}
      subtitle={subtitle}
      fullWidth={true}
      className="p-0"
    >
      <SportsBettingContent className="h-[calc(100vh-8rem)]" />
    </UnifiedLayout>
  )
}

export default function SportsbookPage() {
  return (
    <Suspense fallback={
      <UnifiedLayout 
        title="Sports Betting"
        subtitle="Place your bets on MLB games and more"
        fullWidth={true}
        className="p-0"
      >
        <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading sports betting interface...</p>
          </div>
        </div>
      </UnifiedLayout>
    }>
      <SportsbookContent />
    </Suspense>
  )
}
