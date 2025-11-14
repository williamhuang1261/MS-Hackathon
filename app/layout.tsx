import type { Metadata } from 'next'
import { Inter, DM_Serif_Display } from 'next/font/google'
import './globals.css'
import NotificationBanner from './components/NotificationBanner'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const dmSerifDisplay = DM_Serif_Display({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
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
      <body className={`${inter.variable} ${dmSerifDisplay.variable} font-sans`}>
        <NotificationBanner />
        <nav className="bg-athena-violet text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <a href="/" className="text-xl font-bold">
                  Athena's House
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/" className="hover:text-hope-gold transition-colors">
                  Home
                </a>
                <a 
                  href="/donate" 
                  className="bg-hope-gold text-soft-charcoal hover:bg-[#f5d785] px-4 py-2 rounded-lg font-semibold transition-all duration-200"
                >
                  Donate
                </a>
              </div>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-athena-violet text-white mt-16 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="mb-2">© 2025 Athena's House. All rights reserved.</p>
            <p className="text-sm text-warm-white/80">Registered Charity · Tax receipts provided for all donations</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

