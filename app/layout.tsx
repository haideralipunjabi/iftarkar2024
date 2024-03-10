import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { Amiri, Roboto, Roboto_Mono } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Iftarkar",
  description:
    "Iftarkar is your companion app for 2024's Ramzan. Daily Countdown Timer, Iftar and Sehri Timings for Jammu, Kashmir, Kargil and Ladakh.",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-roboto",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  weight: "400",
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
        className={`h-full min-h-screen bg-primary ${roboto.variable} ${roboto_mono.variable} ${amiri.variable} flex flex-col justify-between font-roboto`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
      <GoogleTagManager gtmId="G-ZG5BZXJM78" />
    </html>
  );
}
