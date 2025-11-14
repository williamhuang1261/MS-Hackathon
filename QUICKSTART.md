# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Testing the Full Flow

1. **Landing Page** (`/`)
   - Scroll through the problem-aware marketing funnel
   - Click any "Donate Now" CTA button

2. **Donation Page** (`/donate`)
   - Toggle between One-Time and Monthly donations
   - Select a preset tier or enter a custom amount
   - Click "Complete Donation"

3. **Upsell Page** (`/donate/upsell`)
   - View the AI-generated impact story
   - Add optional upsells ($15 meal, $30 therapy, $50 safety day)
   - Either add more or skip to finish

4. **Thank You Page** (`/donate/thankyou`)
   - See your impact summary
   - View your donor level and progress
   - Share your support or join the Athena Circle

## 🎨 Color Palette Used

- **Dark Navy**: `#1C1A37` - Headers, navigation
- **Primary Purple**: `#7373A8` - CTAs, accents
- **Light Purple**: `#CACAD7` - Subtle backgrounds
- **Cream**: `#FAFAF7` - Main background
- **Off White**: `#FDFDFE` - Card backgrounds

## 💡 Key Features to Demo

✅ **Responsive Design** - Test on mobile, tablet, desktop
✅ **Smooth Transitions** - Hover effects on buttons and cards
✅ **State Persistence** - Donation amounts carry through the flow
✅ **Gamification** - Donor levels update based on total amount
✅ **Impact Stories** - Dynamic content on upsell page
✅ **Multiple CTAs** - Conversion-optimized button placement

## 🛠️ Customization Tips

### Update Copy
- Edit text directly in the page files under `/app`

### Change Colors
- Modify `tailwind.config.ts` and `app/globals.css`

### Add New Tiers
- Edit the tier arrays in `/app/donate/page.tsx`

### Modify Donor Levels
- Update logic in `/app/donate/thankyou/page.tsx`

## 📊 Conversion Optimization Features

1. **Multiple CTAs** - Repeated throughout landing page
2. **Social Proof** - Impact stories and real examples
3. **Urgency** - "Tonight" messaging throughout
4. **Specific Impact** - Clear description of what each dollar does
5. **Upsell Flow** - Post-donation engagement
6. **Gamification** - Donor levels encourage larger gifts
7. **Progress Bars** - Visual feedback on donor level progress

## 🔧 Technical Notes

- **Framework**: Next.js 14 with App Router
- **No Backend Required**: This is a frontend-only demo
- **LocalStorage**: Used for demo state management
- **No Payment Processing**: Ready for Stripe/PayPal integration

## 📞 Need Help?

For technical issues, check:
- Node.js version (requires 18+)
- npm installation completed successfully
- Port 3000 is available

---

**Built for the MS Hackathon - Athena's House Donation Platform**

