'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Phone, X } from 'lucide-react'

import type { EmergencyBannerProps } from '@/lib/types'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'emergency-banner-dismissed'

export default function EmergencyBanner({
  contacts,
  isSticky = true,
  isDismissible = true,
  showLanguageNote = true,
}: EmergencyBannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const bannerRef = useRef<HTMLDivElement>(null)

  const handleDismiss = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      id="emergency-contacts"
      ref={bannerRef}
      role="banner"
      aria-label="Emergency crisis hotline numbers"
      aria-live="polite"
      className="relative z-50 w-full bg-ring shadow-md"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white">
          <Phone className="h-4 w-4" />
          <span>Emergency 24/7</span>
        </div>
        <div className="grid flex-1 grid-cols-4 gap-3">
          {contacts.map((contact) => (
            <Link
              key={contact.href}
              href={contact.href}
              className="flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-card px-3 py-2 text-center text-card-foreground transition hover:bg-card/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ring"
            >
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold uppercase tracking-wider opacity-70">
                  {contact.label}
                </span>
                <span className="font-mono text-sm font-bold">{contact.number}</span>
              </div>
            </Link>
          ))}
        </div>
        {showLanguageNote && (
          <p className="hidden text-xs font-semibold uppercase tracking-wide text-white/80 lg:block">
            17+ languages
          </p>
        )}
        {isDismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white transition hover:bg-white/10"
            aria-label="Dismiss emergency banner"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
