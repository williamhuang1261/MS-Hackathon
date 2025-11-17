import React from "react";
import { useTranslations } from "next-intl";

import facebookIcon from "@/public/facebookLogo.svg";
import xIcon from "@/public/xLogo.jpg";
import linkedinIcon from "@/public/linkedinLogo.png";
import instagramIcon from "@/public/instagramLogo.svg";
import Image from "next/image";

const ShareSection = () => {
  const t = useTranslations("thankYou.share");
  return (
    <div className="w-full bg-light-background rounded-lg shadow-lg p-6">
      <h2 className="text-2xl">{t("title")}</h2>
      <div className="flex gap-4">
        <Image
          src={facebookIcon}
          alt={t("facebook")}
          width={28}
          height={28}
          className="cursor-pointer rounded-sm"
        />
        <Image
          src={xIcon}
          alt={t("twitter")}
          width={28}
          height={28}
          className="cursor-pointer rounded-sm"
        />
        <Image
          src={linkedinIcon}
          alt={t("linkedin")}
          width={28}
          height={28}
          className="cursor-pointer rounded-sm"
        />
        <Image
          src={instagramIcon}
          alt={t("instagram")}
          width={28}
          height={28}
          className="cursor-pointer rounded-sm"
        />
      </div>
    </div>
  );
};
export default ShareSection;
