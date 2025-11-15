import {
  Book,
  Building,
  Building2,
  Calendar,
  Clock,
  Facebook,
  Globe,
  Heart,
  Home,
  Instagram,
  Palette,
  Scale,
  Shield,
  Twitter,
  Users,
  Youtube,
} from 'lucide-react'

import type {
  DonationOption,
  EmergencyContact,
  Event,
  FooterColumn,
  Language,
  NavLink,
  OfficeInfo,
  Service,
  SocialLink,
  Stat,
  Testimonial,
  TrustIndicator,
} from './types'

/**
 * Application Constants
 * Centralized configuration values for the donation platform
 */

// Donation Tiers
export const ONE_TIME_TIERS = [
  { amount: 20, label: '$20', description: 'One meal + emergency kit' },
  { amount: 35, label: '$35', description: 'Safe night in shelter' },
  { amount: 50, label: '$50', description: 'Therapy session starter' },
  { amount: 100, label: '$100', description: 'Full day of care for mother & child' },
  { amount: 250, label: '$250', description: 'One week of stability' },
] as const;

export const MONTHLY_TIERS = [
  { amount: 10, label: '$10/month', description: 'Support-line response' },
  { amount: 25, label: '$25/month', description: 'Groceries for survivors' },
  { amount: 50, label: '$50/month', description: 'Monthly therapy session' },
  { amount: 100, label: '$100/month', description: 'Monthly safe-night fund' },
] as const;

// Upsell Options
export const UPSELL_OPTIONS = [
  { amount: 15, label: 'Add $15', description: 'Help her eat tomorrow' },
  { amount: 30, label: 'Add $30', description: 'Fund her emergency trauma session' },
  { amount: 50, label: 'Add $50', description: 'Give her another full day of protection' },
] as const;

export const OPTIONAL_UPSELLS = [
  { amount: 20, label: 'Add $20', description: 'Provide emergency clothing and essentials' },
  { amount: 75, label: 'Add $75', description: 'Support a full week of safety and meals' },
] as const;

// Donor Levels
export const DONOR_LEVELS = [
  { name: 'Shelter Guardian', minAmount: 0, maxAmount: 99, emoji: '🛡️', level: 1 },
  { name: 'Safety Ally', minAmount: 100, maxAmount: 499, emoji: '🤝', level: 2 },
  { name: 'Shelter Champion', minAmount: 500, maxAmount: 1999, emoji: '🏆', level: 3 },
  { name: 'Family Protector', minAmount: 2000, maxAmount: 4999, emoji: '👨‍👩‍👧', level: 4 },
  { name: 'Athena Protector', minAmount: 5000, maxAmount: Infinity, emoji: '⭐', level: 5 },
] as const;

// Social Proof Stats
export const ORGANIZATION_STATS = {
  womenSupported: '1,200+',
  hotlineAvailability: '24/7',
  yearsServing: '15+',
} as const;

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  { label: 'Emergency', number: '9-1-1', href: 'tel:911' },
  { label: 'S.O.S. Violence conjugale', number: '1-800-363-9010', href: 'tel:+18003639010' },
  { label: 'S.O.S. Violence conjugale (Montréal)', number: '514-873-9010', href: 'tel:+15148739010' },
  { label: 'Shield Montreal', number: '514-274-8117', href: 'tel:+15142748117' },
  { label: 'Shield Montreal Toll-free', number: '1-877-274-8117', href: 'tel:+18772748117' },
  { label: 'Shield Laval', number: '450-688-6584', href: 'tel:+14506886584' },
]

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', direction: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', direction: 'ltr' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', direction: 'ltr' },
  { code: 'hy', name: 'Armenian', nativeName: 'Հայերեն', direction: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', direction: 'ltr' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', direction: 'ltr' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', direction: 'ltr' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', direction: 'ltr' },
  { code: 'fa', name: 'Farsi', nativeName: 'فارسی', direction: 'rtl' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', direction: 'rtl' },
]

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Who We Are',
    href: '/who-we-are',
    dropdown: [
      { label: 'Vision & Mission', href: '/who-we-are#mission' },
      { label: 'Board of Directors', href: '/who-we-are#board' },
      { label: 'Awards & Recognition', href: '/who-we-are#awards' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    dropdown: [
      { label: 'Emergency Shelter', href: '/services/shelter' },
      { label: 'Individual Services', href: '/services/individual' },
      { label: 'Sexual Violence Support', href: '/services/sexual-violence' },
      { label: 'Community Outreach', href: '/services/outreach' },
    ],
  },
  {
    label: 'Get Involved',
    href: '/get-involved',
    dropdown: [
      { label: 'Donate', href: '/get-involved/donate' },
      { label: 'Volunteer', href: '/get-involved/volunteer' },
      { label: 'Events', href: '/get-involved/events' },
    ],
  },
  { label: 'Contact', href: '/contact' },
]

export const HERO_TRUST_INDICATORS: TrustIndicator[] = [
  { stat: '1,229+', label: 'Clients Helped Annually', icon: Users },
  { stat: '100', label: 'Women & Children Housed', icon: Home },
  { stat: '17+', label: 'Languages Spoken', icon: Globe },
  { stat: '34', label: 'Years of Service', icon: Calendar },
  { stat: 'Award-Winning', label: 'Awards & Recognition', icon: Shield },
  { stat: '24/7', label: 'Emergency Shelter Availability', icon: Clock },
]

export const QUICK_STATS: Stat[] = [
  { value: 1229, label: 'Clients Helped Annually', icon: 'users', suffix: '+' },
  { value: 100, label: 'Women & Children Housed', icon: 'home' },
  { value: 17, label: 'Languages Spoken', icon: 'globe', suffix: '+' },
  { value: 34, label: 'Years of Service', icon: 'calendar' },
  { value: 2, label: 'Offices & Facilities', icon: 'building' },
  { value: '24/7', label: 'Emergency Support', icon: 'clock', isString: true },
]

export const SERVICES: Service[] = [
  {
    title: 'Emergency Shelter',
    subtitle: "Athena's House",
  description: '24/7 safe housing for women and children fleeing violence. Confidential location with compassionate support.',
  icon: Home,
    badge: 'Available 24/7',
    ctaText: 'Learn More',
    ctaHref: '/services/shelter',
  },
  {
    title: 'Individual Services',
    subtitle: 'Montréal & Laval Offices',
  description: 'Free confidential counseling, legal clinic, home visits, and advocacy in 17+ languages.',
  icon: Heart,
    badge: 'Multilingual',
    ctaText: 'Explore Services',
    ctaHref: '/services/individual',
  },
  {
    title: 'Sexual Violence Support',
    subtitle: 'Specialized Care',
  description: 'Dedicated helplines and specialized support for victims of sexual violence with trauma-informed care.',
  icon: Shield,
    badge: 'Confidential',
    ctaText: 'Get Help',
    ctaHref: '/services/sexual-violence',
  },
  {
    title: 'Community Outreach',
    subtitle: 'Education & Prevention',
  description: 'Awareness sessions, publications, and multilingual programs reaching tens of thousands across cultural communities.',
  icon: Users,
    badge: 'Free Resources',
    ctaText: 'Learn More',
    ctaHref: '/services/outreach',
  },
  {
    title: 'Legal Clinic',
    subtitle: 'Free Legal Information',
  description: 'Supervised law students provide free information on family law, criminal law, and rights. McGill & UdeM partnerships.',
  icon: Scale,
    badge: 'Free',
    ctaText: 'Book Appointment',
    ctaHref: '/services/legal-clinic',
  },
  {
    title: 'Second Step Resource',
    subtitle: 'Transitional Housing',
  description: 'Longer-term housing with support services for women and children transitioning to independence.',
  icon: Building2,
    badge: '17 Units',
    ctaText: 'Learn More',
    ctaHref: '/services/second-step',
  },
]

export const PRIMARY_EVENT: Event = {
  title: '2025 Annual Lilac Gala',
  date: new Date('2025-11-29'),
  time: 'Evening',
  location: 'TBD',
  description:
    'Join us for an elegant evening supporting victims of conjugal and family violence. Features dinner, silent auction, live entertainment, and raffle.',
  ticketPrice: 175,
  ticketCurrency: 'CAD',
  ticketLink: 'https://www.zeffy.com/en-CA/ticketing/lilac-gala',
  sponsorshipEmail: 'evenement@bouclierdathena.com',
  sponsorshipPhone: '514-274-8117',
  image: '/images/lilac-gala-2025.jpg',
  features: [
    'Elegant Dinner',
    'Silent Auction',
    'Live Entertainment',
    'Luxury Prize Raffle',
    'Montreal Classical Orchestra',
  ],
}

export const DONATION_OPTIONS: DonationOption[] = [
  {
    title: 'One-Time Donation',
    description: 'Make an immediate impact with a single gift.',
    icon: Heart,
    ctaText: 'Donate Now',
    ctaHref: 'https://www.canadahelps.org/en/dn/27709',
    external: true,
  },
  {
    title: 'Monthly Giving',
    description: 'Provide sustained support with automatic monthly donations.',
    icon: Calendar,
    ctaText: 'Become a Monthly Donor',
    ctaHref: 'https://www.canadahelps.org/en/dn/27709',
    external: true,
    badge: 'Most Impact',
  },
  {
    title: 'Purchase Cookbook',
    description: 'Buy "Recipes and Stories from Athena\'s Kitchen" – all proceeds support our programs.',
    icon: Book,
    ctaText: 'Shop Now',
    ctaHref:
      'https://shield-of-athenas-art-sale-more.myshopify.com/collections/recipes-and-stories-from-athenas-kitchen',
    external: true,
  },
  {
    title: 'Purchase Artwork',
    description: 'Browse our art gallery – support local artists and our mission.',
    icon: Palette,
    ctaText: 'View Gallery',
    ctaHref: 'https://shield-of-athenas-art-sale-more.myshopify.com/',
    external: true,
  },
]

export const DONATION_IMPACT = [
  '$50 provides emergency supplies for one family',
  '$100 funds legal consultation',
  '$250 supports one night of shelter for a family',
]

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "You gave me the definition of what I was living. I am a victim of family violence. I'm not crazy.",
    attribution: 'Former Client',
    context: "Through Shield of Athena's multilingual services",
  },
  {
    quote:
      'The shelter provided safety when I had nowhere else to turn. The staff understood my culture and language.',
    attribution: 'Anonymous',
    context: "Athena's House Resident",
  },
  {
    quote:
      'The legal clinic gave me information about my rights. For the first time, I understood my options.',
    attribution: 'Service User',
    context: 'Legal Clinic Client',
  },
]

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Who We Are', href: '/who-we-are' },
      { label: 'Services', href: '/services' },
      { label: 'Get Involved', href: '/get-involved' },
      { label: 'Contact', href: '/contact' },
      { label: 'Publications', href: '/publications' },
      { label: 'Calendar', href: '/calendar' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Emergency Shelter', href: '/services/shelter' },
      { label: 'Individual Services', href: '/services/individual' },
      { label: 'Sexual Violence Support', href: '/services/sexual-violence' },
      { label: 'Community Outreach', href: '/services/outreach' },
      { label: 'Legal Clinic', href: '/services/legal-clinic' },
      { label: 'Second Step Resource', href: '/services/second-step' },
    ],
  },
  {
    title: 'Get Involved',
    links: [
      { label: 'Donate', href: '/get-involved/donate' },
      { label: 'Volunteer', href: '/get-involved/volunteer' },
      { label: 'Events', href: '/get-involved/events' },
      { label: 'Careers', href: '/get-involved/careers' },
      { label: 'Newsletter', href: '/newsletter' },
    ],
  },
]

export const OFFICE_LOCATIONS: OfficeInfo[] = [
  {
    name: 'Montréal Office',
    address: ['P.O. Box 25, Succursale Mont-Royal', 'Ville Mont-Royal, QC H3P 3B8'],
    phone: '514-274-8117',
    email: 'bouclierdathena@bellnet.ca',
  },
  {
    name: 'Laval Office',
    address: ['P.O. Box 89022, Succursale Place 100', 'Laval, QC H7W 5K2'],
    phone: '450-688-6584',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Facebook', url: 'https://facebook.com/theshieldofathena', icon: Facebook },
  { platform: 'Instagram', url: 'https://instagram.com/shieldofathena', icon: Instagram },
  { platform: 'Twitter', url: 'https://twitter.com/ShieldMontreal', icon: Twitter },
  { platform: 'YouTube', url: 'https://www.youtube.com/@ShieldofAthena', icon: Youtube },
]

// Impact Calculations
export const IMPACT_COST_PER_NIGHT = 35;

// Routes
export const ROUTES = {
  home: '/',
  donate: '/donate',
  upsell: '/upsell',
  thankYou: '/thankyou',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  donationAmount: 'donationAmount',
  donationType: 'donationType',
  totalDonationAmount: 'totalDonationAmount',
  additionalAmount: 'additionalAmount',
} as const;

