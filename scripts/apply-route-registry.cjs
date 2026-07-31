const fs = require("fs");
const path = require("path");
const registry = require("../assets/js/routes.js");

const root = path.resolve(__dirname, "..");
const platformRoutes = registry.routes.filter((route) =>
  ["tools", "guides", "templates"].includes(route.section)
);
const aliasMap = new Map();

for (const route of registry.routes) {
  for (const alias of route.aliases || []) aliasMap.set(alias, route.url);
}

const platformFiles = platformRoutes
  .map((route) => path.join(root, route.outputPath))
  .filter((file) => fs.existsSync(file));

for (const file of platformFiles) {
  let html = fs.readFileSync(file, "utf8");
  const route = platformRoutes.find(
    (candidate) => path.join(root, candidate.outputPath) === file
  );

  for (const [oldUrl, newUrl] of aliasMap) {
    if (oldUrl === "/templates") continue;
    html = html.split(oldUrl).join(newUrl);
    html = html.split(registry.domain + oldUrl).join(registry.domain + newUrl);
  }
  html = html
    .split("/templates.html/ui-layout-templates.html")
    .join("/templates/ui-layout-templates.html")
    .replace(
      /\/templates(?:\.html)+\/ui-layout-templates\.html/g,
      "/templates/ui-layout-templates.html"
    );

  html = html.replace(
    /<link rel="canonical" href="[^"]+">/,
    `<link rel="canonical" href="${route.canonical}">`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]+">/,
    `<meta property="og:url" content="${route.canonical}">`
  );
  html = html
    .replace(/<meta name="author"[^>]*>/gi, "")
    .replace(/<meta name="robots"[^>]*>/gi, "")
    .replace(
      '<meta name="viewport" content="width=device-width,initial-scale=1">',
      `<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="author" content="BentoCSS Editorial Team">${route.indexable ? "" : '<meta name="robots" content="noindex,follow">'}`
    );

  // Canonical and structured-data URLs for the current page.
  const oldCanonicalPattern = new RegExp(
    registry.domain.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
      "/tools/" +
      route.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
      "\\.html",
    "g"
  );
  html = html.replace(oldCanonicalPattern, route.canonical);

  // The tools catalog is the existing crawlable parent hub for all platform pages.
  html = html.replace(
    /"position":2,"name":"Tools","item":"https:\/\/bentocss\.netlify\.app\/tools\/"/g,
    '"position":2,"name":"Tools & Resources","item":"https://bentocss.netlify.app/tools/html-css-generators.html"'
  );

  if (!route.indexable && !html.includes("coming-soon-note")) {
    html = html.replace(
      '<div class="container breadcrumbs">',
      '<div class="container coming-soon-note" role="status"><strong>Preview status:</strong> This resource remains available for evaluation but is excluded from search indexing until its unique functionality and editorial review are complete.</div><div class="container breadcrumbs">'
    );
  } else if (route.indexable) {
    html = html.replace(
      /<div class="container coming-soon-note" role="status">[\s\S]*?<\/div>/,
      ""
    );
  }
  if (!html.includes("editorial-note")) {
    html = html.replace(
      "</main>",
      '<aside class="container editorial-note" aria-label="Editorial information">Created and reviewed by the BentoCSS Editorial Team. Last reviewed July 30, 2026. Report a problem through the <a href="/contact.html">contact page</a>. Generated snippets are covered by the <a href="/code-license.html">BentoCSS generated-code license</a>. Affiliate recommendations are disclosed and may earn BentoCSS a commission at no extra cost to you.</aside></main>'
    );
  }

  // Replace duplicated inline search data with the shared registry.
  html = html.replace(
    /<script>\s*window\.BENTO_PAGES\s*=\s*\[[\s\S]*?<\/script>\s*<script src="\/assets\/js\/components\.js" defer><\/script>/,
    '<script src="/assets/js/routes.js" defer></script><script src="/assets/js/components.js" defer></script>'
  );

  fs.writeFileSync(file, html);
}

// Correct the one legacy templates canonical without changing its layout or content.
const legacyTemplates = path.join(root, "templates.html");
if (fs.existsSync(legacyTemplates)) {
  let html = fs.readFileSync(legacyTemplates, "utf8");
  html = html
    .split(`${registry.domain}/templates.html.html`)
    .join(`${registry.domain}/templates.html`)
    .replace(
      /https:\/\/bentocss\.netlify\.app\/templates(?=["'])/g,
      `${registry.domain}/templates.html`
    );
  fs.writeFileSync(legacyTemplates, html);
}

// Correct trust wording shared by the original root pages without changing layout.
for (const fileName of [
  "index.html",
  "about.html",
  "contact.html",
  "design-guide.html",
  "privacy-policy.html",
  "tailwind-bento-generator.html",
  "tailwind-guide.html",
  "templates.html"
]) {
  const file = path.join(root, fileName);
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, "utf8")
    .replace(/BentoGrid Generator/g, "BentoCSS")
    .replace(/About Bentogrid/g, "About BentoCSS")
    .replace(/Privacy Poilicy/g, "Privacy Policy")
    .replace(/href="#"(\s+class="inline-block px-6 py-3 bg-blue-600)/g, 'href="#grid-preview"$1')
    .replace(
      /Built for developers\. No sign-up\. No tracking\./g,
      "Built for developers. No sign-up. Privacy-conscious analytics."
    );
  fs.writeFileSync(file, html);
}
