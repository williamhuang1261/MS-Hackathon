# Quick Start: Certificate Generation

## TL;DR

1. **Design 5 certificates in Canva** (one per tier: purple, navy, cream, gold, platinum)
2. **Export as PDFs** and place in `/public/certificates/`
3. **Test by making a donation** and clicking "Download Certificate"
4. **Adjust text positions** in `/lib/certificate-generator.ts` if needed

---

## The Method: `pdf-lib` Template Filling

### What it does:
✅ Takes your beautiful pre-designed PDF templates  
✅ Inserts donor data (name, amount, date, etc.) at specific coordinates  
✅ Generates a personalized certificate PDF  
✅ Downloads to user's device  

### What it doesn't do:
❌ Create the design for you (you design in Canva/Illustrator)  
❌ Automatically detect where to place text (you specify coordinates)  

---

## Why This Method?

**Pros:**
- ✅ **Full design control** - Use Canva's beautiful templates
- ✅ **Professional quality** - Your designs look exactly as you made them
- ✅ **Fast** - PDF generation happens in ~1 second
- ✅ **Reusable** - Same template for all donors
- ✅ **No API costs** - Works client-side

**Cons:**
- ⚠️ Manual coordinate adjustment (one-time setup)
- ⚠️ Need to create templates first

---

## File Structure

```
public/
  certificates/
    purple-template.pdf    ← Your Canva design
    navy-template.pdf      ← Your Canva design
    cream-template.pdf     ← Your Canva design
    gold-template.pdf      ← Your Canva design
    platinum-template.pdf  ← Your Canva design

lib/
  certificate-generator.ts ← PDF filling logic (adjust coordinates here)

app/components/
  Certificate.tsx          ← Download button (already integrated)
```

---

## Coordinate System Reference

PDF coordinates start at **bottom-left corner**:

```
(0, 792) ────────────── (612, 792)  ← TOP
   │                         │
   │     Your Content        │
   │                         │
(0, 0) ──────────────── (612, 0)    ← BOTTOM
```

Standard letter size: **612 x 792 points**

### Common Positions:
- **Page Center X**: `306` (half of 612)
- **Top Area**: Y values like `700-750`
- **Middle Area**: Y values like `350-450`
- **Bottom Area**: Y values like `50-150`

---

## Example Workflow

1. **Design Certificate in Canva:**
   - Search "Certificate" templates
   - Pick an elegant one
   - Customize colors to match tier (purple/navy/cream/gold/platinum)
   - Add "Shield of Athena" logo
   - Leave blank space for donor name at center
   - Export → Download as PDF

2. **Name it:** `purple-template.pdf`

3. **Place it:** `/public/certificates/purple-template.pdf`

4. **Test it:** Make a $15 donation → should use purple template

5. **Adjust if needed:** 
   - If text is misaligned, edit coordinates in `certificate-generator.ts`
   - Look for lines like: `x: width / 2 - 45, y: height - 180`
   - Adjust numbers, save, test again

---

## Tips for Canva

- Search for "formal certificate" or "donation certificate"
- Choose designs with:
  - Clean borders
  - Centered layout
  - Plenty of white space
  - Elegant fonts
- Avoid:
  - Dark backgrounds (hard to print)
  - Busy patterns where text will go
  - Too many colors

---

## Need Help?

See full documentation: `/CERTIFICATE_SETUP.md`
