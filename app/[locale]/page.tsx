"use client";
/**
 * @file Path: app/[locale]/donate/page.tsx
 * @description: This file contains the code for the landing page
 */

import LanguagePicker from "@/components/LanguagePicker";
import { useRouter } from "@/i18n/navigation";

const LandingPage = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/donate");
  };

  return (
    <div className="flex gap-10">
      <h1>LandingPage</h1>
      <LanguagePicker />

      {/* Temporary navigation buttons */}
      <button className="outline" onClick={onClick}>
        Go to Donation Page
      </button>
    </div>
  );
};

export default LandingPage;
