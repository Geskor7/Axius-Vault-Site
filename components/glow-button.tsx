"use client"

import type { ReactNode } from "react"

/* ============================================
   GLOW BUTTON COMPONENT
   Reusable button with animated glow effects
   ============================================ */

interface GlowButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: "primary" | "secondary"
  className?: string
}

export function GlowButton({ children, onClick, href, variant = "primary", className = "" }: GlowButtonProps) {
  const baseClasses = `
    relative px-6 py-3 rounded-lg font-semibold text-white
    transition-all duration-300 overflow-hidden
    hover:transform hover:-translate-y-1
    ${className}
  `

  const variantClasses =
    variant === "primary"
      ? "bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50"
      : "bg-gradient-to-r from-secondary to-primary hover:shadow-lg hover:shadow-secondary/50"

  const content = (
    <>
      {/* Glow effect overlay */}
      <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 hover:opacity-20 transition-opacity duration-300 blur-xl"></span>
      <span className="relative z-10">{children}</span>
    </>
  )

  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${variantClasses} inline-block`}>
        {content}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
      {content}
    </button>
  )
}
