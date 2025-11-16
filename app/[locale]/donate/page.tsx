"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import {
  calculateImpact,
  getCertificateTier,
  type CertificateTier,
} from "@/lib/donation-utils";
import HeroSection from "@/components/DonationPage/HeroSection";
import LearnMoreSection from "@/components/DonationPage/LearnMoreSection";
import PaymentModal from "@/components/DonationPage/PaymentModal";
import HouseAnimation from "@/components/DonationPage/HouseAnimation";
import CertificateReveal from "@/components/DonationPage/CertificateReveal";
import StickyHeader from "@/components/LandingPage/StickyHeader";
import ThankYouHeader from "@/components/ThankYouPage/ThankYouHeader";
import YourImpactSection from "@/components/ThankYouPage/YourImpactSection";
import DonorWall from "@/components/ThankYouPage/DonorWall";

// Mock data

export default function Donate() {
  const router = useRouter();
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<number>(75);
  const [sliderAmount, setSliderAmount] = useState<number>(75);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showHouseAnimation, setShowHouseAnimation] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
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
  const [certificateCTA, setCertificateCTA] = useState<"donate" | "thank">(
    "donate"
  );
  const [completedDonation, setCompletedDonation] = useState<{
    amount: number;
    impact: string;
    tier: CertificateTier;
  } | null>(null);

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
    setShowCertificate(false);
    setCompletedDonation(null);
    setShowHouseAnimation(false);
    setCertificateCTA("donate");
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
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
      amount: finalAmount,
      impact: impactCalc.description,
      tier,
    };

    setCompletedDonation(donationDetails);

    setShowCertificate(false);
    setIsProcessing(false);
    setShowPaymentModal(false);
    setShowHouseAnimation(true);
    setCertificateCTA("donate");

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = setTimeout(() => {
      setShowHouseAnimation(false);
      setShowCertificate(true);
      setCertificateCTA("thank");
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

  const showThankBackdrop = certificateCTA === "thank";

  return (
    <div className="min-h-screen">
      {showThankBackdrop ? (
        <ThankYouBackdrop />
      ) : (
        <>
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
        </>
      )}

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
        onClose={() => {
          setCertificateCTA("donate");
          router.push("/thank");
        }}
      />
    </div>
  );
}

const ThankYouBackdrop = () => (
  <div className="bg-background min-h-screen">
    <div className="w-full px-8 pt-8">
      <StickyHeader showDonation={false} />
    </div>
    <ThankYouHeader />
    <div className="flex flex-col gap-8 px-8 pb-16 lg:flex-row">
      <YourImpactSection />
      <div className="flex-1 rounded-3xl bg-primary p-8 text-primary-foreground shadow-2xl">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-4xl font-serif">Goal : 14 762 $</h2>
          <p className="text-xl font-semibold text-yellow-200">+ 100$</p>
          <span className="text-lg text-white/80">/ 50 000 $</span>
          <p className="mt-2 text-white/90">
            We&apos;ve added you to our donors wall!
          </p>
        </div>
        <div className="mt-8 rounded-2xl bg-white/10 p-4">
          <DonorWall width={360} height={220} handSize={200} />
        </div>
      </div>
    </div>
  </div>
);
