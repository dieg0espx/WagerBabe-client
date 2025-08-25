import type { Metadata } from "next"
import { UnifiedLayout } from "@/components/layout"
import { Button } from "@/components/primitives"
import { Input } from "@/components/primitives"
import { Label } from "@/components/primitives"
import { Checkbox } from "@/components/primitives"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Sign Up | Sports Betting Platform",
  description: "Create a new account to start tracking your betting activity",
}

export default function SignUpPage() {
  return (
    <UnifiedLayout
      authMode
      authTitle="Create Account"
      authSubtitle="Join WagerBabe and start your betting journey"
      authFooterLinks={[
        { label: "Home", href: "/" },
        { label: "Sign In", href: "/login" },
        { label: "Help", href: "/help" }
      ]}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="John"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a strong password"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" required />
          <Label htmlFor="terms" className="text-sm">
            I agree to the{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </Label>
        </div>

        <Button className="w-full" size="lg">
          Create Account
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </UnifiedLayout>
  )
}
