import type { Metadata } from "next";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import QueryProvider from "../providers/QueryProvider";

import StarryBackground from "@/components/StarryBackground";

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
        <StarryBackground />
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
      </body>
    </html>
  );
}
