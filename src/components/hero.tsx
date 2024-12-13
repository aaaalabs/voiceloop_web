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
import { FlowchartEmbed } from './flowchart-embed';

export const Hero = ({
  currentKpis,
}: {
  currentKpis: MvCurrentKpis | null;
}) => {
  const router = useRouter();

  const scrollToCalendar = () => {
    const element = document.getElementById('calendar-section');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToCTA = () => {
    const element = document.getElementById('aaa-cta-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-3 xxs:px-4 sm:px-8 flex flex-col min-h-screen pt-32 xxs:pt-30 sm:pt-32 md:pt-48 relative">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.9 }}
        className="text-center mb-6"
      >
        <Link 
          href="/blog/the-hidden-power-of-retention"
          className="group bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-full px-4 py-2 inline-block hover:bg-[#3D4F4F]/10 dark:hover:bg-[#3D4F4F]/20 transition-colors"
        >
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:text-[#3D4F4F] transition-colors">
            The Hidden Power of Retention: Why Reducing Churn Beats Acquisition 📊
          </p>
        </Link>
      </motion.div>

      <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5 }}
        className="text-3xl xxs:text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.01em] leading-[1.1] sm:leading-tight max-w-6xl mx-auto text-center relative z-10 antialiased"
      >
        <Balancer>
          Stop Losing Members<br />
          <span className="relative">
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ 
                backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"],
              }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                ease: "easeOut"
              }}
              className="bg-gradient-to-r from-[#E9B893] via-[#F99D7C] to-[#E9B893] 
              bg-[size:300%] bg-clip-text text-transparent"
            >
              Start Growing Revenue
            </motion.span>
          </span>
        </Balancer>
      </motion.h1>

      <motion.p
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5 }}
        className="text-2xl sm:text-3xl font-semibold text-[#A3A692] max-w-2xl mx-auto text-center mt-8 mb-12"
      >
        <Balancer>
          Boost Your Revenue by{" "}
          <span className="text-blue-600 dark:text-blue-400">88%</span> in Just{" "}
          <span className="whitespace-nowrap">One Year</span> with 2% Monthly Churn Reduction.
        </Balancer>
      </motion.p>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 }}
        className="text-center mt-8 sm:mt-12 md:mt-14 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto relative z-10 px-4"
      >
        <div className="flex items-center justify-center flex-wrap gap-2">
          <span className="text-blue-600 dark:text-blue-400 text-2xl font-semibold">
            {currentKpis?.product_variants_delivered}{" "}
          </span>
          Matches in 3 Month for{" "}
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
          <span className="whitespace-nowrap">
            <span className="text-blue-600 dark:text-blue-400 text-2xl font-semibold">
              {currentKpis?.members}
            </span>{" "}
            Thriving Entrepeneurs Worldwide
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 justify-center mt-8 sm:mt-12 md:mt-16 relative z-20 px-4"
      >
        <Button
          variant="primary"
          onClick={scrollToCalendar}
          className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-14 py-5 sm:py-6 
            font-medium transition-all duration-300
            bg-[rgb(var(--text-primary))] hover:bg-[rgb(var(--text-secondary))]
            text-[rgb(var(--background-primary))]
            dark:bg-[rgb(var(--background-primary))] dark:hover:bg-[rgb(var(--background-secondary))]
            dark:text-[rgb(var(--text-primary))]
            shadow-lg hover:shadow-xl rounded-full border-0"
        >
          Book Free Strategy Call
        </Button>
        
        <Button
          variant="simple"
          onClick={scrollToCTA}
          className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-14 py-5 sm:py-6 
            font-medium transition-all duration-200
            bg-white/50 hover:bg-white/80
            text-neutral-900 border border-neutral-200
            dark:bg-white/10 dark:hover:bg-white/20
            dark:text-white dark:border-white/20
            backdrop-blur-sm"
        >
          <span>Join AAA Beta</span>
          <HiArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>

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
