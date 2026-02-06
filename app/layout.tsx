import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Heliograph - The Toolchain for Forward-Deployed Engineers",
  description:
    "One integrated platform combining project management, version control, and stakeholder tracking—built for forward-deployed teams.",
  metadataBase: new URL("https://www.heliograph.dev"),
  openGraph: {
    title: "Heliograph - The Toolchain for forward-deployed teams",
    description:
      "One integrated platform combining project management, version control, and stakeholder tracking—built for forward-deployed teams.",
    url: "https://www.heliograph.dev",
    siteName: "Heliograph",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heliograph - The Toolchain for forward-deployed teams",
    description:
      "One integrated platform combining project management, version control, and stakeholder tracking—built for forward-deployed teams.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/heliograph-logo-small.png" sizes="any" />
        <meta name="theme-color" content="#96B0F8" />
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className="min-h-screen bg-blue-600 relative text-white font-sans selection:bg-orange-500/50 overflow-x-clip"
        suppressHydrationWarning
      >
        <div className="fixed inset-0 bg-linear-to-br from-orange-400 via-blue-500 to-blue-600 -z-10" />
        <header className="sticky top-0 z-50 px-6 py-2 backdrop-blur-3xl bg-white/25">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-white/80 rounded-lg p-1.5">
                <Image
                  src="/heliograph-logo.svg"
                  alt="Heliograph"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </div>
              <span className="text-3xl font-semibold tracking-tight text-white">
                Heliograph
              </span>
            </Link>
          </div>
        </header>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
