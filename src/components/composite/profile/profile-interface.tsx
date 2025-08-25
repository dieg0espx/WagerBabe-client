/**
 * Profile Interface Component
 *
 * Comprehensive user profile management interface that allows users
 * to view and edit their profile information, account details,
 * and personal preferences.
 */

"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives"
import { Button } from "@/components/primitives"
import { Input } from "@/components/primitives"
import { Label } from "@/components/primitives"
import { Badge } from "@/components/primitives"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/primitives"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/primitives"
import { BettingCard } from "@/components/base"
import { cn } from "@/lib/utils"
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  CreditCard,
  Bell,
  Eye,
  EyeOff,
  Edit,
  Save,
  Camera,
  CheckCircle,
  AlertCircle,
  Lock
} from "lucide-react"

export interface ProfileInterfaceProps {
  className?: string
}

// Mock user data
const USER_DATA = {
  id: "user_123",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  dateOfBirth: "1990-05-15",
  address: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States"
  },
  avatar: null,
  joinedAt: "2023-06-15T10:30:00Z",
  isVerified: true,
  accountStatus: "active",
  preferences: {
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    privacy: {
      showProfile: false,
      showStats: true
    }
  }
}

const ACCOUNT_STATS = {
  totalBets: 247,
  totalWagered: 12450.00,
  totalWon: 8920.50,
  winRate: 68.4,
  favoritesSport: "Basketball",
  memberSince: "June 2023"
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(dateString))
}

export function ProfileInterface({ className }: ProfileInterfaceProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [formData, setFormData] = React.useState(USER_DATA)
  const [showSensitiveInfo, setShowSensitiveInfo] = React.useState(false)

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(USER_DATA)
    setIsEditing(false)
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Status Badges */}
      <div className="flex items-center gap-2 justify-end">
        {USER_DATA.isVerified && (
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        )}
        <Badge variant="secondary">{USER_DATA.accountStatus}</Badge>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          {/* Profile Header */}
          <BettingCard>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={formData.avatar || undefined} />
                    <AvatarFallback className="text-2xl">
                      {formData.firstName[0]}{formData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold">
                      {formData.firstName} {formData.lastName}
                    </h2>
                    {USER_DATA.isVerified && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <p className="text-muted-foreground mb-4">{formData.email}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Member since {ACCOUNT_STATS.memberSince}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {formData.address.city}, {formData.address.state}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </BettingCard>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    value={formData.address.street}
                    onChange={(e) => setFormData({
                      ...formData, 
                      address: {...formData.address, street: e.target.value}
                    })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.address.city}
                    onChange={(e) => setFormData({
                      ...formData, 
                      address: {...formData.address, city: e.target.value}
                    })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.address.state}
                    onChange={(e) => setFormData({
                      ...formData, 
                      address: {...formData.address, state: e.target.value}
                    })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.address.zipCode}
                    onChange={(e) => setFormData({
                      ...formData, 
                      address: {...formData.address, zipCode: e.target.value}
                    })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.address.country}
                    onChange={(e) => setFormData({
                      ...formData, 
                      address: {...formData.address, country: e.target.value}
                    })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Account Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Password</h3>
                  <p className="text-sm text-muted-foreground">
                    Last changed 3 months ago
                  </p>
                </div>
                <Button variant="outline">
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant="outline">
                  Enable 2FA
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Login Sessions</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your active login sessions
                  </p>
                </div>
                <Button variant="outline">
                  View Sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive updates via email
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    {formData.preferences.notifications.email ? "Enabled" : "Disabled"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">SMS Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive updates via text message
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    {formData.preferences.notifications.sms ? "Enabled" : "Disabled"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Push Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications in your browser
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    {formData.preferences.notifications.push ? "Enabled" : "Disabled"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BettingCard>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{ACCOUNT_STATS.totalBets}</div>
                <div className="text-sm text-muted-foreground">Total Bets</div>
              </CardContent>
            </BettingCard>

            <BettingCard>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(ACCOUNT_STATS.totalWagered)}
                </div>
                <div className="text-sm text-muted-foreground">Total Wagered</div>
              </CardContent>
            </BettingCard>

            <BettingCard>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {ACCOUNT_STATS.winRate}%
                </div>
                <div className="text-sm text-muted-foreground">Win Rate</div>
              </CardContent>
            </BettingCard>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Betting Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Wagered:</span>
                  <span className="font-medium">{formatCurrency(ACCOUNT_STATS.totalWagered)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Won:</span>
                  <span className="font-medium text-green-600">
                    {formatCurrency(ACCOUNT_STATS.totalWon)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Net Profit:</span>
                  <span className="font-medium text-green-600">
                    +{formatCurrency(ACCOUNT_STATS.totalWon - ACCOUNT_STATS.totalWagered)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Favorite Sport:</span>
                  <span className="font-medium">{ACCOUNT_STATS.favoritesSport}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
