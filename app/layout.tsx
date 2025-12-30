import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Analytics } from "@/components/firebase/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GetLowLevel.io - Master Low-Level Programming",
  description: "Build deep understanding of operating systems, computer architecture, and systems programming. Practice hundreds of questions for free.",
  icons: {
    icon: [
      { url: "/Soc.png", sizes: "64x64", type: "image/png" },
      { url: "/Soc.png", sizes: "128x128", type: "image/png" },
      { url: "/Soc.png", sizes: "256x256", type: "image/png" },
      { url: "/favicon.ico", sizes: "128x128", type: "image/x-icon" },
    ],
    apple: [
      { url: "/Soc.png", sizes: "256x256", type: "image/png" },
    ],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Analytics />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
