'use client';

import StickyHeader from "@/components/LandingPage/StickyHeader";
import ThankYouHeader from "@/components/ThankYouPage/ThankYouHeader";
import LotusFlower from "@/components/LotusFlower";
import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/lib/constants";

const ThankYouPage = () => {
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [lotusStage, setLotusStage] = useState<number>(0);

  useEffect(() => {
    // Get donation amount from localStorage
    if (typeof window !== 'undefined') {
      const amount = localStorage.getItem(STORAGE_KEYS.donationAmount);
      const parsedAmount = amount ? parseFloat(amount) : 0;
      setDonationAmount(parsedAmount);

      // Map donation amount to lotus stage (0-9)
      // Stage mapping based on donation tiers:
      // $5-$14 = Stage 0-1 (Seed/Germination)
      // $15-$24 = Stage 2-3 (Sprout/Young Shoot)
      // $25-$49 = Stage 4-5 (Stem Development/Early Bud)
      // $50-$99 = Stage 6-7 (Bud Formation/Early Bloom)
      // $100-$249 = Stage 8 (Blooming)
      // $250+ = Stage 9 (Full Bloom)
      let stage = 0;
      if (parsedAmount >= 250) stage = 9;
      else if (parsedAmount >= 100) stage = 8;
      else if (parsedAmount >= 50) stage = 7;
      else if (parsedAmount >= 25) stage = 5;
      else if (parsedAmount >= 15) stage = 3;
      else if (parsedAmount >= 5) stage = 1;
      else stage = 0;

      setLotusStage(stage);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-16 fixed top-8 z-50">
        <StickyHeader showDonation={false} />
      </div>
      
      <main className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Thank You Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
              Thank You! 🌸
            </h1>
            <p className="text-xl text-accent mb-2">
              Your generous donation of ${donationAmount} makes a real difference
            </p>
            <p className="text-lg text-gray-600">
              Together, we're helping survivors find their strength and rebuild their lives
            </p>
          </div>

          {/* Lotus Flower Visualization */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-primary mb-3">
                Your Lotus Flower
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                The lotus flower symbolizes resilience and growth—rising from mud and darkness 
                into light and beauty. Just like survivors of domestic violence, it represents 
                strength, transformation, and the power to bloom again.
              </p>
            </div>
            
            <div className="flex justify-center">
              <LotusFlower 
                stage={lotusStage} 
                showCelebration={true}
                showLabel={true}
                size={500}
              />
            </div>
          </div>

          {/* Impact Message */}
          <div className="bg-light-background border-2 border-dark-background rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-primary mb-4 text-center">
              Your Impact
            </h3>
            <div className="space-y-4 text-gray-700">
              <p>
                Your contribution helps Shield of Athena provide:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Safe shelter and emergency housing for women and children fleeing violence</li>
                <li>24/7 crisis support and counseling services</li>
                <li>Legal advocacy and court accompaniment</li>
                <li>Children's programs and trauma-informed care</li>
                <li>Education and employment support for rebuilding lives</li>
              </ul>
              <p className="mt-4 font-semibold text-primary">
                Every donation, no matter the size, helps someone bloom again.
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">
              What's Next?
            </h3>
            <p className="text-gray-700 mb-6">
              A receipt has been sent to your email. You can share your support or learn more 
              about our work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/" 
                className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-accent transition-colors"
              >
                Return Home
              </a>
              <a 
                href="/about" 
                className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThankYouPage;
