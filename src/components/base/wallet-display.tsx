/**
 * Wallet Display Component
 * 
 * Shows current balance and pending transactions in the header.
 * Clicking it opens a dropdown with current bets.
 */

"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/primitives"
import { Badge } from "@/components/primitives"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup
} from "@/components/primitives"
import { cn } from "@/lib/utils"
import {
  Wallet,
  TrendingUp,
  Clock,
  DollarSign,
  ChevronDown,
  ExternalLink
} from "lucide-react"
import { useWallet } from "@/hooks/use-user-data"

// Mock current bets data - in real app this would come from betting context or API
const CURRENT_BETS = [
  {
    id: "1",
    type: "single",
    sport: "Basketball",
    event: "Lakers vs Warriors",
    selection: "Lakers ML",
    odds: -110,
    stake: 50.00,
    potentialWin: 95.45,
    status: "pending",
    placedAt: "2024-01-15T19:30:00Z"
  },
  {
    id: "2", 
    type: "parlay",
    selections: [
      { event: "Chiefs vs Bills", selection: "Chiefs -3.5", odds: -110 },
      { event: "Cowboys vs Eagles", selection: "Over 47.5", odds: -105 }
    ],
    stake: 25.00,
    potentialWin: 89.50,
    status: "pending",
    placedAt: "2024-01-15T16:15:00Z"
  },
  {
    id: "3",
    type: "single",
    sport: "Baseball",
    event: "Dodgers vs Yankees",
    selection: "Over 8.5",
    odds: -105,
    stake: 75.00,
    potentialWin: 146.43,
    status: "pending",
    placedAt: "2024-01-15T14:20:00Z"
  }
]

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

function formatOdds(odds: number): string {
  return odds > 0 ? `+${odds}` : `${odds}`
}

function getBetStatusColor(status: string) {
  switch (status) {
    case 'won':
      return 'text-green-600'
    case 'lost':
      return 'text-red-600'
    case 'pending':
      return 'text-yellow-600'
    default:
      return 'text-gray-600'
  }
}

export interface WalletDisplayProps {
  className?: string
}

export function WalletDisplay({ className }: WalletDisplayProps) {
  const { wallet, isLoading } = useWallet()
  const [isOpen, setIsOpen] = React.useState(false)
  
  // Calculate pending amounts
  const pendingBets = CURRENT_BETS.reduce((sum, bet) => sum + bet.stake, 0)
  const pendingWins = CURRENT_BETS.reduce((sum, bet) => sum + bet.potentialWin, 0)
  const totalPending = pendingBets + pendingWins

  if (isLoading) {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <div className="h-8 w-20 bg-muted animate-pulse rounded" />
        <div className="h-8 w-16 bg-muted animate-pulse rounded" />
      </div>
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className={cn(
            "flex items-center space-x-2 h-8 px-3 hover:bg-white/20 backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg transition-all duration-200",
            className
          )}
        >
          <div className="flex items-center space-x-2">
            <Wallet className="h-4 w-4 text-primary" />
            <div className="hidden sm:flex items-center space-x-2">
              <span className="text-sm font-medium text-green-600">
                {formatCurrency(wallet?.balance || 0)}
              </span>
              {totalPending > 0 && (
                <>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs font-medium text-yellow-600">
                    {formatCurrency(totalPending)}
                  </span>
                </>
              )}
            </div>
            <div className="sm:hidden flex items-center space-x-2">
              <span className="text-sm font-medium text-green-600">
                {formatCurrency(wallet?.balance || 0)}
              </span>
              {totalPending > 0 && (
                <>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs font-medium text-yellow-600">
                    {formatCurrency(totalPending)}
                  </span>
                </>
              )}
            </div>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-100 h-[calc(100vh-60px)] border border-gray-200 shadow-2xl rounded relative top-2 -right-15 z-[10000] bg-white" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Wallet Balance</span>
              <span className="text-sm font-bold text-primary">
                {formatCurrency(wallet?.balance || 0)}
              </span>
            </div>
            {totalPending > 0 && (
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Pending</span>
                <span className="text-yellow-600 font-medium">
                  {formatCurrency(totalPending)}
                </span>
              </div>
            )}
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
            Current Bets ({CURRENT_BETS.length})
          </DropdownMenuLabel>
          
          {CURRENT_BETS.length > 0 ? (
            <div className="overflow-y-auto space-y-2">
              {CURRENT_BETS.map((bet) => (
                <div key={bet.id} className="p-2 rounded border border-white/50  transition-all duration-200">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {bet.type === 'single' ? bet.event : `${bet.selections?.length}-Leg Parlay`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {bet.type === 'single' ? bet.selection : bet.selections?.map(s => s.selection).join(', ')}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {bet.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">Stake:</span>
                      <span className="font-medium">{formatCurrency(bet.stake)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">Potential:</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(bet.potentialWin)}
                      </span>
                    </div>
                  </div>
                  
                                                       {bet.type === 'single' && bet.odds !== undefined && (
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="text-muted-foreground">Odds:</span>
                      <span className="font-medium">{formatOdds(bet.odds)}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No active bets
            </div>
          )}
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild className="hover:bg-white/30 transition-all duration-200 rounded-lg mx-1">
          <Link href="/my-bets" className="flex items-center">
            <ExternalLink className="mr-2 h-4 w-4" />
            <span>View All Bets</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild className="hover:bg-white/30 transition-all duration-200 rounded-lg mx-1">
          <Link href="/dashboard" className="flex items-center">
            <TrendingUp className="mr-2 h-4 w-4" />
            <span>Wallet History</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default WalletDisplay
