import React, { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";

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
    <div className="w-full max-w-xl">
      <Progress value={percent} className="h-3" />
    </div>
  );
};
export default LandingProgressBar;
