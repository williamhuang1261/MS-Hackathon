"use client";

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
  return (
    <div className="w-full bg-light-background flex justify-between items-center px-4 md:px-8 lg:px-12 py-2 md:py-3 z-10 border-dark-background border shadow-md rounded-full">
      <Logo />
      <div className="hidden lg:flex gap-6 xl:gap-10">
        <MenuOptions title="Home" destination="/" />
        <MenuOptions title="About Us" destination="/about" />
        <MenuOptions title="Ressources" destination="/resources" />
        <MenuOptions title="Contact" destination="/contact" />
      </div>
      <div className="flex gap-3 md:gap-6 lg:gap-10">
        {showDonation && <DonateButton />}
        <LanguagePicker />
      </div>
    </div>
  );
};

export default StickyHeader;
