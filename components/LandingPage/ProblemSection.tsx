import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";
import image1 from "@/public/image1_home.png";
import image2 from "@/public/image2_home.png";
import image3 from "@/public/image3_home.png";

const ProblemSection = () => {
  const t = useTranslations("problem");

  const cards = [
    {
      imageSrc: "/image1_home.png",
      alt: t("cards.noSafety.title"),
      title: t("cards.noSafety.title"),
      description: t("cards.noSafety.description"),
    },
    {
      imageSrc: "/image2_home.png",
      alt: t("cards.nowhereToGo.title"),
      title: t("cards.nowhereToGo.title"),
      description: t("cards.nowhereToGo.description"),
    },
    {
      imageSrc: "/image3_home.png",
      alt: t("cards.noSupport.title"),
      title: t("cards.noSupport.title"),
      description: t("cards.noSupport.description"),
    },
  ];
  return (
    // Problem Section
    <section className="py-16 px-4 bg-snow-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-primary">
          {t("title")}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((item, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md border border-dark-background/50 overflow-hidden"
            >
              <div className="relative h-56 md:h-64">
                <Image
                  src={item.imageSrc}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-end">
                  <div className="w-full p-4">
                    <p className="text-white font-bold text-lg md:text-xl">
                      {item.title}
                    </p>
                    <p className="text-white/90 text-sm md:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center pt-8">
          <p className="text-xl text-soft-charcoal mb-6">{t("summary")}</p>
          <a
            href="/donate"
            className="bg-yellow-400 text-soft-charcoal hover:bg-[#f5d785] px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-block"
          >
            {t("cta")}
          </a>
          <p className="text-base text-primary font-semibold mt-4 italic">
            {t("tagline")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
