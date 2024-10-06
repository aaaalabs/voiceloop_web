"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useTheme } from "next-themes";

export const Logo = () => {
  const { theme } = useTheme();

  return (
    <Link
      href="/"
      className="font-normal flex items-center text-sm mr-4 text-black px-2 py-1 relative z-20"
    >
      <Image
        src={theme === "dark" ? "/vl_white.svg" : "/vl_black.svg"}
        alt="voiceloop | amplify what matters."
        width={24}
        height={24}
        className=""
      />
         
           <span className="font-medium text-black dark:text-white"> &nbsp;voiceloop</span>
    </Link>
  );
};
