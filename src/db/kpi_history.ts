import { createClient } from "@/utils/supabase/server";
import { Database } from "types/supabase";

type KpiHistory = Database["public"]["Tables"]["kpi_history"]["Row"];
type KpiHistoryInsert = Database["public"]["Tables"]["kpi_history"]["Insert"];
type KpiHistoryUpdate = Database["public"]["Tables"]["kpi_history"]["Update"];

// Create
export async function createKpiHistory(
  kpiData: KpiHistoryInsert
): Promise<KpiHistory | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("kpi_history")
    .insert(kpiData)
    .select()
    .single();

  if (error) {
    console.error("Error creating KPI history:", error);
    return null;
  }

  return data;
}

// Read
export async function getKpiHistory(
  timestamp: string
): Promise<KpiHistory | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("kpi_history")
    .select("*")
    .eq("timestamp", timestamp)
    .single();

  if (error) {
    console.error("Error fetching KPI history:", error);
    return null;
  }

  return data;
}

// Read All
export async function getAllKpiHistory(): Promise<KpiHistory[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("kpi_history")
    .select("*")
    .order("timestamp", { ascending: false });

  if (error) {
    console.error("Error fetching all KPI history:", error);
    return [];
  }

  return data || [];
}

// Update
export async function updateKpiHistory(
  timestamp: string,
  kpiData: KpiHistoryUpdate
): Promise<KpiHistory | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("kpi_history")
    .update(kpiData)
    .eq("timestamp", timestamp)
    .select()
    .single();

  if (error) {
    console.error("Error updating KPI history:", error);
    return null;
  }

  return data;
}

// Delete
export async function deleteKpiHistory(timestamp: string): Promise<boolean> {
  const supabase = createClient();

  const { error } = await supabase
    .from("kpi_history")
    .delete()
    .eq("timestamp", timestamp);

  if (error) {
    console.error("Error deleting KPI history:", error);
    return false;
  }

  return true;
}
