import type { Metadata } from "next"
import { MyBetsClientWrapper } from "@/components/composite/shared"
import { UnifiedLayout } from "@/components/layout"

export const metadata: Metadata = {
  title: "My Bets | Sports Betting Platform",
  description: "View your active bets, betting history, and results",
}

export default function MyBetsPage() {
  return (
    <UnifiedLayout
      showRefresh
      showBreadcrumbs
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "My Bets" }
      ]}
    >
      <MyBetsClientWrapper />
    </UnifiedLayout>
  )
}
