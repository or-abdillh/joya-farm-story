import type { Metadata } from "next";
import { Fredoka, Inter } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joyaland.id"),
  title: {
    default: "Joya Land",
    template: "%s | Joya Land",
  },
  description:
    "Joya Land menyediakan kambing dan domba qurban berkualitas, higienis, dan 100% sehat. Layanan aqiqah, qurban, dan nabung kurban.",
  openGraph: {
    title: "Joya Land — Penyedia Domba & Kambing Qurban Higienis",
    description:
      "Joya Land menyediakan kambing dan domba qurban berkualitas, higienis, dan 100% sehat. Layanan aqiqah, qurban, dan nabung kurban.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joya Land — Penyedia Domba & Kambing Qurban Higienis",
    description:
      "Joya Land menyediakan kambing dan domba qurban berkualitas, higienis, dan 100% sehat. Layanan aqiqah, qurban, dan nabung kurban.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${fredoka.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
