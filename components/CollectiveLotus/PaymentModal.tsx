'use client';

import { useState } from 'react';
import Backdrop from '@/components/Modal/Backdrop';
import Image from 'next/image';

import paypalIcon from '@/public/paypal.svg';
import applePayIcon from '@/public/applepay.svg';
import googlePayIcon from '@/public/googlepay.svg';
import masterCardLogo from '@/public/mastercardLogo.png';
import visaLogo from '@/public/visaLogo.png';
import amexLogo from '@/public/amexLogo.svg';
import discoverLogo from '@/public/discoverLogo.svg';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onPaymentComplete: (email: string, isMonthly: boolean) => void;
}

const PaymentModal = ({ isOpen, onClose, amount, onPaymentComplete }: PaymentModalProps) => {
  const [email, setEmail] = useState('');
  const [isMonthly, setIsMonthly] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'applepay' | 'googlepay'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('');

  if (!isOpen) return null;

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value.replace(/\D/g, '').slice(0, 16));
    setCardNumber(formatted);
  };

  const handleExpiryChange = (value: string) => {
    let formatted = value.replace(/\D/g, '').slice(0, 4);
    if (formatted.length >= 2) {
      formatted = `${formatted.slice(0, 2)}/${formatted.slice(2)}`;
    }
    setExpiryDate(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      alert('Please enter your email');
      return;
    }

    if (paymentMethod === 'card') {
      if (!cardNumber || !expiryDate || !cvc || !nameOnCard) {
        alert('Please fill in all card details');
        return;
      }
      if (!address || !city || !province || !country) {
        alert('Please fill in all address details');
        return;
      }
    }

    // Simulate payment processing
    onPaymentComplete(email, isMonthly);
  };

  return (
    <Backdrop onClick={onClose}>
      <div
        className="rounded-xl md:rounded-2xl shadow-2xl max-w-2xl w-full bg-white p-4 sm:p-5 md:p-8 relative max-h-[90vh] overflow-y-auto mx-2 sm:mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          ×
        </button>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
          {/* Header */}
          <div className="text-center mt-6 sm:mt-8 md:mt-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-2">
              Complete Your Donation
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-purple-700 font-bold">
              ${amount.toFixed(2)}
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
              Email (for receipt)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-3 sm:px-4 py-3 sm:py-3.5 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[44px]"
              required
              autoFocus
            />
          </div>

          {/* Payment Method Selection */}
          <div>
            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-3">
              Payment Method
            </label>
            <div className="grid grid-cols-4 gap-2 sm:gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-2 sm:p-3 rounded-lg border-2 text-center transition-all min-h-[44px] flex items-center justify-center ${
                  paymentMethod === 'card'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-[10px] sm:text-xs font-medium">Card</div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`p-2 sm:p-3 rounded-lg border-2 flex items-center justify-center transition-all min-h-[44px] ${
                  paymentMethod === 'paypal'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image src={paypalIcon} alt="PayPal" width={40} height={14} className="sm:w-12 sm:h-4" />
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('applepay')}
                className={`p-2 sm:p-3 rounded-lg border-2 flex items-center justify-center transition-all min-h-[44px] ${
                  paymentMethod === 'applepay'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image src={applePayIcon} alt="Apple Pay" width={40} height={14} className="sm:w-12 sm:h-4" />
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('googlepay')}
                className={`p-2 sm:p-3 rounded-lg border-2 flex items-center justify-center transition-all min-h-[44px] ${
                  paymentMethod === 'googlepay'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image src={googlePayIcon} alt="Google Pay" width={40} height={14} className="sm:w-12 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Card Details */}
          {paymentMethod === 'card' && (
            <div className="space-y-3 sm:space-y-4">
              <div className="flex space-x-2 mb-4">
                <Image src={masterCardLogo} alt="MasterCard" width={32} height={20} />
                <Image src={visaLogo} alt="Visa" width={32} height={20} />
                <Image src={amexLogo} alt="Amex" width={32} height={20} />
                <Image src={discoverLogo} alt="Discover" width={32} height={20} />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  className="w-full p-3 sm:p-3.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 min-h-[44px] text-base"
                  required
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="col-span-2 sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => handleExpiryChange(e.target.value)}
                    className="w-full p-3 sm:p-3.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 min-h-[44px] text-base"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="w-full p-3 sm:p-3.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 min-h-[44px] text-base"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name on Card
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  className="w-full p-3 sm:p-3.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 min-h-[44px] text-base"
                  required
                />
              </div>

              {/* Billing Address */}
              <div className="border-t-2 border-gray-100 pt-4 space-y-4">
                <h3 className="text-sm font-semibold text-gray-700">Billing Address</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    placeholder="123 Main Street"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 sm:p-3.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 mb-2 min-h-[44px] text-base"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Apt., suite, unit, building (Optional)"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    className="w-full p-3 sm:p-3.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 min-h-[44px] text-base"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="Montreal"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-3 sm:p-3.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 min-h-[44px] text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Province / State
                    </label>
                    <input
                      type="text"
                      placeholder="QC"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full p-3 sm:p-3.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 min-h-[44px] text-base"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full p-3 sm:p-3.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 min-h-[44px] text-base"
                    required
                  >
                    <option value="">Select country</option>
                    <option value="CA">Canada</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Alternative Payment Methods Message */}
          {paymentMethod !== 'card' && (
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 text-center">
              <p className="text-purple-800">
                You'll be redirected to {paymentMethod === 'paypal' ? 'PayPal' : 
                  paymentMethod === 'applepay' ? 'Apple Pay' : 'Google Pay'} to complete your donation.
              </p>
            </div>
          )}

          {/* Monthly Recurring Option */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isMonthly}
                onChange={(e) => setIsMonthly(e.target.checked)}
                className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <div className="flex-1">
                <span className="font-semibold text-purple-800">
                  💜 Make this a monthly donation
                </span>
                <p className="text-xs text-gray-600 mt-1">
                  Sustaining support helps us plan ahead and provide ongoing services
                </p>
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 sm:py-4 rounded-lg text-base sm:text-lg transition-all shadow-lg min-h-[48px] sm:min-h-[52px]"
          >
            <span className="hidden sm:inline">Complete Donation - ${amount.toFixed(2)}</span>
            <span className="sm:hidden">Complete - ${amount.toFixed(2)}</span>
          </button>

          <p className="text-center text-xs md:text-sm text-gray-500">
            🔒 Secure payment processing • 100% tax deductible
          </p>
        </form>
      </div>
    </Backdrop>
  );
};

export default PaymentModal;

