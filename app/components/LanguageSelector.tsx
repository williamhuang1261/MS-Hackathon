'use client'

import { useEffect, useState } from 'react'
import { Check, ChevronDown, Globe } from 'lucide-react'

import type { LanguageSelectorProps } from '@/lib/types'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'

const STORAGE_KEY = 'shield-language'

export default function LanguageSelector({ currentLanguage, onLanguageChange, languages }: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      handleLanguageChange(stored, false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setSelectedLanguage(currentLanguage)
  }, [currentLanguage])

  const handleLanguageChange = (code: string, persist = true) => {
    const match = languages.find((language) => language.code === code)
    if (!match) return

    setSelectedLanguage(code)
    if (persist && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, code)
    }

    if (typeof document !== 'undefined') {
      document.documentElement.lang = code
      document.documentElement.dir = match.direction
    }

    onLanguageChange?.(code)
  }

  const activeLanguage = languages.find((language) => language.code === selectedLanguage)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm font-semibold uppercase tracking-wide text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        )}
      >
        <Globe className="h-4 w-4" />
        <span>{(activeLanguage?.code ?? 'en').toUpperCase()}</span>
        <ChevronDown className="h-3 w-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Select language</DropdownMenuLabel>
        <DropdownMenuSeparator />
  <DropdownMenuRadioGroup value={selectedLanguage} onValueChange={(value: string) => handleLanguageChange(value)}>
          {languages.map((language) => (
            <DropdownMenuRadioItem key={language.code} value={language.code} className="flex items-center gap-2">
              <span className="flex flex-1 flex-col">
                <span className="text-sm font-semibold">{language.name}</span>
                <span className="text-xs text-muted-foreground">{language.nativeName}</span>
              </span>
              {selectedLanguage === language.code && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xs text-muted-foreground">
          RTL languages switch to right-to-left layout automatically.
        </DropdownMenuItem>
        <DropdownMenuCheckboxItem className="text-xs" checked disabled>
          Stores preference locally
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
