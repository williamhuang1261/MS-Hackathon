"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const LanguagePicker = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState("en");

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLocale = event.target.value;
    setCurrentLocale(newLocale);
    // For now, just navigate to the same path
    // In the future, this can be connected to proper i18n routing
    router.refresh();
  };

  const languages = [
    { text: "English", locale: "en" },
    { text: "Français", locale: "fr" },
    { text: "Español", locale: "es" },
    { text: "Italiano", locale: "it" },
    { text: "Հայերեն", locale: "hy" },
    { text: "Русский", locale: "ru" },
    { text: "Ελληνικά", locale: "el" },
    { text: "বাংলা", locale: "bn" },
    { text: "فارسی", locale: "fa" },
    { text: "العربية", locale: "ar" },
  ];

  return (
    <select value={currentLocale} onChange={handleLanguageChange}>
      {languages.map(({ text, locale }) => (
        <option key={locale} value={locale}>
          {text}
        </option>
      ))}
    </select>
  );
};

export default LanguagePicker;
