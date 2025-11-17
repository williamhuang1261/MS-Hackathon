"use client";

import React, { useRef, useEffect } from "react";

interface LotusVideoProps {
  progress: number;
}

const LotusVideo = ({ progress }: LotusVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pauseTime = (Math.max(0, Math.min(100, progress)) / 100) * 5;

useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  const handleTimeUpdate = () => {
    if (video.currentTime >= pauseTime) {
      video.pause();
    }
  };

  video.currentTime = 0;
  video.playbackRate = 2; // Accelerate video (2x speed)
  video.play();

  video.addEventListener("timeupdate", handleTimeUpdate);

  return () => {
    video.removeEventListener("timeupdate", handleTimeUpdate);
  };
}, [progress, pauseTime]);
  return (
    <video ref={videoRef} width="1920" height="1080" muted preload="none" className="pb-14 opacity-90">
      <source src="/LotusBloom.mp4" type="video/mp4" />
    </video>
  );
};

export default LotusVideo;