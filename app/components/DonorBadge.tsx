'use client'

import { DONOR_LEVELS } from '@/lib/constants'
import type { DonorBadgeProps } from '@/lib/types'

const badgeConfig: Record<string, { color: string, bgColor: string, borderColor: string }> = {
  'Shelter Guardian': { 
    color: 'text-gray-700', 
    bgColor: 'bg-gradient-to-br from-gray-100 to-gray-200',
    borderColor: 'border-gray-400',
  },
  'Safety Ally': { 
    color: 'text-blue-700', 
    bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200',
    borderColor: 'border-blue-500',
  },
  'Shelter Champion': { 
    color: 'text-yellow-700', 
    bgColor: 'bg-gradient-to-br from-yellow-100 to-yellow-200',
    borderColor: 'border-yellow-500',
  },
  'Family Protector': { 
    color: 'text-purple-700', 
    bgColor: 'bg-gradient-to-br from-purple-100 to-purple-200',
    borderColor: 'border-purple-500',
  },
  'Athena Protector': { 
    color: 'text-red-700', 
    bgColor: 'bg-gradient-to-br from-amber-100 to-amber-200',
    borderColor: 'border-amber-500',
  },
}

export default function DonorBadge({ level, amount }: DonorBadgeProps) {
  const config = badgeConfig[level] || badgeConfig['Shelter Guardian']
  const levelData = DONOR_LEVELS.find(l => l.name === level) || DONOR_LEVELS[0]

  return (
    <div className="inline-block animate-scaleIn">
      <div className={`${config.bgColor} ${config.borderColor} border-3 rounded-xl p-6 shadow-2xl min-w-[280px] text-center relative overflow-hidden badge-glow`}>
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shine-effect"></div>
        
        {/* Badge Content */}
        <div className="relative z-10">
          <div className="text-6xl mb-3 animate-bounce-subtle">{levelData.emoji}</div>
          <h3 className={`text-2xl font-bold ${config.color} mb-1 uppercase tracking-wide`}>
            {level}
          </h3>
          <p className="text-sm text-gray-600 font-semibold mb-3">
            Level {levelData.level} Donor
          </p>
          <div className={`${config.borderColor} border-t-2 pt-3 mt-3`}>
            <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Total Impact</p>
            <p className={`text-3xl font-bold ${config.color}`}>${amount}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
