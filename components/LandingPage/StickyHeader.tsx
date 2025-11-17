"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import DonateButton from "../DonateButton";
import LanguagePicker from "../LanguagePicker";
import Logo from "../Logo";

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
      className="text-lg font-medium hover:underline cursor-pointer hover:opacity-90 transition-all"
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

  return (
    <div className="w-full bg-light-background flex justify-between items-center px-12 py-3 z-10 border-dark-background border shadow-md rounded-full">
      <Logo />
      <div className="flex gap-10 ">
        <MenuOptions title={t("home")} destination="/" />
        <MenuOptions title={t("aboutUs")} destination="/about" />
        <MenuOptions title={t("resources")} destination="/resources" />
        <MenuOptions title={t("contact")} destination="/contact" />
      </div>
      <div className="flex gap-10">
        {showDonation && <DonateButton />}
        <LanguagePicker />
      </div>
    </div>
  );
};

export default StickyHeader;
