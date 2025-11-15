import React from "react";

const CTASection = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Don't wait. Someone needs you tonight.
        </h2>
        <p className="text-xl text-soft-charcoal">
          Your donation provides immediate safety, food, and hope.
        </p>
        <a
          href="/donate"
          className="bg-yellow-400 text-foreground hover:bg-[#f5d785] px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-block text-lg"
        >
          Protect a Woman Tonight
        </a>
        <p className="text-base text-primary font-semibold mt-4 italic">
          People like you protect women.
        </p>
      </div>
    </section>
  );
};

export default CTASection;
