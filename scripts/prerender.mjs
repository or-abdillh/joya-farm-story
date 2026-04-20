/**
 * Prerender Script - Joya Land
 *
 * Generates static HTML snapshots for all pages (homepage, article list,
 * and every article detail page) so search engines and social media crawlers
 * can read fully-rendered content including <meta> / Open Graph tags.
 *
 * Also generates public/sitemap.xml from live Sanity data.
 *
 * Usage (after vite build):
 *   node scripts/prerender.mjs
 *
 * Or via the npm script:
 *   npm run build:seo
 */

import { chromium } from "playwright";
import { createClient } from "@sanity/client";
import { spawn } from "child_process";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

// Read env – fall back to hard-coded project values when .env isn't loaded
const PROJECT_ID =
  process.env.VITE_SANITY_PROJECT_ID ?? "uk5xi1by";
const DATASET =
  process.env.VITE_SANITY_DATASET ?? "production";
const SITE_URL =
  process.env.VITE_SITE_URL ?? "https://joyaland.id";

// ---------------------------------------------------------------------------
// Sanity client (Node – no stega / preview)
// ---------------------------------------------------------------------------

const sanity = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Fetch every published article slug + its last modified date from Sanity */
async function fetchArticleData() {
  return sanity.fetch(
    `*[_type == "article" && defined(slug.current) && !(_id in path("drafts.**"))]{
      "slug": slug.current,
      "updatedAt": _updatedAt
    }`
  );
}

/** Resolve the dist path for a given route and write the HTML */
function saveHtml(route, html) {
  const filePath =
    route === "/"
      ? join(DIST, "index.html")
      : join(DIST, route.replace(/^\//, ""), "index.html");

  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, html, "utf-8");
  console.log(`  ✓  ${route}`);
}

/** Spawn vite preview and resolve once the server is ready */
function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const server = spawn(
      "node",
      ["node_modules/vite/bin/vite.js", "preview", "--port", String(PORT), "--strictPort"],
      { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] }
    );

    let ready = false;

    const onData = (data) => {
      if (!ready && String(data).includes(String(PORT))) {
        ready = true;
        resolve(server);
      }
    };

    server.stdout.on("data", onData);
    server.stderr.on("data", onData);

    server.on("error", reject);

    // Safety timeout – resolve anyway after 5 s
    setTimeout(() => {
      if (!ready) {
        ready = true;
        resolve(server);
      }
    }, 5000);
  });
}

/** Generate sitemap.xml and write it to dist/ */
function writeSitemap(routes, articleData) {
  const now = new Date().toISOString().split("T")[0];

  const staticRoutes = [
    { loc: "/", changefreq: "weekly", priority: "1.0", lastmod: now },
    { loc: "/articles", changefreq: "daily", priority: "0.9", lastmod: now },
  ];

  const articleRoutes = articleData.map(({ slug, updatedAt }) => ({
    loc: `/articles/${slug}`,
    changefreq: "monthly",
    priority: "0.8",
    lastmod: updatedAt ? updatedAt.split("T")[0] : now,
  }));

  const allRoutes = [...staticRoutes, ...articleRoutes];

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...allRoutes.map(
      ({ loc, changefreq, priority, lastmod }) =>
        [
          `  <url>`,
          `    <loc>${SITE_URL}${loc}</loc>`,
          `    <lastmod>${lastmod}</lastmod>`,
          `    <changefreq>${changefreq}</changefreq>`,
          `    <priority>${priority}</priority>`,
          `  </url>`,
        ].join("\n")
    ),
    `</urlset>`,
  ].join("\n");

  writeFileSync(join(DIST, "sitemap.xml"), xml, "utf-8");
  console.log(`  ✓  sitemap.xml (${allRoutes.length} URLs)`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("\n🌿 Joya Land – Prerender\n");

  // 1. Fetch article data from Sanity
  console.log("Fetching article slugs from Sanity…");
  let articleData = [];
  try {
    articleData = await fetchArticleData();
    console.log(`  Found ${articleData.length} article(s)\n`);
  } catch (err) {
    console.warn("  ⚠  Could not reach Sanity – skipping article pages.", err.message);
  }

  const routes = [
    "/",
    "/articles",
    ...articleData.map(({ slug }) => `/articles/${slug}`),
  ];

  // 2. Start preview server
  console.log("Starting vite preview server…");
  const server = await startPreviewServer();

  // 3. Launch Playwright
  // Use system Chromium if the Playwright-managed one isn't downloaded yet.
  console.log("Launching headless browser…\n");
  const CHROMIUM_CANDIDATES = [
    "/snap/bin/chromium",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
  ];
  const executablePath = CHROMIUM_CANDIDATES.find(existsSync);
  const browser = await chromium.launch({ executablePath });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Suppress noisy console messages from the page
  page.on("console", () => {});
  page.on("pageerror", () => {});

  // 4. Visit & snapshot each route
  console.log("Prerendering routes:");
  for (const route of routes) {
    try {
      await page.goto(`${BASE_URL}${route}`, {
        waitUntil: "networkidle",
        timeout: 30000,
      });
      const html = await page.content();
      saveHtml(route, html);
    } catch (err) {
      console.warn(`  ✗  ${route} – ${err.message}`);
    }
  }

  // 5. Generate sitemap.xml
  console.log("\nGenerating sitemap.xml:");
  writeSitemap(routes, articleData);

  // 6. Cleanup
  await browser.close();
  server.kill();

  console.log("\n✅ Prerender complete.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
