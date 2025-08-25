/**
 * Reusable Betting Toast Component
 * 
 * Provides consistent toast notifications for betting-related actions
 * with sports betting themed styling and behavior.
 */

"use client"

import { toast as sonnerToast, ToastT } from "sonner"
import { CheckCircle, XCircle, AlertCircle, Info, DollarSign, TrendingUp } from "lucide-react"

export interface BettingToastOptions {
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

export type BettingToastType = 
  | 'success' 
  | 'error' 
  | 'warning' 
  | 'info'
  | 'deposit'
  | 'withdrawal'
  | 'win'
  | 'loss'

const toastIcons = {
  success: <CheckCircle className="h-4 w-4 text-green-600" />,
  error: <XCircle className="h-4 w-4 text-red-600" />,
  warning: <AlertCircle className="h-4 w-4 text-yellow-600" />,
  info: <Info className="h-4 w-4 text-blue-600" />,
  deposit: <DollarSign className="h-4 w-4 text-green-600" />,
  withdrawal: <DollarSign className="h-4 w-4 text-purple-600" />,
  win: <TrendingUp className="h-4 w-4 text-green-600" />,
  loss: <XCircle className="h-4 w-4 text-red-600" />
}

const toastStyles = {
  success: {
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "white",
    border: "1px solid #10b981",
  },
  error: {
    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    color: "white", 
    border: "1px solid #ef4444",
  },
  warning: {
    background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    color: "white",
    border: "1px solid #f59e0b",
  },
  info: {
    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
    color: "white",
    border: "1px solid #3b82f6",
  },
  deposit: {
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "white",
    border: "1px solid #10b981",
  },
  withdrawal: {
    background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
    color: "white",
    border: "1px solid #8b5cf6",
  },
  win: {
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "white",
    border: "1px solid #10b981",
  },
  loss: {
    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    color: "white",
    border: "1px solid #ef4444",
  }
}

export const bettingToast = {
  success: (options: BettingToastOptions) => {
    const { title, description, duration = 4000, action, amount, odds } = options
    
    let fullDescription = description || ""
    if (amount) {
      fullDescription += fullDescription ? ` | Amount: $${amount.toFixed(2)}` : `Amount: $${amount.toFixed(2)}`
    }
    if (odds) {
      fullDescription += fullDescription ? ` | Odds: ${odds > 0 ? '+' : ''}${odds}` : `Odds: ${odds > 0 ? '+' : ''}${odds}`
    }

    return sonnerToast.success(title, {
      description: fullDescription,
      icon: toastIcons.success,
      duration,
      style: toastStyles.success,
      action: action ? {
        label: action.label,
        onClick: action.onClick
      } : undefined
    })
  },

  error: (options: BettingToastOptions) => {
    const { title, description, duration = 5000, action } = options
    
    return sonnerToast.error(title, {
      description,
      icon: toastIcons.error,
      duration,
      style: toastStyles.error,
      action: action ? {
        label: action.label,
        onClick: action.onClick
      } : undefined
    })
  },

  warning: (options: BettingToastOptions) => {
    const { title, description, duration = 4000, action } = options
    
    return sonnerToast.warning(title, {
      description,
      icon: toastIcons.warning,
      duration,
      style: toastStyles.warning,
      action: action ? {
        label: action.label,
        onClick: action.onClick
      } : undefined
    })
  },

  info: (options: BettingToastOptions) => {
    const { title, description, duration = 4000, action } = options
    
    return sonnerToast.info(title, {
      description,
      icon: toastIcons.info,
      duration,
      style: toastStyles.info,
      action: action ? {
        label: action.label,
        onClick: action.onClick
      } : undefined
    })
  },

  deposit: (options: BettingToastOptions) => {
    const { title, description, duration = 4000, action, amount } = options
    
    let fullDescription = description || ""
    if (amount) {
      fullDescription += fullDescription ? ` | Amount: $${amount.toFixed(2)}` : `Amount: $${amount.toFixed(2)}`
    }

    return sonnerToast.success(title, {
      description: fullDescription,
      icon: toastIcons.deposit,
      duration,
      style: toastStyles.deposit,
      action: action ? {
        label: action.label,
        onClick: action.onClick
      } : undefined
    })
  },

  withdrawal: (options: BettingToastOptions) => {
    const { title, description, duration = 4000, action, amount } = options
    
    let fullDescription = description || ""
    if (amount) {
      fullDescription += fullDescription ? ` | Amount: $${amount.toFixed(2)}` : `Amount: $${amount.toFixed(2)}`
    }

    return sonnerToast.success(title, {
      description: fullDescription,
      icon: toastIcons.withdrawal,
      duration,
      style: toastStyles.withdrawal,
      action: action ? {
        label: action.label,
        onClick: action.onClick
      } : undefined
    })
  },

  win: (options: BettingToastOptions) => {
    const { title, description, duration = 4000, action, amount } = options
    
    let fullDescription = description || ""
    if (amount) {
      fullDescription += fullDescription ? ` | Winnings: $${amount.toFixed(2)}` : `Winnings: $${amount.toFixed(2)}`
    }

    return sonnerToast.success(title, {
      description: fullDescription,
      icon: toastIcons.win,
      duration,
      style: toastStyles.win,
      action: action ? {
        label: action.label,
        onClick: action.onClick
      } : undefined
    })
  },

  loss: (options: BettingToastOptions) => {
    const { title, description, duration = 4000, action, amount } = options
    
    let fullDescription = description || ""
    if (amount) {
      fullDescription += fullDescription ? ` | Loss: $${amount.toFixed(2)}` : `Loss: $${amount.toFixed(2)}`
    }

    return sonnerToast.error(title, {
      description: fullDescription,
      icon: toastIcons.loss,
      duration,
      style: toastStyles.loss,
      action: action ? {
        label: action.label,
        onClick: action.onClick
      } : undefined
    })
  },

  // Generic method for custom types
  custom: (type: BettingToastType, options: BettingToastOptions) => {
    const { title, description, duration = 4000, action, amount, odds } = options
    
    let fullDescription = description || ""
    if (amount) {
      fullDescription += fullDescription ? ` | Amount: $${amount.toFixed(2)}` : `Amount: $${amount.toFixed(2)}`
    }
    if (odds) {
      fullDescription += fullDescription ? ` | Odds: ${odds > 0 ? '+' : ''}${odds}` : `Odds: ${odds > 0 ? '+' : ''}${odds}`
    }

    const toastMethod = type === 'success' || type === 'deposit' || type === 'win' ? 'success' : 
                       type === 'error' || type === 'loss' ? 'error' : 
                       type === 'warning' ? 'warning' : 'info'

    return sonnerToast[toastMethod](title, {
      description: fullDescription,
      icon: toastIcons[type],
      duration,
      style: toastStyles[type],
      action: action ? {
        label: action.label,
        onClick: action.onClick
      } : undefined
    })
  }
}

// Convenience functions for common betting actions
export const bettingToasts = {
  wagerPlaced: (amount: number) => bettingToast.success({
    title: "Wager Placed Successfully!",
    description: "Your bet has been placed. Good luck!",
    amount
  }),

  wagerFailed: (error: string) => bettingToast.error({
    title: "Failed to Place Wager",
    description: error || "An error occurred while placing your bet."
  }),

  betWon: (amount: number, description?: string) => bettingToast.win({
    title: "Congratulations! You Won!",
    description: description || "Your bet was successful!",
    amount
  }),

  betLost: (amount: number, description?: string) => bettingToast.loss({
    title: "Better Luck Next Time",
    description: description || "Your bet didn't win this time.",
    amount
  }),

  depositSuccess: (amount: number) => bettingToast.deposit({
    title: "Deposit Successful",
    description: "Your funds have been added to your account.",
    amount
  }),

  withdrawalSuccess: (amount: number) => bettingToast.withdrawal({
    title: "Withdrawal Successful", 
    description: "Your withdrawal request has been processed.",
    amount
  }),

  balanceLow: (currentBalance: number) => bettingToast.warning({
    title: "Low Balance Warning",
    description: `Your current balance is $${currentBalance.toFixed(2)}. Consider adding funds.`,
    action: {
      label: "Deposit",
      onClick: () => {
        // Navigate to deposit page or open deposit modal
        console.log("Navigate to deposit page")
      }
    }
  })
}

export default bettingToast
