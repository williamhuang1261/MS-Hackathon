'use client'

import { motion } from 'framer-motion'
import { Download, Share2, Facebook, MessageCircle, Award } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Card } from '@/app/components/ui/card'
import { CERTIFICATE_TIERS, generateCertificateId, generateShareText, type CertificateTier } from '@/lib/donation-utils'
import { Badge } from '@/app/components/ui/badge'
import { generateCertificatePDF, downloadCertificatePDF, getCertificateTierFromAmount } from '@/lib/certificate-generator'
import { useState } from 'react'

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
    const [isGenerating, setIsGenerating] = useState(false)

    const handleDownload = async () => {
        try {
            setIsGenerating(true)

            // Generate the certificate PDF
            const pdfBytes = await generateCertificatePDF({
                donorName: donorName || 'Anonymous Supporter',
                amount,
                date,
                impactStatement: impactDescription,
                certificateId,
                tier,
            })

            // Download the PDF
            downloadCertificatePDF(pdfBytes, certificateId)

        } catch (error) {
            console.error('Failed to generate certificate:', error)
            alert('Failed to generate certificate. Please try again.')
        } finally {
            setIsGenerating(false)
        }
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
            className="fixed inset-0 z-50"
            onClick={onClose}
        >
            {/* Darkened backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Colored gradient overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at center, rgba(251, 146, 60, 0.15) 0%, rgba(192, 132, 252, 0.15) 50%, rgba(253, 230, 138, 0.1) 100%)'
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                <motion.div
                    initial={{ scale: 0.8, y: 50, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
                    className="relative max-w-3xl w-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Card className="overflow-hidden shadow-2xl border-4 relative" style={{
                        backgroundColor: certificateData.bgColor,
                        borderColor: certificateData.color
                    }}>
                        {/* Art Deco decorative border pattern */}
                        <div className="absolute inset-0 pointer-events-none opacity-20">
                            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                {/* Top border pattern */}
                                <pattern id="toppattern" x="0" y="0" width="60" height="30" patternUnits="userSpaceOnUse">
                                    <polygon points="30,0 45,15 30,30 15,15" fill="currentColor" opacity="0.3" />
                                </pattern>
                                <rect width="100%" height="40" fill="url(#toppattern)" />

                                {/* Bottom border pattern */}
                                <rect y="100%" width="100%" height="40" transform="translate(0, -40)" fill="url(#toppattern)" />
                            </svg>
                        </div>

                        {/* Certificate Content */}
                        <div className="relative p-8 md:p-16">
                            {/* Art Deco corner ornaments with more detail */}
                            <div className="absolute top-6 left-6 w-20 h-20">
                                <div className="absolute top-0 left-0 w-full h-full border-t-4 border-l-4" style={{ borderColor: certificateData.color }} />
                                <div className="absolute top-3 left-3 w-3 h-3 rotate-45" style={{ backgroundColor: certificateData.color }} />
                            </div>
                            <div className="absolute top-6 right-6 w-20 h-20">
                                <div className="absolute top-0 right-0 w-full h-full border-t-4 border-r-4" style={{ borderColor: certificateData.color }} />
                                <div className="absolute top-3 right-3 w-3 h-3 rotate-45" style={{ backgroundColor: certificateData.color }} />
                            </div>
                            <div className="absolute bottom-6 left-6 w-20 h-20">
                                <div className="absolute bottom-0 left-0 w-full h-full border-b-4 border-l-4" style={{ borderColor: certificateData.color }} />
                                <div className="absolute bottom-3 left-3 w-3 h-3 rotate-45" style={{ backgroundColor: certificateData.color }} />
                            </div>
                            <div className="absolute bottom-6 right-6 w-20 h-20">
                                <div className="absolute bottom-0 right-0 w-full h-full border-b-4 border-r-4" style={{ borderColor: certificateData.color }} />
                                <div className="absolute bottom-3 right-3 w-3 h-3 rotate-45" style={{ backgroundColor: certificateData.color }} />
                            </div>

                            <div className="relative z-10 space-y-6 text-center">
                                {/* Shield of Athena Logo Stamp */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: 'spring', duration: 1, delay: 0.6 }}
                                    className="flex justify-center"
                                >
                                    <div
                                        className="w-24 h-24 rounded-full flex items-center justify-center font-bold text-2xl shadow-xl border-4 border-white"
                                        style={{
                                            backgroundColor: certificateData.color,
                                            color: '#FFFFFF'
                                        }}
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
                                    <h2
                                        className="text-3xl md:text-4xl font-serif font-bold drop-shadow-sm"
                                        style={{ color: certificateData.color }}
                                    >
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

                                    <p className="text-3xl md:text-4xl font-bold drop-shadow-sm" style={{
                                        color: certificateData.color
                                    }}>
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
                            className="border-t-4 bg-card/50 backdrop-blur p-6 md:p-8 space-y-6"
                            style={{ borderColor: certificateData.color }}
                        >
                            {/* Primary Actions with Badge Icons */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Button
                                    onClick={handleDownload}
                                    variant="default"
                                    size="lg"
                                    className="gap-2"
                                    style={{ backgroundColor: certificateData.color }}
                                    disabled={isGenerating}
                                >
                                    <Award className="h-5 w-5" />
                                    {isGenerating ? 'Generating PDF...' : 'Download Certificate'}
                                    <Download className="h-4 w-4" />
                                </Button>

                                <Button
                                    onClick={() => { }}
                                    variant="outline"
                                    size="lg"
                                    className="gap-2 border-2"
                                    style={{ borderColor: certificateData.color, color: certificateData.color }}
                                >
                                    <Award className="h-5 w-5" />
                                    Share Your Impact
                                    <Share2 className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Social Share Buttons */}
                            <div className="flex flex-wrap gap-2 justify-center pt-2 border-t border-border/50">
                                <Button
                                    onClick={() => handleShare('facebook')}
                                    variant="ghost"
                                    size="sm"
                                    className="gap-2"
                                >
                                    <Facebook className="h-4 w-4" />
                                    Facebook
                                </Button>

                                <Button
                                    onClick={() => handleShare('instagram')}
                                    variant="ghost"
                                    size="sm"
                                    className="gap-2"
                                >
                                    <Share2 className="h-4 w-4" />
                                    Instagram
                                </Button>

                                <Button
                                    onClick={() => handleShare('messages')}
                                    variant="ghost"
                                    size="sm"
                                    className="gap-2"
                                >
                                    <MessageCircle className="h-4 w-4" />
                                    Messages
                                </Button>
                            </div>

                            <div className="text-center pt-2">
                                <Button onClick={onClose} variant="ghost" className="text-muted-foreground hover:text-foreground">
                                    Close & Continue
                                </Button>
                            </div>
                        </motion.div>
                    </Card>

                    {/* Badge Preview - Art Deco style with geometric patterns */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6 }}
                        className="mt-4 lg:mt-0 lg:absolute lg:-right-24 lg:top-1/2 lg:-translate-y-1/2"
                    >
                        <Card
                            className="p-6 shadow-2xl border-4 relative overflow-hidden"
                            style={{ borderColor: certificateData.color }}
                        >
                            {/* Art Deco geometric background pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <pattern id="artdeco" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="currentColor" opacity="0.5" />
                                            <circle cx="20" cy="20" r="3" fill="currentColor" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#artdeco)" />
                                </svg>
                            </div>

                            {/* Badge content */}
                            <div className="relative z-10 text-center space-y-3">
                                <Badge
                                    variant="default"
                                    className="text-sm lg:text-lg px-4 py-2 lg:px-6 lg:py-3 font-bold tracking-wide relative overflow-hidden border-2"
                                    style={{
                                        background: certificateData.badgeGradient,
                                        borderColor: certificateData.badgeAccent,
                                        color: '#000000',
                                        textShadow: '0 1px 2px rgba(255,255,255,0.5)'
                                    }}
                                >
                                    {/* Art Deco shine effect */}
                                    <span className="absolute inset-0 opacity-20" style={{
                                        background: `linear-gradient(45deg, transparent 30%, ${certificateData.badgeAccent} 50%, transparent 70%)`
                                    }}></span>
                                    <span className="relative z-10">{certificateData.title.replace(' Certificate', '')}</span>
                                </Badge>

                                {/* Art Deco decorative elements */}
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-8 h-0.5" style={{ background: certificateData.badgeGradient }}></div>
                                    <div className="w-2 h-2 rotate-45" style={{ background: certificateData.badgeAccent }}></div>
                                    <div className="w-8 h-0.5" style={{ background: certificateData.badgeGradient }}></div>
                                </div>

                                <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: certificateData.color }}>
                                    Your Badge
                                </p>
                            </div>
                        </Card>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    )
}
