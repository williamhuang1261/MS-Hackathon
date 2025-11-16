import React from "react";
import DonateButton from "../DonateButton";

const LandingBanner = () => {
  return (
    <div className="flex flex-col justify-between items-center w-full text-light-background h-130 bg-linear-to-b from-accent to-primary">
      <div className="flex w-full items-start justify-center px-20 pt-6 gap-1">
        <span>👨‍👩‍👧Family Protector just donated </span>
        <span className="text-yellow-500 font-bold">{"$100"}</span>
        <span>and has provided 1 weeks of safety for a family ✨</span>
      </div>
      <div className="flex flex-col items-center justify-between gap-10 px-16 pt-16">
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <h1 className="text-7xl font-bold">RAISE YOUR HAND</h1>
          <p className="text-3xl font-semibold">
            and say no to violence against women
          </p>
        </div>
        <p className="w-160 text-center text-lg">
          Protect a Woman Tonight. Domestic violence doesn't wait for tomorrow.
          Your support gives safety, food, and hope — right now.
        </p>
        <div className="">
          <DonateButton />
        </div>
      </div>
    </div>
  );
};

export default LandingBanner;
