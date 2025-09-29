"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ResourceCard } from "@/components/resource-card"
import { osintResources, categories } from "@/lib/osint-data"
import { Database, Shield, Globe, MessageSquare, Users, MapPin, SearchIcon, Bitcoin, Network } from "lucide-react"

/* ============================================
   CATEGORIES PAGE
   Browse resources organized by category
   ============================================ */

// Category icons mapping
const categoryIcons: Record<string, any> = {
  "OSINT Search Engines": SearchIcon,
  "Breach Sites": Database,
  "Darkweb Research": Globe,
  "Hacking Forums": MessageSquare,
  "Social Media OSINT": Users,
  "Domain & Network Intel": Network,
  "Geolocation Tools": MapPin,
  "People Search": Users,
  "Crypto Tracking": Bitcoin,
}

export default function CategoriesPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  // Get resource count per category
  const getCategoryCount = (category: string) => {
    return osintResources.filter((r) => r.category === category).length
  }

  // Get resources for a specific category
  const getCategoryResources = (category: string) => {
    return osintResources.filter((r) => r.category === category)
  }

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  // Filter out 'All' from categories
  const displayCategories = categories.filter((c) => c !== "All")

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-12 flex-1">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">Browse by Category</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore OSINT resources organized by type. Click on any category to view all resources within that
            classification.
          </p>
        </div>

        {/* Category Grid */}
        <div className="space-y-6">
          {displayCategories.map((category) => {
            const Icon = categoryIcons[category] || Shield
            const isExpanded = expandedCategory === category
            const resourceCount = getCategoryCount(category)
            const categoryResources = getCategoryResources(category)

            return (
              <div key={category} className="border border-border rounded-lg overflow-hidden">
                {/* Category Header - Clickable */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-6 bg-card hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <h2 className="text-2xl font-bold">{category}</h2>
                      <p className="text-muted-foreground text-sm">
                        {resourceCount} {resourceCount === 1 ? "resource" : "resources"}
                      </p>
                    </div>
                  </div>

                  {/* Expand/Collapse Indicator */}
                  <div className="text-muted-foreground">
                    {isExpanded ? (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </div>
                </button>

                {/* Category Resources - Expandable */}
                {isExpanded && (
                  <div className="p-6 bg-background border-t border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryResources.map((resource) => (
                        <ResourceCard key={resource.id} {...resource} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{osintResources.length}</div>
            <div className="text-muted-foreground text-sm">Total Resources</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{displayCategories.length}</div>
            <div className="text-muted-foreground text-sm">Categories</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{getCategoryCount("Breach Sites")}</div>
            <div className="text-muted-foreground text-sm">Breach DBs</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{getCategoryCount("Darkweb Research")}</div>
            <div className="text-muted-foreground text-sm">Darkweb Tools</div>
          </div>
        </div>
      </main>
    </div>
  )
}
