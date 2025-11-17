import React, { useEffect, useState } from "react";
import DonateButton from "../DonateButton";

const THANK_YOU_MESSAGES = [
  {
    name: "👨‍👩‍👧Family Protector",
    amount: 100,
    weeksOfSafety: 1,
  },
  {
    name: "🌟Hope Giver",
    amount: 250,
    weeksOfSafety: 3,
  },
  {
    name: "💪Change Maker",
    amount: 500,
    weeksOfSafety: 6,
  },
];

const LandingBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false); // Start fade out
      setTimeout(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % THANK_YOU_MESSAGES.length
        );
        setFade(true); // Fade in new message
      }, 400); // fade out duration
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentMessage = THANK_YOU_MESSAGES[currentIndex];

  return (
    <div className="flex flex-col justify-between items-center w-full text-light-background h-130 bg-linear-to-b from-accent to-primary">
      <div
        className={`flex w-full items-start justify-center px-20 pt-6 gap-1 transition-opacity duration-400 ${
          fade ? "opacity-100" : "opacity-30"
        }`}
      >
        <span>{currentMessage.name} just donated </span>
        <span className="text-yellow-500 font-bold">{`$${currentMessage.amount}`}</span>
        <span>
          and has provided {currentMessage.weeksOfSafety} weeks of safety for a
          family ✨
        </span>
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
