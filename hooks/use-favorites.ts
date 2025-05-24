"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase-client"
import { useAuth } from "./use-auth"

interface Favorite {
  id: string
  user_id: string
  deal_id: string
  deal_data: any
  created_at: string
}

export function useFavorites() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      fetchFavorites()
    } else {
      setFavorites([])
    }
  }, [user])

  const fetchFavorites = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setFavorites(data || [])
    } catch (error) {
      console.error("Error fetching favorites:", error)
    } finally {
      setLoading(false)
    }
  }

  const addToFavorites = async (dealId: string, dealData: any) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from("favorites")
        .insert({
          user_id: user.id,
          deal_id: dealId,
          deal_data: dealData,
        })
        .select()
        .single()

      if (error) throw error
      setFavorites((prev) => [data, ...prev])
    } catch (error) {
      console.error("Error adding to favorites:", error)
    }
  }

  const removeFromFavorites = async (dealId: string) => {
    if (!user) return

    try {
      const { error } = await supabase.from("favorites").delete().eq("user_id", user.id).eq("deal_id", dealId)

      if (error) throw error
      setFavorites((prev) => prev.filter((fav) => fav.deal_id !== dealId))
    } catch (error) {
      console.error("Error removing from favorites:", error)
    }
  }

  const isFavorite = (dealId: string) => {
    return favorites.some((fav) => fav.deal_id === dealId)
  }

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    refetch: fetchFavorites,
  }
}
