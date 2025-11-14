import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr", "es", "it", "hy", "ru", "el", "bn", "fa", "ar"],

  // Used when no locale matches
  defaultLocale: "en",
});
