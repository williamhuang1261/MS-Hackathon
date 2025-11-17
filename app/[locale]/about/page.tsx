import FooterSection from "@/components/LandingPage/FooterSection";
import StickyHeader from "@/components/LandingPage/StickyHeader";
import { ORGANIZATION_STATS } from "@/lib/constants";
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("about");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="w-full fixed p-16 z-50 ">
        <StickyHeader />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16 px-4 pt-48">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{t("title")}</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                {t("mission.title")}
              </h2>
              <p className="text-lg text-foreground mb-6 leading-relaxed">
                {t("mission.description1")}
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                {t("mission.description2")}
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-primary mb-4">
                {t("vision.title")}
              </h3>
              <p className="text-foreground leading-relaxed">
                {t("vision.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-12">
            {t("impact.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-5xl md:text-6xl font-bold text-primary mb-4">
                {ORGANIZATION_STATS.womenSupported}
              </p>
              <p className="text-lg text-foreground font-semibold">
                {t("impact.womenSupported")}
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-5xl md:text-6xl font-bold text-primary mb-4">
                {ORGANIZATION_STATS.hotlineAvailability}
              </p>
              <p className="text-lg text-foreground font-semibold">
                {t("impact.hotlineAvailability")}
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-5xl md:text-6xl font-bold text-primary mb-4">
                10+
              </p>
              <p className="text-lg text-foreground font-semibold">
                {t("impact.languagesSupported")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-12">
            {t("services.title")}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Office Services */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl text-white">🏢</span>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4 text-center">
                {t("services.professional.title")}
              </h3>
              <p className="text-foreground leading-relaxed text-center">
                {t("services.professional.description")}
              </p>
            </div>

            {/* Shelter Services */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl text-white">🏠</span>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4 text-center">
                {t("services.shelter.title")}
              </h3>
              <p className="text-foreground leading-relaxed text-center">
                {t("services.shelter.description")}
              </p>
            </div>

            {/* Community Outreach */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl text-white">🌍</span>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4 text-center">
                {t("services.outreach.title")}
              </h3>
              <p className="text-foreground leading-relaxed text-center">
                {t("services.outreach.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-12">
            {t("values.title")}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-primary mb-4">
                {t("values.culturalSensitivity.title")}
              </h3>
              <p className="text-foreground leading-relaxed">
                {t("values.culturalSensitivity.description")}
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-primary mb-4">
                {t("values.multilingualSupport.title")}
              </h3>
              <p className="text-foreground leading-relaxed">
                {t("values.multilingualSupport.description")}
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-primary mb-4">
                {t("values.empowerment.title")}
              </h3>
              <p className="text-foreground leading-relaxed">
                {t("values.empowerment.description")}
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-primary mb-4">
                {t("values.comprehensiveCare.title")}
              </h3>
              <p className="text-foreground leading-relaxed">
                {t("values.comprehensiveCare.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            {t("emergency.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-primary/20 p-6 rounded-lg backdrop-blur">
              <h3 className="text-2xl font-bold mb-4">
                {t("emergency.montrealOffice")}
              </h3>
              <p className="text-lg">514-274-8117</p>
              <p className="text-lg">
                1-877-274-8117 {t("emergency.tollFree")}
              </p>
            </div>
            <div className="bg-primary/20 p-6 rounded-lg backdrop-blur">
              <h3 className="text-2xl font-bold mb-4">
                {t("emergency.lavalOffice")}
              </h3>
              <p className="text-lg">450-688-6584</p>
              <p className="text-sm mt-2 text-white/80">
                {t("emergency.sexualViolenceHelp")}
              </p>
            </div>
          </div>
          <p className="text-lg mb-8">{t("emergency.emergencyInfo")}</p>
          <a
            href="/contact"
            className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-block text-lg"
          >
            {t("emergency.getSupportButton")}
          </a>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-xl text-foreground mb-8">{t("cta.description")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/donate"
              className="bg-primary text-white hover:bg-primary/90 px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-block text-lg"
            >
              {t("cta.donateButton")}
            </a>
            <a
              href="/resources"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-block text-lg"
            >
              {t("cta.learnMoreButton")}
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default AboutPage;
