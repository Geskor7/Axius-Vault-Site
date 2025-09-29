"use client"

import { ExternalLink, Star } from "lucide-react"
import { useState, useEffect } from "react"

/* ============================================
   RESOURCE CARD COMPONENT
   Individual card for each OSINT resource
   ============================================ */

interface ResourceCardProps {
  id: string
  name: string
  url: string
  description: string
  category: string
  tags: string[]
}

export function ResourceCard({ id, name, url, description, category, tags }: ResourceCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  // Load favorites from localStorage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("osint-favorites") || "[]")
    setIsFavorite(favorites.includes(id))
  }, [id])

  // Toggle favorite status
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("osint-favorites") || "[]")

    if (favorites.includes(id)) {
      const updated = favorites.filter((fav: string) => fav !== id)
      localStorage.setItem("osint-favorites", JSON.stringify(updated))
      setIsFavorite(false)
    } else {
      favorites.push(id)
      localStorage.setItem("osint-favorites", JSON.stringify(favorites))
      setIsFavorite(true)
    }
  }

  return (
    <div className="group relative bg-card border border-border rounded-lg hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-6">
        {/* Category Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium">
            {category}
          </span>
          <button
            onClick={toggleFavorite}
            className="p-1.5 rounded-full hover:bg-primary/10 transition-colors"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Star className={`w-4 h-4 ${isFavorite ? "fill-primary text-primary" : "text-muted-foreground"}`} />
          </button>
        </div>

        {/* Resource Name */}
        <h3 className="text-xl font-bold mb-2 pr-20 group-hover:text-primary transition-colors">{name}</h3>

        {/* Description */}
        <p className="text-white/90 text-sm mb-4 leading-relaxed">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/90">
              {tag}
            </span>
          ))}
        </div>

        {/* Visit Link */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-secondary transition-colors group/link"
        >
          <span>Visit Resource</span>
          <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  )
}
