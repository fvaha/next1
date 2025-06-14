import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ClientProviders from "../components/ClientProviders";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TerraCrypt",
    template: "%s | TerraCrypt",
  },
  description: "Quantum-secure privacy platform using zero-trust architecture.",
  keywords: [
    "encryption",
    "quantum",
    "privacy",
    "crypto",
    "end-to-end",
    "secure communication",
  ],
  authors: [{ name: "TerraCrypt Team", url: "https://terracrypt.io" }],
  metadataBase: new URL("https://terracrypt.io"),
  openGraph: {
    title: "TerraCrypt",
    description: "Quantum-secure privacy platform.",
    url: "https://terracrypt.cc",
    siteName: "TerraCrypt",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "TerraCrypt Dolphin OG",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TerraCrypt",
    description: "Quantum-secure privacy platform.",
    site: "@terracrypt",
    creator: "@terracrypt",
    images: ["/og"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans min-h-screen bg-white text-neutral-900 dark:bg-[#121212] dark:text-[#fffde6] transition-colors duration-500">
        <ClientProviders>
          <Navbar />
          <main className="flex-1">
            <div className="max-w-[1280px] mx-auto px-4 py-8">{children}</div>
          </main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
