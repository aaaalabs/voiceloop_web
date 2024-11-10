import { type Metadata } from "next";
import { Background } from "@/components/background";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import MapFrame from "@/components/map-frame";

export const metadata: Metadata = {
  title: "Community Map - voiceloop | amplify what matters",
  description: "Discover our global community of VoiceLoop users around the world.",
  openGraph: {
    images: ["/social.webp"],
  },
};

export default function MapPage() {
  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-40">
          <Heading as="h1">Community Map</Heading>
          <Subheading className="text-center">
            Loved by Community Members around the World
          </Subheading>
        </div>
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="px-4 sm:px-8">
            <div className="p-2 sm:p-4 border border-neutral-200 bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 rounded-2xl sm:rounded-[32px] relative">
              <div className="relative bg-white dark:bg-black dark:border-neutral-700 border border-neutral-200 rounded-xl sm:rounded-[24px] overflow-hidden">
                <div className="relative w-full aspect-[2/3] sm:aspect-video">
                  <MapFrame />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
} 