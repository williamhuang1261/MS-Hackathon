"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";

const DonateButton = () => {
  const t = useTranslations("common");
  const router = useRouter();
  const onClick = () => {
    router.push("/donate");
  };

  return (
    <Button size="lg" className="text-lg px-8 py-6" onClick={onClick}>
      <Heart className="mr-2 h-5 w-5" />
      {t("donateNow")}
    </Button>
  );
};

export default DonateButton;
