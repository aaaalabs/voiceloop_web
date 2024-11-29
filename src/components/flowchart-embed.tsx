"use client";
import { useEffect, useState } from "react";

interface FlowchartEmbedProps {
  className?: string;
}

export const FlowchartEmbed: React.FC<FlowchartEmbedProps> = ({ className }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // 640px is Tailwind's 'sm' breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={`w-full max-w-5xl mx-auto mt-16 sm:mt-32 mb-8 sm:mb-32 ${className}`}>
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          How it works
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          See how our tools work together seamlessly (click through)
        </p>
      </div>
      <div className="px-0 sm:px-8 mt-8">
        <div className={`p-0 sm:p-4 border border-neutral-200 bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 rounded-none sm:rounded-[32px] relative`}>
          <div className="relative bg-[rgb(var(--background-primary))] dark:bg-[rgb(var(--background-primary))] dark:border-neutral-700 border-0 sm:border border-neutral-200 rounded-none sm:rounded-[24px] overflow-hidden">
            <div className="relative w-full" style={{ paddingBottom: isMobile ? "91%" : "calc(56.67% + 60px)" }}>
              <iframe
                src={`/flowcharts/${isMobile ? 'mm_004_mobile.html' : 'mm_004.html'}?link_target=parent&embed=1&ui=min&toolbar=0&nav=0`}
                className="absolute inset-0 w-full h-full rounded-none sm:rounded-xl border-0 sm:border border-neutral-200 dark:border-neutral-800 sm:py-7.5 sm:px-10"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 