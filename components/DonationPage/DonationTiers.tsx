import { DonationType } from "@/lib/types";

interface Props {
  donationType: DonationType;
  tiers: {
    amount: number;
    label: string;
    description: string;
  }[];
  setSelectedAmount: (amount: number) => void;
  selectedAmount: number | null;
}

const DonationTiers = ({
  donationType,
  tiers,
  setSelectedAmount,
  selectedAmount,
}: Props) => {
  return (
    <section className="space-y-4">
      <h3 className="text-2xl font-bold text-center text-primary">
        {donationType === "one-time" ? "One-Time Support" : "Monthly Support"}
      </h3>
      <div className="space-y-3">
        {tiers.map(({ amount, label, description }) => (
          <button
            key={amount}
            onClick={() => setSelectedAmount(amount)}
            className={`group relative w-full p-6 rounded-lg flex justify-between items-center transition-all cursor-pointer ${
              selectedAmount === amount
                ? "border-2 border-primary bg-primary text-white shadow-xl scale-[1.02]"
                : "border-2 border-primary/20 bg-primary/20 hover:border-primary hover:shadow-lg hover:scale-[1.01]"
            }`}
          >
            <span
              className={`text-2xl font-bold ${
                selectedAmount === amount ? "text-yellow-400" : "text-primary"
              }`}
            >
              {label}
            </span>
            <span
              className={`text-right font-medium ${
                selectedAmount === amount ? "text-white" : "text-foreground"
              }`}
            >
              {description}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default DonationTiers;
