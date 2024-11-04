"use client";

import React from "react";
import Balancer from "react-wrap-balancer";
import { Button } from "./button";
import { HiArrowRight } from "react-icons/hi2";
import { Badge } from "./badge";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Link } from "next-view-transitions";
import { MvCurrentKpis } from "@/db";
import { Avatar, AvatarImage } from "./ui/avatar";
import { getOptimizedImageUrl } from "@/utils/imageKit";
import { MapSection } from './map-section';

export const Hero = ({
  currentKpis,
}: {
  currentKpis: MvCurrentKpis | null;
}) => {
  const router = useRouter();

  return (
    <div className="max-w-[1200px] mx-auto px-3 xxs:px-4 sm:px-8 flex flex-col min-h-screen pt-32 xxs:pt-30 sm:pt-32 md:pt-48 relative">
      <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5 }}
        className="text-5xl xxs:text-6xl xs:text-7xl sm:text-8xl md:text-9xl lg:text-11xl font-black tracking-[-0.01em] leading-[0.9] sm:leading-none max-w-6xl mx-auto text-center relative z-10 antialiased px-2 xxs:px-4"
      >
        <Balancer>Re&#8209;humanize.</Balancer>
      </motion.h1>
      
      <motion.h2
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5 }}
        className="text-xl xs:text-2xl sm:text-3xl md:text-[2.75rem] lg:text-[3rem] font-medium tracking-[-0.02em] max-w-6xl mx-auto text-center mt-8 sm:mt-[10vh] relative z-10 text-muted dark:text-muted-dark px-4"
      >
        <Balancer>
          <div className="mb-2 sm:mb-3">Cut Noise.</div>
          <div>Find Signal.</div>
        </Balancer>
      </motion.h2>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 }}
        className="text-center mt-8 sm:mt-12 md:mt-14 text-sm sm:text-base md:text-lg text-muted dark:text-muted-dark max-w-3xl mx-auto relative z-10 px-4"
      >
        <div className="flex items-center justify-center flex-wrap gap-2">
          <span className="text-primary-600 dark:text-primary-400 text-xl font-medium">
            {currentKpis?.product_variants_delivered}{" "}
          </span>
          connections made for{" "}
          <div className="flex -space-x-2 sm:-space-x-3 mx-2">
            {currentKpis?.random_image_urls
              ?.filter((url) => url && url.trim() !== "")
              .map((url, index) => (
                <Avatar
                  key={index}
                  className="border-2 border-white w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9"
                >
                  <AvatarImage
                    src={getOptimizedImageUrl(url, 50)}
                    alt={`Avatar ${index + 1}`}
                  />
                </Avatar>
              ))}
          </div>
          <span className="text-primary-600 dark:text-primary-400 text-xl font-medium">{currentKpis?.members}</span>{" "}
          community members
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 justify-center mt-8 sm:mt-12 md:mt-16 relative z-10 px-4"
      >
        <Button
          variant="primary"
          as="a"
          href="https://voiceloop.fillout.com/t/jwmqMMXUsnus"
          className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-14 py-5 sm:py-6 transition-all duration-200 hover:scale-[1.02]"
        >
          Book a Demo
        </Button>
        <Button
          variant="simple"
          as={Link}
          href="https://connect.voiceloop.io/"
          className="w-full sm:w-auto flex items-center justify-center group text-lg sm:text-xl px-8 sm:px-14 py-5 sm:py-6 transition-all duration-200 text-muted/80 dark:text-muted-dark/80"
        >
          <span>See AAA Case Study</span>
          <HiArrowRight className="text-muted/70 group-hover:translate-x-1 stroke-[1px] h-5 w-5 transition-transform duration-200 dark:text-muted-dark/70 ml-2 relative top-[1px]" />
        </Button>
      </motion.div>
      <MapSection />
    </div>
  );
};

export const metadata = {
  title: "Signup - voiceloop | amplify what matters",
  description: "Re-humanize your community with VoiceLoop. We use AI to cut the noise and amplify what matters - genuine human connections.",
  openGraph: {
    images: ["https://ik.imagekit.io/libralab/VoiceLoop/social"],
  },
};
