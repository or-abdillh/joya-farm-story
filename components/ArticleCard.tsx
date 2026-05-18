import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ArticleCard as ArticleCardType } from "@/types/article";
import { urlFor } from "@/lib/sanityImageUrl";

interface ArticleCardProps {
  article: ArticleCardType;
  className?: string;
}

const ArticleCard = ({ article, className = "" }: ArticleCardProps) => {
  const { title, slug, excerpt, publishedAt, coverImage, category } = article;

  const formattedDate = format(new Date(publishedAt), "d MMMM yyyy", {
    locale: id,
  });

  const imageUrl = coverImage?.asset
    ? urlFor(coverImage).width(600).height(400).fit("crop").auto("format").url()
    : null;

  return (
    <Link
      href={`/articles/${slug}`}
      className={`group flex flex-col bg-background rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
      {/* Cover Image */}
      <div className="relative aspect-[3/2] overflow-hidden bg-secondary">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={coverImage?.alt ?? title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary text-secondary-foreground/40 text-sm">
            Tidak ada gambar
          </div>
        )}
        {/* Category badge */}
        {category && (
          <span className="absolute top-3 left-3 bg-lime text-foreground text-xs font-semibold px-3 py-1 rounded-full">
            {category.title}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <time
          dateTime={publishedAt}
          className="text-xs text-foreground/50 font-medium"
        >
          {formattedDate}
        </time>
        <h3 className="font-display text-lg font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3 flex-1">
          {excerpt}
        </p>
        <span className="text-sm font-semibold text-primary group-hover:underline mt-auto">
          Baca Selengkapnya →
        </span>
      </div>
    </Link>
  );
};

export default ArticleCard;
