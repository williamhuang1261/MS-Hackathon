'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function AnimatedHouse() {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
  }, [])

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full max-w-4xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dark sky background */}
        <motion.rect
          x="0"
          y="0"
          width="800"
          height="600"
          fill="#1a1f3a"
          animate={{
            fill: isAnimating ? ['#1a1f3a', '#2d3561', '#3d4578'] : '#1a1f3a'
          }}
          transition={{ duration: 2, delay: 0.5 }}
        />

        {/* Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.circle
            key={i}
            cx={Math.random() * 800}
            cy={Math.random() * 300}
            r="2"
            fill="white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1] }}
            transition={{
              duration: 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        ))}

        {/* Ground */}
        <rect x="0" y="450" width="800" height="150" fill="#2d5016" />
        
        {/* Sidewalk */}
        <rect x="0" y="430" width="800" height="20" fill="#6b7280" />

        {/* House base */}
        <rect x="300" y="250" width="200" height="180" fill="#8b7355" stroke="#654321" strokeWidth="2" />
        
        {/* Roof */}
        <polygon
          points="280,250 520,250 400,170"
          fill="#6b4423"
          stroke="#4a2f1a"
          strokeWidth="2"
        />
        
        {/* Chimney */}
        <rect x="360" y="180" width="25" height="50" fill="#8b4513" stroke="#654321" strokeWidth="1" />
        
        {/* Smoke from chimney */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isAnimating ? { opacity: [0, 0.6, 0] } : {}}
          transition={{
            duration: 3,
            delay: 2.5,
            repeat: Infinity
          }}
        >
          <ellipse cx="372" cy="170" rx="8" ry="12" fill="#d1d5db" opacity="0.6" />
          <ellipse cx="375" cy="160" rx="10" ry="15" fill="#d1d5db" opacity="0.4" />
          <ellipse cx="378" cy="145" rx="12" ry="18" fill="#d1d5db" opacity="0.2" />
        </motion.g>

        {/* Door */}
        <rect x="375" y="340" width="50" height="90" rx="5" fill="#5c4033" stroke="#3d2817" strokeWidth="2" />
        <circle cx="415" cy="385" r="3" fill="#fbbf24" />

        {/* Windows - Left */}
        <g>
          <rect x="320" y="280" width="50" height="50" fill="#2d3748" stroke="#1a202c" strokeWidth="2" />
          <line x1="345" y1="280" x2="345" y2="330" stroke="#1a202c" strokeWidth="2" />
          <line x1="320" y1="305" x2="370" y2="305" stroke="#1a202c" strokeWidth="2" />
          
          {/* Window light - Left */}
          <motion.rect
            x="320"
            y="280"
            width="50"
            height="50"
            fill="#fbbf24"
            opacity="0"
            animate={isAnimating ? {
              opacity: [0, 0, 0.8, 0.9]
            } : {}}
            transition={{ duration: 1.5, delay: 1 }}
          />
          {/* Glow effect */}
          <motion.rect
            x="315"
            y="275"
            width="60"
            height="60"
            fill="#fbbf24"
            opacity="0"
            filter="blur(10px)"
            animate={isAnimating ? {
              opacity: [0, 0, 0.3, 0.4]
            } : {}}
            transition={{ duration: 1.5, delay: 1 }}
          />
        </g>

        {/* Windows - Right */}
        <g>
          <rect x="430" y="280" width="50" height="50" fill="#2d3748" stroke="#1a202c" strokeWidth="2" />
          <line x1="455" y1="280" x2="455" y2="330" stroke="#1a202c" strokeWidth="2" />
          <line x1="430" y1="305" x2="480" y2="305" stroke="#1a202c" strokeWidth="2" />
          
          {/* Window light - Right */}
          <motion.rect
            x="430"
            y="280"
            width="50"
            height="50"
            fill="#fbbf24"
            opacity="0"
            animate={isAnimating ? {
              opacity: [0, 0, 0.8, 0.9]
            } : {}}
            transition={{ duration: 1.5, delay: 1.2 }}
          />
          {/* Glow effect */}
          <motion.rect
            x="425"
            y="275"
            width="60"
            height="60"
            fill="#fbbf24"
            opacity="0"
            filter="blur(10px)"
            animate={isAnimating ? {
              opacity: [0, 0, 0.3, 0.4]
            } : {}}
            transition={{ duration: 1.5, delay: 1.2 }}
          />
        </g>

        {/* Upstairs window */}
        <g>
          <rect x="375" y="200" width="50" height="40" fill="#2d3748" stroke="#1a202c" strokeWidth="2" />
          <line x1="400" y1="200" x2="400" y2="240" stroke="#1a202c" strokeWidth="2" />
          <line x1="375" y1="220" x2="425" y2="220" stroke="#1a202c" strokeWidth="2" />
          
          {/* Window light - Upstairs */}
          <motion.rect
            x="375"
            y="200"
            width="50"
            height="40"
            fill="#fbbf24"
            opacity="0"
            animate={isAnimating ? {
              opacity: [0, 0, 0.8, 0.9]
            } : {}}
            transition={{ duration: 1.5, delay: 1.4 }}
          />
          {/* Glow effect */}
          <motion.rect
            x="370"
            y="195"
            width="60"
            height="50"
            fill="#fbbf24"
            opacity="0"
            filter="blur(10px)"
            animate={isAnimating ? {
              opacity: [0, 0, 0.3, 0.4]
            } : {}}
            transition={{ duration: 1.5, delay: 1.4 }}
          />
        </g>

        {/* Streetlight pole */}
        <rect x="600" y="250" width="8" height="180" fill="#4b5563" stroke="#374151" strokeWidth="2" />
        
        {/* Streetlight top */}
        <rect x="580" y="240" width="48" height="20" rx="5" fill="#4b5563" stroke="#374151" strokeWidth="2" />
        
        {/* Streetlight bulb */}
        <motion.ellipse
          cx="604"
          cy="250"
          rx="15"
          ry="18"
          fill="#fbbf24"
          opacity="0"
          animate={isAnimating ? {
            opacity: [0, 0, 0.9, 1]
          } : {}}
          transition={{ duration: 1, delay: 1.6 }}
        />
        
        {/* Streetlight glow */}
        <motion.ellipse
          cx="604"
          cy="250"
          rx="40"
          ry="45"
          fill="#fbbf24"
          opacity="0"
          filter="blur(20px)"
          animate={isAnimating ? {
            opacity: [0, 0, 0.4, 0.5]
          } : {}}
          transition={{ duration: 1, delay: 1.6 }}
        />

        {/* Ground light from streetlight */}
        <motion.ellipse
          cx="604"
          cy="430"
          rx="80"
          ry="20"
          fill="#fef3c7"
          opacity="0"
          animate={isAnimating ? {
            opacity: [0, 0, 0.3, 0.4]
          } : {}}
          transition={{ duration: 1, delay: 1.8 }}
        />

        {/* Wooden Fence - Rendered last to be in front */}
        {[...Array(12)].map((_, i) => (
          <g key={`fence-${i}`}>
            {/* Fence post */}
            <rect
              x={50 + i * 60}
              y="390"
              width="8"
              height="60"
              fill="#8b4513"
              stroke="#654321"
              strokeWidth="1"
            />
            {/* Fence board */}
            <rect
              x={46 + i * 60}
              y="395"
              width="16"
              height="6"
              fill="#a0522d"
              stroke="#654321"
              strokeWidth="1"
            />
            <rect
              x={46 + i * 60}
              y="420"
              width="16"
              height="6"
              fill="#a0522d"
              stroke="#654321"
              strokeWidth="1"
            />
            
            {/* Flowers growing from ground */}
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={isAnimating ? {
                scale: 1,
                opacity: 1
              } : {}}
              transition={{
                duration: 1,
                delay: 2 + (i * 0.1),
                type: 'spring',
                stiffness: 100
              }}
            >
              {/* Flower stem */}
              <line
                x1={54 + i * 60}
                y1="450"
                x2={54 + i * 60}
                y2="420"
                stroke="#4ade80"
                strokeWidth="3"
              />
              {/* Flower petals - bigger */}
              <circle cx={54 + i * 60} cy="418" r="7" fill="#ec4899" />
              <circle cx={47 + i * 60} cy="418" r="7" fill="#f472b6" />
              <circle cx={61 + i * 60} cy="418" r="7" fill="#f472b6" />
              <circle cx={54 + i * 60} cy="411" r="7" fill="#f472b6" />
              <circle cx={54 + i * 60} cy="425" r="7" fill="#f472b6" />
              {/* Flower center */}
              <circle cx={54 + i * 60} cy="418" r="5" fill="#fbbf24" />
            </motion.g>
          </g>
        ))}
      </svg>
    </div>
  )
}
