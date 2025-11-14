'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Upsell() {
  const router = useRouter()
  const [originalAmount, setOriginalAmount] = useState<number>(0)
  const [donationType, setDonationType] = useState<string>('')
  const [additionalAmount, setAdditionalAmount] = useState<number>(0)

  useEffect(() => {
    const amount = localStorage.getItem('donationAmount')
    const type = localStorage.getItem('donationType')
    if (amount) setOriginalAmount(Number(amount))
    if (type) setDonationType(type)
  }, [])

  const stories = [
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

  const [selectedStory] = useState(() => stories[Math.floor(Math.random() * stories.length)])

  const upsellOptions = [
    { amount: 15, label: 'Add $15', description: "Help her eat tomorrow" },
    { amount: 30, label: 'Add $30', description: 'Fund her emergency trauma session' },
    { amount: 50, label: 'Add $50', description: 'Give her another full day of protection' },
  ]

  const optionalUpsells = [
    { amount: 20, label: 'Add $20', description: 'Provide emergency clothing and essentials' },
    { amount: 75, label: 'Add $75', description: 'Support a full week of safety and meals' },
  ]

  const handleAddUpsell = (amount: number) => {
    setAdditionalAmount(prev => prev + amount)
  }

  const handleFinish = () => {
    const totalAmount = originalAmount + additionalAmount
    localStorage.setItem('totalDonationAmount', totalAmount.toString())
    localStorage.setItem('additionalAmount', additionalAmount.toString())
    router.push('/donate/thankyou')
  }

  const handleSkip = () => {
    localStorage.setItem('totalDonationAmount', originalAmount.toString())
    localStorage.setItem('additionalAmount', '0')
    router.push('/donate/thankyou')
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-purple">
            Your Impact is Immediate
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your ${originalAmount} {donationType} donation
          </p>
        </div>

        {/* Urgent Impact Story */}
        <div className="bg-gradient-to-br from-red-900 via-dark-navy to-black text-white p-8 md:p-10 rounded-lg shadow-2xl border-2 border-red-800/50">
          <div className="flex items-start space-x-3 mb-6">
            <span className="text-3xl">🚨</span>
            <div>
              <p className="text-sm uppercase tracking-widest text-red-300 font-bold mb-1">TONIGHT'S EMERGENCY</p>
              <h3 className="text-2xl md:text-3xl font-bold text-red-100">{selectedStory.title}</h3>
              <p className="text-xs text-gray-400 mt-1">(Name changed for privacy)</p>
            </div>
          </div>
          
          <div className="space-y-4 text-base md:text-lg leading-relaxed">
            {selectedStory.content.map((paragraph, index) => {
              // Check if this is a dialogue line
              const isDialogue = paragraph.startsWith('"')
              const isEmphasis = paragraph.includes('Your donation')
              
              return (
                <p 
                  key={index} 
                  className={`
                    ${isDialogue ? 'italic text-red-200 pl-4 border-l-4 border-red-500 font-semibold' : ''}
                    ${isEmphasis ? 'font-bold text-yellow-300 text-lg md:text-xl' : 'text-gray-100'}
                  `}
                >
                  {paragraph}
                </p>
              )
            })}
          </div>
          
          <div className="mt-8 p-6 bg-yellow-400/10 border-2 border-yellow-400/30 rounded-lg">
            <p className="text-center text-xl md:text-2xl font-bold text-yellow-300">
              Tonight, your kindness pulled her out of a nightmare.
            </p>
          </div>
        </div>

        {/* Additional Impact Prompt */}
        <div className="text-center space-y-3 py-4">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-navy">
            Can you help her survive tomorrow?
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            She made it through tonight. But she still needs food, counseling, and safety while she finds her next step.
          </p>
        </div>

        {/* Primary Upsell Options */}
        <div className="space-y-3">
          {upsellOptions.map(({ amount, label, description }) => (
            <button
              key={amount}
              onClick={() => handleAddUpsell(amount)}
              className="w-full bg-white border-2 border-red-300 hover:border-red-600 hover:shadow-xl hover:bg-red-50 p-6 rounded-lg flex justify-between items-center transition-all group"
            >
              <div className="text-left flex-1">
                <span className="text-2xl font-bold text-red-700 block mb-1">{label}</span>
                <span className="text-gray-700 font-medium">{description}</span>
              </div>
              <div className="flex flex-col items-center ml-4">
                <span className="text-4xl group-hover:scale-125 transition-transform">🛡️</span>
                <span className="text-xs text-gray-500 mt-1">Add now</span>
              </div>
            </button>
          ))}
        </div>

        {/* Optional Additional Upsells */}
        <div className="border-t-2 border-gray-300 pt-6 space-y-3">
          <p className="text-center text-gray-700 font-semibold text-lg">Every dollar extends her safety:</p>
          {optionalUpsells.map(({ amount, label, description }) => (
            <button
              key={amount}
              onClick={() => handleAddUpsell(amount)}
              className="w-full bg-white border border-gray-400 hover:border-primary-purple hover:shadow-md hover:bg-purple-50 p-5 rounded-lg flex justify-between items-center transition-all"
            >
              <div className="text-left">
                <span className="font-bold text-primary-purple block text-lg">{label}</span>
                <span className="text-gray-600">{description}</span>
              </div>
              <span className="text-3xl">➕</span>
            </button>
          ))}
        </div>

        {/* Current Total Display */}
        {additionalAmount > 0 && (
          <div className="bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-600 p-6 rounded-lg text-center shadow-lg">
            <p className="text-sm uppercase tracking-wide text-green-800 mb-2">✓ Additional Life-Saving Support</p>
            <p className="text-5xl font-bold text-green-700 mb-2">+${additionalAmount}</p>
            <div className="bg-white/60 rounded-lg p-3 mt-3">
              <p className="text-gray-800">
                New total impact: <span className="font-bold text-green-800 text-xl">${originalAmount + additionalAmount}</span>
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            onClick={handleFinish}
            className={`flex-1 py-4 rounded-lg font-bold text-lg transition-all ${
              additionalAmount > 0
                ? 'bg-primary-purple text-white hover:bg-[#5d5d8f] shadow-lg'
                : 'bg-gray-300 text-gray-600'
            }`}
          >
            {additionalAmount > 0 
              ? `Complete ${donationType === 'one-time' ? 'Donation' : 'Monthly Pledge'}: $${originalAmount + additionalAmount}`
              : 'Continue to Thank You'}
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={handleSkip}
            className="text-primary-purple hover:underline font-medium"
          >
            No thanks, finish donation
          </button>
        </div>
      </div>
    </main>
  )
}

