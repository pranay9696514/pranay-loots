"use client"

import { Menu, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserMenu } from "@/components/auth/user-menu"
import { SmartSearchBar } from "@/components/search/smart-search-bar"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSearchChange = (query: string) => {
    // Find the deals section and trigger search
    if (typeof window !== "undefined" && (window as any).searchDeals) {
      ;(window as any).searchDeals(query)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-stone-200/50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-stone-800 to-orange-600 bg-clip-text text-transparent">
                PRANAY PREMIUM
              </h1>
              <p className="text-xs text-stone-500 -mt-1 font-medium">LOOTS & DEALS</p>
            </div>
          </div>

          {/* Smart Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <SmartSearchBar onSearchChange={handleSearchChange} className="w-full" />
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#fashion" className="text-stone-600 hover:text-orange-600 transition-colors font-medium">
              Fashion
            </a>
            <a href="#footwear" className="text-stone-600 hover:text-orange-600 transition-colors font-medium">
              Footwear
            </a>
            <a href="#tech" className="text-stone-600 hover:text-orange-600 transition-colors font-medium">
              Tech & Gadgets
            </a>
            <a href="#grooming" className="text-stone-600 hover:text-orange-600 transition-colors font-medium">
              Grooming
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="relative hover:bg-stone-100 rounded-xl">
              <Bell className="w-5 h-5 text-stone-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></span>
            </Button>
            <UserMenu />
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="w-5 h-5 text-stone-600" />
            </Button>
          </div>
        </div>

        {/* Mobile Smart Search */}
        <div className="md:hidden mt-4">
          <SmartSearchBar onSearchChange={handleSearchChange} className="w-full" />
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-6 pb-4 border-t border-stone-200/50 pt-6">
            <nav className="flex flex-col space-y-4">
              <a href="#fashion" className="text-stone-600 hover:text-orange-600 transition-colors font-medium">
                Men's Fashion
              </a>
              <a href="#footwear" className="text-stone-600 hover:text-orange-600 transition-colors font-medium">
                Footwear
              </a>
              <a href="#tech" className="text-stone-600 hover:text-orange-600 transition-colors font-medium">
                Tech & Gadgets
              </a>
              <a href="#grooming" className="text-stone-600 hover:text-orange-600 transition-colors font-medium">
                Grooming
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
