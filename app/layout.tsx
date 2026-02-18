import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { Amiri, Plus_Jakarta_Sans, Roboto_Mono } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Iftarkar",
  description:
    "Iftarkar is your companion app for Ramzan. Daily Countdown Timer, Iftar and Sehri Timings for Jammu, Kashmir, Kargil and Ladakh.",
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-roboto-mono",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: "400",
  variable: "--font-amiri",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen ${jakarta.variable} ${roboto_mono.variable} ${amiri.variable} flex flex-col font-sans`}
      >
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-6TQC29XNQN" />
    </html>
  );
}
