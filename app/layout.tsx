import type { Metadata } from 'next'
import { Adamina, AR_One_Sans, Azeret_Mono } from 'next/font/google'

import './globals.css'
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
        {children}
      </body>
    </html>
  )
}
