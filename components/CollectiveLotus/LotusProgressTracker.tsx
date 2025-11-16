'use client';

import LotusVisualization from './LotusVisualization';

interface LotusProgressTrackerProps {
  totalAmount: number;
  showCelebration?: boolean;
}

const LotusProgressTracker = ({ 
  totalAmount, 
  showCelebration = false 
}: LotusProgressTrackerProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <LotusVisualization 
        totalAmount={totalAmount}
        goalAmount={100000}
        showCelebration={showCelebration}
        size={400}
      />
    </div>
  );
};

export default LotusProgressTracker;

