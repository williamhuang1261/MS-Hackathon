import { ORGANIZATION_STATS } from "@/lib/constants";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import shelter_home from "@/public/Shelter_home.png";
import meal_home from "@/public/meals_home.png";
import therapy_home from "@/public/therapy_home.png";
import legal_home from "@/public/legal_home.png";
import multisupport_home from "@/public/multisupport_home.png";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const SolutionSection = () => {
  const t = useTranslations("solution");

  const services = [
    {
      imageSrc: shelter_home,
      alt: t("services.shelter.title"),
      title: t("services.shelter.title"),
      desc: t("services.shelter.description"),
    },
    {
      imageSrc: meal_home,
      alt: t("services.meals.title"),
      title: t("services.meals.title"),
      desc: t("services.meals.description"),
    },
    {
      imageSrc: therapy_home,
      alt: t("services.therapy.title"),
      title: t("services.therapy.title"),
      desc: t("services.therapy.description"),
    },
    {
      imageSrc: legal_home,
      alt: t("services.legal.title"),
      title: t("services.legal.title"),
      desc: t("services.legal.description"),
    },
    {
      imageSrc: multisupport_home,
      alt: t("services.outreach.title"),
      title: t("services.outreach.title"),
      desc: t("services.outreach.description"),
    },
  ];
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto px-4">
        <Card>
          <CardContent className="pt-6 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary">
              {t("title")}
            </h2>
            <p className="text-xl text-center text-foreground">{t("subtitle")}</p>

            {/* Social Proof Stats */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 py-6">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary">
                  {ORGANIZATION_STATS.womenSupported}
                </p>
                <p className="text-foreground/80 font-semibold mt-1">
                  {t("stats.womenSupported")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary">
                  {ORGANIZATION_STATS.hotlineAvailability}
                </p>
                <p className="text-foreground/80 font-semibold mt-1">
                  {t("stats.hotlineAvailability")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary">
                  {ORGANIZATION_STATS.yearsServing}
                </p>
                <p className="text-foreground/80 font-semibold mt-1">
                  {t("stats.yearsServing")}
                </p>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`rounded-lg shadow-md border border-accent/40 overflow-hidden ${index === services.length - 1
                    ? "md:col-span-2 max-w-3xl mx-auto w-full"
                    : ""
                    }`}
                >
                  <div
                    className={`relative ${index === services.length - 1
                      ? "h-64 md:h-72"
                      : "h-56 md:h-64"
                      }`}
                  >
                    <Image
                      src={service.imageSrc}
                      alt={service.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-end">
                      <div className="w-full p-4">
                        <h3 className="text-white font-bold text-xl md:text-2xl">
                          {service.title}
                        </h3>
                        <p className="text-white/90 text-sm md:text-base">
                          {service.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-8">
              <Link href="/donate">
                <Button size="lg" className="text-lg px-8 py-6">
                  <Heart className="mr-2 h-5 w-5" />
                  {t("cta")}
                </Button>
              </Link>
              <p className="text-base text-primary font-semibold mt-4 italic">
                {t("tagline")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SolutionSection;
