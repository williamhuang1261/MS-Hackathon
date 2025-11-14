# Athena's House - Donation Platform

A modern, conversion-optimized donation platform for Athena's House, a domestic violence shelter in Montréal.

## Features

### 🎯 Complete Donation Flow
- **Landing Page**: Problem-aware to product-aware marketing funnel
- **Donation Page**: One-time and monthly donation tiers
- **Upsell Page**: AI-generated impact stories with additional donation options
- **Thank You Page**: Gamification, donor levels, and impact summary

### 🎨 Design
- Modern UI using Tailwind CSS
- Custom color palette: Navy (#1C1A37), Purple (#7373A8), Cream (#FAFAF7)
- Fully responsive design
- Smooth transitions and hover effects

### 💡 Key Features
- Multiple donation tiers ($20 - $250 one-time, $10 - $100 monthly)
- Real-time impact stories
- Donor gamification levels (Shelter Guardian → Athena Protector)
- Post-donation upsells
- Tax-deductible receipt display

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks + localStorage

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Page Routes

- `/` - Landing page
- `/donate` - Donation selection page
- `/donate/upsell` - Post-donation upsell page
- `/donate/thankyou` - Thank you and receipt page

## Donation Tiers

### One-Time Donations
- $20 - One meal + emergency kit
- $35 - Safe night in shelter
- $50 - Therapy session starter
- $100 - Full day of care for mother & child
- $250 - One week of stability

### Monthly Donations
- $10/month - Support-line response
- $25/month - Groceries for survivors
- $50/month - Monthly therapy session
- $100/month - Monthly safe-night fund

## Donor Gamification Levels

- 🛡️ **Shelter Guardian**: $0 - $99
- 🤝 **Safety Ally**: $100 - $499
- 🏆 **Shelter Champion**: $500 - $1,999
- 👨‍👩‍👧 **Family Protector**: $2,000 - $4,999
- ⭐ **Athena Protector**: $5,000+

## Notes

- This is a **UI-only demo** - no actual payment processing is implemented
- Donation amounts are stored in localStorage for demo purposes
- In production, integrate with Stripe, PayPal, or other payment processors
- Add backend API for donation processing and receipt generation
- Implement proper email notifications

## Future Enhancements

- Real payment gateway integration
- User authentication and donor portal
- Donation history tracking
- Email receipt automation
- Social sharing functionality
- A/B testing for conversion optimization

## License

© 2025 Athena's House. All rights reserved.

