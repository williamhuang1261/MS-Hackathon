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

  useEffect(() => {
    if (isDismissible) {
      const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
      if (stored === 'true') {
        setIsVisible(false)
      }
    }
  }, [isDismissible])

  useEffect(() => {
    const updateHeight = () => {
      if (!isVisible) {
        document.documentElement.style.setProperty('--banner-height', '0px')
        return
      }

      if (bannerRef.current) {
        document.documentElement.style.setProperty('--banner-height', `${bannerRef.current.offsetHeight}px`)
      }
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [isVisible])

  const handleDismiss = () => {
    setIsVisible(false)
    if (isDismissible && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, 'true')
    }
    document.documentElement.style.setProperty('--banner-height', '0px')
  }

  if (!isVisible) return null

  return (
    <div
      id="emergency-contacts"
      ref={bannerRef}
      role="banner"
      aria-label="Emergency crisis hotline numbers"
      aria-live="polite"
      className={cn(
        'z-50 w-full bg-emergency text-emergency-foreground shadow-md',
        isSticky ? 'fixed top-0 left-0' : 'relative'
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:gap-6">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
          <span role="img" aria-hidden>
            🚨
          </span>
          <span>Emergency help available 24/7</span>
        </div>
        <div className="grid w-full gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
          {contacts.map((contact) => (
            <Link
              key={contact.href}
              href={contact.href}
              className="flex min-h-[44px] items-center justify-center rounded-full bg-emergency-foreground/10 px-3 py-2 text-center text-emergency-foreground transition hover:bg-emergency-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-emergency"
            >
              <Phone className="mr-2 h-4 w-4" />
              <span className="font-semibold">{contact.label}:</span>
              <span className="ml-2 font-mono">{contact.number}</span>
            </Link>
          ))}
        </div>
        {showLanguageNote && (
          <p className="text-xs font-semibold uppercase tracking-wide text-emergency-foreground/80">
            Available in 17+ languages
          </p>
        )}
        {isDismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-emergency-foreground transition hover:bg-emergency-foreground/10"
            aria-label="Dismiss emergency banner"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
