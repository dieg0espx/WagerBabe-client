/**
 * Usage examples for the comprehensive UI component library.
 * These examples demonstrate how components integrate with the wagerbabe theming system.
 */

import React from 'react'
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  Loading,
  Spinner,
  Alert,
  AlertTitle,
  AlertDescription,
  Heading,
  Text,
  FormField,
  FormGroup,
  FormSection,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarActions,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  Breadcrumbs,
  BreadcrumbItem,
} from './index'

// Example: Enhanced Input Components
export function InputExamples() {
  return (
    <div className="space-y-4 p-6">
      <Heading level={3}>Input Component Examples</Heading>
      
      <FormField label="Email Address" required>
        <Input type="email" placeholder="Enter your email" />
      </FormField>

      <FormField 
        label="Password" 
        helper="Must be at least 8 characters"
        required
      >
        <Input type="password" placeholder="Enter password" />
      </FormField>

      <FormField 
        label="Amount" 
        error="Please enter a valid amount"
      >
        <Input 
          type="number" 
          placeholder="0.00" 
          variant="error"
        />
      </FormField>

      <FormField label="Bet Amount" helper="Minimum bet: $1.00">
        <Input 
          type="number" 
          placeholder="Enter bet amount" 
          variant="success"
          size="lg"
        />
      </FormField>
    </div>
  )
}

// Example: Loading States
export function LoadingExamples() {
  return (
    <div className="space-y-6 p-6">
      <Heading level={3}>Loading Component Examples</Heading>
      
      <div className="space-y-4">
        <Text>Inline spinners:</Text>
        <div className="flex items-center gap-4">
          <Spinner size="xs" />
          <Spinner size="sm" />
          <Spinner size="default" />
          <Spinner size="lg" />
          <Spinner size="xl" />
        </div>
      </div>

      <div className="space-y-4">
        <Text>Loading with text:</Text>
        <Loading showText text="Loading odds..." variant="live" />
      </div>

      <div className="space-y-4">
        <Text>Button with loading state:</Text>
        <Button disabled>
          <Spinner size="sm" className="mr-2" />
          Placing Bet...
        </Button>
      </div>
    </div>
  )
}

// Example: Alert/Notification Components
export function AlertExamples() {
  return (
    <div className="space-y-4 p-6">
      <Heading level={3}>Alert Component Examples</Heading>
      
      <Alert variant="success" dismissible>
        <AlertTitle>Bet Placed Successfully!</AlertTitle>
        <AlertDescription>
          Your bet of $50 on Lakers to win has been placed.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertTitle>Insufficient Funds</AlertTitle>
        <AlertDescription>
          You need at least $25 to place this bet. Please add funds to your account.
        </AlertDescription>
      </Alert>

      <Alert variant="warning" dismissible>
        <AlertTitle>Odds Changed</AlertTitle>
        <AlertDescription>
          The odds for this bet have changed from +150 to +140.
        </AlertDescription>
      </Alert>

      <Alert variant="live">
        <AlertTitle>Live Betting Available</AlertTitle>
        <AlertDescription>
          This game is now live! Place your in-game bets.
        </AlertDescription>
      </Alert>
    </div>
  )
}

// Example: Typography Components
export function TypographyExamples() {
  return (
    <div className="space-y-6 p-6">
      <Heading level={1}>Main Page Title</Heading>
      <Heading level={2} variant="primary">Sports Betting Dashboard</Heading>
      <Heading level={3} variant="muted">Recent Activity</Heading>
      
      <Text size="lg">
        Welcome to WagerBabe, your premier sports betting platform.
      </Text>
      
      <Text variant="muted">
        Place bets on your favorite teams and track your winnings.
      </Text>
      
      <Text variant="success" weight="semibold">
        You&apos;re up $250 this week!
      </Text>
      
      <Text variant="destructive" size="sm">
        Warning: Gambling can be addictive. Please bet responsibly.
      </Text>
    </div>
  )
}

// Example: Form Components
export function FormExamples() {
  return (
    <div className="space-y-6 p-6">
      <Heading level={3}>Form Component Examples</Heading>
      
      <FormSection 
        title="Account Information" 
        description="Update your account details"
      >
        <FormGroup legend="Personal Details">
          <FormField label="Full Name" required>
            <Input placeholder="Enter your full name" />
          </FormField>
          
          <FormField 
            label="Email" 
            helper="We'll never share your email"
            required
          >
            <Input type="email" placeholder="your@email.com" />
          </FormField>
        </FormGroup>

        <FormGroup legend="Betting Preferences">
          <FormField label="Default Bet Amount">
            <Input
              type="number"
              placeholder="25.00"
            />
          </FormField>
        </FormGroup>
      </FormSection>
    </div>
  )
}

// Example: Navigation Components
export function NavigationExamples() {
  return (
    <div className="space-y-6">
      <Heading level={3} className="p-6">Navigation Component Examples</Heading>
      
      {/* Navbar Example */}
      <Navbar variant="sportsbook">
        <NavbarBrand>
          <Text weight="bold" size="lg">WagerBabe</Text>
        </NavbarBrand>
        <NavbarContent>
          <Button variant="ghost">Sports</Button>
          <Button variant="ghost">Live</Button>
          <Button variant="ghost">Casino</Button>
        </NavbarContent>
        <NavbarActions>
          <Button variant="outline" size="sm">Login</Button>
          <Button size="sm">Sign Up</Button>
        </NavbarActions>
      </Navbar>

      {/* Breadcrumbs Example */}
      <div className="p-6">
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/sports">Sports</BreadcrumbItem>
          <BreadcrumbItem href="/sports/nfl">NFL</BreadcrumbItem>
          <BreadcrumbItem active>Game Details</BreadcrumbItem>
        </Breadcrumbs>
      </div>

      {/* Sidebar Example */}
      <div className="flex h-96">
        <Sidebar variant="sportsbook">
          <SidebarHeader>
            <Text weight="semibold">Sports Menu</Text>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Popular Sports</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarItem active>🏈 NFL</SidebarItem>
                <SidebarItem>🏀 NBA</SidebarItem>
                <SidebarItem>⚽ Soccer</SidebarItem>
                <SidebarItem>⚾ MLB</SidebarItem>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-6">
          <Text>Main content area</Text>
        </div>
      </div>
    </div>
  )
}

// Complete example showing integration
export function CompleteExample() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="sportsbook">
        <NavbarBrand>WagerBabe</NavbarBrand>
        <NavbarActions>
          <Button variant="outline">Login</Button>
        </NavbarActions>
      </Navbar>
      
      <div className="container mx-auto p-6 space-y-6">
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem active>Dashboard</BreadcrumbItem>
        </Breadcrumbs>

        <Heading level={1}>Sports Betting Dashboard</Heading>

        <Alert variant="live" dismissible>
          <AlertTitle>Live Games Available</AlertTitle>
          <AlertDescription>
            5 games are currently live for in-game betting.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Place a Bet</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField label="Bet Amount" required>
                <Input 
                  type="number" 
                  placeholder="Enter amount" 
                  variant="default"
                />
              </FormField>
              <Button className="w-full mt-4">
                Place Bet
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <Loading showText text="Loading recent bets..." />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
