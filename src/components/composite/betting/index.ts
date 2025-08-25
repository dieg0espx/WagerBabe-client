/**
 * Betting Components
 * 
 * Core betting functionality components including bet slips, wagering interfaces,
 * and live betting features. These components handle the core sports betting
 * user experience and integrate with betting engines.
 */

// Core betting components
export { BetSlip } from './bet-slip'
export { InlineBetInput } from './inline-bet-input'
export { LiveBettingInterface } from './live-betting-interface'

// Types
export type { 
  BetSelection,
  Wager,
  BetSlipProps 
} from './bet-slip'

export type { 
  InlineBetInputProps 
} from './inline-bet-input'
