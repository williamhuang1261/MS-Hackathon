"use client";

import type { DonationType } from "@/lib/types";

interface Props {
  donationType: DonationType;
  setDonationType: (type: DonationType) => void;
  setSelectedAmount: (amount: number | null) => void;
}

const DonationTypeSection = ({
  donationType,
  setDonationType,
  setSelectedAmount,
}: Props) => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-primary text-center">
        Donation Type
      </h2>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => {
            setDonationType("one-time");
            setSelectedAmount(null);
          }}
          className={`px-8 py-4 rounded-lg font-bold text-lg transition-all cursor-pointer ${
            donationType === "one-time"
              ? "bg-accent text-white shadow-lg scale-105"
              : "bg-primary/20 text-primary border-2 border-primary/30 hover:border-primary"
          }`}
        >
          One-Time
        </button>
        <button
          onClick={() => {
            setDonationType("monthly");
            setSelectedAmount(null);
          }}
          className={`px-8 py-4 rounded-lg font-bold text-lg transition-all cursor-pointer ${
            donationType === "monthly"
              ? "bg-accent text-white shadow-lg scale-105"
              : "bg-primary/20 text-primary border-2 border-primary/30 hover:border-primary"
          }`}
        >
          Monthly Supporter
        </button>
      </div>
    </section>
  );
};

export default DonationTypeSection;
