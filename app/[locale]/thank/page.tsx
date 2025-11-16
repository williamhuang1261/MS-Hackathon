import Certificate from "@/components/Certificate";
"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import StickyHeader from "@/components/LandingPage/StickyHeader";
import ShareSection from "@/components/ThankYouPage/ShareSection";
import ThankYouHeader from "@/components/ThankYouPage/ThankYouHeader";
import Certificate from "@/components/Certificate";
import { CERTIFICATE_TIERS, getCertificateTier } from "@/lib/donation-utils";

type DonationSummary = {
  donorName: string;
  amount: number;
  impact: string;
  timestamp?: number;
};

const FALLBACK_DONATION: DonationSummary = {
  donorName: "Friend of Athena",
  amount: 150,
  impact:
    "emergency shelter nights, trauma-informed counseling, and legal advocacy for survivors.",
};

const ThankYouPage = () => {
  const searchParams = useSearchParams();
  const paramsKey = useMemo(
    () => searchParams?.toString() ?? "",
    [searchParams]
  );

  const donationData = useMemo<DonationSummary | null>(() => {
    if (typeof window !== "undefined") {
      const storedDonation = window.sessionStorage.getItem("latestDonation");
      if (storedDonation) {
        try {
          const parsed = JSON.parse(storedDonation) as DonationSummary;
          if (parsed?.amount && parsed?.impact) {
            return parsed;
          }
        } catch (error) {
          console.error("Failed to parse stored donation", error);
        }
      }
    }

    if (!paramsKey) {
      return null;
    }

    const fallbackParams = new URLSearchParams(paramsKey);
    const amountParam = Number(fallbackParams.get("amount"));
    const impactParam = fallbackParams.get("impact");

    if (!Number.isFinite(amountParam) || !impactParam) {
      return null;
    }

    const donorParam = fallbackParams.get("donor");

    return {
      donorName: donorParam?.trim() ? donorParam.trim() : "Friend of Athena",
      amount: amountParam,
      impact: impactParam,
    };
  }, [paramsKey]);

  const donorName = donationData?.donorName ?? "Friend of Athena";
  const donationImpact = donationData?.impact ?? FALLBACK_DONATION.impact;
  const donationAmount = donationData?.amount ?? FALLBACK_DONATION.amount;
  const certificateTier = getCertificateTier(Math.max(donationAmount, 10));
  const certificateTheme = CERTIFICATE_TIERS[certificateTier];

  return (
    <div className="bg-background min-h-screen">
      <div className="w-full px-4 md:px-12 lg:px-16 pt-8">
    <div className="flex min-h-screen flex-col bg-light-background">
      <div className="fixed left-0 right-0 top-0 z-20 w-full px-6 pt-6 sm:px-16">
        <StickyHeader />
      </div>
      <main className="px-4 md:px-12 lg:px-16 pb-16 space-y-10">
        <div className="grid gap-10 xl:grid-cols-2">
          <GratitudeCard />
          <CertificateSpotlight />
        </div>
        <ShareSection />
      </main>
      <main className="flex w-full flex-1 justify-center px-4 pb-24 pt-40 sm:px-8 lg:px-12 xl:px-16">
        <section className="flex w-full max-w-screen-2xl flex-col gap-12">
          <header className="text-center">
            <h1 className="text-4xl font-semibold text-primary sm:text-5xl">
              Your kindness is contagious
            </h1>
            <p className="mt-4 text-lg text-accent">
              Survivors will feel tonight what you chose to give today. Invite
              your circle to keep the chain of care alive—every shared emoji
              sparks a new act of courage.
            </p>
          </header>

          <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] xl:gap-16 2xl:gap-20">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:pr-12 xl:pr-16">
              <ThankYouHeader
                primaryColor={certificateTheme.color}
                accentColor={certificateTheme.badgeAccent}
                softBackgroundColor={certificateTheme.bgColor}
                gradientBackground={certificateTheme.badgeGradient}
              />
              <p
                className="mt-6 w-full max-w-3xl text-base"
                style={{ color: certificateTheme.color, opacity: 0.8 }}
              >
                {donorName}, your gift is already at work—{donationImpact}
              </p>
            </div>
            <div className="flex w-full items-start justify-center lg:justify-end lg:pl-12 xl:pl-16">
              <Certificate
                inline
                donorName={donorName}
                amount={Math.round(donationAmount)}
                impactDescription={donationImpact}
                tier={certificateTier}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ThankYouPage;
