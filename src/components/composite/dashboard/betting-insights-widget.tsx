"use client"

import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Target,
  BarChart3,
  Zap
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  Button,
  Badge
} from "@/components/primitives"
import { BaseWidget } from "@/components/base"

interface BettingInsightsWidgetProps {
  compact?: boolean
  onSettings?: () => void
  className?: string
  variant?: "default" | "betting" | "analytics"
}

interface Insight {
  id: string
  type: "tip" | "trend" | "alert" | "opportunity"
  title: string
  description: string
  confidence?: number
  action?: {
    label: string
    onClick: () => void
  }
  timestamp?: string
}

const insightCardVariants = cva(
  "transition-all duration-200 hover:shadow-md",
  {
    variants: {
      type: {
        tip: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800",
        trend: "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800",
        alert: "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800",
        opportunity: "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800",
      }
    },
    defaultVariants: {
      type: "tip",
    },
  }
)

function InsightCard({ 
  insight, 
  compact = false 
}: { 
  insight: Insight
  compact?: boolean 
}) {
  const getIcon = () => {
    switch (insight.type) {
      case "tip":
        return <Lightbulb className="h-4 w-4 text-yellow-500" />
      case "trend":
        return <TrendingUp className="h-4 w-4 text-blue-500" />
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "opportunity":
        return <Target className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getTypeBadge = () => {
    switch (insight.type) {
      case "tip":
        return <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Tip</Badge>
      case "trend":
        return <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Trend</Badge>
      case "alert":
        return <Badge variant="destructive" className="text-xs">Alert</Badge>
      case "opportunity":
        return <Badge variant="default" className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Opportunity</Badge>
      default:
        return null
    }
  }

  return (
    <Card className={cn(insightCardVariants({ type: insight.type }))}>
      <CardContent className={compact ? "p-3" : "p-4"}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {getIcon()}
            <div className={cn(
              "font-medium",
              compact ? "text-xs" : "text-sm"
            )}>
              {insight.title}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getTypeBadge()}
            {insight.confidence && (
              <Badge variant="outline" className="text-xs">
                {insight.confidence}% confidence
              </Badge>
            )}
          </div>
        </div>
        
        <div className={cn(
          "text-muted-foreground mb-3",
          compact ? "text-xs" : "text-sm"
        )}>
          {insight.description}
        </div>
        
        <div className="flex items-center justify-between">
          {insight.action && (
            <Button
              size="sm"
              variant="outline"
              onClick={insight.action.onClick}
              className="text-xs"
            >
              {insight.action.label}
            </Button>
          )}
          {insight.timestamp && (
            <div className="text-xs text-muted-foreground">
              {new Date(insight.timestamp).toLocaleDateString([], {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function BettingInsightsWidget({ 
  compact = false, 
  onSettings,
  className,
  variant = "betting"
}: BettingInsightsWidgetProps) {
  // Mock insights data - in a real app, this would come from AI/ML analysis
  const allInsights: Insight[] = [
    {
      id: "tip-1",
      type: "tip",
      title: "Bet Size Optimization",
      description: "Consider reducing your average bet size by 15% to improve long-term profitability based on your current win rate.",
      confidence: 78,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      action: {
        label: "Learn More",
        onClick: () => alert("Bankroll management tips would be shown here")
      }
    },
    {
      id: "trend-1",
      type: "trend",
      title: "NBA Spread Performance",
      description: "You're performing 23% better on NBA spread bets compared to other bet types this month.",
      confidence: 85,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      action: {
        label: "View NBA Games",
        onClick: () => window.location.href = "/sports/basketball"
      }
    },
    {
      id: "alert-1",
      type: "alert",
      title: "Losing Streak Alert",
      description: "You're currently on a 3-game losing streak. Consider taking a break or reducing bet sizes.",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      action: {
        label: "Set Limits",
        onClick: () => alert("Responsible gambling tools would be shown here")
      }
    },
    {
      id: "opportunity-1",
      type: "opportunity",
      title: "Value Bet Detected",
      description: "Lakers vs Warriors tonight shows potential value on the over 220.5 based on recent trends.",
      confidence: 72,
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      action: {
        label: "View Game",
        onClick: () => alert("Game details would be shown here")
      }
    },
    {
      id: "tip-2",
      type: "tip",
      title: "Diversification Suggestion",
      description: "Consider exploring tennis betting - your analytical approach might work well in this sport.",
      confidence: 65,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      action: {
        label: "Explore Tennis",
        onClick: () => window.location.href = "/sports/tennis"
      }
    }
  ]

  // For demo purposes, show all insights
  const enabledInsights = allInsights

  return (
    <BaseWidget
      title="Betting Insights"
      description={compact ? undefined : "AI-powered betting tips and market analysis"}
      icon={BarChart3}
      onSettings={onSettings}
      compact={compact}
      variant={variant}
      className={className}
      badge="AI"
      badgeVariant="secondary"
    >
      <div className="space-y-3">
        {enabledInsights.length === 0 ? (
          <div className="text-center py-8">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No insights available</p>
            <p className="text-sm text-muted-foreground mt-2">
              Insights will appear as you place more bets
            </p>
          </div>
        ) : (
          enabledInsights.map((insight) => (
            <InsightCard
              key={insight.id}
              insight={insight}
              compact={compact}
            />
          ))
        )}
      </div>
    </BaseWidget>
  )
}

export { insightCardVariants }
