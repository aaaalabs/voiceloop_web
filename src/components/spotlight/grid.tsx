"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Spotlight } from "@/db/spotlights_view";
import { cn } from "@/lib/utils";
import { useState } from "react";

const variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export function SpotlightGrid({ spotlights }: { spotlights: Spotlight[] }) {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  
  // Sort spotlights by date, newest first
  const sortedSpotlights = [...spotlights].sort((a, b) => 
    new Date(b.spotlight_date ?? '1970-01-01').getTime() - new Date(a.spotlight_date ?? '1970-01-01').getTime()
  );

  const handleSpotlightClick = (index: number) => {
    if (index !== featuredIndex) {
      setFeaturedIndex(index);
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full"
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
    >
      <AnimatePresence mode="popLayout">
        {sortedSpotlights.map((spotlight, index) => (
          <motion.div
            key={spotlight.name ?? ""}
            layoutId={spotlight.name ?? ""}
            custom={index}
            variants={variants}
            onClick={() => handleSpotlightClick(index)}
            whileHover={{ scale: 1.02 }}
            className={cn(
              "relative overflow-hidden rounded-xl cursor-pointer",
              index === featuredIndex 
                ? "col-span-2 row-span-2 aspect-square" 
                : "aspect-square"
            )}
          >
            <Image
              src={spotlight.spotlight_image_url ?? ""}
              alt={spotlight.name ?? "Community member"}
              fill
              className="object-cover"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
} 