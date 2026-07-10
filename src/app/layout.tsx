import type { Metadata } from "next";
import { Audiowide, Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

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
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://solensolutions.com"),
  title: "Solen Solutions — Growth systems for small business",
  description:
    "Texas-based studio building marketing, websites, CRMs, AI tools, and automations for small businesses ready to scale.",
  robots: "index, follow",
  openGraph: {
    title: "Solen Solutions",
    description: "Growth systems for small business.",
    url: "https://solensolutions.com",
    siteName: "Solen Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Solen Solutions",
    description: "Growth systems for small business.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${audiowide.variable} h-full antialiased`}
    >
      <body className="relative min-h-full text-ink overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
