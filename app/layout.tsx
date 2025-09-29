import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { BackgroundAudio } from "@/components/background-audio"

export const metadata = {
  title: "Axius Vault - Intelligence Resources Hub",
  description:
    "Comprehensive directory of OSINT tools, breach databases, darkweb resources, and forums for security researchers.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        {children}
        <BackgroundAudio />
      </body>
    </html>
  )
}
