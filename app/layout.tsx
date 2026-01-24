import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "Heliograph - Align your teams. Amplify your impact.",
  description:
    "AI-native platform that bridges customer-facing innovation and core product development for B2B companies.",
  metadataBase: new URL("https://www.heliograph.co"),
  openGraph: {
    title: "Heliograph - Align your teams. Amplify your impact.",
    description:
      "AI-native platform that bridges customer-facing innovation and core product development for B2B companies.",
    url: "https://www.heliograph.co",
    siteName: "Heliograph",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heliograph - Align your teams. Amplify your impact.",
    description:
      "AI-native platform that bridges customer-facing innovation and core product development for B2B companies.",
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
      </head>
      <body
        className="min-h-screen bg-blue-600 relative text-white font-sans selection:bg-orange-500/50"
        suppressHydrationWarning
      >
        <div className="fixed inset-0 bg-linear-to-br from-orange-400 via-blue-500 to-blue-600 -z-10" />
        <header className="sticky top-0 z-50 px-6 py-4 backdrop-blur-md">
          <div className="max-w-6xl mx-auto flex items-center gap-3">
            <div className="bg-white/20 rounded-lg p-1.5">
              <Image
                src="/heliograph-logo.svg"
                alt="Heliograph"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">
              Heliograph
            </span>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
