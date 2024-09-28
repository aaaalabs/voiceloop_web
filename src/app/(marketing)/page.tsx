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
  // const { testimonials, currentKpis } = await fetchConcurrently();
  const testimonials = await getTestimonials();
  const currentKpis = await getCurrentKpis();

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
