/**
 * Dashboard Components
 * 
 * Widget-based dashboard components for displaying user analytics,
 * betting performance, and quick actions. These components combine
 * base/primitive components to create complete dashboard features.
 */

// Note: BaseWidget, WidgetSkeleton, WidgetError moved to base components
// Use: import { BaseWidget, WidgetSkeleton, WidgetError } from '@/components/base'

// Dashboard widgets
export { WeeklySummaryWidget } from './weekly-summary-widget'
export { BettingInsightsWidget, insightCardVariants } from './betting-insights-widget'
export { QuickActionsWidget } from './quick-actions-widget'
export { RecentActivityWidget } from './recent-activity-widget'
export { RecentBetsWidget } from './recent-bets-widget'

// Widget component map for dynamic rendering
import { WeeklySummaryWidget } from './weekly-summary-widget'
import { QuickActionsWidget } from './quick-actions-widget'
import { RecentActivityWidget } from './recent-activity-widget'
import { RecentBetsWidget } from './recent-bets-widget'

export const WIDGET_COMPONENTS = {
  "weekly-summary": WeeklySummaryWidget,
  "quick-actions": QuickActionsWidget,
  "recent-activity": RecentActivityWidget,
  "recent-bets": RecentBetsWidget,
} as const

export type WidgetComponent = typeof WIDGET_COMPONENTS[keyof typeof WIDGET_COMPONENTS]
