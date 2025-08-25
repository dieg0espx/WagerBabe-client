"use client"

import { Button } from "@/components/primitives"
import { Badge } from "@/components/primitives"
import { 
  Home, 
  TrendingUp, 
  Receipt, 
  Menu,
  RefreshCw
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileSportsNavigationProps {
  selectedBetsCount?: number
  onOpenSidebar?: () => void
  onRefresh?: () => void
  isRefreshing?: boolean
  onOpenBetSlip?: () => void
  className?: string
}

export function MobileSportsNavigation({
  selectedBetsCount = 0,
  onOpenSidebar,
  onRefresh,
  isRefreshing = false,
  onOpenBetSlip,
  className
}: MobileSportsNavigationProps) {
  return (
    <div className={cn(
      "mobile-nav fixed bottom-0 left-0 right-0 z-50 md:hidden",
      "bg-background/95 backdrop-blur-sm border-t border-border/50",
      "px-4 py-2 safe-area-bottom",
      className
    )}>
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenSidebar}
          className="flex flex-col items-center gap-1 h-12 px-3 hover:bg-accent/50 active:scale-95"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
          <span className="text-xs font-medium">Menu</span>
        </Button>

        {/* Home Button */}
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 h-12 px-3 hover:bg-accent/50 active:scale-95"
          aria-label="Go to home"
        >
          <Home className="h-5 w-5" />
          <span className="text-xs font-medium">Home</span>
        </Button>

        {/* Refresh Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex flex-col items-center gap-1 h-12 px-3 hover:bg-accent/50 active:scale-95"
          aria-label="Refresh games"
        >
          <RefreshCw className={cn(
            "h-5 w-5",
            isRefreshing && "animate-spin"
          )} />
          <span className="text-xs font-medium">Refresh</span>
        </Button>

        {/* Markets Button */}
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 h-12 px-3 hover:bg-accent/50 active:scale-95"
          aria-label="View markets"
        >
          <TrendingUp className="h-5 w-5" />
          <span className="text-xs font-medium">Markets</span>
        </Button>

        {/* Bet Slip Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenBetSlip}
          className="flex flex-col items-center gap-1 h-12 px-3 hover:bg-accent/50 active:scale-95 relative"
          aria-label={`Open bet slip${selectedBetsCount > 0 ? ` with ${selectedBetsCount} bet${selectedBetsCount !== 1 ? 's' : ''}` : ''}`}
        >
          <Receipt className="h-5 w-5" />
          <span className="text-xs font-medium">Bet Slip</span>
          {selectedBetsCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground"
              aria-label={`${selectedBetsCount} bets`}
            >
              {selectedBetsCount > 99 ? '99+' : selectedBetsCount}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  )
}

interface MobileQuickBetButtonProps {
  selectedBetsCount: number
  onClick?: () => void
  className?: string
}

export function MobileQuickBetButton({
  selectedBetsCount,
  onClick,
  className
}: MobileQuickBetButtonProps) {
  if (selectedBetsCount === 0) {
    return null
  }

  return (
    <div className={cn(
      "fixed bottom-20 right-4 z-40 md:hidden",
      className
    )}>
      <Button
        onClick={onClick}
        className="rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
        aria-label={`Quick bet slip with ${selectedBetsCount} bet${selectedBetsCount !== 1 ? 's' : ''}`}
      >
        <div className="flex flex-col items-center">
          <Receipt className="h-5 w-5" />
          <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-destructive text-destructive-foreground">
            {selectedBetsCount > 99 ? '99+' : selectedBetsCount}
          </Badge>
        </div>
      </Button>
    </div>
  )
}
