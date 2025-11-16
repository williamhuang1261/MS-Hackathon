import React from "react";
import StickyHeader from "@/components/LandingPage/StickyHeader";
import FooterSection from "@/components/LandingPage/FooterSection";

const ContactPage = () => {
  return (
    <div className="flex flex-col w-full relative">
      <div className="w-full fixed p-16 z-50">
        <StickyHeader />
      </div>

      {/* Hero Section */}
      <div className="bg-primary text-light-background pt-48 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl mb-8">
            We're here to help. Reach out for support, information, or to get
            involved.
          </p>
          <p className="text-lg text-yellow-400 font-semibold">
            All communications are confidential and secure.
          </p>
        </div>
      </div>

      {/* Emergency Notice */}
      <section className="bg-red-700 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            🚨 IN CRISIS? GET IMMEDIATE HELP
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="text-center">
              <p className="font-semibold">Emergency</p>
              <p className="text-2xl font-bold">9-1-1</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">24/7 Crisis Line</p>
              <p className="text-xl font-bold">514-873-9010</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">Shield of Athena</p>
              <p className="text-xl font-bold">514-274-8117</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-primary mb-8">
                  Get In Touch
                </h2>
                <p className="text-lg text-foreground mb-6">
                  Shield of Athena provides multilingual support services to
                  victims of domestic violence. Contact us for confidential
                  assistance, information about our programs, or to learn how
                  you can help.
                </p>
              </div>

              {/* Office Locations */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary">
                  <h3 className="text-xl font-bold text-primary mb-4">
                    Montreal Office
                  </h3>
                  <div className="space-y-2 text-foreground">
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-semibold">📍</span>
                      <span>
                        123 Sanctuary Street
                        <br />
                        Montréal, QC H2X 1Y5
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-semibold">📞</span>
                      <div>
                        <div>514-274-8117</div>
                        <div className="text-sm text-gray-600">
                          Toll-free: 1-877-274-8117
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-semibold">🕒</span>
                      <span>Monday - Friday, 9:00 AM - 5:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-accent">
                  <h3 className="text-xl font-bold text-primary mb-4">
                    Laval Office
                  </h3>
                  <div className="space-y-2 text-foreground">
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-semibold">📍</span>
                      <span>
                        456 Support Avenue
                        <br />
                        Laval, QC H7X 2Y3
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-semibold">📞</span>
                      <span>450-688-6584</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-semibold">🕒</span>
                      <span>Monday - Friday, 9:00 AM - 5:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Digital Contact */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-primary mb-4">
                  Digital Contact
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-semibold">✉️</span>
                    <div>
                      <p className="font-semibold">General Information</p>
                      <p className="text-foreground">
                        bouclierdathena@bellnet.ca
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-semibold">📧</span>
                    <div>
                      <p className="font-semibold">Donations & Fundraising</p>
                      <p className="text-foreground">
                        donations@shieldofathena.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-semibold">📰</span>
                    <div>
                      <p className="font-semibold">Media Inquiries</p>
                      <p className="text-foreground">
                        media@shieldofathena.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h3 className="text-xl font-bold text-primary mb-4">
                  Languages We Speak
                </h3>
                <p className="text-foreground mb-3">
                  Our multilingual staff provides services in the following
                  languages:
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm text-foreground">
                  <div>• Arabic (العربية)</div>
                  <div>• Armenian (Հայերեն)</div>
                  <div>• Creole</div>
                  <div>• English</div>
                  <div>• Farsi (فارسی)</div>
                  <div>• French (Français)</div>
                  <div>• Greek (Ελληνικά)</div>
                  <div>• Hindi (हिंदी)</div>
                  <div>• Italian (Italiano)</div>
                  <div>• Polish (Polski)</div>
                  <div>• Punjabi (ਪੰਜਾਬੀ)</div>
                  <div>• Romanian (Română)</div>
                  <div>• Russian (Русский)</div>
                  <div>• Spanish (Español)</div>
                  <div>• Turkish (Türkçe)</div>
                  <div>• Urdu (اردو)</div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-primary mb-6">
                Send Us a Message
              </h2>
              <p className="text-foreground mb-6">
                Fill out the form below and we'll get back to you as soon as
                possible. All information is kept strictly confidential.
              </p>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold text-primary mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold text-primary mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-primary mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-primary mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiryType"
                    className="block text-sm font-semibold text-primary mb-2"
                  >
                    Type of Inquiry *
                  </label>
                  <select
                    id="inquiryType"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="">Select an option...</option>
                    <option value="support">Need Support Services</option>
                    <option value="information">General Information</option>
                    <option value="volunteer">Volunteer Opportunities</option>
                    <option value="donation">Donation Information</option>
                    <option value="media">Media Inquiry</option>
                    <option value="partnership">
                      Partnership/Collaboration
                    </option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="language"
                    className="block text-sm font-semibold text-primary mb-2"
                  >
                    Preferred Language for Response
                  </label>
                  <select
                    id="language"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="english">English</option>
                    <option value="french">Français</option>
                    <option value="spanish">Español</option>
                    <option value="arabic">العربية</option>
                    <option value="greek">Ελληνικά</option>
                    <option value="other">Other (specify in message)</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-primary mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Please describe how we can help you..."
                    required
                  ></textarea>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="privacy"
                      className="mt-1"
                      required
                    />
                    <label htmlFor="privacy" className="text-sm text-blue-700">
                      I understand that all information provided will be kept
                      strictly confidential and used only to respond to my
                      inquiry. I consent to being contacted by Shield of Athena
                      regarding my message. *
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-light-background px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200"
                >
                  Send Message
                </button>

                <p className="text-sm text-gray-600 text-center">
                  * Required fields | Response time: 24-48 hours during business
                  days
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">
            Other Ways to Connect
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold text-primary mb-4">
                Visit Our Offices
              </h3>
              <p className="text-foreground mb-4">
                Walk-ins welcome during business hours. No appointment necessary
                for crisis support.
              </p>
              <p className="text-sm text-gray-600">
                Montreal & Laval locations available
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold text-primary mb-4">
                24/7 Support Lines
              </h3>
              <p className="text-foreground mb-4">
                Crisis support available around the clock through our partner
                organizations.
              </p>
              <p className="text-sm text-gray-600">
                Multilingual support available
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold text-primary mb-4">
                Community Events
              </h3>
              <p className="text-foreground mb-4">
                Meet our team at community outreach events and information
                sessions.
              </p>
              <p className="text-sm text-gray-600">
                Check our calendar for upcoming events
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary text-light-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Help or Get Involved?
          </h2>
          <p className="text-xl mb-8">
            Don't wait. Reach out today for confidential support or to learn how
            you can make a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:5142748117"
              className="bg-yellow-400 hover:bg-yellow-500 text-primary px-8 py-4 rounded-lg font-semibold transition-all duration-200"
            >
              Call Now: 514-274-8117
            </a>
            <a
              href="/resources"
              className="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-primary px-8 py-4 rounded-lg font-semibold transition-all duration-200"
            >
              Emergency Resources
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default ContactPage;
