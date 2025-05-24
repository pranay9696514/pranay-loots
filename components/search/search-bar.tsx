"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, TrendingUp, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSearch } from "@/hooks/use-search"

interface SearchBarProps {
  onSearchChange: (query: string) => void
  className?: string
}

export function SearchBar({ onSearchChange, className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { searchHistory, popularSearches, addToHistory, clearHistory } = useSearch()

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onSearchChange(query)
    }, 300)

    return () => clearTimeout(delayedSearch)
  }, [query, onSearchChange])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    if (searchQuery.trim()) {
      addToHistory(searchQuery.trim())
    }
    setShowSuggestions(false)
    inputRef.current?.blur()
  }

  const handleClear = () => {
    setQuery("")
    onSearchChange("")
    setShowSuggestions(false)
  }

  const handleFocus = () => {
    setIsExpanded(true)
    setShowSuggestions(true)
  }

  const handleBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      setShowSuggestions(false)
      if (!query) {
        setIsExpanded(false)
      }
    }, 200)
  }

  const suggestions = [
    ...popularSearches.slice(0, 3),
    ...searchHistory.slice(0, 3).filter((item) => !popularSearches.includes(item)),
  ].slice(0, 6)

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search deals, brands, products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`pl-12 pr-12 h-12 bg-stone-50/50 border-stone-200 focus:bg-white transition-all duration-300 rounded-2xl text-stone-700 placeholder:text-stone-400 ${
            isExpanded ? "shadow-lg" : ""
          }`}
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-stone-100 rounded-full"
          >
            <X className="w-4 h-4 text-stone-400" />
          </Button>
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 z-50 overflow-hidden">
          {query && (
            <div className="p-4 border-b border-stone-100">
              <div className="flex items-center space-x-2 text-sm text-stone-600 mb-2">
                <Search className="w-4 h-4" />
                <span>Search for "{query}"</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSearch(query)}
                className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 p-0 h-auto"
              >
                Press Enter to search
              </Button>
            </div>
          )}

          {popularSearches.length > 0 && (
            <div className="p-4 border-b border-stone-100">
              <div className="flex items-center space-x-2 text-sm text-stone-600 mb-3">
                <TrendingUp className="w-4 h-4" />
                <span>Popular Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.slice(0, 4).map((search, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-orange-100 hover:text-orange-700 transition-colors"
                    onClick={() => handleSearch(search)}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {searchHistory.length > 0 && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-sm text-stone-600">
                  <Clock className="w-4 h-4" />
                  <span>Recent Searches</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearHistory}
                  className="text-xs text-stone-500 hover:text-stone-700 p-0 h-auto"
                >
                  Clear
                </Button>
              </div>
              <div className="space-y-2">
                {searchHistory.slice(0, 3).map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-2 hover:bg-stone-50 rounded-lg cursor-pointer transition-colors"
                    onClick={() => handleSearch(search)}
                  >
                    <Clock className="w-3 h-3 text-stone-400" />
                    <span className="text-sm text-stone-700">{search}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {suggestions.length === 0 && !query && (
            <div className="p-6 text-center">
              <Search className="w-8 h-8 text-stone-300 mx-auto mb-2" />
              <p className="text-stone-500 text-sm">Start typing to search deals</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
