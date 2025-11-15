'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'

import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Progress } from '@/app/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from '@/app/components/ui/toggle-group'
import { MONTHLY_TIERS, ONE_TIME_TIERS, ROUTES, STORAGE_KEYS } from '@/lib/constants'
import { setStorageItem } from '@/lib/utils'
import type { DonationType } from '@/lib/types'

const DONATION_FREQUENCY: { label: string; value: DonationType; subline: string }[] = [
  { label: 'One-Time', value: 'one-time', subline: 'Immediate crisis response' },
  { label: 'Monthly', value: 'monthly', subline: 'Keeps the hotline staffed' },
]

export default function Donate() {
  const router = useRouter()
  const [donationType, setDonationType] = useState<DonationType>('one-time')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)

  const tiers = donationType === 'one-time' ? ONE_TIME_TIERS : MONTHLY_TIERS

  const handleComplete = () => {
    if (selectedAmount) {
      setStorageItem(STORAGE_KEYS.donationAmount, selectedAmount.toString())
      setStorageItem(STORAGE_KEYS.donationType, donationType)
      router.push(ROUTES.upsell)
    }
  }

  const handleTierChange = (value: string) => {
    const numeric = Number(value)
    setSelectedAmount(Number.isFinite(numeric) ? numeric : null)
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-12" id="monthly">
      <Card className="overflow-hidden border-none bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <CardHeader className="text-center">
          <Badge variant="outline" className="mx-auto border-white/50 bg-white/10 text-xs font-semibold uppercase tracking-widest">
            Choose your impact
          </Badge>
          <CardTitle className="text-4xl font-serif">Every dollar becomes a safe night.</CardTitle>
          <CardDescription className="text-base text-primary-foreground/80">
            Your donation fuels shelter beds, trauma therapy, transportation, and the 24/7 hotline.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="space-y-6 border-border">
          <CardHeader>
            <CardTitle>Donation type</CardTitle>
            <CardDescription>Select how you’d like to stand guard tonight.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ToggleGroup
              type="single"
              value={donationType}
              onValueChange={(value) => {
                if (!value) return
                setDonationType(value as DonationType)
                setSelectedAmount(null)
              }}
              className="flex flex-wrap gap-3"
            >
              {DONATION_FREQUENCY.map((option) => (
                <ToggleGroupItem key={option.value} value={option.value}>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <span>{option.label}</span>
                    <span className="text-xs font-normal text-muted-foreground">{option.subline}</span>
                  </div>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>

            <div className="space-y-3">
              <Label htmlFor="custom">Custom amount</Label>
              <Input
                id="custom"
                type="number"
                min={5}
                step={5}
                placeholder="Enter a different amount"
                value={selectedAmount ?? ''}
                onChange={(event) => {
                  const { value } = event.target
                  if (value === '') {
                    setSelectedAmount(null)
                    return
                  }
                  const numeric = Number(value)
                  setSelectedAmount(Number.isFinite(numeric) ? numeric : null)
                }}
              />
            </div>

            <Tabs value={donationType} className="w-full">
              <TabsList className="w-full justify-between">
                <TabsTrigger value="one-time" className="flex-1">
                  One-Time Support
                </TabsTrigger>
                <TabsTrigger value="monthly" className="flex-1">
                  Monthly Ally
                </TabsTrigger>
              </TabsList>
              <TabsContent value={donationType} className="border-none bg-transparent p-0">
                <RadioGroup
                  value={selectedAmount?.toString() ?? ''}
                  onValueChange={handleTierChange}
                >
                  {tiers.map(({ amount, label, description }) => (
                    <RadioGroupItem key={amount} value={amount.toString()}>
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-2xl font-semibold">{label}</p>
                          <p className="text-sm text-muted-foreground">{description}</p>
                        </div>
                        {selectedAmount === amount && (
                          <Badge variant="outline" className="flex items-center gap-1 bg-primary/10 text-primary">
                            <Check className="h-3.5 w-3.5" /> Selected
                          </Badge>
                        )}
                      </div>
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="space-y-6 border-border bg-muted/30">
          <CardHeader>
            <CardTitle>Impact preview</CardTitle>
            <CardDescription>Before you submit, see what tonight will feel like.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <p className="text-4xl font-serif text-primary">
                {selectedAmount ? `$${selectedAmount.toLocaleString()}` : '--'}
              </p>
              <p className="text-sm text-muted-foreground">Amount applied to Athena’s House</p>
            </div>
            <div>
              <Label>Programs funded</Label>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>• Emergency transport to the shelter</li>
                <li>• 24/7 hotline staffing</li>
                <li>• Warm meals, therapy, and essentials</li>
              </ul>
            </div>
            <div>
              <Label>Program allocation</Label>
              <Progress value={80} className="mt-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                80% directly funds programs · 20% powers operations so every call gets answered.
              </p>
            </div>
            <Button
              onClick={handleComplete}
              disabled={!selectedAmount}
              className="w-full"
              size="lg"
            >
              {selectedAmount ? 'Complete Donation' : 'Select an Amount'}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Tax receipts are issued automatically (demo experience).
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card/70 p-6 text-center">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            🟣 80% of funds go directly to programs
          </CardTitle>
          <CardDescription>
            The other 20% powers operations so we can serve more women in crisis.
          </CardDescription>
        </CardHeader>
      </Card>

      <p className="text-center text-base italic text-muted-foreground">
        You’re the kind of person who doesn’t look away.
      </p>
    </main>
  )
}
