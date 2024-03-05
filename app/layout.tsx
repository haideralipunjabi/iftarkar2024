import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { Fira_Mono } from "next/font/google";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Iftarkar",
  description:
    "Iftarkar is your companion app for 2024's Ramzan. Daily Countdown Timer, Iftar and Sehri Timings for Jammu, Kashmir, Kargil and Ladakh.",
};

const fira = Fira_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fira",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`h-full min-h-screen bg-primary ${fira.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
