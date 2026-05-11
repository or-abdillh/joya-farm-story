"use client";

import { motion } from "framer-motion";
import ArticleCard from "@/components/ArticleCard";
import type { ArticleCard as ArticleCardType } from "@/types/article";

interface FeaturedArticlesClientProps {
  articles: ArticleCardType[];
}

export default function FeaturedArticlesClient({
  articles,
}: FeaturedArticlesClientProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, i) => (
        <motion.div
          key={article._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
        >
          <ArticleCard article={article} />
        </motion.div>
      ))}
    </div>
  );
}
