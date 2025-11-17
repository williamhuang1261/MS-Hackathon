import React from "react";
import ChartPieLegend from "../Other/ChartPieLegend";
import ShareSection from "./ShareSection";

const YourImpactSection = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      <ChartPieLegend />
      <ShareSection />
    </div>
  );
};

export default YourImpactSection;
