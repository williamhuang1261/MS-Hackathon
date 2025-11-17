"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

const DonateButton = () => {
  const t = useTranslations("common");
  const router = useRouter();
  const onClick = () => {
    router.push("/donate");
  };

  return (
    <button
      className="text-lg font-medium bg-accent text-light-background px-6 py-3 rounded-full hover:opacity-90 transition-all cursor-pointer"
      onClick={onClick}
    >
      {t("donateNow")}
    </button>
  );
};

export default DonateButton;
