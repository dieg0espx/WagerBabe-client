"use client"

import { Badge } from "@/components/primitives/badge"
import { Divider, Stack } from "@/components/primitives/layout"
import { Activity, TrendingUp, TrendingDown, CreditCard, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { BaseWidget } from "./base-widget"

interface RecentActivityWidgetProps {
  compact?: boolean
  onSettings?: () => void
}

interface ActivityItem {
  id: string
  type: "bet" | "deposit" | "withdrawal" | "win" | "loss"
  title: string
  description: string
  amount: number
  timestamp: string
  status?: "pending" | "completed" | "failed"
}

// Mock data - replace with actual data source
const mockRecentActivity: ActivityItem[] = [
  {
    id: "deposit-1",
    type: "deposit",
    title: "Account Deposit",
    description: "Bank transfer completed",
    amount: 500,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "completed"
  },
  {
    id: "bet-1",
    type: "bet",
    title: "Lakers vs Warriors",
    description: "Spread bet placed",
    amount: 50,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: "pending"
  },
  {
    id: "win-1",
    type: "win",
    title: "Cowboys vs Giants",
    description: "Moneyline bet won",
    amount: 125,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    status: "completed"
  },
  {
    id: "bet-2",
    type: "bet",
    title: "Celtics vs Heat",
    description: "Over/Under bet placed",
    amount: 75,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    status: "pending"
  },
  {
    id: "loss-1",
    type: "loss",
    title: "Chiefs vs Bills",
    description: "Spread bet lost",
    amount: 100,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    status: "completed"
  }
]

function ActivityItemComponent({ 
  item, 
  compact = false 
}: { 
  item: ActivityItem
  compact?: boolean 
}) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  const getActivityIcon = () => {
    switch (item.type) {
      case "deposit":
        return <ArrowDownRight className="h-4 w-4 text-green-600" />
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-blue-600" />
      case "bet":
        return <CreditCard className="h-4 w-4 text-orange-600" />
      case "win":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "loss":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getAmountColor = () => {
    switch (item.type) {
      case "win":
      case "deposit":
        return "text-green-600 dark:text-green-400"
      case "loss":
        return "text-red-600 dark:text-red-400"
      case "withdrawal":
        return "text-blue-600 dark:text-blue-400"
      default:
        return "text-muted-foreground"
    }
  }

  const getAmountPrefix = () => {
    switch (item.type) {
      case "win":
      case "deposit":
        return "+"
      case "loss":
      case "withdrawal":
        return "-"
      default:
        return ""
    }
  }

  const getStatusBadge = () => {
    if (!item.status) return null
    
    const variants = {
      pending: "outline" as const,
      completed: "default" as const,
      failed: "destructive" as const
    }

    return (
      <Badge variant={variants[item.status]} className="text-xs">
        {item.status}
      </Badge>
    )
  }

  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3 flex-1">
        <div className="p-2 bg-muted rounded-full">
          {getActivityIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className={`font-medium ${compact ? 'text-sm' : 'text-base'} truncate`}>
              {item.title}
            </p>
            {getStatusBadge()}
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {item.description}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatTime(item.timestamp)}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-medium ${compact ? 'text-sm' : 'text-base'} ${getAmountColor()}`}>
          {getAmountPrefix()}{formatCurrency(item.amount)}
        </p>
      </div>
    </div>
  )
}

export function RecentActivityWidget({ compact = false, onSettings }: RecentActivityWidgetProps) {
  const maxItems = compact ? 3 : 5
  const displayActivity = mockRecentActivity.slice(0, maxItems)

  return (
    <BaseWidget
      title="Recent Activity"
      description={compact ? undefined : "Your latest transactions and bets"}
      icon={Activity}
      onSettings={onSettings}
      compact={compact}
      badge={{
        text: `${mockRecentActivity.length} items`,
        variant: "outline"
      }}
    >
      {displayActivity.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full min-h-[120px] text-center">
          <Activity className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No recent activity</p>
          <p className="text-xs text-muted-foreground mt-1">
            Your bets and transactions will appear here
          </p>
        </div>
      ) : (
        <Stack spacing={0} className="h-full">
          {displayActivity.map((item, index) => (
            <div key={item.id}>
              <ActivityItemComponent item={item} compact={compact} />
              {index < displayActivity.length - 1 && (
                <Divider className="my-2" />
              )}
            </div>
          ))}
          
          {mockRecentActivity.length > maxItems && (
            <>
              <Divider className="my-3" />
              <div className="text-center">
                <button 
                  className="text-sm text-primary hover:underline"
                  onClick={() => window.location.href = "/activity"}
                >
                  View all activity ({mockRecentActivity.length - maxItems} more)
                </button>
              </div>
            </>
          )}
        </Stack>
      )}
    </BaseWidget>
  )
}
