// groq tagged template literal helper untuk syntax highlighting dan type-safety
const groq = String.raw;

// ─── Fields yang di-select untuk kartu preview artikel ────────────────────────
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

// ─── Artikel Featured untuk Homepage ──────────────────────────────────────────
export const FEATURED_ARTICLES_QUERY = groq`
  *[_type == "article" && status == "published" && isFeatured == true]
  | order(publishedAt desc)
  [0...3] {
    ${ARTICLE_CARD_FIELDS}
  }
`;

// ─── Semua Artikel (untuk halaman list) ────────────────────────────────────────
export const ALL_ARTICLES_QUERY = groq`
  *[_type == "article" && status == "published"]
  | order(publishedAt desc) {
    ${ARTICLE_CARD_FIELDS}
  }
`;

// ─── Artikel Berdasarkan Kategori ─────────────────────────────────────────────
export const ARTICLES_BY_CATEGORY_QUERY = groq`
  *[_type == "article" && status == "published" && category->slug.current == $categorySlug]
  | order(publishedAt desc) {
    ${ARTICLE_CARD_FIELDS}
  }
`;

// ─── Semua Kategori ────────────────────────────────────────────────────────────
export const ALL_CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`;

// ─── Detail Artikel by Slug ────────────────────────────────────────────────────
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
