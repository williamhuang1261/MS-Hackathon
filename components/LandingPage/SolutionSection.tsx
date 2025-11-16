import { ORGANIZATION_STATS } from "@/lib/constants";
import Image from "next/image";
import shelter_home from "@/public/Shelter_home.png";
import meal_home from "@/public/meals_home.png";
import therapy_home from "@/public/therapy_home.png";
import legal_home from "@/public/legal_home.png";
import multisupport_home from "@/public/multisupport_home.png";

const services = [
  {
    imageSrc: shelter_home,
    alt: "Emergency Shelters",
    title: "Emergency Shelters",
    desc: "Safe, secure beds available 24/7 for women and children escaping violence.",
  },
  {
    imageSrc: meal_home,
    alt: "Warm Meals",
    title: "Warm Meals",
    desc: "Nutritious food provided daily to ensure basic needs are met.",
  },
  {
    imageSrc: therapy_home,
    alt: "Therapy & Trauma Support",
    title: "Therapy & Trauma Support",
    desc: "Professional counseling to help heal and rebuild emotional well-being.",
  },
  {
    imageSrc: legal_home,
    alt: "Legal Guidance",
    title: "Legal Guidance",
    desc: "Expert legal support to navigate protection orders and custody issues.",
  },
  {
    imageSrc: multisupport_home,
    alt: "Multilingual Community Outreach",
    title: "Multilingual Community Outreach",
    desc: "Support in multiple languages to serve Montreal's diverse community.",
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
              className={`rounded-lg shadow-md border border-accent/40 overflow-hidden ${
                index === services.length - 1 ? 'md:col-span-2 max-w-3xl mx-auto w-full' : ''
              }`}
            >
              <div className={`relative ${index === services.length - 1 ? 'h-64 md:h-72' : 'h-56 md:h-64'}`}>
                <Image
                  src={service.imageSrc}
                  alt={service.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-end">
                  <div className="w-full p-4">
                    <h3 className="text-white font-bold text-xl md:text-2xl">
                      {service.title}
                    </h3>
                    <p className="text-white/90 text-sm md:text-base">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
 
        </div>

        <div className="text-center pt-8">
          <a
            href="/donate"
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
