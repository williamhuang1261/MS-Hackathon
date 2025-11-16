/**
 * Example Usage of Lotus Visualization Component
 * 
 * This file demonstrates different ways to use the LotusVisualization component
 */

'use client';

import { useState, useEffect } from 'react';
import LotusVisualization from './LotusVisualization';

// ============================================
// Example 1: Static Display
// ============================================
export function StaticLotusExample() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Static Display ($50,000 raised)</h2>
      <LotusVisualization 
        totalAmount={50000}
        goalAmount={100000}
        size={400}
      />
    </div>
  );
}

// ============================================
// Example 2: Interactive Donation System
// ============================================
export function InteractiveLotusExample() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleDonation = (amount: number) => {
    const newTotal = totalAmount + amount;
    setTotalAmount(newTotal);
    
    // Trigger celebration on every $10K milestone or reaching goal
    const oldMilestone = Math.floor(totalAmount / 10000);
    const newMilestone = Math.floor(newTotal / 10000);
    
    if (newMilestone > oldMilestone || newTotal >= 100000) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 4000);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Make a Donation</h2>
      
      <LotusVisualization 
        totalAmount={totalAmount}
        goalAmount={100000}
        showCelebration={showCelebration}
        size={400}
      />
      
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        {[10, 25, 50, 100, 250, 500, 1000, 5000].map((amount) => (
          <button
            key={amount}
            onClick={() => handleDonation(amount)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all min-h-[44px]"
          >
            Donate ${amount}
          </button>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button
          onClick={() => setTotalAmount(0)}
          className="text-gray-500 hover:text-gray-700 underline text-sm"
        >
          Reset Donations
        </button>
      </div>
    </div>
  );
}

// ============================================
// Example 3: With API Integration
// ============================================
export function ApiIntegratedLotusExample() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);

  // Fetch current total from API on mount
  useEffect(() => {
    fetchDonationTotal();
  }, []);

  const fetchDonationTotal = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/donations/total');
      const data = await response.json();
      setTotalAmount(data.total);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch donation total:', error);
      setLoading(false);
    }
  };

  const handleDonation = async (amount: number) => {
    try {
      // Submit donation to API
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      
      if (response.ok) {
        const data = await response.json();
        const newTotal = data.newTotal;
        
        // Check for milestone
        const oldMilestone = Math.floor(totalAmount / 10000);
        const newMilestone = Math.floor(newTotal / 10000);
        
        if (newMilestone > oldMilestone || newTotal >= 100000) {
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 4000);
        }
        
        setTotalAmount(newTotal);
      }
    } catch (error) {
      console.error('Failed to process donation:', error);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Live Campaign Progress</h2>
      
      <LotusVisualization 
        totalAmount={totalAmount}
        goalAmount={100000}
        showCelebration={showCelebration}
        size={400}
      />
      
      <div className="mt-8 flex gap-3 justify-center">
        {[50, 100, 250, 500].map((amount) => (
          <button
            key={amount}
            onClick={() => handleDonation(amount)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
          >
            ${amount}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// Example 4: Custom Goal Amount
// ============================================
export function CustomGoalExample() {
  const [totalAmount] = useState(125000); // $125K raised
  
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Custom $250K Goal</h2>
      <LotusVisualization 
        totalAmount={totalAmount}
        goalAmount={250000} // Custom goal
        size={500} // Larger size
      />
    </div>
  );
}

// ============================================
// Example 5: Multiple Campaigns
// ============================================
export function MultipleCampaignsExample() {
  const campaigns = [
    { id: 1, name: 'Emergency Shelter', raised: 35000, goal: 50000 },
    { id: 2, name: 'Therapy Services', raised: 72000, goal: 100000 },
    { id: 3, name: 'Education Programs', raised: 15000, goal: 25000 },
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Campaigns</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {campaigns.map((campaign) => (
          <div key={campaign.id}>
            <h3 className="text-xl font-semibold mb-4 text-center">
              {campaign.name}
            </h3>
            <LotusVisualization 
              totalAmount={campaign.raised}
              goalAmount={campaign.goal}
              size={300}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// Example 6: With Real-time Updates (WebSocket)
// ============================================
export function RealtimeLotusExample() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Connect to WebSocket for real-time updates
    const ws = new WebSocket('wss://your-api.com/donations');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newTotal = data.totalAmount;
      
      // Check for milestone
      const oldMilestone = Math.floor(totalAmount / 10000);
      const newMilestone = Math.floor(newTotal / 10000);
      
      if (newMilestone > oldMilestone) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 4000);
      }
      
      setTotalAmount(newTotal);
    };

    return () => ws.close();
  }, [totalAmount]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Live Campaign (Real-time Updates)
      </h2>
      <LotusVisualization 
        totalAmount={totalAmount}
        goalAmount={100000}
        showCelebration={showCelebration}
        size={400}
      />
    </div>
  );
}

// Export all examples as a demo page
export default function LotusExamplesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-12">
          Lotus Visualization Examples
        </h1>
        
        <div className="space-y-16">
          <StaticLotusExample />
          <InteractiveLotusExample />
          <CustomGoalExample />
          <MultipleCampaignsExample />
        </div>
      </div>
    </div>
  );
}

