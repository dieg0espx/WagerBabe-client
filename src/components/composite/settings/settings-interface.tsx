/**
 * Settings Interface Component
 *
 * Comprehensive settings interface that allows users to configure
 * their account preferences, notification settings, privacy options,
 * and application behavior.
 */

"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives"
import { Button } from "@/components/primitives"
import { Switch } from "@/components/primitives"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/primitives"
import { Label } from "@/components/primitives"
import { Badge } from "@/components/primitives"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/primitives"
import { BettingCard } from "@/components/base"
import { cn } from "@/lib/utils"
import { 
  Settings,
  Bell,
  Shield,
  Eye,
  Moon,
  Sun,
  Globe,
  Smartphone,
  Mail,
  MessageSquare,
  Lock,
  CreditCard,
  AlertTriangle,
  Save,
  RefreshCw,
  Trash2,
  Download,
  Upload
} from "lucide-react"

export interface SettingsInterfaceProps {
  className?: string
}

// Mock settings data
const SETTINGS_DATA = {
  notifications: {
    email: {
      betUpdates: true,
      promotions: false,
      newsletter: true,
      security: true
    },
    sms: {
      betUpdates: false,
      promotions: false,
      security: true
    },
    push: {
      betUpdates: true,
      promotions: true,
      liveScores: true
    }
  },
  privacy: {
    profileVisibility: "private",
    showBettingStats: false,
    shareActivity: false,
    dataCollection: true
  },
  preferences: {
    theme: "system",
    language: "en",
    currency: "USD",
    timezone: "America/New_York",
    oddsFormat: "american",
    defaultStake: 25
  },
  security: {
    twoFactorEnabled: false,
    sessionTimeout: 30,
    loginNotifications: true,
    deviceTracking: true
  }
}

export function SettingsInterface({ className }: SettingsInterfaceProps) {
  const [settings, setSettings] = React.useState(SETTINGS_DATA)
  const [hasChanges, setHasChanges] = React.useState(false)

  const updateSetting = (category: string, key: string, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }))
    setHasChanges(true)
  }

  const updateNestedSetting = (category: string, subcategory: string, key: string, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [subcategory]: {
          ...(prev[category as keyof typeof prev] as Record<string, Record<string, unknown>>)[subcategory],
          [key]: value
        }
      }
    }))
    setHasChanges(true)
  }

  const handleSave = () => {
    // Handle save logic here
    setHasChanges(false)
  }

  const handleReset = () => {
    setSettings(SETTINGS_DATA)
    setHasChanges(false)
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Save Actions */}
      {hasChanges && (
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      )}

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          {/* Email Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-bet-updates">Bet Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications about your bet results and settlements
                  </p>
                </div>
                <Switch
                  id="email-bet-updates"
                  checked={settings.notifications.email.betUpdates}
                  onCheckedChange={(checked) => 
                    updateNestedSetting('notifications', 'email', 'betUpdates', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-promotions">Promotions</Label>
                  <p className="text-sm text-muted-foreground">
                    Special offers and promotional updates
                  </p>
                </div>
                <Switch
                  id="email-promotions"
                  checked={settings.notifications.email.promotions}
                  onCheckedChange={(checked) => 
                    updateNestedSetting('notifications', 'email', 'promotions', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-newsletter">Newsletter</Label>
                  <p className="text-sm text-muted-foreground">
                    Weekly newsletter with betting tips and insights
                  </p>
                </div>
                <Switch
                  id="email-newsletter"
                  checked={settings.notifications.email.newsletter}
                  onCheckedChange={(checked) => 
                    updateNestedSetting('notifications', 'email', 'newsletter', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-security">Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Important security and account notifications
                  </p>
                </div>
                <Switch
                  id="email-security"
                  checked={settings.notifications.email.security}
                  onCheckedChange={(checked) => 
                    updateNestedSetting('notifications', 'email', 'security', checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* SMS Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                SMS Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-bet-updates">Bet Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Text notifications for bet results
                  </p>
                </div>
                <Switch
                  id="sms-bet-updates"
                  checked={settings.notifications.sms.betUpdates}
                  onCheckedChange={(checked) => 
                    updateNestedSetting('notifications', 'sms', 'betUpdates', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-security">Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Critical security notifications via SMS
                  </p>
                </div>
                <Switch
                  id="sms-security"
                  checked={settings.notifications.sms.security}
                  onCheckedChange={(checked) => 
                    updateNestedSetting('notifications', 'sms', 'security', checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Push Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Push Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-bet-updates">Bet Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Browser notifications for bet results
                  </p>
                </div>
                <Switch
                  id="push-bet-updates"
                  checked={settings.notifications.push.betUpdates}
                  onCheckedChange={(checked) => 
                    updateNestedSetting('notifications', 'push', 'betUpdates', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-promotions">Promotions</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications about new promotions and offers
                  </p>
                </div>
                <Switch
                  id="push-promotions"
                  checked={settings.notifications.push.promotions}
                  onCheckedChange={(checked) => 
                    updateNestedSetting('notifications', 'push', 'promotions', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-live-scores">Live Scores</Label>
                  <p className="text-sm text-muted-foreground">
                    Real-time score updates for your bets
                  </p>
                </div>
                <Switch
                  id="push-live-scores"
                  checked={settings.notifications.push.liveScores}
                  onCheckedChange={(checked) => 
                    updateNestedSetting('notifications', 'push', 'liveScores', checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="profile-visibility">Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground">
                    Control who can see your profile information
                  </p>
                </div>
                <Select
                  value={settings.privacy.profileVisibility}
                  onValueChange={(value) => updateSetting('privacy', 'profileVisibility', value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="friends">Friends</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-betting-stats">Show Betting Statistics</Label>
                  <p className="text-sm text-muted-foreground">
                    Display your betting performance on your profile
                  </p>
                </div>
                <Switch
                  id="show-betting-stats"
                  checked={settings.privacy.showBettingStats}
                  onCheckedChange={(checked) => 
                    updateSetting('privacy', 'showBettingStats', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="share-activity">Share Activity</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow sharing of your betting activity with friends
                  </p>
                </div>
                <Switch
                  id="share-activity"
                  checked={settings.privacy.shareActivity}
                  onCheckedChange={(checked) => 
                    updateSetting('privacy', 'shareActivity', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-collection">Data Collection</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow collection of usage data to improve the service
                  </p>
                </div>
                <Switch
                  id="data-collection"
                  checked={settings.privacy.dataCollection}
                  onCheckedChange={(checked) => 
                    updateSetting('privacy', 'dataCollection', checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Application Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={settings.preferences.theme}
                    onValueChange={(value) => updateSetting('preferences', 'theme', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={settings.preferences.language}
                    onValueChange={(value) => updateSetting('preferences', 'language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={settings.preferences.currency}
                    onValueChange={(value) => updateSetting('preferences', 'currency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="odds-format">Odds Format</Label>
                  <Select
                    value={settings.preferences.oddsFormat}
                    onValueChange={(value) => updateSetting('preferences', 'oddsFormat', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="american">American (-110)</SelectItem>
                      <SelectItem value="decimal">Decimal (1.91)</SelectItem>
                      <SelectItem value="fractional">Fractional (10/11)</SelectItem>
                    </SelectContent>
                  </Select>
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
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="two-factor"
                    checked={settings.security.twoFactorEnabled}
                    onCheckedChange={(checked) => 
                      updateSetting('security', 'twoFactorEnabled', checked)
                    }
                  />
                  {!settings.security.twoFactorEnabled && (
                    <Badge variant="outline">Recommended</Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="session-timeout">Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically log out after inactivity (minutes)
                  </p>
                </div>
                <Select
                  value={settings.security.sessionTimeout.toString()}
                  onValueChange={(value) => updateSetting('security', 'sessionTimeout', parseInt(value))}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="60">60</SelectItem>
                    <SelectItem value="120">120</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="login-notifications">Login Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified of new login attempts
                  </p>
                </div>
                <Switch
                  id="login-notifications"
                  checked={settings.security.loginNotifications}
                  onCheckedChange={(checked) => 
                    updateSetting('security', 'loginNotifications', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="device-tracking">Device Tracking</Label>
                  <p className="text-sm text-muted-foreground">
                    Track and manage your logged-in devices
                  </p>
                </div>
                <Switch
                  id="device-tracking"
                  checked={settings.security.deviceTracking}
                  onCheckedChange={(checked) => 
                    updateSetting('security', 'deviceTracking', checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Export Account Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Download a copy of your account data
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Delete Account</Label>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
