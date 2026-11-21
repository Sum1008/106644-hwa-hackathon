import type { Metadata, Viewport } from "next";
import { Baloo_2, DM_Sans } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Providers } from "@/app/providers";
import { site } from "@/lib/site";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sniffari — Turn your home into a treasure hunt",
    template: "%s · Sniffari",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "dog enrichment",
    "scent game for dogs",
    "dog puzzle toy",
    "apartment dog",
    "dog boredom",
    "Sniffari",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: "Sniffari — Turn your home into a treasure hunt",
    description: site.description,
    images: [
      {
        url: "/images/hero-wide.webp",
        width: 1920,
        height: 1080,
        alt: "Sniffari hub and scent pods on a cream surface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sniffari — Turn your home into a treasure hunt",
    description: site.description,
    images: ["/images/hero-wide.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f8a8a",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${baloo.variable} ${dmSans.variable}`}>
      <body className="min-h-dvh bg-cream-50 text-charcoal-900">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-teal-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-cream-50"
        >
          Skip to content
        </a>
        <Providers>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
