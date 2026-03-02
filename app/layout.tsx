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
  title: "Bikram Mondal | Portfolio",
  description: "Portfolio of Bikram Mondal, showcasing skills, projects, and experience in full-stack development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/reactz-logo.png" type="image/png" />
      </head>
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
