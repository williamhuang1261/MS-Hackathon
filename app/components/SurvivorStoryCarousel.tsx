'use client'

import { useEffect, useState } from 'react'
import type { SurvivorStory } from '@/lib/types'

const stories: SurvivorStory[] = [
  {
    text: "Last week, Amina arrived at our shelter shaking and barefoot after escaping a dangerous situation. Your donation gave her a warm bed and a locked door that no one could break through.",
    name: "Amina's Story"
  },
  {
    text: "Sarah showed up at midnight with her two children, nowhere else to turn. Because of supporters like you, we had a room ready — safe, warm, and waiting.",
    name: "Sarah's Story"
  },
  {
    text: "Fatima called our hotline from a parking lot at 3 AM, terrified to go home. Your generosity made it possible for our team to bring her to safety within 20 minutes.",
    name: "Fatima's Story"
  }
]

export default function SurvivorStoryCarousel() {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isVisible, setIsVisible] = useState<boolean>(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % stories.length)
        setIsVisible(true)
      }, 500)
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  const goToStory = (index: number): void => {
    setIsVisible(false)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsVisible(true)
    }, 300)
  }

  return (
    <div className="rounded-2xl border border-border bg-card/80 p-8">
      <div className="mb-4 flex flex-col items-center gap-2 text-center">
        <span className="text-3xl">💜</span>
        <h3 className="text-2xl font-serif">Real Impact Stories</h3>
      </div>

      <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-lg leading-relaxed text-muted-foreground">
          “{stories[currentIndex].text}”
        </p>
        <p className="mt-3 text-sm font-semibold text-muted-foreground/80">
          — {stories[currentIndex].name} (name changed for privacy)
        </p>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {stories.map((_, index) => (
          <button
            key={index}
            onClick={() => goToStory(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-10 bg-primary' : 'w-3 bg-muted'
            }`}
            aria-label={`Go to story ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
