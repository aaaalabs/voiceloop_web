"use client";

import Balancer from "react-wrap-balancer";
import Image from "next/image";
import { Button } from "./button";
import { HiArrowRight } from "react-icons/hi2";
import { Badge } from "./badge";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Link } from "next-view-transitions";
import { MvCurrentKpis } from "@/db";
import { Avatar, AvatarImage } from "./ui/avatar";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { FlipWords } from "./ui/flip-words";
import Video from "next-video";
import PlacerholderVideo from "@v/placerholder_video.mp4";
import { getOptimizedImageUrl } from "@/utils/imageKit";

export function FlipWordsDemo() {
  const words = ["colleague", "partner", "member", "human"];

  return (
    <div className="h-[40rem] flex justify-center items-center px-4">
      <div className="text-3xl md:text-4xl lg:text-8xl font-bold max-w-6xl mx-auto text-center mt-6 relative z-10">
        Connect with the perfect <FlipWords words={words} /> <br />
        for your journey.
      </div>
    </div>
  );
}

export function HeroHighlightDemo() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-3xl md:text-4xl lg:text-8xl font-bold max-w-6xl mx-auto text-center mt-6 relative z-10"
      >
        Connect with the perfect human for your journey{" "}
        <Highlight className="text-black dark:text-white">
          {" "}
          - At Zero Cost!{" "}
        </Highlight>
      </motion.h1>
    </HeroHighlight>
  );
}

export const Hero = ({
  currentKpis,
}: {
  currentKpis: MvCurrentKpis | null;
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen  pt-20  md:pt-40 relative overflow-hidden">
      <motion.div
        initial={{
          y: 40,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          ease: "easeOut",
          duration: 0.5,
        }}
        className="flex justify-center"
      >
        <Badge onClick={() => router.push("https://www.aaaaccelerator.com/")}>
          First Case Study started in the AAA Accelerator
        </Badge>
      </motion.div>
      <motion.h1
        initial={{
          y: 40,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          ease: "easeOut",
          duration: 0.5,
        }}
        className="text-3xl md:text-4xl lg:text-8xl font-bold max-w-6xl mx-auto text-center mt-6 relative z-10"
      >
        <Balancer>Cut the Noise, Amplify What Matters</Balancer>
      </motion.h1>
      <motion.div
        initial={{
          y: 40,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          ease: "easeOut",
          duration: 0.5,
          delay: 0.2,
        }}
        className="text-center mt-6 text-base md:text-xl text-muted font-medium dark:text-muted-dark max-w-3xl mx-auto relative z-10"
      >
        <div className="flex items-center justify-center flex-wrap gap-2">
          <span className="text-primary font-bold">
            {currentKpis?.product_variants_delivered}{" "}
          </span>
          connections made for{" "}
          <div className="flex -space-x-2 sm:-space-x-3 md:-space-x-4 mx-2">
            {currentKpis?.random_image_urls
              ?.filter((url) => url && url.trim() !== "")
              .map((url, index) => (
                <Avatar
                  key={index}
                  className="border-2 border-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-[30px] lg:h-[30px]"
                >
                  <AvatarImage
                    src={getOptimizedImageUrl(url, 50)}
                    alt={`Avatar ${index + 1}`}
                  />
                </Avatar>
              ))}
          </div>
          <span className="text-primary font-bold">{currentKpis?.members}</span>{" "}
          community members
        </div>
      </motion.div>
      <motion.div
        initial={{
          y: 80,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          ease: "easeOut",
          duration: 0.5,
          delay: 0.4,
        }}
        className="flex items-center gap-4 justify-center mt-6 relative z-10"
      >
        <Button>Book a Demo</Button>
        <Button
          variant="simple"
          as={Link}
          href="/contact"
          className="flex space-x-2 items-center group"
        >
          <span>Contact us</span>
          <HiArrowRight className="text-muted group-hover:translate-x-1 stroke-[1px] h-3 w-3 transition-transform duration-200 dark:text-muted-dark" />
        </Button>
      </motion.div>
      <div className="p-4 border border-neutral-200 bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 rounded-[32px] mt-20 relative">
        <div className="absolute inset-x-0 bottom-0 h-45 w-full bg-gradient-to-b from-transparent via-white to-white dark:via-black/50 dark:to-black scale-[1.1] pointer-events-none" />
        <div className="relative bg-white dark:bg-black dark:border-neutral-700 border border-neutral-200 rounded-[24px] overflow-hidden">
          <div className="absolute inset-0 -m-6">
            <Video
              src={PlacerholderVideo}
              autoPlay
              muted
              loop
              className="w-[calc(100%+32px)] h-[calc(100%+32px)] object-cover"
            />
          </div>
          <div className="relative aspect-video" />{" "}
          {/* Placeholder to maintain aspect ratio */}
        </div>
      </div>
    </div>
  );
};
