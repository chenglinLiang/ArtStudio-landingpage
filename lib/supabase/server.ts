import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service-role key.
 *
 * SECURITY: the service-role key bypasses Row Level Security. It must NEVER
 * reach the browser. The env var has no NEXT_PUBLIC_ prefix, so Next.js will
 * not inline it into any client bundle. Only import this from server code
 * (route handlers, server components, server actions).
 *
 * Returns null when the env vars are missing, so callers can return a clear
 * "not configured" response instead of crashing.
 */
export function getSupabaseServer(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
