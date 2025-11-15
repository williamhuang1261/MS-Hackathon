'use client';

import { useState, useEffect, useRef } from 'react';
import LotusFlower from '@/components/LotusFlower';
import DonationModal from './DonationModal';
import PaymentModal from './PaymentModal';
import ThankYouModal from './ThankYouModal';
import { getCollectiveStateManager } from '@/lib/lotus/collective-state';

const CollectiveLotusSection = () => {
  const [isStateLoaded, setIsStateLoaded] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [totalFlowers, setTotalFlowers] = useState(0);
  const [donationCount, setDonationCount] = useState(0);
  const [totalDonationAmount, setTotalDonationAmount] = useState(0);
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [finalDonationAmount, setFinalDonationAmount] = useState(0);
  const [lastDonationAmount, setLastDonationAmount] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState<number | undefined>(undefined);
  const [showCelebration, setShowCelebration] = useState(false);
  const [flowerCompleted, setFlowerCompleted] = useState(false);
  const [isMonthlyDonation, setIsMonthlyDonation] = useState(false);
  const stateManagerRef = useRef<ReturnType<typeof getCollectiveStateManager> | null>(null);

  // Calculate impact stats
  const impactStats = {
    meals: Math.floor(totalDonationAmount / 15), // $15 per meal
    therapySessions: Math.floor(totalDonationAmount / 50), // $50 per session
    shelterNights: Math.floor(totalDonationAmount / 35), // $35 per night
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize state manager
    stateManagerRef.current = getCollectiveStateManager();
    const state = stateManagerRef.current.getState();
    
    setCurrentStage(state.currentStage);
    setTotalFlowers(state.totalFlowers);
    setDonationCount(state.donations.length);
    
    // Calculate total donation amount
    const total = state.donations.reduce((sum: number, donation: any) => sum + donation.amount, 0);
    setTotalDonationAmount(total);
    
    setIsStateLoaded(true); // Mark state as loaded

    // Listen for state changes
    const handleStateChange = (newState: any) => {
      setCurrentStage(newState.currentStage);
      setTotalFlowers(newState.totalFlowers);
      setDonationCount(newState.donations.length);
      
      // Recalculate total
      const newTotal = newState.donations.reduce((sum: number, donation: any) => sum + donation.amount, 0);
      setTotalDonationAmount(newTotal);
    };

    stateManagerRef.current.addListener(handleStateChange);

    return () => {
      if (stateManagerRef.current) {
        stateManagerRef.current.removeListener(handleStateChange);
      }
    };
  }, []);

  const handleDonateClick = (amount?: number) => {
    setSelectedAmount(amount);
    setShowUpsellModal(true);
  };

  const handleProceedToPayment = (finalAmount: number) => {
    setFinalDonationAmount(finalAmount);
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = (email: string, isMonthly: boolean) => {
    if (!stateManagerRef.current) return;

    // Add donation to collective state
    const flowerWasCompleted = stateManagerRef.current.addDonation(finalDonationAmount, email);
    
    // Show celebration if flower completed
    if (flowerWasCompleted) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 4000);
    }

    // Store donation amount, flower completion status, and monthly flag for thank you modal
    setLastDonationAmount(finalDonationAmount);
    setFlowerCompleted(flowerWasCompleted);
    setIsMonthlyDonation(isMonthly);
    
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
            Every donation helps our community lotus bloom. Watch it grow stage by stage as supporters like you contribute.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-12">
          {/* Lotus Flower Visualization */}
          <div className="flex flex-col items-center h-full order-2 md:order-1">
            <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-8 w-full max-w-md md:max-w-none">
              {isStateLoaded ? (
                <LotusFlower 
                  stage={currentStage}
                  showCelebration={showCelebration}
                  showLabel={false}
                  size={500}
                />
              ) : (
                <div className="flex items-center justify-center aspect-square">
                  <div className="text-gray-400">Loading lotus...</div>
                </div>
              )}
              
              {/* Stats */}
              <div className="mt-4 md:mt-6 text-center space-y-2 md:space-y-3">
                <div className="text-2xl md:text-3xl font-bold text-purple-700">
                  Stage {currentStage} of 10
                </div>
                <div className="text-lg md:text-xl text-gray-600">
                  {totalFlowers} Flower{totalFlowers !== 1 ? 's' : ''} Bloomed
                </div>
                
                {/* Impact Stats */}
                <div className="pt-2 md:pt-3 border-t-2 border-purple-100">
                  <div className="text-xs md:text-sm font-semibold text-gray-700 mb-2">Collective Impact</div>
                  <div className="grid grid-cols-3 gap-1 md:gap-2 text-center">
                    <div className="bg-purple-50 rounded-lg p-1.5 md:p-2">
                      <div className="text-base md:text-lg font-bold text-purple-700">{impactStats.meals}</div>
                      <div className="text-[10px] md:text-xs text-gray-600">Meals</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-1.5 md:p-2">
                      <div className="text-base md:text-lg font-bold text-purple-700">{impactStats.therapySessions}</div>
                      <div className="text-[10px] md:text-xs text-gray-600">Sessions</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-1.5 md:p-2">
                      <div className="text-base md:text-lg font-bold text-purple-700">{impactStats.shelterNights}</div>
                      <div className="text-[10px] md:text-xs text-gray-600">Nights</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stacked */}
          <div className="space-y-4 md:space-y-6 flex flex-col order-1 md:order-2">
            {/* About the Lotus */}
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 md:p-6">
              <h4 className="font-bold text-purple-800 mb-2 md:mb-3 text-sm md:text-base">
                🌸 About the Lotus
              </h4>
              <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                The lotus flower is a powerful symbol of resilience and transformation. 
                It grows from mud and darkness, yet rises to bloom with remarkable beauty—just like survivors of domestic violence. 
                Each donation advances our collective lotus one stage closer to full bloom, representing the hope and healing you help create.
              </p>
            </div>

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
                  <span><strong>10 stages</strong> from seed to full bloom</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>Each donation</strong> advances 1 stage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>One collective lotus</strong> for everyone</span>
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
        newStage={currentStage}
        flowerCompleted={flowerCompleted}
        isMonthly={isMonthlyDonation}
      />
    </section>
  );
};

export default CollectiveLotusSection;

