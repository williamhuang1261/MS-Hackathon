/**
 * Landing Page Component
 * Main entry point showing problem-aware to product-aware funnel
 */

import SurvivorStoryCarousel from './components/SurvivorStoryCarousel';
import { ORGANIZATION_STATS } from '@/lib/constants';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        style={{ background: 'linear-gradient(160deg, #4B1F66 0%, #C6B1E7 100%)' }}
        className="text-white py-20 px-4"
      >
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-snow-white">
            Heros don't always wear capes, but they provide protection to those in need.
          </h1>
          <p className="text-xl md:text-2xl text-warm-white">
            Protect a Woman Tonight. Domestic violence doesn't wait for tomorrow. Your support
            gives safety, food, and hope — right now.
          </p>
          <div className="pt-4">
            <a
              href="/donate"
              className="bg-hope-gold text-soft-charcoal hover:bg-[#f5d785] px-8 py-4 rounded-lg text-lg font-bold transition-all duration-200 inline-block"
            >
              Donate Now
            </a>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-snow-white">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-athena-violet">
            Tonight, hundreds of women and children in Montréal will sleep in fear.
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { emoji: '😰', title: 'No Safety', description: 'Living in constant fear of violence' },
              { emoji: '🚫', title: 'Nowhere to Go', description: 'Trapped with no emergency shelter' },
              { emoji: '💔', title: 'No Support', description: 'Isolated and without resources' },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md border border-warm-blush/30"
              >
                <p className="text-6xl mb-4 text-warm-blush">{item.emoji}</p>
                <p className="text-xl font-semibold mb-2 text-athena-violet">{item.title}</p>
                <p className="text-soft-charcoal/80">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center pt-8">
            <p className="text-xl text-soft-charcoal mb-6">
              Many have nowhere to go. No safety. No food. No support.
            </p>
            <a
              href="/donate"
              className="bg-hope-gold text-soft-charcoal hover:bg-[#f5d785] px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-block"
            >
              Help Them Right Now
            </a>
            <p className="text-base text-athena-violet font-semibold mt-4 italic">
              You're the kind of person who doesn't look away.
            </p>
          </div>
        </div>
      </section>

      {/* Survivor Story Carousel */}
      <section className="py-16 px-4 bg-lavender-mist/20">
        <div className="max-w-4xl mx-auto">
          <SurvivorStoryCarousel />
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4 bg-snow-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-athena-violet">
            Athena's House: A lifeline for survivors.
          </h2>
          <p className="text-xl text-center text-soft-charcoal">
            We provide immediate, comprehensive support when it matters most.
          </p>

          {/* Social Proof Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 py-6">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-athena-violet">
                {ORGANIZATION_STATS.womenSupported}
              </p>
              <p className="text-soft-charcoal/80 font-semibold mt-1">Women supported last year</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-athena-violet">
                {ORGANIZATION_STATS.hotlineAvailability}
              </p>
              <p className="text-soft-charcoal/80 font-semibold mt-1">
                Emergency hotline available
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-athena-violet">
                {ORGANIZATION_STATS.yearsServing}
              </p>
              <p className="text-soft-charcoal/80 font-semibold mt-1">Years serving Montréal</p>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {[
              { icon: '🏠', title: 'Emergency Shelters', desc: 'Safe, secure beds available 24/7 for women and children escaping violence.' },
              { icon: '🍲', title: 'Warm Meals', desc: 'Nutritious food provided daily to ensure basic needs are met.' },
              { icon: '🧠', title: 'Therapy & Trauma Support', desc: 'Professional counseling to help heal and rebuild emotional well-being.' },
              { icon: '⚖️', title: 'Legal Guidance', desc: 'Expert legal support to navigate protection orders and custody issues.' },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-lavender-mist/40"
              >
                <h3 className="text-2xl font-semibold mb-3 text-athena-violet">
                  {service.icon} {service.title}
                </h3>
                <p className="text-soft-charcoal/80">{service.desc}</p>
              </div>
            ))}
            <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2 border border-lavender-mist/40">
              <h3 className="text-2xl font-semibold mb-3 text-athena-violet">
                🌍 Multilingual Community Outreach
              </h3>
              <p className="text-soft-charcoal/80">
                Support in multiple languages to serve Montreal's diverse community.
              </p>
            </div>
          </div>

          <div className="text-center pt-8">
            <a
              href="/donate"
              className="bg-hope-gold text-soft-charcoal hover:bg-[#f5d785] px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-block text-lg"
            >
              Provide a Night of Safety
            </a>
            <p className="text-base text-athena-violet font-semibold mt-4 italic">
              People like you protect women.
            </p>
          </div>
        </div>
      </section>

      {/* Product Aware / Funnel */}
      <section
        style={{ background: 'linear-gradient(160deg, #4B1F66 0%, #C6B1E7 100%)' }}
        className="py-16 px-4 text-white"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-snow-white">
            Your donation creates a night of safety.
          </h2>
          <p className="text-xl text-center mb-8 text-warm-white">
            Every dollar directly supports a woman in need.
          </p>

          {/* Impact Badge */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/10 backdrop-blur-md border-2 border-hope-gold rounded-lg px-6 py-4 shadow-lg max-w-2xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🟣</span>
                <span className="font-bold text-hope-gold text-lg">
                  80% of funds go directly to programs
                </span>
                <span className="text-hope-green text-xl">✓</span>
              </div>
              <p className="text-sm text-warm-white text-center">
                The other 20% powers operations (staff, facilities, hotline)
              </p>
            </div>
          </div>

          {/* Donation Tiers */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { amount: '$35', title: 'One Safe Night', desc: 'A warm bed in a secure shelter' },
              { amount: '$50', title: 'Therapy Starter Session', desc: 'Begin the healing journey' },
              { amount: '$100', title: 'Support for a Family', desc: 'Full day for mother & child' },
            ].map((tier, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center border-2 border-white/20 hover:border-hope-gold/60 transition-all"
              >
                <p className="text-5xl font-bold mb-4 text-hope-gold">{tier.amount}</p>
                <p className="text-xl font-semibold mb-2 text-snow-white">{tier.title}</p>
                <p className="text-warm-white">{tier.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/donate"
              className="bg-hope-gold text-soft-charcoal hover:bg-[#f5d785] px-8 py-4 rounded-lg text-lg font-bold transition-all duration-200 inline-block"
            >
              Make Your Impact Today
            </a>
            <p className="text-base text-hope-gold font-semibold mt-4 italic">
              You're the kind of person who doesn't look away.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-snow-white">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-athena-violet">
            Don't wait. Someone needs you tonight.
          </h2>
          <p className="text-xl text-soft-charcoal">
            Your donation provides immediate safety, food, and hope.
          </p>
          <a
            href="/donate"
            className="bg-hope-gold text-soft-charcoal hover:bg-[#f5d785] px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-block text-lg"
          >
            Protect a Woman Tonight
          </a>
          <p className="text-base text-athena-violet font-semibold mt-4 italic">
            People like you protect women.
          </p>
        </div>
      </section>
    </main>
  );
}

