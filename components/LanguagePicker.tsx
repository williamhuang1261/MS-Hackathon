"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const LanguagePicker = () => {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    router.replace(pathname, { locale: event.target.value });
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
