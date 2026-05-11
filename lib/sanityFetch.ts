import { sanityClient } from "./sanityClient";

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  revalidate = 300,
) {
  return sanityClient.fetch<T>(query, params, {
    next: { revalidate },
  });
}
