"use client";

import StickyHeader from "@/components/LandingPage/StickyHeader";
/**
 * @file Path: app/[locale]/donate/page.tsx
 * @description: This file contains the code for the donation page
 */

import { useRouter } from "@/i18n/navigation";
import {
  ONE_TIME_TIERS,
  MONTHLY_TIERS,
  STORAGE_KEYS,
  ROUTES,
} from "@/lib/constants";
import { setStorageItem } from "@/lib/utils";
import { useState } from "react";
import type { DonationType } from "@/lib/types";
import DonationTypeSection from "@/components/DonationPage/DonationTypeSection";
import Microcopy from "@/components/DonationPage/Microcopy";
import TrustIndicators from "@/components/DonationPage/TrustIndicators";
import CompleteDonation from "@/components/DonationPage/CompleteDonation";
import DonationTiers from "@/components/DonationPage/DonationTiers";
import DonationHeader from "@/components/DonationPage/DonationHeader";
import UpsellModal from "@/components/DonationPage/Upsell/UpsellModal";

const DonationPage = () => {
  const [donationType, setDonationType] = useState<DonationType>("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const tiers = donationType === "one-time" ? ONE_TIME_TIERS : MONTHLY_TIERS;

  const handleComplete = () => {
    console.log("handleComplete called", { selectedAmount, showModal });
    if (selectedAmount) {
      // Store donation amount in localStorage for upsell page
      setStorageItem(STORAGE_KEYS.donationAmount, selectedAmount.toString());
      setStorageItem(STORAGE_KEYS.donationType, donationType);
      setShowModal(true);
      console.log("Donation completed:", { donationType, selectedAmount });
      console.log("Modal should now be showing:", true);
    } else {
      console.log("No amount selected, modal will not show");
    }
  };

  return (
    <>
      <main className="min-h-screen py-12 px-4 bg-snow-white">
        <div className="mb-12">
          <StickyHeader showDonation={false} />
        </div>
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Header */}
          <DonationHeader />

          {/* Donation Type Toggle */}
          <DonationTypeSection
            donationType={donationType}
            setDonationType={setDonationType}
            setSelectedAmount={setSelectedAmount}
          />

          {/* Donation Tiers */}
          <DonationTiers
            donationType={donationType}
            tiers={[...tiers]}
            selectedAmount={selectedAmount}
            setSelectedAmount={setSelectedAmount}
          />

          {/* Complete Donation Button */}
          <CompleteDonation
            selectedAmount={selectedAmount}
            handleComplete={handleComplete}
          />

          {/* Trust Indicators */}
          <TrustIndicators />

          {/* Identity-Based Microcopy */}
          <Microcopy />
        </div>
      </main>
      {console.log("Rendering modal:", { showModal })}
      {showModal && <UpsellModal onClick={() => setShowModal(false)} />}
    </>
  );
};

export default DonationPage;
