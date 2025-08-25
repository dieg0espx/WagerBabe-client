"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives/card"
import { Badge } from "@/components/primitives/badge"
import { Button } from "@/components/primitives/button"
import { useBetting } from "@/contexts/betting-context"
import { Clock, DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function RecentBetsWidget() {
  const { state } = useBetting()
  const { recentBets } = state

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'won':
        return 'bg-green-100 text-green-800'
      case 'lost':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (recentBets.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Bets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No bets placed yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start betting to see your recent activity here
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Bets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentBets.slice(0, 5).map((bet) => (
            <div
              key={bet.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">
                    {bet.selections.length} selection{bet.selections.length !== 1 ? 's' : ''}
                  </span>
                  <Badge 
                    variant="secondary" 
                    className={cn("text-xs", getStatusColor(bet.status))}
                  >
                    {bet.status}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  {bet.selections.map(selection => 
                    `${selection.eventName} - ${selection.selectionName}`
                  ).join(', ')}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {formatDate(bet.placedAt)}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-sm">
                  {formatCurrency(bet.totalStake)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Potential: {formatCurrency(bet.potentialPayout)}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {recentBets.length > 5 && (
          <div className="mt-4 pt-4 border-t">
            <Button variant="outline" size="sm" className="w-full">
              View All Bets ({recentBets.length})
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
