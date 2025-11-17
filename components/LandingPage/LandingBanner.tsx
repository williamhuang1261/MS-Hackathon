import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import DonateButton from "../DonateButton";

const LandingBanner = () => {
  const t = useTranslations("landing.banner");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const THANK_YOU_MESSAGES = [
    {
      name: t("donorTypes.familyProtector"),
      amount: 100,
      weeksOfSafety: 1,
    },
    {
      name: t("donorTypes.hopeGiver"),
      amount: 250,
      weeksOfSafety: 3,
    },
    {
      name: t("donorTypes.changeMaker"),
      amount: 500,
      weeksOfSafety: 6,
    },
  ];

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
    <div className="flex flex-col justify-between items-center w-full text-light-background h-130 bg-primary">
      <div
        className={`flex w-full items-start justify-center px-20 pt-6 gap-1 transition-opacity duration-400 ${fade ? "opacity-100" : "opacity-30"
          }`}
      >
        <span>
          {currentMessage.name} {t("donationMessage")}{" "}
        </span>
        <span className="text-accent font-bold">{`$${currentMessage.amount}`}</span>
        <span>
          {t("safetyWeeksMessage", { weeks: currentMessage.weeksOfSafety })}
        </span>
      </div>
      <div className="flex flex-col items-center justify-between gap-10 px-16 pt-16">
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <h1 className="text-7xl font-bold">{t("mainHeading")}</h1>
          <p className="text-3xl font-semibold">{t("subHeading")}</p>
        </div>
        <p className="w-160 text-center text-lg">{t("description")}</p>
        <div className="">
          <DonateButton />
        </div>
      </div>
    </div>
  );
};

export default LandingBanner;
