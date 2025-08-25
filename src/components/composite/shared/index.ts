/**
 * Shared Components
 *
 * Feature-specific interface components that provide comprehensive
 * functionality for their respective domains (payments, betting history, promotions).
 *
 * Note: These components are currently feature-specific rather than truly shared.
 * Consider reorganizing into feature-specific directories in the future.
 */

// Financial components
export { PaymentDashboard } from './payment-dashboard'

// Betting history components
export { MyBetsClientWrapper } from './my-bets-client-wrapper'

// Promotion components
export { PromotionsInterface } from './promotions-interface'

// Types
export type { PaymentDashboardProps } from './payment-dashboard'
export type { MyBetsClientWrapperProps } from './my-bets-client-wrapper'
export type { PromotionsInterfaceProps } from './promotions-interface'


