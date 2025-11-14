'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Donate() {
  const router = useRouter()
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)

  const oneTimeTiers = [
    { amount: 20, label: '$20', description: 'One meal + emergency kit' },
    { amount: 35, label: '$35', description: 'Safe night in shelter' },
    { amount: 50, label: '$50', description: 'Therapy session starter' },
    { amount: 100, label: '$100', description: 'Full day of care for mother & child' },
    { amount: 250, label: '$250', description: 'One week of stability' },
  ]

  const monthlyTiers = [
    { amount: 10, label: '$10/month', description: 'Support-line response' },
    { amount: 25, label: '$25/month', description: 'Groceries for survivors' },
    { amount: 50, label: '$50/month', description: 'Monthly therapy session' },
    { amount: 100, label: '$100/month', description: 'Monthly safe-night fund' },
  ]

  const tiers = donationType === 'one-time' ? oneTimeTiers : monthlyTiers

  const handleComplete = () => {
    if (selectedAmount) {
      // Store donation amount in localStorage for upsell page
      localStorage.setItem('donationAmount', selectedAmount.toString())
      localStorage.setItem('donationType', donationType)
      router.push('/donate/upsell')
    }
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Make Your Donation</h1>
          <p className="text-xl text-gray-600">
            Every contribution directly helps a woman escape violence and rebuild her life.
          </p>
        </div>

        {/* Donation Type Selector */}
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Choose Your Donation Type</h2>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setDonationType('one-time')
                setSelectedAmount(null)
              }}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                donationType === 'one-time'
                  ? 'bg-primary-purple text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              One-Time
            </button>
            <button
              onClick={() => {
                setDonationType('monthly')
                setSelectedAmount(null)
              }}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                donationType === 'monthly'
                  ? 'bg-primary-purple text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Monthly Supporter
            </button>
          </div>
        </section>

        {/* Donation Tiers */}
        <section className="space-y-4">
          <h3 className="text-2xl font-semibold">
            {donationType === 'one-time' ? 'One-Time Support' : 'Monthly Support'}
          </h3>
          <p className="text-gray-600">
            {donationType === 'one-time'
              ? 'Make an immediate impact with a one-time donation.'
              : 'Become a sustained champion by giving monthly.'}
          </p>
          <div className="space-y-3">
            {tiers.map(({ amount, label, description }) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`w-full p-6 rounded-lg flex justify-between items-center transition-all ${
                  selectedAmount === amount
                    ? 'border-3 border-primary-purple bg-primary-purple/10 shadow-lg'
                    : 'border-2 border-gray-300 bg-white hover:border-primary-purple hover:shadow-md'
                }`}
              >
                <span className="text-2xl font-bold text-primary-purple">{label}</span>
                <span className="text-right text-gray-700 font-medium">{description}</span>
              </button>
            ))}
          </div>

          {/* Custom Amount Option */}
          <div className="bg-white border-2 border-gray-300 p-6 rounded-lg">
            <label className="block text-lg font-semibold mb-2">Or enter a custom amount:</label>
            <div className="flex gap-2">
              <span className="text-2xl font-bold text-primary-purple flex items-center">$</span>
              <input
                type="number"
                placeholder="Enter amount"
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-primary-purple"
                onChange={(e) => setSelectedAmount(Number(e.target.value))}
                value={selectedAmount && !tiers.find(t => t.amount === selectedAmount) ? selectedAmount : ''}
              />
            </div>
          </div>
        </section>

        {/* Complete Button */}
        <div className="text-center pt-6">
          <button
            onClick={handleComplete}
            disabled={!selectedAmount}
            className={`px-12 py-4 rounded-lg text-lg font-bold transition-all ${
              selectedAmount
                ? 'bg-primary-purple text-white hover:bg-[#5d5d8f] shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {selectedAmount
              ? `Complete Donation ${donationType === 'one-time' ? '' : '(Monthly)'}`
              : 'Select an amount to continue'}
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="bg-light-purple/30 p-6 rounded-lg text-center">
          <p className="text-sm text-gray-700">
            🔒 Secure donation · 🧾 Tax-deductible · 💯 100% goes to survivors
          </p>
        </div>
      </div>
    </main>
  )
}

