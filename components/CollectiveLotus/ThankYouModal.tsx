'use client';

import Backdrop from '@/components/Modal/Backdrop';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  newStage: number;
  flowerCompleted: boolean;
}

const ThankYouModal = ({ isOpen, onClose, amount, newStage, flowerCompleted }: ThankYouModalProps) => {
  if (!isOpen) return null;

  return (
    <Backdrop onClick={onClose}>
      <div
        className="rounded-2xl shadow-2xl max-w-lg w-full bg-white p-8 relative text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          ×
        </button>

        {/* Success Icon */}
        <div className="text-7xl mb-4">{flowerCompleted ? '🎉' : '🌸'}</div>

        {/* Thank You Message */}
        <h2 className="text-4xl font-bold text-primary mb-4">
          {flowerCompleted ? 'Amazing!' : 'Thank You!'}
        </h2>
        
        <p className="text-xl text-gray-700 mb-6">
          Your <span className="font-bold text-purple-700">${amount}</span> donation just helped our collective lotus grow!
        </p>

        {/* Impact */}
        <div className={`border-2 rounded-xl p-6 mb-6 ${
          flowerCompleted 
            ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300' 
            : 'bg-purple-50 border-purple-200'
        }`}>
          {flowerCompleted ? (
            <>
              <p className="text-2xl font-bold text-purple-700 mb-2">
                🌺 The Lotus Has Bloomed! 🌺
              </p>
              <p className="text-gray-700 mb-2">
                Your donation completed the lotus! It has now reset to begin growing again.
              </p>
              <p className="text-purple-700 font-semibold">
                Starting fresh at Stage {newStage}
              </p>
            </>
          ) : (
            <>
              <p className="text-lg text-purple-800 font-semibold mb-2">
                🎉 Lotus Advanced to Stage {newStage}!
              </p>
              <p className="text-gray-600">
                Watch the lotus on this page continue to bloom as more people donate.
              </p>
            </>
          )}
        </div>

        {/* What Happens Next */}
        <div className="space-y-3 text-left mb-6">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">✅ Receipt sent</span> to your email
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">✅ Tax deductible</span> donation confirmed
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">✅ Funds supporting</span> survivors of domestic violence
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-lg text-lg transition-all"
        >
          Continue Exploring
        </button>

        {/* Share */}
        <p className="text-sm text-gray-500 mt-4">
          Share your impact with others and invite them to contribute! 💜
        </p>
      </div>
    </Backdrop>
  );
};

export default ThankYouModal;

