"use client";

import { FilloutStandardEmbed } from "@fillout/react";
import "@fillout/react/style.css";

export function FilloutEmbed({ filloutId }: { filloutId: string }) {
  return (
    <div className="relative z-20 w-full h-full">
      <FilloutStandardEmbed filloutId={filloutId} />
    </div>
  );
} 