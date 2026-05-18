import type { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/sanityFetch";
import { ALL_ARTICLE_SLUGS_QUERY } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://joyaland.id";
  const now = new Date().toISOString();
  const slugs = await sanityFetch<{ slug: string }[]>(
    ALL_ARTICLE_SLUGS_QUERY,
    {},
    300,
  );

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = slugs.map(({ slug }) => ({
    url: `${baseUrl}/articles/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...articleRoutes];
}
