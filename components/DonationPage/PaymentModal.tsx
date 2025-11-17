"use client";

import { formatCurrency } from "@/lib/donation-utils";
import { Checkbox } from "@radix-ui/react-checkbox";
import { AnimatePresence, motion } from "framer-motion";
import { Lock } from "lucide-react";
import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import paypalIcon from "@/public/paypal.svg";
import applePayIcon from "@/public/applepay.svg";
import googlePayIcon from "@/public/googlepay.svg";

import masterCardLogo from "@/public/mastercardLogo.png";
import visaLogo from "@/public/visaLogo.png";
import amexLogo from "@/public/amexLogo.svg";
import discoverLogo from "@/public/discoverLogo.svg";

interface Props {
  showPaymentModal: boolean;
  setShowPaymentModal: (show: boolean) => void;
  selectedTier: number | null;
  customAmount: number;
  impact: {
    description: string;
  };
  handlePaymentSubmit: (e: React.FormEvent) => void;
  isProcessing: boolean;
  paymentMethod: string;
  setPaymentMethod: (
    method: "card" | "googlepay" | "applepay" | "paypal"
  ) => void;
  fundingDestination: string;
  setFundingDestination: (value: string) => void;
  donorInfo: {
    name: string;
    email: string;
    isReturning: boolean;
  };
  paymentInfo: {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    billingFrequency?: "monthly" | "yearly";
    address2?: string;
    province?: string;
    country?: string;
  };
  handlePaymentInputChange: (field: string, value: string) => void;
  paymentErrors: {
    [key: string]: string;
  };
}

const FUNDING_DESTINATIONS = [
  {
    value: "most-needed",
    label: "Where it’s needed most",
    helper: "We’ll direct your gift to the most urgent cases today.",
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

const MOCK_PAYMENT_DATA = {
  cardNumber: "4532 1234 5678 9012",
  expiryDate: "12/28",
  cvv: "123",
  cardName: "Jimmy Ballone",
  address: "123 Main Street",
  address2: "Apt 4B",
  city: "Montreal",
  state: "QC",
  zipCode: "H3A1A1",
  country: "CA",
  province: "QC",
};

const PaymentModal = ({
  showPaymentModal,
  setShowPaymentModal,
  selectedTier,
  customAmount,
  impact,
  handlePaymentSubmit,
  isProcessing,
  paymentMethod,
  setPaymentMethod,
  fundingDestination,
  setFundingDestination,
  donorInfo,
  paymentInfo,
  handlePaymentInputChange,
  paymentErrors,
}: Props) => {
  const totalAmount = selectedTier || customAmount;
  const selectedDestination =
    FUNDING_DESTINATIONS.find((option) => option.value === fundingDestination) ||
    FUNDING_DESTINATIONS[0];

  useEffect(() => {
    // Handle Ctrl+P for mock data
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "p") {
        e.preventDefault();

        // Apply donor info directly
        handlePaymentInputChange("name", MOCK_PAYMENT_DATA.cardName);
        handlePaymentInputChange("email", "jimmy.ballone@example.com");
        handlePaymentInputChange("isReturning", "false");

        // Apply payment info with a small delay
        setTimeout(() => {
          handlePaymentInputChange("cardNumber", MOCK_PAYMENT_DATA.cardNumber);
          handlePaymentInputChange("cardName", MOCK_PAYMENT_DATA.cardName);
          handlePaymentInputChange("expiryDate", MOCK_PAYMENT_DATA.expiryDate);
          handlePaymentInputChange("cvv", MOCK_PAYMENT_DATA.cvv);
          handlePaymentInputChange("address", MOCK_PAYMENT_DATA.address);
          handlePaymentInputChange("address2", MOCK_PAYMENT_DATA.address2);
          handlePaymentInputChange("city", MOCK_PAYMENT_DATA.city);
          handlePaymentInputChange("state", MOCK_PAYMENT_DATA.state);
          handlePaymentInputChange("zipCode", MOCK_PAYMENT_DATA.zipCode);
          handlePaymentInputChange("country", MOCK_PAYMENT_DATA.country);
          handlePaymentInputChange("billingFrequency", "monthly");
        }, 50);
      }
    };

    if (showPaymentModal) {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [showPaymentModal, handlePaymentInputChange]);

  const getSavings = () => {
    if (paymentInfo.billingFrequency === "yearly") {
      const yearlyAmount = totalAmount * 12;
      const savings = Math.round(yearlyAmount * 0.2);
      return { yearlyAmount: yearlyAmount - savings, savings };
    }
    return null;
  };

  const savings = getSavings();

  return (
    <AnimatePresence>
      {showPaymentModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 overflow-hidden no-doc-scroll"
          onClick={() => setShowPaymentModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid lg:grid-cols-2 gap-8 p-8">
              {/* Left Panel - Donation Summary */}
              <div className="bg-accent rounded-2xl p-8 text-white">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex items-center text-white/80 hover:text-white mb-6 transition-colors"
                >
                  <span className="mr-2">←</span> Change your donation
                </button>

                <div className="text-5xl font-bold mb-2">
                  ${totalAmount.toFixed(2)}
                </div>

                <div className="text-white/80 mb-8">
                  {donorInfo.isReturning
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
                      <span>Your donation:</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-white/20 pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>${totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Impact Summary */}
                <div className="bg-white/20 rounded-xl p-4">
                  <p className="text-sm font-semibold text-white mb-2">
                    Your Impact:
                  </p>
                  <p className="text-sm text-white/80">{impact.description}</p>
                </div>

                <div className="mt-6 rounded-xl bg-white/10 p-4 text-sm">
                  <p className="text-white/70">You chose to support:</p>
                  <p className="text-lg font-semibold text-white">
                    {selectedDestination.label}
                  </p>
                </div>
              </div>

              {/* Right Panel - Payment Form */}
              <div className="space-y-6">
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  {/* Header */}
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
                      <Lock className="h-6 w-6" />
                      Complete Your Donation
                    </h2>
                  </div>

                  {/* Billing Frequency */}
                  {donorInfo.isReturning && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Billing frequency
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            handlePaymentInputChange(
                              "billingFrequency",
                              "monthly"
                            )
                          }
                          className={`p-3 rounded-lg border-2 text-left transition-all ${paymentInfo.billingFrequency === "monthly"
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
                            handlePaymentInputChange(
                              "billingFrequency",
                              "yearly"
                            )
                          }
                          className={`p-3 rounded-lg border-2 text-left transition-all relative ${paymentInfo.billingFrequency === "yearly"
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
                            <span className="font-semibold mr-2">
                              Pay yearly
                            </span>
                            <span className="text-xs bg-green-100 text-green-700 px-1 rounded">
                              ✓
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {savings &&
                              `$${(savings.yearlyAmount / 12).toFixed(
                                0
                              )}/month`}
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
                        onClick={() => setPaymentMethod("card")}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${paymentMethod === "card"
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
                        onClick={() => setPaymentMethod("paypal")}
                        className={`p-3 rounded-lg border-2 text-center transition-all flex items-center justify-center ${paymentMethod === "paypal"
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
                        onClick={() => setPaymentMethod("applepay")}
                        className={`p-3 rounded-lg border-2 text-center transition-all flex items-center justify-center ${paymentMethod === "applepay"
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
                        onClick={() => setPaymentMethod("googlepay")}
                        className={`p-3 rounded-lg border-2 text-center transition-all flex items-center justify-center ${paymentMethod === "googlepay"
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
                    <Select
                      value={fundingDestination}
                      onValueChange={(value) => setFundingDestination(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an impact area" />
                      </SelectTrigger>
                      <SelectContent>
                        {FUNDING_DESTINATIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="mt-2 text-sm text-gray-500">
                      {selectedDestination.helper}
                    </p>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Contact Information
                    </label>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          required
                          value={donorInfo.name}
                          onChange={(e) => {
                            handlePaymentInputChange("name", e.target.value);
                          }}
                          placeholder="John Doe"
                          className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${paymentErrors.name ? "border-red-500" : ""
                            }`}
                        />
                        {paymentErrors.name && (
                          <p className="text-sm text-red-500">
                            {paymentErrors.name}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={donorInfo.email}
                          onChange={(e) => {
                            handlePaymentInputChange("email", e.target.value);
                          }}
                          placeholder="john@example.com"
                          className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${paymentErrors.email ? "border-red-500" : ""
                            }`}
                        />
                        {paymentErrors.email && (
                          <p className="text-sm text-red-500">
                            {paymentErrors.email}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          Receipt will be sent to this email
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="returning"
                          checked={donorInfo.isReturning}
                          onCheckedChange={(checked: boolean) =>
                            handlePaymentInputChange(
                              "isReturning",
                              checked.toString()
                            )
                          }
                        />
                        <Label
                          htmlFor="returning"
                          className="cursor-pointer text-sm"
                        >
                          I’m a returning donor
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  {paymentMethod === "card" && (
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

                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          value={paymentInfo.cardNumber}
                          onChange={(e) =>
                            handlePaymentInputChange(
                              "cardNumber",
                              e.target.value
                            )
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          required
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={paymentInfo.expiryDate}
                            onChange={(e) =>
                              handlePaymentInputChange(
                                "expiryDate",
                                e.target.value
                              )
                            }
                            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            required
                          />
                          <input
                            type="text"
                            placeholder="3-digit code"
                            value={paymentInfo.cvv}
                            onChange={(e) =>
                              handlePaymentInputChange(
                                "cvv",
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
                          value={paymentInfo.cardName}
                          onChange={(e) =>
                            handlePaymentInputChange("cardName", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                              value={paymentInfo.address}
                              onChange={(e) =>
                                handlePaymentInputChange(
                                  "address",
                                  e.target.value
                                )
                              }
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 mb-2"
                              required
                            />
                            <input
                              type="text"
                              placeholder="Apt., suite, unit, building (Optional)"
                              value={paymentInfo.address2 || ""}
                              onChange={(e) =>
                                handlePaymentInputChange(
                                  "address2",
                                  e.target.value
                                )
                              }
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                City
                              </label>
                              <input
                                type="text"
                                placeholder="City"
                                value={paymentInfo.city}
                                onChange={(e) =>
                                  handlePaymentInputChange(
                                    "city",
                                    e.target.value
                                  )
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
                                value={paymentInfo.state}
                                onChange={(e) =>
                                  handlePaymentInputChange(
                                    "state",
                                    e.target.value
                                  )
                                }
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Postal Code
                              </label>
                              <input
                                type="text"
                                placeholder="Postal Code"
                                value={paymentInfo.zipCode}
                                onChange={(e) =>
                                  handlePaymentInputChange(
                                    "zipCode",
                                    e.target.value
                                  )
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
                              value={paymentInfo.country || ""}
                              onChange={(e) =>
                                handlePaymentInputChange(
                                  "country",
                                  e.target.value
                                )
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
                    </div>
                  )}

                  {/* Alternative Payment Method Messages */}
                  {paymentMethod === "googlepay" && (
                    <div className="text-center py-8 space-y-4">
                      <Image
                        src={googlePayIcon}
                        alt="Google Pay"
                        width={48}
                        height={16}
                        className="mx-auto"
                      />
                      <div>
                        <p className="text-lg font-semibold mb-2">
                          Complete with Google Pay
                        </p>
                        <p className="text-sm text-gray-600">
                          You’ll be redirected to complete your donation
                          securely with Google Pay.
                        </p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "applepay" && (
                    <div className="text-center py-8 space-y-4">
                      <Image
                        src={applePayIcon}
                        alt="Apple Pay"
                        width={48}
                        height={16}
                        className="mx-auto"
                      />
                      <div>
                        <p className="text-lg font-semibold mb-2">
                          Complete with Apple Pay
                        </p>
                        <p className="text-sm text-gray-600">
                          You’ll be redirected to complete your donation
                          securely with Apple Pay.
                        </p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="text-center py-8 space-y-4">
                      <Image
                        src={paypalIcon}
                        alt="PayPal"
                        width={48}
                        height={16}
                        className="mx-auto"
                      />
                      <div>
                        <p className="text-lg font-semibold mb-2">
                          Complete with PayPal
                        </p>
                        <p className="text-sm text-gray-600">
                          You’ll be redirected to complete your donation
                          securely with PayPal.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-0 h-16"
                      onClick={() => setShowPaymentModal(false)}
                      disabled={isProcessing}
                    >
                      Cancel
                    </Button>
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all text-lg flex items-center justify-center gap-2"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4" />
                          {paymentMethod === "card"
                            ? `Donate ${formatCurrency(totalAmount)}`
                            : `Continue to ${paymentMethod === "googlepay"
                              ? "Google Pay"
                              : paymentMethod === "applepay"
                                ? "Apple Pay"
                                : "PayPal"
                            }`}
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Demo Data Hint */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500/50">
                    Press <kbd className="bg-gray-100 px-1 rounded">Ctrl+P</kbd>{" "}
                    to fill with demo data
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
