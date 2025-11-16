import Image from 'next/image'
import React from "react";
import image1 from "@/public/image1_home.png";
import image2 from "@/public/image2_home.png";
import image3 from "@/public/image3_home.png";

const cards = [
  {
    imageSrc: "/image1_home.png",
    alt: "No Safety",
    title: "No Safety",
    description: "Living in constant fear of violence in unsafe environments",
  },
  {
    imageSrc: "/image2_home.png",
    alt: "Nowhere to Go",
    title: "Nowhere to Go",
    description: "Trapped and at risk of violence at any given moment",
  },
  {
    imageSrc: "/image3_home.png",
    alt: "No Support",
    title: "No Support",
    description: "Isolated and without resources to help them escape violence",
  },
];

const ProblemSection = () => {
  return (
    // Problem Section
    <section className="py-16 px-4 bg-snow-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-primary">
          Tonight, hundreds of women and children in Montréal will sleep in
          fear.
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((item, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md border border-dark-background/50 overflow-hidden"
            >
              <div className="relative h-56 md:h-64">
                <Image
                  src={item.imageSrc}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-end">
                  <div className="w-full p-4">
                    <p className="text-white font-bold text-lg md:text-xl">
                      {item.title}
                    </p>
                    <p className="text-white/90 text-sm md:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center pt-8">
          <p className="text-xl text-soft-charcoal mb-6">
            Many have nowhere to go. No safety. No food. No support.
          </p>
          <a
            href="/donate"
            className="bg-yellow-400 text-soft-charcoal hover:bg-[#f5d785] px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-block"
          >
            Help Them Right Now
          </a>
          <p className="text-base text-primary font-semibold mt-4 italic">
            You're the kind of person who doesn't look away.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
