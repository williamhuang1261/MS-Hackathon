"use client";

import { formatCurrency } from "@/lib/donation-utils";
import { useTranslations } from "next-intl";
import { Progress } from "../ui/progress";
import { Slider } from "../ui/slider";
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

const FEATURED_TIER_AMOUNT = 100;

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
  const t = useTranslations("donation.hero");

  const IMPACT_TIERS = [
    {
      amount: 75,
      title: t("oneNightSafety"),
      benefits: t.raw("oneNightBenefits") as string[],
    },
    {
      amount: 100,
      title: t("weekTransformation"),
      benefits: t.raw("weekBenefits") as string[],
    },
    {
      amount: 500,
      title: t("monthStability"),
      benefits: t.raw("monthBenefits") as string[],
    },
  ];
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
                  {t("monthlyGoal")}
                </p>
                <p className="text-muted-foreground">
                  {t("goalDescription", {
                    percentage: MONTHLY_GOAL.current,
                    target: MONTHLY_GOAL.target,
                  })}
                </p>
              </div>
              <Badge variant="default" className="text-lg px-4 py-2">
                {t("donationsThisWeek", { count: WEEKLY_DONATIONS })}
              </Badge>
            </div>
            <Progress value={MONTHLY_GOAL.current} className="h-3" />
            <p className="text-sm text-muted-foreground text-right">
              {t("familiesHelped", {
                current: MONTHLY_GOAL.families,
                target: MONTHLY_GOAL.target,
              })}
            </p>
          </CardContent>
        </Card>

        {/* Main Donation Form */}
        <Card className="bg-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-3xl font-serif text-center">
              {t("chooseImpact")}
            </CardTitle>
            <CardDescription className="text-center text-lg">
              {t("impactDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Impact Tier Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {IMPACT_TIERS.map((tier) => {
                const isFeatured = tier.amount === FEATURED_TIER_AMOUNT;
                return (
                  <motion.div
                    key={tier.amount}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative"
                  >
                    <Card
                      className={`relative overflow-visible cursor-pointer transition-all ${
                        isFeatured ? "border-accent/60" : ""
                      } ${
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
                      {isFeatured && (
                        <span className="pointer-events-none absolute -top-4 left-6 z-20 inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-lg">
                          {t("mostPopular")}
                        </span>
                      )}
                      <CardHeader className="relative z-10">
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
                      <CardContent className="relative z-10">
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
                );
              })}
            </div>

            {/* Custom Amount Card */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>{t("customAmount")}</CardTitle>
                <CardDescription>{t("customDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Label
                      htmlFor="custom-amount"
                      className="whitespace-nowrap"
                    >
                      {t("amountLabel")}
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
                    <Label>{t("sliderLabel")}</Label>
                    <Slider
                      value={[sliderAmount]}
                      onValueChange={handleSliderChange}
                      min={75}
                      max={5000}
                      step={25}
                      className="w-full mt-2"
                    />
                    <div className="text-sm font-semibold text-foreground text-center">
                      {formatCurrency(sliderAmount)}
                    </div>
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
                      {t("yourImpactProvides", {
                        amount: formatCurrency(sliderAmount),
                      })}
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
                {t("donateNow")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
                onClick={scrollToLearnMore}
              >
                {t("learnMore")}
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
