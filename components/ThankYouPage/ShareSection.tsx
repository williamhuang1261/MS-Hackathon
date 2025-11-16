import React from "react";

import facebookIcon from "@/public/facebookLogo.svg";
import xIcon from "@/public/xLogo.jpg";
import linkedinIcon from "@/public/linkedinLogo.png";
import instagramIcon from "@/public/instagramLogo.svg";
import Image from "next/image";

const ShareSection = () => {
  return (
    <div className="w-full bg-light-background rounded-lg shadow-lg p-6">
      <h2 className="text-2xl">Share Your Impact</h2>
      <div className="flex gap-4">
        <Image
          src={facebookIcon}
          alt="Facebook"
          width={28}
          height={28}
          className="cursor-pointer rounded-sm"
        />
        <Image
          src={xIcon}
          alt="X"
          width={28}
          height={28}
          className="cursor-pointer rounded-sm"
        />
        <Image
          src={linkedinIcon}
          alt="LinkedIn"
          width={28}
          height={28}
          className="cursor-pointer rounded-sm"
        />
        <Image
          src={instagramIcon}
          alt="Instagram"
          width={28}
          height={28}
          className="cursor-pointer rounded-sm"
        />
      </div>
    </div>
  );
};
export default ShareSection;
