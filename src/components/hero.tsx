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
import { FilloutButton } from "./fillout-button";
import { MapSection } from './map-section';

export const Hero = ({
  currentKpis,
}: {
  currentKpis: MvCurrentKpis | null;
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen pt-20 md:pt-40 relative overflow-hidden">
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
        <FilloutButton />
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
      <MapSection />
    </div>
  );
};
