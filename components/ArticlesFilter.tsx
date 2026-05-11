"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ArticleCard from "@/components/ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { ArticleCard as ArticleCardType, Category } from "@/types/article";

interface ArticlesFilterProps {
  articles: ArticleCardType[];
  categories: Category[];
  initialCategory?: string | null;
}

export default function ArticlesFilter({
  articles,
  categories,
  initialCategory,
}: ArticlesFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(
    initialCategory ?? null,
  );

  const filteredArticles = useMemo(() => {
    if (!activeCategory) return articles;
    return articles.filter((article) => article.category?.slug === activeCategory);
  }, [activeCategory, articles]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2 mb-10"
      >
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            !activeCategory
              ? "bg-primary text-background shadow-md"
              : "bg-secondary text-foreground/70 hover:bg-secondary/80"
          }`}
        >
          Semua
        </button>

        {categories.length === 0
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-28 rounded-full" />
            ))
          : categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === cat.slug ? null : cat.slug,
                  )
                }
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.slug
                    ? "bg-primary text-background shadow-md"
                    : "bg-secondary text-foreground/70 hover:bg-secondary/80"
                }`}
              >
                {cat.title}
              </button>
            ))}
      </motion.div>

      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, i) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 gap-4 text-center"
        >
          <span className="text-5xl">📖</span>
          <h3 className="font-display text-xl font-semibold text-foreground">
            Belum ada artikel di kategori ini
          </h3>
          <p className="text-foreground/50 max-w-sm">
            Kami sedang menyiapkan konten terbaik untuk kamu. Coba cek lagi nanti
            ya!
          </p>
          <button
            onClick={() => setActiveCategory(null)}
            className="mt-2 px-6 py-2.5 bg-primary text-background rounded-full text-sm font-semibold hover:brightness-110 transition-all"
          >
            Lihat Semua Artikel
          </button>
        </motion.div>
      )}
    </>
  );
}
