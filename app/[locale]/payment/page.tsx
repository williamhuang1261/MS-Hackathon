"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import StickyHeader from "@/components/LandingPage/StickyHeader";
import { getStorageItem } from "@/lib/personal_util";
import { STORAGE_KEYS, ROUTES } from "@/lib/constants";

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
  address: string;
  address2: string;
  city: string;
  province: string;
  country: string;
  billingFrequency: "monthly" | "yearly";
  paymentMethod: "card" | "paypal" | "applepay" | "googlepay";
}

const FUNDING_DESTINATIONS = [
  {
    value: "most-needed",
    label: "Where it's needed most",
    helper: "We will direct your gift to the most urgent cases today.",
  },
  {
    value: "meals",
    label: "Meals & nutrition",
    helper: "Provide warm meals, groceries, and kitchen staples.",
  },
  {
    value: "counselling",
    label: "Counselling",
    helper: "Fund trauma-informed therapy and crisis counselling.",
  },
  {
    value: "childcare",
    label: "Childcare",
    helper: "Cover safe childcare while moms attend appointments.",
  },
  {
    value: "housing",
    label: "Safe housing",
    helper: "Support shelter nights, deposits, and secure moves.",
  },
];

const PaymentPage = () => {
  const router = useRouter();
  const [originalAmount, setOriginalAmount] = useState<number>(0);
  const [additionalAmount, setAdditionalAmount] = useState<number>(0);
  const [donationType, setDonationType] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    nameOnCard: "",
    address: "",
    address2: "",
    city: "",
    province: "",
    country: "",
    billingFrequency: "monthly",
    paymentMethod: "card",
  });
  const [fundingDestination, setFundingDestination] = useState<string>(
    FUNDING_DESTINATIONS[0].value
  );

  const mockData = {
    cardNumber: "4532 1234 5678 9012",
    expiryDate: "12/28",
    cvc: "123",
    nameOnCard: "Jimmy Ballone",
    address: "123 Main Street",
    address2: "Apt 4B",
    city: "Montreal",
    province: "QC",
    country: "CA",
  };

  useEffect(() => {
    const original = getStorageItem(STORAGE_KEYS.donationAmount);
    const additional = getStorageItem(STORAGE_KEYS.additionalAmount);
    const total = getStorageItem(STORAGE_KEYS.totalDonationAmount);
    const type = getStorageItem(STORAGE_KEYS.donationType);

    if (original) setOriginalAmount(Number(original));
    if (additional) setAdditionalAmount(Number(additional));
    if (total) setTotalAmount(Number(total));
    if (type) setDonationType(type);

    // Handle Ctrl+P for mock data
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "p") {
        e.preventDefault();
        setFormData((prev) => ({
          ...prev,
          ...mockData,
        }));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("=== PAYMENT SUBMISSION ===");
    console.log("Donation Details:", {
      originalAmount,
      additionalAmount,
      totalAmount,
      donationType,
      fundingDestination,
    });
    console.log("Payment Information:", formData);
    console.log("========================");

    // Navigate to thank you page
    router.replace("/thank");
  };

  const getSavings = () => {
    if (formData.billingFrequency === "yearly") {
      const yearlyAmount = totalAmount * 12;
      const savings = Math.round(yearlyAmount * 0.2);
      return { yearlyAmount: yearlyAmount - savings, savings };
    }
    return null;
  };

  const savings = getSavings();
  const selectedDestination = FUNDING_DESTINATIONS.find(
    (option) => option.value === fundingDestination
  );
  const destinationLabel = selectedDestination?.label || FUNDING_DESTINATIONS[0].label;
  const destinationHelper =
    selectedDestination?.helper ||
    "We will ensure your gift reaches those who need it most.";

  return (
    <main className="min-h-screen bg-linear-to-br from-primary via-accent to-accent/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <StickyHeader showDonation={false} />
        </div>

        <div className="max-w-8xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Donation Summary */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white min-w-96">
            <button
              onClick={() => router.back()}
              className="flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <span className="mr-2">←</span> Change your donation
            </button>

            <div className="text-5xl font-bold mb-2">
              ${totalAmount.toFixed(2)}
            </div>

            <div className="text-white/80 mb-8">
              {donationType === "monthly"
                ? `We will process $${totalAmount.toFixed(
                  2
                )} monthly + processing fees, unless you cancel.`
                : `One-time donation of $${totalAmount.toFixed(2)}`}
            </div>

            {/* Donation Breakdown */}
            <div className="bg-white/20 rounded-xl p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-xl">💜</span>
                </div>
                <div>
                  <div className="font-semibold">Your Support</div>
                  <div className="text-sm text-white/70">
                    Helping survivors find safety and hope
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Original donation:</span>
                  <span>${originalAmount.toFixed(2)}</span>
                </div>
                {additionalAmount > 0 && (
                  <div className="flex justify-between text-purple-200">
                    <span>Additional support:</span>
                    <span>+${additionalAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-white/20 pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white/10 p-4 text-sm">
              <p className="text-white/70">You chose to support:</p>
              <p className="text-lg font-semibold text-white">{destinationLabel}</p>
            </div>

            <button className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white py-3 rounded-lg transition-all">
              Add promo code
            </button>
          </div>

          {/* Right Panel - Payment Form */}
          <div className="bg-white rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Billing Frequency */}
              {donationType === "monthly" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Billing frequency
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleInputChange("billingFrequency", "monthly")
                      }
                      className={`p-3 rounded-lg border-2 text-left transition-all ${formData.billingFrequency === "monthly"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      <div className="font-semibold">Pay monthly</div>
                      <div className="text-sm text-gray-600">
                        ${totalAmount}/month
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleInputChange("billingFrequency", "yearly")
                      }
                      className={`p-3 rounded-lg border-2 text-left transition-all relative ${formData.billingFrequency === "yearly"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      {savings && (
                        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Save 20%
                        </span>
                      )}
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">Pay yearly</span>
                        <span className="text-xs bg-green-100 text-green-700 px-1 rounded">
                          ✓
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {savings &&
                          `$${(savings.yearlyAmount / 12).toFixed(0)}/month`}
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Payment method
                </label>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => handleInputChange("paymentMethod", "card")}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${formData.paymentMethod === "card"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <div className="text-xs font-medium">
                      Credit or Debit card
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange("paymentMethod", "paypal")}
                    className={`p-3 rounded-lg border-2 text-center transition-all flex items-center justify-center ${formData.paymentMethod === "paypal"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <Image
                      src={paypalIcon}
                      alt="PayPal"
                      width={48}
                      height={16}
                      className="object-contain"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange("paymentMethod", "applepay")
                    }
                    className={`p-3 rounded-lg border-2 text-center transition-all flex items-center justify-center ${formData.paymentMethod === "applepay"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <Image
                      src={applePayIcon}
                      alt="Apple Pay"
                      width={48}
                      height={16}
                      className="object-contain"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange("paymentMethod", "googlepay")
                    }
                    className={`p-3 rounded-lg border-2 text-center transition-all flex items-center justify-center ${formData.paymentMethod === "googlepay"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <Image
                      src={googlePayIcon}
                      alt="Google Pay"
                      width={48}
                      height={16}
                      className="object-contain"
                    />
                  </button>
                </div>
              </div>

              {/* Funding Destination */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Direct my gift to
                </label>
                <select
                  value={fundingDestination}
                  onChange={(e) => setFundingDestination(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-3 text-base focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                >
                  {FUNDING_DESTINATIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-sm text-gray-500">{destinationHelper}</p>
              </div>

              {/* Payment Information */}
              {formData.paymentMethod === "card" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Payment information
                  </label>

                  <div className="flex space-x-2 mb-4">
                    <Image
                      src={masterCardLogo}
                      alt="MasterCard"
                      width={32}
                      height={20}
                      className="object-contain rounded-sm"
                    />
                    <Image
                      src={visaLogo}
                      alt="Visa"
                      width={32}
                      height={20}
                      className="object-contain rounded-sm"
                    />
                    <Image
                      src={amexLogo}
                      alt="American Express"
                      width={32}
                      height={20}
                      className="object-contain rounded-sm"
                    />
                    <Image
                      src={discoverLogo}
                      alt="Discover"
                      width={32}
                      height={20}
                      className="object-contain rounded-sm"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="col-span-3">
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        value={formData.cardNumber}
                        onChange={(e) => handleCardNumberChange(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => handleExpiryChange(e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="3-digit code"
                      value={formData.cvc}
                      onChange={(e) =>
                        handleInputChange(
                          "cvc",
                          e.target.value.replace(/\D/g, "").slice(0, 4)
                        )
                      }
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Name on card"
                    value={formData.nameOnCard}
                    onChange={(e) =>
                      handleInputChange("nameOnCard", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 mb-4"
                    required
                  />

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        placeholder="Street address or P.O box"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 mb-2"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Apt., suite, unit, building (Optional)"
                        value={formData.address2}
                        onChange={(e) =>
                          handleInputChange("address2", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          placeholder="City"
                          value={formData.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Province / State
                        </label>
                        <input
                          type="text"
                          placeholder="Province / State"
                          value={formData.province}
                          onChange={(e) =>
                            handleInputChange("province", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Country
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        required
                      >
                        <option value="">Select country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-all text-lg"
              >
                Complete Donation
              </button>
            </form>

            {/* Demo Data Hint */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500/50">
                Press <kbd className="bg-gray-100 px-1 rounded">Ctrl+P</kbd> to
                fill with demo data
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentPage;
