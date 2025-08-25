"use client"

import type { Metadata } from "next"
import { UnifiedLayout } from "@/components/layout"
import { PaymentDashboard } from "@/components/composite/shared"
import { WeeklySummaryWidget, BettingInsightsWidget, QuickActionsWidget, RecentActivityWidget } from "@/components/composite/dashboard"
import { Button } from "@/components/primitives"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives"
import { Badge } from "@/components/primitives"
import {
  Plus,
  Settings,
  TrendingUp,
  Target,
  Clock,
  Zap,
  Activity
} from "lucide-react"


export default function DashboardPage() {
  const handleRefresh = () => {
    // Implement dashboard refresh logic
    window.location.reload()
  }

  const handleSettings = () => {
    // Navigate to dashboard settings
    window.location.href = "/settings?tab=dashboard"
  }

  return (
    <UnifiedLayout
      title="Dashboard"
      subtitle="Your comprehensive betting overview and analytics"
      showBreadcrumbs
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Dashboard" }
      ]}
      showRefresh
      onRefresh={handleRefresh}
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSettings}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Quick Bet
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Bets</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Win Rate</p>
                  <p className="text-2xl font-bold text-green-600">67%</p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <Target className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold text-green-600">+$250</p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">3</p>
                </div>
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Summary Widget */}
            <WeeklySummaryWidget />

            {/* Payment Dashboard */}
            <PaymentDashboard />
          </div>

          {/* Right Column - Actions & Insights */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <QuickActionsWidget />

            {/* Betting Insights */}
            <BettingInsightsWidget compact />

            {/* Recent Activity */}
            <RecentActivityWidget compact />
          </div>
        </div>

        {/* Featured Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Featured Opportunities
              <Badge variant="secondary">Live</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Lakers vs Warriors</span>
                  <Badge variant="outline">NBA</Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-2">Tonight 8:00 PM</div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    LAL +3.5
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    GSW -3.5
                  </Button>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Chiefs vs Bills</span>
                  <Badge variant="outline">NFL</Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-2">Sunday 1:00 PM</div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    KC -2.5
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    BUF +2.5
                  </Button>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Man City vs Arsenal</span>
                  <Badge variant="outline">EPL</Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-2">Saturday 12:30 PM</div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Over 2.5
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Under 2.5
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </UnifiedLayout>
  )
}
