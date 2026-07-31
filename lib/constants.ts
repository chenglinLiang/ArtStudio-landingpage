/**
 * Central content + configuration for the ArtStudio landing page.
 *
 * NOTE — product accuracy:
 * The shipping iOS app ("ArtStudio", bundle com.chenglinliang.ArtStudio) has a
 * frame catalog of 3 categories (Wood / Gold / Minimal) totalling 19 frames,
 * defined in the app at Resources/FrameAssets.bundle/Frames/catalog.json.
 * The marketing labels below follow the landing-page brief (Oak / Walnut /
 * Gold Museum / Black Minimal) and each one is mapped to its real counterpart
 * via `realId` so designers know exactly which asset to drop in.
 */

export const site = {
  name: "ArtStudio",
  /** One-line promise used in nav, hero, footer. */
  promise: "Your art deserves a gallery.",
  description:
    "Capture, preserve, frame and showcase your artwork in a beautiful digital space.",
  // TODO: replace with the real support email / domain when available.
  contactEmail: "hello@artstudio.app",
  // TODO: replace with real social profiles.
  social: {
    instagram: "https://instagram.com/",
    twitter: "https://twitter.com/",
    behance: "https://www.behance.net/",
  },
  launchNote: "Launching soon.",
} as const;

export const navLinks = [
  { label: "Journey", href: "#story" },
  { label: "Color", href: "#color" },
  { label: "Frames", href: "#frames" },
  { label: "Gallery", href: "#gallery" },
] as const;

export const hero = {
  eyebrow: "A digital gallery for artists",
  title: "Your art deserves a gallery.",
  subtitle:
    "Capture, preserve, frame and showcase your artwork in a beautiful digital space.",
  primaryCta: { label: "Join Early Access", href: "#early-access" },
  secondaryCta: { label: "Explore the experience", href: "#story" },
} as const;

export type Stage = {
  index: string;
  title: string;
  description: string;
  /** Alt text for the screenshot. */
  caption: string;
  /** Path (under /public) to the screenshot composite — includes device frame. */
  image: string;
};

export const stages: Stage[] = [
  {
    index: "01",
    title: "Capture",
    description: "Photograph your artwork.",
    caption: "Artwork capture photo",
    image: "/story/01-capture.png",
  },
  {
    index: "02",
    title: "Restore",
    description: "Recover true colors and details.",
    caption: "Color correction interface",
    image: "/story/02-restore.png",
  },
  {
    index: "03",
    title: "Frame",
    description: "Choose the perfect presentation.",
    caption: "Frame selection screen",
    image: "/story/03-frame.png",
  },
  {
    index: "04",
    title: "Exhibit",
    description: "Create your personal gallery.",
    caption: "Personal gallery view",
    image: "/story/04-exhibit.png",
  },
  {
    index: "05",
    title: "Export",
    description: "Export your work in full resolution.",
    caption: "Export and share screen",
    image: "/story/05-export.png",
  },
];

export type FrameStyle = {
  name: string;
  description: string;
  /** Maps to the real ArtStudio frame id (catalog.json) for asset replacement. */
  realId: string;
  /** Path (under /public) to the frame sample photo. */
  image: string;
  /** CSS class from globals.css that renders the frame finish. */
  frameClass: "frame-oak" | "frame-walnut" | "frame-gold" | "frame-black";
};

export const frames: FrameStyle[] = [
  {
    name: "Oak",
    description: "Warm, natural grain.",
    realId: "wood.001 — 暖调橡木 (Warm-tone Oak)",
    image: "/frames/01.jpg",
    frameClass: "frame-oak",
  },
  {
    name: "Walnut",
    description: "Deep, rich tone.",
    realId: "wood.011 — 深胡桃木 (Deep Walnut)",
    image: "/frames/02.jpg",
    frameClass: "frame-walnut",
  },
  {
    name: "Gold Museum",
    description: "Classical gold leaf.",
    realId: "gold.002 — 古典金箔 (Classical Gold Leaf)",
    image: "/frames/03.jpg",
    frameClass: "frame-gold",
  },
  {
    name: "Black Minimal",
    description: "Quiet, modern line.",
    realId: "minimal.052 — 细线边框 (Thin-line Frame)",
    image: "/frames/04.jpg",
    frameClass: "frame-black",
  },
];

export type Audience = { title: string; description: string };

export const audiences: Audience[] = [
  {
    title: "Artists",
    description: "Give every painting the presentation it earned.",
  },
  {
    title: "Art students",
    description: "Document your portfolio as it grows.",
  },
  {
    title: "Collectors",
    description: "Keep a quiet record of the works you live with.",
  },
  {
    title: "Creative people",
    description: "A calm place for everything you make.",
  },
];

export type GalleryArtwork = {
  title: string;
  medium: string;
  creator: string;
  year: string;
};

/**
 * Museum-label copy shown in the gallery section.
 * Field order mirrors the app's ArtworkLabelMetadata:
 *   title / medium / creator / creationDate (year)
 */
export const galleryArtworks: GalleryArtwork[] = [
  {
    title: "Moonlight",
    medium: "Oil on Canvas",
    creator: "Lin Zhang",
    year: "2026",
  },
  {
    title: "Quiet Harbor",
    medium: "Acrylic on Canvas",
    creator: "Lin Zhang",
    year: "2025",
  },
];

export const colorCopy = {
  eyebrow: "Color accuracy",
  title: "Every color has a story.",
  body: [
    "Artists spend countless hours mixing color. A digital copy should respect the original work — not flatten it.",
    "ArtStudio recovers true color and detail, gently and on your terms, so the painting reads the way you painted it.",
  ],
};
