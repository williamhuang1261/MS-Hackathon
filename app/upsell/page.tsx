'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UPSELL_OPTIONS, OPTIONAL_UPSELLS, ROUTES, STORAGE_KEYS } from '@/lib/constants'
import { getStorageItem, setStorageItem } from '@/lib/utils'
import type { ImpactStory } from '@/lib/types'

const stories: ImpactStory[] = [
  {
    title: "Amina Ran for Her Life Tonight",
    content: [
      "Tonight, Amina didn't plan to run.",
      "She didn't even have time to take her phone.",
      "She heard the voice she fears the most — that low, drunk, angry voice calling her name from the hallway. The sound that always meant danger.",
      "She heard something slam. Then footsteps. Then silence — the kind of silence that means something awful is about to happen.",
      "She knew she had seconds, not minutes.",
      "She slipped out the back door with her heart racing so violently she thought she might collapse. She ran down the street without a coat, without shoes, without thinking.",
      "By the time she reached our hotline pickup point, she could barely breathe.",
      "When she got to our shelter she kept repeating:",
      '"I really thought tonight was the end. I really did."',
      "Your donation is the reason she is not in that house right now.",
      "Your donation is why she is in a locked, warm room… alive, safe, protected.",
    ],
  },
  {
    title: "The Closet Story",
    content: [
      "When Amina called our hotline tonight, she wasn't speaking in full sentences.",
      "She was whispering from inside a closet.",
      "She said she couldn't move. She said she was holding the door shut with her foot. She said she was afraid he would hear her breathing.",
      "We could hear the sounds in the background — doors slamming, someone shouting her name, pacing up and down the hallway.",
      'She whispered, "Please… please come now. I don\'t know if I can hold the door much longer."',
      "Our team got to her as fast as they could.",
      "She was barefoot, shaking, and crying so hard she couldn't speak.",
      "But she was alive.",
      "And she is safe now — because of you.",
      "Your donation is the reason our hotline was staffed tonight.",
      "Your donation is the reason our emergency team reached her in time.",
      "Your donation is the reason she is behind a locked door, wrapped in a blanket, finally allowed to breathe.",
    ],
  },
]

export default function Upsell() {
  const router = useRouter()
  const [originalAmount, setOriginalAmount] = useState<number>(0)
  const [donationType, setDonationType] = useState<string>('')
  const [additionalAmount, setAdditionalAmount] = useState<number>(0)

  useEffect(() => {
    const amount = getStorageItem(STORAGE_KEYS.donationAmount)
    const type = getStorageItem(STORAGE_KEYS.donationType)
    if (amount) setOriginalAmount(Number(amount))
    if (type) setDonationType(type)
  }, [])

  const [selectedStory, setSelectedStory] = useState<ImpactStory>(stories[0])

  const handleAddAmount = (amount: number) => {
    const newTotal = originalAmount + amount
    setAdditionalAmount(amount)
    setStorageItem(STORAGE_KEYS.totalDonationAmount, newTotal.toString())
    setStorageItem(STORAGE_KEYS.additionalAmount, amount.toString())
    router.push(ROUTES.thankYou)
  }

  const handleSkip = () => {
    setStorageItem(STORAGE_KEYS.totalDonationAmount, originalAmount.toString())
    setStorageItem(STORAGE_KEYS.additionalAmount, '0')
    router.push(ROUTES.thankYou)
  }

  useEffect(() => {
    setSelectedStory(stories[Math.floor(Math.random() * stories.length)])
  }, [])

  return (
    <main 
      style={{ background: 'linear-gradient(180deg, #FAFAF7 0%, #CACAD7 100%)' }}
      className="min-h-screen py-12 px-4"
    >
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-near-white/20 rounded-full">
            <span className="text-6xl">💜</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-deep-navy">
            Your Impact is Immediate
          </h1>
          <p className="text-xl text-soft-charcoal">
            You just donated <span className="font-bold text-deep-navy">${originalAmount}</span>
          </p>
        </div>

        {/* AI Story Card */}
        <div className="bg-cream border-3 border-light-purple-gray rounded-xl p-8 shadow-2xl" style={{ boxShadow: '0 0 40px rgba(115, 115, 168, 0.3)' }}>
          <h2 className="text-2xl font-bold mb-6 text-deep-navy text-center">
            {selectedStory.title}
          </h2>
          <div className="space-y-4 text-soft-charcoal leading-relaxed">
            {selectedStory.content.map((paragraph, index) => (
              <p key={index} className={paragraph.startsWith('"') ? 'italic font-semibold text-lg' : ''}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Upsell Question */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-deep-navy mb-6">
            Would you like to extend your impact?
          </h2>
        </div>

        {/* Primary Upsell Options */}
        <div className="space-y-4">
          {UPSELL_OPTIONS.map(({ amount, label, description }) => (
            <button
              key={amount}
              onClick={() => handleAddAmount(amount)}
              className="w-full bg-near-white hover:bg-medium-purple/10 border-3 border-medium-purple hover:border-deep-navy p-6 rounded-xl transition-all hover:shadow-2xl hover:scale-[1.02] group"
            >
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-deep-navy group-hover:text-medium-purple transition-colors">
                  {label}
                </span>
                <span className="text-right text-soft-charcoal font-medium">
                  {description}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Optional Upsells */}
        <div className="border-t-2 border-light-purple-gray/50 pt-6 space-y-3">
          <p className="text-center text-sm text-soft-charcoal/80 font-semibold">Or add even more impact:</p>
          {OPTIONAL_UPSELLS.map(({ amount, label, description }) => (
            <button
              key={amount}
              onClick={() => handleAddAmount(amount)}
              className="w-full bg-near-white/60 hover:bg-near-white border-2 border-light-purple-gray p-4 rounded-lg transition-all hover:shadow-lg hover:scale-[1.01]"
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-deep-navy">{label}</span>
                <span className="text-sm text-soft-charcoal">{description}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Skip Option */}
        <div className="text-center pt-4">
          <button
            onClick={handleSkip}
            className="text-soft-charcoal hover:text-deep-navy underline text-lg font-medium transition-colors"
          >
            Continue anyways
          </button>
        </div>
      </div>
    </main>
  )
}
