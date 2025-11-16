"use client";

import Image from "next/image";
import logo from "@/public/athenaLogo.jpg";
import { useRouter } from "@/i18n/navigation";

const Logo = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/");
  };

  return (
    <Image
      src={logo}
      alt="Athena Logo"
      width={220}
      height={220}
      className="rounded-full cursor-pointer hover:opacity-75 transition-opacity"
      onClick={onClick}
    />
  );
};

export default Logo;
