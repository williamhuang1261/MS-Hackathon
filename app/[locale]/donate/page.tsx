"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { calculateImpact, getCertificateTier } from "@/lib/donation-utils";
import HeroSection from "@/components/DonationPage/HeroSection";
import LearnMoreSection from "@/components/DonationPage/LearnMoreSection";
import PaymentModal from "@/components/DonationPage/PaymentModal";
import HouseAnimation from "@/components/DonationPage/HouseAnimation";
import UpsellModal from "@/components/DonationPage/UpsellModal";

// Mock data

export default function Donate() {
  const router = useRouter();
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<number>(75);
  const [sliderAmount, setSliderAmount] = useState<number>(75);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showHouseAnimation, setShowHouseAnimation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "googlepay" | "applepay" | "paypal"
  >("card");
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [pendingUpsellAmount, setPendingUpsellAmount] = useState<number | null>(
    null
  );
  const [fundingDestination, setFundingDestination] = useState("most-needed");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    isReturning: false,
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    province: "",
    country: "",
    billingFrequency: "monthly" as "monthly" | "yearly",
  });
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>(
    {}
  );

  const learnMoreRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const impact = calculateImpact(selectedTier || customAmount);

  const scrollToLearnMore = () => {
    learnMoreRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDonateClick = () => {
    setShowHouseAnimation(false);
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    const finalAmount = selectedTier || customAmount;
    if (finalAmount < 75) {
      setPendingUpsellAmount(finalAmount);
      setShowUpsellModal(true);
      return;
    }
    setShowPaymentModal(true);
  };

  const handleUpsellAccept = () => {
    if (pendingUpsellAmount === null) return;
    const increase = 75;
    const updatedAmount = pendingUpsellAmount + increase;
    setCustomAmount(updatedAmount);
    setSliderAmount(updatedAmount);
    setSelectedTier(null);
    setShowUpsellModal(false);
    setPendingUpsellAmount(null);
    setShowPaymentModal(true);
  };

  const handleUpsellDecline = () => {
    if (pendingUpsellAmount === null) return;
    setCustomAmount(pendingUpsellAmount);
    setSliderAmount(pendingUpsellAmount);
    setSelectedTier(null);
    setShowUpsellModal(false);
    setPendingUpsellAmount(null);
    setShowPaymentModal(true);
  };

  const handlePaymentInputChange = (field: string, value: string) => {
    let formattedValue = value;

    // Format specific fields
    if (field === "cardNumber") {
      // Format card number with spaces
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
    } else if (field === "expiryDate") {
      // Format expiry date as MM/YY
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length >= 2) {
        formattedValue =
          cleaned.substring(0, 2) +
          (cleaned.length > 2 ? "/" + cleaned.substring(2, 4) : "");
      } else {
        formattedValue = cleaned;
      }
    } else if (field === "cvv") {
      // Limit CVV to 4 digits
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    // Handle donor info fields
    if (field === "name" || field === "email" || field === "isReturning") {
      if (field === "isReturning") {
        setDonorInfo((prev) => ({ ...prev, [field]: value === "true" }));
      } else {
        setDonorInfo((prev) => ({ ...prev, [field]: formattedValue }));
      }
    } else {
      // Handle payment info fields
      setPaymentInfo((prev) => ({ ...prev, [field]: formattedValue }));
    }

    // Clear errors for the field
    setPaymentErrors((prev) => {
      if (prev[field]) {
        const rest = { ...prev };
        delete rest[field];
        return rest;
      }
      return prev;
    });
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const finalAmount = selectedTier || customAmount;
    const tier = getCertificateTier(finalAmount);
    const impactCalc = calculateImpact(finalAmount);
    const donationDetails = {
      donorName: donorInfo.name?.trim() ? donorInfo.name.trim() : "Friend",
      amount: finalAmount,
      impact: impactCalc.description,
      tier,
      fundingDestination,
    };

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(
        "latestDonation",
        JSON.stringify({ ...donationDetails, timestamp: Date.now() })
      );
    }

    setIsProcessing(false);
    setShowPaymentModal(false);
    setShowHouseAnimation(true);

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = setTimeout(() => {
      setShowHouseAnimation(false);
      router.push("/thank");
    }, 4000);
  };

  const handleSliderChange = (value: number[]) => {
    const newValue = value[0];
    setSliderAmount(newValue);
    setCustomAmount(newValue);
    setSelectedTier(null);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 75;
    setCustomAmount(value);
    setSliderAmount(value);
    setSelectedTier(null);
  };

  return (
    <div className="relative min-h-screen bg-background">
      <HeroSection
        selectedTier={selectedTier}
        setSelectedTier={setSelectedTier}
        setSliderAmount={setSliderAmount}
        setCustomAmount={setCustomAmount}
        customAmount={customAmount}
        sliderAmount={sliderAmount}
        impact={impact}
        handleCustomAmountChange={handleCustomAmountChange}
        handleSliderChange={handleSliderChange}
        handleDonateClick={handleDonateClick}
        scrollToLearnMore={scrollToLearnMore}
      />
      <LearnMoreSection learnMoreRef={learnMoreRef} />

      <PaymentModal
        showPaymentModal={showPaymentModal}
        selectedTier={selectedTier}
        customAmount={customAmount}
        setPaymentErrors={setPaymentErrors}
        setShowPaymentModal={setShowPaymentModal}
        impact={impact}
        donorInfo={donorInfo}
        paymentInfo={paymentInfo}
  fundingDestination={fundingDestination}
  setFundingDestination={setFundingDestination}
        handlePaymentInputChange={handlePaymentInputChange}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        paymentErrors={paymentErrors}
        isProcessing={isProcessing}
        handlePaymentSubmit={handlePaymentSubmit}
      />

      <UpsellModal
        show={showUpsellModal}
        currentAmount={pendingUpsellAmount ?? customAmount}
        onAccept={handleUpsellAccept}
        onDecline={handleUpsellDecline}
      />

      <div
        className={`fixed inset-0 z-40 transition-opacity duration-500 ${showHouseAnimation
            ? "opacity-100 visible"
            : "pointer-events-none opacity-0"
          }`}
        aria-hidden={!showHouseAnimation}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-background to-background" />
        <div className="relative z-10 flex min-h-screen items-center justify-center">
          <HouseAnimation showHouseAnimation={showHouseAnimation} />
        </div>
      </div>
    </div>
  );
}
