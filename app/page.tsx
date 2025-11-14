import SurvivorStoryCarousel from './components/SurvivorStoryCarousel'

export default function Landing() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dark-navy to-primary-purple text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Heros don't always wear capes, but they provide protection to those in need.
          </h1>
          <p className="text-xl md:text-2xl text-gray-200">
          Protect a Woman Tonight. Domestic violence doesn't wait for tomorrow. Your support gives safety, food, and hope — right now.
          </p>
          <div className="pt-4">
            <a href="/donate" className="bg-white text-primary-purple hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-bold transition-all duration-200 inline-block">
              Donate Now
            </a>
          </div>
        </div>
      </section>

      {/* Problem Unaware → Problem Aware */}
      <section className="py-16 px-4 bg-off-white">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Tonight, hundreds of women and children in Montréal will sleep in fear.
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-6xl mb-4">😰</p>
              <p className="text-xl font-semibold mb-2">No Safety</p>
              <p className="text-gray-600">Living in constant fear of violence</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-6xl mb-4">🚫</p>
              <p className="text-xl font-semibold mb-2">Nowhere to Go</p>
              <p className="text-gray-600">Trapped with no emergency shelter</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-6xl mb-4">💔</p>
              <p className="text-xl font-semibold mb-2">No Support</p>
              <p className="text-gray-600">Isolated and without resources</p>
            </div>
          </div>
          <div className="text-center pt-8">
            <p className="text-xl text-gray-700 mb-6">
              Many have nowhere to go. No safety. No food. No support.
            </p>
            <a href="/donate" className="btn-primary">
              Help Them Right Now
            </a>
            <p className="text-base text-primary-purple font-semibold mt-4 italic">
              You're the kind of person who doesn't look away.
            </p>
          </div>
        </div>
      </section>

      {/* Survivor Story Carousel */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-4xl mx-auto">
          <SurvivorStoryCarousel />
        </div>
      </section>

      {/* Solution Aware */}
      <section className="py-16 px-4 bg-off-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            Athena's House: A lifeline for survivors.
          </h2>
          <p className="text-xl text-center text-gray-700">
            We provide immediate, comprehensive support when it matters most.
          </p>
          
          {/* Social Proof Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 py-6">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary-purple">1,200+</p>
              <p className="text-gray-600 font-semibold mt-1">Women supported last year</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary-purple">24/7</p>
              <p className="text-gray-600 font-semibold mt-1">Emergency hotline available</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary-purple">15+</p>
              <p className="text-gray-600 font-semibold mt-1">Years serving Montréal</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-3 text-primary-purple">🏠 Emergency Shelters</h3>
              <p className="text-gray-600">Safe, secure beds available 24/7 for women and children escaping violence.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-3 text-primary-purple">🍲 Warm Meals</h3>
              <p className="text-gray-600">Nutritious food provided daily to ensure basic needs are met.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-3 text-primary-purple">🧠 Therapy & Trauma Support</h3>
              <p className="text-gray-600">Professional counseling to help heal and rebuild emotional well-being.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-3 text-primary-purple">⚖️ Legal Guidance</h3>
              <p className="text-gray-600">Expert legal support to navigate protection orders and custody issues.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
              <h3 className="text-2xl font-semibold mb-3 text-primary-purple">🌍 Multilingual Community Outreach</h3>
              <p className="text-gray-600">Support in multiple languages to serve Montreal's diverse community.</p>
            </div>
          </div>
          <div className="text-center pt-8">
            <a href="/donate" className="btn-primary text-lg">
              Provide a Night of Safety
            </a>
            <p className="text-base text-primary-purple font-semibold mt-4 italic">
              People like you protect women.
            </p>
          </div>
        </div>
      </section>

      {/* Product Aware / Funnel */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary-purple to-dark-navy text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Your donation creates a night of safety.
          </h2>
          <p className="text-xl text-center mb-8 text-gray-200">
            Every dollar directly supports a woman in need.
          </p>
          
          {/* Impact Badge */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/10 backdrop-blur-md border-2 border-yellow-400 rounded-lg px-6 py-4 shadow-lg max-w-2xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🟣</span>
                <span className="font-bold text-yellow-300 text-lg">80% of funds go directly to programs</span>
                <span className="text-green-400 text-xl">✓</span>
              </div>
              <p className="text-sm text-gray-300 text-center">
                The other 20% powers operations (staff, facilities, hotline)
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center border-2 border-white/20 hover:border-white/60 transition-all">
              <p className="text-5xl font-bold mb-4">$35</p>
              <p className="text-xl font-semibold mb-2">One Safe Night</p>
              <p className="text-gray-200">A warm bed in a secure shelter</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center border-2 border-white/20 hover:border-white/60 transition-all">
              <p className="text-5xl font-bold mb-4">$50</p>
              <p className="text-xl font-semibold mb-2">Therapy Starter Session</p>
              <p className="text-gray-200">Begin the healing journey</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center border-2 border-white/20 hover:border-white/60 transition-all">
              <p className="text-5xl font-bold mb-4">$100</p>
              <p className="text-xl font-semibold mb-2">Support for a Family</p>
              <p className="text-gray-200">Full day for mother & child</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <a href="/donate" className="bg-white text-primary-purple hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-bold transition-all duration-200 inline-block">
              Make Your Impact Today
            </a>
            <p className="text-base text-yellow-300 font-semibold mt-4 italic">
              You're the kind of person who doesn't look away.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-off-white">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Don't wait. Someone needs you tonight.
          </h2>
          <p className="text-xl text-gray-700">
            Your donation provides immediate safety, food, and hope.
          </p>
          <a href="/donate" className="btn-primary text-lg">
            Protect a Woman Tonight
          </a>
          <p className="text-base text-primary-purple font-semibold mt-4 italic">
            People like you protect women.
          </p>
        </div>
      </section>
    </main>
  )
}

