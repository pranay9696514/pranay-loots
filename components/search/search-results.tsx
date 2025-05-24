"use client"

import { DealCardEnhanced } from "@/components/deal-card-enhanced"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"

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
}

interface SearchResultsProps {
  deals: Deal[]
  query: string
  totalResults: number
}

export function SearchResults({ deals, query, totalResults }: SearchResultsProps) {
  if (!query) {
    return null
  }

  const highlightText = (text: string, query: string) => {
    if (!query) return text

    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  return (
    <div className="py-8">
      {/* Search Results Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Search className="w-6 h-6 text-orange-600" />
          <h2 className="text-2xl font-bold text-stone-900">Search Results for "{query}"</h2>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-stone-600">
            Found <span className="font-semibold text-orange-600">{totalResults}</span> deals
          </p>

          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="border-orange-200 text-orange-700">
              <Filter className="w-3 h-3 mr-1" />
              Relevance
            </Badge>
          </div>
        </div>
      </div>

      {/* Results */}
      {deals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal, index) => (
            <div key={deal.id} className="relative">
              <DealCardEnhanced deal={deal} index={index} />
              {/* Search highlighting overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="p-6 pt-20">
                  <h3 className="font-bold text-stone-900 mb-4 line-clamp-2 leading-tight text-lg opacity-0">
                    {highlightText(deal.title, query)}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Search className="w-16 h-16 text-stone-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-stone-700 mb-2">No deals found</h3>
          <p className="text-stone-500 mb-6">Try searching with different keywords or browse our categories</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Fashion", "Tech", "Footwear", "Grooming"].map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="cursor-pointer hover:bg-orange-50 hover:border-orange-300"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
