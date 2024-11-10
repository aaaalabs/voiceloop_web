"use client";

import { FilloutEmbed } from "./fillout-embed";

export function CalendarSection() {
  return (
    <div id="calendar-section" className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative z-30 text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Schedule Your Free Strategy Call
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Let's discuss how we can help grow your community
        </p>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-[1200px] h-[90vh] md:h-[800px]">
          <FilloutEmbed filloutId="jwmqMMXUsnus" />
        </div>
      </div>
    </div>
  );
} 