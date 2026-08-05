import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// TODO: set the real production domain before deploying.
const URL_BASE = "https://artstudio.app";

export const metadata: Metadata = {
  metadataBase: new URL(URL_BASE),
  title: {
    default: "Artfolio — Your art deserves a gallery.",
    template: "%s · Artfolio",
  },
  description:
    "Capture, preserve, frame and showcase your artwork in a beautiful digital space. Artfolio turns physical art into a personal digital museum.",
  applicationName: "Artfolio",
  authors: [{ name: "Artfolio" }],
  keywords: [
    "Artfolio",
    "digital gallery",
    "art app",
    "artists",
    "frame artwork",
    "color restoration",
    "digital museum",
    "portfolio",
  ],
  openGraph: {
    type: "website",
    url: URL_BASE,
    siteName: "Artfolio",
    title: "Artfolio — Your art deserves a gallery.",
    description:
      "Capture, preserve, frame and showcase your artwork in a beautiful digital space.",
    // TODO: add a real OG image at /public/og.png (1200×630) and uncomment:
    // images: [{ url: "/og.png", width: 1200, height: 630, alt: "Artfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artfolio — Your art deserves a gallery.",
    description:
      "Capture, preserve, frame and showcase your artwork in a beautiful digital space.",
  },
  // TODO: add icons / favicon (app/icon.png or app/favicon.ico) when available.
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f8f5f0",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="bg-paper font-sans text-ink antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
