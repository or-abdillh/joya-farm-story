import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "@/lib/sanityClient";
import { ALL_CATEGORIES_QUERY } from "@/lib/queries";
import { Category } from "@/types/article";

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => sanityClient.fetch(ALL_CATEGORIES_QUERY),
    staleTime: 1000 * 60 * 30, // 30 menit, kategori jarang berubah
  });
}
