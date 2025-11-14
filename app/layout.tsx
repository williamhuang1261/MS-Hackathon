import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NotificationBanner from './components/NotificationBanner'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <NotificationBanner />
        <nav className="bg-dark-navy text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <a href="/" className="text-xl font-bold">
                  Athena's House
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/" className="hover:text-primary-purple transition-colors">
                  Home
                </a>
                <a 
                  href="/donate" 
                  className="bg-primary-purple hover:bg-[#5d5d8f] px-4 py-2 rounded-lg font-semibold transition-all duration-200"
                >
                  Donate
                </a>
              </div>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-dark-navy text-white mt-16 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="mb-2">© 2025 Athena's House. All rights reserved.</p>
            <p className="text-sm text-gray-400">Registered Charity · Tax receipts provided for all donations</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

