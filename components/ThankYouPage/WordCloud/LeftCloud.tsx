"use client";
import {
  useWordCloud,
  Word,
  WordCloud,
  WordCloudProps,
} from "@isoterik/react-word-cloud";

interface Props {
  words: Word[];
  resolveRotate: WordCloudProps["rotate"];
  resolveFonts: WordCloudProps["font"];
}

const LeftCloud = ({ words, resolveRotate, resolveFonts }: Props) => {
  const WIDTH = 340;
  const HEIGHT = 200;
  const defaultFill = "#CACAD7";

  const { computedWords } = useWordCloud({
    words,
    width: WIDTH,
    height: HEIGHT,
    rotate: resolveRotate,
    font: resolveFonts,
    spiral: "archimedean",
    padding: 1,
    timeInterval: 2,
  });

  return (
    <div className="w-160 z-10">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <g transform={`translate(${WIDTH / 2},${HEIGHT / 2}) rotate(30)`}>
          {computedWords.map((word, index) => (
            <text
              key={index}
              textAnchor="middle"
              transform={`translate(${word.x}, ${word.y}) rotate(${word.rotate})`}
              style={{
                fontSize: word.size,
                fontFamily: word.font,
                fontWeight: word.weight,
                fill: word.fill || defaultFill,
                transform: `translate(${word.x}, ${word.y}) rotate(${word.rotate})`,
                transition: "all 0.3s ease",
              }}
            >
              {word.text}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default LeftCloud;
