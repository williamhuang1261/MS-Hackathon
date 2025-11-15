'use client'

import { motion } from 'framer-motion'
import { Download, Share2, Facebook, MessageCircle } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Card } from '@/app/components/ui/card'
import { CERTIFICATE_TIERS, generateCertificateId, generateShareText, type CertificateTier } from '@/lib/donation-utils'
import { Badge } from '@/app/components/ui/badge'

interface CertificateProps {
  donorName: string
  amount: number
  impactDescription: string
  tier: CertificateTier
  onClose: () => void
}

export default function Certificate({ donorName, amount, impactDescription, tier, onClose }: CertificateProps) {
  const certificateId = generateCertificateId()
  const certificateData = CERTIFICATE_TIERS[tier]
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  const handleDownload = () => {
    // In a real implementation, this would generate and download a PDF
    console.log('Downloading certificate...')
    alert('Certificate download would happen here. In production, this would generate a PDF.')
  }

  const handleShare = (platform: 'facebook' | 'instagram' | 'messages') => {
    const shareText = generateShareText(amount, tier)
    const encodedText = encodeURIComponent(shareText)
    
    let url = ''
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodedText}`
        break
      case 'instagram':
        // Instagram doesn't have a web share URL, so we copy to clipboard
        navigator.clipboard.writeText(shareText)
        alert('Share text copied to clipboard! Open Instagram to paste and share.')
        return
      case 'messages':
        url = `sms:?&body=${encodedText}`
        break
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
        className="relative max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="overflow-hidden" style={{ backgroundColor: certificateData.bgColor }}>
          {/* Certificate Content */}
          <div className="relative p-8 md:p-12">
            {/* Decorative border */}
            <div className="absolute inset-4 border-4 rounded-lg pointer-events-none" style={{ borderColor: certificateData.color }} />
            
            <div className="relative z-10 space-y-6 text-center">
              {/* Shield of Athena Logo Stamp */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', duration: 1, delay: 0.6 }}
                className="flex justify-center"
              >
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                  style={{ backgroundColor: certificateData.color }}
                >
                  <div className="text-center">
                    <div className="text-xs">SHIELD OF</div>
                    <div className="text-sm">ATHENA</div>
                  </div>
                </div>
              </motion.div>

              {/* Certificate Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-serif font-bold" style={{ color: certificateData.color }}>
                  {certificateData.title}
                </h2>
              </motion.div>

              {/* Certificate Body */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="space-y-4"
              >
                <p className="text-lg text-foreground/80">
                  This certificate recognizes
                </p>
                
                <p className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  {donorName}
                </p>
                
                <p className="text-lg text-foreground/80">
                  for their generous contribution of
                </p>
                
                <p className="text-3xl md:text-4xl font-bold" style={{ color: certificateData.color }}>
                  ${amount.toLocaleString()}
                </p>
                
                <p className="text-base text-foreground/70 max-w-lg mx-auto leading-relaxed">
                  which provided <span className="font-semibold text-foreground">{impactDescription}</span>
                </p>
                
                <div className="pt-4 space-y-2">
                  <p className="text-sm text-foreground/60">{date}</p>
                  <p className="text-xs font-mono text-foreground/50">Certificate ID: {certificateId}</p>
                </div>
              </motion.div>

              {/* Signature Line */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="pt-8"
              >
                <div className="border-t-2 border-foreground/20 w-64 mx-auto pt-2">
                  <p className="text-sm font-semibold text-foreground">Melpa Kamateros</p>
                  <p className="text-xs text-foreground/60">Executive Director</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="border-t border-border bg-card p-6 space-y-4"
          >
            <div className="flex flex-wrap gap-3 justify-center">
              <Button onClick={handleDownload} variant="default">
                <Download className="mr-2 h-4 w-4" />
                Download Certificate
              </Button>
              
              <Button onClick={() => handleShare('facebook')} variant="outline">
                <Facebook className="mr-2 h-4 w-4" />
                Share on Facebook
              </Button>
              
              <Button onClick={() => handleShare('instagram')} variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share on Instagram
              </Button>
              
              <Button onClick={() => handleShare('messages')} variant="outline">
                <MessageCircle className="mr-2 h-4 w-4" />
                Share via Messages
              </Button>
            </div>

            <div className="text-center">
              <Button onClick={onClose} variant="ghost" className="text-muted-foreground">
                Close
              </Button>
            </div>
          </motion.div>
        </Card>

        {/* Badge Preview (shown alongside certificate) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6 }}
          className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block"
        >
          <Card className="p-4 shadow-xl">
            <div className="text-center space-y-2">
              <Badge 
                variant="default" 
                className="text-lg px-4 py-2"
                style={{ backgroundColor: certificateData.color }}
              >
                {certificateData.title.replace(' Certificate', '')}
              </Badge>
              <p className="text-xs text-muted-foreground">Your Badge</p>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
