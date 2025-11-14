'use client'

import { useState } from 'react'

export default function StoryTeaseSignup() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would connect to an email service
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail('')
    }, 3000)
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-primary-purple/5 to-dark-navy/10">
      <div className="max-w-3xl mx-auto">
        {/* Story Tease */}
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 inline-block">💜</span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark-navy mb-4">
            Tomorrow, Amina will wake up safe because of you.
          </h2>
          <p className="text-xl text-gray-700 italic">
            Her journey continues — and you are part of it.
          </p>
        </div>

        {/* Email Signup */}
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-10 border-2 border-primary-purple/20">
          <h3 className="text-2xl font-bold text-center mb-3 text-primary-purple">
            Stay Connected to Your Impact
          </h3>
          <p className="text-center text-gray-600 mb-6">
            Get monthly updates about Amina and other sheltered women. See how your support continues to save lives.
          </p>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-purple text-lg"
              />
              <button
                type="submit"
                className="bg-primary-purple hover:bg-[#5d5d8f] text-white px-8 py-3 rounded-lg font-bold transition-all duration-200 whitespace-nowrap"
              >
                Get Updates
              </button>
            </form>
          ) : (
            <div className="bg-green-100 border-2 border-green-600 rounded-lg p-4 text-center animate-fadeIn">
              <span className="text-3xl mb-2 inline-block">✓</span>
              <p className="text-green-800 font-semibold">
                Thank you! You'll receive your first update soon.
              </p>
            </div>
          )}
          
          <p className="text-xs text-gray-500 text-center mt-4">
            We respect your privacy. Unsubscribe anytime. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  )
}

