"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PlayIcon } from "@heroicons/react/24/solid";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";
import type { Spotlight } from "@/db/spotlights_view";

const PodcastEpisode = ({
  title,
  guest,
  role,
  duration,
  image,
  date,
  delay = 0
}: {
  title: string;
  guest: string;
  role: string;
  duration: string;
  image: string;
  date: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="flex items-center gap-4 p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800"
    >
      <div className="relative flex-shrink-0">
        <Image
          src={image}
          alt={guest}
          width={80}
          height={80}
          className="rounded-lg object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
          <PlayIcon className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="font-medium line-clamp-1">{title}</h3>
        <p className="text-sm text-neutral-500">with {guest}</p>
        <p className="text-sm text-neutral-500">{role}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SpeakerWaveIcon className="w-4 h-4 text-neutral-500" />
            <span className="text-xs text-neutral-500">{duration}</span>
          </div>
          <span className="text-xs text-neutral-500">{new Date(date).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );
};

export const SkeletonThree = () => {
  const episodes = [
    {
      title: "Building Community-First Products",
      guest: "Sarah Chen",
      role: "Product Designer",
      duration: "32:15",
      image: "https://ik.imagekit.io/libralab/VoiceLoop/SPARK_004.png",
      date: "2024-03-15"
    },
    {
      title: "The Art of Community Leadership",
      guest: "Marcus Johnson",
      role: "Community Lead",
      duration: "45:30",
      image: "https://ik.imagekit.io/libralab/VoiceLoop/SPARK_004.png",
      date: "2024-03-14"
    },
    {
      title: "Frontend Development Best Practices",
      guest: "Elena Rodriguez",
      role: "Frontend Developer",
      duration: "28:45",
      image: "https://ik.imagekit.io/libralab/VoiceLoop/SPARK_004.png",
      date: "2024-03-13"
    }
  ];

  return (
    <div className="relative h-full w-full">
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background dark:from-background via-background dark:via-background to-transparent w-full pointer-events-none z-10" />
      <div className="p-4 space-y-4 overflow-y-auto max-h-[500px]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-medium">Recording Live</span>
          </div>
          <div className="text-sm text-neutral-500">{episodes.length} Episodes</div>
        </div>
        {episodes.map((episode, index) => (
          <PodcastEpisode
            key={episode.title}
            {...episode}
            delay={index * 0.2}
          />
        ))}
      </div>
    </div>
  );
};
