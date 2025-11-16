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
    city: "",
    state: "",
    zipCode: "",
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
    router.push("/payment");
  };

  // Payment form helpers
  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    const groups = numbers.match(/.{1,4}/g);
    return groups ? groups.join(" ") : numbers;
  };

  const formatExpiryDate = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length >= 2) {
      return numbers.slice(0, 2) + "/" + numbers.slice(2, 4);
    }
    return numbers;
  };

  const handlePaymentInputChange = (field: string, value: string) => {
    let formattedValue = value;

    if (field === "cardNumber") {
      formattedValue = formatCardNumber(value);
      if (formattedValue.replace(/\s/g, "").length > 16) return;
    } else if (field === "expiryDate") {
      formattedValue = formatExpiryDate(value);
      if (formattedValue.length > 5) return;
    } else if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length > 3) return;
    } else if (field === "zipCode") {
      formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length > 5) return;
    }

    setPaymentInfo({ ...paymentInfo, [field]: formattedValue });
    if (paymentErrors[field]) {
      setPaymentErrors({ ...paymentErrors, [field]: "" });
    }
  };

  const validatePaymentForm = () => {
    const newErrors: Record<string, string> = {};

    if (!donorInfo.name || donorInfo.name.length < 3) {
      newErrors.name = "Please enter your full name";
    }

    if (
      !donorInfo.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorInfo.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    // Only validate card details if paying by card
    if (paymentMethod === "card") {
      if (
        !paymentInfo.cardNumber ||
        paymentInfo.cardNumber.replace(/\s/g, "").length !== 16
      ) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number";
      }

      if (!paymentInfo.cardName || paymentInfo.cardName.length < 3) {
        newErrors.cardName = "Please enter the cardholder name";
      }

      if (!paymentInfo.expiryDate || paymentInfo.expiryDate.length !== 5) {
        newErrors.expiryDate = "Please enter a valid expiry date (MM/YY)";
      } else {
        const [month, year] = paymentInfo.expiryDate.split("/").map(Number);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        if (month < 1 || month > 12) {
          newErrors.expiryDate = "Invalid month";
        } else if (
          year < currentYear ||
          (year === currentYear && month < currentMonth)
        ) {
          newErrors.expiryDate = "Card has expired";
        }
      }

      if (!paymentInfo.cvv || paymentInfo.cvv.length !== 3) {
        newErrors.cvv = "Please enter a valid 3-digit CVV";
      }

      if (!paymentInfo.address || paymentInfo.address.length < 5) {
        newErrors.address = "Please enter your billing address";
      }

      if (!paymentInfo.city || paymentInfo.city.length < 2) {
        newErrors.city = "Please enter your city";
      }

      if (!paymentInfo.state || paymentInfo.state.length < 2) {
        newErrors.state = "Please enter your state";
      }

      if (!paymentInfo.zipCode || paymentInfo.zipCode.length !== 5) {
        newErrors.zipCode = "Please enter a valid 5-digit ZIP code";
      }
    }

    setPaymentErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePaymentForm()) {
      return;
    }

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
      setShowHouseAnimation(false);
      setShowCertificate(true);
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
        setDonorInfo={setDonorInfo}
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
