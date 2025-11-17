import React, { useEffect, useRef, useState } from "react";

interface Props {
  progress: number;
}

const LandingProgressBar = ({ progress }: Props) => {
  // Clamp progress between 0 and 100
  const target = Math.max(0, Math.min(100, progress));
  const [percent, setPercent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPercent(0);
    timerRef.current = setInterval(() => {
      setPercent((prev) => {
        if (prev >= target) {
          if (timerRef.current) clearInterval(timerRef.current);
          return target;
        }
        return Math.min(prev + 1, target);
      });
    }, 1); // micro timer: 10ms per increment
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [target]);

  return (
    <div className="w-full max-w-xl h-1 bg-gray-600 rounded-lg overflow-hidden outline-2 outline-primary flex items-center relative">
      <div
        className="h-full bg-yellow-500 transition-all duration-1000"
        style={{ width: `${percent}%` }}
      />
      {/* <span className="absolute left-1/2 -translate-x-1/2 text-xs font-bold text-primary drop-shadow">
        {percent.toFixed(1)}%
      </span> */}
    </div>
  );
};
export default LandingProgressBar;
