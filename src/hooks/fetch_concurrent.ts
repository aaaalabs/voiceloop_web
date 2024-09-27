import {
  getCurrentKpis,
  getTestimonials,
  MvCurrentKpis,
  Testimonial,
} from "@/db";

async function fetchConcurrently(): Promise<{
  testimonials: Testimonial[];
  currentKpis: MvCurrentKpis | null;
}> {
  const testimonials = getTestimonials();
  const currentKpis = getCurrentKpis();

  const results = await Promise.allSettled([testimonials, currentKpis]);

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

export default fetchConcurrently;
