'use client'

import { useEffect, useState } from 'react'
import DonorBadge from '../../components/DonorBadge'
import StoryTeaseSignup from '../../components/StoryTeaseSignup'

export default function ThankYou() {
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [originalAmount, setOriginalAmount] = useState<number>(0)
  const [additionalAmount, setAdditionalAmount] = useState<number>(0)
  const [donorLevel, setDonorLevel] = useState<string>('')
  const [nextLevel, setNextLevel] = useState<string>('')
  const [nextLevelAmount, setNextLevelAmount] = useState<number>(0)

  useEffect(() => {
    const total = localStorage.getItem('totalDonationAmount')
    const original = localStorage.getItem('donationAmount')
    const additional = localStorage.getItem('additionalAmount')
    
    if (total) {
      const amount = Number(total)
      setTotalAmount(amount)
      setOriginalAmount(Number(original) || 0)
      setAdditionalAmount(Number(additional) || 0)
      
      // Determine donor level
      if (amount >= 5000) {
        setDonorLevel('Athena Protector')
        setNextLevel('')
        setNextLevelAmount(0)
      } else if (amount >= 2000) {
        setDonorLevel('Family Protector')
        setNextLevel('Athena Protector')
        setNextLevelAmount(5000)
      } else if (amount >= 500) {
        setDonorLevel('Shelter Champion')
        setNextLevel('Family Protector')
        setNextLevelAmount(2000)
      } else if (amount >= 100) {
        setDonorLevel('Safety Ally')
        setNextLevel('Shelter Champion')
        setNextLevelAmount(500)
      } else {
        setDonorLevel('Shelter Guardian')
        setNextLevel('Safety Ally')
        setNextLevelAmount(100)
      }
    }
  }, [])

  const receiptNumber = Math.floor(Math.random() * 900000) + 100000

  const getImpactItems = () => {
    const items = []
    if (totalAmount >= 35) items.push('1 night of shelter')
    if (totalAmount >= 20) items.push('1 warm meal')
    if (totalAmount >= 20) items.push('1 emergency support kit')
    if (totalAmount >= 50) items.push('1 therapy session')
    if (totalAmount >= 100) items.push('Full day of support for mother & child')
    if (totalAmount >= 250) items.push('One week of stability and safety')
    
    return items.length > 0 ? items : ['Emergency support contribution']
  }

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
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Thank You Header */}
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-primary-purple/10 rounded-full">
            <span className="text-6xl">💜</span>
          </div>
          <h1 className="text-5xl font-bold text-primary-purple">Thank You</h1>
          <p className="text-2xl text-gray-700">
            You protected a woman tonight.
          </p>
        </div>

        {/* Donation Summary */}
        <div className="bg-white border-2 border-primary-purple shadow-xl rounded-lg p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Donation</h2>
              <p className="text-gray-600">Receipt #{receiptNumber} (demo)</p>
            </div>
            <p className="text-4xl font-bold text-primary-purple">${totalAmount}</p>
          </div>
          
          {additionalAmount > 0 && (
            <div className="mb-6 p-4 bg-primary-purple/5 rounded-lg">
              <p className="text-sm text-gray-600">
                Original donation: ${originalAmount} + Additional impact: ${additionalAmount}
              </p>
            </div>
          )}

          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-2">
              ✓ Your donation is <strong>tax-deductible</strong>
            </p>
            <p className="text-sm text-gray-600">
              ✓ A receipt has been sent to your email (in full version)
            </p>
          </div>
        </div>

        {/* Impact Summary with Animated Checkmarks */}
        <div className="bg-gradient-to-br from-primary-purple to-dark-navy text-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Your Immediate Impact</h2>
          <div className="space-y-3">
            {getImpactItems().map((item, index) => (
              <div key={index} className="flex items-center space-x-3 checkmark-item">
                <span className="text-2xl">✓</span>
                <span className="text-lg">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-white/10 rounded-lg">
            <p className="text-center text-sm">
              Your contribution is being put to work <strong>right now</strong> to provide safety and support.
            </p>
          </div>
        </div>

        {/* Your Donor Badge */}
        <div className="bg-white border-2 border-primary-purple p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Your Donor Badge</h2>
          <div className="flex justify-center mb-6">
            <DonorBadge level={donorLevel} amount={totalAmount} />
          </div>
          
          {nextLevel && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-center text-gray-700 mb-3">
                You're on your way to becoming a <strong className="text-primary-purple">{nextLevel}</strong>!
              </p>
              <div className="w-full bg-gray-300 rounded-full h-4 mb-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary-purple to-dark-navy h-4 rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${(totalAmount / nextLevelAmount) * 100}%`,
                    animation: 'progressFill 1.5s ease-out'
                  }}
                ></div>
              </div>
              <p className="text-center text-sm text-gray-600">
                ${totalAmount} of ${nextLevelAmount} to next level
              </p>
            </div>
          )}

          {/* All Levels Display */}
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm font-semibold mb-3 text-center text-gray-600">Donor Levels:</p>
            <div className="space-y-2 text-sm">
              <div className={`flex justify-between ${donorLevel === 'Shelter Guardian' ? 'font-bold text-primary-purple' : 'text-gray-600'}`}>
                <span>🛡️ Shelter Guardian</span>
                <span>$0 - $99</span>
              </div>
              <div className={`flex justify-between ${donorLevel === 'Safety Ally' ? 'font-bold text-primary-purple' : 'text-gray-600'}`}>
                <span>🤝 Safety Ally</span>
                <span>$100 - $499</span>
              </div>
              <div className={`flex justify-between ${donorLevel === 'Shelter Champion' ? 'font-bold text-primary-purple' : 'text-gray-600'}`}>
                <span>🏆 Shelter Champion</span>
                <span>$500 - $1,999</span>
              </div>
              <div className={`flex justify-between ${donorLevel === 'Family Protector' ? 'font-bold text-primary-purple' : 'text-gray-600'}`}>
                <span>👨‍👩‍👧 Family Protector</span>
                <span>$2,000 - $4,999</span>
              </div>
              <div className={`flex justify-between ${donorLevel === 'Athena Protector' ? 'font-bold text-primary-purple' : 'text-gray-600'}`}>
                <span>⭐ Athena Protector</span>
                <span>$5,000+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps / CTAs */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">What's Next?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={handleShare}
              className="bg-primary-purple text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#5d5d8f] transition-all"
            >
              📢 Share Your Support
            </button>
            <button className="border-2 border-primary-purple text-primary-purple px-6 py-4 rounded-lg font-semibold hover:bg-primary-purple hover:text-white transition-all">
              💌 Join the Athena Circle
            </button>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-light-purple/30 p-6 rounded-lg text-center">
          <p className="text-gray-700 mb-2">
            Want to make an even bigger impact?
          </p>
          <a href="/donate" className="text-primary-purple font-bold underline hover:no-underline">
            Set up a monthly donation
          </a>
        </div>

        {/* Return Home */}
        <div className="text-center pt-4">
          <a href="/" className="text-gray-600 hover:text-primary-purple transition-colors">
            ← Return to Home
          </a>
        </div>
      </div>

      {/* Story Tease & Email Signup */}
      <StoryTeaseSignup />
    </main>
  )
}

