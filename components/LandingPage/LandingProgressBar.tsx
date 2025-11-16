import React from "react";

interface Props {
  progress: number;
}

const LandingProgressBar = ({ progress }: Props) => {
  // Clamp progress between 0 and 100
  const percent = Math.max(0, Math.min(100, progress));

  return (
    <div className="w-full max-w-xl h-1 bg-gray-600 rounded-lg overflow-hidden outline-2 outline-primary flex items-center relative">
      <div
        className="h-full bg-yellow-500 transition-all duration-700"
        style={{ width: `${percent}%` }}
      />
      {/* <span className="absolute left-1/2 -translate-x-1/2 text-xs font-bold text-primary drop-shadow">
        {percent.toFixed(1)}%
      </span> */}
    </div>
  );
};
export default LandingProgressBar;
