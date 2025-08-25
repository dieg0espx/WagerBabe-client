/**
 * Form components - Specialized form components and utilities
 * 
 * These components handle form-specific functionality including
 * validation, submission, and sports betting specific form patterns.
 * They extend the base form primitives with application logic.
 * 
 * Form components should:
 * - Handle form validation and submission
 * - Provide sports betting specific form patterns
 * - Integrate with the application's data layer
 * - Support accessibility and usability best practices
 * - Be reusable across different forms
 */

// Core form components (re-exported from primitives)
export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/primitives/form'

// Enhanced form components (use these instead of the basic FormField)
export {
  FormField,
  FormGroup,
  FormSection,
  formFieldVariants,
  formErrorVariants,
  formHelperVariants
} from '@/components/primitives/form-field'

// TODO: Create these betting specific form components as needed
// export { BettingAmountInput } from './betting-amount-input'
// export { OddsInput } from './odds-input'
// export { TeamSelector } from './team-selector'
// export { LeagueSelector } from './league-selector'
// export { BetTypeSelector } from './bet-type-selector'

// TODO: Create these account and profile forms as needed
// export { LoginForm } from './login-form'
// export { RegisterForm } from './register-form'
// export { ProfileForm } from './profile-form'
// export { PasswordChangeForm } from './password-change-form'

// TODO: Create these financial forms as needed
// export { DepositForm } from './deposit-form'
// export { WithdrawalForm } from './withdrawal-form'
// export { PaymentMethodForm } from './payment-method-form'

// TODO: Create these betting forms as needed
// export { QuickBetForm } from './quick-bet-form'
// export { ParlayBetForm } from './parlay-bet-form'
// export { LiveBetForm } from './live-bet-form'

// TODO: Create these form validation utilities as needed
// export { useFormValidation } from './hooks/use-form-validation'
// export { useBettingFormState } from './hooks/use-betting-form-state'
// export { useFormSubmission } from './hooks/use-form-submission'

// TODO: Create these form validation schemas as needed
// export { bettingFormSchema } from './schemas/betting-form-schema'
// export { accountFormSchema } from './schemas/account-form-schema'
// export { profileFormSchema } from './schemas/profile-form-schema'

// TODO: Add type exports when form components are created
// export type { BettingAmountInputProps } from './betting-amount-input'
// export type { OddsInputProps } from './odds-input'
// export type { TeamSelectorProps } from './team-selector'
// export type { LeagueSelectorProps } from './league-selector'
// export type { BetTypeSelectorProps } from './bet-type-selector'
// export type { LoginFormProps } from './login-form'
// export type { RegisterFormProps } from './register-form'
// export type { ProfileFormProps } from './profile-form'
// export type { PasswordChangeFormProps } from './password-change-form'
// export type { DepositFormProps } from './deposit-form'
// export type { WithdrawalFormProps } from './withdrawal-form'
// export type { PaymentMethodFormProps } from './payment-method-form'
// export type { QuickBetFormProps } from './quick-bet-form'
// export type { ParlayBetFormProps } from './parlay-bet-form'
// export type { LiveBetFormProps } from './live-bet-form'
