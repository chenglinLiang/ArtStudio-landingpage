/**
 * Welcome email for ArtStudio early-access signups.
 *
 * Design language mirrors the landing page: warm paper white, deep ink,
 * a single muted-gold rule, museum-label typography. Inline-styled for
 * email-client compatibility (Gmail / Outlook / Apple Mail strip <style>).
 *
 * Web fonts are not loaded — email clients won't fetch them reliably — so we
 * rely on a serif system stack that evokes Playfair Display on the site.
 */

export const WELCOME_SUBJECT = "Your seat is reserved · ArtStudio";

export const WELCOME_PREHEADER =
  "Thank you for joining the first artists building their digital galleries.";

// Palette (synced with app/globals.css design tokens)
const C = {
  paper: "#f8f5f0",
  paperDeep: "#f1ece2",
  ink: "#111111",
  inkSoft: "#3a3633",
  inkMuted: "#6b655c",
  gold: "#b08d57",
  line: "#dcd4c6",
};

const SERIF =
  '"Playfair Display", "Times New Roman", Georgia, "STSong", serif';
const SANS =
  '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Helvetica Neue", Arial, sans-serif';

const STAGE = [
  { n: "01", t: "Capture", d: "Photograph your artwork." },
  { n: "02", t: "Restore", d: "Recover true color and detail." },
  { n: "03", t: "Frame", d: "Choose the perfect presentation." },
  { n: "04", t: "Exhibit", d: "Curate your personal gallery." },
  { n: "05", t: "Export", d: "Share in full resolution." },
];

/**
 * Returns the full HTML body for the welcome email.
 * `email` is the subscriber's address — only used to personalize greeting.
 */
export function renderWelcomeHtml(email: string): string {
  const stages = STAGE.map((s) => {
    const row =
      `<tr>` +
      `<td style="width:42px;vertical-align:top;padding:14px 0;font-family:${SANS};font-size:11px;letter-spacing:0.22em;color:${C.gold};">${s.n}</td>` +
      `<td style="vertical-align:top;padding:14px 0;font-family:${SERIF};font-size:16px;color:${C.ink};">${s.t}</td>` +
      `<td style="vertical-align:top;text-align:right;padding:14px 0 14px 16px;font-family:${SANS};font-size:13px;line-height:1.5;color:${C.inkMuted};">${s.d}</td>` +
      `</tr>` +
      `<tr><td colspan="3" style="border-bottom:1px solid ${C.line};font-size:0;line-height:0;">&nbsp;</td></tr>`;
    return row;
  }).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="color-scheme" content="light only" />
  <meta name="supported-color-schemes" content="light" />
  <title>${WELCOME_SUBJECT}</title>
</head>
<body style="margin:0;padding:0;background-color:${C.paperDeep};">
  <!-- preheader (hidden) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.paperDeep};">
    ${WELCOME_PREHEADER}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${C.paperDeep};">
    <tr>
      <td align="center" style="padding:40px 20px;">

        <!-- card -->
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:560px;max-width:100%;background-color:${C.paper};border:1px solid ${C.line};border-radius:6px;">
          <tr>
            <td style="padding:48px 56px 40px 56px;">

              <!-- eyebrow -->
              <p style="margin:0 0 28px 0;font-family:${SANS};font-size:10px;font-weight:600;letter-spacing:0.28em;text-transform:uppercase;color:${C.gold};text-align:center;">
                Early Access · Invitation Confirmed
              </p>

              <!-- gold rule -->
              <table role="presentation" align="center" cellpadding="0" cellspacing="0" style="margin:0 auto 36px auto;">
                <tr><td style="width:48px;border-top:1px solid ${C.gold};font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>

              <!-- headline -->
              <h1 style="margin:0 0 24px 0;font-family:${SERIF};font-size:34px;line-height:1.12;letter-spacing:-0.01em;color:${C.ink};text-align:center;font-weight:400;">
                Your seat is reserved.
              </h1>

              <!-- body -->
              <p style="margin:0 0 18px 0;font-family:${SANS};font-size:15px;line-height:1.7;color:${C.inkSoft};text-align:center;">
                Thank you for joining the first artists building their digital galleries. We are still hanging the final frames &mdash; adjusting color, light, and the small details that turn a collection into an exhibition.
              </p>
              <p style="margin:0 0 36px 0;font-family:${SANS};font-size:15px;line-height:1.7;color:${C.inkSoft};text-align:center;">
                When ArtStudio opens, you will be among the first to step inside.
              </p>

              <!-- stages -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 36px 0;border-top:1px solid ${C.line};">
                ${stages}
              </table>

              <!-- sign-off -->
              <p style="margin:0 0 6px 0;font-family:${SERIF};font-size:15px;font-style:italic;color:${C.ink};text-align:center;">
                With care,
              </p>
              <p style="margin:0 0 40px 0;font-family:${SANS};font-size:13px;letter-spacing:0.04em;color:${C.inkSoft};text-align:center;">
                The ArtStudio Studio
              </p>

              <!-- divider -->
              <table role="presentation" align="center" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr><td style="width:120px;border-top:1px solid ${C.line};font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>

              <!-- footer note -->
              <p style="margin:24px 0 0 0;font-family:${SANS};font-size:11px;line-height:1.7;color:${C.inkMuted};text-align:center;">
                You are receiving this because you joined the early-access list with<br />
                <span style="color:${C.inkSoft};">${escapeHtml(email)}</span>.
              </p>

            </td>
          </tr>
        </table>

        <!-- footer -->
        <p style="margin:24px 0 0 0;font-family:${SANS};font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:${C.inkMuted};text-align:center;">
          ArtStudio &middot; Your art deserves a gallery.
        </p>

      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
