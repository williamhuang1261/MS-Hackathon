import Link from 'next/link'
import { CalendarDays, MapPin, Ticket } from 'lucide-react'

import type { UpcomingEventsProps } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-CA', { month: 'long', day: 'numeric', year: 'numeric' }).format(date)

export default function UpcomingEvents({ primaryEvent, secondaryEvents = [], showSponsorship = true }: UpcomingEventsProps) {
  return (
    <section className="space-y-8 rounded-3xl border border-border bg-muted/20 p-8">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-secondary">Community</p>
        <h2 className="text-3xl font-serif text-foreground">Upcoming Events</h2>
        <p className="text-muted-foreground">Join us to sustain emergency services for women and children across Montréal and Laval.</p>
      </div>

      <Card className="overflow-hidden border-border bg-card/80 shadow-lg">
        <div className="grid gap-0 lg:grid-cols-2">
          <div className="relative min-h-[260px] bg-gradient-to-br from-secondary/30 to-primary/20 p-6">
            <div className="rounded-3xl border border-border/40 bg-background/80 p-4 text-center text-secondary">
              <p className="text-sm uppercase tracking-wide">{primaryEvent.date.toLocaleString('en-US', { month: 'short' })}</p>
              <p className="text-5xl font-serif text-primary">{primaryEvent.date.getDate()}</p>
              <p className="text-sm font-semibold">{primaryEvent.date.getFullYear()}</p>
            </div>
          </div>
          <div className="p-6">
            <Badge className="mb-3 bg-secondary/20 text-secondary-foreground">Featured</Badge>
            <CardTitle className="text-3xl font-serif text-primary">{primaryEvent.title}</CardTitle>
            <CardDescription className="mt-2 text-base text-muted-foreground">{primaryEvent.description}</CardDescription>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              {primaryEvent.location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {primaryEvent.location}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                {formatDate(primaryEvent.date)} {primaryEvent.time && `· ${primaryEvent.time}`}
              </span>
              {primaryEvent.ticketPrice && (
                <span className="inline-flex items-center gap-1">
                  <Ticket className="h-4 w-4" />
                  ${primaryEvent.ticketPrice} {primaryEvent.ticketCurrency}
                </span>
              )}
            </div>
            {primaryEvent.features && (
              <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                {primaryEvent.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              {primaryEvent.ticketLink && (
                <Button asChild>
                  <Link href={primaryEvent.ticketLink} target="_blank" rel="noreferrer">
                    Buy Tickets
                  </Link>
                </Button>
              )}
              {showSponsorship && primaryEvent.sponsorshipEmail && (
                <Button asChild variant="ghost">
                  <Link href={`mailto:${primaryEvent.sponsorshipEmail}`}>Become a Sponsor</Link>
                </Button>
              )}
            </div>
            {showSponsorship && primaryEvent.sponsorshipPhone && (
              <p className="mt-3 text-xs text-muted-foreground">
                Sponsorship inquiries: <a href={`tel:${primaryEvent.sponsorshipPhone}`} className="font-semibold text-primary">{primaryEvent.sponsorshipPhone}</a>
              </p>
            )}
          </div>
        </div>
      </Card>

      {secondaryEvents.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {secondaryEvents.map((event) => (
            <Card key={event.title} className="border-border/60 bg-card/70">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">{event.title}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong>Date:</strong> {formatDate(event.date)}
                </p>
                {event.location && (
                  <p>
                    <strong>Location:</strong> {event.location}
                  </p>
                )}
                {event.ticketLink && (
                  <Button asChild variant="outline" size="sm">
                    <Link href={event.ticketLink}>RSVP</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Separator className="opacity-40" />
      <p className="text-sm text-muted-foreground">
        Sponsorship packages include visibility opportunities, reserved seating, and direct impact on our 5M$ shelter expansion campaign.
      </p>
    </section>
  )
}
