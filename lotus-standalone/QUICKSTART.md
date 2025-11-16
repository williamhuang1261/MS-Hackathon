# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Copy Files

Copy all files from this folder to your project:

```bash
cp -r lotus-standalone/* your-project/src/components/lotus/
```

### Step 2: Import and Use

```tsx
'use client'; // For Next.js

import LotusVisualization from './lotus/LotusVisualization';

export default function FundraisingPage() {
  return (
    <div className="container mx-auto p-8">
      <LotusVisualization 
        totalAmount={45000}
        goalAmount={100000}
        showCelebration={false}
        size={400}
      />
    </div>
  );
}
```

### Step 3: Add State Management

```tsx
'use client';

import { useState } from 'react';
import LotusVisualization from './lotus/LotusVisualization';

export default function FundraisingPage() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleDonation = (amount: number) => {
    const newTotal = totalAmount + amount;
    setTotalAmount(newTotal);
    
    // Trigger celebration on milestones
    if (newTotal % 10000 === 0 || newTotal >= 100000) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 4000);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <LotusVisualization 
        totalAmount={totalAmount}
        goalAmount={100000}
        showCelebration={showCelebration}
        size={400}
      />
      
      {/* Your donation buttons */}
      <div className="flex gap-2 mt-4 justify-center">
        <button onClick={() => handleDonation(50)}>$50</button>
        <button onClick={() => handleDonation(100)}>$100</button>
        <button onClick={() => handleDonation(500)}>$500</button>
      </div>
    </div>
  );
}
```

## 📋 Requirements

- React 18+
- Tailwind CSS (for styling)
- TypeScript (optional but files are in .tsx)

## 🎨 Tailwind Setup

Make sure Tailwind is configured. Add to `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1C1A3C',
      },
    },
  },
};
```

## ✅ That's It!

The component is fully self-contained and manages its own:
- Lotus stage calculation
- Progress bar rendering
- Tooltip state
- Canvas rendering

See `README.md` for full documentation.

