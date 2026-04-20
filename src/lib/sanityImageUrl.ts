import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./sanityClient";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

const builder = imageUrlBuilder(sanityClient);

/**
 * Helper untuk generate URL gambar dari Sanity CDN.
 * Contoh penggunaan: urlFor(image).width(800).url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
