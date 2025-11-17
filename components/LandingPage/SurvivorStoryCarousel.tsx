"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { SurvivorStory } from "@/lib/types";

export default function SurvivorStoryCarousel() {
  const t = useTranslations("stories.carousel");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const stories: SurvivorStory[] = [
    {
      text: t("story1.quote"),
      name: t("story1.name"),
    },
    {
      text: t("story2.quote"),
      name: t("story2.name"),
    },
    {
      text: t("story3.quote"),
      name: t("story3.name"),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % stories.length);
        setIsVisible(true);
      }, 500);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const goToStory = (index: number): void => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsVisible(true);
    }, 300);
  };

  return (
    <div className="bg-linear-to-br from-accent/10 to-accent/60 border-2 border-accent/40 rounded-lg p-8 md:p-10 min-h-80 flex flex-col justify-between">
      <div className="flex items-center justify-center mb-4">
        <span className="text-3xl mr-3">💜</span>
        <h3 className="text-2xl font-bold text-primary">Real Impact Stories</h3>
      </div>

      <div
        className={`transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-lg md:text-xl text-foreground leading-relaxed text-center mb-2 italic">
          "{stories[currentIndex].text}"
        </p>
        <p className="text-sm text-foreground/70 text-center font-semibold">
          — {stories[currentIndex].name} (name changed for privacy)
        </p>
      </div>

      {/* Carousel Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {stories.map((_, index) => (
          <button
            key={index}
            onClick={() => goToStory(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary w-8"
                : "bg-accent hover:bg-primary/50"
            }`}
            aria-label={`Go to story ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
