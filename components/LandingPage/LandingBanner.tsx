import React from "react";
import DonateButton from "../DonateButton";

const LandingBanner = () => {
  return (
    <div className="flex flex-col justify-between items-center w-full text-light-background min-h-screen md:h-150 bg-linear-to-b from-accent to-primary">
      <div className="flex w-full items-start justify-center px-4 sm:px-8 md:px-12 lg:px-20 py-4 md:py-6 gap-1 text-xs sm:text-sm md:text-base">
        <span className="text-center">👨‍👩‍👧Family Protector just donated </span>
        <span className="text-yellow-500 font-bold whitespace-nowrap">{"$100"}</span>
        <span className="text-center">and has provided 1 weeks of safety for a family ✨</span>
      </div>
      <div className="flex flex-col items-center justify-between gap-6 md:gap-10 px-4 sm:px-8 md:p-16 py-8 md:py-16">
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center px-2">RAISE YOUR HAND</h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center px-4">
            and say no to violence against women
          </p>
        </div>
        <p className="max-w-full sm:max-w-xl md:max-w-2xl lg:w-160 text-center text-sm sm:text-base md:text-lg px-4">
          Protect a Woman Tonight. Domestic violence doesn't wait for tomorrow.
          Your support gives safety, food, and hope — right now.
        </p>
        <div className="pt-2">
          <DonateButton />
        </div>
      </div>
    </div>
  );
};

export default LandingBanner;
