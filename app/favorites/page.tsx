"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { ResourceCard } from "@/components/resource-card"
import { osintResources } from "@/lib/osint-data"
import { Star, Heart } from "lucide-react"

/* ============================================
   FAVORITES PAGE
   Display user's saved favorite resources
   ============================================ */

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load favorites from localStorage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("osint-favorites") || "[]")
    setFavoriteIds(favorites)
    setIsLoaded(true)

    // Listen for storage changes (when favorites are updated)
    const handleStorageChange = () => {
      const updatedFavorites = JSON.parse(localStorage.getItem("osint-favorites") || "[]")
      setFavoriteIds(updatedFavorites)
    }

    window.addEventListener("storage", handleStorageChange)

    // Poll for changes every second (for same-tab updates)
    const interval = setInterval(() => {
      const updatedFavorites = JSON.parse(localStorage.getItem("osint-favorites") || "[]")
      setFavoriteIds(updatedFavorites)
    }, 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  // Get favorite resources
  const favoriteResources = osintResources.filter((resource) => favoriteIds.includes(resource.id))

  // Clear all favorites
  const clearAllFavorites = () => {
    if (confirm("Are you sure you want to remove all favorites?")) {
      localStorage.setItem("osint-favorites", JSON.stringify([]))
      setFavoriteIds([])
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-12 flex-1">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="w-12 h-12 text-white/80 fill-white/80" />
            <h1 className="text-5xl font-bold text-white">Your Favorites</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Quick access to your saved OSINT resources. Click the star icon on any resource to add or remove it from
            your favorites.
          </p>
        </div>

        {/* Loading State */}
        {!isLoaded && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="text-muted-foreground mt-4">Loading favorites...</p>
          </div>
        )}

        {/* Empty State */}
        {isLoaded && favoriteResources.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-6">
              <Heart className="w-24 h-24 mx-auto text-muted-foreground/30" />
            </div>
            <h2 className="text-2xl font-bold mb-4">No favorites yet</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start building your collection by clicking the star icon on any resource from the home page or categories.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Browse Resources
            </a>
          </div>
        )}

        {/* Favorites Grid */}
        {isLoaded && favoriteResources.length > 0 && (
          <>
            {/* Action Bar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                <span className="text-foreground font-semibold">{favoriteResources.length}</span>{" "}
                {favoriteResources.length === 1 ? "favorite" : "favorites"}
              </p>
              <button
                onClick={clearAllFavorites}
                className="px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors border border-destructive/20"
              >
                Clear All
              </button>
            </div>

            {/* Resource Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteResources.map((resource) => (
                <ResourceCard key={resource.id} {...resource} />
              ))}
            </div>
          </>
        )}

        {/* Tips Section */}
        {isLoaded && favoriteResources.length > 0 && (
          <div className="mt-12 bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Pro Tips
            </h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Your favorites are saved locally in your browser and will persist across sessions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Click the star icon on any resource card to quickly add or remove favorites.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Organize your most-used OSINT tools here for quick access during investigations.</span>
              </li>
            </ul>
          </div>
        )}
      </main>
    </div>
  )
}
