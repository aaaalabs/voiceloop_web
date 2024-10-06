"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex items-center text-sm mr-4 text-black px-2 py-1 relative z-20"
    >
      <Image
        src="/vl_black.png"
        alt="Voiceloop Logo"
        width={52}
        height={52}
        className=""
      />
    </Link>
  );
};
