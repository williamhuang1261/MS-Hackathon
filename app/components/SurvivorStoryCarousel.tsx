'use client'

import { useEffect, useState } from 'react'

const stories = [
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

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

  const goToStory = (index: number) => {
    setIsVisible(false)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsVisible(true)
    }, 300)
  }

  return (
    <div className="bg-gradient-to-br from-primary-purple/10 to-dark-navy/10 border-2 border-primary-purple/30 rounded-lg p-8 md:p-10">
      <div className="flex items-center justify-center mb-4">
        <span className="text-3xl mr-3">💜</span>
        <h3 className="text-2xl font-bold text-primary-purple">Real Impact Stories</h3>
      </div>
      
      <div 
        className={`transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="text-lg md:text-xl text-gray-800 leading-relaxed text-center mb-2 italic">
          "{stories[currentIndex].text}"
        </p>
        <p className="text-sm text-gray-600 text-center font-semibold">
          — {stories[currentIndex].name} (name changed for privacy)
        </p>
      </div>

      {/* Carousel Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {stories.map((_, index) => (
          <button
            key={index}
            onClick={() => goToStory(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary-purple w-8' 
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
            aria-label={`Go to story ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

