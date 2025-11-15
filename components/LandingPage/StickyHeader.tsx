"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import DonateButton from "../DonateButton";
import LanguagePicker from "../LanguagePicker";
import Logo from "../Logo";

type MenuOptionsProps = {
  title: string;
  destination: string;
  onClick?: () => void;
};
const MenuOptions = ({ title, destination, onClick }: MenuOptionsProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(destination);
    onClick?.();
  };

  return (
    <h2
      className="text-lg font-medium hover:underline cursor-pointer hover:opacity-90 transition-all"
      onClick={handleClick}
    >
      {title}
    </h2>
  );
};

type Props = {
  showDonation?: boolean;
};

const StickyHeader = ({ showDonation = true }: Props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="w-full bg-light-background flex justify-between items-center px-4 md:px-8 lg:px-12 py-2 md:py-3 z-10 border-dark-background border shadow-md rounded-full relative">
        <Logo />
        <div className="hidden lg:flex gap-6 xl:gap-10">
          <MenuOptions title="Home" destination="/" />
          <MenuOptions title="About Us" destination="/about" />
          <MenuOptions title="Ressources" destination="/resources" />
          <MenuOptions title="Contact" destination="/contact" />
        </div>
        <div className="flex gap-3 md:gap-6 lg:gap-10 items-center">
          {showDonation && <DonateButton />}
          <LanguagePicker />
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex flex-col gap-1.5 p-2 min-w-[44px] min-h-[44px] items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-foreground transition-all ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-20 left-0 right-0 z-50 bg-light-background border-t border-dark-background shadow-lg animate-in slide-in-from-top">
          <div className="flex flex-col px-4 py-4 gap-4">
            <MenuOptions title="Home" destination="/" onClick={closeMobileMenu} />
            <MenuOptions title="About Us" destination="/about" onClick={closeMobileMenu} />
            <MenuOptions title="Ressources" destination="/resources" onClick={closeMobileMenu} />
            <MenuOptions title="Contact" destination="/contact" onClick={closeMobileMenu} />
          </div>
        </div>
      )}
      
      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-40 top-20"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
};

export default StickyHeader;
