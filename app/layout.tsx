import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@fontsource/fredoka-one/latin-400.css";
import "./globals.css";

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
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
