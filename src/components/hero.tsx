"use client";

import Balancer from "react-wrap-balancer";
import Image from "next/image";
import { Button } from "./button";
import { HiArrowRight } from "react-icons/hi2";
import { Badge } from "./badge";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Link } from "next-view-transitions";
import { getCurrentKpis } from "@/db/mv_current_kpis";
import useSWR from "swr";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "./ui/avatar";

export const Hero = () => {
  const router = useRouter();

  const { data, error } = useSWR("mv_current_kpis", getCurrentKpis, {
    // Move this a hooks file
    refreshInterval: 300000, // Every 5 minutes
    dedupingInterval: 300000, // Prevents duplicate requests within the interval
  });

  console.log(data);

  if (error) {
    console.error("Error fetching current KPIs:", error);
    toast.error("Error fetching current KPIs");
  }

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
        <Badge onClick={() => router.push("/blog/top-5-llm-of-all-time")}>
          We are cool
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
        className="text-2xl md:text-4xl lg:text-8xl font-semibold max-w-6xl mx-auto text-center mt-6 relative z-10"
      >
        <Balancer>
          <div className="flex items-center justify-center flex-wrap gap-2">
            {data?.product_variants_delivered} matches created for{" "}
            <div className="flex -space-x-2 sm:-space-x-3 md:-space-x-4 mx-2">
              {data?.random_image_urls
                ?.filter((url) => url && url.trim() !== "")
                .map((url, index) => (
                  <Avatar
                    key={index}
                    className="border-2 border-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-[70px] lg:h-[70px]"
                  >
                    <AvatarImage src={url} alt={`Avatar ${index + 1}`} />
                  </Avatar>
                ))}
            </div>
            {data?.members} members
          </div>
        </Balancer>
      </motion.h1>
      <motion.p
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
        className="text-center mt-6 text-base md:text-xl text-muted dark:text-muted-dark max-w-3xl mx-auto relative z-10"
      >
        <Balancer>
          Everything AI seamlessly integrated all the modern AI generation tools
          into one platform so that you can generate content with a single
          click.
        </Balancer>
      </motion.p>
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
        <Button>Get started</Button>
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
        <div className="absolute inset-x-0 bottom-0 h-40 w-full bg-gradient-to-b from-transparent via-white to-white dark:via-black/50 dark:to-black scale-[1.1] pointer-events-none" />
        <div className="p-2 bg-white dark:bg-black dark:border-neutral-700 border border-neutral-200 rounded-[24px]">
          <Image
            src="/header.png"
            alt="header"
            width={1920}
            height={1080}
            className="rounded-[20px]"
          />
        </div>
      </div>
    </div>
  );
};
