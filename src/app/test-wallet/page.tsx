import { UnifiedLayout } from "@/components/layout/unified-layout"

export default function TestWalletPage() {
  return (
    <UnifiedLayout
      title="Wallet Display Test"
      subtitle="Testing the wallet display component in the header"
    >
      <div className="space-y-6">
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Wallet Display Test</h2>
          <p className="text-muted-foreground">
            Look at the top-right corner of the header to see the wallet display component.
            It should show:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
            <li>Current balance (from useWallet hook)</li>
            <li>Pending transactions amount</li>
            <li>Click to see current bets dropdown</li>
            <li>Links to view all bets and wallet history</li>
          </ul>
        </div>
        
        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-md font-semibold mb-2">Expected Features:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Header Display:</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Wallet icon</li>
                <li>Current balance ($1,250.50)</li>
                <li>Pending amount ($310.38)</li>
                <li>Chevron down indicator</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Dropdown Content:</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Wallet balance summary</li>
                <li>3 current bets listed</li>
                <li>Bet details (stake, potential win, odds)</li>
                <li>Links to My Bets and Wallet History</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </UnifiedLayout>
  )
}
