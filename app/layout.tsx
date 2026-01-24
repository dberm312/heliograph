import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Heliograph - Structured wide research you can trust",
  description:
    "Label and clean your data at scale with AI. Spend less time wrangling spreadsheets and more time doing analysis.",
  metadataBase: new URL("https://www.heliograph.co"),
  openGraph: {
    title: "Helioscope - Structured wide research you can trust",
    description:
      "Label and clean your data at scale with AI. Spend less time wrangling spreadsheets and more time doing analysis.",
    url: "https://www.helioscope.co",
    siteName: "Helioscope",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Helioscope - Structured wide research you can trust",
    description:
      "Label and clean your data at scale with AI. Spend less time wrangling spreadsheets and more time doing analysis.",
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
        <link rel="icon" href="/helioscope-logo-small.png" sizes="any" />
        <meta name="theme-color" content="#96B0F8" />
      </head>
      <body
        className="min-h-screen bg-blue-600 relative text-white font-sans selection:bg-orange-500/50"
        suppressHydrationWarning
      >
        <div className="fixed inset-0 bg-linear-to-br from-orange-400 via-blue-500 to-blue-600 -z-10" />
        {children}
      </body>
    </html>
  );
}
