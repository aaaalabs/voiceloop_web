import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { Background } from "@/components/background";
// import { Features } from "@/components/features";
// import { Companies } from "@/components/companies";
import { GridFeatures } from "@/components/grid-features";
import { Testimonials } from "@/components/testimonials";
import { CTA } from "@/components/cta";
import {
  getTestimonials,
  getCurrentKpis,
  type Testimonial,
  type MvCurrentKpis,
} from "@/db";

//! # Why doesn't NEXT JS do this by default?
// export const dynamic = "force-dynamic";

async function fetchConcurrently(): Promise<{
  testimonials: Testimonial[];
  currentKpis: MvCurrentKpis | null;
}> {
  const results = await Promise.allSettled([
    getTestimonials(),
    getCurrentKpis(),
  ]);

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(`Error in Promise ${index + 1}:`, result.reason);
    }
  });

  return {
    testimonials: results[0].status === "fulfilled" ? results[0].value : [],
    currentKpis: results[1].status === "fulfilled" ? results[1].value : null,
  };
}

export default async function Home() {
  const { testimonials, currentKpis } = await fetchConcurrently();

  return (
    <div className="relative">
      <div className="absolute inset-0 h-full w-full overflow-hidden ">
        <Background />
      </div>
      <Container className="flex min-h-screen flex-col items-center justify-between ">
        <Hero currentKpis={currentKpis} />
        {/* <Companies /> */}
        {/* <Features /> */}
        <GridFeatures />
        <Testimonials testimonials={testimonials} />
      </Container>
      <div className="relative">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <Background />
        </div>
        <CTA />
      </div>
    </div>
  );
}
