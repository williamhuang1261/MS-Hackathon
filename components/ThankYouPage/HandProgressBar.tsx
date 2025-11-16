import handOutline from "@/public/hand.svg";
import Image from "next/image";

interface Props {
  percent: number;
  increment: number;
  handSize: number;
}

const HandProgressBar = ({ percent, increment, handSize }: Props) => {
  const totalPercent = Math.min(percent + increment, 100);

  return (
    <div
      className={`relative w-[${handSize}px] h-[${handSize}px] rounded-full backdrop-blur-xs`}
    >
      {/* Background Outline Layer */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 icon icon-tabler icon-tabler-hand-stop"
        width={handSize}
        height={handSize}
        viewBox="0 0 26 24"
        strokeWidth="0.4"
        stroke="#9a9ae3"
        fill="#0e0d21"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 13v-7.5a1.5 1.5 0 0 1 3 0v7.5" />
        <path d="M11 12.8v-8.5a1.5 1.5 0 0 1 3 0v9.5" />
        <path d="M14 12.8v-7.5a1.5 1.5 0 0 1 3 0v7.5" />
        <path d="M17 12v-4.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" />
        <path
          d="M12.5 18.5c0 0-1.8-1.2-1.8-2.5a1.2 1.2 0 0 1 2.4 0a1.2 1.2 0 0 1 2.4 0c0 1.3-1.8 2.5-1.8 2.5L13.1 18.9z"
          fill="#420427"
          stroke="#cf117c"
        />
      </svg>
      {/* Increment Filled Layer */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 icon icon-tabler icon-tabler-hand-stop"
        width={handSize}
        height={handSize}
        viewBox="0 0 26 24"
        strokeWidth="0.4"
        stroke="#9a9ae3"
        fill="#A8A8D050"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          clipPath: `inset(calc(100% - ${totalPercent + 0.5}%) 0 0 0)`,
          transition: "clip-path 0.3s ease-in-out",
        }}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 13v-7.5a1.5 1.5 0 0 1 3 0v7.5" />
        <path d="M11 12.8v-8.5a1.5 1.5 0 0 1 3 0v9.5" />
        <path d="M14 12.8v-7.5a1.5 1.5 0 0 1 3 0v7.5" />
        <path d="M17 12v-4.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" />
        <path
          d="M12.5 18.5c0 0-1.8-1.2-1.8-2.5a1.2 1.2 0 0 1 2.4 0a1.2 1.2 0 0 1 2.4 0c0 1.3-1.8 2.5-1.8 2.5L13.1 18.9z"
          fill="#cf117c50"
          stroke="#cf117c"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 icon icon-tabler icon-tabler-hand-stop"
        width={handSize}
        height={handSize}
        viewBox="0 0 26 24"
        strokeWidth="0.4"
        stroke="#9a9ae3"
        fill="#8c8ccf"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          clipPath: `inset(calc(100% - ${percent}%) 0 0 0)`,
          transition: "clip-path 0.3s ease-in-out",
        }}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 13v-7.5a1.5 1.5 0 0 1 3 0v7.5" />
        <path d="M11 12.8v-8.5a1.5 1.5 0 0 1 3 0v9.5" />
        <path d="M14 12.8v-7.5a1.5 1.5 0 0 1 3 0v7.5" />
        <path d="M17 12v-4.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" />
        <path
          d="M12.5 18.5c0 0-1.8-1.2-1.8-2.5a1.2 1.2 0 0 1 2.4 0a1.2 1.2 0 0 1 2.4 0c0 1.3-1.8 2.5-1.8 2.5L13.1 18.9z"
          fill="#cf117c"
          stroke="#cf117c"
        />
      </svg>
    </div>
  );
};

export default HandProgressBar;
