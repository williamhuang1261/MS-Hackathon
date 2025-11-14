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
  const [currentDonation, setCurrentDonation] = useState<NotificationDonation>(generateDonation())
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false)
      
      // After fade out, change content and fade back in
      setTimeout(() => {
        setCurrentDonation(generateDonation())
        setIsVisible(true)
      }, 300)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-athena-violet to-lavender-mist text-white py-3 px-4 overflow-hidden shadow-lg">
      <div 
        className={`max-w-7xl mx-auto text-center transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center justify-center gap-2 text-sm md:text-base">
          <span className="text-xl">{currentDonation.emoji}</span>
          <span className="font-semibold">{currentDonation.level}</span>
          <span className="hidden sm:inline">just donated</span>
          <span className="sm:hidden">donated</span>
          <span className="font-bold text-hope-gold">${currentDonation.amount}</span>
          <span className="hidden md:inline">and has {currentDonation.impact}</span>
          <span className="md:hidden">• {currentDonation.impact.replace('provided ', '').replace('sheltered ', '')}</span>
          <span className="text-hope-gold animate-pulse">✨</span>
        </div>
      </div>
    </div>
  )
}
