import type { Metadata } from "next"
import { SettingsInterface } from "@/components/composite/settings"
import { UnifiedLayout } from "@/components/layout"

export const metadata: Metadata = {
  title: "Settings | Sports Betting Platform",
  description: "Manage your account settings, preferences, and security options",
}

export default function SettingsPage() {
  return (
    <UnifiedLayout
      showBreadcrumbs
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Settings" }
      ]}
    >
      <SettingsInterface />
    </UnifiedLayout>
  )
}
