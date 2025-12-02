import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const genshin = localFont({
  src: "../assets/fonts/Genshin-Font.ttf",
  variable: "--font-genshin",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Archons of Innovation",
  description: "Track the champions of CPE Fair — live scores, standings, and team rankings all in one place.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${genshin.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
