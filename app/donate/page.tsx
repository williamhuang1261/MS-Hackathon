'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ONE_TIME_TIERS, MONTHLY_TIERS, ROUTES, STORAGE_KEYS } from '@/lib/constants'
import { setStorageItem } from '@/lib/utils'
import type { DonationType } from '@/lib/types'

export default function Donate() {
  const router = useRouter()
  const [donationType, setDonationType] = useState<DonationType>('one-time')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)

  const tiers = donationType === 'one-time' ? ONE_TIME_TIERS : MONTHLY_TIERS

  const handleComplete = () => {
    if (selectedAmount) {
      // Store donation amount in localStorage for upsell page
      setStorageItem(STORAGE_KEYS.donationAmount, selectedAmount.toString())
      setStorageItem(STORAGE_KEYS.donationType, donationType)
      router.push(ROUTES.upsell)
    }
  }

  return (
    <main className="min-h-screen py-12 px-4 bg-snow-white">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="bg-athena-violet text-white p-8 rounded-lg text-center">
          <h1 className="text-4xl font-bold mb-2">Choose Your Donation</h1>
          <p className="text-lg text-warm-white">Every contribution creates immediate safety and hope.</p>
        </div>

        {/* Donation Type Toggle */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-athena-violet text-center">Donation Type</h2>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setDonationType('one-time')
                setSelectedAmount(null)
              }}
              className={`px-8 py-4 rounded-lg font-bold text-lg transition-all ${
                donationType === 'one-time'
                  ? 'bg-athena-violet text-white shadow-lg scale-105'
                  : 'bg-lavender-card text-athena-violet border-2 border-athena-violet/30 hover:border-athena-violet'
              }`}
            >
              One-Time
            </button>
            <button
              onClick={() => {
                setDonationType('monthly')
                setSelectedAmount(null)
              }}
              className={`px-8 py-4 rounded-lg font-bold text-lg transition-all ${
                donationType === 'monthly'
                  ? 'bg-athena-violet text-white shadow-lg scale-105'
                  : 'bg-lavender-card text-athena-violet border-2 border-athena-violet/30 hover:border-athena-violet'
              }`}
            >
              Monthly Supporter
            </button>
          </div>
        </section>

        {/* Donation Tiers */}
        <section className="space-y-4">
          <h3 className="text-2xl font-bold text-center text-athena-violet">
            {donationType === 'one-time' ? 'One-Time Support' : 'Monthly Support'}
          </h3>
          <div className="space-y-3">
            {tiers.map(({ amount, label, description }) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`group relative w-full p-6 rounded-lg flex justify-between items-center transition-all ${
                  selectedAmount === amount
                    ? 'border-3 border-athena-violet bg-athena-violet text-white shadow-xl scale-[1.02]'
                    : 'border-2 border-athena-violet/20 bg-lavender-card hover:border-athena-violet hover:shadow-lg hover:scale-[1.01]'
                }`}
              >
                <span className={`text-2xl font-bold ${selectedAmount === amount ? 'text-hope-gold' : 'text-athena-violet'}`}>
                  {label}
                </span>
                <span className={`text-right font-medium ${selectedAmount === amount ? 'text-white' : 'text-soft-charcoal'}`}>
                  {description}
                </span>
                
                {/* Hover Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-4 py-2 bg-athena-violet text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  <div className="font-semibold">{description}</div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-athena-violet"></div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Complete Donation Button */}
        <div className="flex justify-center">
          <button
            onClick={handleComplete}
            disabled={!selectedAmount}
            className={`px-12 py-4 rounded-lg font-bold text-xl transition-all ${
              selectedAmount
                ? 'bg-athena-violet text-white hover:bg-[#5a2877] shadow-lg hover:shadow-xl hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {selectedAmount ? `Complete Donation` : 'Select an Amount'}
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="bg-lavender-card border-2 border-athena-violet/20 rounded-lg p-6 text-center">
          <p className="text-soft-charcoal mb-2">
            <span className="font-bold text-athena-violet">🟣 80% of funds go directly to programs</span>
          </p>
          <p className="text-sm text-soft-charcoal/70">
            The other 20% powers operations so we can serve more women in crisis.
          </p>
        </div>

        {/* Identity-Based Microcopy */}
        <p className="text-center text-lg italic text-soft-charcoal">
          You're the kind of person who doesn't look away.
        </p>
      </div>
    </main>
  )
}
