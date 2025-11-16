import type { Metadata } from 'next'
import { Adamina, AR_One_Sans, Azeret_Mono } from 'next/font/google'

import './globals.css'
import EmergencyBanner from './components/EmergencyBanner'
import Footer from './components/Footer'
import Header from './components/Header'
import NotificationBanner from './components/NotificationBanner'
import {
  EMERGENCY_CONTACTS,
  FOOTER_COLUMNS,
  NAV_LINKS,
  OFFICE_LOCATIONS,
  SOCIAL_LINKS,
} from '@/lib/constants'
import { cn } from '@/lib/utils'

const arOneSans = AR_One_Sans({
  subsets: ['latin'],
  variable: '--font-ar-one-sans',
})

const adamina = Adamina({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-adamina',
})

const azeretMono = Azeret_Mono({
  subsets: ['latin'],
  variable: '--font-azeret-mono',
})

export const metadata: Metadata = {
  title: "Athena's House - Protect a Woman Tonight",
  description: 'Providing safety, shelter, and hope to survivors of domestic violence in Montréal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background text-foreground font-sans',
          arOneSans.variable,
          adamina.variable,
          azeretMono.variable
        )}
      >
        <EmergencyBanner contacts={EMERGENCY_CONTACTS} showLanguageNote isSticky isDismissible />
        <Header navLinks={NAV_LINKS} logoText="Shield of Athena" logoTagline="Family Services" />
        <NotificationBanner />
        {children}
        <Footer
          columns={FOOTER_COLUMNS}
          offices={OFFICE_LOCATIONS}
          socialLinks={SOCIAL_LINKS}
          emergencyNumbers={EMERGENCY_CONTACTS}
        />
      </body>
    </html>
  )
}
