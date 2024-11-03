// KPI History exports
export {
  createKpiHistory,
  getKpiHistory,
  getAllKpiHistory,
  updateKpiHistory,
  deleteKpiHistory,
} from "./kpi_history";

// Current KPIs export
export { getCurrentKpis, type MvCurrentKpis } from "./mv_current_kpis";

// Testimonials View export
export { getTestimonials, type Testimonial } from "./testimonials_view";

// Add any other exports from additional files in the db folder here

export const getLatestBlogPost = async () => {
  // Implement your blog post fetching logic here
  return {
    title: "Sample Title",
    slug: "sample-slug",
    // ... other blog post properties
  };
};
