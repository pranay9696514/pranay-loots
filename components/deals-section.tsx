"use client"

import { useState, useEffect, useMemo } from "react"
import { DealCardEnhanced } from "./deal-card-enhanced"
import { SearchResults } from "@/components/search/search-results"
import { FilterSidebar } from "@/components/filters/filter-sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Grid3X3, List, TrendingUp } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

// Expanded mock deals data with working affiliate links
const mockDeals = [
  // Tech & Gadgets
  {
    id: "1",
    title: "boAt Airdopes 131 Wireless Earbuds with 60H Playtime",
    originalPrice: 2999,
    discountedPrice: 1299,
    discount: 57,
    platform: "amazon",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop&crop=center",
    rating: 4.2,
    reviews: 45678,
    category: "Tech",
    brand: "boAt",
    affiliateUrl: "https://www.amazon.in/s?k=boat+airdopes+131&ref=nb_sb_noss",
    productId: "B08R6QBZPX",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "4",
    title: "JBL Go 3 Portable Bluetooth Speaker",
    originalPrice: 2999,
    discountedPrice: 1999,
    discount: 33,
    platform: "amazon",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviews: 892,
    category: "Tech",
    brand: "JBL",
    affiliateUrl: "https://www.amazon.in/s?k=jbl+go+3+speaker&ref=nb_sb_noss",
    productId: "B08C4KWM9T",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Noise ColorFit Pro 3 Smart Watch Black",
    originalPrice: 2499,
    discountedPrice: 1249,
    discount: 50,
    platform: "amazon",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center",
    rating: 4.3,
    reviews: 1567,
    category: "Tech",
    brand: "Noise",
    affiliateUrl: "https://www.amazon.in/s?k=noise+colorfit+pro+3&ref=nb_sb_noss",
    productId: "B08XYZNOISE",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "10",
    title: "Mi Power Bank 3i 20000mAh",
    originalPrice: 1999,
    discountedPrice: 1299,
    discount: 35,
    platform: "amazon",
    image: "https://images.unsplash.com/photo-1609592806787-3d9c1b8e5e8e?w=400&h=400&fit=crop&crop=center",
    rating: 4.4,
    reviews: 8765,
    category: "Tech",
    brand: "Mi",
    affiliateUrl: "https://www.amazon.in/s?k=mi+power+bank+20000mah&ref=nb_sb_noss",
    productId: "B08MIPOWERBANK",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },

  // Electronics
  {
    id: "e1",
    title: "Samsung 32-inch HD Ready LED TV",
    originalPrice: 18999,
    discountedPrice: 12999,
    discount: 32,
    platform: "flipkart",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop&crop=center",
    rating: 4.2,
    reviews: 3456,
    category: "Electronics",
    brand: "Samsung",
    affiliateUrl: "https://www.flipkart.com/search?q=samsung+32+inch+led+tv",
    productId: "TVSAMSUNG32HD",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "e2",
    title: "LG 260L 3 Star Frost Free Double Door Refrigerator",
    originalPrice: 28999,
    discountedPrice: 22999,
    discount: 21,
    platform: "amazon",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop&crop=center",
    rating: 4.1,
    reviews: 2134,
    category: "Electronics",
    brand: "LG",
    affiliateUrl: "https://www.amazon.in/s?k=lg+260l+refrigerator&ref=nb_sb_noss",
    productId: "B08LGFRIDGE260",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "e3",
    title: "Whirlpool 7 Kg 5 Star Semi-Automatic Washing Machine",
    originalPrice: 15999,
    discountedPrice: 11999,
    discount: 25,
    platform: "flipkart",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=400&fit=crop&crop=center",
    rating: 4.3,
    reviews: 1876,
    category: "Electronics",
    brand: "Whirlpool",
    affiliateUrl: "https://www.flipkart.com/search?q=whirlpool+7kg+washing+machine",
    productId: "WMWHIRLPOOL7KG",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "e4",
    title: "Bajaj Majesty RCX 3 1.8L Rice Cooker",
    originalPrice: 2499,
    discountedPrice: 1599,
    discount: 36,
    platform: "amazon",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&crop=center",
    rating: 4.0,
    reviews: 987,
    category: "Electronics",
    brand: "Bajaj",
    affiliateUrl: "https://www.amazon.in/s?k=bajaj+rice+cooker+1.8l&ref=nb_sb_noss",
    productId: "B08BAJAJRICE18",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "e5",
    title: "Crompton High Flo Wave 24L Desert Air Cooler",
    originalPrice: 8999,
    discountedPrice: 6499,
    discount: 28,
    platform: "flipkart",
    image: "https://images.unsplash.com/photo-1631545806609-c2b999c8f4c6?w=400&h=400&fit=crop&crop=center",
    rating: 4.2,
    reviews: 1543,
    category: "Electronics",
    brand: "Crompton",
    affiliateUrl: "https://www.flipkart.com/search?q=crompton+air+cooler+24l",
    productId: "ACCROMPTON24L",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "e6",
    title: "Prestige Iris 750 Watt Mixer Grinder",
    originalPrice: 4999,
    discountedPrice: 2999,
    discount: 40,
    platform: "amazon",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center",
    rating: 4.4,
    reviews: 2876,
    category: "Electronics",
    brand: "Prestige",
    affiliateUrl: "https://www.amazon.in/s?k=prestige+iris+mixer+grinder&ref=nb_sb_noss",
    productId: "B08PRESTIGEIRIS",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },

  // Fashion
  {
    id: "2",
    title: "Allen Solly Men's Regular Fit Polo T-Shirt",
    originalPrice: 1999,
    discountedPrice: 999,
    discount: 50,
    platform: "amazon",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center",
    rating: 4.3,
    reviews: 1247,
    category: "Fashion",
    brand: "Allen Solly",
    affiliateUrl: "https://www.amazon.in/s?k=allen+solly+polo+tshirt&ref=nb_sb_noss",
    productId: "B08N5WRWNW",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Peter England Men Navy Blue Slim Fit Chinos",
    originalPrice: 1799,
    discountedPrice: 899,
    discount: 50,
    platform: "myntra",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop&crop=center",
    rating: 4.2,
    reviews: 654,
    category: "Fashion",
    brand: "Peter England",
    affiliateUrl: "https://www.myntra.com/peter-england",
    productId: "12345678",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "7",
    title: "Van Heusen Men's Formal Shirt",
    originalPrice: 2199,
    discountedPrice: 1099,
    discount: 50,
    platform: "amazon",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop&crop=center",
    rating: 4.1,
    reviews: 892,
    category: "Fashion",
    brand: "Van Heusen",
    affiliateUrl: "https://www.amazon.in/s?k=van+heusen+formal+shirt&ref=nb_sb_noss",
    productId: "B08VHFORMAL",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "11",
    title: "Jack & Jones Men's Slim Jeans",
    originalPrice: 2499,
    discountedPrice: 1499,
    discount: 40,
    platform: "myntra",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop&crop=center",
    rating: 4.2,
    reviews: 567,
    category: "Fashion",
    brand: "Jack & Jones",
    affiliateUrl: "https://www.myntra.com/jack-and-jones",
    productId: "87654321",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },

  // Footwear
  {
    id: "3",
    title: "Woodland Men Leather Casual Shoes",
    originalPrice: 2999,
    discountedPrice: 1999,
    discount: 33,
    platform: "flipkart",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
    rating: 4.4,
    reviews: 1234,
    category: "Footwear",
    brand: "Woodland",
    affiliateUrl: "https://www.flipkart.com/search?q=woodland+men+leather+shoes",
    productId: "SHOEF3GVZH9K7XYZ",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "8",
    title: "Puma Men's Running Shoes",
    originalPrice: 2999,
    discountedPrice: 1799,
    discount: 40,
    platform: "flipkart",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center",
    rating: 4.5,
    reviews: 2134,
    category: "Footwear",
    brand: "Puma",
    affiliateUrl: "https://www.flipkart.com/search?q=puma+men+running+shoes",
    productId: "SHOEPUMA123",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },

  // Grooming
  {
    id: "9",
    title: "Beardo Beard Growth Oil",
    originalPrice: 899,
    discountedPrice: 549,
    discount: 39,
    platform: "amazon",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=400&fit=crop&crop=center",
    rating: 4.0,
    reviews: 3456,
    category: "Grooming",
    brand: "Beardo",
    affiliateUrl: "https://www.amazon.in/s?k=beardo+beard+oil&ref=nb_sb_noss",
    productId: "B08BEARDOIL",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "12",
    title: "Philips Hair Trimmer for Men",
    originalPrice: 1799,
    discountedPrice: 1199,
    discount: 33,
    platform: "amazon",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop&crop=center",
    rating: 4.3,
    reviews: 2345,
    category: "Grooming",
    brand: "Philips",
    affiliateUrl: "https://www.amazon.in/s?k=philips+hair+trimmer&ref=nb_sb_noss",
    productId: "B08PHILIPSTRIM",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },

  // Accessories
  {
    id: "a1",
    title: "Fossil Men's Analog Watch with Leather Strap",
    originalPrice: 8999,
    discountedPrice: 5999,
    discount: 33,
    platform: "amazon",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop&crop=center",
    rating: 4.5,
    reviews: 1876,
    category: "Accessories",
    brand: "Fossil",
    affiliateUrl: "https://www.amazon.in/s?k=fossil+men+watch&ref=nb_sb_noss",
    productId: "B08FOSSILWATCH",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "a2",
    title: "Ray-Ban Aviator Classic Sunglasses",
    originalPrice: 7999,
    discountedPrice: 5499,
    discount: 31,
    platform: "flipkart",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviews: 2543,
    category: "Accessories",
    brand: "Ray-Ban",
    affiliateUrl: "https://www.flipkart.com/search?q=ray+ban+aviator+sunglasses",
    productId: "SUNGLASSRAYBAN",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "a3",
    title: "Wildcraft Unisex Laptop Backpack 35L",
    originalPrice: 2999,
    discountedPrice: 1899,
    discount: 37,
    platform: "amazon",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
    rating: 4.3,
    reviews: 1654,
    category: "Accessories",
    brand: "Wildcraft",
    affiliateUrl: "https://www.amazon.in/s?k=wildcraft+laptop+backpack&ref=nb_sb_noss",
    productId: "B08WILDCRAFTBAG",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "a4",
    title: "Tommy Hilfiger Men's Leather Wallet",
    originalPrice: 2499,
    discountedPrice: 1499,
    discount: 40,
    platform: "myntra",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop&crop=center",
    rating: 4.4,
    reviews: 987,
    category: "Accessories",
    brand: "Tommy Hilfiger",
    affiliateUrl: "https://www.myntra.com/tommy-hilfiger",
    productId: "98765432",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "a5",
    title: "Fastrack Analog Men's Watch",
    originalPrice: 1999,
    discountedPrice: 1299,
    discount: 35,
    platform: "amazon",
    image: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=400&h=400&fit=crop&crop=center",
    rating: 4.1,
    reviews: 3456,
    category: "Accessories",
    brand: "Fastrack",
    affiliateUrl: "https://www.amazon.in/s?k=fastrack+men+watch&ref=nb_sb_noss",
    productId: "B08FASTRACKWATCH",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "a6",
    title: "Skybags Casual Backpack 26L",
    originalPrice: 1799,
    discountedPrice: 999,
    discount: 44,
    platform: "flipkart",
    image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=400&h=400&fit=crop&crop=center",
    rating: 4.2,
    reviews: 2134,
    category: "Accessories",
    brand: "Skybags",
    affiliateUrl: "https://www.flipkart.com/search?q=skybags+backpack",
    productId: "BAGSKYBAGS26L",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },

  // Home Products
  {
    id: "h1",
    title: "Philips LED Bulb 9W B22 Cool White (Pack of 4)",
    originalPrice: 799,
    discountedPrice: 499,
    discount: 38,
    platform: "amazon",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
    rating: 4.3,
    reviews: 5678,
    category: "Home",
    brand: "Philips",
    affiliateUrl: "https://www.amazon.in/s?k=philips+led+bulb+9w&ref=nb_sb_noss",
    productId: "B08PHILIPSLED9W",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "h2",
    title: "Cello Checkers Plastic Chair Set (Set of 4)",
    originalPrice: 3999,
    discountedPrice: 2499,
    discount: 38,
    platform: "flipkart",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
    rating: 4.0,
    reviews: 1234,
    category: "Home",
    brand: "Cello",
    affiliateUrl: "https://www.flipkart.com/search?q=cello+plastic+chairs",
    productId: "CHAIRCELLOS4",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "h3",
    title: "Amazon Basics Cotton Bath Towel Set (Set of 2)",
    originalPrice: 1299,
    discountedPrice: 799,
    discount: 38,
    platform: "amazon",
    image: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400&h=400&fit=crop&crop=center",
    rating: 4.2,
    reviews: 3456,
    category: "Home",
    brand: "Amazon Basics",
    affiliateUrl: "https://www.amazon.in/s?k=amazon+basics+towel+set&ref=nb_sb_noss",
    productId: "B08AMAZONBATHTOWEL",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "h4",
    title: "Milton Thermosteel Flip Lid Flask 500ml",
    originalPrice: 899,
    discountedPrice: 599,
    discount: 33,
    platform: "amazon",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&crop=center",
    rating: 4.4,
    reviews: 2876,
    category: "Home",
    brand: "Milton",
    affiliateUrl: "https://www.amazon.in/s?k=milton+flask+500ml&ref=nb_sb_noss",
    productId: "B08MILTONFLASK500",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "h5",
    title: "Solimo 100% Cotton Bed Sheet Set Queen Size",
    originalPrice: 1999,
    discountedPrice: 1299,
    discount: 35,
    platform: "amazon",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop&crop=center",
    rating: 4.1,
    reviews: 1876,
    category: "Home",
    brand: "Solimo",
    affiliateUrl: "https://www.amazon.in/s?k=solimo+bed+sheet+set&ref=nb_sb_noss",
    productId: "B08SOLIMOBEDSHEET",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "h6",
    title: "Pigeon Favourite Electric Kettle 1.5L",
    originalPrice: 1299,
    discountedPrice: 899,
    discount: 31,
    platform: "flipkart",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop&crop=center",
    rating: 4.3,
    reviews: 4567,
    category: "Home",
    brand: "Pigeon",
    affiliateUrl: "https://www.flipkart.com/search?q=pigeon+electric+kettle",
    productId: "KETTLEPIGEON15L",
    availability: true,
    lastUpdated: new Date().toISOString(),
  },
]

export function DealsSection() {
  const { user } = useAuth()
  const [deals] = useState(mockDeals)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter states
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const [filters, setFilters] = useState({
    brands: [] as string[],
    platforms: [] as string[],
    minDiscount: 0,
    minRating: 0,
    sortBy: "relevance",
  })

  const categories = ["All", "Fashion", "Footwear", "Tech", "Grooming", "Electronics", "Accessories", "Home"]

  // Apply all filters and sorting
  const filteredAndSortedDeals = useMemo(() => {
    let filtered = deals.filter((deal) => deal.availability) // Only show available products

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((deal) => deal.category === selectedCategory)
    }

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (deal) =>
          deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          deal.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          deal.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          deal.platform.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Price range filter
    filtered = filtered.filter(
      (deal) => deal.discountedPrice >= priceRange.min && deal.discountedPrice <= priceRange.max,
    )

    // Brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter((deal) => filters.brands.includes(deal.brand))
    }

    // Platform filter
    if (filters.platforms.length > 0) {
      filtered = filtered.filter((deal) => filters.platforms.includes(deal.platform))
    }

    // Discount filter
    if (filters.minDiscount > 0) {
      filtered = filtered.filter((deal) => deal.discount >= filters.minDiscount)
    }

    // Rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter((deal) => deal.rating >= filters.minRating)
    }

    // Sorting
    switch (filters.sortBy) {
      case "price_low":
        filtered.sort((a, b) => a.discountedPrice - b.discountedPrice)
        break
      case "price_high":
        filtered.sort((a, b) => b.discountedPrice - a.discountedPrice)
        break
      case "discount":
        filtered.sort((a, b) => b.discount - a.discount)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
        break
      default:
        // Relevance - sort by discount and rating
        filtered.sort((a, b) => b.discount * b.rating - a.discount * a.rating)
        break
    }

    return filtered
  }, [deals, selectedCategory, searchQuery, priceRange, filters])

  const searchDeals = (query: string) => {
    setSearchQuery(query)
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLastUpdated(new Date())
    setIsRefreshing(false)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  // Expose search function to header
  useEffect(() => {
    ;(window as any).searchDeals = searchDeals
  }, [])

  return (
    <section id="deals" className="py-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            🔥{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Live Premium Deals
            </span>
          </h2>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto mb-8">
            Handpicked deals from top e-commerce platforms with live pricing updates
          </p>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl px-6 py-3"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Updating..." : "Update Prices"}
            </Button>

            <div className="flex items-center space-x-2 text-sm text-stone-500">
              <TrendingUp className="w-4 h-4" />
              <span>Last updated: {formatTime(lastUpdated)}</span>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <SearchResults
            deals={filteredAndSortedDeals}
            query={searchQuery}
            totalResults={filteredAndSortedDeals.length}
          />
        )}

        {/* Main Content - only show when not searching */}
        {!searchQuery && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <FilterSidebar
              priceRange={priceRange}
              onPriceChange={(min, max) => setPriceRange({ min, max })}
              filters={filters}
              onFiltersChange={setFilters}
              resultsCount={filteredAndSortedDeals.length}
            />

            {/* Main Content */}
            <div className="flex-1">
              {/* Category Filter & View Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-2xl px-6 py-3 transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                          : "border-stone-200 text-stone-600 hover:border-orange-300 hover:text-orange-600"
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                <div className="flex items-center space-x-4">
                  {/* Mobile Filter Button */}
                  <div className="lg:hidden">
                    <FilterSidebar
                      priceRange={priceRange}
                      onPriceChange={(min, max) => setPriceRange({ min, max })}
                      filters={filters}
                      onFiltersChange={setFilters}
                      resultsCount={filteredAndSortedDeals.length}
                    />
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="p-2"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="p-2"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results Summary */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <p className="text-stone-600">
                    Showing <span className="font-semibold text-orange-600">{filteredAndSortedDeals.length}</span> of{" "}
                    <span className="font-semibold">{deals.length}</span> live deals
                  </p>
                  {(priceRange.min > 0 || priceRange.max < 10000) && (
                    <Badge variant="outline" className="border-orange-200 text-orange-700">
                      ₹{priceRange.min} - ₹{priceRange.max}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Loading State */}
              {isRefreshing && (
                <div className="text-center py-16">
                  <RefreshCw className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-4" />
                  <p className="text-stone-600">Updating live prices...</p>
                </div>
              )}

              {/* Deals Grid */}
              {!isRefreshing && (
                <div
                  className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" : "space-y-6"}
                >
                  {filteredAndSortedDeals.map((deal, index) => (
                    <DealCardEnhanced key={deal.id} deal={deal} index={index} />
                  ))}
                </div>
              )}

              {/* No Results */}
              {!isRefreshing && filteredAndSortedDeals.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-stone-700 mb-2">No deals found</h3>
                  <p className="text-stone-500 mb-6">Try adjusting your filters or search terms</p>
                  <Button
                    onClick={() => {
                      setPriceRange({ min: 0, max: 10000 })
                      setFilters({
                        brands: [],
                        platforms: [],
                        minDiscount: 0,
                        minRating: 0,
                        sortBy: "relevance",
                      })
                      setSelectedCategory("All")
                    }}
                    variant="outline"
                    className="rounded-2xl"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}

              {/* Load More */}
              {!isRefreshing && filteredAndSortedDeals.length > 0 && (
                <div className="text-center mt-16">
                  <Button
                    variant="outline"
                    className="rounded-2xl px-8 py-4 border-stone-200 text-stone-600 hover:border-orange-300 hover:text-orange-600 transition-all duration-300"
                  >
                    Load More Deals
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
