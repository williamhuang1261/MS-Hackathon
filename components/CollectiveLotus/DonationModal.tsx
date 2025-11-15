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
        className="rounded-2xl shadow-2xl max-w-md w-full bg-white p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          ×
        </button>

        {/* Custom Amount Input - Show when no preselected amount */}
        {!showUpsell && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-5xl mb-3">💜</div>
              <h2 className="text-2xl font-bold text-purple-700 mb-4">
                Enter Your Donation Amount
              </h2>
              <p className="text-gray-600 mb-6">
                Every dollar makes a difference
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Donation Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-500">$</span>
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
                  className="w-full pl-12 pr-4 py-4 text-2xl border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  min="1"
                  step="0.01"
                  autoFocus
                />
              </div>
            </div>

            <button
              onClick={handleCustomAmountSubmit}
              disabled={!customAmount || parseFloat(customAmount) <= 0}
              className={`w-full font-bold py-4 rounded-lg text-lg transition-all ${
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
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-5xl mb-3">💜</div>
              <h2 className="text-2xl font-bold text-purple-700 mb-2">
                Amazing Choice!
              </h2>
              <p className="text-lg text-gray-700 mb-1">
                Your <span className="font-bold text-purple-700">${amount}</span> donation will help grow our collective lotus
              </p>
              <p className="text-gray-600">
                Want to make an even bigger impact?
              </p>
            </div>

            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
              <h3 className="font-bold text-purple-800 mb-4 text-center">
                Add a little more?
              </h3>
              
              <div className="space-y-3">
                {[
                  { amount: 5, impact: "Provides a warm meal" },
                  { amount: 10, impact: "Supplies toiletries & essentials" },
                  { amount: 25, impact: "Covers one therapy session" },
                  { amount: 50, impact: "Provides a safe night's shelter" }
                ].map(({ amount: addAmount, impact }) => (
                  <button
                    key={addAmount}
                    onClick={() => setUpsellAmount(addAmount)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      upsellAmount === addAmount
                        ? 'border-purple-500 bg-white shadow-md'
                        : 'border-purple-200 hover:border-purple-400 bg-purple-50/50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-purple-700 text-lg">
                        Add ${addAmount}
                      </span>
                      <span className="text-sm font-semibold text-gray-600 bg-purple-100 px-2 py-1 rounded">
                        Total: ${amount + addAmount}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {impact}
                    </p>
                  </button>
                ))}
              </div>
            </div>

          <div className="space-y-3">
            <button
              onClick={handleCompleteWithUpsell}
              disabled={!upsellAmount}
              className={`w-full font-bold py-4 rounded-lg text-lg transition-all ${
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
              className="w-full text-gray-500 hover:text-purple-700 underline text-sm transition-colors"
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

