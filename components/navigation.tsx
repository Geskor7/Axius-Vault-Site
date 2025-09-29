"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Star, Grid3x3 } from "lucide-react"
import Image from "next/image"

/* ============================================
   NAVIGATION COMPONENT
   Main navigation bar with links to all pages
   ============================================ */

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Search", icon: Search },
    { href: "/categories", label: "Categories", icon: Grid3x3 },
    { href: "/favorites", label: "Favorites", icon: Star },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 text-xl font-bold group">
            <Image
              src="/images/axius-logo.png"
              alt="Axius Vault Logo"
              width={40}
              height={40}
              className="group-hover:opacity-80 transition-opacity"
            />
            <span>
              <span className="text-primary">Axius</span>
              <span className="text-muted-foreground"> Vault</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all glow-hover ${
                    isActive
                      ? "bg-primary text-white shadow-md glow-subtle"
                      : "text-muted-foreground hover:text-white hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
