import React from "react";
import { useTranslations } from "next-intl";

const ProductSection = () => {
  const t = useTranslations("product");

  const donationTiers = [
    {
      amount: t("tiers.oneNight.amount"),
      title: t("tiers.oneNight.title"),
      desc: t("tiers.oneNight.description"),
    },
    {
      amount: t("tiers.therapy.amount"),
      title: t("tiers.therapy.title"),
      desc: t("tiers.therapy.description"),
    },
    {
      amount: t("tiers.family.amount"),
      title: t("tiers.family.title"),
      desc: t("tiers.family.description"),
    },
  ];
  return (
    <section
      style={{
        background: "linear-gradient(160deg, #4B1F66 0%, #C6B1E7 100%)",
      }}
      className="py-16 px-4 text-white"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-background">
          {t("title")}
        </h2>
        <p className="text-xl text-center mb-8 text-warm-white">
          {t("subtitle")}
        </p>

        {/* Impact Badge */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-md border-2 border-yellow-500 rounded-lg px-6 py-4 shadow-lg max-w-2xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🟣</span>
              <span className="font-bold text-yellow-500 text-lg">
                {t("impactBadge.percentage")}
              </span>
              <span className="text-hope-green text-xl">✓</span>
            </div>
            <p className="text-sm text-warm-white text-center">
              {t("impactBadge.description")}
            </p>
          </div>
        </div>

        {/* Donation Tiers */}
        <div className="grid md:grid-cols-3 gap-6">
          {donationTiers.map((tier, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center border-2 border-white/20 hover:border-yellow-500/60 transition-all"
            >
              <p className="text-5xl font-bold mb-4 text-yellow-500">
                {tier.amount}
              </p>
              <p className="text-xl font-semibold mb-2 text-background">
                {tier.title}
              </p>
              <p className="text-warm-white">{tier.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/donate"
            className="bg-yellow-500 text-soft-charcoal hover:bg-[#f5d785] px-8 py-4 rounded-lg text-lg font-bold transition-all duration-200 inline-block"
          >
            {t("cta")}
          </a>
          <p className="text-base text-yellow-500 font-semibold mt-4 italic">
            {t("tagline")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
