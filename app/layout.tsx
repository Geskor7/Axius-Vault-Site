import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { BackgroundAudio } from "@/components/background-audio"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "Axius Vault - Intelligence Resources Hub",
  description:
    "Comprehensive directory of OSINT tools, breach databases, darkweb resources, and forums for security researchers.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <BackgroundAudio />
      </body>
    </html>
  )
}
