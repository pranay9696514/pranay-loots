"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Percent, TrendingDown, Filter, X } from "lucide-react"

interface AdvancedFiltersProps {
  filters: {
    brands: string[]
    platforms: string[]
    minDiscount: number
    minRating: number
    sortBy: string
  }
  onFiltersChange: (filters: any) => void
  className?: string
}

const availableBrands = [
  // Fashion
  "Allen Solly",
  "Van Heusen",
  "Peter England",
  "Arrow",
  "Wrangler",
  "Jack & Jones",
  // Footwear
  "Red Tape",
  "Woodland",
  "Bata",
  "Campus",
  "Puma",
  // Tech
  "boAt",
  "Noise",
  "Mi",
  "Realme",
  "JBL",
  // Grooming
  "Beardo",
  "The Man Company",
  "Philips",
  "Ustraa",
  "Gillette",
  // Electronics
  "Samsung",
  "LG",
  "Whirlpool",
  "Bajaj",
  "Crompton",
  "Prestige",
  // Accessories
  "Fossil",
  "Ray-Ban",
  "Wildcraft",
  "Tommy Hilfiger",
  "Fastrack",
  "Skybags",
  // Home
  "Cello",
  "Amazon Basics",
  "Milton",
  "Solimo",
  "Pigeon",
]

const availablePlatforms = [
  { name: "Amazon", color: "bg-orange-100 text-orange-800" },
  { name: "Flipkart", color: "bg-blue-100 text-blue-800" },
  { name: "Myntra", color: "bg-pink-100 text-pink-800" },
  { name: "Ajio", color: "bg-purple-100 text-purple-800" },
]

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "discount", label: "Highest Discount" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
]

export function AdvancedFilters({ filters, onFiltersChange, className = "" }: AdvancedFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked ? [...filters.brands, brand] : filters.brands.filter((b) => b !== brand)
    onFiltersChange({ ...filters, brands: newBrands })
  }

  const handlePlatformChange = (platform: string, checked: boolean) => {
    const newPlatforms = checked ? [...filters.platforms, platform] : filters.platforms.filter((p) => p !== platform)
    onFiltersChange({ ...filters, platforms: newPlatforms })
  }

  const handleDiscountChange = (value: number[]) => {
    onFiltersChange({ ...filters, minDiscount: value[0] })
  }

  const handleRatingChange = (value: number[]) => {
    onFiltersChange({ ...filters, minRating: value[0] })
  }

  const handleSortChange = (value: string) => {
    onFiltersChange({ ...filters, sortBy: value })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      brands: [],
      platforms: [],
      minDiscount: 0,
      minRating: 0,
      sortBy: "relevance",
    })
  }

  const activeFiltersCount =
    filters.brands.length +
    filters.platforms.length +
    (filters.minDiscount > 0 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.sortBy !== "relevance" ? 1 : 0)

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-stone-800 flex items-center space-x-2">
            <Filter className="w-5 h-5 text-orange-600" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center space-x-2">
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-stone-500">
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="text-stone-600">
              {isExpanded ? "Less" : "More"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Sort By */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-stone-700 flex items-center space-x-2">
            <TrendingDown className="w-4 h-4" />
            <span>Sort By</span>
          </Label>
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select sorting option" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Platforms */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-stone-700">Platforms</Label>
          <div className="grid grid-cols-2 gap-3">
            {availablePlatforms.map((platform) => (
              <div key={platform.name} className="flex items-center space-x-2">
                <Checkbox
                  id={`platform-${platform.name}`}
                  checked={filters.platforms.includes(platform.name.toLowerCase())}
                  onCheckedChange={(checked) => handlePlatformChange(platform.name.toLowerCase(), checked as boolean)}
                />
                <Label
                  htmlFor={`platform-${platform.name}`}
                  className={`text-sm px-2 py-1 rounded-md ${platform.color} cursor-pointer`}
                >
                  {platform.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Minimum Discount */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-stone-700 flex items-center space-x-2">
            <Percent className="w-4 h-4" />
            <span>Minimum Discount: {filters.minDiscount}%</span>
          </Label>
          <Slider
            value={[filters.minDiscount]}
            onValueChange={handleDiscountChange}
            min={0}
            max={80}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-stone-500">
            <span>0%</span>
            <span>80%</span>
          </div>
        </div>

        {/* Minimum Rating */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-stone-700 flex items-center space-x-2">
            <Star className="w-4 h-4" />
            <span>Minimum Rating: {filters.minRating.toFixed(1)} ⭐</span>
          </Label>
          <Slider
            value={[filters.minRating]}
            onValueChange={handleRatingChange}
            min={0}
            max={5}
            step={0.5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-stone-500">
            <span>0 ⭐</span>
            <span>5 ⭐</span>
          </div>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <>
            <Separator />

            {/* Brands */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-stone-700">Brands</Label>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {availableBrands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                    />
                    <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Active Filters Summary */}
        {activeFiltersCount > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <Label className="text-sm font-medium text-stone-700">Active Filters</Label>
              <div className="flex flex-wrap gap-2">
                {filters.brands.map((brand) => (
                  <Badge
                    key={brand}
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 cursor-pointer"
                    onClick={() => handleBrandChange(brand, false)}
                  >
                    {brand} <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
                {filters.platforms.map((platform) => (
                  <Badge
                    key={platform}
                    variant="secondary"
                    className="bg-green-100 text-green-800 cursor-pointer"
                    onClick={() => handlePlatformChange(platform, false)}
                  >
                    {platform} <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
                {filters.minDiscount > 0 && (
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-800 cursor-pointer"
                    onClick={() => handleDiscountChange([0])}
                  >
                    {filters.minDiscount}%+ discount <X className="w-3 h-3 ml-1" />
                  </Badge>
                )}
                {filters.minRating > 0 && (
                  <Badge
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800 cursor-pointer"
                    onClick={() => handleRatingChange([0])}
                  >
                    {filters.minRating}+ rating <X className="w-3 h-3 ml-1" />
                  </Badge>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
