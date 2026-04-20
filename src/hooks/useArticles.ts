import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "@/lib/sanityClient";
import { ALL_ARTICLES_QUERY, ARTICLES_BY_CATEGORY_QUERY } from "@/lib/queries";
import { ArticleCard } from "@/types/article";

export function useArticles(categorySlug?: string) {
  return useQuery<ArticleCard[]>({
    queryKey: ["articles", categorySlug ?? "all"],
    queryFn: async () => {
      if (categorySlug) {
        return sanityClient.fetch(ARTICLES_BY_CATEGORY_QUERY, { categorySlug });
      }
      return sanityClient.fetch(ALL_ARTICLES_QUERY);
    },
    staleTime: 1000 * 60 * 5, // 5 menit
  });
}
