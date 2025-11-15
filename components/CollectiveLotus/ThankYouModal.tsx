'use client';

import Backdrop from '@/components/Modal/Backdrop';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  newStage: number;
  flowerCompleted: boolean;
  isMonthly: boolean;
}

const ThankYouModal = ({ isOpen, onClose, amount, newStage, flowerCompleted, isMonthly }: ThankYouModalProps) => {
  if (!isOpen) return null;

  const shareText = `I just donated ${isMonthly ? `$${amount}/month` : `$${amount}`} to help survivors of domestic violence! 🌸`;
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';
  
  const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    };
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <Backdrop onClick={onClose}>
      <div
        className="rounded-xl md:rounded-2xl shadow-2xl max-w-lg w-full bg-white p-6 md:p-8 relative text-center mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          ×
        </button>

        {/* Success Icon */}
        <div className="text-5xl md:text-7xl mb-3 md:mb-4 mt-6 md:mt-0">{flowerCompleted ? '🎉' : '🌸'}</div>

        {/* Thank You Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 md:mb-4">
          {flowerCompleted ? 'Amazing!' : 'Thank You!'}
        </h2>
        
        <p className="text-base md:text-xl text-gray-700 mb-4 md:mb-6">
          Your <span className="font-bold text-purple-700">
            ${amount}{isMonthly && '/month'}
          </span> {isMonthly && 'recurring '}donation just helped our collective lotus grow!
        </p>
        
        {isMonthly && (
          <div className="bg-purple-100 border border-purple-300 rounded-lg p-2.5 md:p-3 mb-3 md:mb-4">
            <p className="text-xs md:text-sm text-purple-800 font-semibold">
              💜 Thank you for your monthly commitment! You'll be charged ${amount} every month.
            </p>
          </div>
        )}

        {/* Impact */}
        <div className={`border-2 rounded-xl p-4 md:p-6 mb-4 md:mb-6 ${
          flowerCompleted 
            ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300' 
            : 'bg-purple-50 border-purple-200'
        }`}>
          {flowerCompleted ? (
            <>
              <p className="text-xl md:text-2xl font-bold text-purple-700 mb-2">
                🌺 The Lotus Has Bloomed! 🌺
              </p>
              <p className="text-sm md:text-base text-gray-700 mb-2">
                Your donation completed the lotus! It has now reset to begin growing again.
              </p>
              <p className="text-sm md:text-base text-purple-700 font-semibold">
                Starting fresh at Stage {newStage}
              </p>
            </>
          ) : (
            <>
              <p className="text-base md:text-lg text-purple-800 font-semibold mb-2">
                🎉 Lotus Advanced to Stage {newStage}!
              </p>
              <p className="text-sm md:text-base text-gray-600">
                Watch the lotus on this page continue to bloom as more people donate.
              </p>
            </>
          )}
        </div>

        {/* What Happens Next */}
        <div className="space-y-2 md:space-y-3 text-left mb-4 md:mb-6">
          <p className="text-xs md:text-sm text-gray-700">
            <span className="font-semibold">✅ Receipt sent</span> to your email
          </p>
          <p className="text-xs md:text-sm text-gray-700">
            <span className="font-semibold">✅ Tax deductible</span> donation confirmed
          </p>
          <p className="text-xs md:text-sm text-gray-700">
            <span className="font-semibold">✅ Funds supporting</span> survivors of domestic violence
          </p>
        </div>

        {/* Social Sharing */}
        <div className="border-t-2 border-gray-100 pt-4 md:pt-6 mb-4 md:mb-6">
          <p className="text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-3 text-center">
            Share your impact and inspire others! 💜
          </p>
          <div className="flex flex-col md:flex-row gap-2 md:gap-3 justify-center">
            <button
              onClick={() => handleShare('twitter')}
              className="flex-1 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-semibold py-2.5 md:py-3 px-3 md:px-4 rounded-lg transition-all flex items-center justify-center gap-2 min-h-[44px] text-sm md:text-base"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
              Twitter
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="flex-1 bg-[#4267B2] hover:bg-[#365899] text-white font-semibold py-2.5 md:py-3 px-3 md:px-4 rounded-lg transition-all flex items-center justify-center gap-2 min-h-[44px] text-sm md:text-base"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="flex-1 bg-[#0077B5] hover:bg-[#006399] text-white font-semibold py-2.5 md:py-3 px-3 md:px-4 rounded-lg transition-all flex items-center justify-center gap-2 min-h-[44px] text-sm md:text-base"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 md:py-4 rounded-lg text-base md:text-lg transition-all min-h-[44px]"
        >
          Continue Exploring
        </button>
      </div>
    </Backdrop>
  );
};

export default ThankYouModal;

