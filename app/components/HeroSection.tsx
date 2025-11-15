import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

import type { HeroSectionProps } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export default function HeroSection({ headline, subheadline, ctaButtons, trustIndicators, backgroundImage }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-border bg-gradient-to-br from-primary/5 via-background to-secondary/10 p-8 text-foreground shadow-xl">
      {backgroundImage && (
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
      )}
      <div className="relative z-10 flex flex-col gap-10 lg:flex-row">
        <div className="space-y-6 lg:w-1/2">
          <Badge variant="outline" className="w-fit border-primary/40 bg-primary/10 text-primary">
            Shield of Athena
          </Badge>
          <div className="space-y-4">
            <h1 className="text-4xl font-serif leading-tight tracking-tight text-foreground md:text-6xl">
              {headline}
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">{subheadline}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {ctaButtons.map((cta) => (
              <Button
                key={cta.text}
                asChild
                variant={cta.variant}
                size="lg"
                className={cn(cta.variant === 'secondary' && 'bg-secondary/15 text-secondary-foreground')}
              >
                <Link href={cta.href} target={cta.external ? '_blank' : undefined} rel={cta.external ? 'noreferrer noopener' : undefined}>
                  {cta.text}
                  {cta.external && <ExternalLink className="ml-2 h-4 w-4" />}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="grid gap-4 sm:grid-cols-2">
            {trustIndicators.map((indicator) => {
              const Icon = indicator.icon
              return (
                <div key={indicator.label} className="rounded-2xl border border-border/60 bg-card/70 p-4 shadow">
                  {Icon && <Icon className="mb-3 h-6 w-6 text-secondary" />}
                  <p className="text-3xl font-serif text-primary">{indicator.stat}</p>
                  <p className="text-sm text-muted-foreground">{indicator.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
