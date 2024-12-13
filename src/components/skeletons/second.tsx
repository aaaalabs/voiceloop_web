"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { getSpotlights } from "@/db/spotlights_view";
import type { Spotlight } from "@/db/spotlights_view";

const LinkedInPost = ({ 
  name, 
  role, 
  spotlight_image_url,
  spotlight_date,
  delay = 0 
}: { 
  name: string;
  role: string;
  spotlight_image_url: string;
  spotlight_date: string;
  delay?: number;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800"
    >
      <div className="relative w-full aspect-square mb-4">
        <Image
          src={spotlight_image_url}
          alt={name}
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-neutral-500">{role}</p>
        </div>
        <span className="text-xs text-neutral-500">
          {new Date(spotlight_date).toLocaleDateString('en-US', { 
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </span>
      </div>
    </motion.div>
  );
};

export const SkeletonTwo = () => {
  const [spotlights, setSpotlights] = useState<Spotlight[]>([]);

  useEffect(() => {
    const loadSpotlights = async () => {
      const data = await getSpotlights(3); // Get latest 3 spotlights
      setSpotlights(data);
    };

    loadSpotlights();
  }, []);

  return (
    <div className="relative h-full w-full">
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background dark:from-background via-background dark:via-background to-transparent w-full pointer-events-none z-10" />
      <div className="p-4 space-y-4 overflow-y-auto max-h-[500px]">
        {spotlights.map((spotlight, index) => (
          <LinkedInPost
            key={index}
            name={spotlight.name || "Anonymous"}
            role={spotlight.career_stage || "Member"}
            spotlight_image_url={spotlight.spotlight_image_url || "/template_assets/tyler.jpeg"}
            spotlight_date={spotlight.spotlight_date || new Date().toISOString()}
            delay={index * 0.2}
          />
        ))}
      </div>
    </div>
  );
};
