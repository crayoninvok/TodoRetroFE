import "./globals.css";
import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Define main fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Define arcade fonts
const pressStart2P = {
  variable: "--font-press-start",
  style: {
    fontFamily: "'Press Start 2P', monospace",
  },
};

const vt323 = {
  variable: "--font-vt323",
  style: {
    fontFamily: "'VT323', monospace",
  },
};

export const metadata: Metadata = {
  title: "Spektra Tasks - Synthwave Todo App",
  description: "A stylish todo list application with synthwave aesthetics",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <head>
        {/* Add arcade fonts for the retro gaming theme */}
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="synthwave-bg">
          <div className="scanline"></div>
        </div>
        <Navbar />
        <div className="pt-24">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
