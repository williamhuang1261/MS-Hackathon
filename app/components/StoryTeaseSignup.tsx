'use client'

import { useState, FormEvent } from 'react'

export default function StoryTeaseSignup() {
  const [email, setEmail] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    // In production, this would connect to an email service
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail('')
    }, 3000)
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-lavender-mist/20 to-warm-blush/10">
      <div className="max-w-3xl mx-auto">
        {/* Story Tease */}
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 inline-block">💜</span>
          <h2 className="text-3xl md:text-4xl font-bold text-athena-violet mb-4">
            Tomorrow, Amina will wake up safe because of you.
          </h2>
          <p className="text-xl text-soft-charcoal italic">
            Her journey continues — and you are part of it.
          </p>
        </div>

        {/* Email Signup */}
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-10 border-2 border-athena-violet/20">
          <h3 className="text-2xl font-bold text-center mb-3 text-athena-violet">
            Stay Connected to Your Impact
          </h3>
          <p className="text-center text-soft-charcoal/80 mb-6">
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
                className="flex-1 px-4 py-3 border-2 border-confidence-blue rounded-lg focus:outline-none focus:border-athena-violet focus:ring-2 focus:ring-athena-violet/30 text-lg text-soft-charcoal"
              />
              <button
                type="submit"
                className="bg-athena-violet hover:bg-[#5a2877] text-white px-8 py-3 rounded-lg font-bold transition-all duration-200 whitespace-nowrap"
              >
                Get Updates
              </button>
            </form>
          ) : (
            <div className="bg-hope-green/20 border-2 border-hope-green rounded-lg p-4 text-center animate-fadeIn">
              <span className="text-3xl mb-2 inline-block">✓</span>
              <p className="text-athena-violet font-semibold">
                Thank you! You'll receive your first update soon.
              </p>
            </div>
          )}
          
          <p className="text-xs text-soft-charcoal/60 text-center mt-4">
            We respect your privacy. Unsubscribe anytime. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  )
}
