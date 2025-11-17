"use client";

import { FAKE_DONOR_NAMES } from "@/lib/fakeDonors";
import { WordCloudProps } from "@isoterik/react-word-cloud";
import LeftCloud from "../LandingPage/WordCloud/LeftCloud";
import RightCloud from "../LandingPage/WordCloud/RightCloud";
import Lotus from "../LandingPage/WordCloud/OldLotus";
import LotusVideo from "../LandingPage/WordCloud/LotusVideo";
import OldLotus from "../LandingPage/WordCloud/OldLotus";

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
  progress?: number;
}

const DonorWall = ({
  width = 400,
  height = 200,
  handSize = 200,
  progress = 80,
}: Props) => {
  return (
    <div className="w-full flex p-8 justify-center items-center">
      <div className="flex relative h-100 items-end">
        <LeftCloud
          words={firstHalf}
          resolveFonts={resolveFonts}
          resolveRotate={() => {
            return -30;
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <LotusVideo progress={progress} />
          {/* <OldLotus progress={80} /> */}
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
