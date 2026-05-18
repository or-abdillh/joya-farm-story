import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "./sanityClient";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
