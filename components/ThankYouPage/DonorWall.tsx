"use client";

import { FAKE_DONOR_NAMES } from "@/lib/fakeDonors";
import { WordCloudProps } from "@isoterik/react-word-cloud";
import LeftCloud from "./WordCloud/LeftCloud";
import RightCloud from "./WordCloud/RightCloud";

const formatDonorName = FAKE_DONOR_NAMES.map(({ text, value }) => {
  return {
    text: text,
    value: value * 0.15,
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
  return (
    <div className="w-full flex p-8 justify-center items-center">
      <div className="flex gap-8">
        <LeftCloud
          words={firstHalf}
          resolveFonts={resolveFonts}
          resolveRotate={() => {
            return -30;
          }}
        />
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
