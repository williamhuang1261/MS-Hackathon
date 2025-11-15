const donationTiers = [
  {
    amount: "$35",
    title: "One Safe Night",
    desc: "A warm bed in a secure shelter",
  },
  {
    amount: "$50",
    title: "Therapy Starter Session",
    desc: "Begin the healing journey",
  },
  {
    amount: "$100",
    title: "Support for a Family",
    desc: "Full day for mother & child",
  },
];

const ProductSection = () => {
  return (
    <section
      style={{
        background: "linear-gradient(160deg, #4B1F66 0%, #C6B1E7 100%)",
      }}
      className="py-16 px-4 text-white"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-background">
          Your donation creates a night of safety.
        </h2>
        <p className="text-xl text-center mb-8 text-warm-white">
          Every dollar directly supports a woman in need.
        </p>

        {/* Impact Badge */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-md border-2 border-yellow-500 rounded-lg px-6 py-4 shadow-lg max-w-2xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🟣</span>
              <span className="font-bold text-yellow-500 text-lg">
                80% of funds go directly to programs
              </span>
              <span className="text-hope-green text-xl">✓</span>
            </div>
            <p className="text-sm text-warm-white text-center">
              The other 20% powers operations (staff, facilities, hotline)
            </p>
          </div>
        </div>

        {/* Donation Tiers */}
        <div className="grid md:grid-cols-3 gap-6">
          {donationTiers.map((tier, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center border-2 border-white/20 hover:border-yellow-500/60 transition-all"
            >
              <p className="text-5xl font-bold mb-4 text-yellow-500">
                {tier.amount}
              </p>
              <p className="text-xl font-semibold mb-2 text-background">
                {tier.title}
              </p>
              <p className="text-warm-white">{tier.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#collective-lotus"
            className="bg-yellow-500 text-soft-charcoal hover:bg-[#f5d785] px-8 py-4 rounded-lg text-lg font-bold transition-all duration-200 inline-block"
          >
            Make Your Impact Today
          </a>
          <p className="text-base text-yellow-500 font-semibold mt-4 italic">
            You're the kind of person who doesn't look away.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
