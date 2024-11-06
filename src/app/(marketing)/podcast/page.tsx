"use client";

import { useState } from "react";
import { Background } from "@/components/background";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { PodcastPlayer } from "@/components/podcast/player";
import { PodcastList } from "@/components/podcast/list";
import type { PodcastEpisode } from "@/types/podcast";
import { IconBrandSpotify, IconRss } from "@tabler/icons-react";

export default function PodcastPage({ episodes }: { episodes: PodcastEpisode[] }) {
  const [currentEpisode, setCurrentEpisode] = useState<PodcastEpisode>(episodes[0]);

  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-40">
          <Heading as="h1">Podcast</Heading>
          <Subheading className="text-center">
            Join us as we explore Community Building and Human Connections
          </Subheading>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          <PodcastPlayer episode={currentEpisode} />
          {episodes.length > 1 && (
            <PodcastList 
              episodes={episodes.filter(ep => ep.episodeNumber !== currentEpisode.episodeNumber)}
              onEpisodeSelect={setCurrentEpisode}
              currentEpisode={currentEpisode}
            />
          )}
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <a 
              href="https://open.spotify.com/show/1BD4pUfxWWyj9yYGpvE9Oe?si=a7385aadc49e4483"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-green-500 dark:text-neutral-400 dark:hover:text-green-400 transition-colors"
            >
              <IconBrandSpotify className="w-6 h-6" />
              <span className="sr-only">Follow us on Spotify</span>
            </a>
            <a 
              href="https://anchor.fm/s/fcd7c81c/podcast/rss"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-orange-500 dark:text-neutral-400 dark:hover:text-orange-400 transition-colors"
            >
              <IconRss className="w-6 h-6" />
              <span className="sr-only">RSS Feed</span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
} 