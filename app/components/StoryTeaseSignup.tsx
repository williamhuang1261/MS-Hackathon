'use client'

import { FormEvent, useState } from 'react'

import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'

export default function StoryTeaseSignup() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail('')
    }, 3000)
  }

  return (
    <section className="rounded-3xl border border-border bg-muted/30 p-8">
      <div className="text-center">
        <span className="text-4xl" role="img" aria-label="purple heart">
          💜
        </span>
        <h2 className="mt-4 text-3xl font-serif md:text-4xl">Tomorrow, Amina wakes up safe because of you.</h2>
        <p className="mt-2 text-lg text-muted-foreground">Stay connected to the lives you’re protecting.</p>
      </div>

      <Card className="mt-8 border-border shadow-lg">
        <CardHeader className="text-center">
          <CardTitle>Stay Connected to Your Impact</CardTitle>
          <CardDescription>
            Monthly letters from survivors and staff so you can see how your donation continues to save lives.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                required
                className="flex-1"
              />
              <Button type="submit" className="whitespace-nowrap">
                Get Updates
              </Button>
            </form>
          ) : (
            <div className="rounded-2xl border border-secondary bg-secondary/10 p-4 text-center">
              <p className="text-lg font-semibold text-secondary">Thank you! You’ll receive your first update soon.</p>
            </div>
          )}
          <p className="mt-4 text-center text-xs text-muted-foreground">
            We respect your privacy. Unsubscribe anytime. No spam, ever.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
