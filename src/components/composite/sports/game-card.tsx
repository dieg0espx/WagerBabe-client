/**
 * Game Card - Simplified with mock data and new styling system
 * Updated with Poppins font, OKLCH colors, and clean Tailwind utilities
 */

"use client"

import * as React from "react"
import {
  SportsGameCard,
  SportsTeamDisplay,
  SportsBetButton,
  SportsGameCardDesktopLayout,
  SportsGameCardMobileLayout
} from "@/components/base"
import { cn } from "@/lib/utils"

// Simplified interface using mock data structure
export interface GameCardProps {
  game: {
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
  onBetClick?: (betType: string, odds: number, team?: string) => void
  className?: string
}



export function GameCard({ game, onBetClick, className }: GameCardProps) {
  const isLive = game.status === "live"
  const isFinal = game.status === "final"



  return (
    <SportsGameCard
      variant={game.status === "live" ? "live" : game.status === "final" ? "final" : "default"}
      size="compact"
      timeDisplay={game.startTime}
      status={game.status}
      className={cn("w-full max-w-full overflow-x-hidden", className)}
      role="article"
      aria-label={`${game.awayTeam} vs ${game.homeTeam} - ${game.league} ${game.status} game`}
    >
        {/* Desktop Layout - Hidden on Mobile */}
        <SportsGameCardDesktopLayout className="hidden md:block">
          {/* Header Row */}
          <div className="grid grid-cols-[1fr_80px_80px_80px] text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b bg-muted/20 py-2 min-w-0">
            <div className="text-left px-2 sm:px-3 truncate">TEAM</div>
            <div className="px-1">SPREAD</div>
            <div className="px-1">ML</div>
            <div className="px-1">TOTAL</div>
          </div>

          {/* Team Rows */}
          {[
            { team: game.awayTeam, score: game.awayScore, type: "away" },
            { team: game.homeTeam, score: game.homeScore, type: "home" }
          ].map(({ team, score, type }) => (
            <div
              key={type}
              className="grid grid-cols-[1fr_80px_80px_80px] items-center hover:bg-accent/30 transition-colors border-b border-border/20 last:border-b-0 py-2 min-w-0"
            >
              {/* Team Info */}
              <div className="px-2 sm:px-3 min-w-0">
                <SportsTeamDisplay
                  teamName={team}
                  score={score}
                  showScore={isLive || isFinal}
                  layout="horizontal"
                  size="sm"
                  logoSize="sm"
                />
              </div>

              {/* Betting Options */}
              <div className="px-1 flex justify-center">
                {game.odds?.spread && !isFinal && (
                  <SportsBetButton
                    betType="spread"
                    odds={type === "home" ? game.odds.spread.homeOdds : game.odds.spread.awayOdds}
                    point={type === "home" ? game.odds.spread.line : -game.odds.spread.line}
                    team={team}
                    onClick={() => {
                      if (game.odds?.spread) {
                        onBetClick?.(
                          "spread",
                          type === "home" ? game.odds.spread.homeOdds : game.odds.spread.awayOdds,
                          team
                        )
                      }
                    }}
                    className="w-full max-w-[72px]"
                    size="compact"
                  />
                )}
              </div>

              <div className="px-1 flex justify-center">
                {game.odds && !isFinal && (
                  <SportsBetButton
                    betType="moneyline"
                    odds={type === "home" ? game.odds.homeWin : game.odds.awayWin}
                    team={team}
                    onClick={() => {
                      if (game.odds) {
                        onBetClick?.(
                          "moneyline",
                          type === "home" ? game.odds.homeWin : game.odds.awayWin,
                          team
                        )
                      }
                    }}
                    className="w-full max-w-[72px]"
                    size="compact"
                  />
                )}
              </div>

              <div className="px-1 flex justify-center">
                {game.odds?.total && !isFinal && type === "away" && (
                  <div className="space-y-1">
                    <SportsBetButton
                      betType="total"
                      odds={game.odds.total.overOdds}
                      point={game.odds.total.line}
                      team="over"
                      onClick={() => {
                        if (game.odds?.total) {
                          onBetClick?.("total", game.odds.total.overOdds, "over")
                        }
                      }}
                      className="w-full max-w-[72px]"
                      size="compact"
                    />
                    <SportsBetButton
                      betType="total"
                      odds={game.odds.total.underOdds}
                      point={game.odds.total.line}
                      team="under"
                      onClick={() => {
                        if (game.odds?.total) {
                          onBetClick?.("total", game.odds.total.underOdds, "under")
                        }
                      }}
                      className="w-full max-w-[72px]"
                      size="compact"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </SportsGameCardDesktopLayout>

        {/* Mobile Layout - Visible on Mobile Only */}
        <SportsGameCardMobileLayout className="block md:hidden">
          {/* Compact Teams Section */}
          <div className="p-3 border-b bg-muted/20">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {game.awayTeam.slice(0, 3).toUpperCase()}
                </div>
                <span className="font-medium truncate">{game.awayTeam}</span>
                {(isLive || isFinal) && game.awayScore !== undefined && (
                  <span className="font-mono font-bold text-lg">{game.awayScore}</span>
                )}
              </div>
              <span className="text-muted-foreground mx-2">@</span>
              <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
                {(isLive || isFinal) && game.homeScore !== undefined && (
                  <span className="font-mono font-bold text-lg">{game.homeScore}</span>
                )}
                <span className="font-medium truncate">{game.homeTeam}</span>
                <div className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {game.homeTeam.slice(0, 3).toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* Compact Betting Options */}
          {game.odds && !isFinal && (
            <div className="p-2">
              <div className="flex gap-1">
                {/* Spread */}
                {game.odds?.spread && (
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-center text-muted-foreground mb-1 font-medium">SPREAD</div>
                    <div className="space-y-1">
                      <SportsBetButton
                        betType="spread"
                        odds={game.odds.spread.awayOdds}
                        point={-game.odds.spread.line}
                        team={game.awayTeam}
                        onClick={() => {
                          if (game.odds?.spread) {
                            onBetClick?.("spread", game.odds.spread.awayOdds, game.awayTeam)
                          }
                        }}
                        className="w-full text-xs"
                        size="compact"
                      />
                      <SportsBetButton
                        betType="spread"
                        odds={game.odds.spread.homeOdds}
                        point={game.odds.spread.line}
                        team={game.homeTeam}
                        onClick={() => {
                          if (game.odds?.spread) {
                            onBetClick?.("spread", game.odds.spread.homeOdds, game.homeTeam)
                          }
                        }}
                        className="w-full text-xs"
                        size="compact"
                      />
                    </div>
                  </div>
                )}

                {/* Moneyline */}
                {game.odds && (
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-center text-muted-foreground mb-1 font-medium">ML</div>
                    <div className="space-y-1">
                      <SportsBetButton
                        betType="moneyline"
                        odds={game.odds.awayWin}
                        team={game.awayTeam}
                        onClick={() => {
                          if (game.odds) {
                            onBetClick?.("moneyline", game.odds.awayWin, game.awayTeam)
                          }
                        }}
                        className="w-full text-xs"
                        size="compact"
                      />
                      <SportsBetButton
                        betType="moneyline"
                        odds={game.odds.homeWin}
                        team={game.homeTeam}
                        onClick={() => {
                          if (game.odds) {
                            onBetClick?.("moneyline", game.odds.homeWin, game.homeTeam)
                          }
                        }}
                        className="w-full text-xs"
                        size="compact"
                      />
                    </div>
                  </div>
                )}

                {/* Total */}
                {game.odds?.total && (
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-center text-muted-foreground mb-1 font-medium">TOTAL</div>
                    <div className="space-y-1">
                      <SportsBetButton
                        betType="total"
                        odds={game.odds.total.overOdds}
                        point={game.odds.total.line}
                        team="over"
                        onClick={() => {
                          if (game.odds?.total) {
                            onBetClick?.("total", game.odds.total.overOdds, "over")
                          }
                        }}
                        className="w-full text-xs"
                        size="compact"
                      />
                      <SportsBetButton
                        betType="total"
                        odds={game.odds.total.underOdds}
                        point={game.odds.total.line}
                        team="under"
                        onClick={() => {
                          if (game.odds?.total) {
                            onBetClick?.("total", game.odds.total.underOdds, "under")
                          }
                        }}
                        className="w-full text-xs"
                        size="compact"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </SportsGameCardMobileLayout>
    </SportsGameCard>
  )
}
