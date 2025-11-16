"use client";

/**
 * @file Path: app/[locale]/donate/page.tsx
 * @description: This file contains the code for the landing page
 */
import LandingBanner from "@/components/LandingPage/LandingBanner";
import StickyHeader from "@/components/LandingPage/StickyHeader";
import ProblemSection from "@/components/LandingPage/ProblemSection";
import StorySection from "@/components/LandingPage/StorySection";
import SolutionSection from "@/components/LandingPage/SolutionSection";
import FooterSection from "@/components/LandingPage/FooterSection";
import DonorWall from "@/components/ThankYouPage/DonorWall";
import LandingProgressBar from "@/components/LandingPage/LandingProgressBar";
import LandingTargetSection from "@/components/LandingPage/LandingTargetSection";

const LandingPage = () => {
  const MONTHLY_GOAL_PROGRESS = 65.172; // Example progress value

  return (
    <div className="flex flex-col gap-10 w-full relative justify-start">
      <div className="w-full absolute p-16 z-50">
        <StickyHeader />
      </div>
      <div className="bg-primary flex flex-col items-center">
        <LandingBanner />
        <DonorWall
          height={150}
          width={600}
          handSize={150}
          progress={MONTHLY_GOAL_PROGRESS}
        />
        <LandingTargetSection progress={MONTHLY_GOAL_PROGRESS} />
      </div>
      <ProblemSection />
      <StorySection />
      <SolutionSection />
      {/* <ProductSection /> */}
      {/* <CTASection /> */}
      <FooterSection />
    </div>
  );
};

export default LandingPage;
