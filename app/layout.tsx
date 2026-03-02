import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThreeJsProvider } from "@/utils/ThreeJsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bikram — Full-Stack Developer",
  description: "Portfolio of Bikram, a full-stack developer building modern web experiences with React, Next.js, Node.js, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${poppins.variable} antialiased`}
      >
        <ThreeJsProvider>
          <Navbar />
          {children}
        </ThreeJsProvider>
      </body>
    </html>
  );
}
