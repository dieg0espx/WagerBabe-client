import type { Metadata } from "next"
import { PromotionsInterface } from "@/components/composite/shared"
import { UnifiedLayout } from "@/components/layout"

export const metadata: Metadata = {
  title: "Promotions | Sports Betting Platform",
  description: "View available promotions, bonuses, and special offers",
}

export default function PromotionsPage() {
  return (
    <UnifiedLayout
      showBreadcrumbs
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Promotions" }
      ]}
    >
      <PromotionsInterface />
    </UnifiedLayout>
  )
}
