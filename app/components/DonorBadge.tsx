'use client'

import { DONOR_LEVELS } from '@/lib/constants'
import type { DonorBadgeProps } from '@/lib/types'

const badgeConfig: Record<string, { color: string, bgColor: string, borderColor: string }> = {
  'Shelter Guardian': { 
    color: 'text-deep-navy', 
    bgColor: 'bg-gradient-to-br from-cream to-near-white',
    borderColor: 'border-light-purple-gray',
  },
  'Safety Ally': { 
    color: 'text-medium-purple', 
    bgColor: 'bg-gradient-to-br from-near-white to-light-purple-gray',
    borderColor: 'border-medium-purple',
  },
  'Shelter Champion': { 
    color: 'text-deep-navy', 
    bgColor: 'bg-gradient-to-br from-cream to-light-purple-gray',
    borderColor: 'border-medium-purple',
  },
  'Family Protector': { 
    color: 'text-medium-purple', 
    bgColor: 'bg-gradient-to-br from-deep-navy/10 to-medium-purple/10',
    borderColor: 'border-deep-navy',
  },
  'Athena Protector': { 
    color: 'text-deep-navy', 
    bgColor: 'bg-gradient-to-br from-deep-navy/20 to-medium-purple/30',
    borderColor: 'border-deep-navy',
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
          <p className="text-sm text-soft-charcoal font-semibold mb-3">
            Level {levelData.level} Donor
          </p>
          <div className={`${config.borderColor} border-t-2 pt-3 mt-3`}>
            <p className="text-xs text-soft-charcoal uppercase tracking-wider mb-1">Total Impact</p>
            <p className={`text-3xl font-bold ${config.color}`}>${amount}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
