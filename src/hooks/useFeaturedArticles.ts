import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "@/lib/sanityClient";
import { FEATURED_ARTICLES_QUERY } from "@/lib/queries";
import { ArticleCard } from "@/types/article";

export function useFeaturedArticles() {
  return useQuery<ArticleCard[]>({
    queryKey: ["articles", "featured"],
    queryFn: () => sanityClient.fetch(FEATURED_ARTICLES_QUERY),
    staleTime: 1000 * 60 * 10, // 10 menit
  });
}
