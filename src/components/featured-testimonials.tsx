"use client";
import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Testimonial } from "@/db";

function mapTestimonialsToAnimatedTooltipItems(testimonials: any) {
  return testimonials
    .filter(
      (testimonial): testimonial is Required<Testimonial> =>
        testimonial.name !== null &&
        testimonial.career_stage !== null &&
        testimonial.image_url !== null
    )
    .map((testimonial, index) => ({
      id: index + 1,
      name: `${testimonial.name}_${index}`,
      designation: testimonial.career_stage,
      image: testimonial.image_url,
    }));
}

export function FeaturedTestimonials({ testimonials }: { testimonials: any }) {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip
        items={mapTestimonialsToAnimatedTooltipItems(testimonials.slice(0, 6))}
      />
    </div>
  );
}
