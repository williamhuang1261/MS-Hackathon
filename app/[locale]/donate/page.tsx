"use client";

import DonationForm from "@/components/DonationForm";
/**
 * @file Path: app/[locale]/donate/page.tsx
 * @description: This file contains the code for the donation page
 */

import LanguagePicker from "@/components/LanguagePicker";
import { useRouter } from "@/i18n/navigation";

const DonationPage = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/");
  };

  return (
    <div className="flex gap-10 items-start">
      <h1>Donation Page</h1>
      <LanguagePicker />

      {/* Temporary navigation buttons */}
      <button className="outline" onClick={onClick}>
        Go to Home Page
      </button>

      <DonationForm />
    </div>
  );
};

export default DonationPage;
