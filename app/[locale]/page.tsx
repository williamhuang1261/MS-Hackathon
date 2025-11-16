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
import FooterSection from "@/components/LandingPage/FooterSection";
import DonorWall from "@/components/ThankYouPage/DonorWall";

const LandingPage = () => {
  return (
    <div className="flex flex-col gap-10 w-full relative justify-start">
      <div className="w-full fixed p-16 z-50">
        <StickyHeader />
      </div>
      <div className="bg-primary flex flex-col items-center">
        <LandingBanner />
        <DonorWall height={150} width={600} handSize={150}/>
        <div className="w-full flex justify-center text-light-background gap-4 pb-16">
          <h2 className="text-light-background text-3xl">MONTHLY GOAL : 15 972$</h2>
          <p className="font-serif text-dark-background text-lg mt-2">{" / 50 000$"}</p>
        </div>
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
