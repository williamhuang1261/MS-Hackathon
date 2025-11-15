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
import ProductSection from "@/components/LandingPage/ProductSection";
import CollectiveLotusSection from "@/components/CollectiveLotus/CollectiveLotusSection";
import CTASection from "@/components/LandingPage/CTASection";

const LandingPage = () => {
  return (
    <div className="flex flex-col gap-6 md:gap-10 w-full relative justify-start">
      <div className="w-full fixed top-0 left-0 p-4 md:p-8 lg:p-16 z-[100]">
        <StickyHeader />
      </div>
      <LandingBanner />
      <ProblemSection />
      <StorySection />
      <SolutionSection />
      <ProductSection />
      <CollectiveLotusSection />
      <CTASection />
    </div>
  );
};

export default LandingPage;
