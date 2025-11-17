"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import logo from "@/public/athenaLogo.jpg";
import { useRouter } from "@/i18n/navigation";

const Logo = () => {
  const t = useTranslations("common");
  const router = useRouter();

  const onClick = () => {
    router.push("/");
  };

  return (
    <Image
      src={logo}
      alt={t("logoAlt")}
      width={220}
      height={220}
      className="rounded-full cursor-pointer hover:opacity-75 transition-opacity"
      onClick={onClick}
    />
  );
};

export default Logo;
