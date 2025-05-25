"use client"

import { Shirt, Smartphone, Footprints, Scissors } from "lucide-react"

const categories = [
  {
    id: "fashion",
    name: "Men's Fashion",
    icon: Shirt,
    description: "Premium clothing & accessories",
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50",
    deals: "2.5K+ deals",
  },
  {
    id: "footwear",
    name: "Footwear",
    icon: Footprints,
    description: "Sneakers, formal & casual shoes",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    deals: "1.8K+ deals",
  },
  {
    id: "tech",
    name: "Tech & Gadgets",
    icon: Smartphone,
    description: "Latest electronics & accessories",
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50",
    deals: "3.2K+ deals",
  },
  {
    id: "grooming",
    name: "Grooming",
    icon: Scissors,
    description: "Skincare, haircare & wellness",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50",
    deals: "1.2K+ deals",
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: Smartphone,
    description: "Home appliances & electronics",
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-50",
    deals: "2.8K+ deals",
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: Shirt,
    description: "Watches, bags, wallets & more",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
    deals: "1.5K+ deals",
  },
  {
    id: "home",
    name: "Home & Living",
    icon: Scissors,
    description: "Home essentials & decor",
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-50",
    deals: "2.1K+ deals",
  },
]

export function Categories() {
  const scrollToDeals = (categoryId: string) => {
    const dealsSection = document.getElementById("deals")
    if (dealsSection) {
      dealsSection.scrollIntoView({ behavior: "smooth" })
      // You can add category filtering logic here
    }
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            Shop by{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Categories
            </span>
          </h2>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            Discover amazing deals across your favorite product categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <div
                key={category.id}
                className="group cursor-pointer"
                onClick={() => scrollToDeals(category.id)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-stone-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 mb-3">{category.name}</h3>
                  <p className="text-stone-600 mb-4">{category.description}</p>

                  <div
                    className={`inline-block ${category.bgColor} px-3 py-1 rounded-full text-sm font-semibold text-stone-700`}
                  >
                    {category.deals}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
