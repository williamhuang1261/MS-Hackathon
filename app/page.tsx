import HeroSection from './components/HeroSection'
import DonationCTA from './components/DonationCTA'
import DonationPlans from './components/DonationPlans'
import ImpactStories from './components/ImpactStories'
import QuickStats from './components/QuickStats'
import ServicesOverview from './components/ServicesOverview'
import UpcomingEvents from './components/UpcomingEvents'
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
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-12">
      <HeroSection
        headline="Breaking the Cycle of Violence"
        subheadline="Award-winning multilingual support for women and children escaping domestic violence. 34 years of compassionate service in Montreal and Laval."
        ctaButtons={heroCtas}
        trustIndicators={HERO_TRUST_INDICATORS}
      />

      <DonationPlans />

      <QuickStats stats={QUICK_STATS} animateOnView />

      <ServicesOverview services={SERVICES} />

      <UpcomingEvents primaryEvent={PRIMARY_EVENT} />

      <DonationCTA donationOptions={DONATION_OPTIONS} />

      <ImpactStories testimonials={TESTIMONIALS} />
    </main>
  )
}
