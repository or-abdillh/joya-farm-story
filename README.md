# Joya Farm SSR

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` based on `.env.example`:

```bash
cp .env.example .env.local
```

3. Fill the Sanity environment variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Notes

- Pages use App Router with SSG + ISR for SEO-friendly rendering.
- Landing page uses `FeaturedArticles` server fetch + client animation grid.
- Article routes use `generateStaticParams` and dynamic metadata.
- Sitemap and robots are generated in `app/sitemap.ts` and `app/robots.ts`.
