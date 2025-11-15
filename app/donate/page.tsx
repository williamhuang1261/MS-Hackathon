'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, CreditCard, Lock, Heart, Shield, Users, TrendingUp, Award, Newspaper, Building2, Calendar, ArrowDown } from 'lucide-react'
import confetti from 'canvas-confetti'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Progress } from '../components/ui/progress'
import { Slider } from '../components/ui/slider'
import { Separator } from '../components/ui/separator'
import { Checkbox } from '../components/ui/checkbox'
import BudgetBreakdownChart from '../components/BudgetBreakdownChart'
import AnimatedHouse from '../components/AnimatedHouse'
import Certificate from '../components/Certificate'
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
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'googlepay' | 'applepay' | 'paypal'>('card')
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    isReturning: false
  })
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  })
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({})
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

  // Payment form helpers
  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    const groups = numbers.match(/.{1,4}/g)
    return groups ? groups.join(' ') : numbers
  }

  const formatExpiryDate = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length >= 2) {
      return numbers.slice(0, 2) + '/' + numbers.slice(2, 4)
    }
    return numbers
  }

  const handlePaymentInputChange = (field: string, value: string) => {
    let formattedValue = value

    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value)
      if (formattedValue.replace(/\s/g, '').length > 16) return
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value)
      if (formattedValue.length > 5) return
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '')
      if (formattedValue.length > 3) return
    } else if (field === 'zipCode') {
      formattedValue = value.replace(/\D/g, '')
      if (formattedValue.length > 5) return
    }

    setPaymentInfo({ ...paymentInfo, [field]: formattedValue })
    if (paymentErrors[field]) {
      setPaymentErrors({ ...paymentErrors, [field]: '' })
    }
  }

  const validatePaymentForm = () => {
    const newErrors: Record<string, string> = {}

    if (!donorInfo.name || donorInfo.name.length < 3) {
      newErrors.name = 'Please enter your full name'
    }

    if (!donorInfo.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorInfo.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Only validate card details if paying by card
    if (paymentMethod === 'card') {
      if (!paymentInfo.cardNumber || paymentInfo.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number'
      }

      if (!paymentInfo.cardName || paymentInfo.cardName.length < 3) {
        newErrors.cardName = 'Please enter the cardholder name'
      }

      if (!paymentInfo.expiryDate || paymentInfo.expiryDate.length !== 5) {
        newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)'
      } else {
        const [month, year] = paymentInfo.expiryDate.split('/').map(Number)
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear() % 100
        const currentMonth = currentDate.getMonth() + 1

        if (month < 1 || month > 12) {
          newErrors.expiryDate = 'Invalid month'
        } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
          newErrors.expiryDate = 'Card has expired'
        }
      }

      if (!paymentInfo.cvv || paymentInfo.cvv.length !== 3) {
        newErrors.cvv = 'Please enter a valid 3-digit CVV'
      }

      if (!paymentInfo.address || paymentInfo.address.length < 5) {
        newErrors.address = 'Please enter your billing address'
      }

      if (!paymentInfo.city || paymentInfo.city.length < 2) {
        newErrors.city = 'Please enter your city'
      }

      if (!paymentInfo.state || paymentInfo.state.length < 2) {
        newErrors.state = 'Please enter your state'
      }

      if (!paymentInfo.zipCode || paymentInfo.zipCode.length !== 5) {
        newErrors.zipCode = 'Please enter a valid 5-digit ZIP code'
      }
    }

    setPaymentErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePaymentForm()) {
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const finalAmount = selectedTier || customAmount
    const impactCalc = calculateImpact(finalAmount)
    const tier = getCertificateTier(finalAmount)

    setCompletedDonation({
      amount: finalAmount,
      impact: impactCalc.description,
      tier
    })

    setIsProcessing(false)
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
                      className={`cursor-pointer transition-all ${selectedTier === tier.amount
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
                          <div className={`w-6 h-6 rounded-full border-2 ${selectedTier === tier.amount
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
              className="bg-card rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handlePaymentSubmit}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Complete Your Donation
                  </CardTitle>
                  <CardDescription>
                    Donating {formatCurrency(selectedTier || customAmount)} • Secure payment powered by Stripe
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Payment Method Selection */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`flex items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all ${paymentMethod === 'card'
                            ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                            : 'border-border hover:border-primary/50'
                          }`}
                      >
                        <CreditCard className="h-5 w-5" />
                        <span className="font-medium">Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('googlepay')}
                        className={`flex items-center justify-center rounded-xl border-2 p-4 transition-all ${paymentMethod === 'googlepay'
                            ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                            : 'border-border hover:border-primary/50'
                          }`}
                      >
                        <img src="/icons/googlepay.svg" alt="Google Pay" className="h-6" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('applepay')}
                        className={`flex items-center justify-center rounded-xl border-2 p-4 transition-all ${paymentMethod === 'applepay'
                            ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                            : 'border-border hover:border-primary/50'
                          }`}
                      >
                        <img src="/icons/applepay.svg" alt="Apple Pay" className="h-6" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('paypal')}
                        className={`flex items-center justify-center rounded-xl border-2 p-4 transition-all ${paymentMethod === 'paypal'
                            ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                            : 'border-border hover:border-primary/50'
                          }`}
                      >
                        <img src="/icons/paypal.svg" alt="PayPal" className="h-6" />
                      </button>
                    </div>
                  </div>

                  <Separator />

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          required
                          value={donorInfo.name}
                          onChange={(e) => {
                            setDonorInfo({ ...donorInfo, name: e.target.value })
                            if (paymentErrors.name) setPaymentErrors({ ...paymentErrors, name: '' })
                          }}
                          placeholder="John Doe"
                          className={paymentErrors.name ? 'border-destructive' : ''}
                        />
                        {paymentErrors.name && (
                          <p className="text-sm text-destructive">{paymentErrors.name}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={donorInfo.email}
                          onChange={(e) => {
                            setDonorInfo({ ...donorInfo, email: e.target.value })
                            if (paymentErrors.email) setPaymentErrors({ ...paymentErrors, email: '' })
                          }}
                          placeholder="john@example.com"
                          className={paymentErrors.email ? 'border-destructive' : ''}
                        />
                        {paymentErrors.email && (
                          <p className="text-sm text-destructive">{paymentErrors.email}</p>
                        )}
                        <p className="text-xs text-muted-foreground">Receipt will be sent to this email</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="returning"
                          checked={donorInfo.isReturning}
                          onCheckedChange={(checked) =>
                            setDonorInfo({ ...donorInfo, isReturning: checked as boolean })
                          }
                        />
                        <Label htmlFor="returning" className="cursor-pointer text-sm">
                          I'm a returning donor
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Card Information - Only show for card payments */}
                  {paymentMethod === 'card' && (
                    <>
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          Card Information
                        </h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number *</Label>
                            <Input
                              id="cardNumber"
                              value={paymentInfo.cardNumber}
                              onChange={(e) => handlePaymentInputChange('cardNumber', e.target.value)}
                              placeholder="1234 5678 9012 3456"
                              className={paymentErrors.cardNumber ? 'border-destructive' : ''}
                            />
                            {paymentErrors.cardNumber && (
                              <p className="text-sm text-destructive">{paymentErrors.cardNumber}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cardName">Cardholder Name *</Label>
                            <Input
                              id="cardName"
                              value={paymentInfo.cardName}
                              onChange={(e) => handlePaymentInputChange('cardName', e.target.value)}
                              placeholder="John Doe"
                              className={paymentErrors.cardName ? 'border-destructive' : ''}
                            />
                            {paymentErrors.cardName && (
                              <p className="text-sm text-destructive">{paymentErrors.cardName}</p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiryDate">Expiry Date *</Label>
                              <Input
                                id="expiryDate"
                                value={paymentInfo.expiryDate}
                                onChange={(e) => handlePaymentInputChange('expiryDate', e.target.value)}
                                placeholder="MM/YY"
                                className={paymentErrors.expiryDate ? 'border-destructive' : ''}
                              />
                              {paymentErrors.expiryDate && (
                                <p className="text-sm text-destructive">{paymentErrors.expiryDate}</p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV *</Label>
                              <Input
                                id="cvv"
                                type="password"
                                value={paymentInfo.cvv}
                                onChange={(e) => handlePaymentInputChange('cvv', e.target.value)}
                                placeholder="123"
                                className={paymentErrors.cvv ? 'border-destructive' : ''}
                              />
                              {paymentErrors.cvv && (
                                <p className="text-sm text-destructive">{paymentErrors.cvv}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Billing Address */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Billing Address</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="address">Street Address *</Label>
                            <Input
                              id="address"
                              value={paymentInfo.address}
                              onChange={(e) => handlePaymentInputChange('address', e.target.value)}
                              placeholder="123 Main Street"
                              className={paymentErrors.address ? 'border-destructive' : ''}
                            />
                            {paymentErrors.address && (
                              <p className="text-sm text-destructive">{paymentErrors.address}</p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="city">City *</Label>
                              <Input
                                id="city"
                                value={paymentInfo.city}
                                onChange={(e) => handlePaymentInputChange('city', e.target.value)}
                                placeholder="New York"
                                className={paymentErrors.city ? 'border-destructive' : ''}
                              />
                              {paymentErrors.city && (
                                <p className="text-sm text-destructive">{paymentErrors.city}</p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="state">State *</Label>
                              <Input
                                id="state"
                                value={paymentInfo.state}
                                onChange={(e) => handlePaymentInputChange('state', e.target.value)}
                                placeholder="NY"
                                className={paymentErrors.state ? 'border-destructive' : ''}
                              />
                              {paymentErrors.state && (
                                <p className="text-sm text-destructive">{paymentErrors.state}</p>
                              )}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="zipCode">ZIP Code *</Label>
                            <Input
                              id="zipCode"
                              value={paymentInfo.zipCode}
                              onChange={(e) => handlePaymentInputChange('zipCode', e.target.value)}
                              placeholder="10001"
                              className={`max-w-[200px] ${paymentErrors.zipCode ? 'border-destructive' : ''}`}
                            />
                            {paymentErrors.zipCode && (
                              <p className="text-sm text-destructive">{paymentErrors.zipCode}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Alternative Payment Method Messages */}
                  {paymentMethod === 'googlepay' && (
                    <div className="text-center py-8 space-y-4">
                      <img src="/icons/googlepay.svg" alt="Google Pay" className="h-12 mx-auto" />
                      <div>
                        <p className="text-lg font-semibold mb-2">Complete with Google Pay</p>
                        <p className="text-sm text-muted-foreground">
                          You'll be redirected to complete your donation securely with Google Pay.
                        </p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'applepay' && (
                    <div className="text-center py-8 space-y-4">
                      <img src="/icons/applepay.svg" alt="Apple Pay" className="h-12 mx-auto" />
                      <div>
                        <p className="text-lg font-semibold mb-2">Complete with Apple Pay</p>
                        <p className="text-sm text-muted-foreground">
                          You'll be redirected to complete your donation securely with Apple Pay.
                        </p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="text-center py-8 space-y-4">
                      <img src="/icons/paypal.svg" alt="PayPal" className="h-12 mx-auto" />
                      <div>
                        <p className="text-lg font-semibold mb-2">Complete with PayPal</p>
                        <p className="text-sm text-muted-foreground">
                          You'll be redirected to complete your donation securely with PayPal.
                        </p>
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Impact Summary */}
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-foreground mb-2">Your Impact:</p>
                    <p className="text-sm text-muted-foreground">{impact.description}</p>
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Secure 256-bit SSL encryption</span>
                  </div>
                </CardContent>
                <CardContent className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowPaymentModal(false)}
                    disabled={isProcessing}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 flex items-center gap-2"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        {paymentMethod === 'card'
                          ? `Donate ${formatCurrency(selectedTier || customAmount)}`
                          : `Continue to ${paymentMethod === 'googlepay' ? 'Google Pay' : paymentMethod === 'applepay' ? 'Apple Pay' : 'PayPal'}`
                        }
                      </>
                    )}
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
            className="fixed inset-0 z-50"
          >
            {/* Dark backdrop that gradually lightens */}
            <motion.div
              className="absolute inset-0 backdrop-blur-sm"
              initial={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
              animate={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
              transition={{ duration: 3, ease: 'easeOut' }}
            />

            {/* Colored gradient overlay that fades in */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 3, delay: 0.5, ease: 'easeOut' }}
              style={{
                background: 'radial-gradient(circle at center, rgba(251, 146, 60, 0.25) 0%, rgba(192, 132, 252, 0.25) 50%, rgba(253, 230, 138, 0.15) 100%)'
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
              <div className="text-center space-y-6">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-2xl"
                >
                  You're Bringing Light to Someone's Darkest Hour
                </motion.h2>
                <AnimatedHouse />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="text-lg md:text-xl text-white/95 drop-shadow-lg"
                >
                  Thank you for making a home safe tonight...
                </motion.p>
              </div>
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
