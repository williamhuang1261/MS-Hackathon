"use client"


import { formatCurrency } from "@/lib/donation-utils";
import { Progress } from "@radix-ui/react-progress";
import { Slider } from "@radix-ui/react-slider";
import { motion } from "framer-motion";
import React from "react";
import StickyHeader from "../LandingPage/StickyHeader";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { ArrowDown, Heart } from "lucide-react";

const IMPACT_TIERS = [
  {
    amount: 75,
    title: "One Night of Safety",
    benefits: ["1 night of shelter", "Counseling session", "Children's care"],
  },
  {
    amount: 100,
    title: "Week of Transformation",
    benefits: [
      "7 nights shelter",
      "Job training workshop",
      "Legal consultation",
    ],
  },
  {
    amount: 500,
    title: "Month of Stability",
    benefits: ["30 days shelter", "Mental health support", "Childcare"],
  },
];

const MONTHLY_GOAL = {
  target: 100,
  current: 68,
  families: 68,
};

const WEEKLY_DONATIONS = 12;

interface Props {
  selectedTier: number | null;
  setSelectedTier: (amount: number) => void;
  setSliderAmount: (amount: number) => void;
  setCustomAmount: (amount: number) => void;
  customAmount: number;
  sliderAmount: number;
  impact: {
    description: string;
  };
  handleCustomAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSliderChange: (value: number[]) => void;
  handleDonateClick: () => void;
  scrollToLearnMore: () => void;
}

const HeroSection = ({
  selectedTier,
  setSelectedTier,
  setSliderAmount,
  setCustomAmount,
  customAmount,
  sliderAmount,
  impact,
  handleCustomAmountChange,
  handleSliderChange,
  handleDonateClick,
  scrollToLearnMore,
}: Props) => {
  return (
    <section className="bg-linear-to-br from-primary/10 via-background to-secondary/10 py-12">
      <div className="px-16 mb-8">
        <StickyHeader showDonation={false} />
      </div>
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
                  We're {MONTHLY_GOAL.current}% to our goal of housing{" "}
                  {MONTHLY_GOAL.target} families
                </p>
              </div>
              <Badge variant="default" className="text-lg px-4 py-2">
                {WEEKLY_DONATIONS} donations this week
              </Badge>
            </div>
            <Progress value={MONTHLY_GOAL.current} className="h-3" />
            <p className="text-sm text-muted-foreground text-right">
              {MONTHLY_GOAL.families} of {MONTHLY_GOAL.target} families helped
              this month
            </p>
          </CardContent>
        </Card>

        {/* Main Donation Form */}
        <Card className="bg-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-3xl font-serif text-center">
              Choose Your Impact
            </CardTitle>
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
                        ? "border-accent border-2 shadow-lg"
                        : "hover:border-accent/50"
                    }`}
                    onClick={() => {
                      setSelectedTier(tier.amount);
                      setSliderAmount(tier.amount);
                      setCustomAmount(tier.amount);
                    }}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl">
                          {formatCurrency(tier.amount)}
                        </CardTitle>
                        <div
                          className={`w-6 h-6 rounded-full border-2 ${
                            selectedTier === tier.amount
                              ? "bg-accent border-accent"
                              : "border-muted"
                          }`}
                        />
                      </div>
                      <CardDescription className="font-semibold text-lg text-foreground">
                        {tier.title}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {tier.benefits.map((benefit, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm"
                          >
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
                    <Label
                      htmlFor="custom-amount"
                      className="whitespace-nowrap"
                    >
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
                <Card className="bg-accent/10 border-accent/30">
                  <CardContent className="pt-6">
                    <p className="text-lg font-semibold text-foreground mb-2">
                      Your {formatCurrency(selectedTier || customAmount)}{" "}
                      provides:
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
  );
};

export default HeroSection;
