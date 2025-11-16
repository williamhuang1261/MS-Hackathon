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
  const WIDTH = 400;
  const HEIGHT = 300;
  const defaultFill = "#CACAD7";

  // Crescent mask function - left crescent opens right (like "(" shape)
  const isInLeftCrescent = (x: number, y: number): boolean => {
    const centerX = WIDTH / 2;
    const centerY = HEIGHT / 2;
    
    // Translate to center origin
    const dx = x - centerX;
    const dy = y - centerY;
    
    // Distance from center
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Only allow points on the left side that form a crescent
    // Inner radius and outer radius define the crescent thickness
    // Smaller inner radius = more curved, tighter arc
    const outerRadius = 140;
    const innerRadius = 40;
    
    // Must be within the crescent ring
    if (distance < innerRadius || distance > outerRadius) return false;
    
    // Only allow left side (x < center) with some tolerance
    // This creates the "(" shape opening to the right
    return dx < 15;
  };

  const { computedWords } = useWordCloud({
    words,
    width: WIDTH,
    height: HEIGHT,
    rotate: resolveRotate,
    font: resolveFonts,
    spiral: "archimedean",
    padding: 2,
    timeInterval: 2,
  });

  // Filter words to only show those in the crescent region
  const crescentWords = computedWords.filter(word => 
    isInLeftCrescent(word.x + WIDTH / 2, word.y + HEIGHT / 2)
  );

  return (
    <div className="w-160">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <g transform={`translate(${WIDTH / 2},${HEIGHT / 2}) rotate(15)`}>
          {crescentWords.map((word, index) => (
            <text
              key={index}
              textAnchor="middle"
              transform={`translate(${word.x}, ${word.y}) rotate(${word.rotate})`}
              style={{
                fontSize: word.size,
                fontFamily: word.font,
                fontWeight: word.weight,
                fill: word.fill || defaultFill,
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
