import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import ArticlesFilter from "@/components/ArticlesFilter";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { sanityFetch } from "@/lib/sanityFetch";
import {
  ALL_ARTICLES_QUERY,
  ALL_CATEGORIES_QUERY,
} from "@/lib/queries";
import type { ArticleCard, Category } from "@/types/article";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Panduan & Tips Qurban dan Aqiqah",
  description:
    "Artikel edukatif seputar qurban, aqiqah, dan cara memilih hewan ternak yang sehat dan sesuai syariat dari Joya Land.",
  openGraph: {
    title: "Panduan & Tips Qurban dan Aqiqah",
    description:
      "Artikel edukatif seputar qurban, aqiqah, dan cara memilih hewan ternak yang sehat dan sesuai syariat dari Joya Land.",
    type: "website",
    url: "/articles",
  },
  twitter: {
    card: "summary_large_image",
    title: "Panduan & Tips Qurban dan Aqiqah",
    description:
      "Artikel edukatif seputar qurban, aqiqah, dan cara memilih hewan ternak yang sehat dan sesuai syariat dari Joya Land.",
  },
};

export default async function ArticleListPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [articles, categories] = await Promise.all([
    sanityFetch<ArticleCard[]>(ALL_ARTICLES_QUERY, {}, 300),
    sanityFetch<Category[]>(ALL_CATEGORIES_QUERY, {}, 1800),
  ]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background pt-24 pb-20">
        <div className="container">
          <div className="flex flex-col gap-4 mb-12 text-center max-w-2xl mx-auto">
            <span className="flex items-center justify-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
              <BookOpen size={16} />
              Dari Joya Land
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Panduan & Tips
            </h1>
            <p className="text-foreground/60 text-lg">
              Semua yang perlu kamu tahu tentang qurban, aqiqah, dan memilih hewan
              ternak yang sehat sesuai syariat Islam.
            </p>
          </div>

          <ArticlesFilter
            articles={articles}
            categories={categories}
            initialCategory={category ?? null}
          />
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
