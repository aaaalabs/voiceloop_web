"use client";

import React from "react";
import Balancer from "react-wrap-balancer";
import Link from "next/link";
import { Button } from "./button";

export const CTA = () => {
  return (
    <section id="aaa-cta-section" className="py-60 w-full overflow-hidden relative z-30">
      <div className="bg-white dark:bg-black">
        <div className="mx-auto w-full relative z-20 sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-[24px] overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-blue-400 dark:bg-blue-500 opacity-10 mix-blend-multiply" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-purple-400 dark:bg-purple-500 opacity-10 mix-blend-multiply" />
          </div>

          {/* Content container */}
          <div className="relative overflow-hidden px-6 md:px-8">
            <div className="relative px-6 pb-14 pt-20 sm:px-10 sm:pb-20 lg:px-[4.5rem]">
              <div className="flex justify-center mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
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
                  className="group relative px-10 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 rounded-full shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-0.5"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Growing Now
                    <svg 
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 rounded-full bg-white/20 blur-sm group-hover:blur-md transition-all duration-300" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
