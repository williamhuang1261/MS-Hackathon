# Lotus Progress Tracker - Exportable Component

A standalone React component that displays a fundraising progress tracker with a growing lotus flower visualization.

## Overview

The `LotusProgressTracker` component visualizes fundraising progress through 11 stages (0-10) as a lotus flower grows from seed to full bloom. As the total amount raised increases from $0 to $90,000+, the lotus progresses through distinct growth stages.

## Features

- **Dynamic Money Display**: Shows total raised with formatted currency ($0 → $90K+)
- **Interactive Lotus Visualization**: Canvas-based lotus that evolves through 11 stages
- **Progress Timeline**: Horizontal timeline with stage markers and progress indicator
- **Responsive Design**: Mobile-first, fully responsive across all device sizes
- **Celebration Animation**: Optional confetti celebration effect
- **Informational Section**: Educational content about lotus symbolism

## Installation

### 1. Copy Required Files

```bash
# Main component
components/CollectiveLotus/LotusProgressTracker.tsx

# Dependencies
components/LotusFlower.tsx
lib/lotus/flower-renderer.js
lib/lotus/lotus-designs.js
lib/lotus/confetti.js

# Styles
app/globals.css (lotus-related styles)
```

### 2. Install Dependencies

```bash
npm install react
```

## Usage

### Basic Implementation

```tsx
import LotusProgressTracker from '@/components/CollectiveLotus/LotusProgressTracker';

function MyFundraisingPage() {
  const [totalRaised, setTotalRaised] = useState(25000);
  
  return (
    <LotusProgressTracker 
      totalAmount={totalRaised}
      showCelebration={false}
    />
  );
}
```

### With Celebration

```tsx
const [showCelebration, setShowCelebration] = useState(false);

// Trigger celebration when reaching a milestone
useEffect(() => {
  if (totalRaised >= 90000) {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 4000);
  }
}, [totalRaised]);

<LotusProgressTracker 
  totalAmount={totalRaised}
  showCelebration={showCelebration}
/>
```

### Testing Full Bloom

```tsx
// Set to just below full bloom to test the final transition
<LotusProgressTracker 
  totalAmount={85000}
  showCelebration={false}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `totalAmount` | `number` | Required | Total amount raised in dollars |
| `showCelebration` | `boolean` | `false` | Triggers confetti animation |

## Stage Thresholds

| Stage | Amount Range | Name | Description |
|-------|-------------|------|-------------|
| 0 | $0-999 | Seed | Beginning of the journey |
| 1 | $1,000-9,999 | Sprout | First signs of growth |
| 2 | $10,000-19,999 | Seedling | Young development |
| 3 | $20,000-29,999 | Young Plant | Growing stronger |
| 4 | $30,000-39,999 | Growing | Steady progress |
| 5 | $40,000-49,999 | Budding | Preparing to bloom |
| 6 | $50,000-59,999 | First Petals | Beauty emerging |
| 7 | $60,000-69,999 | Opening | Petals unfurling |
| 8 | $70,000-79,999 | Blooming | Nearly complete |
| 9 | $80,000-89,999 | Near Full Bloom | Almost there |
| 10 | $90,000+ | Full Bloom | Goal achieved! |

## Component Structure

```
LotusProgressTracker/
├── Total Amount Display (formatted currency)
├── Lotus Flower Visualization (canvas-based)
├── Progress Timeline
│   ├── Progress Bar (0-100%)
│   ├── Stage Markers (11 points)
│   ├── Stage Labels (amount + name)
│   └── Current Stage Indicator
└── About Section (lotus symbolism)
```

## Responsive Behavior

- **Mobile (< 640px)**: Stacked layout, selective timeline labels
- **Tablet (640-1024px)**: Expanded spacing, more visible labels
- **Desktop (> 1024px)**: Full timeline with all labels visible

## Customization

### Changing the Goal Amount

Edit the `STAGE_THRESHOLDS` array in `LotusProgressTracker.tsx`:

```tsx
const STAGE_THRESHOLDS = [
  { stage: 0, min: 0, max: 999, name: 'Seed', amount: '$0' },
  // ... modify amounts as needed
];
```

Update the progress percentage calculation:

```tsx
// Change 90000 to your goal amount
const progressPercentage = Math.min((totalAmount / 90000) * 100, 100);
```

### Styling

The component uses Tailwind CSS classes. Key style areas:

- **Colors**: Purple theme (`purple-50` to `purple-700`)
- **Borders**: Rounded corners (`rounded-xl`, `rounded-2xl`)
- **Shadows**: Drop shadows for depth (`shadow-lg`, `shadow-2xl`)

### Custom Lotus Designs

Modify stage designs in `lib/lotus/lotus-designs.js`:

```javascript
export const LOTUS_STAGES = [
  {
    stage: 0,
    name: 'Your Custom Name',
    description: 'Your description',
    draw: (ctx, width, height) => {
      // Your custom drawing logic
    }
  },
  // ...
];
```

## Integration Examples

### Next.js App Router

```tsx
// app/fundraising/page.tsx
'use client';

import { useState, useEffect } from 'react';
import LotusProgressTracker from '@/components/CollectiveLotus/LotusProgressTracker';

export default function FundraisingPage() {
  const [amount, setAmount] = useState(0);
  
  // Fetch amount from API
  useEffect(() => {
    fetch('/api/fundraising/total')
      .then(res => res.json())
      .then(data => setAmount(data.total));
  }, []);
  
  return (
    <main className="container mx-auto py-12">
      <LotusProgressTracker totalAmount={amount} />
    </main>
  );
}
```

### With State Management (Redux/Zustand)

```tsx
import { useStore } from '@/store';
import LotusProgressTracker from '@/components/CollectiveLotus/LotusProgressTracker';

function FundraisingWidget() {
  const totalRaised = useStore(state => state.fundraising.total);
  
  return <LotusProgressTracker totalAmount={totalRaised} />;
}
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with ES6 support
- Canvas API required

## Performance

- **Optimized Rendering**: Canvas updates only on stage changes
- **Responsive Images**: Scales appropriately for device
- **Minimal Re-renders**: Uses React refs for canvas management
- **Lazy Loading**: Dynamic imports for lotus modules

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly
- High contrast color ratios (WCAG AA compliant)

## License

MIT License - feel free to use in your projects!

## Support

For issues or questions about the component, please refer to the main project documentation or create an issue in the repository.

