import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { Background } from "@/components/background";
// import { HeroHighlightDemo } from "@/components/hero";
// import { FlipWordsDemo } from "@/components/hero";
// import { Features } from "@/components/features";
import { Companies } from "@/components/companies";
import { GridFeatures } from "@/components/grid-features";
import { Testimonials } from "@/components/testimonials";
import { CTA } from "@/components/cta";
import {
  getTestimonials,
  getCurrentKpis,
  type Testimonial,
  type MvCurrentKpis,
  getLatestBlogPost,
} from "@/db";
import { Suspense } from "react";
import { FlowchartEmbed } from "@/components/flowchart-embed";
import { MapSection } from "@/components/map-section";
import { FilloutEmbed } from "@/components/fillout-embed";
import { CalendarSection } from "@/components/calendar-section";

// ! This is the best version but NextJS keeps throwing an DynamicServerError
// async function fetchConcurrently(): Promise<{
//   testimonials: Testimonial[];
//   currentKpis: MvCurrentKpis | null;
// }> {
//   const testimonials = getTestimonials();
//   const currentKpis = getCurrentKpis();

//   const results = await Promise.allSettled([testimonials, currentKpis]);

//   results.forEach((result, index) => {
//     if (result.status === "rejected") {
//       console.error(`Error in Promise ${index + 1}:`, result.reason);
//     }
//   });

//   return {
//     testimonials: results[0].status === "fulfilled" ? results[0].value : [],
//     currentKpis: results[1].status === "fulfilled" ? results[1].value : null,
//   };
// }

// export default fetchConcurrently;

// ! This version works but Promise all is risky because if one fails, the other one won't be fetched
// async function fetchData() {
//   // ? Is this risky because if one fails, the other one won't be fetched?
//   const testimonials = getTestimonials();
//   const currentKpis = getCurrentKpis();
//   return Promise.all([testimonials, currentKpis]);
// }

export default async function Home() {
  const [testimonials, currentKpis] = await Promise.all([
    getTestimonials(),
    getCurrentKpis(),
  ]);

  return (
    <div className="relative">
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Background />
      </div>
      <Container className="flex min-h-screen flex-col items-center justify-between">
        <Hero currentKpis={currentKpis} />
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The Perfect Blend of AI & Human Touch
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Six powerful tools working in harmony to transform new members into engaged community champions
          </p>
        </div>
        <GridFeatures />
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by members worldwide
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            See what others are saying about their experience
          </p>
        </div>
        {testimonials.length > 0 ? (
          <Testimonials testimonials={testimonials} />
        ) : (
          <div className="text-center text-gray-600">No testimonials available at the moment.</div>
        )}
      </Container>
      <div className="relative">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <Background />
        </div>
        <CTA />
        <CalendarSection />
      </div>
    </div>
  );
}
