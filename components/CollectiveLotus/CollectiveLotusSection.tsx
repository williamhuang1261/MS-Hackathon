'use client';

import { useState } from 'react';
import LotusProgressTracker from './LotusProgressTracker';
import DonationModal from './DonationModal';
import PaymentModal from './PaymentModal';
import ThankYouModal from './ThankYouModal';

const CollectiveLotusSection = () => {
  // Internal state - starts at $0 when app loads
  const [totalDonationAmount, setTotalDonationAmount] = useState(0);
  const [donationCount, setDonationCount] = useState(0);
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [finalDonationAmount, setFinalDonationAmount] = useState(0);
  const [lastDonationAmount, setLastDonationAmount] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState<number | undefined>(undefined);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isMonthlyDonation, setIsMonthlyDonation] = useState(false);

  // Calculate impact stats
  const impactStats = {
    meals: Math.floor(totalDonationAmount / 15), // $15 per meal
    therapySessions: Math.floor(totalDonationAmount / 50), // $50 per session
    shelterNights: Math.floor(totalDonationAmount / 35), // $35 per night
  };

  const handleDonateClick = (amount?: number) => {
    setSelectedAmount(amount);
    setShowUpsellModal(true);
  };

  const handleProceedToPayment = (finalAmount: number) => {
    setFinalDonationAmount(finalAmount);
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = (email: string, isMonthly: boolean) => {
    // Add donation to internal total
    const newTotal = totalDonationAmount + finalDonationAmount;
    setTotalDonationAmount(newTotal);
    setDonationCount(donationCount + 1);
    
    // Check if we hit a milestone (every $10k or reaching $100k)
    const oldMilestone = Math.floor(totalDonationAmount / 10000);
    const newMilestone = Math.floor(newTotal / 10000);
    const hitMilestone = newMilestone > oldMilestone || newTotal >= 100000;
    
    // Show celebration if hit milestone
    if (hitMilestone) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 4000);
    }

    // Store donation info for thank you modal
    setLastDonationAmount(finalDonationAmount);
    setIsMonthlyDonation(isMonthly);
    
    console.log('Donation added! New total:', newTotal, 'Milestone hit:', hitMilestone);
    
    // Close payment modal and show thank you
    setShowPaymentModal(false);
    setShowThankYou(true);
  };

  return (
    <section id="collective-lotus" className="py-10 md:py-20 px-4 bg-gradient-to-b from-purple-50 via-white to-pink-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 md:mb-4">
            Grow Our Collective Lotus 🌸
          </h2>
          <p className="text-base md:text-xl text-gray-700 max-w-3xl mx-auto mb-2 px-4">
            Every donation helps our community lotus bloom. Watch it grow as we reach $100,000 together.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-12">
          {/* Lotus Progress Tracker - Exportable Component */}
          <div className="flex flex-col items-center order-2 lg:order-1">
            <LotusProgressTracker 
              totalAmount={totalDonationAmount}
              showCelebration={showCelebration}
            />
          </div>

          {/* Right Column - Donation Actions */}
          <div className="space-y-4 md:space-y-6 flex flex-col order-1 lg:order-2">

            {/* Donation Panel */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-purple-100">
              <h3 className="text-lg md:text-xl font-bold text-purple-700 mb-3 md:mb-4 text-center">
                Make a Donation
              </h3>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-3 gap-1.5 md:gap-2 mb-3 md:mb-4">
                {[5, 10, 25, 50, 100, 500].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleDonateClick(amount)}
                    className="bg-white hover:bg-purple-600 border border-purple-200 hover:border-purple-600 rounded-md md:rounded-lg py-2 md:py-2.5 px-2 md:px-3 font-semibold text-sm md:text-base text-purple-700 hover:text-white transition-all min-h-[44px]"
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <button
                onClick={() => handleDonateClick(undefined)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 md:py-3.5 rounded-lg transition-all text-sm md:text-base min-h-[44px]"
              >
                Custom Amount
              </button>
            </div>

            {/* Social Proof */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-3 md:p-4">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-9 h-9 md:w-10 md:h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  S
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-semibold text-gray-800">
                    Sarah M. just donated <span className="text-green-600 font-bold">$50</span>
                  </p>
                  <p className="text-[10px] md:text-xs text-gray-500">2 minutes ago</p>
                </div>
                <div className="text-xl md:text-2xl flex-shrink-0">🌸</div>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 md:p-6">
              <h4 className="font-bold text-gray-800 mb-2 md:mb-3 text-sm md:text-base">
                📊 How It Works
              </h4>
              <ul className="text-gray-700 text-xs md:text-sm space-y-1.5 md:space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>$100,000 goal</strong> grows the lotus from seed to full bloom</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>12 milestone stages</strong> along the journey</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>Every contribution</strong> brings us closer to full bloom</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>Watch progress</strong> on the timeline in real-time</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Upsell Modal */}
      <DonationModal
        isOpen={showUpsellModal}
        onClose={() => setShowUpsellModal(false)}
        preselectedAmount={selectedAmount}
        onProceedToPayment={handleProceedToPayment}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={finalDonationAmount}
        onPaymentComplete={handlePaymentComplete}
      />

      {/* Thank You Modal */}
      <ThankYouModal
        isOpen={showThankYou}
        onClose={() => setShowThankYou(false)}
        amount={lastDonationAmount}
        newStage={Math.floor(totalDonationAmount / 10000)}
        flowerCompleted={totalDonationAmount >= 100000}
        isMonthly={isMonthlyDonation}
      />
    </section>
  );
};

export default CollectiveLotusSection;

