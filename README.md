# Athena's House - Donation Platform

A modern, conversion-optimized donation platform for Athena's House, a domestic violence shelter in Montréal.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── DonorBadge.tsx
│   ├── NotificationBanner.tsx
│   ├── StoryTeaseSignup.tsx
│   └── SurvivorStoryCarousel.tsx
├── pages/              # Page components
│   ├── landing.tsx     # Landing page
│   ├── donate.tsx      # Donation selection
│   ├── upsell.tsx      # Post-donation upsell
│   └── thankyou.tsx    # Thank you & receipt
├── donate/             # Route structure
│   ├── page.tsx
│   ├── upsell/
│   │   └── page.tsx
│   └── thankyou/
│       └── page.tsx
├── page.tsx            # Home route
├── layout.tsx          # Root layout
└── globals.css         # Global styles

lib/
├── constants.ts        # App constants
├── types.ts           # TypeScript types
└── utils.ts           # Utility functions
```

## ✨ Features

- **Full 4-page donation flow**
  - Landing page with problem-aware funnel
  - Donation selection (one-time & monthly)
  - Post-donation upsell with impact stories
  - Thank you page with gamification

- **Trauma-Informed Design**
  - Athena Violet & Hope Gold color palette
  - DM Serif Display for headings
  - Inter for body text
  - Warm, safe visual language

- **Conversion Optimization**
  - Real-time donor notifications
  - Enhanced selection states with hover tooltips
  - Animated checkmarks and progress bars
  - Donor gamification (5 levels)
  - Story carousel with survivor testimonials
  - Post-donation email capture

- **Clean Code Architecture**
  - Centralized constants and utilities
  - TypeScript throughout
  - Separation of concerns
  - Reusable components

## 💰 Donation Tiers

### One-Time
- $20 - One meal + emergency kit
- $35 - Safe night in shelter
- $50 - Therapy session starter
- $100 - Full day of care for mother & child
- $250 - One week of stability

### Monthly
- $10/month - Support-line response
- $25/month - Groceries for survivors
- $50/month - Monthly therapy session
- $100/month - Monthly safe-night fund

## 🏆 Donor Levels

- 🛡️ **Shelter Guardian**: $0 - $99
- 🤝 **Safety Ally**: $100 - $499
- 🏆 **Shelter Champion**: $500 - $1,999
- 👨‍👩‍👧 **Family Protector**: $2,000 - $4,999
- ⭐ **Athena Protector**: $5,000+

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: DM Serif Display + Inter

## 📝 Notes

- This is a UI-only demo (no payment processing)
- Donation amounts stored in localStorage
- Ready for integration with Stripe/PayPal

## 📄 License

© 2025 Athena's House. All rights reserved.

