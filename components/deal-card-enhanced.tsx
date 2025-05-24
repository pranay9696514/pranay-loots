"use client"

import { Star, ExternalLink, Clock, TrendingDown, Shield, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useFavorites } from "@/hooks/use-favorites"
import { useAuth } from "@/hooks/use-auth"
import { useState } from "react"

interface Deal {
  id: string
  title: string
  originalPrice: number
  discountedPrice: number
  discount: number
  platform: string
  image: string
  rating: number
  reviews: number
  category: string
  brand: string
  affiliateUrl: string
  productId?: string
  availability?: boolean
  lastUpdated?: string
}

interface DealCardProps {
  deal: Deal
  index: number
}

const platformConfig = {
  amazon: {
    name: "Amazon",
    color: "bg-gradient-to-r from-orange-500 to-amber-500",
    textColor: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  flipkart: {
    name: "Flipkart",
    color: "bg-gradient-to-r from-blue-500 to-indigo-500",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  myntra: {
    name: "Myntra",
    color: "bg-gradient-to-r from-pink-500 to-rose-500",
    textColor: "text-pink-600",
    bgColor: "bg-pink-50",
  },
  ajio: {
    name: "Ajio",
    color: "bg-gradient-to-r from-purple-500 to-violet-500",
    textColor: "text-purple-600",
    bgColor: "bg-purple-50",
  },
}

export function DealCardEnhanced({ deal, index }: DealCardProps) {
  const { user } = useAuth()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const [favoriteLoading, setFavoriteLoading] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const platform = platformConfig[deal.platform as keyof typeof platformConfig]
  const savings = deal.originalPrice - deal.discountedPrice
  const isUserFavorite = isFavorite(deal.id)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleFavoriteToggle = async () => {
    if (!user) return

    setFavoriteLoading(true)

    if (isUserFavorite) {
      await removeFromFavorites(deal.id)
    } else {
      await addToFavorites(deal.id, deal)
    }

    setFavoriteLoading(false)
  }

  const handleDealClick = () => {
    setIsClicked(true)

    // Open deal link in new tab
    window.open(deal.affiliateUrl, "_blank", "noopener,noreferrer")

    // Reset click state after animation
    setTimeout(() => setIsClicked(false), 200)
  }

  return (
    <div
      className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-stone-100 overflow-hidden hover:-translate-y-3"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Header with badges */}
      <div className="relative">
        <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
          <div className={`${platform.color} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
            {platform.name}
          </div>
          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            {deal.discount}% OFF
          </div>
        </div>

        <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
          <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
            <Shield className="w-3 h-3" />
            <span>Verified</span>
          </div>

          {user && (
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded-full shadow-lg ${
                isUserFavorite ? "bg-red-500 hover:bg-red-600 text-white" : "bg-white/90 hover:bg-white text-stone-600"
              }`}
              onClick={handleFavoriteToggle}
              disabled={favoriteLoading}
            >
              <Heart className={`w-4 h-4 ${isUserFavorite ? "fill-current" : ""}`} />
            </Button>
          )}
        </div>

        {/* Product Image */}
        <div className="relative h-64 bg-gradient-to-br from-stone-50 to-stone-100 overflow-hidden">
          <Image
            src={deal.image || "/placeholder.svg"}
            alt={deal.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
      </div>

      <div className="p-6">
        {/* Brand and Category */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className={`${platform.bgColor} ${platform.textColor} font-medium`}>
            {deal.brand}
          </Badge>
          <span className="text-xs text-stone-500 font-medium">{deal.category}</span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-stone-900 mb-4 line-clamp-2 leading-tight text-lg">{deal.title}</h3>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-stone-700">{deal.rating}</span>
          </div>
          <span className="text-sm text-stone-500">({deal.reviews.toLocaleString()} reviews)</span>
        </div>

        {/* Pricing */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-3xl font-bold text-stone-900">{formatPrice(deal.discountedPrice)}</span>
            <span className="text-lg text-stone-500 line-through">{formatPrice(deal.originalPrice)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <TrendingDown className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-semibold">You save {formatPrice(savings)}</span>
          </div>
        </div>

        {/* Product ID for verification */}
        {deal.productId && <div className="mb-4 text-xs text-stone-400">Product ID: {deal.productId}</div>}

        {/* Deal Action Button */}
        <Button
          className={`w-full ${platform.color} hover:opacity-90 text-white rounded-2xl py-3 font-bold transition-all duration-300 group-hover:shadow-xl text-lg ${
            isClicked ? "scale-95" : ""
          }`}
          onClick={handleDealClick}
        >
          <ExternalLink className="w-5 h-5 mr-2" />
          Shop Now on {platform.name}
        </Button>

        {/* Time indicator */}
        <div className="flex items-center justify-center space-x-1 mt-4 text-xs text-stone-500">
          <Clock className="w-3 h-3" />
          <span>Live pricing • Updated now</span>
        </div>
      </div>
    </div>
  )
}
