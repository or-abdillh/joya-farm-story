import type { Metadata } from "next";
import About from "@/components/About";
import FeaturedArticles from "@/components/FeaturedArticles";
import { sanityFetch } from "@/lib/sanityFetch";
import { FEATURED_ARTICLES_QUERY } from "@/lib/queries";
import type { ArticleCard } from "@/types/article";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowToOrder from "@/components/HowToOrder";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import Testimonials from "@/components/Testimonials";
import Ticker from "@/components/Ticker";

export const metadata: Metadata = {
  title: "Joya Land — Penyedia Domba & Kambing Qurban Higienis",
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

export default async function Home() {
  const featuredArticles = await sanityFetch<ArticleCard[]>(
    FEATURED_ARTICLES_QUERY,
    {},
    600,
  );

  return (
    <>
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <Products />
      <HowToOrder />
      <Testimonials />
      <FeaturedArticles articles={featuredArticles} />
      <FAQ />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
