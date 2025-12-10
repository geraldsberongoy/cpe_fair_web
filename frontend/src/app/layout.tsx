import type { Metadata } from "next";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import QueryProvider from "../providers/QueryProvider";
import { Analytics } from "@vercel/analytics/next";

import StarryBackground from "@/components/StarryBackground";

const genshin = localFont({
  src: "../assets/fonts/Genshin-Font.ttf",
  variable: "--font-genshin",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Archons of Innovation | CPE Fair 2025",
  description:
    "Track the champions of CPE Fair — live scores, standings, and team rankings all in one place. Experience the Genshin Impact-themed leaderboard featuring seven nations competing across Sports, Esports, Brain Games, and more.",
  keywords: [
    "CPE Fair",
    "Archons of Innovation",
    "Leaderboard",
    "Gaming Competition",
    "Genshin Impact",
    "Computer Engineering",
    "BSCpE",
    "Team Rankings",
    "PUP",
    "ACCESS",
  ],
  authors: [{ name: "CPE Fair Development Team" }],
  creator: "CPE Fair Team",
  publisher: "CPE Fair 2025",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cpefair2025.vercel.app",
    title: "Archons of Innovation | CPE Fair 2025",
    description:
      "Track the champions of CPE Fair — live scores, standings, and team rankings all in one place. Seven nations compete in an epic Genshin Impact-themed event.",
    siteName: "Archons of Innovation",
    images: [
      {
        url: "/og-image.svg",
        width: 800,
        height: 800,
        alt: "Archons of Innovation - CPE Fair 2025 Logo",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Archons of Innovation | CPE Fair 2025",
    description:
      "Track the champions of CPE Fair — live scores, standings, and team rankings. Seven nations compete in Genshin Impact-themed games!",
    images: ["/og-image.svg"],
    creator: "@CPEFair2025",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a1630" },
    { media: "(prefers-color-scheme: light)", color: "#2a2640" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${genshin.variable} antialiased min-h-screen`}>
        <StarryBackground starCount={75} />
        <QueryProvider>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
