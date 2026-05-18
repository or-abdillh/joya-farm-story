const groq = String.raw;

const ARTICLE_CARD_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  coverImage {
    asset,
    alt,
    hotspot,
    crop
  },
  category-> {
    _id,
    title,
    "slug": slug.current
  }
`;

export const FEATURED_ARTICLES_QUERY = groq`
  *[_type == "article" && status == "published" && isFeatured == true]
  | order(publishedAt desc)
  [0...3] {
    ${ARTICLE_CARD_FIELDS}
  }
`;

export const ALL_ARTICLES_QUERY = groq`
  *[_type == "article" && status == "published"]
  | order(publishedAt desc) {
    ${ARTICLE_CARD_FIELDS}
  }
`;

export const ARTICLES_BY_CATEGORY_QUERY = groq`
  *[_type == "article" && status == "published" && category->slug.current == $categorySlug]
  | order(publishedAt desc) {
    ${ARTICLE_CARD_FIELDS}
  }
`;

export const ALL_CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`;

export const ARTICLE_BY_SLUG_QUERY = groq`
  *[_type == "article" && status == "published" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage {
      asset,
      alt,
      hotspot,
      crop
    },
    body,
    category-> {
      _id,
      title,
      "slug": slug.current
    },
    author-> {
      _id,
      name,
      image,
      bio
    },
    relatedArticles[]-> {
      ${ARTICLE_CARD_FIELDS}
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const ALL_ARTICLE_SLUGS_QUERY = groq`
  *[_type == "article" && status == "published" && defined(slug.current)] {
    "slug": slug.current
  }
`;
