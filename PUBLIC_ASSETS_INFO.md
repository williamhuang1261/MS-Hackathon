# Static Assets in Next.js 14

## ✅ Icon Setup Complete

### Where Icons Should Be Located:
```
/home/ellak/MS-Hackathon/
├── public/
│   └── icons/
│       ├── googlepay.svg     ✓
│       ├── applepay.svg      ✓
│       ├── paypal.svg        ✓
│       ├── amexLogo.svg      ✓
│       ├── visaLogo.png      ✓
│       ├── mastercardLogo.png ✓
│       └── ... (other icons)
```

### How to Reference Icons in Code:
In Next.js, files in the `public` folder are served from the root URL `/`.

**Correct way to reference icons:**
```tsx
// SVG files (recommended for logos)
<img src="/icons/googlepay.svg" alt="Google Pay" />
<img src="/icons/applepay.svg" alt="Apple Pay" />
<img src="/icons/paypal.svg" alt="PayPal" />

// PNG/JPG files
<img src="/icons/visaLogo.png" alt="Visa" />
<img src="/icons/mastercardLogo.png" alt="Mastercard" />
```

### Supported Formats:
- **SVG** (Recommended) - Scalable, small file size, looks sharp at any size
- **PNG** - Good for logos with transparency
- **JPG/JPEG** - Good for photos, but no transparency support

### Current Status:
✅ All icons have been copied to `/public/icons/`
✅ All image paths in `/app/donate/page.tsx` are correctly pointing to `/icons/...`
✅ Icons will be accessible at: `http://localhost:3000/icons/googlepay.svg` (when dev server is running)

### Important Notes:
1. **No import needed** - Just use `/icons/filename.ext` in src attributes
2. **Case sensitive** - File names must match exactly (googlepay.svg not GooglePay.svg)
3. **File formats** - SVG is best for icons/logos as they scale perfectly
4. **Optimization** - Next.js automatically optimizes images when using the `<Image>` component

### If You Want to Use Next.js Image Optimization:
You can replace `<img>` tags with Next.js `<Image>` component for better performance:

```tsx
import Image from 'next/image'

<Image 
  src="/icons/googlepay.svg" 
  alt="Google Pay" 
  width={24} 
  height={24}
/>
```

This provides automatic optimization, lazy loading, and better performance!
