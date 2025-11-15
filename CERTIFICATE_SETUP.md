# Certificate Generation System

## Overview
This system fills pre-designed PDF templates with donor data to create beautiful, personalized donation certificates.

## How It Works

### 1. Design Your Certificate Templates
Create 5 beautiful certificate templates (one for each tier) using **Canva** or **Adobe Illustrator**:

#### Certificate Tiers:
- **Purple** ($10-24): "Supporter Certificate"
- **Navy** ($25-99): "Community Builder Certificate"  
- **Cream** ($100-249): "Safety Champion Certificate"
- **Gold** ($250-999): "Founder's Circle Certificate"
- **Platinum** ($1000+): "Changemaker Certificate"

#### Template Design Guidelines:
- **Size**: Standard letter (8.5" x 11") or A4
- **Elements to include**:
  - Organization logo (Shield of Athena)
  - Border/decorative elements in tier color
  - Placeholder spaces for:
    - Certificate tier name (at top)
    - "Presented to" text
    - Donor name (large, centered)
    - Donation amount
    - Impact statement (4-5 lines of text)
    - Date (bottom left)
    - Certificate ID (bottom right)
    - Signature line (optional)
  
- **Design Tips**:
  - Use elegant fonts (serif for headings, sans-serif for body)
  - Leave enough white space for text insertion
  - Make it print-friendly (avoid dark backgrounds)
  - Add subtle textures or patterns
  - Include QR code space (optional, for verification)

### 2. Export and Place Templates

1. Export each template as a PDF
2. Name them:
   - `purple-template.pdf`
   - `navy-template.pdf`
   - `cream-template.pdf`
   - `gold-template.pdf`
   - `platinum-template.pdf`

3. Create folder and place templates:
   ```bash
   mkdir -p public/certificates
   # Copy your template PDFs to this folder
   ```

### 3. Customize Text Positions

Open `/lib/certificate-generator.ts` and adjust the coordinates in the `generateCertificatePDF()` function:

```typescript
// Example: Position donor name at specific coordinates
firstPage.drawText(data.donorName, {
  x: 250,      // Horizontal position (0 = left edge)
  y: 400,      // Vertical position (0 = bottom edge)
  size: 32,    // Font size
  font: boldFont,
  color: rgb(0, 0, 0),
})
```

**How to find the right coordinates:**
1. PDF coordinates start at **bottom-left** (0, 0)
2. Standard letter size is 612 x 792 points
3. To center text: `x = (width / 2) - (textLength * fontSize / 4)`
4. Use trial and error to fine-tune positions

### 4. Test the System

1. Make a test donation on your website
2. Click "Download Certificate" on the success screen
3. Check if text appears in the right places
4. Adjust coordinates in `certificate-generator.ts` as needed
5. Repeat until perfect!

## Data Flow

```
User Donates
    ↓
Payment Processed
    ↓
Certificate Component Renders
    ↓
User Clicks "Download"
    ↓
generateCertificatePDF() called with:
  - donorName: "John Smith" or "Anonymous Supporter"
  - amount: 100
  - date: "November 15, 2025"
  - impactStatement: "This contribution provided emergency shelter..."
  - certificateId: "SOA-2025-ABC123"
  - tier: "cream"
    ↓
Load cream-template.pdf from /public/certificates/
    ↓
Insert text at specified coordinates
    ↓
Generate final PDF bytes
    ↓
Download to user's device
```

## Customization Options

### Change Fonts
```typescript
// In certificate-generator.ts
const fancyFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
// Available fonts: Helvetica, HelveticaBold, TimesRoman, TimesRomanBold, Courier, etc.
```

### Add Custom Fonts
```typescript
import fontkit from '@pdf-lib/fontkit'
pdfDoc.registerFontkit(fontkit)
const customFontBytes = await fetch('/fonts/YourFont.ttf').then(res => res.arrayBuffer())
const customFont = await pdfDoc.embedFont(customFontBytes)
```

### Add Images/Logos
```typescript
const logoBytes = await fetch('/logos/shield-of-athena.png').then(res => res.arrayBuffer())
const logoImage = await pdfDoc.embedPng(logoBytes) // or embedJpg()
firstPage.drawImage(logoImage, {
  x: 50,
  y: 700,
  width: 100,
  height: 100,
})
```

### Multi-line Text with Better Wrapping
The system includes a `wrapText()` helper function that automatically wraps long impact statements.

## Troubleshooting

### Text appears in wrong position
- Remember: Y-axis starts at **bottom** (0) and goes up
- Adjust x/y coordinates in `certificate-generator.ts`

### Template not loading
- Make sure PDFs are in `/public/certificates/`
- Check that filenames match exactly: `purple-template.pdf` etc.
- Check browser console for fetch errors

### Text is cut off
- Reduce font size
- Increase `maxChars` in `wrapText()` call
- Make sure template has enough space

### PDF downloads but is blank
- Check that text colors aren't white on white
- Verify coordinates are within page bounds (0-612 width, 0-792 height)

## For Production

When ready to deploy:

1. **Store certificates in database**
   - Save certificate data linked to donation ID
   - Enable donors to re-download later

2. **Email certificates automatically**
   - Send PDF as attachment after donation
   - Use Resend, SendGrid, or AWS SES

3. **Add certificate verification**
   - Generate unique URLs: `yoursite.com/verify/ABC123`
   - Store certificate data in database
   - Add QR codes to templates linking to verification page

4. **Use high-resolution logos**
   - Embed actual Shield of Athena logo
   - Use vector formats when possible

## Files Modified

- `/lib/certificate-generator.ts` - PDF generation logic
- `/app/components/Certificate.tsx` - Download button integration
- `/public/certificates/` - Template storage (you need to create this)

## Next Steps

1. ✅ Install pdf-lib (done)
2. ⏳ Design 5 certificate templates in Canva
3. ⏳ Export and place in `/public/certificates/`
4. ⏳ Test and adjust text positions
5. ⏳ Customize colors, fonts, and styling
6. ✅ Integrate with download button (done)
