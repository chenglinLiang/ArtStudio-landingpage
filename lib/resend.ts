import { Resend } from "resend";

/**
 * Server-only Resend client.
 *
 * SECURITY: the API key can send mail on your behalf and must NEVER reach the
 * browser. The env var has no NEXT_PUBLIC_ prefix, so Next.js will not inline
 * it into any client bundle. Only import this from server code (route handlers,
 * server components, server actions).
 *
 * Returns null when the env vars are missing, so callers can degrade gracefully
 * (still record the signup in Supabase, just skip the welcome email) instead of
 * crashing the request.
 */
export function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

/** Verified sender, falls back to Resend's shared onboarding address. */
export function getFromEmail(): string {
  return (
    process.env.RESEND_FROM_EMAIL ?? "ArtStudio <onboarding@resend.dev>"
  );
}
