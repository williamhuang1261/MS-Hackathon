# Lotus Visualization Component - Standalone Package

A beautiful, self-contained React component that displays fundraising progress as a growing lotus flower.

## 📦 What's Included

```
lotus-standalone/
├── LotusVisualization.tsx    - Main visualization component
├── LotusFlower.tsx           - Canvas-based lotus renderer
├── flower-renderer.js        - Drawing engine
├── lotus-designs.js          - 12 growth stages (seed to full bloom)
├── confetti.js               - Celebration effects
└── README.md                 - This file
```

## 🌸 Features

- **Dynamic Growth**: Lotus progresses through 12 stages from seed ($0) to full bloom ($100K)
- **Progress Bar**: Minimalistic bar showing fundraising progress
- **Info Tooltip**: Interactive info icon explaining lotus symbolism
- **Celebration Effects**: Optional confetti animation on milestones
- **Fully Responsive**: Mobile-first design, works on all devices
- **Self-Contained**: All logic and state managed internally

## 🚀 Quick Start

### 1. Copy Files to Your Project

```bash
# Copy all files to your components directory
cp -r lotus-standalone/* your-project/components/lotus/
```

### 2. Install Dependencies

```bash
npm install react
```

### 3. Use the Component

```tsx
import LotusVisualization from '@/components/lotus/LotusVisualization';

function MyFundraisingPage() {
  const [donationTotal, setDonationTotal] = useState(25000);
  const [showCelebration, setShowCelebration] = useState(false);

  return (
    <LotusVisualization 
      totalAmount={donationTotal}
      goalAmount={100000}
      showCelebration={showCelebration}
      size={400}
    />
  );
}
```

## 📖 Component API

### LotusVisualization

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `totalAmount` | `number` | Required | Current fundraising total in dollars |
| `goalAmount` | `number` | `100000` | Fundraising goal in dollars |
| `showCelebration` | `boolean` | `false` | Trigger confetti celebration effect |
| `size` | `number` | `400` | Canvas size in pixels (width/height) |

## 🌱 Growth Stages

| Stage | Amount Range | Name | Visual |
|-------|-------------|------|--------|
| 0 | $0-999 | Seed | Brown seed in soil |
| 1 | $1K-9.9K | Sprout | Tiny green sprout |
| 2 | $10K-19.9K | Seedling | Small leaves appearing |
| 3 | $20K-29.9K | Young Plant | Growing stem |
| 4 | $30K-39.9K | Growing | Stronger stem, more leaves |
| 5 | $40K-49.9K | Budding | Small bud forming |
| 6 | $50K-59.9K | First Petals | Bud with pink hints |
| 7 | $60K-69.9K | Opening | Petals emerging |
| 8 | $70K-79.9K | Blooming | Flower opening |
| 9 | $80K-89.9K | Full Bloom | Beautiful full flower |
| 10 | $90K-99.9K | Perfect Bloom | Enhanced with glow |
| 11 | $100K+ | Radiant Glory | Ultimate magnificence ✨ |

## 🎨 Customization

### Change Goal Amount

```tsx
<LotusVisualization 
  totalAmount={50000}
  goalAmount={250000}  // Set to $250K
  size={400}
/>
```

### Adjust Size

```tsx
<LotusVisualization 
  totalAmount={50000}
  size={300}  // Smaller lotus
/>
```

### Trigger Celebration

```tsx
const handleDonation = (amount) => {
  const newTotal = totalAmount + amount;
  setTotalAmount(newTotal);
  
  // Celebrate on milestones
  if (newTotal >= goalAmount || newTotal % 10000 === 0) {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 4000);
  }
};
```

## 🎯 Framework Examples

### Next.js (App Router)

```tsx
'use client';

import { useState } from 'react';
import LotusVisualization from '@/components/lotus/LotusVisualization';

export default function DonationPage() {
  const [amount, setAmount] = useState(0);
  
  return (
    <main className="container mx-auto py-12">
      <LotusVisualization totalAmount={amount} />
    </main>
  );
}
```

### React (Vite/CRA)

```tsx
import { useState } from 'react';
import LotusVisualization from './components/lotus/LotusVisualization';

function App() {
  const [amount, setAmount] = useState(0);
  
  return (
    <div className="container mx-auto py-12">
      <LotusVisualization totalAmount={amount} />
    </div>
  );
}
```

## 🔧 Technical Requirements

- **React**: 18.0+ (uses hooks)
- **Next.js**: 13+ (if using Next.js)
- **TypeScript**: Optional but recommended
- **Tailwind CSS**: Required for styling
- **Browser**: Modern browsers with Canvas API support

## 🎨 Tailwind Configuration

Ensure these colors are in your `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1C1A3C',
        accent: '#7373A8',
        'dark-background': '#CACAD7',
        background: '#FAFAF7',
        'light-background': '#FDFDFE',
      },
    },
  },
};
```

Or add custom CSS:

```css
.text-primary { color: #1C1A3C; }
.bg-purple-100 { background-color: rgba(147, 51, 234, 0.1); }
.bg-purple-200 { background-color: rgba(147, 51, 234, 0.2); }
.text-purple-600 { color: rgb(147, 51, 234); }
/* ... etc */
```

## 📱 Responsive Behavior

- **Mobile (< 640px)**: Full width, smaller text
- **Tablet (640-1024px)**: Centered, optimized spacing  
- **Desktop (> 1024px)**: Maximum width with padding

## ♿ Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly
- High contrast colors (WCAG AA compliant)

## 🐛 Troubleshooting

### Canvas Not Rendering

Make sure you're using `'use client'` directive in Next.js:

```tsx
'use client';

import LotusVisualization from './LotusVisualization';
```

### Styles Not Applied

Ensure Tailwind CSS is properly configured and CSS is being processed.

### Import Path Issues

Adjust import paths based on your project structure:

```tsx
// Adjust the @ alias or use relative paths
import LotusVisualization from './lotus/LotusVisualization';
```

## 📄 License

MIT License - Free to use in your projects!

## 💜 About

Created for the Shield of Athena fundraising campaign. The lotus symbolizes resilience and transformation—growing from mud and darkness to bloom with remarkable beauty, just like survivors of domestic violence.

---

**Questions?** Check the code comments or create an issue in your project repository.

