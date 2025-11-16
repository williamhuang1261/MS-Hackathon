import React from "react";

const FooterSection = () => {
  return (
    <footer className="bg-primary text-light-background py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Emergency Notice */}
        <div className="bg-red-700 text-white p-6 rounded-lg mb-12 text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-4">IMPORTANT NUMBERS</h2>
          <div className="grid md:grid-cols-2 gap-4 text-left max-w-4xl mx-auto">
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-yellow-200">Police</p>
                <p className="text-xl">9-1-1</p>
              </div>
              <div>
                <p className="font-semibold text-yellow-200">
                  S.O.S. Violence conjugale
                </p>
                <p>514-873-9010 or 1-800-363-9010</p>
              </div>
              <div>
                <p className="font-semibold text-yellow-200">
                  Shield of Athena Montreal office
                </p>
                <p>514-274-8117 or 1-877-274-8117</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-yellow-200">
                  Shield of Athena Laval office
                </p>
                <p>450-688-6584</p>
              </div>
              <div>
                <p className="font-semibold text-yellow-200">
                  The Shield's Multilingual Sexual Violence Support and Help
                  Lines
                </p>
                <p>514-270-2900 (Montreal)</p>
                <p>450-688-2117 (Laval)</p>
              </div>
            </div>
          </div>
          <p className="text-sm border-t border-red-600 pt-3 mt-4">
            All calls are confidential and free | Multiple languages available
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <div>
                <h3 className="text-3xl font-bold text-yellow-400 mb-2">
                  Shield of Athena
                </h3>
                <p className="text-sm text-accent font-medium">
                  Bouclier d'Athéna | Founded 1991
                </p>
              </div>
              <p className="text-base leading-relaxed text-gray-200">
                A registered non-profit organization providing comprehensive
                support services to survivors of domestic violence and their
                children. We offer emergency shelter, professional counseling,
                legal advocacy, and community resources in a safe, confidential
                environment.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 font-semibold">
                    Montreal Office:
                  </span>
                  <span className="text-gray-200">
                    514-274-8117 or 1-877-274-8117
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 font-semibold">
                    Laval Office:
                  </span>
                  <span className="text-gray-200">450-688-6584</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 font-semibold">Email:</span>
                  <span className="text-gray-200">info@shieldofathena.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 font-semibold">
                    Languages:
                  </span>
                  <span className="text-gray-200">
                    English, French, Spanish, Arabic, Greek
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Services & Resources */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-yellow-400 border-b border-accent/30 pb-2">
              Our Services
            </h4>
            <ul className="space-y-3 text-sm text-gray-200">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full shrink-0"></span>
                Emergency Shelter (24/7)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full shrink-0"></span>
                Professional Counseling
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full shrink-0"></span>
                Legal Advocacy
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full shrink-0"></span>
                Children's Programs
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full shrink-0"></span>
                Safety Planning
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full shrink-0"></span>
                Community Outreach
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-yellow-400 border-b border-accent/30 pb-2">
              Information
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/about"
                  className="text-gray-200 hover:text-yellow-400 transition-colors"
                >
                  About Our Mission
                </a>
              </li>
              <li>
                <a
                  href="/resources"
                  className="text-gray-200 hover:text-yellow-400 transition-colors"
                >
                  Safety Resources
                </a>
              </li>
              <li>
                <a
                  href="/donate"
                  className="text-gray-200 hover:text-yellow-400 transition-colors"
                >
                  Make a Donation
                </a>
              </li>
              <li>
                <a
                  href="/volunteer"
                  className="text-gray-200 hover:text-yellow-400 transition-colors"
                >
                  Volunteer Opportunities
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-200 hover:text-yellow-400 transition-colors"
                >
                  Get in Touch
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-200 hover:text-yellow-400 transition-colors"
                >
                  Privacy & Safety
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-accent/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-300">
                © 2024 Shield of Athena / Bouclier d'Athéna. All rights
                reserved.
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-2">
                <a
                  href="/privacy"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="/accessibility"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Accessibility
                </a>
                <a
                  href="/contact"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Media Inquiries
                </a>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm font-semibold text-yellow-400 mb-2">
                Confidential. Professional. Trusted.
              </p>
              <p className="text-xs text-gray-300">
                Your safety and privacy are our highest priorities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
