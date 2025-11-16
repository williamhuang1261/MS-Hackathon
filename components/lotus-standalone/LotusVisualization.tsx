'use client';

import { useEffect, useState } from 'react';
import LotusFlower from './LotusFlower';

interface LotusVisualizationProps {
  totalAmount: number;
  goalAmount?: number;
  showCelebration?: boolean;
  size?: number;
}

const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  }
  return `$${amount}`;
};

const calculateStage = (amount: number): number => {
  if (amount < 1000) return 0;
  if (amount < 10000) return 1;
  if (amount < 20000) return 2;
  if (amount < 30000) return 3;
  if (amount < 40000) return 4;
  if (amount < 50000) return 5;
  if (amount < 60000) return 6;
  if (amount < 70000) return 7;
  if (amount < 80000) return 8;
  if (amount < 90000) return 9;
  if (amount < 100000) return 10;
  return 11; // Full bloom at $100K+
};

const LotusVisualization = ({ 
  totalAmount, 
  goalAmount = 100000,
  showCelebration = false,
  size = 400
}: LotusVisualizationProps) => {
  const [currentStage, setCurrentStage] = useState(() => calculateStage(totalAmount));
  const [displayAmount, setDisplayAmount] = useState(totalAmount);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const stage = calculateStage(totalAmount);
    console.log('💐 Lotus Update - Amount:', totalAmount, 'Stage:', stage);
    setCurrentStage(stage);
    setDisplayAmount(totalAmount);
  }, [totalAmount]);

  const progressPercentage = Math.min((totalAmount / goalAmount) * 100, 100);

  return (
    <div className="relative p-4 md:p-6 overflow-hidden max-w-sm md:max-w-md mx-auto">
      {/* Subtle radial gradient backdrop for better text readability */}
      <div 
        className="absolute inset-0 rounded-2xl" 
        style={{ 
          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)'
        }} 
      />
      
      {/* Amount Raised Display - Minimalistic */}
      <div className="text-center mb-3 relative z-10">
        <span className="text-sm sm:text-base text-white drop-shadow-lg">
          Total Raised: <span className="font-bold text-white drop-shadow-lg text-lg">{formatCurrency(displayAmount)}</span>
        </span>
      </div>

      {/* Info Icon Button */}
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/25 hover:bg-white/35 text-white transition-colors backdrop-blur-sm z-[100] shadow-lg"
        aria-label="About the Lotus"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-12 right-3 left-3 sm:left-auto sm:w-80 bg-purple-50 border-2 border-purple-200 rounded-lg p-3 sm:p-4 shadow-lg z-[100]">
          <div className="flex items-start gap-2 mb-2">
            <span className="text-lg flex-shrink-0">🌸</span>
            <h4 className="font-bold text-purple-800 text-sm">About the Lotus</h4>
            <button
              onClick={() => setShowTooltip(false)}
              className="ml-auto text-purple-400 hover:text-purple-600"
            >
              ×
            </button>
          </div>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
            The lotus flower is a powerful symbol of resilience and transformation. 
            It grows from mud and darkness, yet rises to bloom with remarkable beauty—just like survivors of domestic violence. 
            As our collective fundraising grows from seed to full bloom at {formatCurrency(goalAmount)}, each contribution represents the hope and healing you help create. 
            Watch the lotus transform as we reach each milestone together.
          </p>
        </div>
      )}

      {/* Backdrop overlay when tooltip is open */}
      {showTooltip && (
        <div 
          className="fixed inset-0 z-[90]"
          onClick={() => setShowTooltip(false)}
        />
      )}

      {/* Lotus Canvas */}
      <div className="w-full flex justify-center overflow-hidden mb-4 md:mb-6 relative z-10">
        <LotusFlower 
          stage={currentStage}
          showCelebration={showCelebration}
          showLabel={false}
          size={size}
        />
      </div>

      {/* Minimalistic Progress Bar - same width as canvas */}
      <div className="mx-auto relative z-10" style={{ maxWidth: `${size}px` }}>
        <div className="relative h-2 bg-white/25 rounded-full overflow-hidden backdrop-blur-sm shadow-md">
          <div 
            className="h-full bg-gradient-to-r from-pink-400 via-purple-400 to-purple-500 rounded-full transition-all duration-1000 ease-out shadow-lg"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-white drop-shadow-md font-medium">$0</span>
          <span className="text-xs text-white drop-shadow-md font-medium">{formatCurrency(goalAmount)}</span>
        </div>
      </div>
    </div>
  );
};

export default LotusVisualization;

