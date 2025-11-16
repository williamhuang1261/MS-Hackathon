'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Menu, Phone } from 'lucide-react'

import LanguageSelector from './LanguageSelector'
import ThemeToggle from './ThemeToggle'
import type { HeaderProps, NavLink } from '@/lib/types'
import { EMERGENCY_CONTACTS, LANGUAGES } from '@/lib/constants'
import { Button } from '@/app/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/app/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/app/components/ui/sheet'
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover'
import { Separator } from '@/app/components/ui/separator'
import { cn } from '@/lib/utils'

export default function Header({ navLinks, logoText = 'Shield of Athena', logoTagline = 'Family Services' }: HeaderProps) {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const renderNavLink = (link: NavLink) => {
    if (link.dropdown?.length) {
      return (
        <NavigationMenuItem key={link.label}>
          <NavigationMenuTrigger className="font-semibold text-foreground/80">
            {link.label}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 rounded-xl border border-border bg-background p-4 shadow-lg lg:w-[400px]">
              {link.dropdown.map((item) => (
                <Link key={item.href} href={item.href} className="group flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">Learn more</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      )
    }

    return (
      <NavigationMenuItem key={link.label}>
        <NavigationMenuLink asChild>
          <Link
            href={link.href}
            className={cn(
              navigationMenuTriggerStyle,
              'rounded-full text-sm font-semibold uppercase tracking-wide',
              pathname === link.href && 'bg-primary text-primary-foreground shadow'
            )}
          >
            {link.label}
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    )
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        isScrolled ? 'bg-background/90 shadow-sticky backdrop-blur-lg' : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex flex-col">
          <span className="font-serif text-2xl font-semibold text-primary">{logoText}</span>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{logoTagline}</span>
        </Link>

        <div className="hidden items-center gap-3 lg:flex">
          <NavigationMenu>
            <NavigationMenuList>{navLinks.map(renderNavLink)}</NavigationMenuList>
          </NavigationMenu>
          <ThemeToggle />
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
            languages={LANGUAGES}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Emergency numbers">
                <Phone className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80">
              <p className="text-sm font-semibold text-foreground">Emergency Contacts</p>
              <Separator className="my-3" />
              <ul className="space-y-2 text-sm">
                {EMERGENCY_CONTACTS.map((contact) => (
                  <li key={contact.href} className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{contact.label}</span>
                    <a href={contact.href} className="font-mono text-primary hover:underline">
                      {contact.number}
                    </a>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
          <Button asChild className="shadow-lg">
            <Link href="/donate">Donate</Link>
          </Button>
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open navigation menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6">
              <div>
                <p className="font-serif text-xl text-primary">{logoText}</p>
                <p className="text-sm text-muted-foreground">{logoTagline}</p>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <LanguageSelector
                  currentLanguage={currentLanguage}
                  onLanguageChange={setCurrentLanguage}
                  languages={LANGUAGES}
                />
              </div>
              <nav className="space-y-3">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    <Link href={link.href} className="block rounded-xl px-3 py-2 text-base font-semibold text-foreground hover:bg-muted">
                      {link.label}
                    </Link>
                    {link.dropdown && (
                      <div className="ml-3 space-y-1 border-l border-border pl-3 text-sm text-muted-foreground">
                        {link.dropdown.map((item) => (
                          <Link key={item.href} href={item.href} className="block py-1">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="mt-auto space-y-4">
                <Button asChild className="w-full">
                  <Link href="/donate">Donate</Link>
                </Button>
                <div className="rounded-2xl border border-border p-4 text-sm">
                  <p className="mb-2 font-semibold uppercase tracking-wide">Emergency</p>
                  <ul className="space-y-1">
                    {EMERGENCY_CONTACTS.slice(0, 4).map((contact) => (
                      <li key={contact.href} className="flex justify-between text-muted-foreground">
                        <span>{contact.label}</span>
                        <a href={contact.href} className="font-mono text-primary">
                          {contact.number}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
