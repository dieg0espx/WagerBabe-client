/**
 * Unified Layout Component
 * 
 * Single layout component that handles all page layouts with optional features.
 * Replaces AppLayout, PageLayout, and other redundant layout components.
 */

"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/primitives"
import { Badge } from "@/components/primitives"
import { Breadcrumbs, BreadcrumbItem } from "@/components/primitives"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from "@/components/primitives"
import { ThemeToggle } from "./theme-toggle"
import { WalletDisplay } from "@/components/base"
import { cn } from "@/lib/utils"
import {
  Home,
  Trophy,
  Zap,
  History,
  User,
  Settings,
  Gift,
  CreditCard,
  Dice1,
  Menu,
  X,
  ArrowLeft,
  RefreshCw,
  LogOut,
  ChevronRight,
  ChevronDown,
  Target
} from "lucide-react"

export interface UnifiedLayoutProps {
  children: React.ReactNode
  
  // Page configuration
  title?: string
  subtitle?: string
  
  // Navigation options
  showNavigation?: boolean
  showBreadcrumbs?: boolean
  breadcrumbs?: Array<{ label: string; href?: string }>
  
  // Page actions
  showBackButton?: boolean
  onBack?: () => void
  showRefresh?: boolean
  onRefresh?: () => void
  actions?: React.ReactNode
  
  // Layout options
  fullWidth?: boolean
  className?: string
  
  // Auth layout mode (for login/signup pages)
  authMode?: boolean
  authTitle?: string
  authSubtitle?: string
  authFooterLinks?: Array<{ label: string; href: string }>
}

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  submenu?: SubmenuItem[]
}

interface SubmenuItem {
  name: string
  href: string
  emoji: string
  submenu?: SubmenuItem[]
}

// Sports and Leagues Data
const SPORTS_SUBMENU: SubmenuItem[] = [
  {
    name: "Football",
    href: "/?sport=football",
    emoji: "🏈",
    submenu: [
      { name: "NFL", href: "/?sport=football&league=nfl", emoji: "🏈" },
      { name: "College Football", href: "/?sport=football&league=college", emoji: "🏈" },
      { name: "CFL", href: "/?sport=football&league=cfl", emoji: "🏈" },
      { name: "XFL", href: "/?sport=football&league=xfl", emoji: "🏈" },
      { name: "USFL", href: "/?sport=football&league=usfl", emoji: "🏈" }
    ]
  },
  {
    name: "Basketball",
    href: "/?sport=basketball",
    emoji: "🏀",
    submenu: [
      { name: "NBA", href: "/?sport=basketball&league=nba", emoji: "🏀" },
      { name: "College Basketball", href: "/?sport=basketball&league=college", emoji: "🏀" },
      { name: "WNBA", href: "/?sport=basketball&league=wnba", emoji: "🏀" },
      { name: "G League", href: "/?sport=basketball&league=g-league", emoji: "🏀" }
    ]
  },
  {
    name: "Baseball",
    href: "/?sport=baseball",
    emoji: "⚾",
    submenu: [
      { name: "MLB", href: "/?sport=baseball&league=mlb", emoji: "⚾" },
      { name: "Minor League", href: "/?sport=baseball&league=minor-league", emoji: "⚾" },
      { name: "NPB (Japan)", href: "/?sport=baseball&league=npb", emoji: "⚾" },
      { name: "KBO (Korea)", href: "/?sport=baseball&league=kbo", emoji: "⚾" }
    ]
  },
  {
    name: "Hockey",
    href: "/?sport=hockey",
    emoji: "🏒",
    submenu: [
      { name: "NHL", href: "/?sport=hockey&league=nhl", emoji: "🏒" },
      { name: "AHL", href: "/?sport=hockey&league=ahl", emoji: "🏒" },
      { name: "NCAA Hockey", href: "/?sport=hockey&league=ncaa", emoji: "🏒" },
      { name: "KHL", href: "/?sport=hockey&league=khl", emoji: "🏒" }
    ]
  },
  {
    name: "Soccer",
    href: "/?sport=soccer",
    emoji: "⚽",
    submenu: [
      { name: "Premier League", href: "/?sport=soccer&league=premier-league", emoji: "⚽" },
      { name: "La Liga", href: "/?sport=soccer&league=la-liga", emoji: "⚽" },
      { name: "Bundesliga", href: "/?sport=soccer&league=bundesliga", emoji: "⚽" },
      { name: "Serie A", href: "/?sport=soccer&league=serie-a", emoji: "⚽" },
      { name: "Ligue 1", href: "/?sport=soccer&league=ligue-1", emoji: "⚽" },
      { name: "MLS", href: "/?sport=soccer&league=mls", emoji: "⚽" },
      { name: "Champions League", href: "/?sport=soccer&league=champions-league", emoji: "⚽" },
      { name: "Europa League", href: "/?sport=soccer&league=europa-league", emoji: "⚽" }
    ]
  },
  {
    name: "Tennis",
    href: "/?sport=tennis",
    emoji: "🎾",
    submenu: [
      { name: "ATP Tour", href: "/?sport=tennis&league=atp", emoji: "🎾" },
      { name: "WTA Tour", href: "/?sport=tennis&league=wta", emoji: "🎾" },
      { name: "Grand Slams", href: "/?sport=tennis&league=grand-slams", emoji: "🎾" },
      { name: "Davis Cup", href: "/?sport=tennis&league=davis-cup", emoji: "🎾" }
    ]
  },
  {
    name: "Golf",
    href: "/?sport=golf",
    emoji: "⛳",
    submenu: [
      { name: "PGA Tour", href: "/?sport=golf&league=pga", emoji: "⛳" },
      { name: "LPGA Tour", href: "/?sport=golf&league=lpga", emoji: "⛳" },
      { name: "European Tour", href: "/?sport=golf&league=european", emoji: "⛳" },
      { name: "Majors", href: "/?sport=golf&league=majors", emoji: "⛳" }
    ]
  },
  {
    name: "MMA",
    href: "/?sport=mma",
    emoji: "🥊",
    submenu: [
      { name: "UFC", href: "/?sport=mma&league=ufc", emoji: "🥊" },
      { name: "Bellator", href: "/?sport=mma&league=bellator", emoji: "🥊" },
      { name: "ONE Championship", href: "/?sport=mma&league=one", emoji: "🥊" },
      { name: "PFL", href: "/?sport=mma&league=pfl", emoji: "🥊" }
    ]
  },
  {
    name: "Boxing",
    href: "/?sport=boxing",
    emoji: "🥊",
    submenu: [
      { name: "Heavyweight", href: "/?sport=boxing&league=heavyweight", emoji: "🥊" },
      { name: "Lightweight", href: "/?sport=boxing&league=lightweight", emoji: "🥊" },
      { name: "Welterweight", href: "/?sport=boxing&league=welterweight", emoji: "🥊" },
      { name: "Middleweight", href: "/?sport=boxing&league=middleweight", emoji: "🥊" }
    ]
  },
  {
    name: "Auto Racing",
    href: "/?sport=auto-racing",
    emoji: "🏎️",
    submenu: [
      { name: "Formula 1", href: "/?sport=auto-racing&league=f1", emoji: "🏎️" },
      { name: "NASCAR", href: "/?sport=auto-racing&league=nascar", emoji: "🏎️" },
      { name: "IndyCar", href: "/?sport=auto-racing&league=indycar", emoji: "🏎️" },
      { name: "Formula E", href: "/?sport=auto-racing&league=formula-e", emoji: "🏎️" }
    ]
  },
  {
    name: "Cricket",
    href: "/?sport=cricket",
    emoji: "🏏",
    submenu: [
      { name: "IPL", href: "/?sport=cricket&league=ipl", emoji: "🏏" },
      { name: "Test Cricket", href: "/?sport=cricket&league=test", emoji: "🏏" },
      { name: "ODI", href: "/?sport=cricket&league=odi", emoji: "🏏" },
      { name: "T20", href: "/?sport=cricket&league=t20", emoji: "🏏" }
    ]
  },
  {
    name: "Rugby",
    href: "/?sport=rugby",
    emoji: "🏉",
    submenu: [
      { name: "Six Nations", href: "/?sport=rugby&league=six-nations", emoji: "🏉" },
      { name: "Rugby Championship", href: "/?sport=rugby&league=rugby-championship", emoji: "🏉" },
      { name: "Super Rugby", href: "/?sport=rugby&league=super-rugby", emoji: "🏉" },
      { name: "Premiership", href: "/?sport=rugby&league=premiership", emoji: "🏉" }
    ]
  }
]

const NAVIGATION_ITEMS: NavigationItem[] = [
  { 
    name: "Sports", 
    href: "/", 
    icon: Target,
    submenu: SPORTS_SUBMENU
  },
  { name: "Live", href: "/live", icon: Zap },
  { name: "Casino", href: "/casino", icon: Dice1 },
  { name: "My Bets", href: "/my-bets", icon: History },
  { name: "Promotions", href: "/promotions", icon: Gift, badge: "New" }
]

const PROFILE_MENU_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: CreditCard },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings }
]

interface ProfileAvatarProps {
  className?: string
}

function ProfileAvatar({ className }: ProfileAvatarProps) {
  const pathname = usePathname()

  const isActiveRoute = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={cn("relative h-8 w-8 rounded-full", className)}>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/user.png" alt="Profile" />
            <AvatarFallback>WB</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">WagerBabe User</p>
            <p className="text-xs leading-none text-muted-foreground">
              user@wagerbabe.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {PROFILE_MENU_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = isActiveRoute(item.href)
          return (
            <DropdownMenuItem key={item.href} asChild>
              <Link href={item.href} className={cn(
                "flex items-center",
                isActive && "bg-accent text-accent-foreground"
              )}>
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            </DropdownMenuItem>
          )
        })}
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm">Theme</span>
            <ThemeToggle variant="dropdown" size="sm" />
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function UnifiedLayout({
  children,
  title,
  subtitle,
  showNavigation = true,
  showBreadcrumbs = false,
  breadcrumbs,
  showBackButton = false,
  onBack,
  showRefresh = false,
  onRefresh,
  actions,
  fullWidth = false,
  className,
  authMode = false,
  authTitle,
  authSubtitle,
  authFooterLinks = [
    { label: "Home", href: "/" },
    { label: "Help", href: "/help" }
  ]
}: UnifiedLayoutProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const [expandedSubmenus, setExpandedSubmenus] = React.useState<Set<string>>(new Set())

  const isActiveRoute = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  // Auth layout mode (for login/signup pages)
  if (authMode) {
    return (
      <div className={cn(
        "min-h-screen flex flex-col items-center justify-center bg-background p-4",
        className
      )}>
        <div className="w-full max-w-md space-y-6">
          {/* Logo and Branding */}
          <div className="flex flex-col items-center space-y-2">
            <Link href="/" className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">WagerBabe</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center">
              Sports Betting Platform
            </p>
          </div>

          {/* Auth Content */}
          <div className="bg-card border rounded-lg p-6">
            {(authTitle || authSubtitle) && (
              <div className="space-y-1 text-center mb-6">
                {authTitle && (
                  <h1 className="text-2xl font-bold">{authTitle}</h1>
                )}
                {authSubtitle && (
                  <p className="text-sm text-muted-foreground">{authSubtitle}</p>
                )}
              </div>
            )}
            {children}
          </div>

          {/* Footer Links */}
          {authFooterLinks && authFooterLinks.length > 0 && (
            <div className="flex justify-center space-x-4 text-sm">
              {authFooterLinks.map((link, index) => (
                <React.Fragment key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                  {index < authFooterLinks.length - 1 && (
                    <span className="text-muted-foreground">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // No navigation mode (simple container)
  if (!showNavigation) {
    return (
      <div className={cn(
        "min-h-screen bg-background",
        fullWidth ? "w-full" : "container mx-auto px-4 py-6",
        className
      )}>
        {children}
      </div>
    )
  }

  // Main application layout with navigation
  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 sm:h-14 items-center justify-between w-full px-3 sm:px-4">
          {/* Left side - Logo and mobile menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="ghost"
              size="lg"
              className="lg:hidden min-h-[44px] min-w-[44px] touch-manipulation"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Toggle navigation menu"
            >
              <Menu className="h-6 w-6" />
            </Button>

            <Link href="/" className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-primary" />
              <span className="hidden font-bold sm:inline-block">WagerBabe</span>
            </Link>
          </div>

          {/* Right side - Wallet Display and Profile Avatar */}
          <div className="flex items-center space-x-2">
            <WalletDisplay />
            <ProfileAvatar />
          </div>
        </div>
      </header>

      <div className="flex pt-16 sm:pt-14">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:top-16 xl:top-14 lg:border-r lg:bg-background">
          <div className="flex h-full flex-col">
            
            <nav className="flex-1 space-y-2 p-4">
              {NAVIGATION_ITEMS.slice(0, 5).map((item) => {
                const Icon = item.icon
                const isActive = isActiveRoute(item.href)

                // If item has submenu, render as expandable section
                if (item.submenu) {
                  return (
                    <div key={item.href} className="space-y-1">
                      {/* Main Sports link */}
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                      
                      {/* Always visible submenu */}
                      <div className="ml-4 space-y-1">
                        {item.submenu.map((subItem) => (
                          <div key={subItem.href} className="relative group">
                            <Link
                              href={subItem.href}
                              className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
                            >
                              <span className="text-base">{subItem.emoji}</span>
                              <span>{subItem.name}</span>
                              {subItem.submenu && <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                            </Link>
                            
                            {/* League submenu - only visible on hover */}
                            {subItem.submenu && (
                              <div className="absolute left-full top-0 ml-2 w-48 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="p-2 space-y-1">
                                  <Link
                                    href={subItem.href}
                                    className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
                                  >
                                    <span className="text-base">{subItem.emoji}</span>
                                    <span>All {subItem.name}</span>
                                  </Link>
                                  {subItem.submenu.map((league) => (
                                    <Link
                                      key={league.href}
                                      href={league.href}
                                      className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
                                    >
                                      <span className="text-base">{league.emoji}</span>
                                      <span>{league.name}</span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                }

                // Regular navigation item
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        <aside className={cn(
          "fixed top-16 sm:top-14 left-0 z-50 h-[calc(100vh-4rem)] sm:h-[calc(100vh-3.5rem)] w-64 transform border-r bg-background transition-transform lg:hidden",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-semibold">Navigation</span>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setIsSidebarOpen(false)}
                className="min-h-[44px] min-w-[44px] touch-manipulation"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="flex-1 space-y-2 p-4">
              {/* Main Navigation */}
              {NAVIGATION_ITEMS.map((item) => {
                const Icon = item.icon
                const isActive = isActiveRoute(item.href)

                // If item has submenu, render as always expanded section
                if (item.submenu) {
                  return (
                    <div key={item.href} className="space-y-1">
                      {/* Main Sports link */}
                      <Link
                        href={item.href}
                        onClick={() => setIsSidebarOpen(false)}
                        className={cn(
                          "flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors min-h-[44px] touch-manipulation",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                      
                      {/* Always visible submenu */}
                      <div className="ml-4 space-y-1">
                        {item.submenu.map((subItem) => (
                          <div key={subItem.href} className="space-y-1">
                            <Link
                              href={subItem.href}
                              onClick={() => setIsSidebarOpen(false)}
                              className="flex items-center space-x-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors min-h-[44px] touch-manipulation text-muted-foreground hover:text-foreground"
                            >
                              <span className="text-base">{subItem.emoji}</span>
                              <span>{subItem.name}</span>
                            </Link>
                            
                            {/* League submenu - always visible on mobile */}
                            {subItem.submenu && (
                              <div className="ml-4 space-y-1">
                                <Link
                                  href={subItem.href}
                                  onClick={() => setIsSidebarOpen(false)}
                                  className="flex items-center space-x-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors min-h-[44px] touch-manipulation text-muted-foreground hover:text-foreground"
                                >
                                  <span className="text-base">{subItem.emoji}</span>
                                  <span>All {subItem.name}</span>
                                </Link>
                                {subItem.submenu.map((league) => (
                                  <Link
                                    key={league.href}
                                    href={league.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="flex items-center space-x-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors min-h-[44px] touch-manipulation text-muted-foreground hover:text-foreground"
                                  >
                                    <span className="text-base">{league.emoji}</span>
                                    <span>{league.name}</span>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                }

                // Regular navigation item
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors min-h-[44px] touch-manipulation",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}

              {/* Separator */}
              <div className="border-t my-4" />

              {/* Profile Menu Items */}
              {PROFILE_MENU_ITEMS.map((item) => {
                const Icon = item.icon
                const isActive = isActiveRoute(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors min-h-[44px] touch-manipulation",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}

              {/* Logout */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted text-red-600 w-full min-h-[44px] touch-manipulation"
              >
                <LogOut className="h-5 w-5" />
                <span>Log out</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 h-full max-h-[calc(100vh-60px)] overflow-y-hidden p-5 ">
          <div className={cn(
            fullWidth ? "w-full" : "container mx-auto px-4 py-6",
            "max-w-full",
            className
          )}>
            {/* Page Header */}
            {(title || subtitle || showBreadcrumbs || showBackButton || showRefresh || actions) && (
              <div className="space-y-4 mb-6">
                {/* Breadcrumbs */}
                {showBreadcrumbs && breadcrumbs && breadcrumbs.length > 0 && (
                  <Breadcrumbs>
                    {breadcrumbs.map((crumb, index) => (
                      <BreadcrumbItem 
                        key={index} 
                        href={crumb.href}
                        isLast={index === breadcrumbs.length - 1}
                      >
                        {crumb.label}
                      </BreadcrumbItem>
                    ))}
                  </Breadcrumbs>
                )}

                {/* Page Title and Actions */}
                {(title || subtitle || showBackButton || showRefresh || actions) && (
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      {showBackButton && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={onBack}
                          className="flex items-center gap-2"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Back
                        </Button>
                      )}
                      
                      <div>
                        {title && (
                          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            {title}
                          </h1>
                        )}
                        {subtitle && (
                          <p className="text-muted-foreground mt-1">
                            {subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {showRefresh && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={onRefresh}
                          className="flex items-center gap-2"
                        >
                          <RefreshCw className="h-4 w-4" />
                          Refresh
                        </Button>
                      )}
                      {actions}
                    </div>
                  </div>
                )}
              </div>
            )}

            
            {/* Page Content */}
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default UnifiedLayout
