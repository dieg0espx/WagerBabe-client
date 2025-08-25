"use client"

import { Card, CardContent } from "@/components/primitives"
import { Button } from "@/components/primitives"
import { Badge } from "@/components/primitives"
import { Gift, Clock, Calendar, Star } from "lucide-react"

interface PromotionCardProps {
  id: string
  title: string
  description: string
  image: string
  category?: "sports" | "casino" | "deposit" | "referral"
  expiryDate?: string
  isNew?: boolean
  status?: "active" | "expired" | "coming-soon"
  onClaim?: (id: string) => void
  variant?: "default" | "banner" | "compact"
}

export function PromotionCard({
  id,
  title,
  description,
  image,
  category,
  expiryDate,
  isNew = false,
  status = "active",
  onClaim,
  variant = "default"
}: PromotionCardProps) {
  const handleClaim = () => {
    onClaim?.(id)
  }

  const isBanner = variant === "banner"
  const isCompact = variant === "compact"

  const getCategoryColor = (cat?: string) => {
    switch (cat) {
      case "sports": return "bg-blue-500 text-white"
      case "casino": return "bg-purple-500 text-white"
      case "deposit": return "bg-green-500 text-white"
      case "referral": return "bg-orange-500 text-white"
      default: return "bg-gray-500 text-white"
    }
  }

  const getStatusColor = (stat: string) => {
    switch (stat) {
      case "active": return "bg-green-500 text-white"
      case "expired": return "bg-red-500 text-white"
      case "coming-soon": return "bg-yellow-500 text-black"
      default: return "bg-gray-500 text-white"
    }
  }

  return (
    <Card className={`
      overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300
      ${isBanner ? "h-32" : isCompact ? "h-auto" : ""}
    `}>
      <CardContent className="p-0">
        <div className={`
          relative
          ${isBanner ? "h-full" : isCompact ? "aspect-video" : "aspect-video"}
        `}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isNew && (
              <Badge className="bg-red-500 text-white animate-pulse">
                <Star className="h-3 w-3 mr-1" />
                NEW
              </Badge>
            )}
            {category && (
              <Badge className={getCategoryColor(category)}>
                {category.toUpperCase()}
              </Badge>
            )}
            <Badge className={getStatusColor(status)}>
              {status.replace("-", " ").toUpperCase()}
            </Badge>
          </div>

          {/* Content Overlay */}
          <div className={`
            absolute inset-0 p-4 flex items-center justify-between text-white
            ${isBanner ? "flex-row" : "flex-col justify-center text-center"}
            ${isCompact ? "p-3" : ""}
          `}>
            <div className={`
              ${isBanner ? "flex-1" : "mb-4"}
            `}>
              <h3 className={`
                font-semibold mb-1
                ${isBanner ? "text-lg" : isCompact ? "text-sm" : "text-xl"}
              `}>
                {title}
              </h3>
              <p className={`
                text-white/90
                ${isBanner ? "text-sm" : isCompact ? "text-xs" : "text-sm"}
              `}>
                {description}
              </p>
              
              {expiryDate && !isCompact && (
                <div className="flex items-center gap-1 mt-2 text-white/80">
                  <Clock className="h-3 w-3" />
                  <span className="text-xs">
                    {expiryDate === "No expiry" ? "No expiry" : `Expires: ${expiryDate}`}
                  </span>
                </div>
              )}
            </div>

            {/* Action Button */}
            {status === "active" && (
              <Button
                size={isBanner ? "sm" : isCompact ? "sm" : "default"}
                className="bg-white text-black hover:bg-white/90 transition-colors"
                onClick={handleClaim}
              >
                <Gift className="h-4 w-4 mr-2" />
                {isBanner || isCompact ? "Claim" : "Claim Now"}
              </Button>
            )}
            
            {status === "coming-soon" && (
              <Button
                size={isBanner ? "sm" : isCompact ? "sm" : "default"}
                disabled
                className="bg-yellow-500 text-black"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Coming Soon
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
