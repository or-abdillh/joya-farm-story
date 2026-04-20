import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "@/lib/sanityClient";
import { ARTICLE_BY_SLUG_QUERY } from "@/lib/queries";
import { Article } from "@/types/article";

export function useArticle(slug: string) {
  return useQuery<Article | null>({
    queryKey: ["article", slug],
    queryFn: () => sanityClient.fetch(ARTICLE_BY_SLUG_QUERY, { slug }),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
}
