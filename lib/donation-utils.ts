// Donation tier definitions
export type CertificateTier = 'supporter' | 'community-builder' | 'safety-champion' | 'founders-circle' | 'changemaker'

export interface DonationTier {
  min: number
  max: number
  title: string
  benefits: string[]
  certificateTier: CertificateTier
  certificateColor: string
  certificateTitle: string
}

export interface ImpactCalculation {
  amount: number
  nights: number
  counselingSessions: number
  meals: number
  description: string
  tier: DonationTier
}

// Certificate tier definitions
export const CERTIFICATE_TIERS: Record<CertificateTier, { color: string; title: string; bgColor: string }> = {
  'supporter': {
    color: '#9333EA', // Purple
    title: 'Supporter Certificate',
    bgColor: '#F3E8FF'
  },
  'community-builder': {
    color: '#1E3A8A', // Navy
    title: 'Community Builder Certificate',
    bgColor: '#DBEAFE'
  },
  'safety-champion': {
    color: '#F5F5DC', // Cream/Beige
    title: 'Safety Champion Certificate',
    bgColor: '#FEF3C7'
  },
  'founders-circle': {
    color: '#D97706', // Gold
    title: "Founder's Circle Certificate",
    bgColor: '#FEF3C7'
  },
  'changemaker': {
    color: '#A3A3A3', // Platinum/Silver
    title: 'Changemaker Certificate',
    bgColor: '#F5F5F5'
  }
}

// Donation tier ranges with benefits
export const DONATION_TIERS: DonationTier[] = [
  {
    min: 10,
    max: 24,
    title: 'Supporter',
    benefits: ['1 night of meals', 'Children\'s care supplies'],
    certificateTier: 'supporter',
    certificateColor: '#9333EA',
    certificateTitle: 'Supporter Certificate'
  },
  {
    min: 25,
    max: 74,
    title: 'Community Builder',
    benefits: ['2-3 nights of shelter', '1 counseling session', 'Children\'s care'],
    certificateTier: 'community-builder',
    certificateColor: '#1E3A8A',
    certificateTitle: 'Community Builder Certificate'
  },
  {
    min: 75,
    max: 99,
    title: 'One Night of Safety',
    benefits: ['1 night of shelter', '1 counseling session', 'Children\'s care'],
    certificateTier: 'community-builder',
    certificateColor: '#1E3A8A',
    certificateTitle: 'Community Builder Certificate'
  },
  {
    min: 100,
    max: 249,
    title: 'Week of Transformation',
    benefits: ['7 nights shelter', 'Job training workshop', 'Legal consultation'],
    certificateTier: 'safety-champion',
    certificateColor: '#F5F5DC',
    certificateTitle: 'Safety Champion Certificate'
  },
  {
    min: 250,
    max: 499,
    title: 'Safety Champion',
    benefits: ['2 weeks shelter', '5 counseling sessions', 'Job training', 'Legal support'],
    certificateTier: 'safety-champion',
    certificateColor: '#F5F5DC',
    certificateTitle: 'Safety Champion Certificate'
  },
  {
    min: 500,
    max: 999,
    title: 'Month of Stability',
    benefits: ['30 days shelter', 'Mental health support', 'Childcare', 'Job training'],
    certificateTier: 'founders-circle',
    certificateColor: '#D97706',
    certificateTitle: "Founder's Circle Certificate"
  },
  {
    min: 1000,
    max: Infinity,
    title: 'Changemaker',
    benefits: ['2+ months shelter', 'Comprehensive support', 'Family counseling', 'Career placement'],
    certificateTier: 'changemaker',
    certificateColor: '#A3A3A3',
    certificateTitle: 'Changemaker Certificate'
  }
]

// Calculate impact based on donation amount
export function calculateImpact(amount: number): ImpactCalculation {
  // Find the appropriate tier
  const tier = DONATION_TIERS.find(t => amount >= t.min && amount <= t.max) || DONATION_TIERS[DONATION_TIERS.length - 1]
  
  // Calculate specific impacts (rough estimates)
  const nights = Math.floor(amount / 75) // $75 per night
  const counselingSessions = Math.floor(amount / 50) // $50 per session
  const meals = Math.floor(amount / 5) // $5 per meal
  
  // Generate description
  let description = ''
  if (amount >= 1000) {
    description = `${Math.floor(amount / 500)} months of complete shelter, mental health support, childcare, and career training for a family`
  } else if (amount >= 500) {
    description = `${nights} nights of shelter, comprehensive mental health support, and childcare for a family in need`
  } else if (amount >= 100) {
    description = `${nights} nights of shelter, ${counselingSessions} counseling sessions, and job training workshops`
  } else if (amount >= 75) {
    description = `${nights} night${nights > 1 ? 's' : ''} of shelter, counseling session, and children's care`
  } else if (amount >= 25) {
    description = `${Math.floor(amount / 25)} nights of meals and children's care supplies`
  } else {
    description = `meals and essential supplies for families in crisis`
  }
  
  return {
    amount,
    nights,
    counselingSessions,
    meals,
    description,
    tier
  }
}

// Get certificate tier for amount
export function getCertificateTier(amount: number): CertificateTier {
  if (amount >= 1000) return 'changemaker'
  if (amount >= 250) return 'founders-circle'
  if (amount >= 100) return 'safety-champion'
  if (amount >= 25) return 'community-builder'
  return 'supporter'
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Generate certificate ID
export function generateCertificateId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 7)
  return `SOA-${timestamp}-${random}`.toUpperCase()
}

// Share text generator
export function generateShareText(amount: number, tier: CertificateTier): string {
  const tierNames: Record<CertificateTier, string> = {
    'supporter': 'Supporter',
    'community-builder': 'Community Builder',
    'safety-champion': 'Safety Champion',
    'founders-circle': "Founder's Circle",
    'changemaker': 'Changemaker'
  }
  
  const date = new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
  
  return `🏠 I just became a ${tierNames[tier]} for Shield of Athena Family Services! 💜\n\nMy donation of ${formatCurrency(amount)} helps provide shelter and support for women and children escaping domestic violence.\n\nJoin me in making a difference: [donation link]\n\n#ShieldOfAthena #EndDomesticViolence #MontrealCares\n${date}`
}
