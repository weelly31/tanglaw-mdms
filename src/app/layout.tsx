import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PwaBootstrap } from "@/components/pwa-bootstrap";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tanglaw Touch Care Foundation | Masterlist Data Management",
  description:
    "Grow in faith, grow in purpose, and grow together with Tanglaw Touch Care Foundation.",
  icons: {
    icon: "/img/logo.png",
    shortcut: "/img/logo.png",
    apple: "/img/logo.png",
  },
  appleWebApp: {
    capable: true,
    title: "Tanglaw",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#323675",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PwaBootstrap />
        {children}
      </body>
    </html>
  );
}
