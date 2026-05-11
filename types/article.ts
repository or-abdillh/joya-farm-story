export interface SanityImage {
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  caption?: string;
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
}

export interface Author {
  _id: string;
  name: string;
  image?: SanityImage;
  bio?: string;
}

export interface ArticleSeo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
}

/** Digunakan untuk kartu preview artikel (list page + homepage) */
export interface ArticleCard {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  coverImage: SanityImage;
  category: Category;
}

/** Digunakan untuk halaman detail artikel */
export interface Article extends ArticleCard {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
  author?: Author;
  relatedArticles?: ArticleCard[];
  seo?: ArticleSeo;
}
