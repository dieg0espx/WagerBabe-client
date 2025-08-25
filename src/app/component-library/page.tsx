"use client"

import {
  BettingCard,
  OddsButton,
  StatusBadge,
  BettingButton,
  BettingInput
} from "@/components/base"
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Slider,
  Calendar,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/primitives"
import { BaseWidget } from "@/components/base"
import { BettingInsightsWidget } from "@/components/composite/dashboard"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts"
import { UnifiedLayout } from "@/components/layout"
import { SetStateAction, useState } from "react"

export default function Home() {
  const [inputValue, setInputValue] = useState("")
  const [betAmount, setBetAmount] = useState("")

  return (
    <UnifiedLayout
      title="WagerBabe Component Library"
      subtitle="A comprehensive showcase of all base components with sports betting theming and functionality"
    >
      <div className="space-y-12">


        {/* Buttons Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Buttons</h2>

          <Card>
            <CardHeader>
              <CardTitle>Primitive Buttons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">🎯</Button>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button disabled>Disabled</Button>
                <Button variant="outline" disabled>Disabled Outline</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Betting Buttons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <BettingButton variant="bet">Place Bet</BettingButton>
                <BettingButton variant="sportsbook">Add to Slip</BettingButton>
                <BettingButton variant="win">Confirm Bet</BettingButton>
                <BettingButton variant="loss">Cancel Bet</BettingButton>
              </div>

              <div className="flex flex-wrap gap-3">
                <BettingButton size="sm">Small Bet</BettingButton>
                <BettingButton size="default">Default Bet</BettingButton>
                <BettingButton size="lg">Large Bet</BettingButton>
              </div>

              <div className="flex flex-wrap gap-3">
                <BettingButton loading>Processing...</BettingButton>
                <BettingButton disabled>Unavailable</BettingButton>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Inputs Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Inputs</h2>

          <Card>
            <CardHeader>
              <CardTitle>Primitive Inputs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Default input" />
                <Input placeholder="Success input" variant="success" />
                <Input placeholder="Error input" variant="error" />
                <Input placeholder="Warning input" variant="warning" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input placeholder="Small" />
                <Input placeholder="Default" />
                <Input placeholder="Large" />
              </div>

              <Input placeholder="Disabled input" disabled />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Betting Inputs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BettingInput
                  label="Bet Amount"
                  inputType="currency"
                  placeholder="0.00"
                  value={betAmount}
                  onChange={(e: { target: { value: SetStateAction<string> } }) => setBetAmount(e.target.value)}
                  helper="Minimum bet: $1.00"
                />

                <BettingInput
                  label="Odds Value"
                  inputType="number"
                  placeholder="Enter odds"
                  prefix="+"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BettingInput
                  label="Win Percentage"
                  inputType="percentage"
                  placeholder="0"
                />

                <BettingInput
                  label="Stake"
                  inputType="currency"
                  currency="€"
                  placeholder="0.00"
                  error="Amount exceeds balance"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cards Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Cards</h2>

          <Card>
            <CardHeader>
              <CardTitle>Primitive Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">This is a basic card with header and content.</p>
                  </CardContent>
                </Card>

                <Card className="border-dashed">
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">Card with custom styling</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Betting Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <BettingCard title="Standard Match" subtitle="Premier League">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Manchester United</span>
                      <OddsButton odds={150} />
                    </div>
                    <div className="flex justify-between">
                      <span>Liverpool</span>
                      <OddsButton odds={-120} />
                    </div>
                  </div>
                </BettingCard>

                <BettingCard
                  variant="live"
                  title="Live Match"
                  subtitle="Champions League"
                  interactive
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Barcelona</span>
                      <div className="flex items-center gap-2">
                        <StatusBadge status="live" size="sm" />
                        <OddsButton odds={200} isLive />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Real Madrid</span>
                      <OddsButton odds={-180} isLive />
                    </div>
                  </div>
                </BettingCard>

                <BettingCard
                  variant="featured"
                  title="Featured Bet"
                  subtitle="NBA Finals"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Lakers</span>
                      <OddsButton odds={110} />
                    </div>
                    <div className="flex justify-between">
                      <span>Celtics</span>
                      <OddsButton odds={-130} />
                    </div>
                  </div>
                </BettingCard>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Status & Feedback Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Status & Feedback</h2>

          <Card>
            <CardHeader>
              <CardTitle>Status Badges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <StatusBadge status="live">Live</StatusBadge>
                <StatusBadge status="pending">Pending</StatusBadge>
                <StatusBadge status="won">Won</StatusBadge>
                <StatusBadge status="lost">Lost</StatusBadge>
                <StatusBadge status="push">Push</StatusBadge>
                <StatusBadge status="cancelled">Cancelled</StatusBadge>
              </div>

              <div className="flex flex-wrap gap-3">
                <StatusBadge status="live" size="sm">Small Live</StatusBadge>
                <StatusBadge status="won" size="md">Medium Won</StatusBadge>
                <StatusBadge status="lost" size="lg">Large Lost</StatusBadge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Simple Status Display</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-green-200 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <p className="text-green-800 dark:text-green-200">✅ Your bet has been placed successfully!</p>
              </div>

              <div className="p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-200">⚠️ Your account balance is running low.</p>
              </div>

              <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <p className="text-red-800 dark:text-red-200">❌ Unable to process your bet. Please try again.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Live Indicators</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs">Small Live</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-base font-medium">Large Live</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <span className="font-mono text-green-600 font-semibold">+150</span>
                <span className="font-mono text-red-600 font-semibold">-120</span>
                <span className="font-mono text-muted-foreground">EVEN</span>
                <span className="font-mono text-blue-600">2.50</span>
                <span className="font-mono text-purple-600">3/2</span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Odds Buttons Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Odds Buttons</h2>

          <Card>
            <CardHeader>
              <CardTitle>Odds Button Variants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <OddsButton odds={150} />
                <OddsButton odds={-120} />
                <OddsButton odds={0} />
                <OddsButton odds={250} isLive />
                <OddsButton odds={-200} disabled />
              </div>

              <div className="flex flex-wrap gap-3">
                <OddsButton odds={150} size="sm" />
                <OddsButton odds={-120} size="md" />
                <OddsButton odds={250} size="lg" />
              </div>

              <div className="flex flex-wrap gap-3">
                <OddsButton odds={150} variant="positive" />
                <OddsButton odds={-120} variant="negative" />
                <OddsButton odds={0} variant="even" />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Architecture Info */}
        <section className="bg-muted/50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">🏗️ Component Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">✅ Base Components:</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• BettingButton - Sports betting themed buttons</li>
                <li>• BettingInput - Currency and odds inputs</li>
                <li>• BettingCard - Match and game cards</li>
                <li>• OddsButton - Interactive odds display</li>
                <li>• StatusBadge - Bet status indicators</li>
                <li>• BettingAlert - Themed notifications</li>
                <li>• LiveIndicator - Live game indicators</li>
                <li>• OddsDisplay - Formatted odds display</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🧱 Primitive Components:</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Button - Base button with variants</li>
                <li>• Input - Form input with validation states</li>
                <li>• Card - Content container system</li>
                <li>• Alert - Notification messages</li>
                <li>• Typography - Text styling system</li>
                <li>• Loading - Spinner and skeleton states</li>
                <li>• Form components - Complete form system</li>
              </ul>
            </div>
          </div>
        </section>

        {/* New Components Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">New Components (Recently Added)</h2>

          {/* Slider Component */}
          <Card>
            <CardHeader>
              <CardTitle>Slider Component</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Default Slider</h4>
                  <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
                </div>
                <div>
                  <h4 className="font-medium mb-2">Betting Variant (Stake Selection)</h4>
                  <Slider variant="betting" defaultValue={[25]} max={100} step={5} className="w-full" />
                </div>
                <div>
                  <h4 className="font-medium mb-2">Success Variant</h4>
                  <Slider variant="success" defaultValue={[75]} max={100} step={1} className="w-full" />
                </div>
                <div>
                  <h4 className="font-medium mb-2">Small Size</h4>
                  <Slider size="sm" defaultValue={[30]} max={100} step={1} className="w-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calendar Component */}
          <Card>
            <CardHeader>
              <CardTitle>Calendar Component</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Default Calendar</h4>
                  <Calendar mode="single" className="rounded-md border" />
                </div>
                <div>
                  <h4 className="font-medium mb-2">Betting Variant</h4>
                  <Calendar variant="betting" mode="single" className="rounded-md border" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Command Component */}
          <Card>
            <CardHeader>
              <CardTitle>Command Palette</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg">
                <Command className="max-h-[300px]">
                  <CommandInput placeholder="Type a command or search..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      <CommandItem>
                        <span>View Dashboard</span>
                      </CommandItem>
                      <CommandItem>
                        <span>Place Bet</span>
                      </CommandItem>
                      <CommandItem>
                        <span>Check Balance</span>
                      </CommandItem>
                    </CommandGroup>
                    <CommandGroup heading="Sports">
                      <CommandItem>
                        <span>NFL Games</span>
                      </CommandItem>
                      <CommandItem>
                        <span>NBA Games</span>
                      </CommandItem>
                      <CommandItem>
                        <span>MLB Games</span>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
              <p className="text-sm text-muted-foreground">
                Command palette for quick navigation and search functionality
              </p>
            </CardContent>
          </Card>

          {/* Chart Component */}
          <Card>
            <CardHeader>
              <CardTitle>Chart Components</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Bar Chart (Default)</h4>
                  <ChartContainer
                    config={{
                      wins: { label: "Wins", color: "hsl(var(--chart-1))" },
                      losses: { label: "Losses", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { month: "Jan", wins: 12, losses: 8 },
                        { month: "Feb", wins: 15, losses: 5 },
                        { month: "Mar", wins: 10, losses: 10 },
                        { month: "Apr", wins: 18, losses: 7 },
                        { month: "May", wins: 14, losses: 6 },
                      ]}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="wins" fill="var(--color-wins)" />
                        <Bar dataKey="losses" fill="var(--color-losses)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Line Chart (Betting Variant)</h4>
                  <ChartContainer
                    variant="betting"
                    config={{
                      balance: { label: "Balance", color: "hsl(var(--chart-3))" },
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { day: "Mon", balance: 1000 },
                        { day: "Tue", balance: 1150 },
                        { day: "Wed", balance: 980 },
                        { day: "Thu", balance: 1200 },
                        { day: "Fri", balance: 1350 },
                      ]}>
                        <XAxis dataKey="day" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent variant="betting" />} />
                        <Line type="monotone" dataKey="balance" stroke="var(--color-balance)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Carousel Component */}
          <Card>
            <CardHeader>
              <CardTitle>Carousel Component</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Default Carousel</h4>
                  <Carousel className="w-full max-w-xs mx-auto">
                    <CarouselContent>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <Card>
                              <CardContent className="flex aspect-square items-center justify-center p-6">
                                <span className="text-4xl font-semibold">{index + 1}</span>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Betting Variant Carousel</h4>
                  <Carousel variant="betting" className="w-full max-w-xs mx-auto">
                    <CarouselContent>
                      {["NFL", "NBA", "MLB", "NHL", "Soccer"].map((sport, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <Card>
                              <CardContent className="flex aspect-square items-center justify-center p-6">
                                <span className="text-lg font-semibold">{sport}</span>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Base Widget Component */}
          <Card>
            <CardHeader>
              <CardTitle>Base Widget Foundation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BaseWidget
                  title="Sample Widget"
                  description="This is a sample widget using the base widget foundation"
                  onRefresh={() => alert("Refreshing...")}
                  onSettings={() => alert("Settings...")}
                  badge="New"
                >
                  <div className="space-y-2">
                    <p>Widget content goes here</p>
                    <p className="text-sm text-muted-foreground">This foundation provides loading states, error handling, and consistent styling.</p>
                  </div>
                </BaseWidget>

                <BaseWidget
                  title="Betting Widget"
                  variant="betting"
                  compact
                  badge="Live"
                  badgeVariant="destructive"
                >
                  <div className="text-center">
                    <p className="text-2xl font-bold">$1,250</p>
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                  </div>
                </BaseWidget>
              </div>
            </CardContent>
          </Card>

          {/* Betting Insights Widget */}
          <Card>
            <CardHeader>
              <CardTitle>Betting Insights Widget</CardTitle>
            </CardHeader>
            <CardContent>
              <BettingInsightsWidget
                onSettings={() => alert("Insights settings...")}
                className="max-w-2xl"
              />
            </CardContent>
          </Card>
        </section>
      </div>
    </UnifiedLayout>
  )
}
