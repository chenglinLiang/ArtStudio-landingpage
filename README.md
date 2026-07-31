# ArtStudio — Landing Page

A premium, editorial landing page for **ArtStudio**, an iOS app that turns
physical artwork into a beautiful digital gallery. Apple/MoMA-inspired — calm,
typographic, cinematic — built with Next.js 15, Tailwind CSS v4, and Framer
Motion.

> **No fake artwork.** Every image on the page is a clearly-labelled
> placeholder component, ready to swap for real assets. See
> [Replacing placeholders](#replacing-placeholders-with-real-assets).

---

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first theming via `@theme`)
- **Framer Motion** for scroll & entrance animation
- **Lucide React** for icons
- **Supabase** for the early-access waitlist (server-side, service-role key)
- `next/font` — **Fraunces** (serif headlines) + **Inter** (sans body)

No UI kit or CSS framework beyond the above.

## Prerequisites

- Node.js **18.18+** (20+ recommended)
- npm (or pnpm/yarn — adjust commands accordingly)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

### If `npm install` fails with a certificate error

Your npm registry may be pointed at a mirror with an expired certificate (e.g.
`registry.npm.taobao.org`). Switch to the official registry:

```bash
npm config set registry https://registry.npmjs.org/
npm install
```

---

## Project structure

```
app/
  layout.tsx              # fonts, metadata/OG/themeColor, skip-link
  page.tsx                # assembles Nav + 8 sections + Footer
  globals.css             # Tailwind v4 @theme tokens, base styles, frame finishes
  api/subscribe/route.ts  # early-access endpoint → inserts into Supabase
components/
  Nav.tsx  Hero.tsx  StorySection.tsx  ColorSection.tsx
  FrameSection.tsx  GallerySection.tsx  AudienceSection.tsx  EarlyAccess.tsx  Footer.tsx
  primitives/             # Reveal, Stagger(+Item), Button — shared motion/UI
  placeholders/           # ArtworkPlaceholder, AppScreenshotPlaceholder,
                          # FramePlaceholder, GalleryPlaceholder,
                          # BeforeAfterArtworkPlaceholder (+ shared PlaceholderChrome)
lib/
  constants.ts            # all copy + content data (nav, stages, frames, audiences…)
  supabase/server.ts      # server-only client (service-role key)
  utils.ts                # cn(), clamp()
supabase/
  schema.sql              # the `early_access` table + RLS — run in the SQL editor
.env.example              # copy to .env.local and fill in Supabase keys
```

## Customizing content

Almost all copy lives in **`lib/constants.ts`** — site name/tagline, nav links,
the four journey stages, the frame collection, audiences, gallery label, and the
color-section text. Edit there; no component changes needed.

Brand name, contact email, and social links are in the `site` object at the top
of that file. Set the real domain in `app/layout.tsx` (`URL_BASE`) before
deploying.

## Design tokens

Defined in `app/globals.css` under `@theme`:

| Token | Value | Use |
|---|---|---|
| `paper` | `#F8F5F0` | background (warm paper white) |
| `ink` | `#111111` | primary text (deep charcoal) |
| `canvas` | `#E8E1D4` | placeholder fill (canvas beige) |
| `wood` / `gold` | `#9C7B4A` / `#B08D57` | accents |
| `line` | `#DCD4C6` | hairline borders |
| `ink-soft` / `ink-muted` | `#3A3633` / `#6B655C` | secondary text (≥ 4.5:1 on paper) |

Frame finishes (`.frame-oak`, `.frame-walnut`, `.frame-gold`, `.frame-black`)
are CSS stand-ins for real moulding and live in the same file.

## Replacing placeholders with real assets

Each placeholder component has a `// TODO (asset swap)` comment with the exact
swap. The pattern is the same everywhere — replace the placeholder with a
`next/image`, keeping the same aspect ratio and container:

```tsx
// before
<ArtworkPlaceholder label="Moonlight" />

// after
<div className="relative aspect-[3/4] w-full overflow-hidden">
  <Image src="/artworks/moonlight.jpg" alt="Moonlight — Lin Zhang" fill className="object-cover" />
</div>
```

Recommended assets:

| Placeholder | Asset | Size |
|---|---|---|
| `ArtworkPlaceholder` | photo of the painting | ~2400×3200 (3:4) |
| `AppScreenshotPlaceholder` | app screenshot | 1290×2796 (iPhone) |
| `FramePlaceholder` | real frame PNGs from the app (`FrameAssets.bundle`) | — |
| `GalleryPlaceholder` | "Exhibition" render (framed work on a wall) | 1920×1080 (16:9) |
| `BeforeAfterArtworkPlaceholder` | real before/after pair, same crop | 1600×2000 (4:5) |

Drop images in `public/` (e.g. `public/artworks/…`).

> **Frame names → real app frames.** The marketing labels map to the shipping
> app's catalog (`catalog.json`): Oak → `wood.001`, Walnut → `wood.011`,
> Gold Museum → `gold.002`, Black Minimal → `minimal.052`. Each entry in
> `lib/constants.ts` records the real id.

## Accessibility & motion

- Semantic landmarks (`header/nav/main/section/footer`), skip-to-content link,
  labelled form fields, visible focus rings, AA contrast.
- All animation honors `prefers-reduced-motion` (via Framer Motion's
  `useReducedMotion`) — transforms drop to fades or static.
- The before/after slider is keyboard-operable (←/→, Shift for larger steps,
  Home/End) and exposed as a `role="slider"`.

## Backend → Supabase (early-access form)

`POST /api/subscribe` validates the email and inserts it into the Supabase
table `early_access`. Writes use the **service-role key on the server only**,
so the key never reaches the browser; the table has RLS on with no policies,
locking it from all direct client access. Re-submitting the same email is
idempotent (silently ignored via the unique constraint).

**Setup (one time):**

1. Create a project at [supabase.com](https://supabase.com).
2. Open the SQL editor and run [`supabase/schema.sql`](supabase/schema.sql)
   (creates the `early_access` table + RLS).
3. Copy `.env.example` → `.env.local` and fill in, from
   **Dashboard → Project Settings → API**:
   - `SUPABASE_URL` → Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` → `service_role` secret
4. Restart `npm run dev`.

Verify in the SQL editor:

```sql
select email, created_at from public.early_access order by created_at desc limit 50;
```

The form persists the submitted email in `localStorage`, so returning visitors
see the success state. If the env vars are missing, the endpoint returns
`503 server_not_configured` (and the form shows a friendly message) — so it's
obvious when setup is incomplete.

## Deployment

Optimized for **Vercel** (or any Next.js-compatible host):

```bash
npm run build
# then deploy via Vercel dashboard, `vercel`, or your CI
```

---

© ArtStudio. Placeholder artwork only — replace before launch.
