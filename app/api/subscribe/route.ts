import { getSupabaseServer } from "@/lib/supabase/server";
import { getResend, getFromEmail } from "@/lib/resend";
import { renderWelcomeHtml, WELCOME_SUBJECT } from "@/lib/email/welcome";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TABLE = "early_access";

function parseEmail(body: unknown): string | null {
  if (typeof body !== "object" || body === null || !("email" in body)) {
    return null;
  }
  const { email } = body as { email?: unknown };
  if (typeof email !== "string") return null;
  const trimmed = email.trim();
  return EMAIL_RE.test(trimmed) ? trimmed : null;
}

async function sendWelcome(email: string): Promise<void> {
  const resend = getResend();
  if (!resend) return; // not configured — silently skip, signup still recorded
  const { error } = await resend.emails.send({
    from: getFromEmail(),
    to: email,
    subject: WELCOME_SUBJECT,
    html: renderWelcomeHtml(email),
  });
  if (error) {
    // Don't surface to user — they're already on the list. Log for ops.
    console.error("[subscribe] welcome email failed:", error.message);
  }
}

/**
 * POST /api/subscribe
 *
 * Persists an early-access signup to Supabase (table `early_access`), then
 * sends a welcome email on first signup (skipped for duplicate emails).
 *
 * Idempotent: re-submitting the same email is treated as success, no second
 * email is sent.
 *
 * Errors:
 *   400 invalid_email        — missing or malformed email
 *   400 invalid_body         — request body was not valid JSON
 *   503 server_not_configured — SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set
 *   500 server_error         — Supabase insert failed (table missing, etc.)
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const email = parseEmail(body);
  if (!email) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const supabase = getSupabaseServer();
  if (!supabase) {
    return Response.json(
      { ok: false, error: "server_not_configured" },
      { status: 503 },
    );
  }

  // With ignoreDuplicates + .select(), duplicates return an empty array while
  // first-time signups return the inserted row — a clean signal for whether to
  // send the welcome email.
  const { data, error } = await supabase
    .from(TABLE)
    .upsert({ email }, { onConflict: "email", ignoreDuplicates: true })
    .select("email");

  if (error) {
    console.error("[subscribe] Supabase insert failed:", error.message);
    return Response.json({ ok: false, error: "server_error" }, { status: 500 });
  }

  const isNew = Array.isArray(data) && data.length > 0;
  if (isNew) {
    // Email failures must not fail the signup. Await (not fire-and-forget) so
    // serverless runtimes don't freeze the send before it completes.
    await sendWelcome(email);
  }

  return Response.json({ ok: true });
}
