import { ORGANIZATION_STATS } from "@/lib/constants";

const services = [
  {
    icon: "🏠",
    title: "Emergency Shelters",
    desc: "Safe, secure beds available 24/7 for women and children escaping violence.",
  },
  {
    icon: "🍲",
    title: "Warm Meals",
    desc: "Nutritious food provided daily to ensure basic needs are met.",
  },
  {
    icon: "🧠",
    title: "Therapy & Trauma Support",
    desc: "Professional counseling to help heal and rebuild emotional well-being.",
  },
  {
    icon: "⚖️",
    title: "Legal Guidance",
    desc: "Expert legal support to navigate protection orders and custody issues.",
  },
];

const SolutionSection = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary">
          Athena's House: A lifeline for survivors.
        </h2>
        <p className="text-xl text-center text-foreground">
          We provide immediate, comprehensive support when it matters most.
        </p>

        {/* Social Proof Stats */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 py-6">
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-primary">
              {ORGANIZATION_STATS.womenSupported}
            </p>
            <p className="text-foreground/80 font-semibold mt-1">
              Women supported last year
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-primary">
              {ORGANIZATION_STATS.hotlineAvailability}
            </p>
            <p className="text-foreground/80 font-semibold mt-1">
              Emergency hotline available
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-primary">
              {ORGANIZATION_STATS.yearsServing}
            </p>
            <p className="text-foreground/80 font-semibold mt-1">
              Years serving Montréal
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-accent/40"
            >
              <h3 className="text-2xl font-semibold mb-3 text-primary">
                {service.icon} {service.title}
              </h3>
              <p className="text-foreground/80">{service.desc}</p>
            </div>
          ))}
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2 border border-accent/40">
            <h3 className="text-2xl font-semibold mb-3 text-primary">
              🌍 Multilingual Community Outreach
            </h3>
            <p className="text-foreground/80">
              Support in multiple languages to serve Montreal's diverse
              community.
            </p>
          </div>
        </div>

        <div className="text-center pt-8">
          <a
            href="#collective-lotus"
            className="bg-yellow-400 text-foreground hover:bg-[#f5d785] px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-block text-lg"
          >
            Provide a Night of Safety
          </a>
          <p className="text-base text-primary font-semibold mt-4 italic">
            People like you protect women.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
