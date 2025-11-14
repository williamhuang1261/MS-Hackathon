'use client'

import { useEffect, useState } from 'react'
import DonorBadge from '../components/DonorBadge'
import StoryTeaseSignup from '../components/StoryTeaseSignup'
import { STORAGE_KEYS } from '@/lib/constants'
import { getDonorLevel, getNextDonorLevel, getImpactItems, getStorageItem } from '@/lib/utils'

export default function ThankYou() {
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [originalAmount, setOriginalAmount] = useState<number>(0)
  const [additionalAmount, setAdditionalAmount] = useState<number>(0)
  const [donorLevel, setDonorLevel] = useState<string>('')
  const [nextLevel, setNextLevel] = useState<string>('')
  const [nextLevelAmount, setNextLevelAmount] = useState<number>(0)

  useEffect(() => {
    const total = getStorageItem(STORAGE_KEYS.totalDonationAmount)
    const original = getStorageItem(STORAGE_KEYS.donationAmount)
    const additional = getStorageItem(STORAGE_KEYS.additionalAmount)
    
    if (total) {
      const amount = Number(total)
      setTotalAmount(amount)
      setOriginalAmount(Number(original) || 0)
      setAdditionalAmount(Number(additional) || 0)
      
      // Determine donor level using utility function
      const level = getDonorLevel(amount)
      setDonorLevel(level)
      
      // Get next level information
      const next = getNextDonorLevel(amount)
      if (next) {
        setNextLevel(next.level)
        setNextLevelAmount(next.amount)
      }
    }
  }, [])

  const receiptNumber = Math.floor(Math.random() * 900000) + 100000

  const handleShare = () => {
    const shareText = `I just donated to Athena's House to help protect women and children from domestic violence. Join me in making a difference!`
    if (navigator.share) {
      navigator.share({
        title: "Support Athena's House",
        text: shareText,
        url: window.location.origin,
      })
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${shareText} ${window.location.origin}`)
      alert('Share message copied to clipboard!')
    }
  }

  return (
    <main style={{ background: 'linear-gradient(180deg, #FDF6D9 0%, #FFFFFF 100%)' }} className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Thank You Header */}
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-hope-gold/20 rounded-full">
            <span className="text-6xl">💜</span>
          </div>
          <h1 className="text-5xl font-bold text-athena-violet">Thank You</h1>
          <p className="text-2xl text-soft-charcoal">
            You protected a woman tonight.
          </p>
        </div>

        {/* Donation Summary */}
        <div className="bg-white border-2 border-hope-gold shadow-xl rounded-lg p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-athena-violet">Your Donation</h2>
              <p className="text-soft-charcoal/70">Receipt #{receiptNumber} (demo)</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-athena-violet">${totalAmount}</p>
              {additionalAmount > 0 && (
                <p className="text-sm text-soft-charcoal/70">
                  ${originalAmount} + ${additionalAmount} extra
                </p>
              )}
            </div>
          </div>
          
          <div className="border-t-2 border-hope-gold/30 pt-4">
            <p className="text-soft-charcoal/80 text-sm mb-2">
              Your support is <span className="font-bold text-athena-violet">tax-deductible</span>.
            </p>
            <p className="text-xs text-soft-charcoal/60">
              A formal receipt will be sent to your email (in production).
            </p>
          </div>
        </div>

        {/* Impact Summary */}
        <div className="bg-gradient-to-br from-lavender-mist/30 to-warm-blush/20 border-2 border-athena-violet/20 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-athena-violet">
            Your Immediate Impact
          </h2>
          <div className="space-y-4">
            {getImpactItems(totalAmount).map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm animate-checkmarkPop"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <span className="text-3xl text-hope-green">✓</span>
                <span className="text-lg text-soft-charcoal font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donor Level Badge */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-athena-violet">Your Donor Level</h2>
          <div className="flex justify-center">
            <DonorBadge level={donorLevel} amount={totalAmount} />
          </div>
          
          {nextLevel && (
            <div className="bg-white border-2 border-lavender-mist rounded-lg p-6 max-w-md mx-auto">
              <p className="text-soft-charcoal mb-3">
                You're <span className="font-bold text-athena-violet">${nextLevelAmount - totalAmount}</span> away from becoming a:
              </p>
              <p className="text-2xl font-bold text-athena-violet">{nextLevel}</p>
              
              {/* Progress Bar */}
              <div className="mt-4 bg-lavender-mist/30 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-hope-gold h-full rounded-full transition-all duration-1000 animate-progressFill"
                  style={{ width: `${(totalAmount / nextLevelAmount) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Share CTA */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleShare}
            className="bg-athena-violet hover:bg-[#5a2877] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg"
          >
            Share Your Support
          </button>
          <a
            href="/"
            className="border-2 border-athena-violet text-athena-violet hover:bg-athena-violet hover:text-white px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105"
          >
            Back to Home
          </a>
        </div>

        {/* Story Tease and Email Signup */}
        <StoryTeaseSignup />
      </div>
    </main>
  )
}
