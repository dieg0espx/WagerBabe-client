# Betting Toast Component Usage Guide

The `betting-toast` component provides a reusable, consistent way to show toast notifications throughout the betting application.

## Basic Usage

### Import the component
```typescript
import { bettingToast, bettingToasts } from "@/components/base/betting-toast"
```

## Available Methods

### Main `bettingToast` object
- `bettingToast.success(options)` - Success notifications
- `bettingToast.error(options)` - Error notifications  
- `bettingToast.warning(options)` - Warning notifications
- `bettingToast.info(options)` - Info notifications
- `bettingToast.deposit(options)` - Deposit-related notifications
- `bettingToast.withdrawal(options)` - Withdrawal-related notifications
- `bettingToast.win(options)` - Bet win notifications
- `bettingToast.loss(options)` - Bet loss notifications
- `bettingToast.custom(type, options)` - Custom type notifications

### Convenience `bettingToasts` object
- `bettingToasts.wagerPlaced(amount)` - When a bet is placed successfully
- `bettingToasts.wagerFailed(error)` - When a bet placement fails
- `bettingToasts.betWon(amount, description?)` - When a bet wins
- `bettingToasts.betLost(amount, description?)` - When a bet loses
- `bettingToasts.depositSuccess(amount)` - When a deposit is successful
- `bettingToasts.withdrawalSuccess(amount)` - When a withdrawal is successful
- `bettingToasts.balanceLow(currentBalance)` - When balance is low

## Options Interface

```typescript
interface BettingToastOptions {
  title: string
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
  amount?: number
  odds?: number
}
```

## Examples

### Basic success toast
```typescript
bettingToast.success({
  title: "Success!",
  description: "Operation completed successfully"
})
```

### Toast with amount
```typescript
bettingToast.deposit({
  title: "Deposit Successful",
  description: "Your funds have been added",
  amount: 100.50
})
```

### Toast with action button
```typescript
bettingToast.warning({
  title: "Low Balance",
  description: "Consider adding funds",
  action: {
    label: "Deposit Now",
    onClick: () => navigateToDeposit()
  }
})
```

### Using convenience functions
```typescript
// When placing a bet
bettingToasts.wagerPlaced(50.00)

// When a bet fails
bettingToasts.wagerFailed("Insufficient funds")

// When a bet wins
bettingToasts.betWon(95.45, "Lakers ML hit!")

// When balance is low
bettingToasts.balanceLow(25.50)
```

## Styling

All toasts come with:
- Gradient backgrounds
- Appropriate icons
- Consistent styling
- Responsive design
- Dark mode support

## Toast Types and Colors

- **Success/Deposit/Win**: Green gradient
- **Error/Loss**: Red gradient  
- **Warning**: Orange gradient
- **Info**: Blue gradient
- **Withdrawal**: Purple gradient

## Duration

- Success/Info/Warning: 4 seconds
- Error: 5 seconds
- Customizable via `duration` option
