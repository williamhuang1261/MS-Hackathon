'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Pause, Play } from 'lucide-react'

import type { ImpactStoriesProps } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function ImpactStories({ testimonials, autoAdvance = true, autoAdvanceInterval = 6000 }: ImpactStoriesProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const [isPlaying, setIsPlaying] = useState(autoAdvance)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi || !isPlaying) return

    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, autoAdvanceInterval)

    return () => clearInterval(interval)
  }, [emblaApi, isPlaying, autoAdvanceInterval])

  return (
    <section className="space-y-6 rounded-3xl border border-border bg-card/90 p-8 shadow" aria-label="Stories of Hope and Recovery">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-secondary">Stories</p>
          <h2 className="text-3xl font-serif text-foreground">Stories of Hope and Recovery</h2>
          <p className="text-sm text-muted-foreground">Real voices from women we&apos;ve helped (names changed for privacy)</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setIsPlaying((prev) => !prev)} aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={scrollPrev}>
              Previous
            </Button>
            <Button variant="ghost" size="sm" onClick={scrollNext}>
              Next
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.quote} className="mr-4 flex min-w-0 shrink-0 basis-full flex-col border-border/70 bg-background/80 p-6 md:basis-1/2">
              <CardContent className="space-y-4 p-0">
                <span className="text-5xl text-secondary">“</span>
                <p className="text-lg font-serif text-foreground">{testimonial.quote}</p>
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold">{testimonial.attribution}</p>
                  {testimonial.context && <p>{testimonial.context}</p>}
                  {testimonial.language && <p className="text-xs">{testimonial.language}</p>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 w-8 rounded-full transition ${selectedIndex === index ? 'bg-primary' : 'bg-muted'}`}
            aria-label={`Go to story ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
