"use client";

import { useState, useRef } from "react";
import {
  calculateImpact,
  getCertificateTier,
  type CertificateTier,
} from "@/lib/donation-utils";
import { useRouter } from "@/i18n/navigation";
import HeroSection from "@/components/DonationPage/HeroSection";
import LearnMoreSection from "@/components/DonationPage/LearnMoreSection";
import PaymentModal from "@/components/DonationPage/PaymentModal";
import HouseAnimation from "@/components/DonationPage/HouseAnimation";
import CertificateReveal from "@/components/DonationPage/CertificateReveal";

// Mock data

export default function Donate() {
  const router = useRouter();
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<number>(75);
  const [sliderAmount, setSliderAmount] = useState<number>(75);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showHouseAnimation, setShowHouseAnimation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "googlepay" | "applepay" | "paypal"
  >("card");
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
  const [completedDonation, setCompletedDonation] = useState<{
    amount: number;
    impact: string;
    tier: CertificateTier;
  } | null>(null);

  const learnMoreRef = useRef<HTMLDivElement>(null);

  const impact = calculateImpact(selectedTier || customAmount);

  const scrollToLearnMore = () => {
    learnMoreRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDonateClick = () => {
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
        const { [field]: removed, ...rest } = prev;
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
    const impactCalc = calculateImpact(finalAmount);
    const tier = getCertificateTier(finalAmount);

    setCompletedDonation({
      amount: finalAmount,
      impact: impactCalc.description,
      tier,
    });

    setIsProcessing(false);
    setShowPaymentModal(false);
    setShowHouseAnimation(true);

    // Show certificate after house animation
    setTimeout(() => {
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
    <div className="min-h-screen">
      {/* Hero Section with Progress */}
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
      {/* Learn More Section */}
      <LearnMoreSection learnMoreRef={learnMoreRef} />

      {/* Payment Modal */}
      <PaymentModal
        showPaymentModal={showPaymentModal}
        selectedTier={selectedTier}
        customAmount={customAmount}
        setPaymentErrors={setPaymentErrors}
        setShowPaymentModal={setShowPaymentModal}
        impact={impact}
        donorInfo={donorInfo}
        paymentInfo={paymentInfo}
        handlePaymentInputChange={handlePaymentInputChange}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        paymentErrors={paymentErrors}
        isProcessing={isProcessing}
        handlePaymentSubmit={handlePaymentSubmit}
      />

      {/* House Animation */}
      <HouseAnimation showHouseAnimation={showHouseAnimation} />

      {/* Certificate Reveal */}
      <CertificateReveal
        showCertificate={showCertificate}
        setShowCertificate={setShowCertificate}
        donorInfo={donorInfo}
        completedDonation={completedDonation}
      />
    </div>
  );
}
