# Lotus Flower Donation Visualization

## Overview

The Lotus Flower feature is a beautiful visualization that appears on the Thank You page after a donation is completed. It symbolizes resilience, growth, and transformation—core values that align with Shield of Athena's mission to support survivors of domestic violence.

## Symbolism

The lotus flower is a powerful metaphor:
- **Rises from mud and darkness into light and beauty**
- Represents **strength, transformation, and resilience**
- Symbolizes the journey from hardship to renewal
- Just like survivors, it shows the power to **bloom again**

## How It Works

### Donation Stages (0-9)

The lotus flower progresses through 10 stages of growth based on donation amount:

| Donation Amount | Stage | Visual                    | Description              |
|----------------|-------|---------------------------|--------------------------|
| $5-$14         | 0-1   | Seed/Germination          | A seed planted in soil   |
| $15-$24        | 2-3   | Sprout/Young Shoot        | Breaking through         |
| $25-$49        | 4-5   | Stem Development/Early Bud| Building strength        |
| $50-$99        | 6-7   | Bud Formation/Early Bloom | Preparing to bloom       |
| $100-$249      | 8     | Blooming                  | Opening up               |
| $250+          | 9     | Full Bloom                | Radiant and complete     |

### Celebration Effects

Confetti animations trigger at milestone stages:
- **Stage 4**: Early celebration when bud forms
- **Stage 7**: Mid-celebration as petals emerge
- **Stage 9**: Full celebration at peak bloom

## Technical Implementation

### Files Added

```
/lib/lotus/
  - lotus-designs.js      # 10 stages of lotus flower canvas drawings
  - flower-renderer.js    # Canvas renderer for displaying stages
  - confetti.js          # Celebration effect animation

/components/
  - LotusFlower.tsx      # React wrapper component

/app/globals.css
  - Added lotus flower styles
```

### Component Usage

```tsx
import LotusFlower from '@/components/LotusFlower';

<LotusFlower 
  stage={7}                    // 0-9: Current growth stage
  showCelebration={true}       // Show confetti on milestone stages
  showLabel={true}            // Display stage name and description
  size={600}                  // Canvas size in pixels
/>
```

### Integration Points

1. **Donation Page** → User selects amount
2. **Upsell Modal** → Optional additional support
3. **Payment Page** → Process payment
4. **Thank You Page** → 🌸 **Lotus Flower Visualization**

### Data Flow

```javascript
localStorage:
  donationAmount → Used to calculate lotus stage
  donationType   → Monthly or one-time

Stage Calculation:
  Amount ≥ $250  → Stage 9 (Full Bloom)
  Amount ≥ $100  → Stage 8 (Blooming)
  Amount ≥ $50   → Stage 7 (Early Bloom)
  Amount ≥ $25   → Stage 5 (Early Bud)
  Amount ≥ $15   → Stage 3 (Young Shoot)
  Amount ≥ $5    → Stage 1 (Germination)
  Default        → Stage 0 (Seed)
```

## Design Features

### Canvas Rendering
- **600x600px** high-resolution artwork
- **Smooth gradients** and detailed petals
- **Responsive design** scales on mobile
- **Hardware-accelerated** canvas rendering

### Color Palette
- Soil: Browns (#A0522D, #8B4513, #654321)
- Stem/Leaves: Greens (#228B22, #32CD32, #90EE90)
- Petals: Pinks/Whites (#FFB6C1, #FF69B4, #FFFFFF)
- Center: Golds (#FFD700, #FFA500)

### Animation
- **Confetti particles**: 150 colorful pieces
- **Physics-based**: Gravity and rotation
- **Auto-cleanup**: Removes after 4 seconds
- **Smooth transitions** between stages

## User Experience

### Thank You Page Flow

1. **Header**: Personalized thank you with donation amount
2. **Lotus Visualization**: 
   - Symbolic explanation text
   - Animated lotus at appropriate stage
   - Confetti celebration (if milestone)
   - Stage name and description
3. **Impact Section**: Shows how donation helps
4. **Next Steps**: Return home or learn more

### Mobile Responsive
- Lotus canvas scales to fit screen
- Maintains aspect ratio
- Touch-friendly navigation
- Optimized for all devices

## Future Enhancements

Potential additions:
- [ ] Social sharing of lotus image
- [ ] Download lotus as PNG
- [ ] Animation between stages
- [ ] Progressive growth animation
- [ ] Personalized message on lotus
- [ ] Gallery of all stages
- [ ] Cumulative growth for repeat donors

## Credits

Built with:
- **Pure JavaScript** canvas drawing
- **React/Next.js** integration
- **Tailwind CSS** for styling
- No external visualization libraries

Created for **Shield of Athena** to honor and celebrate donors who support survivors of domestic violence.

---

*"Like the lotus flower, we rise from the darkness into the light."*

