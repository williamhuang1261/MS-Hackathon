'use client'

import { useEffect, useRef, useState } from 'react'
import { Building, Calendar, Clock, Globe, Home, Users, type LucideIcon } from 'lucide-react'

import type { QuickStatsProps, StatIcon } from '@/lib/types'
import { cn } from '@/lib/utils'

const ICON_MAP: Record<StatIcon, LucideIcon> = {
  users: Users,
  home: Home,
  globe: Globe,
  calendar: Calendar,
  building: Building,
  clock: Clock,
}

export default function QuickStats({ stats, animateOnView = true }: QuickStatsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(!animateOnView)
  const [values, setValues] = useState(() => stats.map(() => 0))

  useEffect(() => {
    if (!animateOnView || !sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [animateOnView])

  useEffect(() => {
    if (!isVisible) return

    const animations = stats.map((stat, index) => {
      if (stat.isString) {
        setValues((prev) => {
          const next = [...prev]
          next[index] = 0
          return next
        })
        return null
      }

      const duration = 2000
      const start = performance.now()

      const animate = (currentTime: number) => {
        const elapsed = currentTime - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const currentValue = Math.floor(Number(stat.value) * eased)

        setValues((prev) => {
          const next = [...prev]
          next[index] = currentValue
          return next
        })

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setValues((prev) => {
            const next = [...prev]
            next[index] = Number(stat.value)
            return next
          })
        }
      }

      return requestAnimationFrame(animate)
    })

    return () => {
      animations.forEach((id) => {
        if (id) cancelAnimationFrame(id)
      })
    }
  }, [isVisible, stats])

  return (
    <section ref={sectionRef} className="rounded-3xl border border-border bg-muted/30 p-8" aria-label="Impact statistics">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = ICON_MAP[stat.icon]
          const displayValue = stat.isString ? stat.value : values[index]

          return (
            <article
              key={stat.label}
              className={cn(
                'flex flex-col rounded-2xl border border-border/60 bg-card/80 p-6 shadow transition duration-300 hover:-translate-y-1 hover:shadow-lg'
              )}
            >
              <div className="mb-4 flex items-center gap-3 text-secondary">
                <Icon className="h-8 w-8" />
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Impact</span>
              </div>
              <span className="text-4xl font-serif text-primary" aria-live="polite">
                {typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}
                {stat.suffix ?? ''}
              </span>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
