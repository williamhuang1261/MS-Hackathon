import Link from 'next/link'

import LanguageSelector from './LanguageSelector'
import type { FooterProps } from '@/lib/types'
import { LANGUAGES } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function Footer({ columns, offices, socialLinks, emergencyNumbers, copyrightYear = new Date().getFullYear() }: FooterProps) {
  return (
    <footer className="mt-16 bg-primary text-primary-foreground" aria-label="Site footer">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <p className="font-serif text-2xl">Shield of Athena</p>
            <p className="text-sm text-primary-foreground/80">34 years of compassionate multilingual support</p>
            <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-4 text-sm">
              <p className="font-semibold">Emergency Numbers</p>
              <ul className="mt-2 space-y-1">
                {emergencyNumbers.slice(0, 4).map((number) => (
                  <li key={number.href} className="flex justify-between text-primary-foreground/90">
                    <span>{number.label}</span>
                    <a href={number.href} className="font-mono font-semibold text-white">
                      {number.number}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/70">{column.title}</p>
              <ul className="mt-3 space-y-2 text-sm text-primary-foreground/90">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 border-primary-foreground/30" />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {offices.map((office) => (
            <div key={office.name} className="space-y-2 text-sm text-primary-foreground/90">
              <p className="font-semibold uppercase tracking-wide">{office.name}</p>
              {office.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p>
                Phone: <a href={`tel:${office.phone}`} className="font-semibold text-white">{office.phone}</a>
              </p>
              {office.email && (
                <p>
                  Email: <a href={`mailto:${office.email}`} className="font-semibold text-white">{office.email}</a>
                </p>
              )}
            </div>
          ))}
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide">Stay Connected</p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Button
                    key={social.platform}
                    asChild
                    variant="outline"
                    className="h-10 w-10 rounded-full border-primary-foreground/50 bg-transparent text-primary"
                  >
                    <Link href={social.url} target="_blank" rel="noreferrer" aria-label={social.platform}>
                      <Icon className="h-5 w-5" />
                    </Link>
                  </Button>
                )
              })}
            </div>
            <LanguageSelector currentLanguage="en" languages={LANGUAGES} />
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/30 bg-primary/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-primary-foreground/80 md:flex-row md:items-center md:justify-between">
          <p>© {copyrightYear} Shield of Athena Family Services. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/accessibility" className="hover:text-white">
              Accessibility Statement
            </Link>
            <p>Charitable Registration: Pending</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
