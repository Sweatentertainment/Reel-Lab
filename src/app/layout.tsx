import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Geist } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://reellab.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Reel:lab — AI Music Brand Infrastructure",
  description: "You bring the music. We build everything else.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "reel:lab — You bring the music. We build everything else.",
    description:
      "AI-powered brand building for music. Content, accounts, engagement, performance — all automated.",
    type: "website",
    url: siteUrl,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "reel:lab" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "reel:lab — You bring the music. We build everything else.",
    description:
      "AI-powered brand building for music. Content, accounts, engagement, performance — all automated.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", inter.variable, jetbrainsMono.variable, "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col font-sans antialiased" suppressHydrationWarning>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
