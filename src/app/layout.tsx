import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { DM_Sans } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mercado Play",
  description: "Your premium streaming destination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen bg-[#08090a] text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
