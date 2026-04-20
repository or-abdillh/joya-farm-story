import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ArticleCard from "@/components/ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useArticles } from "@/hooks/useArticles";
import { useCategories } from "@/hooks/useCategories";

const ArticleListPage = () => {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);

  const { data: articles, isLoading: loadingArticles } = useArticles(activeCategory);
  const { data: categories, isLoading: loadingCategories } = useCategories();

  return (
    <>
      <Helmet>
        <title>Panduan & Tips Qurban dan Aqiqah | Joya Land</title>
        <meta
          name="description"
          content="Artikel edukatif seputar qurban, aqiqah, dan cara memilih hewan ternak yang sehat dan sesuai syariat dari Joya Land."
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-24 pb-20">
        <div className="container">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4 mb-12 text-center max-w-2xl mx-auto"
          >
            <span className="flex items-center justify-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
              <BookOpen size={16} />
              Dari Joya Land
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Panduan & Tips
            </h1>
            <p className="text-foreground/60 text-lg">
              Semua yang perlu kamu tahu tentang qurban, aqiqah, dan memilih hewan ternak yang sehat sesuai syariat Islam.
            </p>
          </motion.div>

          {/* Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            <button
              onClick={() => setActiveCategory(undefined)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                !activeCategory
                  ? "bg-primary text-background shadow-md"
                  : "bg-secondary text-foreground/70 hover:bg-secondary/80"
              }`}
            >
              Semua
            </button>

            {loadingCategories
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-9 w-28 rounded-full" />
                ))
              : categories?.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() =>
                      setActiveCategory(
                        activeCategory === cat.slug ? undefined : cat.slug
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

          {/* Article Grid */}
          {loadingArticles ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <Skeleton className="aspect-[3/2] rounded-2xl" />
                  <Skeleton className="h-4 w-1/3 rounded" />
                  <Skeleton className="h-6 w-4/5 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-3/4 rounded" />
                </div>
              ))}
            </div>
          ) : articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, i) => (
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
            // Empty state
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
                Kami sedang menyiapkan konten terbaik untuk kamu. Coba cek lagi nanti ya!
              </p>
              <button
                onClick={() => setActiveCategory(undefined)}
                className="mt-2 px-6 py-2.5 bg-primary text-background rounded-full text-sm font-semibold hover:brightness-110 transition-all"
              >
                Lihat Semua Artikel
              </button>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default ArticleListPage;
