const fs = require("fs");
const path = require("path");
const registry = require("../assets/js/routes.js");

const root = path.resolve(__dirname, "..");
const indexableRoutes = registry.routes.filter((route) => route.indexable);
const escapeXml = (value) =>
  value.replace(/[<>&'"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;"
  })[character]);

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...indexableRoutes.map((route) => [
    "  <url>",
    `    <loc>${escapeXml(route.canonical)}</loc>`,
    `    <lastmod>${route.lastModified}</lastmod>`,
    `    <changefreq>${route.changefreq}</changefreq>`,
    `    <priority>${Number(route.priority).toFixed(2)}</priority>`,
    "  </url>"
  ].join("\n")),
  "</urlset>",
  ""
].join("\n");

const redirects = [
  "# BentoCSS permanent route migrations.",
  "# Generated from assets/js/routes.js. Keep these redirects for at least one year.",
  ...registry.routes.flatMap((route) =>
    (route.aliases || []).map((alias) => `${alias} ${route.url} 301!`)
  ),
  ""
].join("\n");

fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(root, "_redirects"), redirects);
