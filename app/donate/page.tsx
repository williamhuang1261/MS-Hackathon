'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, Heart, Users, TrendingUp, Award, Newspaper, Building2, Calendar } from 'lucide-react'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Progress } from '@/app/components/ui/progress'
import { Slider } from '@/app/components/ui/slider'
import { Separator } from '@/app/components/ui/separator'
import { Checkbox } from '@/app/components/ui/checkbox'
import BudgetBreakdownChart from '@/app/components/BudgetBreakdownChart'
import AnimatedHouse from '@/app/components/AnimatedHouse'
import Certificate from '@/app/components/Certificate'
import { calculateImpact, formatCurrency, getCertificateTier, type CertificateTier } from '@/lib/donation-utils'

// Predefined donation tiers
const IMPACT_TIERS = [
  {
    amount: 75,
    title: 'One Night of Safety',
    benefits: ['1 night of shelter', 'Counseling session', "Children's care"]
  },
  {
    amount: 100,
    title: 'Week of Transformation',
    benefits: ['7 nights shelter', 'Job training workshop', 'Legal consultation']
  },
  {
    amount: 500,
    title: 'Month of Stability',
    benefits: ['30 days shelter', 'Mental health support', 'Childcare']
  }
]

// Mock data
const MONTHLY_GOAL = {
  target: 100,
  current: 68,
  families: 68
}

const WEEKLY_DONATIONS = 12

const THIS_MONTH_IMPACT = [
  { label: 'Meals Served', value: '847', icon: Heart },
  { label: 'Families Housed', value: '23', icon: Users },
  { label: 'Counseling Sessions', value: '156', icon: TrendingUp }
]

const CREDIBILITY_ITEMS = [
  { type: 'award', text: '2023 Community Impact Award Winner', icon: Award },
  { type: 'media', text: 'As seen in CBC, CTV, Montreal Gazette', icon: Newspaper },
  { type: 'years', text: '34 years of trusted service', icon: Building2 },
  { type: 'stat', text: '1 in 3 women experience domestic violence (Stats Canada, 2022)', icon: Calendar }
]

export default function Donate() {
  const [selectedTier, setSelectedTier] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState<number>(75)
  const [sliderAmount, setSliderAmount] = useState<number>(75)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showCertificate, setShowCertificate] = useState(false)
  const [showHouseAnimation, setShowHouseAnimation] = useState(false)
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    isReturning: false
  })
  const [completedDonation, setCompletedDonation] = useState<{
    amount: number
    impact: string
    tier: CertificateTier
  } | null>(null)

  const learnMoreRef = useRef<HTMLDivElement>(null)

  const impact = calculateImpact(selectedTier || customAmount)

  const scrollToLearnMore = () => {
    learnMoreRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleDonateClick = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const finalAmount = selectedTier || customAmount
    const impactCalc = calculateImpact(finalAmount)
    const tier = getCertificateTier(finalAmount)
    
    setCompletedDonation({
      amount: finalAmount,
      impact: impactCalc.description,
      tier
    })
    
    setShowPaymentModal(false)
    setShowHouseAnimation(true)
    
    // Show certificate after house animation
    setTimeout(() => {
      setShowHouseAnimation(false)
      setShowCertificate(true)
    }, 4000)
  }

  const handleSliderChange = (value: number[]) => {
    const newValue = value[0]
    setSliderAmount(newValue)
    setCustomAmount(newValue)
    setSelectedTier(null)
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 75
    setCustomAmount(value)
    setSliderAmount(value)
    setSelectedTier(null)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Progress */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12">
        <div className="container max-w-6xl mx-auto px-4 space-y-6">
          {/* Progress Bar */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-serif font-bold text-foreground">
                    Monthly Goal Progress
                  </p>
                  <p className="text-muted-foreground">
                    We're {MONTHLY_GOAL.current}% to our goal of housing {MONTHLY_GOAL.target} families
                  </p>
                </div>
                <Badge variant="default" className="text-lg px-4 py-2">
                  {WEEKLY_DONATIONS} donations this week
                </Badge>
              </div>
              <Progress value={MONTHLY_GOAL.current} className="h-3" />
              <p className="text-sm text-muted-foreground text-right">
                {MONTHLY_GOAL.families} of {MONTHLY_GOAL.target} families helped this month
              </p>
            </CardContent>
          </Card>

          {/* Main Donation Form */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl font-serif text-center">Choose Your Impact</CardTitle>
              <CardDescription className="text-center text-lg">
                Instead of arbitrary amounts, see the real difference you'll make
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Impact Tier Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                {IMPACT_TIERS.map((tier) => (
                  <motion.div
                    key={tier.amount}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all ${
                        selectedTier === tier.amount
                          ? 'border-primary border-2 shadow-lg'
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => {
                        setSelectedTier(tier.amount)
                        setSliderAmount(tier.amount)
                        setCustomAmount(tier.amount)
                      }}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-2xl">{formatCurrency(tier.amount)}</CardTitle>
                          <div className={`w-6 h-6 rounded-full border-2 ${
                            selectedTier === tier.amount
                              ? 'bg-primary border-primary'
                              : 'border-muted'
                          }`} />
                        </div>
                        <CardDescription className="font-semibold text-lg text-foreground">
                          {tier.title}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {tier.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <span className="text-primary">→</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Custom Amount Card */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Custom Amount - Your Impact</CardTitle>
                  <CardDescription>
                    Choose any amount and see your personalized impact
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Label htmlFor="custom-amount" className="whitespace-nowrap">
                        Amount (CAD):
                      </Label>
                      <Input
                        id="custom-amount"
                        type="number"
                        min="10"
                        max="10000"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className="text-2xl font-bold"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Or use the slider:</Label>
                      <Slider
                        value={[sliderAmount]}
                        onValueChange={handleSliderChange}
                        min={75}
                        max={5000}
                        step={25}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>$75</span>
                        <span>$5,000+</span>
                      </div>
                    </div>
                  </div>

                  {/* Impact Calculator */}
                  <Card className="bg-primary/10 border-primary/30">
                    <CardContent className="pt-6">
                      <p className="text-lg font-semibold text-foreground mb-2">
                        Your {formatCurrency(selectedTier || customAmount)} provides:
                      </p>
                      <p className="text-muted-foreground">
                        {impact.description}
                      </p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6"
                  onClick={handleDonateClick}
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Donate Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6"
                  onClick={scrollToLearnMore}
                >
                  Learn More
                  <ArrowDown className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Learn More Section */}
      <section ref={learnMoreRef} className="py-16 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4 space-y-12">
          {/* Budget Breakdown */}
          <BudgetBreakdownChart />

          {/* This Month's Impact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-serif">This Month's Impact</CardTitle>
              <CardDescription>Real-time results from your community's generosity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {THIS_MONTH_IMPACT.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="text-center space-y-2">
                      <Icon className="h-8 w-8 text-primary mx-auto" />
                      <p className="text-4xl font-bold text-primary">{item.value}</p>
                      <p className="text-muted-foreground">{item.label}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Credibility Carousel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Why Trust Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {CREDIBILITY_ITEMS.map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                      <Icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <p className="text-foreground">{item.text}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Back to Top Donate Button */}
          <div className="text-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Heart className="mr-2 h-5 w-5" />
              Donate Now
            </Button>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-card rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handlePaymentSubmit}>
                <CardHeader>
                  <CardTitle>Complete Your Donation</CardTitle>
                  <CardDescription>
                    Donating {formatCurrency(selectedTier || customAmount)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={donorInfo.name}
                      onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="returning"
                      checked={donorInfo.isReturning}
                      onCheckedChange={(checked) =>
                        setDonorInfo({ ...donorInfo, isReturning: checked as boolean })
                      }
                    />
                    <Label htmlFor="returning" className="cursor-pointer">
                      I'm a returning donor
                    </Label>
                  </div>

                  <Separator />

                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-foreground mb-2">Your Impact:</p>
                    <p className="text-sm text-muted-foreground">{impact.description}</p>
                  </div>
                </CardContent>
                <CardContent className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowPaymentModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Complete Donation
                  </Button>
                </CardContent>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* House Animation */}
      <AnimatePresence>
        {showHouseAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-primary/20 to-background p-4"
          >
            <div className="text-center space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-serif font-bold text-foreground"
              >
                You're Bringing Light to Someone's Darkest Hour
              </motion.h2>
              <AnimatedHouse />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-lg text-muted-foreground"
              >
                Thank you for making a home safe tonight...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Reveal */}
      <AnimatePresence>
        {showCertificate && completedDonation && (
          <Certificate
            donorName={donorInfo.name || 'Anonymous Supporter'}
            amount={completedDonation.amount}
            impactDescription={completedDonation.impact}
            tier={completedDonation.tier}
            onClose={() => setShowCertificate(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
