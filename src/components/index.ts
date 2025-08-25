/**
 * WagerBabe Component Library - Organized Component Structure
 * 
 * This is the main entry point for the organized component system.
 * Components are organized into logical layers for better maintainability
 * and understanding of the component hierarchy.
 * 
 * Component Organization:
 * 
 * 1. PRIMITIVES - Low-level, reusable UI building blocks
 *    - Basic functionality without sports betting specific styling
 *    - Foundation for all other components
 *    - Examples: Button, Input, Card, Alert
 * 
 * 2. BASE - Themed components with sports betting styling
 *    - Extend primitives with sports betting specific theming
 *    - Demonstrate automatic style propagation
 *    - Examples: BettingButton, OddsDisplay, LiveIndicator
 * 
 * 3. COMPOSITE - Application-specific feature components
 *    - Combine base/primitive components for complete features
 *    - Handle complex user interactions and business logic
 *    - Examples: BetSlip, GameCard, AccountBalance
 * 
 * 4. LAYOUT - Page structure and navigation components
 *    - Handle overall page organization and navigation
 *    - Provide responsive layout patterns
 *    - Examples: AppLayout, MainNavbar, Sidebar
 * 
 * 5. FORMS - Specialized form components and utilities
 *    - Handle form validation, submission, and patterns
 *    - Sports betting specific form components
 *    - Examples: BettingForm, LoginForm, DepositForm
 */

// ============================================================================
// PRIMITIVES - Low-level UI building blocks
// ============================================================================
export * from './primitives'

// ============================================================================
// BASE - Themed sports betting components
// ============================================================================
export * from './base'

// ============================================================================
// COMPOSITE - Application feature components
// ============================================================================
export * from './composite'

// ============================================================================
// LAYOUT - Page structure and navigation
// ============================================================================
export * from './layout'

// ============================================================================
// FORMS - Form components and utilities
// ============================================================================
export * from './forms'

// ============================================================================
// NOTE: Magic UI components have been moved to primitives layer
// Import RetroGrid and other animated components from '@/components/primitives'
// ============================================================================

// ============================================================================
// LEGACY SUPPORT - Backward compatibility
// ============================================================================
// TODO: Add ui/ directory exports if needed for backward compatibility
// @deprecated Use organized imports instead
// export * from './ui'

// Theme provider and utilities
export { ThemeProvider, useTheme } from './theme-provider'

// ============================================================================
// USAGE EXAMPLES
// ============================================================================
/**
 * Recommended import patterns:
 * 
 * // For primitive components
 * import { Button, Input, Card } from '@/components/primitives'
 * 
 * // For themed base components
 * import { BettingButton, OddsDisplay } from '@/components/base'
 * 
 * // For application features
 * import { BetSlip, GameCard } from '@/components/composite'
 * 
 * // For layout components
 * import { AppLayout, MainNavbar } from '@/components/layout'
 * 
 * // For form components
 * import { BettingForm, LoginForm } from '@/components/forms'
 * 
 * // For mixed usage (when you need components from multiple layers)
 * import { 
 *   Button,           // primitive
 *   BettingButton,    // base
 *   BetSlip,          // composite
 *   AppLayout         // layout
 * } from '@/components'
 */
