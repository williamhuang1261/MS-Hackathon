"use client";

import { FAKE_DONOR_NAMES } from "@/lib/fakeDonors";
import HandProgressBar from "./HandProgressBar";
import { WordCloud, WordCloudProps } from "@isoterik/react-word-cloud";

const formatDonorName = FAKE_DONOR_NAMES.map(({ text, value }) => {
  return {
    text: text,
    value: value * 0.15,
  };
});

const resolveRotate: WordCloudProps["rotate"] = () => {
  return 0;
};

const resolveFonts: WordCloudProps["font"] = () => {
  return "serif";
};

// Adjust font size to prevent overlapping
const adjustedFontSize: WordCloudProps["fontSize"] = (word) => {
  return Math.min(Math.sqrt(word.value * 0.8), 35); // Cap at 35px for better spacing
};

interface Props {
  height?: number;
  width?: number;
  handSize?: number;
}

const DonorWall = ({width = 400, height = 200, handSize = 200}: Props) => {
  return (
    <div className="w-full flex p-8 justify-center items-center">
      <WordCloud
        words={formatDonorName}
        width={width}
        height={height}
        rotate={resolveRotate}
        font={resolveFonts}
        fill={"#CACAD7"}
        spiral="archimedean"
      />
      <div className="absolute ">
        <HandProgressBar percent={28} increment={1} handSize={handSize}/>
      </div>
    </div>
  );
};

export default DonorWall;
