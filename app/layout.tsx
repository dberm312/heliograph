import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Heliograph - The Toolchain for Forward-Deployed Engineers",
  description:
    "One integrated platform combining project management, version control, and stakeholder tracking—built for customer-facing builders.",
  metadataBase: new URL("https://www.heliograph.dev"),
  openGraph: {
    title: "Heliograph - The Toolchain for customer-facing builders",
    description:
      "One integrated platform combining project management, version control, and stakeholder tracking—built for customer-facing builders.",
    url: "https://www.heliograph.dev",
    siteName: "Heliograph",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heliograph - The Toolchain for customer-facing builders",
    description:
      "One integrated platform combining project management, version control, and stakeholder tracking—built for customer-facing builders.",
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
        className="min-h-screen bg-blue-600 relative text-white font-sans selection:bg-orange-500/50"
        suppressHydrationWarning
      >
        <div className="fixed inset-0 bg-linear-to-br from-orange-400 via-blue-500 to-blue-600 -z-10" />
        <header className="sticky top-0 z-50 px-6 py-4 backdrop-blur-3xl bg-white/25">
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
            <div className="flex items-center gap-1">
              <a
                href="https://docs.google.com/document/d/1Bhz-gXssQFHJ31JLAg4Aa87URd8jNXnq/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="View design document"
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-full">
                  <svg
                    className="w-7 h-7"
                    viewBox="0 0 24 24"
                    fill="white"
                    aria-hidden="true"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6zm2-7h8v2H8v-2zm0 4h8v2H8v-2zm0-8h4v2H8V9z" />
                  </svg>
                </span>
              </a>
              <a
                href="https://github.com/dberm312/heliograph"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="View source on GitHub"
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-full">
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="white"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </header>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
