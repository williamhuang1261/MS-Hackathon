'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HeartHandshake, ShieldCheck } from 'lucide-react'

import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'
import {
  DONATION_IMPACT,
  DONOR_LEVELS,
  MONTHLY_TIERS,
  ONE_TIME_TIERS,
  ROUTES,
} from '@/lib/constants'
import type { DonationTier, DonationType } from '@/lib/types'

const FREQUENCY_CONTENT: Record<DonationType, { label: string; tagline: string; helper: string }> = {
  'one-time': {
    label: 'One-Time Gift',
    tagline: 'Immediate crisis response',
    helper: 'Keeps a family safe tonight with food, transport, and a private room.',
  },
  monthly: {
    label: 'Monthly Ally',
    tagline: 'Predictable protection',
    helper: 'Funds the hotline, therapy, and cultural-linguistic services every month.',
  },
}

const FEATURED_TIER: Record<DonationType, number> = {
  'one-time': 100,
  monthly: 50,
}

const PLAN_MAP: Record<DonationType, DonationTier[]> = {
  'one-time': ONE_TIME_TIERS.map((tier) => ({ ...tier })),
  monthly: MONTHLY_TIERS.map((tier) => ({ ...tier })),
}

const formatRange = (min: number, max: number) => {
  if (!Number.isFinite(max)) return `$${min.toLocaleString()}+`
  if (min === 0) return `Up to $${max.toLocaleString()}`
  return `$${min.toLocaleString()} - $${max.toLocaleString()}`
}

export default function DonationPlans() {
  const [frequency, setFrequency] = useState<DonationType>('monthly')

  return (
    <section id="donate" className="rounded-3xl border border-border bg-card/40 p-6 shadow-lg md:p-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <div className="flex-1 space-y-8">
          <div className="space-y-3 text-center lg:text-left">
            <Badge variant="outline" className="mx-auto w-fit border-accent/50 text-accent lg:mx-0">
              Trauma-informed giving
            </Badge>
            <h2 className="text-4xl font-serif text-foreground sm:text-5xl">
              Fund the exact moment of safety you want to create.
            </h2>
            <p className="text-base text-muted-foreground">
              Choose a one-time rescue or monthly partnership—every option maps to a real program in Montréal and Laval.
            </p>
          </div>

          <Tabs value={frequency} onValueChange={(value) => setFrequency(value as DonationType)} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 overflow-hidden rounded-full border border-border bg-muted/30 p-1">
              {(Object.keys(FREQUENCY_CONTENT) as DonationType[]).map((key) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide"
                >
                  <div className="flex flex-col text-center">
                    <span>{FREQUENCY_CONTENT[key].label}</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {FREQUENCY_CONTENT[key].tagline}
                    </span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {(Object.keys(FREQUENCY_CONTENT) as DonationType[]).map((key) => (
              <TabsContent key={key} value={key} className="space-y-6 focus-visible:outline-none">
                <div className="rounded-2xl border border-dashed border-border/60 bg-muted/20 p-4 text-center text-sm text-muted-foreground">
                  {FREQUENCY_CONTENT[key].helper}
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  {PLAN_MAP[key].map((tier) => {
                    const isFeatured = tier.amount === FEATURED_TIER[key]
                    return (
                      <Card
                        key={`${key}-${tier.amount}`}
                        className={`flex h-full flex-col border-border/70 bg-background/80 shadow-xl transition hover:-translate-y-1 ${
                          isFeatured ? 'border-emergency shadow-emergency/20' : ''
                        }`}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <CardTitle className="text-3xl font-serif text-foreground">{tier.label}</CardTitle>
                              <CardDescription className="text-base text-muted-foreground">
                                {tier.description}
                              </CardDescription>
                            </div>
                            {isFeatured && (
                              <Badge variant="outline" className="border-emergency/40 bg-emergency/10 text-emergency">
                                Most Impact
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="rounded-2xl bg-muted/30 p-4 text-sm text-muted-foreground">
                            <p className="font-semibold text-foreground">
                              {key === 'one-time' ? 'Tonight it covers:' : 'Every month it powers:'}
                            </p>
                            <p>{tier.description}</p>
                          </div>
                          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                            Tax receipt eligible
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button asChild className="w-full" variant={isFeatured ? 'default' : 'secondary'}>
                            <Link
                              href={`${ROUTES.donate}?type=${key}&amount=${tier.amount}`}
                              aria-label={`Give ${tier.label} as a ${FREQUENCY_CONTENT[key].label}`}
                            >
                              Give {tier.label}
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <aside className="w-full space-y-6 lg:w-[320px]">
          <Card className="h-full border-border/80 bg-card/70">
            <CardHeader>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emergency" aria-hidden />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Guaranteed impact</p>
                  <CardTitle className="text-2xl font-serif">What your gift unlocks</CardTitle>
                </div>
              </div>
              <CardDescription className="text-sm text-muted-foreground">
                Direct program funding, audited annually.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {DONATION_IMPACT.map((item) => (
                <div key={item} className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm text-foreground">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-card/80">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <HeartHandshake className="h-5 w-5 text-secondary" aria-hidden />
                <CardTitle className="text-xl font-serif">Donor Levels</CardTitle>
              </div>
              <CardDescription className="text-sm text-muted-foreground">
                Recognition that celebrates every guardian of Athena’s House.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {DONOR_LEVELS.map((level) => (
                <div
                  key={level.name}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-border/70 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {level.emoji} {level.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatRange(level.minAmount, level.maxAmount)}</p>
                  </div>
                  <Badge variant="outline" className="border-border/70 text-xs">
                    Level {level.level}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </section>
  )
}
