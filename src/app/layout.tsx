import type { Metadata } from "next";
import { Cormorant_Garamond, Syne, Tenor_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const tenor = Tenor_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://phase2music.com'),
  title: "PHASE2 | Official Website | DJ Sister Duo",
  description: "Rabia & Mariya. Blending powerful grooves, House, Tech House, Afro House, and Bolly Tech. Booking & tour schedule.",
  keywords: ["PHASE2", "PHASE2 DJs", "Rabia", "Mariya", "DJ Duo", "Sister DJs", "House Music", "Tech House", "Afro House", "Bolly Tech"],
  authors: [{ name: "PHASE2" }],
  openGraph: {
    title: "PHASE2 | Official Website | DJ Sister Duo",
    description: "Rabia & Mariya. Blending powerful grooves, House, Tech House, Afro House, and Bolly Tech. Booking & tour schedule.",
    url: "https://phase2music.com",
    siteName: "PHASE2 Official",
    images: [
      {
        url: "/images/phase2_sofa.jpg",
        width: 1200,
        height: 630,
        alt: "PHASE2 Rabia and Mariya",
      },
    ],
    locale: "en_US",
    type: "website",
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
      className={`${cormorant.variable} ${syne.variable} ${tenor.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground selection:bg-gold selection:text-background flex flex-col relative">
        {/* Ambient background noise */}
        <div className="noise-overlay" />
        
        {/* Content container */}
        <div className="flex-grow flex flex-col z-10">
          {children}
        </div>
      </body>
    </html>
  );
}

