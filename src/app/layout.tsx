import type { Metadata } from "next";
import { Be_Vietnam_Pro, Cormorant_Garamond } from "next/font/google";
import { wedding } from "@/lib/wedding";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const title = `${wedding.groom.name} & ${wedding.bride.name}`;
const description = `Thiệp mời lễ cưới của ${wedding.groom.name} và ${wedding.bride.name}. Lễ ăn hỏi ngày 24 tháng 11 năm 2026, lễ cưới ngày 26 tháng 12 năm 2026.`;

export const metadata: Metadata = {
  title,
  description,
  applicationName: "Hiếu & Quế",
  metadataBase: new URL(wedding.siteUrl || "http://localhost:3000"),
  openGraph: {
    title,
    description,
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/photos/13x185.webp",
        width: 1800,
        height: 1200,
        alt: "Trần Trung Hiếu và Tướng Thị Quế",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${beVietnam.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
