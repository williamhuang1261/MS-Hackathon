"use client"


import {
  Award,
  Building2,
  Calendar,
  Heart,
  Newspaper,
  TrendingUp,
  Users,
} from "lucide-react";
import React from "react";
import BudgetBreakdownChart from "../BudgetBreakdownChart";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

const THIS_MONTH_IMPACT = [
  { label: "Meals Served", value: "847", icon: Heart },
  { label: "Families Housed", value: "23", icon: Users },
  { label: "Counseling Sessions", value: "156", icon: TrendingUp },
];

const CREDIBILITY_ITEMS = [
  { type: "award", text: "2023 Community Impact Award Winner", icon: Award },
  {
    type: "media",
    text: "As seen in CBC, CTV, Montreal Gazette",
    icon: Newspaper,
  },
  { type: "years", text: "34 years of trusted service", icon: Building2 },
  {
    type: "stat",
    text: "1 in 3 women experience domestic violence (Stats Canada, 2022)",
    icon: Calendar,
  },
];

interface Props {
  learnMoreRef: React.RefObject<HTMLElement | null>;
}

const LearnMoreSection = ({ learnMoreRef }: Props) => {
  return (
    <section ref={learnMoreRef} className="py-16 bg-muted/30">
      <div className="container max-w-6xl mx-auto px-4 space-y-12">
        {/* Budget Breakdown */}
        <BudgetBreakdownChart />

        {/* This Month's Impact */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-serif">
              This Month's Impact
            </CardTitle>
            <CardDescription>
              Real-time results from your community's generosity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {THIS_MONTH_IMPACT.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="text-center space-y-2">
                    <Icon className="h-8 w-8 text-primary mx-auto" />
                    <p className="text-4xl font-bold text-primary">
                      {item.value}
                    </p>
                    <p className="text-muted-foreground">{item.label}</p>
                  </div>
                );
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
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-lg bg-muted/50"
                  >
                    <Icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-foreground">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Back to Top Donate Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="text-lg px-8 py-6"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Heart className="mr-2 h-5 w-5" />
            Donate Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LearnMoreSection;
