"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"

// ============================================
// BACKGROUND AUDIO PLAYER COMPONENT
// Plays looping background music with mute toggle
// ============================================

export function BackgroundAudio() {
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const startAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch(() => {
            // Silently fail, will try again on user interaction
          })
      }
    }

    // Try autoplay immediately
    startAudio()

    // If autoplay fails, start on first user interaction
    const handleInteraction = () => {
      startAudio()
      // Remove listeners after first successful play
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("keydown", handleInteraction)
    }

    document.addEventListener("click", handleInteraction)
    document.addEventListener("keydown", handleInteraction)

    return () => {
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("keydown", handleInteraction)
    }
  }, [isPlaying])

  // Toggle mute/unmute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <>
      {/* Hidden audio element with loop enabled */}
      <audio ref={audioRef} src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dark%20%282%29-6u2cOEadcUQePnXbsYO1oxJ6XRWvc5.mp3" loop muted={isMuted} />

      {/* Floating mute/unmute button */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl"
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      >
        {isMuted ? <VolumeX className="w-5 h-5 text-muted-foreground" /> : <Volume2 className="w-5 h-5 text-primary" />}
      </button>
    </>
  )
}
