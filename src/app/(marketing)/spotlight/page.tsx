import { type Metadata } from "next";
import { Background } from "@/components/background";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { SpotlightGrid } from "@/components/spotlight/grid";
import { getSpotlights } from "@/db/spotlights_view";

export const metadata: Metadata = {
  title: "Spotlight - voiceloop | amplify what matters",
  description: "Discover and celebrate the diverse voices and stories within our community.",
  openGraph: {
    images: ["/social.webp"],
  },
};

export default async function SpotlightPage() {
  const spotlights = await getSpotlights(50); // Get up to 50 spotlights

  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-40">
          <Heading as="h1">Spotlight</Heading>
          <Subheading className="text-center">
            Compounding Collections of Community Wisdom
          </Subheading>
        </div>
        <SpotlightGrid spotlights={spotlights} />
      </Container>
    </div>
  );
} 