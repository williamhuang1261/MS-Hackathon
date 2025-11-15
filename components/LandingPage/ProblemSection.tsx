import React from "react";

const cards = [
  {
    emoji: "😰",
    title: "No Safety",
    description: "Living in constant fear of violence",
  },
  {
    emoji: "🚫",
    title: "Nowhere to Go",
    description: "Trapped with no emergency shelter",
  },
  {
    emoji: "💔",
    title: "No Support",
    description: "Isolated and without resources",
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
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {cards.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md border border-dark-background/50"
            >
              <p className="text-6xl mb-4 text-warm-blush">{item.emoji}</p>
              <p className="text-xl font-semibold mb-2 text-primary">
                {item.title}
              </p>
              <p className="text-soft-charcoal/80">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center pt-8">
          <p className="text-xl text-soft-charcoal mb-6">
            Many have nowhere to go. No safety. No food. No support.
          </p>
          <a
            href="#collective-lotus"
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
