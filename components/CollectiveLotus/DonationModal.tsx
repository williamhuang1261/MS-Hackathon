'use client';

import { useState, useEffect } from 'react';
import Backdrop from '@/components/Modal/Backdrop';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedAmount?: number;
  onProceedToPayment: (finalAmount: number) => void;
}

const DonationModal = ({ 
  isOpen, 
  onClose, 
  preselectedAmount,
  onProceedToPayment 
}: DonationModalProps) => {
  const [amount, setAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [showUpsell, setShowUpsell] = useState(false);
  const [upsellAmount, setUpsellAmount] = useState<number | null>(null);

  // Update amount when modal opens with preselected amount
  useEffect(() => {
    if (isOpen) {
      if (preselectedAmount) {
        setAmount(preselectedAmount);
        setShowUpsell(true); // Show upsell immediately for preselected amounts
      } else {
        setAmount(0);
        setCustomAmount('');
        setShowUpsell(false); // Show custom input for undefined amounts
      }
      setUpsellAmount(null);
    }
  }, [isOpen, preselectedAmount]);

  if (!isOpen) return null;

  const handleCustomAmountSubmit = () => {
    const parsedAmount = parseFloat(customAmount);
    if (parsedAmount && parsedAmount > 0) {
      setAmount(parsedAmount);
      setShowUpsell(true);
    }
  };

  const handleCompleteWithUpsell = () => {
    const finalAmount = upsellAmount ? amount + upsellAmount : amount;
    onProceedToPayment(finalAmount);
    onClose();
  };

  const handleSkipUpsell = () => {
    onProceedToPayment(amount);
    onClose();
  };

  return (
    <Backdrop onClick={onClose}>
      <div
        className="rounded-xl md:rounded-2xl shadow-2xl max-w-md w-full bg-white p-6 md:p-8 relative mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          ×
        </button>

        {/* Custom Amount Input - Show when no preselected amount */}
        {!showUpsell && (
          <div className="space-y-4 md:space-y-6">
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-3">💜</div>
              <h2 className="text-xl md:text-2xl font-bold text-purple-700 mb-3 md:mb-4">
                Enter Your Donation Amount
              </h2>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                Every dollar makes a difference
              </p>
            </div>

            <div>
              <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
                Donation Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-xl md:text-2xl text-gray-500">$</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleCustomAmountSubmit();
                    }
                  }}
                  placeholder="0.00"
                  className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 text-xl md:text-2xl border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  min="1"
                  step="0.01"
                  autoFocus
                />
              </div>
            </div>

            <button
              onClick={handleCustomAmountSubmit}
              disabled={!customAmount || parseFloat(customAmount) <= 0}
              className={`w-full font-bold py-3 md:py-4 rounded-lg text-base md:text-lg transition-all min-h-[44px] ${
                customAmount && parseFloat(customAmount) > 0
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        )}

        {/* Upsell Section - Show after amount is set */}
        {showUpsell && (
          <div className="space-y-4 md:space-y-6">
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-3">💜</div>
              <h2 className="text-xl md:text-2xl font-bold text-purple-700 mb-2">
                Amazing Choice!
              </h2>
              <p className="text-base md:text-lg text-gray-700 mb-1">
                Your <span className="font-bold text-purple-700">${amount}</span> donation will help grow our collective lotus
              </p>
              <p className="text-sm md:text-base text-gray-600">
                Want to make an even bigger impact?
              </p>
            </div>

            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 md:p-6">
              <h3 className="font-bold text-purple-800 mb-3 md:mb-4 text-center text-sm md:text-base">
                Add a little more?
              </h3>
              
              <div className="space-y-2 md:space-y-3">
                {[
                  { amount: 5, impact: "Provides a warm meal" },
                  { amount: 10, impact: "Supplies toiletries & essentials" },
                  { amount: 25, impact: "Covers one therapy session" },
                  { amount: 50, impact: "Provides a safe night's shelter" }
                ].map(({ amount: addAmount, impact }) => (
                  <button
                    key={addAmount}
                    onClick={() => setUpsellAmount(addAmount)}
                    className={`w-full p-3 md:p-4 rounded-lg border-2 transition-all text-left min-h-[60px] md:min-h-auto ${
                      upsellAmount === addAmount
                        ? 'border-purple-500 bg-white shadow-md'
                        : 'border-purple-200 hover:border-purple-400 bg-purple-50/50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-purple-700 text-sm md:text-lg">
                        Add ${addAmount}
                      </span>
                      <span className="text-xs md:text-sm font-semibold text-gray-600 bg-purple-100 px-1.5 md:px-2 py-0.5 md:py-1 rounded whitespace-nowrap">
                        Total: ${amount + addAmount}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">
                      {impact}
                    </p>
                  </button>
                ))}
              </div>
            </div>

          <div className="space-y-2 md:space-y-3">
            <button
              onClick={handleCompleteWithUpsell}
              disabled={!upsellAmount}
              className={`w-full font-bold py-3 md:py-4 rounded-lg text-base md:text-lg transition-all min-h-[44px] ${
                upsellAmount
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {upsellAmount 
                ? `Continue with $${amount + upsellAmount}`
                : 'Select an amount above'}
            </button>

            <button
              onClick={handleSkipUpsell}
              className="w-full text-gray-500 hover:text-purple-700 underline text-xs md:text-sm transition-colors min-h-[44px] py-2"
            >
              No thanks, continue with ${amount}
            </button>
          </div>
        </div>
        )}
      </div>
    </Backdrop>
  );
};

export default DonationModal;

