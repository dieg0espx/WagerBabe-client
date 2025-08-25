/**
 * Base themed components - Sports betting specific styled components
 *
 * These components extend primitives with sports betting specific styling,
 * theming, and behavior. They demonstrate how the theming system works
 * and provide the foundation for composite application components.
 *
 * Base components should:
 * - Extend primitive components with sports betting styling
 * - Implement the automatic style propagation system
 * - Support betting context theming (sportsbook, casino, poker)
 * - Provide sports betting specific variants and states
 * - Be reusable across different parts of the application
 */

// Interactive base components
export { BettingButton, bettingButtonVariants } from './betting-button'
export { OddsButton, oddsButtonVariants } from './odds-button'
export { BettingInput, bettingInputVariants } from './betting-input'
export {
  BaseWidget,
  WidgetSkeleton,
  WidgetError,
  widgetVariants,
  cardVariants
} from './widget-base'

// Display base components
export { BettingCard, bettingCardVariants } from './betting-card'
export { StatusBadge, statusBadgeVariants } from './status-badge'
export { LiveIndicator, liveIndicatorVariants } from './live-indicator'
export { OddsDisplay, oddsDisplayVariants } from './odds-display'

// Feedback base components
export { BettingAlert, bettingAlertVariants } from './betting-alert'
export { bettingToast, bettingToasts } from './betting-toast'

// Sports components
export {
  SportsGameCard,
  SportsTeamDisplay,
  SportsGameCardDesktopLayout,
  SportsGameCardMobileLayout,
  sportsGameCardVariants,
  sportsTeamDisplayVariants
} from './sports-game-card'

export {
  SportsBetButton,
  SportsOddsDisplay,
  sportsBetButtonVariants,
  sportsOddsDisplayVariants
} from './sports-bet-button'

export {
  SportsStatusBadge,
  SportsTimeDisplay,
  SportsScoreDisplay,
  sportsStatusBadgeVariants,
  sportsTimeDisplayVariants,
  sportsScoreDisplayVariants
} from './sports-status-badge'

// Dashboard components
export {
  DashboardWidget,
  DashboardMetric,
  DashboardGrid,
  dashboardWidgetVariants,
  dashboardMetricVariants,
  dashboardGridVariants
} from './dashboard-widget'

// Mobile components
export {
  MobileNavContainer,
  MobileNavItem,
  MobileContainer,
  MobileTouchTarget,
  mobileNavContainerVariants,
  mobileNavItemVariants,
  mobileContainerVariants,
  mobileTouchTargetVariants
} from './mobile-navigation'

// Featured/Shared components
export {
  FeaturedSection,
  FeaturedSectionHeader,
  FeaturedGrid,
  FeaturedCard,
  FeaturedList,
  featuredSectionVariants,
  featuredSectionHeaderVariants,
  featuredGridVariants,
  featuredCardVariants,
  featuredListVariants
} from './featured-section'

// Wallet components
export { WalletDisplay } from './wallet-display'

// Re-export types
export type { BettingButtonProps } from './betting-button'
export type { OddsButtonProps } from './odds-button'
export type { BettingInputProps } from './betting-input'
export type { BettingCardProps } from './betting-card'
export type { StatusBadgeProps } from './status-badge'
export type { LiveIndicatorProps } from './live-indicator'
export type { OddsDisplayProps } from './odds-display'
export type { BettingAlertProps } from './betting-alert'
export type { BettingToastProps } from './betting-toast'

// Sports component types
export type { SportsGameCardProps, SportsTeamDisplayProps } from './sports-game-card'
export type { SportsBetButtonProps, SportsOddsDisplayProps } from './sports-bet-button'
export type { SportsStatusBadgeProps, SportsTimeDisplayProps, SportsScoreDisplayProps } from './sports-status-badge'

// Dashboard component types
export type { DashboardWidgetProps, DashboardMetricProps, DashboardGridProps } from './dashboard-widget'

// Mobile component types
export type { MobileNavContainerProps, MobileNavItemProps, MobileContainerProps, MobileTouchTargetProps } from './mobile-navigation'

// Featured component types
export type { FeaturedSectionProps, FeaturedSectionHeaderProps, FeaturedGridProps, FeaturedCardProps, FeaturedListProps } from './featured-section'

// Wallet component types
export type { WalletDisplayProps } from './wallet-display'
