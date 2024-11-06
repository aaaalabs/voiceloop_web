import { createClient } from "@/utils/supabase";
import { Database } from "types/supabase";

export type Spotlight =
  Database["public"]["Views"]["spotlights_view"]["Row"];

export async function getSpotlights(
  limit: number = 30
): Promise<Spotlight[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("spotlights_view")
    .select("*")
    .limit(limit);

  if (error) {
    console.error("Error fetching spotlights:", error);
    return [];
  }

  return data || [];
}
