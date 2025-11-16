'use client'

import Link from 'next/link'
import { Share2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import DonorBadge from '../components/DonorBadge'
import StoryTeaseSignup from '../components/StoryTeaseSignup'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Progress } from '@/app/components/ui/progress'
import { STORAGE_KEYS } from '@/lib/constants'
import { getDonorLevel, getImpactItems, getNextDonorLevel, getStorageItem } from '@/lib/utils'

export default function ThankYou() {
  const [totalAmount, setTotalAmount] = useState(0)
  const [originalAmount, setOriginalAmount] = useState(0)
  const [additionalAmount, setAdditionalAmount] = useState(0)
  const [donorLevel, setDonorLevel] = useState('')
  const [nextLevel, setNextLevel] = useState('')
  const [nextLevelAmount, setNextLevelAmount] = useState(0)
  const [receiptNumber, setReceiptNumber] = useState<number | null>(null)

  useEffect(() => {
    const total = getStorageItem(STORAGE_KEYS.totalDonationAmount)
    const original = getStorageItem(STORAGE_KEYS.donationAmount)
    const additional = getStorageItem(STORAGE_KEYS.additionalAmount)

    if (total) {
      const amount = Number(total)
      setTotalAmount(amount)
      setOriginalAmount(Number(original) || 0)
      setAdditionalAmount(Number(additional) || 0)

      const level = getDonorLevel(amount)
      setDonorLevel(level)

      const next = getNextDonorLevel(amount)
      if (next) {
        setNextLevel(next.level)
        setNextLevelAmount(next.amount)
      }
    }
    setReceiptNumber(Math.floor(Math.random() * 900000) + 100000)
  }, [])

  const handleShare = () => {
    const shareText = `I just donated to Athena's House to help protect women and children from domestic violence. Join me in making a difference!`
    if (navigator.share) {
      navigator.share({
        title: "Support Athena's House",
        text: shareText,
        url: window.location.origin,
      })
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.origin}`)
      alert('Share message copied to clipboard!')
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-12">
      <section className="space-y-8">
        <div className="text-center">
          <Badge variant="outline" className="border-primary/40 bg-primary/5">
            Receipt #{receiptNumber ?? '—'} · demo
          </Badge>
          <h1 className="mt-4 text-4xl font-serif">Thank you for protecting a woman tonight.</h1>
          <p className="mt-2 text-muted-foreground">
            Every dollar you gave is already at work in Athena’s House.
          </p>
        </div>

        <Card className="border-border">
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <CardTitle>Your donation</CardTitle>
              <CardDescription>Tax receipt emailed within minutes (demo).</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-4xl font-serif text-primary">${totalAmount}</p>
              {additionalAmount > 0 && (
                <p className="text-xs text-muted-foreground">
                  ${originalAmount} + ${additionalAmount} top-up
                </p>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
              Funds are tax-deductible. Keep this confirmation for your records.
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="text-center">
            <CardTitle>Your immediate impact</CardTitle>
            <CardDescription>The women you just helped tonight.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {getImpactItems(totalAmount).map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card/80 px-4 py-3"
              >
                <span className="text-2xl text-secondary">✓</span>
                <p className="text-base font-medium text-foreground">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="text-center">
            <CardTitle>Your donor level</CardTitle>
            <CardDescription>Celebrating your leadership tonight.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <DonorBadge level={donorLevel} amount={totalAmount} />
            </div>
            {nextLevel && (
              <div className="space-y-2 text-center">
                <p className="text-muted-foreground">
                  You’re <strong>${nextLevelAmount - totalAmount}</strong> away from becoming a {nextLevel}.
                </p>
                <Progress value={(totalAmount / nextLevelAmount) * 100} />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button onClick={handleShare} size="lg" className="gap-2">
            <Share2 className="h-4 w-4" /> Share your support
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Back to home</Link>
          </Button>
        </div>

        <StoryTeaseSignup />
      </section>
    </main>
  )
}
