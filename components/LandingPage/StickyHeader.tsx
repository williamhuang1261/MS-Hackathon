"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import DonateButton from "../DonateButton";
import LanguagePicker from "../LanguagePicker";
import Image from "next/image";
import shieldAthenaLogo from "@/public/shieldofathena.png";
import shieldAthenaText from "@/public/mshackathonlogotxt.jpg";

type MenuOptionsProps = {
  title: string;
  destination: string;
};
const MenuOptions = ({ title, destination }: MenuOptionsProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push(destination);
  };

  return (
    <h2
      className="text-2xl font-medium hover:underline cursor-pointer hover:opacity-90 transition-all whitespace-nowrap"
      onClick={onClick}
    >
      {title}
    </h2>
  );
};

type Props = {
  showDonation?: boolean;
};

const StickyHeader = ({ showDonation = true }: Props) => {
  const t = useTranslations("navigation");
  const router = useRouter();

  return (
    <div className="w-full bg-light-background flex justify-between items-center px-10 py-4 z-10 border-dark-background border shadow-md rounded-full">
      <div className="cursor-pointer flex items-center gap-3" onClick={() => router.push("/")}>
        <Image
          src={shieldAthenaLogo}
          alt="Shield of Athena Logo"
          width={55}
          height={55}
          className="object-contain"
          priority
        />
        <Image
          src={shieldAthenaText}
          alt="Shield of Athena"
          width={220}
          height={44}
          className="object-contain"
          priority
        />
      </div>
      <div className="flex gap-8 items-center">
        <MenuOptions title={t("home")} destination="/" />
        <MenuOptions title={t("aboutUs")} destination="/about" />
        <MenuOptions title={t("resources")} destination="/resources" />
        <MenuOptions title={t("contact")} destination="/contact" />
      </div>
      <div className="flex gap-6 items-center">
        {showDonation && <DonateButton />}
        <LanguagePicker />
      </div>
    </div>
  );
};

export default StickyHeader;
