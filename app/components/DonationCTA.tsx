import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

import type { DonationCTAProps } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { Progress } from '@/app/components/ui/progress'

export default function DonationCTA({
  heading = 'Help Us Save Lives',
  subheading = "Your support provides emergency shelter, legal aid, and multilingual services to women and children escaping violence.",
  donationOptions,
  showImpactStatement = true,
  showFundraisingGoal = true,
  currentFunds = 3.2,
  goalFunds = 5,
}: DonationCTAProps) {
  const progressValue = Math.min(100, Math.round((currentFunds / goalFunds) * 100))

  return (
    <section className="space-y-8 rounded-3xl border border-border bg-card/80 p-8 shadow-xl">
      <div className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-secondary">Take Action</p>
        <h2 className="text-3xl font-serif text-foreground md:text-4xl">{heading}</h2>
        <p className="text-muted-foreground">{subheading}</p>
      </div>

      {showFundraisingGoal && (
        <div className="rounded-2xl border border-border/70 bg-background/70 p-6 text-center">
          <p className="text-sm uppercase tracking-wide text-muted-foreground">Shelter Expansion Goal</p>
          <p className="mt-3 text-4xl font-serif text-primary">
            ${currentFunds.toFixed(1)}M <span className="text-base text-muted-foreground">raised of ${goalFunds.toFixed(1)}M</span>
          </p>
          <Progress value={progressValue} className="mt-4" />
          <p className="mt-2 text-xs text-muted-foreground">Campaign: $5 Million to expand emergency shelter capacity</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {donationOptions.map((option) => {
          const Icon = option.icon
          return (
            <Card key={option.title} className="flex flex-col border-border/70 bg-background/80 shadow hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Icon className="h-8 w-8 text-primary" />
                  {option.badge && <Badge className="bg-secondary/20 text-secondary-foreground">{option.badge}</Badge>}
                </div>
                <CardTitle className="text-2xl font-serif">{option.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{option.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button asChild variant="secondary" className="w-full">
                  <Link href={option.ctaHref} target={option.external ? '_blank' : undefined} rel={option.external ? 'noreferrer noopener' : undefined} aria-label={`${option.title} – ${option.ctaText}`}>
                    {option.ctaText}
                    {option.external && <ExternalLink className="ml-2 h-4 w-4" />}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {showImpactStatement && (
        <div className="rounded-2xl border border-border/70 bg-background/60 p-6 text-sm text-muted-foreground">
          <p className="font-semibold uppercase tracking-wide text-secondary">Impact of Your Gift</p>
          <ul className="mt-3 grid gap-2 md:grid-cols-3">
            <li>$50 provides emergency supplies for one family</li>
            <li>$100 funds legal consultation</li>
            <li>$250 supports one night of shelter for a family</li>
          </ul>
          <p className="mt-3 text-xs">Charitable tax receipts issued through Canada Helps · Registration # pending</p>
        </div>
      )}
    </section>
  )
}
