import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import FeaturedArticlesClient from "@/components/FeaturedArticlesClient";
import type { ArticleCard as ArticleCardType } from "@/types/article";

interface FeaturedArticlesProps {
  articles: ArticleCardType[];
}

const FeaturedArticles = ({ articles }: FeaturedArticlesProps) => {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div className="flex flex-col gap-3">
            <span className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
              <BookOpen size={16} />
              Dari Joya Land
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Panduan & Tips untuk Kamu
            </h2>
            <p className="text-foreground/60 max-w-lg">
              Artikel edukatif seputar qurban, aqiqah, dan cara memilih hewan ternak
              yang sehat dan sesuai syariat.
            </p>
          </div>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200 shrink-0"
          >
            Lihat Semua Artikel
            <ArrowRight size={16} />
          </Link>
        </div>

        <FeaturedArticlesClient articles={articles} />
      </div>
    </section>
  );
};

export default FeaturedArticles;
