'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { OPTIONAL_UPSELLS, ROUTES, STORAGE_KEYS, UPSELL_OPTIONS } from '@/lib/constants'
import { getStorageItem, setStorageItem } from '@/lib/utils'
import type { ImpactStory } from '@/lib/types'

const stories: ImpactStory[] = [
  {
    title: 'Amina Ran for Her Life Tonight',
    content: [
      "Tonight, Amina didn't plan to run.",
      "She didn't even have time to take her phone.",
      'She heard the voice she fears the most — and knew she only had seconds.',
      'Your donation is the reason she is not in that house right now.',
      'Your donation is why she is in a locked, warm room… alive, safe, protected.',
    ],
  },
  {
    title: 'The Closet Story',
    content: [
      'When Amina called, she was whispering from inside a closet.',
      'She was holding the door shut with her foot, praying he would not hear her breathing.',
      'Our team got to her as fast as they could.',
      'Your donation is the reason our hotline and transport team were ready.',
      'Your donation is the reason she is behind a locked door, wrapped in a blanket, finally able to breathe.',
    ],
  },
]

export default function Upsell() {
  const router = useRouter()
  const [originalAmount, setOriginalAmount] = useState(0)
  const [selectedStory, setSelectedStory] = useState<ImpactStory>(stories[0])

  useEffect(() => {
    const amount = getStorageItem(STORAGE_KEYS.donationAmount)
    if (amount) setOriginalAmount(Number(amount))
    setSelectedStory(stories[Math.floor(Math.random() * stories.length)])
  }, [])

  const handleAddAmount = (amount: number) => {
    const newTotal = originalAmount + amount
    setStorageItem(STORAGE_KEYS.totalDonationAmount, newTotal.toString())
    setStorageItem(STORAGE_KEYS.additionalAmount, amount.toString())
    router.push(ROUTES.thankYou)
  }

  const handleSkip = () => {
    setStorageItem(STORAGE_KEYS.totalDonationAmount, originalAmount.toString())
    setStorageItem(STORAGE_KEYS.additionalAmount, '0')
    router.push(ROUTES.thankYou)
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-12">
      <section className="text-center">
        <Badge variant="outline" className="border-secondary/40 bg-secondary/10">
          Add a little more safety?
        </Badge>
        <h1 className="mt-4 text-4xl font-serif">Your impact is immediate.</h1>
        <p className="mt-2 text-muted-foreground">
          You just donated <span className="font-semibold text-primary">${originalAmount}</span>
        </p>
      </section>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-center">{selectedStory.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          {selectedStory.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader className="text-center">
          <CardTitle>Would you like to extend your impact?</CardTitle>
          <CardDescription>Every add-on funds another urgent need tonight.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {UPSELL_OPTIONS.map(({ amount, label, description }) => (
            <Button
              key={amount}
              variant="outline"
              className="flex w-full items-center justify-between rounded-2xl border-2 border-border px-6 py-4 text-left text-base"
              onClick={() => handleAddAmount(amount)}
            >
              <span className="font-semibold text-foreground">{label}</span>
              <span className="text-sm text-muted-foreground">{description}</span>
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader className="text-center">
          <CardTitle>Or add even more impact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {OPTIONAL_UPSELLS.map(({ amount, label, description }) => (
            <Button
              key={amount}
              variant="ghost"
              className="flex w-full items-center justify-between rounded-2xl bg-muted/40 px-6 py-4 text-left"
              onClick={() => handleAddAmount(amount)}
            >
              <span className="font-semibold">{label}</span>
              <span className="text-sm text-muted-foreground">{description}</span>
            </Button>
          ))}
        </CardContent>
      </Card>

      <div className="text-center">
        <Button onClick={handleSkip} variant="link" className="text-muted-foreground">
          Continue anyways
        </Button>
      </div>
    </main>
  )
}
