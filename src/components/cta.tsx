import React from "react";
import Balancer from "react-wrap-balancer";
import Link from "next/link";
import { Button } from "./button";

export const CTA = () => {
  return (
    <section className="py-60 w-full overflow-hidden relative z-30">
      <div className="bg-white dark:bg-black">
        <div className="mx-auto w-full relative z-20 sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem] bg-gradient-to-br from-[#FDF6F0] to-[#FFD4CC] rounded-[24px] overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-[#89A0A5] opacity-15 mix-blend-multiply" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#FF9B8B] opacity-15 mix-blend-multiply" />
          </div>

          {/* Content container */}
          <div className="relative overflow-hidden px-6 md:px-8">
            <div className="relative px-6 pb-14 pt-20 sm:px-10 sm:pb-20 lg:px-[4.5rem]">
              <h2 className="text-center text-balance mx-auto text-2xl md:text-5xl font-semibold tracking-[-0.015em] text-[#1F2937]">
                AAA Members: Be a Pioneer in AI-Powered Networking
              </h2>
              <p className="mt-4 max-w-[26rem] text-center mx-auto font-semibold text-base/6 text-[#4B5563]">
                <Balancer>
                  Join the exclusive VoiceLoop Matchmaker beta and shape the
                  future of community connections.
                </Balancer>
              </p>

              <div className="relative z-10 mx-auto flex justify-center mt-6">
                <Button 
                  href="https://connect.voiceloop.io" 
                  as={Link}
                  className="bg-[#1F2937] text-[#FDF6F0] hover:bg-[#374151] transition-all duration-300 shadow-sm"
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
