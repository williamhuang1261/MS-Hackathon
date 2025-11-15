import Link from 'next/link'

import type { ServicesOverviewProps } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function ServicesOverview({ services, heading = 'Our Services', subheading = 'Comprehensive multilingual support for every stage of recovery' }: ServicesOverviewProps) {
  return (
    <section className="space-y-6 rounded-3xl border border-border bg-background/80 p-8 shadow" id="services">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-secondary">Services</p>
        <h2 className="mt-2 text-3xl font-serif text-foreground md:text-4xl">{heading}</h2>
        <p className="mt-2 text-base text-muted-foreground">{subheading}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <Card key={service.title} className="flex flex-col border-border/70 bg-card/70 shadow hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="relative">
                <Icon className="mb-4 h-12 w-12 text-secondary" />
                {service.badge && (
                  <Badge className="absolute right-4 top-4 bg-secondary/10 text-secondary-foreground">
                    {service.badge}
                  </Badge>
                )}
                <CardTitle className="text-2xl font-serif text-foreground">{service.title}</CardTitle>
                {service.subtitle && <CardDescription className="text-sm font-semibold text-muted-foreground">{service.subtitle}</CardDescription>}
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between">
                <p className="text-sm text-muted-foreground">{service.description}</p>
                <Button asChild variant="ghost" className="mt-6 justify-start px-0 text-primary">
                  <Link href={service.ctaHref} aria-label={`${service.title} – ${service.ctaText}`}>
                    {service.ctaText}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
