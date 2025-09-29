"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { SearchBar } from "@/components/search-bar"
import { ResourceCard } from "@/components/resource-card"
import { osintResources, categories } from "@/lib/osint-data"

/* ============================================
   HOME PAGE - SEARCH & BROWSE RESOURCES
   Main page with search and filtering
   ============================================ */

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Filter resources based on search and category
  const filteredResources = useMemo(() => {
    return osintResources.filter((resource) => {
      const matchesSearch =
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-12 flex-1">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">Axius Vault</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive directory of Open Source Intelligence tools, breach databases, darkweb resources, and security
            forums for researchers and investigators.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-muted-foreground">
            Showing <span className="text-foreground font-semibold">{filteredResources.length}</span> resources
          </p>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} {...resource} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No resources found matching your search criteria.</p>
          </div>
        )}
      </main>
    </div>
  )
}
