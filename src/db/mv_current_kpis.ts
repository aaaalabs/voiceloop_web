import { createClient } from "@/utils/supabase";
import { Database } from "types/supabase";

export type MvCurrentKpis =
  Database["public"]["Views"]["mv_current_kpis"]["Row"];

export async function getCurrentKpis(): Promise<MvCurrentKpis | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("mv_current_kpis")
    .select("*")
    .single();

  if (error) {
    console.error("Error fetching current KPIs:", error);
    return null;
  }
  return data;
}
