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
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [finalDonationAmount, setFinalDonationAmount] = useState(0);
  const [lastDonationAmount, setLastDonationAmount] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState<number | undefined>(undefined);
  const [showCelebration, setShowCelebration] = useState(false);
  const [flowerCompleted, setFlowerCompleted] = useState(false);
  const stateManagerRef = useRef<ReturnType<typeof getCollectiveStateManager> | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize state manager
    stateManagerRef.current = getCollectiveStateManager();
    const state = stateManagerRef.current.getState();
    
    setCurrentStage(state.currentStage);
    setTotalFlowers(state.totalFlowers);
    setDonationCount(state.donations.length);
    setIsStateLoaded(true); // Mark state as loaded

    // Listen for state changes
    const handleStateChange = (newState: any) => {
      setCurrentStage(newState.currentStage);
      setTotalFlowers(newState.totalFlowers);
      setDonationCount(newState.donations.length);
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

  const handlePaymentComplete = (email: string) => {
    if (!stateManagerRef.current) return;

    // Add donation to collective state
    const flowerWasCompleted = stateManagerRef.current.addDonation(finalDonationAmount, email);
    
    // Show celebration if flower completed
    if (flowerWasCompleted) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 4000);
    }

    // Store donation amount and flower completion status for thank you modal
    setLastDonationAmount(finalDonationAmount);
    setFlowerCompleted(flowerWasCompleted);
    
    // Close payment modal and show thank you
    setShowPaymentModal(false);
    setShowThankYou(true);
  };

  return (
    <section id="collective-lotus" className="py-20 px-4 bg-gradient-to-b from-purple-50 via-white to-pink-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Grow Our Collective Lotus 🌸
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-2">
            Every donation helps our community lotus bloom. Watch it grow stage by stage as supporters like you contribute.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
          {/* Lotus Flower Visualization */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full">
              {isStateLoaded ? (
                <LotusFlower 
                  stage={currentStage}
                  showCelebration={showCelebration}
                  showLabel={false}
                  size={500}
                />
              ) : (
                <div className="flex items-center justify-center" style={{ width: '500px', height: '500px' }}>
                  <div className="text-gray-400">Loading lotus...</div>
                </div>
              )}
              
              {/* Stats */}
              <div className="mt-6 text-center space-y-2">
                <div className="text-3xl font-bold text-purple-700">
                  Stage {currentStage} of 10
                </div>
                <div className="text-xl text-gray-600">
                  {totalFlowers} Flower{totalFlowers !== 1 ? 's' : ''} Bloomed
                </div>
                <div className="text-lg text-gray-500">
                  {donationCount} donation{donationCount !== 1 ? 's' : ''} received
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stacked */}
          <div className="space-y-6">
            {/* About the Lotus */}
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
              <h4 className="font-bold text-purple-800 mb-3">
                🌸 About the Lotus
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                The lotus flower is a powerful symbol of resilience and transformation. 
                It grows from mud and darkness, yet rises to bloom with remarkable beauty—just like survivors of domestic violence. 
                Each donation advances our collective lotus one stage closer to full bloom, representing the hope and healing you help create.
              </p>
            </div>

            {/* Donation Panel */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
              <h3 className="text-xl font-bold text-purple-700 mb-4 text-center">
                Make a Donation
              </h3>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[5, 10, 25, 50, 100, 500].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleDonateClick(amount)}
                    className="bg-white hover:bg-purple-600 border border-purple-200 hover:border-purple-600 rounded-lg py-2 px-3 font-semibold text-purple-700 hover:text-white transition-all"
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <button
                onClick={() => handleDonateClick(undefined)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all"
              >
                Custom Amount
              </button>
            </div>

            {/* How It Works */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-3">
                📊 How It Works
              </h4>
              <ul className="text-gray-700 text-sm space-y-2">
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
      />
    </section>
  );
};

export default CollectiveLotusSection;

