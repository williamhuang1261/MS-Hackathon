'use client'

import { useEffect, useState } from 'react'

interface DonorLevel {
  emoji: string
  name: string
  minAmount: number
  maxAmount: number
}

const donorLevels: DonorLevel[] = [
  { emoji: '🛡️', name: 'Shelter Guardian', minAmount: 20, maxAmount: 99 },
  { emoji: '🤝', name: 'Safety Ally', minAmount: 100, maxAmount: 499 },
  { emoji: '🏆', name: 'Shelter Champion', minAmount: 500, maxAmount: 1999 },
  { emoji: '👨‍👩‍👧', name: 'Family Protector', minAmount: 2000, maxAmount: 4999 },
  { emoji: '⭐', name: 'Athena Protector', minAmount: 5000, maxAmount: 10000 },
]

const getRandomAmount = (min: number, max: number): number => {
  // Generate amounts that look realistic (round to 5, 10, 25, 50, 100)
  const amount = Math.floor(Math.random() * (max - min + 1)) + min
  if (amount < 100) {
    return Math.round(amount / 5) * 5
  } else if (amount < 500) {
    return Math.round(amount / 25) * 25
  } else if (amount < 2000) {
    return Math.round(amount / 50) * 50
  } else {
    return Math.round(amount / 100) * 100
  }
}

const calculateImpact = (amount: number): string => {
  // Based on $35 = 1 safe night
  const nights = Math.floor(amount / 35)
  
  if (nights === 0) {
    return 'provided emergency supplies'
  } else if (nights === 1) {
    return 'sheltered 1 woman for the night'
  } else if (nights === 2) {
    return 'sheltered 2 women for the night'
  } else if (nights <= 4) {
    return `provided ${nights} safe nights of shelter`
  } else if (nights <= 7) {
    return `sheltered a mother and child for ${Math.floor(nights / 2)} nights`
  } else if (nights <= 14) {
    return `provided a full week of safety for a family`
  } else if (nights <= 30) {
    return `provided 2 weeks of shelter and support`
  } else {
    const weeks = Math.floor(nights / 7)
    return `provided ${weeks} weeks of safety for a family`
  }
}

const generateDonation = () => {
  const level = donorLevels[Math.floor(Math.random() * donorLevels.length)]
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
  const [currentDonation, setCurrentDonation] = useState(generateDonation())
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
    <div className="sticky top-0 z-50 bg-gradient-to-r from-primary-purple to-dark-navy text-white py-3 px-4 overflow-hidden shadow-lg">
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
          <span className="font-bold text-yellow-300">${currentDonation.amount}</span>
          <span className="hidden md:inline">and has {currentDonation.impact}</span>
          <span className="md:hidden">• {currentDonation.impact.replace('provided ', '').replace('sheltered ', '')}</span>
          <span className="text-yellow-300 animate-pulse">✨</span>
        </div>
      </div>
    </div>
  )
}

