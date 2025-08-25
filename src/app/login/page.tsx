import type { Metadata } from "next"
import { UnifiedLayout } from "@/components/layout"
import { Button } from "@/components/primitives"
import { Input } from "@/components/primitives"
import { Label } from "@/components/primitives"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Sign In | Sports Betting Platform",
  description: "Sign in to your account to access your betting dashboard",
}

export default function LoginPage() {
  return (
    <UnifiedLayout
      authMode
      authTitle="Sign In"
      authSubtitle="Welcome back! Please sign in to your account"
      authFooterLinks={[
        { label: "Home", href: "/" },
        { label: "Sign Up", href: "/signup" },
        { label: "Help", href: "/help" }
      ]}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <Link
            href="/forgot-password"
            className="text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button className="w-full" size="lg">
          Sign In
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </UnifiedLayout>
  )
}
