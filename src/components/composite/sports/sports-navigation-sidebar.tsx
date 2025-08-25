"use client"

import * as React from "react"
import { Search, Clock, Star, Rocket, ChevronRight } from "lucide-react"
import { Button } from "@/components/primitives/button"
import { Input } from "@/components/primitives/input"
import { SPORTS_NAVIGATION } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface SportsNavigationSidebarProps {
  className?: string
}

export function SportsNavigationSidebar({ className }: SportsNavigationSidebarProps) {
  const [selectedSport, setSelectedSport] = React.useState("mlb")

  const getSportIcon = (sportId: string) => {
    switch (sportId) {
      case "up-next":
        return <Clock className="h-4 w-4" />
      case "featured":
        return <Star className="h-4 w-4" />
      case "crash":
        return <Rocket className="h-4 w-4" />
      case "baseball":
      case "mlb":
        return <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      case "football":
        return <div className="w-4 h-4 bg-brown-600 rounded-full"></div>
      case "basketball":
        return <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
      case "hockey":
        return <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
      case "soccer":
        return <div className="w-4 h-4 bg-green-600 rounded-full"></div>
      case "golf":
        return <div className="w-4 h-4 bg-green-800 rounded-full"></div>
      case "tennis":
        return <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
      case "martial-arts":
        return <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
      case "boxing":
        return <div className="w-4 h-4 bg-blue-800 rounded-full"></div>
      case "auto-racing":
        return <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
      case "rugby":
        return <div className="w-4 h-4 bg-green-700 rounded-full"></div>
      case "olympics":
        return <div className="w-4 h-4 bg-blue-800 rounded-full"></div>
      default:
        return <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
    }
  }

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 w-64 flex flex-col",
      "min-h-screen",
      className
    )}>
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Sports Schedule Title */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Sports Schedule</h2>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto">
        <div className="py-2">
          {SPORTS_NAVIGATION.map((sport) => (
            <div key={sport.id}>
              <button
                onClick={() => setSelectedSport(sport.id)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 text-left",
                  "hover:bg-gray-50 transition-colors",
                  sport.selected 
                    ? "bg-blue-600 text-white" 
                    : "text-gray-700"
                )}
              >
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "flex items-center justify-center",
                    sport.selected ? "text-white" : "text-gray-600"
                  )}>
                    {getSportIcon(sport.id)}
                  </div>
                  <span className="font-medium">{sport.name}</span>
                </div>
                {sport.children && (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {/* Children items */}
              {sport.children && sport.selected && (
                <div className="bg-gray-50 border-l-4 border-blue-600">
                  {sport.children.map((child) => (
                    <button
                      key={child.id}
                      className="w-full flex items-center justify-between px-8 py-2 text-left text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                        <span className="text-sm">{child.name}</span>
                      </div>
                      {child.id === "mlb-props-plus" && (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Button */}
      <div className="p-4 border-t border-gray-200">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          FEEDBACK
        </Button>
      </div>
    </div>
  )
}
