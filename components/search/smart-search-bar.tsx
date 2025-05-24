"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Search, X, TrendingUp, Clock, Tag, Star, Zap, Palette } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSearch } from "@/hooks/use-search"
import { useAutocomplete } from "./autocomplete-engine"

interface SmartSearchBarProps {
  onSearchChange: (query: string) => void
  className?: string
}

const typeIcons = {
  product: Star,
  brand: Tag,
  category: TrendingUp,
  feature: Zap,
  color: Palette,
  size: Tag,
}

const typeColors = {
  product: "text-blue-600 bg-blue-50",
  brand: "text-purple-600 bg-purple-50",
  category: "text-green-600 bg-green-50",
  feature: "text-orange-600 bg-orange-50",
  color: "text-pink-600 bg-pink-50",
  size: "text-indigo-600 bg-indigo-50",
}

export function SmartSearchBar({ onSearchChange, className = "" }: SmartSearchBarProps) {
  const [query, setQuery] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const { searchHistory, addToHistory, clearHistory } = useSearch()
  const { getAutocompleteResults, getContextualSuggestions, getTrendingSuggestions } = useAutocomplete()

  const autocompleteResults = getAutocompleteResults(query, 6)
  const trendingSuggestions = getTrendingSuggestions(4)
  const contextualSuggestions = getContextualSuggestions(undefined, 3)

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onSearchChange(query)
    }, 300)

    return () => clearTimeout(delayedSearch)
  }, [query, onSearchChange])

  const handleSearch = useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery)
      if (searchQuery.trim()) {
        addToHistory(searchQuery.trim())
      }
      setShowSuggestions(false)
      setSelectedIndex(-1)
      inputRef.current?.blur()
    },
    [addToHistory],
  )

  const handleClear = () => {
    setQuery("")
    onSearchChange("")
    setShowSuggestions(false)
    setSelectedIndex(-1)
  }

  const handleFocus = () => {
    setIsExpanded(true)
    setShowSuggestions(true)
  }

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false)
      setSelectedIndex(-1)
      if (!query) {
        setIsExpanded(false)
      }
    }, 200)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return

    const allSuggestions = [...autocompleteResults, ...searchHistory.slice(0, 3), ...trendingSuggestions]

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < allSuggestions.length - 1 ? prev + 1 : 0))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : allSuggestions.length - 1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && allSuggestions[selectedIndex]) {
          const suggestion = allSuggestions[selectedIndex]
          const searchText = typeof suggestion === "string" ? suggestion : suggestion.text
          handleSearch(searchText)
        } else if (query.trim()) {
          handleSearch(query)
        }
        break
      case "Escape":
        setShowSuggestions(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text

    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

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
          onKeyDown={handleKeyDown}
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

      {/* Smart Suggestions */}
      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 z-50 overflow-hidden max-h-96 overflow-y-auto"
        >
          {/* Autocomplete Results */}
          {autocompleteResults.length > 0 && (
            <div className="p-4 border-b border-stone-100">
              <div className="flex items-center space-x-2 text-sm text-stone-600 mb-3">
                <Search className="w-4 h-4" />
                <span>Suggestions</span>
              </div>
              <div className="space-y-1">
                {autocompleteResults.map((suggestion, index) => {
                  const Icon = typeIcons[suggestion.type]
                  const colorClass = typeColors[suggestion.type]
                  const isSelected = selectedIndex === index

                  return (
                    <div
                      key={suggestion.id}
                      className={`flex items-center space-x-3 p-3 hover:bg-stone-50 rounded-xl cursor-pointer transition-colors ${
                        isSelected ? "bg-orange-50 border border-orange-200" : ""
                      }`}
                      onClick={() => handleSearch(suggestion.text)}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClass}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-stone-900">{highlightMatch(suggestion.text, query)}</div>
                        <div className="text-xs text-stone-500 capitalize">
                          {suggestion.type}
                          {suggestion.metadata?.category && ` • ${suggestion.metadata.category}`}
                        </div>
                      </div>
                      <div className="text-xs text-stone-400">{suggestion.popularity}% match</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {searchHistory.length > 0 && (
            <div className="p-4 border-b border-stone-100">
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
              <div className="space-y-1">
                {searchHistory.slice(0, 3).map((search, index) => {
                  const adjustedIndex = autocompleteResults.length + index
                  const isSelected = selectedIndex === adjustedIndex

                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-2 hover:bg-stone-50 rounded-lg cursor-pointer transition-colors ${
                        isSelected ? "bg-orange-50 border border-orange-200" : ""
                      }`}
                      onClick={() => handleSearch(search)}
                    >
                      <Clock className="w-4 h-4 text-stone-400" />
                      <span className="text-sm text-stone-700">{search}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Trending Suggestions */}
          {!query && trendingSuggestions.length > 0 && (
            <div className="p-4">
              <div className="flex items-center space-x-2 text-sm text-stone-600 mb-3">
                <TrendingUp className="w-4 h-4" />
                <span>Trending Now</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSuggestions.map((suggestion) => (
                  <Badge
                    key={suggestion.id}
                    variant="secondary"
                    className="cursor-pointer hover:bg-orange-100 hover:text-orange-700 transition-colors"
                    onClick={() => handleSearch(suggestion.text)}
                  >
                    {suggestion.text}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {autocompleteResults.length === 0 && searchHistory.length === 0 && !query && (
            <div className="p-6 text-center">
              <Search className="w-8 h-8 text-stone-300 mx-auto mb-2" />
              <p className="text-stone-500 text-sm">Start typing to see smart suggestions</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
