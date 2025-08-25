"use client"

import * as React from "react"
import { Search, RefreshCw, ArrowRight, ChevronDown, Menu, Grid3X3, MoreVertical } from "lucide-react"
import { Button } from "@/components/primitives/button"
import { Input } from "@/components/primitives/input"
import { BETTING_TYPES } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface SportsBettingHeaderProps {
  className?: string
}

export function SportsBettingHeader({ className }: SportsBettingHeaderProps) {
  const [selectedBetType, setSelectedBetType] = React.useState("straight")

  return (
    <div className={cn(
      "bg-gray-800 text-white p-4 flex items-center justify-between",
      "border-b border-gray-700",
      className
    )}>
      {/* Left Section - Search and Menu */}
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" className="p-2">
          <Menu className="h-4 w-4" />
        </Button>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-48"
          />
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
            10
          </div>
          <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs font-bold">
            0
          </div>
          <Button variant="ghost" size="sm" className="p-2">
            <MoreVertical className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <Grid3X3 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Center Section - Betting Type Buttons */}
      <div className="flex items-center space-x-2">
        {BETTING_TYPES.map((type) => (
          <Button
            key={type.id}
            variant={type.selected ? "default" : "secondary"}
            size="sm"
            className={cn(
              "px-3 py-1 text-xs font-medium",
              type.selected 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "bg-gray-600 hover:bg-gray-700 text-gray-300"
            )}
            onClick={() => setSelectedBetType(type.id)}
          >
            {type.label}
          </Button>
        ))}
        
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1">
          <RefreshCw className="h-3 w-3 mr-1" />
          REFRESH
        </Button>
        
        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1">
          <ArrowRight className="h-3 w-3 mr-1" />
          CONTINUE
        </Button>
      </div>

      {/* Right Section - Balance Information */}
      <div className="flex items-center space-x-6">
        <div className="text-center">
          <div className="text-xs text-gray-400">BALANCE</div>
          <div className="text-sm font-semibold text-green-400">$0</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400">PENDING</div>
          <div className="text-sm font-semibold text-gray-300">$0</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400">AVAILABLE</div>
          <div className="text-sm font-semibold text-gray-300">$0</div>
        </div>
        <Button variant="ghost" size="sm" className="p-2">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
