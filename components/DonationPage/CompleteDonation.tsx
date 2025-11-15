import React from "react";

interface Props {
  selectedAmount: number | null;
  handleComplete: () => void;
}

const CompleteDonation = ({ selectedAmount, handleComplete }: Props) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={handleComplete}
        disabled={!selectedAmount}
        className={`px-12 py-4 rounded-lg font-bold text-xl transition-all ${
          selectedAmount
            ? "bg-accent/75 text-white hover:bg-accent shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {selectedAmount ? `Complete Donation` : "Select an Amount"}
      </button>
    </div>
  );
};

export default CompleteDonation;
