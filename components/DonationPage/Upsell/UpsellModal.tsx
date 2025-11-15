"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Backdrop from "@/components/Modal/Backdrop";
import {
  UPSELL_OPTIONS,
  OPTIONAL_UPSELLS,
  ROUTES,
  STORAGE_KEYS,
} from "@/lib/constants";
import { getStorageItem, setStorageItem } from "@/lib/personal_util";
import type { ImpactStory } from "@/lib/types";

const stories: ImpactStory[] = [
  {
    title: "Sarah Found Safety Tonight",
    content: [
      "Tonight, Sarah made the hardest call of her life.",
      "She dialed our crisis line and whispered that she needed help.",
      "Our advocate stayed on the line until our emergency team arrived.",
      "Sarah is now in a secure shelter, safe and supported.",
      "Your donation helps us answer calls like Sarah's and provide immediate shelter.",
    ],
  },
  {
    title: "Maria's Call for Help",
    content: [
      "When Maria called our hotline, she was scared and didn't know where to turn.",
      "Our advocate helped her create a safety plan without judgment.",
      "Today, Maria and her two children are in a secure location, starting their healing journey.",
      "Your donation ensures our crisis line is always staffed and families can find safety.",
    ],
  },
];

interface Props {
  onClick: () => void;
}

const UpsellModal = ({ onClick }: Props) => {
  const router = useRouter();
  const [originalAmount, setOriginalAmount] = useState<number>(0);
  const [donationType, setDonationType] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  useEffect(() => {
    const amount = getStorageItem(STORAGE_KEYS.donationAmount);
    const type = getStorageItem(STORAGE_KEYS.donationType);
    if (amount) setOriginalAmount(Number(amount));
    if (type) setDonationType(type);
  }, []);

  const [selectedStory] = useState<ImpactStory>(
    () => stories[Math.floor(Math.random() * stories.length)]
  );

  const handleSelectAmount = (amount: number) => {
    setSelectedAmount(amount);
    setShowConfirmation(true);
  };

  const handleConfirmAddition = () => {
    if (selectedAmount) {
      const newTotal = originalAmount + selectedAmount;
      setStorageItem(STORAGE_KEYS.totalDonationAmount, newTotal.toString());
      setStorageItem(STORAGE_KEYS.additionalAmount, selectedAmount.toString());
      router.push("/payment");
    }
  };

  const handleBackToSelection = () => {
    setSelectedAmount(null);
    setShowConfirmation(false);
  };

  const handleContinue = () => {
    setStorageItem(STORAGE_KEYS.totalDonationAmount, originalAmount.toString());
    setStorageItem(STORAGE_KEYS.additionalAmount, "0");
    router.push("/payment");
  };

  return (
    <Backdrop onClick={onClick}>
      <div
        className="rounded-lg shadow-lg max-w-2xl w-full bg-white p-8 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClick}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-purple-100 rounded-full mb-4">
            <span className="text-4xl">💜</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-2">
            Thank You for Your Generosity
          </h2>
          <p className="text-lg text-gray-600">
            Your ${originalAmount} donation is making a real difference
          </p>
        </div>

        {/* Impact Story */}
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-4 text-purple-700 text-center">
            {selectedStory.title}
          </h3>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            {selectedStory.content.map((paragraph, index) => (
              <p
                key={index}
                className={
                  paragraph.startsWith('"') ? "italic font-semibold" : ""
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Optional Additional Support */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-purple-700 mb-2">
            Would you like to provide additional support?
          </h3>
          <p className="text-gray-600 text-sm">
            Any additional contribution helps us reach more women in crisis
          </p>
        </div>

        {/* Primary Options */}
        {!showConfirmation && (
          <div className="space-y-3 mb-4">
            {UPSELL_OPTIONS.map(({ amount, label, description }) => (
              <button
                key={amount}
                onClick={() => handleSelectAmount(amount)}
                className={`w-full border-2 p-4 rounded-lg transition-all ${
                  selectedAmount === amount
                    ? "bg-purple-100 border-purple-400"
                    : "bg-white hover:bg-purple-50 border-purple-200 hover:border-purple-400"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-purple-700">
                    {label}
                  </span>
                  <span className="text-sm text-gray-600">{description}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Optional Additional Options */}
        {!showConfirmation && (
          <div className="border-t-2 border-gray-100 pt-4 space-y-2 mb-6">
            <p className="text-center text-xs text-gray-500 font-medium mb-3">
              Additional ways to help:
            </p>
            {OPTIONAL_UPSELLS.map(({ amount, label, description }) => (
              <button
                key={amount}
                onClick={() => handleSelectAmount(amount)}
                className={`w-full border p-3 rounded-md transition-all ${
                  selectedAmount === amount
                    ? "bg-purple-50 border-purple-300"
                    : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold text-purple-700">
                    {label}
                  </span>
                  <span className="text-xs text-gray-600">{description}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Confirmation Section */}
        {showConfirmation && selectedAmount && (
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-purple-700 mb-4 text-center">
              Confirm Additional Donation
            </h3>
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Original donation:</span>
                <span className="font-semibold">${originalAmount}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Additional support:</span>
                <span className="font-semibold text-purple-700">
                  +${selectedAmount}
                </span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">
                    Total donation:
                  </span>
                  <span className="text-lg font-bold text-purple-700">
                    ${originalAmount + selectedAmount}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleBackToSelection}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-all"
              >
                Back
              </button>
              <button
                onClick={handleConfirmAddition}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all"
              >
                Confirm Addition
              </button>
            </div>
          </div>
        )}

        {/* Continue Option */}
        {!showConfirmation && (
          <div className="text-center">
            <button
              onClick={handleContinue}
              className="text-gray-500 hover:text-purple-700 underline text-base font-medium transition-colors"
            >
              Continue with my original donation
            </button>
          </div>
        )}
      </div>
    </Backdrop>
  );
};

export default UpsellModal;
