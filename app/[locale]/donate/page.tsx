"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import StickyHeader from "@/components/LandingPage/StickyHeader";
import { ONE_TIME_TIERS, MONTHLY_TIERS, STORAGE_KEYS } from "@/lib/constants";
import { setStorageItem } from "@/lib/utils";
import type { DonationType } from "@/lib/types";

import paypalIcon from "@/public/paypal.svg";
import applePayIcon from "@/public/applepay.svg";
import googlePayIcon from "@/public/googlepay.svg";
import masterCardLogo from "@/public/mastercardLogo.png";
import visaLogo from "@/public/visaLogo.png";
import amexLogo from "@/public/amexLogo.svg";
import discoverLogo from "@/public/discoverLogo.svg";

interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  nameOnCard: string;
  email: string;
  paymentMethod: "card" | "paypal" | "applepay" | "googlepay";
}

const SimpleDonationPage = () => {
  const router = useRouter();
  const [donationType, setDonationType] = useState<DonationType>("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    nameOnCard: "",
    email: "",
    paymentMethod: "card",
  });

  const tiers = donationType === "one-time" ? ONE_TIME_TIERS : MONTHLY_TIERS;

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value.replace(/\D/g, "").slice(0, 16));
    handleInputChange("cardNumber", formatted);
  };

  const handleExpiryChange = (value: string) => {
    let formatted = value.replace(/\D/g, "").slice(0, 4);
    if (formatted.length >= 2) {
      formatted = `${formatted.slice(0, 2)}/${formatted.slice(2)}`;
    }
    handleInputChange("expiryDate", formatted);
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setSelectedAmount(numValue);
    } else {
      setSelectedAmount(null);
    }
    setCustomAmount(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAmount) {
      alert("Please select a donation amount");
      return;
    }

    // Store donation info
    setStorageItem(STORAGE_KEYS.donationAmount, selectedAmount.toString());
    setStorageItem(STORAGE_KEYS.donationType, donationType);
    setStorageItem(STORAGE_KEYS.totalDonationAmount, selectedAmount.toString());
    
    console.log("Donation completed:", {
      amount: selectedAmount,
      type: donationType,
      formData,
    });

    // Go directly to thank you page
    router.push("/thank");
  };

  const finalAmount = selectedAmount || 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <StickyHeader showDonation={false} />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8 sm:mb-12 px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 sm:mb-4">
              Make Your Impact Today 🌸
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 px-2">
              Your donation provides safety, support, and hope to survivors
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
              {/* Left Side - Amount Selection */}
              <div className="lg:col-span-2 space-y-4 md:space-y-6">
                {/* Donation Type Toggle */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    1. Choose Frequency
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDonationType("one-time")}
                      className={`p-4 rounded-lg border-2 font-semibold transition-all ${
                        donationType === "one-time"
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      One-Time
                    </button>
                    <button
                      type="button"
                      onClick={() => setDonationType("monthly")}
                      className={`p-4 rounded-lg border-2 font-semibold transition-all ${
                        donationType === "monthly"
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                {/* Amount Selection */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    2. Select Amount
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 sm:gap-3 mb-4">
                    {tiers.map((tier) => (
                      <button
                        key={tier.amount}
                        type="button"
                        onClick={() => handleAmountSelect(tier.amount)}
                        className={`p-3 sm:p-4 rounded-lg border-2 transition-all min-h-[60px] sm:min-h-[80px] ${
                          selectedAmount === tier.amount && !customAmount
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                      >
                        <div className="text-xl sm:text-2xl font-bold text-purple-600">
                          ${tier.amount}
                        </div>
                        <div className="text-[10px] sm:text-xs text-gray-600 mt-1">
                          {tier.label}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {/* Custom Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Or enter custom amount:
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500 text-lg">
                        $
                      </span>
                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        value={customAmount}
                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-3 sm:py-3.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base sm:text-lg min-h-[44px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-purple-800 mb-3">
                    Your Impact
                  </h3>
                  <div className="flex justify-between items-center text-2xl font-bold">
                    <span className="text-gray-700">Total:</span>
                    <span className="text-purple-700">${finalAmount.toFixed(2)}</span>
                  </div>
                  {donationType === "monthly" && (
                    <p className="text-sm text-purple-600 mt-2">
                      Recurring monthly donation
                    </p>
                  )}
                </div>
              </div>

              {/* Right Side - Payment Details */}
              <div className="lg:col-span-3 space-y-4 md:space-y-6">
                {/* Email */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    3. Contact Information
                  </h2>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email (for receipt)
                    </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                        className="w-full p-3 sm:p-3.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[44px] text-base"
                        required
                      />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    4. Payment Method
                  </h2>
                  <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <button
                      type="button"
                      onClick={() => handleInputChange("paymentMethod", "card")}
                      className={`p-2 sm:p-3 rounded-lg border-2 text-center transition-all min-h-[44px] flex items-center justify-center ${
                        formData.paymentMethod === "card"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-[10px] sm:text-xs font-medium">Card</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange("paymentMethod", "paypal")}
                      className={`p-2 sm:p-3 rounded-lg border-2 flex items-center justify-center min-h-[44px] ${
                        formData.paymentMethod === "paypal"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image src={paypalIcon} alt="PayPal" width={40} height={14} className="sm:w-12 sm:h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange("paymentMethod", "applepay")}
                      className={`p-2 sm:p-3 rounded-lg border-2 flex items-center justify-center min-h-[44px] ${
                        formData.paymentMethod === "applepay"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image src={applePayIcon} alt="Apple Pay" width={40} height={14} className="sm:w-12 sm:h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange("paymentMethod", "googlepay")}
                      className={`p-2 sm:p-3 rounded-lg border-2 flex items-center justify-center min-h-[44px] ${
                        formData.paymentMethod === "googlepay"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image src={googlePayIcon} alt="Google Pay" width={40} height={14} className="sm:w-12 sm:h-4" />
                    </button>
                  </div>

                  {/* Card Details */}
                  {formData.paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div className="flex space-x-2 mb-4">
                        <Image src={masterCardLogo} alt="MasterCard" width={32} height={20} />
                        <Image src={visaLogo} alt="Visa" width={32} height={20} />
                        <Image src={amexLogo} alt="Amex" width={32} height={20} />
                        <Image src={discoverLogo} alt="Discover" width={32} height={20} />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          value={formData.cardNumber}
                          onChange={(e) => handleCardNumberChange(e.target.value)}
                          className="w-full p-3 sm:p-3.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 min-h-[44px] text-base"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                        <div className="col-span-2 sm:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={(e) => handleExpiryChange(e.target.value)}
                            className="w-full p-3 sm:p-3.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 min-h-[44px] text-base"
                            required
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            CVC
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            value={formData.cvc}
                            onChange={(e) =>
                              handleInputChange("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))
                            }
                            className="w-full p-3 sm:p-3.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 min-h-[44px] text-base"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={formData.nameOnCard}
                          onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
                          className="w-full p-3 sm:p-3.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 min-h-[44px] text-base"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!selectedAmount}
                  className={`w-full text-white font-bold py-4 sm:py-5 rounded-xl text-base sm:text-lg lg:text-xl transition-all shadow-lg min-h-[48px] sm:min-h-[56px] ${
                    selectedAmount
                      ? "bg-purple-600 hover:bg-purple-700 hover:shadow-xl"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  <span className="hidden sm:inline">Complete Donation & See Your Lotus Bloom 🌸</span>
                  <span className="sm:hidden">Complete Donation 🌸</span>
                </button>

                <p className="text-center text-sm text-gray-500">
                  🔒 Secure payment processing • 100% tax deductible
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SimpleDonationPage;

