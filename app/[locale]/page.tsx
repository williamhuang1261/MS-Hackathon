import HeroSection from '@/app/components/HeroSection'
import DonationCTA from '@/app/components/DonationCTA'
import ImpactStories from '@/app/components/ImpactStories'
import QuickStats from '@/app/components/QuickStats'
import ServicesOverview from '@/app/components/ServicesOverview'
import UpcomingEvents from '@/app/components/UpcomingEvents'
import {
  DONATION_OPTIONS,
  HERO_TRUST_INDICATORS,
  PRIMARY_EVENT,
  QUICK_STATS,
  SERVICES,
  TESTIMONIALS,
} from '@/lib/constants'

export default function LandingPage() {
  const heroCtas = [
    { text: 'I Need Help Now', href: '#emergency-contacts', variant: 'destructive' as const },
    { text: 'Our Services', href: '#services', variant: 'default' as const },
    {
      text: 'Donate Now',
      href: 'https://www.canadahelps.org/en/dn/27709',
      variant: 'secondary' as const,
      external: true,
    },
  ]

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 py-16">
      {/* Hero Section - Solid background card */}
      <section className="rounded-3xl bg-card p-8 shadow-lg md:p-12">
        <HeroSection
          headline="Breaking the Cycle of Violence"
          subheadline="Award-winning multilingual support for women and children escaping domestic violence. 34 years of compassionate service in Montreal and Laval."
          ctaButtons={heroCtas}
          trustIndicators={HERO_TRUST_INDICATORS}
        />
      </section>

      {/* Social Proof / Stats - Solid background */}
      <section className="rounded-3xl bg-card p-8 shadow-lg md:p-12">
        <QuickStats stats={QUICK_STATS} animateOnView />
      </section>

      {/* About/Services Section - Solid background */}
      <section className="rounded-3xl bg-card p-8 shadow-lg md:p-12">
        <ServicesOverview services={SERVICES} />
      </section>

      {/* Lead Magnet / Events - Solid background */}
      <section className="rounded-3xl bg-card p-8 shadow-lg md:p-12">
        <UpcomingEvents primaryEvent={PRIMARY_EVENT} />
      </section>

      {/* Content Section / Testimonials - Solid background */}
      <section className="rounded-3xl bg-card p-8 shadow-lg md:p-12">
        <ImpactStories testimonials={TESTIMONIALS} />
      </section>

      {/* Final CTA - Solid background */}
      <section className="rounded-3xl bg-card p-8 shadow-lg md:p-12">
        <DonationCTA donationOptions={DONATION_OPTIONS} />
      </section>
    </main>
  )
}
