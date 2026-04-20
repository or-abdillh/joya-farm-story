import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ChevronRight, Clock, Home, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ArticleCard from "@/components/ArticleCard";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { Skeleton } from "@/components/ui/skeleton";
import { useArticle } from "@/hooks/useArticle";
import { urlFor } from "@/lib/sanityImageUrl";

const WA_LINK = "https://wa.me/6285291822522?text=Halo%20Joya%20Land!%20Saya%20ingin%20tanya%20tentang%20qurban%2Faqiqah.";

/** Estimasi waktu baca berdasarkan jumlah blok teks */
function estimateReadingTime(body: unknown[]): number {
  if (!body) return 1;
  const words = body
    .filter((block: unknown) => (block as { _type: string })._type === "block")
    .flatMap((block: unknown) =>
      ((block as { children?: { text?: string }[] }).children ?? []).map((child) => child.text ?? "")
    )
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

const ArticleDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, isError } = useArticle(slug ?? "");

  // Jika slug tidak ada, redirect ke list
  if (!slug) return <Navigate to="/articles" replace />;

  // Jika artikel tidak ditemukan setelah fetch selesai
  if (!isLoading && !isError && article === null) {
    return <Navigate to="/articles" replace />;
  }

  const readingTime = article?.body ? estimateReadingTime(article.body) : null;

  const coverImageUrl = article?.coverImage?.asset
    ? urlFor(article.coverImage).width(1200).height(630).fit("crop").auto("format").url()
    : null;

  const metaTitle = article?.seo?.metaTitle || article?.title;
  const metaDescription = article?.seo?.metaDescription || article?.excerpt;
  const ogImageUrl =
    article?.seo?.ogImage?.asset
      ? urlFor(article.seo.ogImage).width(1200).height(630).url()
      : coverImageUrl;

  return (
    <>
      <Helmet>
        <title>{metaTitle ? `${metaTitle} | Joya Land` : "Artikel | Joya Land"}</title>
        {metaDescription && <meta name="description" content={metaDescription} />}
        {metaTitle && <meta property="og:title" content={metaTitle} />}
        {metaDescription && <meta property="og:description" content={metaDescription} />}
        {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
        <meta property="og:type" content="article" />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background">
        {/* Cover Image */}
        <div className="relative w-full aspect-[16/7] bg-secondary overflow-hidden">
          {isLoading ? (
            <Skeleton className="w-full h-full rounded-none" />
          ) : coverImageUrl ? (
            <img
              src={coverImageUrl}
              alt={article?.coverImage?.alt ?? article?.title ?? ""}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-secondary" />
          )}
          {/* Gradient overlay bawah */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container max-w-3xl pt-8 pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-foreground/50 mb-6 flex-wrap">
            <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Home size={13} />
              Beranda
            </Link>
            <ChevronRight size={13} />
            <Link to="/articles" className="hover:text-primary transition-colors">
              Artikel
            </Link>
            <ChevronRight size={13} />
            {isLoading ? (
              <Skeleton className="h-4 w-40 rounded" />
            ) : (
              <span className="text-foreground/70 line-clamp-1">{article?.title}</span>
            )}
          </nav>

          {/* Article Header */}
          {isLoading ? (
            <div className="flex flex-col gap-4 mb-10">
              <Skeleton className="h-5 w-28 rounded-full" />
              <Skeleton className="h-10 w-full rounded" />
              <Skeleton className="h-10 w-4/5 rounded" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-4 w-24 rounded" />
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4 mb-10"
            >
              {/* Category badge */}
              {article?.category && (
                <Link
                  to={`/articles?category=${article.category.slug}`}
                  className="inline-flex"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/articles?category=${article.category.slug}`;
                  }}
                >
                  <span className="bg-lime text-foreground text-xs font-semibold px-3 py-1 rounded-full w-fit">
                    {article.category.title}
                  </span>
                </Link>
              )}

              {/* Title */}
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {article?.title}
              </h1>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/50">
                {article?.publishedAt && (
                  <time dateTime={article.publishedAt}>
                    {format(new Date(article.publishedAt), "d MMMM yyyy", { locale: id })}
                  </time>
                )}
                {readingTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    {readingTime} menit baca
                  </span>
                )}
                {article?.author && (
                  <span>oleh {article.author.name}</span>
                )}
              </div>

              {/* Excerpt / lead paragraph */}
              {article?.excerpt && (
                <p className="text-lg text-foreground/60 leading-relaxed border-l-4 border-lime pl-4">
                  {article.excerpt}
                </p>
              )}
            </motion.div>
          )}

          {/* Article Body */}
          {isLoading ? (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className={`h-4 rounded ${i % 4 === 3 ? "w-3/4" : "w-full"}`} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <PortableTextRenderer value={article?.body ?? []} />
            </motion.div>
          )}
        </div>

        {/* Related Articles */}
        {!isLoading && article?.relatedArticles && article.relatedArticles.length > 0 && (
          <section className="bg-cream py-16">
            <div className="container">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                Artikel Terkait
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {article.relatedArticles.map((related, i) => (
                  <motion.div
                    key={related._id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <ArticleCard article={related} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="bg-primary py-16">
          <div className="container text-center flex flex-col items-center gap-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-background">
              Siap Pesan Qurban atau Aqiqah?
            </h2>
            <p className="text-background/70 max-w-md">
              Konsultasi gratis dengan tim Joya Land. Kami siap bantu kamu pilih hewan terbaik yang sesuai kebutuhan.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-lime text-foreground font-semibold px-8 py-3.5 rounded-full hover:brightness-110 transition-all shadow-lg"
            >
              <MessageCircle size={18} />
              Chat WhatsApp Sekarang
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default ArticleDetailPage;
