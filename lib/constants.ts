/**
 * Application Constants
 * Centralized configuration values for the donation platform
 */

// Donation Tiers
export const ONE_TIME_TIERS = [
  { amount: 20, label: "$20", description: "One meal + emergency kit" },
  { amount: 35, label: "$35", description: "Safe night in shelter" },
  { amount: 50, label: "$50", description: "Therapy session starter" },
  {
    amount: 100,
    label: "$100",
    description: "Full day of care for mother & child",
  },
  { amount: 250, label: "$250", description: "One week of stability" },
] as const;

export const MONTHLY_TIERS = [
  { amount: 10, label: "$10/month", description: "Support-line response" },
  { amount: 25, label: "$25/month", description: "Groceries for survivors" },
  { amount: 50, label: "$50/month", description: "Monthly therapy session" },
  { amount: 100, label: "$100/month", description: "Monthly safe-night fund" },
] as const;

// Upsell Options
export const UPSELL_OPTIONS = [
  { amount: 15, label: "Add $15", description: "Help her eat tomorrow" },
  {
    amount: 30,
    label: "Add $30",
    description: "Fund her emergency trauma session",
  },
] as const;

export const OPTIONAL_UPSELLS = [
  {
    amount: 20,
    label: "Add $20",
    description: "Provide emergency clothing and essentials",
  },
  {
    amount: 75,
    label: "Add $75",
    description: "Support a full week of safety and meals",
  },
] as const;

// Donor Levels
export const DONOR_LEVELS = [
  {
    name: "Shelter Guardian",
    minAmount: 0,
    maxAmount: 99,
    emoji: "🛡️",
    level: 1,
  },
  {
    name: "Safety Ally",
    minAmount: 100,
    maxAmount: 499,
    emoji: "🤝",
    level: 2,
  },
  {
    name: "Shelter Champion",
    minAmount: 500,
    maxAmount: 1999,
    emoji: "🏆",
    level: 3,
  },
  {
    name: "Family Protector",
    minAmount: 2000,
    maxAmount: 4999,
    emoji: "👨‍👩‍👧",
    level: 4,
  },
  {
    name: "Athena Protector",
    minAmount: 5000,
    maxAmount: Infinity,
    emoji: "⭐",
    level: 5,
  },
] as const;

// Social Proof Stats
export const ORGANIZATION_STATS = {
  womenSupported: "1,200+",
  hotlineAvailability: "24/7",
  yearsServing: "15+",
} as const;

// Impact Calculations
export const IMPACT_COST_PER_NIGHT = 35;

// Routes
export const ROUTES = {
  home: "/",
  donate: "/donate",
  upsell: "/upsell",
  thankYou: "/thankyou",
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  donationAmount: "donationAmount",
  donationType: "donationType",
  totalDonationAmount: "totalDonationAmount",
  additionalAmount: "additionalAmount",
} as const;


