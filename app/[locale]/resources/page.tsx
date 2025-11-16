import React from "react";
import StickyHeader from "@/components/LandingPage/StickyHeader";
import FooterSection from "@/components/LandingPage/FooterSection";

const ResourcesPage = () => {
  return (
    <div className="flex flex-col w-full relative">
      <div className="w-full fixed p-16 z-50">
        <StickyHeader />
      </div>

      {/* Hero Section */}
      <div className="from-primary to-accent bg-linear-to-b text-light-background pt-48 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Are You a Victim?
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Get immediate help and support. You are not alone.
          </p>
          <p className="text-lg text-yellow-400 font-semibold">
            Domestic violence is a crime in Canada. You have the right to live
            violence-free.
          </p>
        </div>
      </div>

      {/* Emergency Numbers Section */}
      <section className="bg-red-700 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            IMPORTANT EMERGENCY NUMBERS
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-red-600 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-yellow-200">
                Immediate Emergency
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-red-500 pb-2">
                  <span className="font-semibold">Police</span>
                  <span className="text-xl font-bold">9-1-1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">
                    S.O.S. Violence conjugale
                  </span>
                  <div className="text-right">
                    <div>514-873-9010</div>
                    <div className="text-sm">1-800-363-9010</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-red-600 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-yellow-200">
                Shield of Athena
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-red-500 pb-2">
                  <span className="font-semibold">Montreal Office</span>
                  <div className="text-right">
                    <div>514-274-8117</div>
                    <div className="text-sm">1-877-274-8117</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Laval Office</span>
                  <span>450-688-6584</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 bg-red-600 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-yellow-200">
                Multilingual Sexual Violence Support
              </h3>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="text-center">
                  <div className="font-semibold">Montreal</div>
                  <div>514-270-2900</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">Laval</div>
                  <div>450-688-2117</div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-sm mt-6 border-t border-red-600 pt-4">
            All calls are confidential and free • Available in multiple
            languages
          </p>
        </div>
      </section>

      {/* Quick Assessment Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">
            Get Help Now - Ask Yourself
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-primary mb-3">
                🚨 Is it an emergency situation?
              </h3>
              <p className="text-foreground mb-4">
                If you're in immediate danger or someone is threatening you
                right now.
              </p>
              <div className="bg-red-50 p-4 rounded border">
                <p className="text-sm font-semibold text-red-700 mb-2">
                  CALL IMMEDIATELY:
                </p>
                <p className="text-lg font-bold text-red-700">9-1-1</p>
                <p className="text-sm text-red-600 mt-2">
                  Police are equipped to deal with violent situations and will
                  not blame you.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold text-primary mb-3">
                🏠 Do you need emergency shelter?
              </h3>
              <p className="text-foreground mb-4">
                Safe housing for you and your children, available up to two
                months.
              </p>
              <div className="bg-yellow-50 p-4 rounded border">
                <p className="text-sm font-semibold text-yellow-700 mb-2">
                  OFFICE HOURS (Mon-Fri, 9am-5pm):
                </p>
                <p className="font-bold text-yellow-700">
                  Montreal: 514-274-8117
                </p>
                <p className="font-bold text-yellow-700">Laval: 450-688-6584</p>
                <p className="text-sm text-yellow-600 mt-2">
                  After hours: Call S.O.S. Violence conjugale at 514-873-9010
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-primary mb-3">
                💬 Do you need someone to talk to?
              </h3>
              <p className="text-foreground mb-4">
                Professional counseling and support groups in multiple
                languages.
              </p>
              <div className="bg-blue-50 p-4 rounded border">
                <p className="text-sm font-semibold text-blue-700 mb-2">
                  COUNSELING AVAILABLE IN:
                </p>
                <p className="text-sm text-blue-600">
                  Arabic • Armenian • English • French • Spanish • Greek •
                  Russian • Farsi • Turkish • Urdu • Italian • Romanian • Hindi
                  • Punjabi • Creole
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-primary mb-3">
                👶 Are your children suffering?
              </h3>
              <p className="text-foreground mb-4">
                Specialized programs and activities to help children affected by
                family violence.
              </p>
              <div className="bg-purple-50 p-4 rounded border">
                <p className="text-sm font-semibold text-purple-700 mb-2">
                  CHILDREN'S SERVICES:
                </p>
                <p className="text-sm text-purple-600">
                  Safe childcare • Educational activities • Trauma counseling •
                  Age-appropriate support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Planning Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">
            Safety Planning Guide
          </h2>
          <p className="text-center text-lg text-foreground mb-8">
            Having a protection plan can help you react quickly and safely in
            dangerous situations.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* If you're no longer with your partner */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-primary mb-4">
                If you are no longer with your partner
              </h3>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  Notify neighbors and landlord that your partner no longer
                  lives with you
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  Change your locks immediately
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  Secure all entry points (windows, doors)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  Get a confidential phone number
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  Meet ex-partner only in public places
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  Arrange neutral locations for child visits
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  Inform school/daycare about authorized pickup persons
                </li>
              </ul>
            </div>

            {/* If you're still with your partner */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-primary mb-4">
                If you are still with your partner
              </h3>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">⚠</span>
                  Plan where to go in an emergency (friend, relative, shelter)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">⚠</span>
                  Create a code word with someone you trust
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">⚠</span>
                  Open a secret bank account
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">⚠</span>
                  Memorize shelter and crisis line numbers
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">⚠</span>
                  Recognize warning signs of escalating violence
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">⚠</span>
                  Never leave without your children
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">⚠</span>
                  Prepare and hide a departure kit
                </li>
              </ul>
            </div>
          </div>

          {/* Departure Kit */}
          <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Emergency Departure Kit
            </h3>
            <p className="text-foreground mb-4">
              Keep these items in a safe place (friend's house, relative's home,
              or secure location):
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-primary mb-2">
                  Legal Documents
                </h4>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Marriage certificate</li>
                  <li>• Birth certificates</li>
                  <li>• Social insurance cards</li>
                  <li>• Medicare cards</li>
                  <li>• Immigration papers</li>
                  <li>• Deeds/lease/mortgage</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Essentials</h4>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Cash</li>
                  <li>• Bank books & credit cards</li>
                  <li>• House & car keys</li>
                  <li>• Medications</li>
                  <li>• Clothing for you & children</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">
                  Personal Items
                </h4>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Important phone numbers</li>
                  <li>• Children's favorite toys</li>
                  <li>• Cherished jewelry/photos</li>
                  <li>• Comfort items</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary text-light-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">You Are Not Alone</h2>
          <p className="text-xl mb-8">
            Professional, multilingual support is available 24/7. Take the first
            step toward safety.
          </p>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <a
              href="tel:911"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-200 text-center block"
            >
              Emergency: Call 9-1-1
            </a>
            <a
              href="tel:5142748117"
              className="bg-yellow-400 hover:bg-yellow-500 text-primary px-6 py-4 rounded-lg font-semibold transition-all duration-200 text-center block"
            >
              Shield of Athena: 514-274-8117
            </a>
          </div>
          <p className="text-sm mt-6 text-accent">
            All services are confidential and available in multiple languages
          </p>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default ResourcesPage;
