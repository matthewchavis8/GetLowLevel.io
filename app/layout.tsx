import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "GetLowLevel - Master Low-Level Fundamentals",
  description: "Practice real interview questions that expose how languages, memory, and systems actually behave — not toy problems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <Script
          type="module"
          src="https://unpkg.com/@splinetool/viewer@1.12.28/build/spline-viewer.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
