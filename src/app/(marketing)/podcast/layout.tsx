import { type Metadata } from "next";
import { client } from "@/lib/blog";
import PodcastPage from "./page";

export const metadata: Metadata = {
  title: "Podcast - voiceloop | amplify what matters",
  description: "Listen to our podcast about community building and genuine human connections.",
  openGraph: {
    images: ["/social.webp"],
  },
};

async function getPodcastEpisodes() {
  const query = `
    *[_type == "podcast"] | order(episodeNumber desc) {
      title,
      description,
      "audioUrl": audioFile.asset->url,
      publishedAt,
      duration,
      episodeNumber,
      coverImage
    }
  `;

  const data = await client.fetch(query);
  return data;
}

export default async function PodcastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const episodes = await getPodcastEpisodes();

  return <PodcastPage episodes={episodes} />;
} 