import React from "react";
import { useTranslations } from "next-intl";
import LandingProgressBar from "./LandingProgressBar";

interface Props {
  progress: number;
}

const LandingTargetSection = ({ progress }: Props) => {
  const t = useTranslations("landing.target");

  return (
    <div className="w-full flex flex-col items-center pb-16 gap-4">
      <div className="w-full flex justify-center text-light-background gap-4">
        <h2 className="text-light-background text-3xl">{t("monthlyGoal")}</h2>
        <h2 className="text-light-background text-3xl">
          {(progress * 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
        </h2>
        <p className="font-serif text-dark-background text-lg mt-2">
          {t("goalSuffix")}
        </p>
      </div>
      <LandingProgressBar progress={progress} />
    </div>
  );
};

export default LandingTargetSection;
