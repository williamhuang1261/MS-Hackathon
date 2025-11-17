"use client";

import { useTranslations } from "next-intl";

const DonationForm = () => {
  const t = useTranslations("donationForm");

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    alert(t("submitted"));
    // Technically go to the payment page -> confirmation + CRM
  };

  return (
    <form className="flex flex-col outline" onSubmit={onSubmit}>
      {/* Donation form fields go here */}
      <h2 className="font-bold">{t("title")}</h2>
      <input type="text" placeholder={t("firstName")} />
      <input type="text" placeholder={t("lastName")} />
      <input type="email" placeholder={t("email")} />
      <input type="number" placeholder={t("amount")} />
      <button type="submit">{t("donate")}</button>
    </form>
  );
};

export default DonationForm;
