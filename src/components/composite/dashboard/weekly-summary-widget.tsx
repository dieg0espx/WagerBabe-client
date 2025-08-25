"use client"

import React from "react"
import {
  DashboardWidget,
  DashboardMetric,
  DashboardGrid
} from "@/components/base"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  BarChart3,
  type LucideIcon
} from "lucide-react"

import { BaseWidget } from "./base-widget"

interface WeeklySummaryWidgetProps {
  compact?: boolean
  onSettings?: () => void
}

interface SummaryCardProps {
  title: string
  value: string | number
  description: string
  icon: LucideIcon
  trend?: "up" | "down" | "neutral"
  compact?: boolean
}

// Mock data - replace with actual data source
const mockWeeklyData = {
  netChange: 250.75,
  totalWagers: 15,
  winRate: 67,
  roi: 12,
  totalWagered: 1500,
  totalReturn: 1750.75
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  trend = "neutral",
  compact = false
}: SummaryCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up": return <TrendingUp className="h-3 w-3" />
      case "down": return <TrendingDown className="h-3 w-3" />
      default: return null
    }
  }

  return (
    <DashboardWidget
      title={title}
      description={!compact ? description : undefined}
      icon={Icon}
      variant="default"
      size={compact ? "compact" : "default"}
    >
      <DashboardMetric
        label={title}
        value={value}
        trend={trend}
        trendIcon={getTrendIcon()}
        size={compact ? "sm" : "default"}
        compact={compact}
      />
    </DashboardWidget>
  )
}

export function WeeklySummaryWidget({ compact = false, onSettings }: WeeklySummaryWidgetProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  // Calculate trend values
  const pnlTrend: "up" | "down" = mockWeeklyData.netChange >= 0 ? "up" : "down"
  const winRateTrend: "up" | "down" = mockWeeklyData.winRate >= 50 ? "up" : "down"
  const roiTrend: "up" | "down" = mockWeeklyData.roi >= 0 ? "up" : "down"

  const summaryCards = [
    {
      title: "Weekly P&L",
      value: formatCurrency(mockWeeklyData.netChange),
      description: "Net profit/loss this week",
      icon: DollarSign,
      trend: pnlTrend
    },
    {
      title: "Total Bets",
      value: mockWeeklyData.totalWagers,
      description: "Bets placed this week",
      icon: BarChart3,
      trend: "neutral" as const
    },
    {
      title: "Win Rate",
      value: `${mockWeeklyData.winRate}%`,
      description: "Percentage of winning bets",
      icon: Target,
      trend: winRateTrend
    },
    {
      title: "ROI",
      value: `${mockWeeklyData.roi}%`,
      description: "Return on investment",
      icon: TrendingUp,
      trend: roiTrend
    }
  ]

  return (
    <BaseWidget
      title="Weekly Summary"
      description={compact ? undefined : "Your betting performance this week"}
      icon={BarChart3}
      onSettings={onSettings}
      compact={compact}
    >
      <DashboardGrid
        cols={compact ? 2 : 4}
        gap={compact ? "sm" : "default"}
        className="h-full"
      >
        {summaryCards.map((card, index) => (
          <SummaryCard
            key={card.title}
            title={card.title}
            value={card.value}
            description={card.description}
            icon={card.icon}
            trend={card.trend}
            compact={compact}
          />
        ))}
      </DashboardGrid>
    </BaseWidget>
  )
}
