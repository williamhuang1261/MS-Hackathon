import React from "react";
import StickyHeader from "@/components/LandingPage/StickyHeader";
import FooterSection from "@/components/LandingPage/FooterSection";
import { useTranslations } from "next-intl";

const ResourcesPage = () => {
  const t = useTranslations("resources");

  return (
    <div className="flex flex-col w-full relative">
      <div className="w-full fixed p-16 z-50">
        <StickyHeader />
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-accent text-white pt-48 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{t("title")}</h1>
          <p className="text-xl md:text-2xl mb-8">{t("heroSubtitle")}</p>
          <p className="text-lg text-white/90 font-semibold">
            {t("legalNotice")}
          </p>
        </div>
      </div>

      {/* Emergency Numbers Section */}
      <section className="bg-red-700 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t("emergency.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-red-600 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-white-200">
                {t("emergency.immediate.title")}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-red-500 pb-2">
                  <span className="font-semibold">
                    {t("emergency.immediate.police")}
                  </span>
                  <span className="text-xl font-bold">9-1-1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">
                    {t("emergency.immediate.sosViolence")}
                  </span>
                  <div className="text-right">
                    <div>514-873-9010</div>
                    <div className="text-sm">1-800-363-9010</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-red-600 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-white-200">
                {t("emergency.shieldOfAthena.title")}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-red-500 pb-2">
                  <span className="font-semibold">
                    {t("emergency.shieldOfAthena.montreal")}
                  </span>
                  <div className="text-right">
                    <div>514-274-8117</div>
                    <div className="text-sm">1-877-274-8117</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">
                    {t("emergency.shieldOfAthena.laval")}
                  </span>
                  <span>450-688-6584</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 bg-red-600 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-white-200">
                {t("emergency.sexualViolence.title")}
              </h3>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="text-center">
                  <div className="font-semibold">
                    {t("emergency.sexualViolence.montreal")}
                  </div>
                  <div>514-270-2900</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">
                    {t("emergency.sexualViolence.laval")}
                  </div>
                  <div>450-688-2117</div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-sm mt-6 border-t border-red-600 pt-4">
            {t("emergency.confidentialNotice")}
          </p>
        </div>
      </section>

      {/* Quick Assessment Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">
            {t("quickHelp.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-primary mb-3">
                {t("quickHelp.emergency.title")}
              </h3>
              <p className="text-foreground mb-4">
                {t("quickHelp.emergency.description")}
              </p>
              <div className="bg-red-50 p-4 rounded border">
                <p className="text-sm font-semibold text-red-700 mb-2">
                  {t("quickHelp.emergency.callImmediately")}
                </p>
                <p className="text-lg font-bold text-red-700">9-1-1</p>
                <p className="text-sm text-red-600 mt-2">
                  {t("quickHelp.emergency.policeNote")}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold text-primary mb-3">
                {t("quickHelp.shelter.title")}
              </h3>
              <p className="text-foreground mb-4">
                {t("quickHelp.shelter.description")}
              </p>
              <div className="bg-yellow-50 p-4 rounded border">
                <p className="text-sm font-semibold text-yellow-700 mb-2">
                  {t("quickHelp.shelter.officeHours")}
                </p>
                <p className="font-bold text-yellow-700">
                  Montreal: 514-274-8117
                </p>
                <p className="font-bold text-yellow-700">Laval: 450-688-6584</p>
                <p className="text-sm text-yellow-600 mt-2">
                  {t("quickHelp.shelter.afterHours")}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-primary mb-3">
                {t("quickHelp.talk.title")}
              </h3>
              <p className="text-foreground mb-4">
                {t("quickHelp.talk.description")}
              </p>
              <div className="bg-blue-50 p-4 rounded border">
                <p className="text-sm font-semibold text-blue-700 mb-2">
                  {t("quickHelp.talk.counselingAvailable")}
                </p>
                <p className="text-sm text-blue-600">
                  {t("quickHelp.talk.languages")}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-primary mb-3">
                {t("quickHelp.children.title")}
              </h3>
              <p className="text-foreground mb-4">
                {t("quickHelp.children.description")}
              </p>
              <div className="bg-purple-50 p-4 rounded border">
                <p className="text-sm font-semibold text-purple-700 mb-2">
                  {t("quickHelp.children.services")}
                </p>
                <p className="text-sm text-purple-600">
                  {t("quickHelp.children.servicesList")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Planning Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">
            {t("safety.title")}
          </h2>
          <p className="text-center text-lg text-foreground mb-8">
            {t("safety.description")}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* If you're no longer with your partner */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-primary mb-4">
                {t("safety.afterLeaving.title")}
              </h3>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  {t("safety.afterLeaving.steps.0")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  {t("safety.afterLeaving.steps.1")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  {t("safety.afterLeaving.steps.2")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  {t("safety.afterLeaving.steps.3")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  {t("safety.afterLeaving.steps.4")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  {t("safety.afterLeaving.steps.5")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  {t("safety.afterLeaving.steps.6")}
                </li>
              </ul>
            </div>

            {/* If you're still with your partner */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-primary mb-4">
                {t("safety.stillTogether.title")}
              </h3>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">⚠</span>
                  {t("safety.stillTogether.steps.0")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">⚠</span>
                  {t("safety.stillTogether.steps.1")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">⚠</span>
                  {t("safety.stillTogether.steps.2")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">⚠</span>
                  {t("safety.stillTogether.steps.3")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">⚠</span>
                  {t("safety.stillTogether.steps.4")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">⚠</span>
                  {t("safety.stillTogether.steps.5")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">⚠</span>
                  {t("safety.stillTogether.steps.6")}
                </li>
              </ul>
            </div>
          </div>

          {/* Departure Kit */}
          <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-primary mb-4">
              {t("safety.departureKit.title")}
            </h3>
            <p className="text-foreground mb-4">
              {t("safety.departureKit.description")}
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-primary mb-2">
                  {t("safety.departureKit.legal.title")}
                </h4>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• {t("safety.departureKit.legal.items.0")}</li>
                  <li>• {t("safety.departureKit.legal.items.1")}</li>
                  <li>• {t("safety.departureKit.legal.items.2")}</li>
                  <li>• {t("safety.departureKit.legal.items.3")}</li>
                  <li>• {t("safety.departureKit.legal.items.4")}</li>
                  <li>• {t("safety.departureKit.legal.items.5")}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">
                  {t("safety.departureKit.essentials.title")}
                </h4>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• {t("safety.departureKit.essentials.items.0")}</li>
                  <li>• {t("safety.departureKit.essentials.items.1")}</li>
                  <li>• {t("safety.departureKit.essentials.items.2")}</li>
                  <li>• {t("safety.departureKit.essentials.items.3")}</li>
                  <li>• {t("safety.departureKit.essentials.items.4")}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">
                  {t("safety.departureKit.personal.title")}
                </h4>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• {t("safety.departureKit.personal.items.0")}</li>
                  <li>• {t("safety.departureKit.personal.items.1")}</li>
                  <li>• {t("safety.departureKit.personal.items.2")}</li>
                  <li>• {t("safety.departureKit.personal.items.3")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">{t("finalMessage.title")}</h2>
          <p className="text-xl mb-8">{t("finalMessage.description")}</p>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <a
              href="tel:911"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-200 text-center block"
            >
              {t("finalMessage.emergencyButton")}
            </a>
            <a
              href="tel:5142748117"
              className="bg-accent hover:bg-accent/90 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-200 text-center block"
            >
              {t("finalMessage.shieldButton")}
            </a>
          </div>
          <p className="text-sm mt-6 text-white/80">
            {t("finalMessage.confidentialNote")}
          </p>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default ResourcesPage;
