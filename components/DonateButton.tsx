"use client";

const DonateButton = () => {
  const onClick = () => {
    // Scroll to collective lotus section
    const lotusSection = document.getElementById('collective-lotus');
    if (lotusSection) {
      lotusSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <button
      className="text-lg font-medium bg-accent text-light-background px-6 py-3 rounded-full hover:opacity-90 transition-all cursor-pointer"
      onClick={onClick}
    >
      Donate Now
    </button>
  );
};

export default DonateButton;
