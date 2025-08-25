"use client"

import React from "react"
import { Button } from "@/components/primitives/button"
import { Card, CardContent } from "@/components/primitives/card"
import {
  Zap,
  CreditCard,
  ArrowUpRight,
  History,
  Star,
  Settings,
  TrendingUp,
  Target
} from "lucide-react"
import { BaseWidget } from "./base-widget"
import { Grid } from "@/components/primitives/layout"
import { cn } from "@/lib/utils"
import { bettingToast } from "@/components/base/betting-toast"

interface QuickActionsWidgetProps {
  compact?: boolean
  onSettings?: () => void
}

interface QuickAction {
  id: string
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  onClick?: () => void
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost"
  disabled?: boolean
}

function ActionButton({
  action,
  compact = false
}: {
  action: QuickAction
  compact?: boolean
}) {
  const handleClick = () => {
    if (action.onClick) {
      action.onClick()
    } else if (action.href) {
      window.location.href = action.href
    }
  }

  return (
    <Button
      variant={action.variant || "outline"}
      onClick={handleClick}
      disabled={action.disabled}
      className={cn(
        "h-auto p-4 flex flex-col items-center gap-2 text-center transition-all hover:scale-105",
        compact ? "min-h-[80px]" : "min-h-[100px]"
      )}
    >
      <action.icon className={compact ? "h-5 w-5" : "h-6 w-6"} />
      <div>
        <div className={cn("font-medium", compact ? "text-xs" : "text-sm")}>
          {action.label}
        </div>
        {!compact && (
          <div className="text-xs text-muted-foreground mt-1">
            {action.description}
          </div>
        )}
      </div>
    </Button>
  )
}

export function QuickActionsWidget({ compact = false, onSettings }: QuickActionsWidgetProps) {
  const handleDepositClick = () => {
    // In a real app, this would open a deposit modal or navigate to deposit page
    bettingToast.info({
      title: "Deposit",
      description: "Deposit functionality would be implemented here"
    })
  }

  const handleWithdrawClick = () => {
    // In a real app, this would open a withdrawal modal or navigate to withdrawal page
    bettingToast.info({
      title: "Withdraw", 
      description: "Withdrawal functionality would be implemented here"
    })
  }

  const handleFavoritesClick = () => {
    // Navigate to favorites or open favorites modal
    window.location.href = "/favorites"
  }

  const handleHistoryClick = () => {
    // Navigate to betting history
    window.location.href = "/my-bets"
  }

  const handleLiveBetsClick = () => {
    // Navigate to live betting
    window.location.href = "/live"
  }

  const handleAnalyticsClick = () => {
    // Navigate to analytics page
    window.location.href = "/analytics"
  }

  const handleSettingsClick = () => {
    // Navigate to settings
    window.location.href = "/settings"
  }

  const handlePromotionsClick = () => {
    // Navigate to promotions
    window.location.href = "/promotions"
  }

  const quickActions: QuickAction[] = [
    {
      id: "deposit",
      label: "Deposit",
      description: "Add funds to your account",
      icon: CreditCard,
      onClick: handleDepositClick,
      variant: "default"
    },
    {
      id: "withdraw",
      label: "Withdraw",
      description: "Cash out your winnings",
      icon: ArrowUpRight,
      onClick: handleWithdrawClick,
      variant: "outline"
    },
    {
      id: "favorites",
      label: "Favorites",
      description: "Your favorite teams & bets",
      icon: Star,
      onClick: handleFavoritesClick,
      variant: "outline"
    },
    {
      id: "history",
      label: "Bet History",
      description: "View past bets",
      icon: History,
      onClick: handleHistoryClick,
      variant: "outline"
    },
    {
      id: "live",
      label: "Live Betting",
      description: "Bet on live games",
      icon: Zap,
      onClick: handleLiveBetsClick,
      variant: "secondary"
    },
    {
      id: "analytics",
      label: "Analytics",
      description: "Performance insights",
      icon: TrendingUp,
      onClick: handleAnalyticsClick,
      variant: "outline"
    },
    {
      id: "promotions",
      label: "Promotions",
      description: "Current offers",
      icon: Target,
      onClick: handlePromotionsClick,
      variant: "outline"
    },
    {
      id: "settings",
      label: "Settings",
      description: "Account preferences",
      icon: Settings,
      onClick: handleSettingsClick,
      variant: "ghost"
    }
  ]

  // Show fewer actions in compact mode
  const displayActions = compact ? quickActions.slice(0, 4) : quickActions

  return (
    <BaseWidget
      title="Quick Actions"
      description={compact ? undefined : "Common tasks and shortcuts"}
      icon={Zap}
      onSettings={onSettings}
      compact={compact}
    >
      <Grid 
        cols={compact ? 2 : 4} 
        gap={compact ? 2 : 3}
        className="h-full"
      >
        {displayActions.map((action) => (
          <ActionButton
            key={action.id}
            action={action}
            compact={compact}
          />
        ))}
      </Grid>
    </BaseWidget>
  )
}
