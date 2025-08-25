/**
 * Payment Dashboard Component
 * 
 * Comprehensive payment and balance overview dashboard that displays
 * wallet balance, transaction history, payment methods, and financial
 * analytics for the user's account.
 */

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives"
import { Button } from "@/components/primitives"
import { Badge } from "@/components/primitives"
import { BettingCard } from "@/components/base"
import { cn } from "@/lib/utils"
import { 
  Wallet,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Plus,
  Minus,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react"

export interface PaymentDashboardProps {
  className?: string
}

// Mock data for demonstration
const WALLET_DATA = {
  balance: 1247.50,
  pendingDeposits: 0,
  pendingWithdrawals: 250.00,
  totalDeposited: 5420.00,
  totalWithdrawn: 3890.00,
  netProfit: 1530.00
}

const RECENT_TRANSACTIONS = [
  {
    id: "1",
    type: "deposit",
    amount: 500.00,
    status: "completed",
    method: "Credit Card",
    date: "2024-01-15T10:30:00Z",
    description: "Deposit via Visa ****1234"
  },
  {
    id: "2", 
    type: "withdrawal",
    amount: 250.00,
    status: "pending",
    method: "Bank Transfer",
    date: "2024-01-14T15:45:00Z",
    description: "Withdrawal to Bank Account"
  },
  {
    id: "3",
    type: "bet_win",
    amount: 125.50,
    status: "completed", 
    method: "Bet Settlement",
    date: "2024-01-14T12:20:00Z",
    description: "Lakers vs Warriors - Over 215.5"
  },
  {
    id: "4",
    type: "deposit",
    amount: 200.00,
    status: "completed",
    method: "PayPal",
    date: "2024-01-13T09:15:00Z",
    description: "Deposit via PayPal"
  },
  {
    id: "5",
    type: "bet_loss",
    amount: 75.00,
    status: "completed",
    method: "Bet Settlement", 
    date: "2024-01-13T20:30:00Z",
    description: "Chiefs vs Bills - Chiefs ML"
  }
]

const PAYMENT_METHODS = [
  {
    id: "1",
    type: "credit_card",
    name: "Visa ****1234",
    isDefault: true,
    expiryDate: "12/26"
  },
  {
    id: "2",
    type: "paypal", 
    name: "PayPal Account",
    isDefault: false,
    email: "user@example.com"
  },
  {
    id: "3",
    type: "bank_transfer",
    name: "Bank Account ****5678",
    isDefault: false,
    bankName: "Chase Bank"
  }
]

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString))
}

function getTransactionIcon(type: string) {
  switch (type) {
    case 'deposit':
      return ArrowDownLeft
    case 'withdrawal':
      return ArrowUpRight
    case 'bet_win':
      return TrendingUp
    case 'bet_loss':
      return TrendingDown
    default:
      return DollarSign
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'completed':
      return CheckCircle
    case 'pending':
      return Clock
    case 'failed':
      return XCircle
    default:
      return AlertCircle
  }
}

export function PaymentDashboard({ className }: PaymentDashboardProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Deposit
        </Button>
        <Button variant="outline">
          <Minus className="h-4 w-4 mr-2" />
          Withdraw
        </Button>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BettingCard variant="featured" className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Account Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-primary">
                  {formatCurrency(WALLET_DATA.balance)}
                </div>
                <p className="text-sm text-muted-foreground">Available Balance</p>
              </div>
              
              {WALLET_DATA.pendingWithdrawals > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span className="text-muted-foreground">Pending Withdrawal:</span>
                  <span className="font-medium">{formatCurrency(WALLET_DATA.pendingWithdrawals)}</span>
                </div>
              )}
            </div>
          </CardContent>
        </BettingCard>

        <BettingCard>
          <CardHeader>
            <CardTitle className="text-lg">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className={cn(
                "text-2xl font-bold",
                WALLET_DATA.netProfit >= 0 ? "text-green-600" : "text-red-600"
              )}>
                {WALLET_DATA.netProfit >= 0 ? "+" : ""}{formatCurrency(WALLET_DATA.netProfit)}
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Deposited: {formatCurrency(WALLET_DATA.totalDeposited)}</div>
                <div>Withdrawn: {formatCurrency(WALLET_DATA.totalWithdrawn)}</div>
              </div>
            </div>
          </CardContent>
        </BettingCard>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {RECENT_TRANSACTIONS.map((transaction) => {
              const TransactionIcon = getTransactionIcon(transaction.type)
              const StatusIcon = getStatusIcon(transaction.status)
              
              return (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-full",
                      transaction.type === 'deposit' && "bg-green-100 text-green-600",
                      transaction.type === 'withdrawal' && "bg-blue-100 text-blue-600", 
                      transaction.type === 'bet_win' && "bg-green-100 text-green-600",
                      transaction.type === 'bet_loss' && "bg-red-100 text-red-600"
                    )}>
                      <TransactionIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(transaction.date)} • {transaction.method}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "font-medium",
                      (transaction.type === 'deposit' || transaction.type === 'bet_win') && "text-green-600",
                      (transaction.type === 'withdrawal' || transaction.type === 'bet_loss') && "text-red-600"
                    )}>
                      {(transaction.type === 'deposit' || transaction.type === 'bet_win') ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </div>
                    <div className="flex items-center gap-1">
                      <StatusIcon className={cn(
                        "h-4 w-4",
                        transaction.status === 'completed' && "text-green-500",
                        transaction.status === 'pending' && "text-yellow-500",
                        transaction.status === 'failed' && "text-red-500"
                      )} />
                      <Badge variant={
                        transaction.status === 'completed' ? 'default' :
                        transaction.status === 'pending' ? 'secondary' : 'destructive'
                      }>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PAYMENT_METHODS.map((method) => (
              <div key={method.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{method.name}</div>
                  {method.isDefault && (
                    <Badge variant="secondary">Default</Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {method.expiryDate && `Expires ${method.expiryDate}`}
                  {method.email && method.email}
                  {method.bankName && method.bankName}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
