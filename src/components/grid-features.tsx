"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { features } from "@/constants/features";
import Image from "next/image";

export const GridFeatures = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex justify-center w-full relative z-10 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-[#F3EDE5] dark:bg-[#3D4F4F] rounded-2xl overflow-hidden">
        {features.map((feature, index) => {
          const icon = feature.iconLight && feature.iconDark
            ? (resolvedTheme === "dark" || theme === "dark")
              ? feature.iconDark
              : feature.iconLight
            : feature.iconLight;

          return (
            <Feature
              key={feature.title}
              {...feature}
              index={index}
              icon={icon}
            />
          );
        })}
      </div>
    </div>
  );
};

// Feature component to display individual feature
const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: string;
  index: number;
}) => {
  // Find the first colon to bold the initial part of the description
  const colonIndex = description.indexOf(": ");
  const hasColon = colonIndex !== -1;

  const boldText = hasColon ? description.substring(0, colonIndex + 1) : "";
  const restOfDescription = hasColon
    ? description.substring(colonIndex + 2)
    : description;

  return (
    <div
      className={`flex flex-col lg:border-r py-10 relative group dark:border-neutral-800 ${
        index === 0 || index === 4 ? "lg:border-l dark:border-neutral-800" : ""
      } ${index < 4 ? "lg:border-b dark:border-neutral-800" : ""}`}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#F3EDE5] dark:from-[#1D3640] to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[#F3EDE5] dark:from-[#1D3640] to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10">
        <Image src={icon} alt={title} width={48} height={48} />
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 w-1 rounded-tr-full rounded-br-full bg-[#A3A692] dark:bg-[#3D4F4F] group-hover:bg-[#F99D7C] transition duration-200" />
        <span className="group-hover:translate-x-2 transition duration-200 inline-block">
          {title}
        </span>
      </div>
      <p className="text-sm text-muted dark:text-muted-dark max-w-xs mx-auto relative z-10 px-10">
        {boldText && <span className="font-semibold">{boldText} </span>}
        {restOfDescription}
      </p>
    </div>
  );
};
