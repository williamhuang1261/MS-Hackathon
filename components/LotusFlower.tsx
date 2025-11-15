'use client';

import { useEffect, useRef, useState } from 'react';

interface LotusFlowerProps {
  stage?: number;
  showCelebration?: boolean;
  showLabel?: boolean;
  size?: number;
}

export default function LotusFlower({ 
  stage = 0, 
  showCelebration = false,
  showLabel = true,
  size = 600
}: LotusFlowerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStage, setCurrentStage] = useState(stage);
  const [stageName, setStageName] = useState('');
  const [stageDescription, setStageDescription] = useState('');
  const rendererRef = useRef<any>(null);
  const confettiRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    if (rendererRef.current) return; // Already initialized

    let FlowerRenderer: any;
    let LOTUS_STAGES: any;

    // Dynamic import to avoid SSR issues with canvas
    const initLotus = async () => {
      const [flowerModule, lotusModule] = await Promise.all([
        import('@/lib/lotus/flower-renderer'),
        import('@/lib/lotus/lotus-designs')
      ]);

      FlowerRenderer = flowerModule.FlowerRenderer;
      LOTUS_STAGES = lotusModule.LOTUS_STAGES;

      // Initialize renderer
      if (containerRef.current && !rendererRef.current) {
        rendererRef.current = new FlowerRenderer(containerRef.current, size);
        rendererRef.current.setStage(stage);
        setCurrentStage(stage);
        
        // Update labels
        const stageInfo = LOTUS_STAGES[stage];
        if (stageInfo) {
          setStageName(stageInfo.name);
          setStageDescription(stageInfo.description);
        }
      }
    };

    initLotus();

    return () => {
      if (rendererRef.current?.destroy) {
        rendererRef.current.destroy();
        rendererRef.current = null;
      }
      if (confettiRef.current?.stop) {
        confettiRef.current.stop();
        confettiRef.current = null;
      }
    };
  }, []); // Only initialize once

  // Update stage when prop changes
  useEffect(() => {
    const updateStage = async () => {
      if (!rendererRef.current) return;
      if (stage === currentStage) return;

      // Update renderer
      rendererRef.current.setStage(stage);
      setCurrentStage(stage);

      // Update labels
      const lotusModule = await import('@/lib/lotus/lotus-designs');
      const stageInfo = lotusModule.LOTUS_STAGES[stage];
      if (stageInfo) {
        setStageName(stageInfo.name);
        setStageDescription(stageInfo.description);
      }
    };

    updateStage();
  }, [stage]);

  // Handle celebration separately
  useEffect(() => {
    if (!showCelebration) return;
    if (!containerRef.current) return;

    const triggerCelebration = async () => {
      // Clean up old confetti if exists
      if (confettiRef.current?.stop) {
        confettiRef.current.stop();
      }

      // Create new confetti
      const confettiModule = await import('@/lib/lotus/confetti');
      confettiRef.current = new confettiModule.Confetti(containerRef.current);
      confettiRef.current.celebrate();
    };

    triggerCelebration();
  }, [showCelebration]);

  return (
    <div className="lotus-flower-container flex flex-col items-center gap-4">
      <div 
        ref={containerRef} 
        className="lotus-canvas-wrapper rounded-lg shadow-lg overflow-hidden bg-[#FAFAF7]"
        style={{ width: `${size}px`, height: `${size}px` }}
      />
      {showLabel && (
        <div className="text-center space-y-1">
          <h3 className="text-2xl font-semibold text-gray-800">{stageName}</h3>
          <p className="text-gray-600 italic">{stageDescription}</p>
        </div>
      )}
    </div>
  );
}

