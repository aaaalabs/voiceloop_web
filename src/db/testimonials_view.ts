import { createClient } from "@/utils/supabase";
import { Database } from "types/supabase";

export type Testimonial =
  Database["public"]["Views"]["testimonials_view"]["Row"];

export async function getTestimonials(
  limit: number = 30
): Promise<Testimonial[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("testimonials_view")
    .select("*")
    .limit(limit);

  if (error) {
    console.error("Error fetching random testimonials:", error);
    return [];
  }

  return data || [];
}
