"use client";

import { useRouter } from "@/i18n/navigation";

const DonateButton = () => {
  const router = useRouter();
  const onClick = () => {
    router.push("/donate");
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
