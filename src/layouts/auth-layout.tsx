import { cn } from "@/lib/utils";
import Image from "next/image";
import { useId } from "react";
import { motion } from "framer-motion";
import { HorizontalGradient } from "@/components/horizontal-gradient";
import { FeaturedTestimonials } from "@/components/featured-testimonials";

import placerholderVideo from "@v/placerholder_video.mp4";
import Video from "next-video";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
        {children}
        <div className="relative w-full z-20 hidden md:flex border-l border-neutral-100 dark:border-neutral-800 overflow-hidden bg-gray-50 dark:bg-neutral-900 items-center justify-center">
          <div className="p-8">
            {
              <Video
                src={placerholderVideo}
                style={{ width: "100%", height: "100%" }}
                className="rounded-lg"
                autoPlay
                loop
              />
            }
          </div>
          {/* <HorizontalGradient className="top-20" />
          <HorizontalGradient className="bottom-20" />
          <HorizontalGradient className="-right-80 transform rotate-90 inset-y-0 h-full scale-x-150" />
          <HorizontalGradient className="-left-80 transform rotate-90 inset-y-0 h-full scale-x-150" /> */}
        </div>
      </div>
    </>
  );
}
