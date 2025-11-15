import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export type CertificateTier = 'supporter' | 'community-builder' | 'safety-champion' | 'founders-circle' | 'changemaker'

interface CertificateData {
  donorName: string
  amount: number
  date: string
  impactStatement: string
  certificateId: string
  tier: CertificateTier
}

/**
 * Get the template path for a certificate tier
 */
function getTemplatePath(tier: CertificateTier): string {
  const templates = {
    'supporter': '/certificates/purple-template.pdf',
    'community-builder': '/certificates/navy-template.pdf',
    'safety-champion': '/certificates/cream-template.pdf',
    'founders-circle': '/certificates/gold-template.pdf',
    'changemaker': '/certificates/platinum-template.pdf',
  }
  return templates[tier]
}

/**
 * Get certificate tier based on donation amount
 */
export function getCertificateTierFromAmount(amount: number): CertificateTier {
  if (amount >= 1000) return 'changemaker'
  if (amount >= 250) return 'founders-circle'
  if (amount >= 100) return 'safety-champion'
  if (amount >= 25) return 'community-builder'
  return 'supporter'
}

/**
 * Get certificate tier name
 */
export function getCertificateTierName(tier: CertificateTier): string {
  const names = {
    'supporter': 'Supporter Certificate',
    'community-builder': 'Community Builder Certificate',
    'safety-champion': 'Safety Champion Certificate',
    'founders-circle': "Founder's Circle Certificate",
    'changemaker': 'Changemaker Certificate',
  }
  return names[tier]
}

/**
 * Generate a filled certificate PDF from template
 * This is a simplified version - you'll customize positions based on your actual templates
 */
export async function generateCertificatePDF(data: CertificateData): Promise<Uint8Array> {
  try {
    // Load the template PDF
    const templatePath = getTemplatePath(data.tier)
    const templateUrl = `${window.location.origin}${templatePath}`
    const existingPdfBytes = await fetch(templateUrl).then(res => res.arrayBuffer())
    
    // Load the PDF
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    
    // Get the first page
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    
    // Embed fonts
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    
    // Define colors based on tier
    const tierColors: Record<CertificateTier, ReturnType<typeof rgb>> = {
      'supporter': rgb(0.31, 0.15, 0.51), // Purple #4F2682
      'community-builder': rgb(0.09, 0.20, 0.37), // Navy #17335E
      'safety-champion': rgb(0.96, 0.93, 0.84), // Cream #F5EDD6
      'founders-circle': rgb(0.85, 0.65, 0.13), // Gold #D9A521
      'changemaker': rgb(0.71, 0.71, 0.71), // Platinum #B5B5B5
    }
    const color = tierColors[data.tier]
    
    // **CUSTOMIZE THESE POSITIONS BASED ON YOUR TEMPLATE DESIGN**
    // These are approximate positions - you'll need to adjust based on where you want text
    
    // Draw certificate tier name at top
    const tierName = getCertificateTierName(data.tier)
    firstPage.drawText(tierName, {
      x: width / 2 - (tierName.length * 6), // Centered (approximate)
      y: height - 100,
      size: 24,
      font: boldFont,
      color: color,
    })
    
    // Draw "Presented to"
    firstPage.drawText('Presented to', {
      x: width / 2 - 45,
      y: height - 180,
      size: 14,
      font: regularFont,
      color: rgb(0.2, 0.2, 0.2),
    })
    
    // Draw donor name (large, centered)
    const nameSize = 32
    const nameWidth = data.donorName.length * 14 // Approximate width
    firstPage.drawText(data.donorName, {
      x: width / 2 - nameWidth / 2,
      y: height - 230,
      size: nameSize,
      font: boldFont,
      color: rgb(0, 0, 0),
    })
    
    // Draw amount
    const amountText = `For your generous donation of $${data.amount}`
    firstPage.drawText(amountText, {
      x: width / 2 - (amountText.length * 5),
      y: height - 280,
      size: 16,
      font: regularFont,
      color: rgb(0.2, 0.2, 0.2),
    })
    
    // Draw impact statement (wrapped text)
    const impactLines = wrapText(data.impactStatement, 70) // Wrap at 70 characters
    let impactY = height - 340
    impactLines.forEach((line) => {
      firstPage.drawText(line, {
        x: 100, // Left margin
        y: impactY,
        size: 12,
        font: regularFont,
        color: rgb(0.3, 0.3, 0.3),
      })
      impactY -= 20 // Line spacing
    })
    
    // Draw date
    firstPage.drawText(`Date: ${data.date}`, {
      x: 100,
      y: 120,
      size: 12,
      font: regularFont,
      color: rgb(0.4, 0.4, 0.4),
    })
    
    // Draw certificate ID
    firstPage.drawText(`Certificate ID: ${data.certificateId}`, {
      x: width - 250,
      y: 120,
      size: 10,
      font: regularFont,
      color: rgb(0.5, 0.5, 0.5),
    })
    
    // Serialize the PDFDocument to bytes
    const pdfBytes = await pdfDoc.save()
    return pdfBytes
    
  } catch (error) {
    console.error('Error generating certificate:', error)
    throw new Error('Failed to generate certificate PDF')
  }
}

/**
 * Helper function to wrap text at a specified character limit
 */
function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''
  
  words.forEach((word) => {
    if ((currentLine + word).length <= maxChars) {
      currentLine += (currentLine ? ' ' : '') + word
    } else {
      if (currentLine) lines.push(currentLine)
      currentLine = word
    }
  })
  
  if (currentLine) lines.push(currentLine)
  return lines
}

/**
 * Download the certificate PDF
 */
export function downloadCertificatePDF(pdfBytes: Uint8Array, certificateId: string) {
  const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `shield-of-athena-certificate-${certificateId}.pdf`
  link.click()
  window.URL.revokeObjectURL(url)
}
