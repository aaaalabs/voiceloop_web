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
              <h2 className="text-center text-balance mx-auto text-2xl md:text-5xl font-semibold tracking-[-0.015em] text-gray-900 dark:text-gray-100">
                AAA Members: Be a Pioneer in AI-Powered Networking
              </h2>
              <p className="mt-4 max-w-[26rem] text-center mx-auto font-semibold text-base/6 text-gray-600 dark:text-gray-300">
                <Balancer>
                  Join the exclusive VoiceLoop Matchmaker beta and shape the
                  future of community connections.
                </Balancer>
              </p>

              <div className="relative z-10 mx-auto flex justify-center mt-6">
                <Button 
                  href="https://connect.voiceloop.io" 
                  as={Link}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 shadow-sm"
                >
                  Signup
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
