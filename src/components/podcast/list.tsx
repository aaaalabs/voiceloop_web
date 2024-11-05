"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { urlFor } from "@/lib/blog";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { PodcastEpisode } from "@/types/podcast";

type PodcastListProps = {
  episodes: PodcastEpisode[];
  onEpisodeSelect: (episode: PodcastEpisode) => void;
  currentEpisode: PodcastEpisode;
};

export const PodcastList = ({ episodes, onEpisodeSelect, currentEpisode }: PodcastListProps) => {
  return (
    <div className="space-y-4">
      {episodes.map((episode) => (
        <motion.button
          key={episode.episodeNumber}
          onClick={() => onEpisodeSelect(episode)}
          className={`relative z-10 w-full text-left p-4 rounded-lg transition-colors ${
            currentEpisode.episodeNumber === episode.episodeNumber
              ? "bg-neutral-100 dark:bg-neutral-800"
              : "bg-white/50 dark:bg-neutral-900/50 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
          }`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex gap-4">
            {/* Episode Thumbnail */}
            <div className="w-20 h-20 flex-shrink-0">
              <Image
                src={urlFor(episode.coverImage).url()}
                alt={episode.title}
                width={80}
                height={80}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Episode Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <span>Episode {episode.episodeNumber}</span>
                <span>•</span>
                <span>{episode.duration}</span>
              </div>
              <h4 className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
                {episode.title}
              </h4>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-1">
                <PortableText value={episode.description} />
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-500 mt-1">
                {format(new Date(episode.publishedAt), "MMM d, yyyy")}
              </div>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}; 