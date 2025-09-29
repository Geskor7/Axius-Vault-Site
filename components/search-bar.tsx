"use client"

import { Search } from "lucide-react"

/* ============================================
   SEARCH BAR COMPONENT
   Simple search input with clean styling
   ============================================ */

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = "Search OSINT resources..." }: SearchBarProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search Input Container */}
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-14 px-14 bg-[#010201] border border-border rounded-lg text-white text-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />

        {/* Search Icon */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
          <Search className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </div>
  )
}
