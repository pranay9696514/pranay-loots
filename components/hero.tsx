"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react"

export function Hero() {
  const scrollToDeals = () => {
    const dealsSection = document.getElementById("deals")
    if (dealsSection) {
      dealsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-stone-50/50"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-orange-200/20 to-amber-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-orange-200/50 rounded-full px-6 py-3 mb-8 shadow-lg">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-semibold text-stone-700">Premium Deals Platform</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-stone-900 mb-8 leading-tight">
            Discover{" "}
            <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent">
              Premium Deals
            </span>
            <br />
            Before Everyone Else
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-stone-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Curated deals from top Indian e-commerce platforms. Save big on fashion, tech, grooming, and lifestyle
            products.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Button
              onClick={scrollToDeals}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              Explore Deals
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              className="border-2 border-stone-200 text-stone-700 hover:border-orange-300 hover:text-orange-600 rounded-2xl px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              How It Works
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-stone-200/50 shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-2">50K+</h3>
              <p className="text-stone-600">Deals Tracked</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-stone-200/50 shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-2">10K+</h3>
              <p className="text-stone-600">Happy Users</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-stone-200/50 shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-2">₹2Cr+</h3>
              <p className="text-stone-600">Money Saved</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
