import Certificate from "@/components/Certificate";
import StickyHeader from "@/components/LandingPage/StickyHeader";
import ThankYouHeader from "@/components/ThankYouPage/ThankYouHeader";
import YourImpactSection from "@/components/ThankYouPage/YourImpactSection";
import { Button } from "@/components/ui/button";
import type { CertificateTier } from "@/lib/donation-utils";
import { cn } from "@/lib/utils";
import Link from "next/link";

const featuredCertificate: {
  donorName: string;
  amount: number;
  impactDescription: string;
  tier: CertificateTier;
} = {
  donorName: "Shield of Athena Champion",
  amount: 250,
  impactDescription:
    "two weeks of safe shelter, trauma-informed counselling, and legal advocacy for a family",
  tier: "safety-champion",
};

const gratitudeHighlights = [
  { label: "Emergency shelter nights", value: "14" },
  { label: "Counselling sessions", value: "4" },
  { label: "Groceries & meals", value: "35" },
  { label: "Legal advocacy hours", value: "3" },
];

const ImpactProgress = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-full rounded-3xl bg-primary p-10 text-light-background shadow-2xl space-y-8",
        className
      )}
    >
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.25em] text-yellow-200/80">
          Campaign progress
        </p>
        <div className="flex flex-wrap items-end gap-3">
          <h2 className="text-5xl font-serif">$14,762</h2>
          <span className="text-yellow-300 font-semibold text-xl">+ $100 today</span>
          <span className="text-lg text-light-background/80">/ $50,000 goal</span>
        </div>
      </div>

      <p className="text-lg text-light-background/90">
        Every certificate fuels wraparound care for women and children rebuilding their
        safety. Thank you for moving us closer to fully funding the shelter.
      </p>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm uppercase tracking-wide text-light-background/70">
            Families sheltered
          </p>
          <p className="text-3xl font-serif">127</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-wide text-light-background/70">
            Counselling sessions
          </p>
          <p className="text-3xl font-serif">342</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-wide text-light-background/70">
            Legal clinics funded
          </p>
          <p className="text-3xl font-serif">48</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-wide text-light-background/70">
            Meals served
          </p>
          <p className="text-3xl font-serif">4,900</p>
        </div>
      </div>
    </div>
  );
};

const GratitudeCard = () => {
  return (
    <div className="relative overflow-hidden rounded-[40px] border border-border/40 bg-gradient-to-br from-primary/5 via-background to-amber-50/40 p-8 sm:p-10 shadow-2xl">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6), transparent 40%), radial-gradient(circle at 80% 0%, rgba(253,230,138,0.5), transparent 45%), radial-gradient(circle at 80% 80%, rgba(192,132,252,0.3), transparent 50%)",
        }}
      />
      <div className="relative space-y-8">
        <ThankYouHeader
          align="left"
          compact
          title={`THANK YOU ${featuredCertificate.donorName.toUpperCase()}!`}
        />
        <p className="text-lg text-muted-foreground max-w-2xl">
          Your generosity gives women and children immediate safety, culturally aware
          counselling, and long-term support. Here&apos;s a glimpse of what your gift is
          making possible today.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {gratitudeHighlights.map((highlight) => (
            <div
              key={highlight.label}
              className="rounded-2xl border border-white/60 bg-white/40 px-5 py-4 backdrop-blur-sm"
            >
              <p className="text-sm uppercase tracking-wide text-primary/80">
                {highlight.label}
              </p>
              <p className="text-3xl font-serif text-primary">{highlight.value}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-xl">
            <YourImpactSection />
          </div>
          <ImpactProgress className="shadow-xl" />
        </div>
        <div className="pt-4 text-center">
          <Button asChild size="lg" className="rounded-full px-10">
            <Link href="../">Return to homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const CertificateSpotlight = () => {
  return (
    <div className="w-full rounded-[40px] border border-border/40 bg-card/60 backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
      <div className="text-center space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
          Your keepsake
        </p>
        <h2 className="text-3xl font-serif">Download & share your certificate</h2>
        <p className="text-muted-foreground">
          Show friends and family the concrete impact your generosity is unlocking
          across Montreal.
        </p>
      </div>
      <div className="mt-6">
        <Certificate
          donorName={featuredCertificate.donorName}
          amount={featuredCertificate.amount}
          impactDescription={featuredCertificate.impactDescription}
          tier={featuredCertificate.tier}
          variant="inline"
        />
      </div>
    </div>
  );
};

const ThankYouPage = () => {
  return (
    <div className="bg-background min-h-screen">
      <div className="w-full px-4 md:px-12 lg:px-16 pt-8">
        <StickyHeader />
      </div>
      <main className="px-4 md:px-12 lg:px-16 pb-16">
        <div className="grid gap-10 xl:grid-cols-2">
          <GratitudeCard />
          <CertificateSpotlight />
        </div>
      </main>
    </div>
  );
};

export default ThankYouPage;
