"use client";

import React from "react";
import Balancer from "react-wrap-balancer";
import Link from "next/link";
import { Button } from "./button";
import { ChevronRight } from "lucide-react";

export const CTA = () => {
  return (
    <section id="aaa-cta-section" className="py-60 w-full overflow-hidden relative z-30">
      <div className="mx-auto w-full relative z-20 sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem] 
        bg-[#FFFFFF] dark:bg-[rgb(var(--text-secondary))] rounded-[24px] overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-[#E9B893] dark:bg-[#F99D7C] opacity-10 mix-blend-multiply" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#F99D7C] dark:bg-[#E9B893] opacity-10 mix-blend-multiply" />
        </div>

        {/* Content container */}
        <div className="relative overflow-hidden px-6 md:px-8">
          <div className="relative px-6 pb-14 pt-20 sm:px-10 sm:pb-20 lg:px-[4.5rem]">
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium 
                bg-[rgb(var(--background-secondary))] text-[rgb(var(--text-primary))]">
                ⭐ LIMITED TIME AAA CASE STUDY PROJECT
              </span>
            </div>
            
            <h2 className="text-center text-balance mx-auto text-2xl md:text-5xl font-semibold tracking-[-0.015em] text-gray-900 dark:text-gray-100">
            Connect with the perfect AAA members for your journey - At Zero Cost!
            </h2>
            <p className="mt-4 max-w-[42rem] text-center mx-auto font-semibold text-base/6 text-gray-600 dark:text-gray-300">
              <Balancer>
              Connect, Collaborate, Conquer: Turn Brief Chats into Massive Wins
              </Balancer>
            </p>

            <div className="relative z-10 mx-auto flex justify-center mt-12">
              <Button 
                href="https://connect.voiceloop.io" 
                as={Link}
                className="group relative px-10 py-4 text-lg font-semibold
                  bg-[rgb(var(--text-primary))] hover:bg-[rgb(var(--text-secondary))]
                  dark:bg-[rgb(var(--background-primary))] dark:hover:bg-[rgb(var(--background-secondary))]
                  text-[rgb(var(--background-primary))] dark:text-[rgb(var(--text-primary))]
                  transition-all duration-300 rounded-full shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Growing Now
                  <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
