"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { PriceFilter } from "./price-filter"
import { AdvancedFilters } from "./advanced-filters"
import { SlidersHorizontal, X } from "lucide-react"

interface FilterSidebarProps {
  priceRange: { min: number; max: number }
  onPriceChange: (min: number, max: number) => void
  filters: {
    brands: string[]
    platforms: string[]
    minDiscount: number
    minRating: number
    sortBy: string
  }
  onFiltersChange: (filters: any) => void
  resultsCount: number
}

export function FilterSidebar({
  priceRange,
  onPriceChange,
  filters,
  onFiltersChange,
  resultsCount,
}: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const activeFiltersCount =
    (priceRange.min > 0 || priceRange.max < 10000 ? 1 : 0) +
    filters.brands.length +
    filters.platforms.length +
    (filters.minDiscount > 0 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.sortBy !== "relevance" ? 1 : 0)

  const clearAllFilters = () => {
    onPriceChange(0, 10000)
    onFiltersChange({
      brands: [],
      platforms: [],
      minDiscount: 0,
      minRating: 0,
      sortBy: "relevance",
    })
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-stone-800">Filters & Sort</h3>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-stone-500">
              Clear All
            </Button>
          )}
        </div>

        <PriceFilter minPrice={priceRange.min} maxPrice={priceRange.max} onPriceChange={onPriceChange} />

        <AdvancedFilters filters={filters} onFiltersChange={onFiltersChange} />

        {/* Results Summary */}
        <div className="bg-stone-50 rounded-xl p-4 text-center">
          <p className="text-sm text-stone-600">
            Showing <span className="font-semibold text-orange-600">{resultsCount}</span> deals
          </p>
          {activeFiltersCount > 0 && (
            <p className="text-xs text-stone-500 mt-1">{activeFiltersCount} filters applied</p>
          )}
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="relative border-stone-200 text-stone-600 hover:border-orange-300 hover:text-orange-600"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters & Sort
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-full sm:w-96 overflow-y-auto">
            <SheetHeader>
              <div className="flex items-center justify-between">
                <SheetTitle>Filters & Sort</SheetTitle>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-stone-500">
                    <X className="w-4 h-4 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>
            </SheetHeader>

            <div className="space-y-6 mt-6">
              <PriceFilter minPrice={priceRange.min} maxPrice={priceRange.max} onPriceChange={onPriceChange} />

              <AdvancedFilters filters={filters} onFiltersChange={onFiltersChange} />

              {/* Apply Button */}
              <Button
                onClick={() => setIsOpen(false)}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
              >
                Apply Filters ({resultsCount} deals)
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
