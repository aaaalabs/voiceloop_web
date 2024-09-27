import { createClient as createServerClient } from "./server";
import { createClient as createBrowserClient } from "./client";

export function createClient() {
  return typeof window === "undefined"
    ? createServerClient()
    : createBrowserClient();
}
