import type { Metadata } from "next"
import { LiveBettingInterface } from "@/components/composite/betting"
import { UnifiedLayout } from "@/components/layout"

export const metadata: Metadata = {
  title: "Live Betting | Sports Betting Platform",
  description: "Bet on live games in real-time with up-to-the-minute odds and statistics",
}

export default function LiveBettingPage() {
  return (
    <UnifiedLayout
      showRefresh
      showBreadcrumbs
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Live Betting" }
      ]}
    >
      <LiveBettingInterface />
    </UnifiedLayout>
  )
}
