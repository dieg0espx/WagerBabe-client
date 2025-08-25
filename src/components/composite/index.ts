/**
 * Composite components - Higher-level application components
 * 
 * These components combine base and primitive components to create
 * specific application features and functionality. They represent
 * complete UI patterns and user interactions.
 * 
 * Composite components should:
 * - Combine multiple base/primitive components
 * - Implement specific application logic
 * - Handle complex user interactions
 * - Provide complete feature implementations
 * - Be specific to sports betting use cases
 */

// Betting specific composites
// Note: BetSlip and InlineBetInput are now in ./betting subdirectory

// Dashboard components
export * from './dashboard'

// Betting components
export * from './betting'

// Casino components
export * from './casino'

// Sports components
export * from './sports'

// Profile components
export * from './profile'

// Settings components
export * from './settings'

// Shared components
export * from './shared'

// Promotions components
export * from './promotions'



// Admin components
// export { OddsComparison } from './odds-comparison'
// export { LiveGameCard } from './live-game-card'
// export { BettingForm } from './betting-form'
// export { AccountBalance } from './account-balance'

// Game and match composites (now in ./sports subdirectory)
// export { MatchupCard } from './matchup-card'
// export { LeagueSelector } from './league-selector'
// export { TeamSelector } from './team-selector'

// User interface composites
// export { UserProfile } from './user-profile'
// export { BettingHistory } from './betting-history'
// export { TransactionHistory } from './transaction-history'
// export { NotificationCenter } from './notification-center'

// Dashboard composites
// export { DashboardStats } from './dashboard-stats'
// export { QuickBets } from './quick-bets'
// export { FeaturedGames } from './featured-games'  // TODO: Fix TypeScript issue
// export { LiveScores } from './live-scores'

// Re-export types
// Note: Types are now exported from their respective subdirectories
// export type { FeaturedGamesProps } from './shared/featured-games'  // TODO: Fix TypeScript issue

// Commented out until implemented
// export type { OddsComparisonProps } from './odds-comparison'
// export type { LiveGameCardProps } from './live-game-card'
// export type { BettingFormProps } from './betting-form'
// export type { AccountBalanceProps } from './account-balance'
// export type { MatchupCardProps } from './matchup-card'
// export type { LeagueSelectorProps } from './league-selector'
// export type { TeamSelectorProps } from './team-selector'
// export type { UserProfileProps } from './user-profile'
// export type { BettingHistoryProps } from './betting-history'
// export type { TransactionHistoryProps } from './transaction-history'
// export type { NotificationCenterProps } from './notification-center'
// export type { DashboardStatsProps } from './dashboard-stats'
// export type { QuickBetsProps } from './quick-bets'
// export type { LiveScoresProps } from './live-scores'
