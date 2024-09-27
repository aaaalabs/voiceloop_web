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
import fetchConcurrently from "@/hooks/fetch_concurrent";
async function fetchData() {
  // ? Is this risky because if one fails, the other one won't be fetched?
  const testimonials = getTestimonials();
  const currentKpis = getCurrentKpis();
  return Promise.all([testimonials, currentKpis]);
}

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
