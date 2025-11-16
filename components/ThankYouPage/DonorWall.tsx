"use client";

import { useEffect, useState } from "react";
import { FAKE_DONOR_NAMES } from "@/lib/fakeDonors";
import { WordCloudProps } from "@isoterik/react-word-cloud";
import LeftCloud from "./WordCloud/LeftCloud";
import RightCloud from "./WordCloud/RightCloud";
import LotusVisualization from "@/components/lotus-standalone/LotusVisualization";
import { donationState } from "@/lib/donationState";

const formatDonorName = FAKE_DONOR_NAMES.map(({ text, value }) => {
  // Increase size multiplier - company names (higher values) will be even bigger
  return {
    text: text,
    value: value * 0.5, // Increased from 0.15 to 0.5 for larger names
  };
});

const resolveFonts: WordCloudProps["font"] = () => {
  return "serif";
};

// Distribute formatted names by alternating indices: even -> first, odd -> second
const firstHalf = [] as typeof formatDonorName;
const secondHalf = [] as typeof formatDonorName;
for (let i = 0; i < formatDonorName.length; i++) {
  if (i % 2 === 0) firstHalf.push(formatDonorName[i]);
  else secondHalf.push(formatDonorName[i]);
}

interface Props {
  height?: number;
  width?: number;
  handSize?: number;
}

const DonorWall = ({ width = 400, height = 200, handSize = 200 }: Props) => {
  // ⚠️ CRITICAL: Initialize with donationState.getTotalAmount()
  const [totalAmount, setTotalAmount] = useState(() => {
    const amount = donationState.getTotalAmount();
    console.log('🎯 DonorWall Init - Amount:', amount);
    return amount;
  });
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Subscribe to donation updates
    const unsubscribe = donationState.subscribe((amount) => {
      setTotalAmount((prevAmount) => {
        const oldMilestone = Math.floor(prevAmount / 10000);
        const newMilestone = Math.floor(amount / 10000);
        
        // Trigger celebration on milestones ($10K, $20K, etc.)
        if (newMilestone > oldMilestone || amount >= 100000) {
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 4000);
        }
        
        return amount;
      });
    });

    return () => unsubscribe();
  }, []); // ⚠️ Empty dependency array - subscribe only once

  return (
    <div className="w-full flex p-8 pt-16 justify-center items-center">
      <div className="flex relative h-100 items-end">
        <LeftCloud
          words={firstHalf}
          resolveFonts={resolveFonts}
          resolveRotate={() => {
            return -30;
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <LotusVisualization 
            totalAmount={totalAmount}
            goalAmount={100000}
            showCelebration={showCelebration}
            size={320}
          />
        </div>
        <RightCloud
          words={secondHalf}
          resolveFonts={resolveFonts}
          resolveRotate={() => {
            return 30;
          }}
        />
      </div>
    </div>
  );
};

export default DonorWall;
