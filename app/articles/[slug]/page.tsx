import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ChevronRight, Clock, Home, MessageCircle } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { sanityFetch } from "@/lib/sanityFetch";
import {
  ALL_ARTICLE_SLUGS_QUERY,
  ARTICLE_BY_SLUG_QUERY,
} from "@/lib/queries";
import { urlFor } from "@/lib/sanityImageUrl";
import type { Article } from "@/types/article";

export const revalidate = 300;

const WA_LINK =
  "https://wa.me/6285291822522?text=Halo%20Joya%20Land!%20Saya%20ingin%20tanya%20tentang%20qurban%2Faqiqah.";

function estimateReadingTime(body: unknown[]): number {
  if (!body) return 1;
  const words = body
    .filter((block: unknown) => (block as { _type: string })._type === "block")
    .flatMap((block: unknown) =>
      ((block as { children?: { text?: string }[] }).children ?? []).map(
        (child) => child.text ?? "",
      ),
    )
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(
    ALL_ARTICLE_SLUGS_QUERY,
    {},
    300,
  );
  return slugs.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await sanityFetch<Article | null>(
    ARTICLE_BY_SLUG_QUERY,
    { slug },
    300,
  );

  if (!article) {
    return {
      title: "Artikel | Joya Land",
    };
  }

  const coverImageUrl = article.coverImage?.asset
    ? urlFor(article.coverImage)
        .width(1200)
        .height(630)
        .fit("crop")
        .auto("format")
        .url()
    : null;

  const ogImageUrl = article.seo?.ogImage?.asset
    ? urlFor(article.seo.ogImage).width(1200).height(630).url()
    : coverImageUrl;

  const metaTitle = article.seo?.metaTitle || article.title;
  const metaDescription = article.seo?.metaDescription || article.excerpt;

  return {
    title: metaTitle ? `${metaTitle}` : "Artikel",
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "article",
      url: `/articles/${article.slug}`,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await sanityFetch<Article | null>(
    ARTICLE_BY_SLUG_QUERY,
    { slug },
    300,
  );

  if (!article) {
    notFound();
  }

  const readingTime = article.body ? estimateReadingTime(article.body) : null;

  const coverImageUrl = article.coverImage?.asset
    ? urlFor(article.coverImage)
        .width(1600)
        .height(700)
        .fit("crop")
        .auto("format")
        .url()
    : null;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">
        <div className="relative w-full aspect-[16/7] bg-secondary overflow-hidden">
          {coverImageUrl ? (
            <Image
              src={coverImageUrl}
              alt={article.coverImage?.alt ?? article.title}
              fill
              sizes="100vw"
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-secondary" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container max-w-3xl pt-8 pb-20">
          <nav className="flex items-center gap-1.5 text-sm text-foreground/50 mb-6 flex-wrap">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Home size={13} />
              Beranda
            </Link>
            <ChevronRight size={13} />
            <Link
              href="/articles"
              className="hover:text-primary transition-colors"
            >
              Artikel
            </Link>
            <ChevronRight size={13} />
            <span className="text-foreground/70 line-clamp-1">
              {article.title}
            </span>
          </nav>

          <div className="flex flex-col gap-4 mb-10">
            {article.category && (
              <Link
                href={`/articles?category=${article.category.slug}`}
                className="inline-flex"
              >
                <span className="bg-lime text-foreground text-xs font-semibold px-3 py-1 rounded-full w-fit">
                  {article.category.title}
                </span>
              </Link>
            )}

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/50">
              {article.publishedAt && (
                <time dateTime={article.publishedAt}>
                  {format(new Date(article.publishedAt), "d MMMM yyyy", {
                    locale: id,
                  })}
                </time>
              )}
              {readingTime && (
                <span className="flex items-center gap-1.5">
                  <Clock size={13} />
                  {readingTime} menit baca
                </span>
              )}
              {article.author && <span>oleh {article.author.name}</span>}
            </div>

            {article.excerpt && (
              <p className="text-lg text-foreground/60 leading-relaxed border-l-4 border-lime pl-4">
                {article.excerpt}
              </p>
            )}
          </div>

          <PortableTextRenderer value={article.body ?? []} />
        </div>

        {article.relatedArticles && article.relatedArticles.length > 0 && (
          <section className="bg-cream py-16">
            <div className="container">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                Artikel Terkait
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {article.relatedArticles.map((related, i) => (
                  <div key={related._id} className="space-y-0">
                    <ArticleCard article={related} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-primary py-16">
          <div className="container text-center flex flex-col items-center gap-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-background">
              Siap Pesan Qurban atau Aqiqah?
            </h2>
            <p className="text-background/70 max-w-md">
              Konsultasi gratis dengan tim Joya Land. Kami siap bantu kamu pilih
              hewan terbaik yang sesuai kebutuhan.
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
}
