'use client'

import { useEffect, useState } from 'react'
import { DONOR_LEVELS } from '@/lib/constants'
import { getRandomAmount, calculateImpact } from '@/lib/utils'
import type { NotificationDonation } from '@/lib/types'

const generateDonation = (): NotificationDonation => {
  const level = DONOR_LEVELS[Math.floor(Math.random() * DONOR_LEVELS.length)]
  const amount = getRandomAmount(level.minAmount, level.maxAmount)
  const impact = calculateImpact(amount)
  
  return {
    emoji: level.emoji,
    level: level.name,
    amount,
    impact,
  }
}

export default function NotificationBanner() {
  const [currentDonation, setCurrentDonation] = useState<NotificationDonation | null>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Initialize on client for consistent hydration
    setCurrentDonation(generateDonation())

    const interval = setInterval(() => {
      setIsVisible(false)
      
      setTimeout(() => {
        setCurrentDonation(generateDonation())
        setIsVisible(true)
      }, 300)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-primary to-secondary py-2.5 text-primary-foreground shadow-md">
      <div 
        className={`mx-auto flex max-w-5xl items-center justify-center px-3 text-center text-sm transition-opacity duration-300 md:text-base ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {currentDonation ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xl">{currentDonation.emoji}</span>
            <span className="font-semibold">{currentDonation.level}</span>
            <span className="hidden sm:inline">just donated</span>
            <span className="sm:hidden">donated</span>
            <span className="rounded-full bg-primary-foreground/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-primary-foreground">
              ${currentDonation.amount}
            </span>
            <span className="hidden md:inline">and has {currentDonation.impact}</span>
            <span className="md:hidden">• {currentDonation.impact.replace('provided ', '').replace('sheltered ', '')}</span>
            <span className="animate-pulse text-lg">✨</span>
          </div>
        ) : (
          <div className="text-sm text-primary-foreground/70">Loading recent donations…</div>
        )}
      </div>
    </div>
  )
}
