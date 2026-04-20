import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedArticles } from "@/hooks/useFeaturedArticles";

const FeaturedArticles = () => {
  const { data: articles, isLoading, isError } = useFeaturedArticles();

  // Jangan render section sama sekali jika tidak ada artikel dan tidak loading
  if (!isLoading && (!articles || articles.length === 0)) return null;
  if (isError) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div className="flex flex-col gap-3">
            <span className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
              <BookOpen size={16} />
              Dari Joya Land
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Panduan & Tips untuk Kamu
            </h2>
            <p className="text-foreground/60 max-w-lg">
              Artikel edukatif seputar qurban, aqiqah, dan cara memilih hewan ternak yang sehat dan sesuai syariat.
            </p>
          </div>
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200 shrink-0"
          >
            Lihat Semua Artikel
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <Skeleton className="aspect-[3/2] rounded-2xl" />
                  <Skeleton className="h-4 w-1/3 rounded" />
                  <Skeleton className="h-6 w-4/5 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-3/4 rounded" />
                </div>
              ))
            : articles?.map((article, i) => (
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
      </div>
    </section>
  );
};

export default FeaturedArticles;
