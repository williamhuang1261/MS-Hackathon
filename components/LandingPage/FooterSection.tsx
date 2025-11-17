import React from "react";
import { useTranslations } from "next-intl";

const FooterSection = () => {
  const t = useTranslations("footer");
  return (
    <footer className="bg-primary text-light-background py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Emergency Notice */}
        <div className="bg-red-700 text-white p-6 rounded-lg mb-12 text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{t("emergency.title")}</h2>
          <div className="grid md:grid-cols-2 gap-4 text-left max-w-4xl mx-auto">
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-primary">
                  {t("emergency.police")}
                </p>
                <p className="text-xl">9-1-1</p>
              </div>
              <div>
                <p className="font-semibold text-primary">
                  {t("emergency.sosViolence")}
                </p>
                <p>514-873-9010 or 1-800-363-9010</p>
              </div>
              <div>
                <p className="font-semibold text-primary">
                  {t("emergency.shieldMontrealOffice")}
                </p>
                <p>514-274-8117 or 1-877-274-8117</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-primary">
                  {t("emergency.shieldLavalOffice")}
                </p>
                <p>450-688-6584</p>
              </div>
              <div>
                <p className="font-semibold text-primary">
                  {t("emergency.multilingualSupport")}
                </p>
                <p>514-270-2900 (Montreal)</p>
                <p>450-688-2117 (Laval)</p>
              </div>
            </div>
          </div>
          <p className="text-sm border-t border-red-600 pt-3 mt-4">
            {t("emergency.confidentialNotice")}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <div>
                <h3 className="text-3xl font-bold text-accent mb-2">
                  {t("organization.name")}
                </h3>
                <p className="text-sm text-accent font-medium">
                  {t("organization.subtitle")}
                </p>
              </div>
              <p className="text-base leading-relaxed text-gray-200">
                {t("organization.description")}
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-accent font-semibold">
                    {t("organization.montrealOffice")}
                  </span>
                  <span className="text-gray-200">
                    514-274-8117 or 1-877-274-8117
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent font-semibold">
                    {t("organization.lavalOffice")}
                  </span>
                  <span className="text-gray-200">450-688-6584</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent font-semibold">
                    {t("organization.email")}
                  </span>
                  <span className="text-gray-200">info@shieldofathena.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent font-semibold">
                    {t("organization.languages")}
                  </span>
                  <span className="text-gray-200">
                    {t("organization.languagesList")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Services & Resources */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-accent border-b border-accent/30 pb-2">
              {t("services.title")}
            </h4>
            <ul className="space-y-3 text-sm text-gray-200">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full shrink-0"></span>
                {t("services.emergencyShelter")}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full shrink-0"></span>
                {t("services.professionalCounseling")}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full shrink-0"></span>
                {t("services.legalAdvocacy")}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full shrink-0"></span>
                {t("services.childrensPrograms")}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full shrink-0"></span>
                {t("services.safetyPlanning")}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full shrink-0"></span>
                {t("services.communityOutreach")}
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-accent border-b border-accent/30 pb-2">
              {t("information.title")}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/about"
                  className="text-gray-200 hover:text-accent transition-colors"
                >
                  {t("information.aboutMission")}
                </a>
              </li>
              <li>
                <a
                  href="/resources"
                  className="text-gray-200 hover:text-accent transition-colors"
                >
                  {t("information.safetyResources")}
                </a>
              </li>
              <li>
                <a
                  href="/donate"
                  className="text-gray-200 hover:text-accent transition-colors"
                >
                  {t("information.makeDonation")}
                </a>
              </li>
              <li>
                <a
                  href="/volunteer"
                  className="text-gray-200 hover:text-accent transition-colors"
                >
                  {t("information.volunteerOpportunities")}
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-200 hover:text-accent transition-colors"
                >
                  {t("information.getInTouch")}
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-200 hover:text-accent transition-colors"
                >
                  {t("information.privacySafety")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-accent/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-300">{t("legal.copyright")}</p>
              <div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-2">
                <a
                  href="/privacy"
                  className="hover:text-accent transition-colors"
                >
                  {t("legal.privacyPolicy")}
                </a>
                <a
                  href="/terms"
                  className="hover:text-accent transition-colors"
                >
                  {t("legal.termsOfService")}
                </a>
                <a
                  href="/accessibility"
                  className="hover:text-accent transition-colors"
                >
                  {t("legal.accessibility")}
                </a>
                <a
                  href="/contact"
                  className="hover:text-accent transition-colors"
                >
                  {t("legal.mediaInquiries")}
                </a>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm font-semibold text-accent mb-2">
                {t("legal.trustMessage")}
              </p>
              <p className="text-xs text-gray-300">
                {t("legal.priorityMessage")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
