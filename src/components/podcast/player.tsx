"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { urlFor } from "@/lib/blog";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AudioPlayer } from "./audio-player";
import type { PodcastEpisode } from "@/types/podcast";

export const PodcastPlayer = ({ episode }: { episode: PodcastEpisode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Cover Image and Player */}
        <div className="w-full md:w-48 flex-shrink-0">
          <div className="sticky top-4">
            {episode.coverImage && (
              <Image
                src={urlFor(episode.coverImage).url()}
                alt={episode.title}
                width={192}
                height={192}
                className="w-full aspect-square object-cover rounded-lg shadow-md"
              />
            )}
            <div className="mt-4">
              <AudioPlayer audioUrl={episode.audioUrl} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div 
            className="bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm rounded-lg p-6"
            animate={{ 
              minHeight: isExpanded ? "auto" : "16rem",
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Episode Info */}
            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              <span>Episode {episode.episodeNumber}</span>
              <span>•</span>
              <span>{format(new Date(episode.publishedAt), "MMM d, yyyy")}</span>
              <span>•</span>
              <span>{episode.duration}</span>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-4">{episode.title}</h2>

            {/* Description with expand/collapse */}
            <div className="relative">
              <motion.div
                initial={false}
                animate={{ 
                  height: isExpanded ? "auto" : "6rem",
                  opacity: 1 
                }}
                className="overflow-hidden"
                transition={{ duration: 0.3 }}
              >
                <div className="prose prose-sm dark:prose-invert">
                  <PortableText value={episode.description} />
                </div>
              </motion.div>

              {/* Gradient fade for collapsed state */}
              {!isExpanded && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/50 dark:from-neutral-800/50 to-transparent"
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Expand/Collapse button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 mt-4 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
            >
              {isExpanded ? (
                <>
                  Show less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Read more <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};