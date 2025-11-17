import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

const CTASection = () => {
  const t = useTranslations("landing.cta");
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          {t("title")}
        </h2>
        <p className="text-xl text-soft-charcoal">{t("description")}</p>
        <Link href="/donate">
          <Button size="lg" className="text-lg px-8 py-6">
            <Heart className="mr-2 h-5 w-5" />
            {t("buttonText")}
          </Button>
        </Link>
        <p className="text-base text-primary font-semibold mt-4 italic">
          {t("tagline")}
        </p>
      </div>
    </section>
  );
};

export default CTASection;
