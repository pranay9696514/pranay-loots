"use client"

import { useState, useEffect } from "react"

const SEARCH_HISTORY_KEY = "pranay_search_history"
const MAX_HISTORY_ITEMS = 10

export function useSearch() {
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [popularSearches] = useState([
    "Nike shoes",
    "iPhone",
    "Polo t-shirt",
    "Beard oil",
    "Smartwatch",
    "Jeans",
    "Headphones",
    "Sunglasses",
  ])

  useEffect(() => {
    // Load search history from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(SEARCH_HISTORY_KEY)
      if (saved) {
        try {
          setSearchHistory(JSON.parse(saved))
        } catch (error) {
          console.error("Error loading search history:", error)
        }
      }
    }
  }, [])

  const addToHistory = (query: string) => {
    if (!query.trim()) return

    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== query.toLowerCase())
      const newHistory = [query, ...filtered].slice(0, MAX_HISTORY_ITEMS)

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory))
      }

      return newHistory
    })
  }

  const clearHistory = () => {
    setSearchHistory([])
    if (typeof window !== "undefined") {
      localStorage.removeItem(SEARCH_HISTORY_KEY)
    }
  }

  const removeFromHistory = (query: string) => {
    setSearchHistory((prev) => {
      const newHistory = prev.filter((item) => item !== query)
      if (typeof window !== "undefined") {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory))
      }
      return newHistory
    })
  }

  return {
    searchHistory,
    popularSearches,
    addToHistory,
    clearHistory,
    removeFromHistory,
  }
}
