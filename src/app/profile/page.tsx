"use client"

import type { Metadata } from "next"
import { ProfileInterface } from "@/components/composite/profile/profile-interface"
import { UnifiedLayout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives"
import { Button } from "@/components/primitives"
import { Badge } from "@/components/primitives"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/primitives"
import {
  User,
  Settings,
  Shield,
  Bell,
  CreditCard,
  Activity,
  CheckCircle,
  AlertCircle,
  Star,
  TrendingUp,
  Calendar
} from "lucide-react"

// Mock user data
const USER_DATA = {
  name: "John Doe",
  email: "john.doe@example.com",
  username: "johndoe123",
  joinDate: "January 2024",
  verified: true,
  vipLevel: "Gold",
  totalBets: 247,
  winRate: 67,
  totalWinnings: 2450.75,
  favoriteTeams: ["Lakers", "Chiefs", "Yankees"],
  recentActivity: [
    { type: "bet_placed", description: "Placed bet on Lakers vs Warriors", time: "2 hours ago" },
    { type: "withdrawal", description: "Withdrew $500 to bank account", time: "1 day ago" },
    { type: "deposit", description: "Deposited $200 via credit card", time: "3 days ago" }
  ]
}

export default function ProfilePage() {
  return (
    <UnifiedLayout
      title="Profile"
      subtitle="Manage your account information, preferences, and security settings"
      showBreadcrumbs
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Profile" }
      ]}
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Profile Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-semibold">{USER_DATA.name}</h2>
                    {USER_DATA.verified && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      <Star className="h-3 w-3 mr-1" />
                      {USER_DATA.vipLevel}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-1">@{USER_DATA.username}</p>
                  <p className="text-muted-foreground mb-3">{USER_DATA.email}</p>
                  <p className="text-sm text-muted-foreground">
                    Member since {USER_DATA.joinDate}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Bets</span>
                <span className="font-semibold">{USER_DATA.totalBets}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Win Rate</span>
                <span className="font-semibold text-green-600">{USER_DATA.winRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Winnings</span>
                <span className="font-semibold text-green-600">
                  ${USER_DATA.totalWinnings.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">VIP Level</span>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                  {USER_DATA.vipLevel}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Management Tabs */}
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <ProfileInterface />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Enabled</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Email Verification</h4>
                    <p className="text-sm text-muted-foreground">Verify your email address</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Verified</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Phone Verification</h4>
                    <p className="text-sm text-muted-foreground">Verify your phone number</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-yellow-600">Pending</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Bet Results</h4>
                    <p className="text-sm text-muted-foreground">Get notified when your bets settle</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Promotions</h4>
                    <p className="text-sm text-muted-foreground">Receive promotional offers</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Account Updates</h4>
                    <p className="text-sm text-muted-foreground">Important account notifications</p>
                  </div>
                  <Button variant="outline" size="sm">Enabled</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Visa ****1234</h4>
                    <Badge variant="secondary">Default</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Expires 12/26</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">PayPal Account</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                </div>
                <Button variant="outline" className="w-full">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {USER_DATA.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.description}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Favorite Teams */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Favorite Teams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {USER_DATA.favoriteTeams.map((team) => (
                <Badge key={team} variant="outline" className="px-3 py-1">
                  {team}
                </Badge>
              ))}
              <Button variant="outline" size="sm">
                Add Team
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </UnifiedLayout>
  )
}
