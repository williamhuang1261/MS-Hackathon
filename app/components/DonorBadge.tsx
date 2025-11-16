'use client'

import { Badge } from '@/app/components/ui/badge'
import { Card } from '@/app/components/ui/card'
import { DONOR_LEVELS } from '@/lib/constants'
import type { DonorBadgeProps } from '@/lib/types'

const badgeColors: Record<string, { accent: string; glow: string }> = {
  'Shelter Guardian': { accent: 'text-primary', glow: 'from-primary/15 via-primary/5 to-transparent' },
  'Safety Ally': { accent: 'text-secondary', glow: 'from-secondary/20 via-secondary/10 to-transparent' },
  'Shelter Champion': { accent: 'text-chart-1', glow: 'from-chart-1/20 via-chart-1/10 to-transparent' },
  'Family Protector': { accent: 'text-chart-3', glow: 'from-chart-3/20 via-chart-3/10 to-transparent' },
  'Athena Protector': { accent: 'text-chart-5', glow: 'from-chart-5/20 via-chart-5/10 to-transparent' },
}

export default function DonorBadge({ level, amount }: DonorBadgeProps) {
  const levelData = DONOR_LEVELS.find((item) => item.name === level) || DONOR_LEVELS[0]
  const palette = badgeColors[level] || badgeColors['Shelter Guardian']

  return (
    <Card className="relative min-w-[280px] overflow-hidden border border-border bg-card/80 p-6 text-center shadow-xl">
      <div className={`absolute inset-0 bg-gradient-to-br ${palette.glow}`} />
      <div className="relative space-y-4">
        <div className="text-5xl" aria-hidden>
          {levelData.emoji}
        </div>
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground ${palette.accent}`}>
            {level}
          </p>
          <p className="text-sm text-muted-foreground">Level {levelData.level} Donor</p>
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Total Impact</p>
          <p className={`text-4xl font-serif ${palette.accent}`}>${amount}</p>
        </div>
        <Badge variant="outline" className="mx-auto w-fit border-dashed">
          Every dollar = safety
        </Badge>
      </div>
    </Card>
  )
}
