"use client"

import { useMemo } from "react"

interface AutocompleteItem {
  id: string
  text: string
  type: "product" | "brand" | "category" | "feature" | "color" | "size"
  popularity: number
  metadata?: {
    category?: string
    brand?: string
    price_range?: string
    discount_range?: string
  }
}

// Comprehensive autocomplete database with brands in ₹500-₹3000 range
const autocompleteData: AutocompleteItem[] = [
  // Fashion Brands (₹500-₹3000)
  {
    id: "b1",
    text: "Allen Solly",
    type: "brand",
    popularity: 85,
    metadata: { category: "Fashion", price_range: "₹800-₹2500" },
  },
  {
    id: "b2",
    text: "Van Heusen",
    type: "brand",
    popularity: 82,
    metadata: { category: "Fashion", price_range: "₹900-₹2800" },
  },
  {
    id: "b3",
    text: "Peter England",
    type: "brand",
    popularity: 80,
    metadata: { category: "Fashion", price_range: "₹600-₹2200" },
  },
  {
    id: "b4",
    text: "Arrow",
    type: "brand",
    popularity: 78,
    metadata: { category: "Fashion", price_range: "₹1000-₹3000" },
  },
  {
    id: "b5",
    text: "Louis Philippe",
    type: "brand",
    popularity: 76,
    metadata: { category: "Fashion", price_range: "₹1200-₹3000" },
  },
  {
    id: "b6",
    text: "Park Avenue",
    type: "brand",
    popularity: 74,
    metadata: { category: "Fashion", price_range: "₹800-₹2500" },
  },
  {
    id: "b7",
    text: "John Players",
    type: "brand",
    popularity: 72,
    metadata: { category: "Fashion", price_range: "₹700-₹2000" },
  },
  {
    id: "b8",
    text: "Blackberrys",
    type: "brand",
    popularity: 70,
    metadata: { category: "Fashion", price_range: "₹1000-₹2800" },
  },
  {
    id: "b9",
    text: "United Colors of Benetton",
    type: "brand",
    popularity: 75,
    metadata: { category: "Fashion", price_range: "₹800-₹2500" },
  },
  {
    id: "b10",
    text: "Flying Machine",
    type: "brand",
    popularity: 73,
    metadata: { category: "Fashion", price_range: "₹600-₹2000" },
  },
  {
    id: "b11",
    text: "Wrangler",
    type: "brand",
    popularity: 77,
    metadata: { category: "Fashion", price_range: "₹800-₹2500" },
  },
  {
    id: "b12",
    text: "Lee",
    type: "brand",
    popularity: 76,
    metadata: { category: "Fashion", price_range: "₹900-₹2800" },
  },
  {
    id: "b13",
    text: "Spykar",
    type: "brand",
    popularity: 68,
    metadata: { category: "Fashion", price_range: "₹700-₹2200" },
  },
  {
    id: "b14",
    text: "Pepe Jeans",
    type: "brand",
    popularity: 74,
    metadata: { category: "Fashion", price_range: "₹1000-₹3000" },
  },
  {
    id: "b15",
    text: "Jack & Jones",
    type: "brand",
    popularity: 79,
    metadata: { category: "Fashion", price_range: "₹800-₹2500" },
  },
  {
    id: "b16",
    text: "Only & Sons",
    type: "brand",
    popularity: 71,
    metadata: { category: "Fashion", price_range: "₹700-₹2200" },
  },
  {
    id: "b17",
    text: "H&M",
    type: "brand",
    popularity: 81,
    metadata: { category: "Fashion", price_range: "₹500-₹2000" },
  },
  {
    id: "b18",
    text: "Zara",
    type: "brand",
    popularity: 83,
    metadata: { category: "Fashion", price_range: "₹1000-₹3000" },
  },

  // Footwear Brands (₹500-₹3000)
  {
    id: "f1",
    text: "Red Tape",
    type: "brand",
    popularity: 75,
    metadata: { category: "Footwear", price_range: "₹800-₹2500" },
  },
  {
    id: "f2",
    text: "Woodland",
    type: "brand",
    popularity: 78,
    metadata: { category: "Footwear", price_range: "₹1000-₹3000" },
  },
  {
    id: "f3",
    text: "Bata",
    type: "brand",
    popularity: 80,
    metadata: { category: "Footwear", price_range: "₹500-₹2000" },
  },
  {
    id: "f4",
    text: "Liberty",
    type: "brand",
    popularity: 72,
    metadata: { category: "Footwear", price_range: "₹600-₹2200" },
  },
  {
    id: "f5",
    text: "Sparx",
    type: "brand",
    popularity: 70,
    metadata: { category: "Footwear", price_range: "₹500-₹1800" },
  },
  {
    id: "f6",
    text: "Campus",
    type: "brand",
    popularity: 73,
    metadata: { category: "Footwear", price_range: "₹600-₹2000" },
  },
  {
    id: "f7",
    text: "Action",
    type: "brand",
    popularity: 68,
    metadata: { category: "Footwear", price_range: "₹500-₹1500" },
  },
  {
    id: "f8",
    text: "Lotto",
    type: "brand",
    popularity: 69,
    metadata: { category: "Footwear", price_range: "₹700-₹2200" },
  },
  {
    id: "f9",
    text: "Fila",
    type: "brand",
    popularity: 76,
    metadata: { category: "Footwear", price_range: "₹800-₹2800" },
  },
  {
    id: "f10",
    text: "Reebok",
    type: "brand",
    popularity: 82,
    metadata: { category: "Footwear", price_range: "₹1000-₹3000" },
  },
  {
    id: "f11",
    text: "Puma",
    type: "brand",
    popularity: 85,
    metadata: { category: "Footwear", price_range: "₹1200-₹3000" },
  },
  {
    id: "f12",
    text: "Adidas",
    type: "brand",
    popularity: 88,
    metadata: { category: "Footwear", price_range: "₹1500-₹3000" },
  },
  {
    id: "f13",
    text: "Converse",
    type: "brand",
    popularity: 77,
    metadata: { category: "Footwear", price_range: "₹1000-₹2800" },
  },
  {
    id: "f14",
    text: "Vans",
    type: "brand",
    popularity: 74,
    metadata: { category: "Footwear", price_range: "₹1200-₹3000" },
  },
  {
    id: "f15",
    text: "Clarks",
    type: "brand",
    popularity: 71,
    metadata: { category: "Footwear", price_range: "₹1500-₹3000" },
  },

  // Tech & Gadgets Brands (₹500-₹3000)
  { id: "t1", text: "boAt", type: "brand", popularity: 88, metadata: { category: "Tech", price_range: "₹500-₹2500" } },
  { id: "t2", text: "Noise", type: "brand", popularity: 82, metadata: { category: "Tech", price_range: "₹600-₹2000" } },
  {
    id: "t3",
    text: "Fire-Boltt",
    type: "brand",
    popularity: 80,
    metadata: { category: "Tech", price_range: "₹700-₹2200" },
  },
  {
    id: "t4",
    text: "Amazfit",
    type: "brand",
    popularity: 78,
    metadata: { category: "Tech", price_range: "₹1000-₹3000" },
  },
  {
    id: "t5",
    text: "Realme",
    type: "brand",
    popularity: 85,
    metadata: { category: "Tech", price_range: "₹800-₹2800" },
  },
  { id: "t6", text: "Mi", type: "brand", popularity: 87, metadata: { category: "Tech", price_range: "₹600-₹2500" } },
  { id: "t7", text: "Redmi", type: "brand", popularity: 84, metadata: { category: "Tech", price_range: "₹700-₹2200" } },
  { id: "t8", text: "JBL", type: "brand", popularity: 81, metadata: { category: "Tech", price_range: "₹1000-₹3000" } },
  { id: "t9", text: "Sony", type: "brand", popularity: 86, metadata: { category: "Tech", price_range: "₹1200-₹3000" } },
  {
    id: "t10",
    text: "Philips",
    type: "brand",
    popularity: 75,
    metadata: { category: "Tech", price_range: "₹800-₹2500" },
  },
  {
    id: "t11",
    text: "Portronics",
    type: "brand",
    popularity: 72,
    metadata: { category: "Tech", price_range: "₹500-₹2000" },
  },
  {
    id: "t12",
    text: "Zebronics",
    type: "brand",
    popularity: 70,
    metadata: { category: "Tech", price_range: "₹600-₹1800" },
  },
  {
    id: "t13",
    text: "Ambrane",
    type: "brand",
    popularity: 68,
    metadata: { category: "Tech", price_range: "₹500-₹1500" },
  },
  {
    id: "t14",
    text: "Syska",
    type: "brand",
    popularity: 69,
    metadata: { category: "Tech", price_range: "₹600-₹2000" },
  },
  {
    id: "t15",
    text: "Anker",
    type: "brand",
    popularity: 76,
    metadata: { category: "Tech", price_range: "₹800-₹2800" },
  },

  // Grooming Brands (₹500-₹3000)
  {
    id: "g1",
    text: "Beardo",
    type: "brand",
    popularity: 85,
    metadata: { category: "Grooming", price_range: "₹500-₹2000" },
  },
  {
    id: "g2",
    text: "The Man Company",
    type: "brand",
    popularity: 82,
    metadata: { category: "Grooming", price_range: "₹600-₹2200" },
  },
  {
    id: "g3",
    text: "Bombay Shaving Company",
    type: "brand",
    popularity: 80,
    metadata: { category: "Grooming", price_range: "₹700-₹2500" },
  },
  {
    id: "g4",
    text: "Ustraa",
    type: "brand",
    popularity: 78,
    metadata: { category: "Grooming", price_range: "₹500-₹1800" },
  },
  {
    id: "g5",
    text: "Park Avenue",
    type: "brand",
    popularity: 76,
    metadata: { category: "Grooming", price_range: "₹600-₹2000" },
  },
  {
    id: "g6",
    text: "Nivea Men",
    type: "brand",
    popularity: 83,
    metadata: { category: "Grooming", price_range: "₹500-₹1500" },
  },
  {
    id: "g7",
    text: "Garnier Men",
    type: "brand",
    popularity: 79,
    metadata: { category: "Grooming", price_range: "₹500-₹1200" },
  },
  {
    id: "g8",
    text: "L'Oreal Men Expert",
    type: "brand",
    popularity: 77,
    metadata: { category: "Grooming", price_range: "₹600-₹2000" },
  },
  {
    id: "g9",
    text: "Gillette",
    type: "brand",
    popularity: 88,
    metadata: { category: "Grooming", price_range: "₹500-₹2500" },
  },
  {
    id: "g10",
    text: "Philips",
    type: "brand",
    popularity: 84,
    metadata: { category: "Grooming", price_range: "₹800-₹3000" },
  },
  {
    id: "g11",
    text: "Braun",
    type: "brand",
    popularity: 75,
    metadata: { category: "Grooming", price_range: "₹1000-₹3000" },
  },
  {
    id: "g12",
    text: "Panasonic",
    type: "brand",
    popularity: 73,
    metadata: { category: "Grooming", price_range: "₹800-₹2800" },
  },
  {
    id: "g13",
    text: "Havells",
    type: "brand",
    popularity: 71,
    metadata: { category: "Grooming", price_range: "₹600-₹2200" },
  },
  {
    id: "g14",
    text: "Nova",
    type: "brand",
    popularity: 69,
    metadata: { category: "Grooming", price_range: "₹500-₹1800" },
  },
  {
    id: "g15",
    text: "Kemei",
    type: "brand",
    popularity: 67,
    metadata: { category: "Grooming", price_range: "₹500-₹1500" },
  },

  // Electronics Brands
  {
    id: "el1",
    text: "Samsung",
    type: "brand",
    popularity: 90,
    metadata: { category: "Electronics", price_range: "₹5000-₹50000" },
  },
  {
    id: "el2",
    text: "LG",
    type: "brand",
    popularity: 88,
    metadata: { category: "Electronics", price_range: "₹8000-₹60000" },
  },
  {
    id: "el3",
    text: "Whirlpool",
    type: "brand",
    popularity: 85,
    metadata: { category: "Electronics", price_range: "₹10000-₹40000" },
  },
  {
    id: "el4",
    text: "Bajaj",
    type: "brand",
    popularity: 82,
    metadata: { category: "Electronics", price_range: "₹1000-₹15000" },
  },
  {
    id: "el5",
    text: "Crompton",
    type: "brand",
    popularity: 78,
    metadata: { category: "Electronics", price_range: "₹2000-₹20000" },
  },
  {
    id: "el6",
    text: "Prestige",
    type: "brand",
    popularity: 80,
    metadata: { category: "Electronics", price_range: "₹1500-₹10000" },
  },

  // Accessories Brands
  {
    id: "ac1",
    text: "Fossil",
    type: "brand",
    popularity: 85,
    metadata: { category: "Accessories", price_range: "₹3000-₹15000" },
  },
  {
    id: "ac2",
    text: "Ray-Ban",
    type: "brand",
    popularity: 88,
    metadata: { category: "Accessories", price_range: "₹4000-₹20000" },
  },
  {
    id: "ac3",
    text: "Wildcraft",
    type: "brand",
    popularity: 82,
    metadata: { category: "Accessories", price_range: "₹800-₹5000" },
  },
  {
    id: "ac4",
    text: "Tommy Hilfiger",
    type: "brand",
    popularity: 86,
    metadata: { category: "Accessories", price_range: "₹1500-₹8000" },
  },
  {
    id: "ac5",
    text: "Fastrack",
    type: "brand",
    popularity: 80,
    metadata: { category: "Accessories", price_range: "₹800-₹3000" },
  },
  {
    id: "ac6",
    text: "Skybags",
    type: "brand",
    popularity: 75,
    metadata: { category: "Accessories", price_range: "₹600-₹2500" },
  },

  // Home Brands
  {
    id: "h1",
    text: "Philips",
    type: "brand",
    popularity: 87,
    metadata: { category: "Home", price_range: "₹200-₹5000" },
  },
  {
    id: "h2",
    text: "Cello",
    type: "brand",
    popularity: 78,
    metadata: { category: "Home", price_range: "₹500-₹8000" },
  },
  {
    id: "h3",
    text: "Amazon Basics",
    type: "brand",
    popularity: 85,
    metadata: { category: "Home", price_range: "₹300-₹3000" },
  },
  {
    id: "h4",
    text: "Milton",
    type: "brand",
    popularity: 83,
    metadata: { category: "Home", price_range: "₹400-₹2000" },
  },
  {
    id: "h5",
    text: "Solimo",
    type: "brand",
    popularity: 80,
    metadata: { category: "Home", price_range: "₹500-₹3000" },
  },
  {
    id: "h6",
    text: "Pigeon",
    type: "brand",
    popularity: 82,
    metadata: { category: "Home", price_range: "₹600-₹4000" },
  },

  // New Product Categories
  {
    id: "p17",
    text: "LED TV",
    type: "product",
    popularity: 88,
    metadata: { category: "Electronics", price_range: "₹8000-₹50000" },
  },
  {
    id: "p18",
    text: "Refrigerator",
    type: "product",
    popularity: 85,
    metadata: { category: "Electronics", price_range: "₹15000-₹60000" },
  },
  {
    id: "p19",
    text: "Washing Machine",
    type: "product",
    popularity: 82,
    metadata: { category: "Electronics", price_range: "₹10000-₹40000" },
  },
  {
    id: "p20",
    text: "Analog Watch",
    type: "product",
    popularity: 80,
    metadata: { category: "Accessories", price_range: "₹1000-₹15000" },
  },
  {
    id: "p21",
    text: "Sunglasses",
    type: "product",
    popularity: 85,
    metadata: { category: "Accessories", price_range: "₹800-₹20000" },
  },
  {
    id: "p22",
    text: "Backpack",
    type: "product",
    popularity: 83,
    metadata: { category: "Accessories", price_range: "₹600-₹5000" },
  },
  {
    id: "p23",
    text: "Wallet",
    type: "product",
    popularity: 78,
    metadata: { category: "Accessories", price_range: "₹500-₹8000" },
  },
  {
    id: "p24",
    text: "LED Bulb",
    type: "product",
    popularity: 75,
    metadata: { category: "Home", price_range: "₹200-₹1000" },
  },
  {
    id: "p25",
    text: "Bed Sheet",
    type: "product",
    popularity: 72,
    metadata: { category: "Home", price_range: "₹500-₹3000" },
  },
  {
    id: "p26",
    text: "Electric Kettle",
    type: "product",
    popularity: 80,
    metadata: { category: "Home", price_range: "₹600-₹4000" },
  },

  // Updated Categories
  { id: "c7", text: "Electronics", type: "category", popularity: 85 },
  { id: "c8", text: "Accessories", type: "category", popularity: 78 },
  { id: "c9", text: "Home & Living", type: "category", popularity: 75 },

  // Products in ₹500-₹3000 range
  {
    id: "p1",
    text: "Cotton T-Shirt",
    type: "product",
    popularity: 90,
    metadata: { category: "Fashion", price_range: "₹500-₹1500" },
  },
  {
    id: "p2",
    text: "Formal Shirt",
    type: "product",
    popularity: 88,
    metadata: { category: "Fashion", price_range: "₹800-₹2500" },
  },
  {
    id: "p3",
    text: "Casual Jeans",
    type: "product",
    popularity: 85,
    metadata: { category: "Fashion", price_range: "₹1000-₹3000" },
  },
  {
    id: "p4",
    text: "Polo T-Shirt",
    type: "product",
    popularity: 83,
    metadata: { category: "Fashion", price_range: "₹600-₹2000" },
  },
  {
    id: "p5",
    text: "Chinos",
    type: "product",
    popularity: 80,
    metadata: { category: "Fashion", price_range: "₹800-₹2500" },
  },
  {
    id: "p6",
    text: "Casual Sneakers",
    type: "product",
    popularity: 87,
    metadata: { category: "Footwear", price_range: "₹800-₹2500" },
  },
  {
    id: "p7",
    text: "Formal Shoes",
    type: "product",
    popularity: 82,
    metadata: { category: "Footwear", price_range: "₹1000-₹3000" },
  },
  {
    id: "p8",
    text: "Sports Shoes",
    type: "product",
    popularity: 85,
    metadata: { category: "Footwear", price_range: "₹1200-₹3000" },
  },
  {
    id: "p9",
    text: "Wireless Earbuds",
    type: "product",
    popularity: 92,
    metadata: { category: "Tech", price_range: "₹800-₹2500" },
  },
  {
    id: "p10",
    text: "Bluetooth Speaker",
    type: "product",
    popularity: 88,
    metadata: { category: "Tech", price_range: "₹1000-₹3000" },
  },
  {
    id: "p11",
    text: "Power Bank",
    type: "product",
    popularity: 85,
    metadata: { category: "Tech", price_range: "₹500-₹2000" },
  },
  {
    id: "p12",
    text: "Smart Watch",
    type: "product",
    popularity: 90,
    metadata: { category: "Tech", price_range: "₹1500-₹3000" },
  },
  {
    id: "p13",
    text: "Beard Trimmer",
    type: "product",
    popularity: 83,
    metadata: { category: "Grooming", price_range: "₹800-₹2500" },
  },
  {
    id: "p14",
    text: "Hair Trimmer",
    type: "product",
    popularity: 80,
    metadata: { category: "Grooming", price_range: "₹600-₹2000" },
  },
  {
    id: "p15",
    text: "Beard Oil",
    type: "product",
    popularity: 78,
    metadata: { category: "Grooming", price_range: "₹500-₹1200" },
  },
  {
    id: "p16",
    text: "Face Wash",
    type: "product",
    popularity: 75,
    metadata: { category: "Grooming", price_range: "₹500-₹800" },
  },

  // Categories
  { id: "c1", text: "Men's Fashion", type: "category", popularity: 90 },
  { id: "c2", text: "Footwear", type: "category", popularity: 85 },
  { id: "c3", text: "Tech & Gadgets", type: "category", popularity: 88 },
  { id: "c4", text: "Grooming", type: "category", popularity: 75 },
  { id: "c5", text: "Electronics", type: "category", popularity: 82 },
  { id: "c6", text: "Accessories", type: "category", popularity: 70 },

  // Features
  { id: "fe1", text: "Wireless", type: "feature", popularity: 85 },
  { id: "fe2", text: "Bluetooth", type: "feature", popularity: 80 },
  { id: "fe3", text: "Waterproof", type: "feature", popularity: 75 },
  { id: "fe4", text: "Fast Charging", type: "feature", popularity: 78 },
  { id: "fe5", text: "Noise Cancelling", type: "feature", popularity: 72 },
  { id: "fe6", text: "Slim Fit", type: "feature", popularity: 70 },
  { id: "fe7", text: "Premium Quality", type: "feature", popularity: 68 },
  { id: "fe8", text: "Rechargeable", type: "feature", popularity: 73 },
  { id: "fe9", text: "Cordless", type: "feature", popularity: 71 },
  { id: "fe10", text: "Anti-bacterial", type: "feature", popularity: 69 },

  // Colors
  { id: "co1", text: "Black", type: "color", popularity: 85 },
  { id: "co2", text: "White", type: "color", popularity: 80 },
  { id: "co3", text: "Blue", type: "color", popularity: 75 },
  { id: "co4", text: "Navy", type: "color", popularity: 70 },
  { id: "co5", text: "Grey", type: "color", popularity: 72 },
  { id: "co6", text: "Red", type: "color", popularity: 68 },
  { id: "co7", text: "Green", type: "color", popularity: 65 },

  // Sizes
  { id: "s1", text: "Small", type: "size", popularity: 70 },
  { id: "s2", text: "Medium", type: "size", popularity: 80 },
  { id: "s3", text: "Large", type: "size", popularity: 75 },
  { id: "s4", text: "XL", type: "size", popularity: 72 },
  { id: "s5", text: "XXL", type: "size", popularity: 68 },
]

export function useAutocomplete() {
  const getAutocompleteResults = useMemo(() => {
    return (query: string, maxResults = 8) => {
      if (!query || query.length < 1) return []

      const normalizedQuery = query.toLowerCase().trim()

      // Exact matches (highest priority)
      const exactMatches = autocompleteData.filter((item) => item.text.toLowerCase() === normalizedQuery)

      // Starts with matches
      const startsWithMatches = autocompleteData.filter(
        (item) =>
          item.text.toLowerCase().startsWith(normalizedQuery) && !exactMatches.some((exact) => exact.id === item.id),
      )

      // Contains matches
      const containsMatches = autocompleteData.filter(
        (item) =>
          item.text.toLowerCase().includes(normalizedQuery) &&
          !exactMatches.some((exact) => exact.id === item.id) &&
          !startsWithMatches.some((starts) => starts.id === item.id),
      )

      // Fuzzy matches (for typos)
      const fuzzyMatches = autocompleteData.filter((item) => {
        const itemText = item.text.toLowerCase()
        const isAlreadyMatched =
          exactMatches.some((exact) => exact.id === item.id) ||
          startsWithMatches.some((starts) => starts.id === item.id) ||
          containsMatches.some((contains) => contains.id === item.id)

        if (isAlreadyMatched) return false

        // Simple fuzzy matching - check if most characters are present
        const queryChars = normalizedQuery.split("")
        const matchedChars = queryChars.filter((char) => itemText.includes(char))
        return matchedChars.length >= Math.ceil(queryChars.length * 0.7)
      })

      // Combine and sort by relevance
      const allMatches = [
        ...exactMatches.map((item) => ({ ...item, relevance: 100 })),
        ...startsWithMatches.map((item) => ({ ...item, relevance: 90 })),
        ...containsMatches.map((item) => ({ ...item, relevance: 70 })),
        ...fuzzyMatches.map((item) => ({ ...item, relevance: 50 })),
      ]

      // Sort by relevance and popularity
      const sortedMatches = allMatches.sort((a, b) => {
        if (a.relevance !== b.relevance) {
          return b.relevance - a.relevance
        }
        return b.popularity - a.popularity
      })

      return sortedMatches.slice(0, maxResults)
    }
  }, [])

  const getContextualSuggestions = useMemo(() => {
    return (category?: string, maxResults = 5) => {
      let filtered = autocompleteData

      if (category) {
        filtered = autocompleteData.filter(
          (item) =>
            item.metadata?.category === category ||
            item.type === "category" ||
            (category === "Tech" &&
              item.type === "feature" &&
              ["Wireless", "Bluetooth", "Fast Charging", "Noise Cancelling"].includes(item.text)),
        )
      }

      return filtered.sort((a, b) => b.popularity - a.popularity).slice(0, maxResults)
    }
  }, [])

  const getTrendingSuggestions = useMemo(() => {
    return (maxResults = 6) => {
      return autocompleteData
        .filter((item) => item.popularity >= 75)
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, maxResults)
    }
  }, [])

  const getBrandsByCategory = useMemo(() => {
    return (category: string) => {
      return autocompleteData
        .filter((item) => item.type === "brand" && item.metadata?.category === category)
        .sort((a, b) => b.popularity - a.popularity)
    }
  }, [])

  const getBrandsByPriceRange = useMemo(() => {
    return (minPrice: number, maxPrice: number) => {
      return autocompleteData
        .filter((item) => {
          if (item.type !== "brand" || !item.metadata?.price_range) return false

          // Extract price range from metadata
          const priceRange = item.metadata.price_range
          const matches = priceRange.match(/₹(\d+)-₹(\d+)/)
          if (!matches) return false

          const itemMin = Number.parseInt(matches[1])
          const itemMax = Number.parseInt(matches[2])

          // Check if there's overlap with the requested range
          return itemMin <= maxPrice && itemMax >= minPrice
        })
        .sort((a, b) => b.popularity - a.popularity)
    }
  }, [])

  return {
    getAutocompleteResults,
    getContextualSuggestions,
    getTrendingSuggestions,
    getBrandsByCategory,
    getBrandsByPriceRange,
  }
}
