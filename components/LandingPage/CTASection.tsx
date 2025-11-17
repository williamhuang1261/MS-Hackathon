import React from "react";
import { useTranslations } from "next-intl";

const CTASection = () => {
  const t = useTranslations("landing.cta");
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          {t("title")}
        </h2>
        <p className="text-xl text-soft-charcoal">{t("description")}</p>
        <a
          href="/donate"
          className="bg-yellow-400 text-foreground hover:bg-[#f5d785] px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-block text-lg"
        >
          {t("buttonText")}
        </a>
        <p className="text-base text-primary font-semibold mt-4 italic">
          {t("tagline")}
        </p>
      </div>
    </section>
  );
};

export default CTASection;
