const fs = require("fs");
const path = require("path");
const registry = require("../assets/js/routes.js");

const root = path.resolve(__dirname, "..");
const errors = [];
const redirectsText = fs.readFileSync(path.join(root, "_redirects"), "utf8");
const sitemapText = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const robotsText = fs.readFileSync(path.join(root, "robots.txt"), "utf8");
const redirects = new Map();

for (const line of redirectsText.split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const [from, to, status] = trimmed.split(/\s+/);
  if (redirects.has(from)) errors.push(`Duplicate redirect source: ${from}`);
  redirects.set(from, { to, status });
}

const routeByUrl = new Map(registry.routes.map((route) => [route.url, route]));
const aliasUrls = new Set(
  registry.routes.flatMap((route) => route.aliases || [])
);
const titleOwners = new Map();
const descriptionOwners = new Map();
const focusIds = new Set([
  "bento-grid-generator",
  "css-grid-generator",
  "tailwind-bento-generator",
  "dashboard-layout-generator",
  "hero-section-generator",
  "pricing-table-generator",
  "feature-section-generator",
  "navbar-generator",
  "footer-generator",
  "testimonial-generator"
]);
const focusGuideBodies = new Map();
const resourceIds = new Set([
  "html-css-generators",
  "css-grid-examples",
  "best-bento-layouts",
  "css-grid-cheatsheet",
  "tailwind-grid-cheatsheet",
  "landing-page-layouts",
  "portfolio-layouts",
  "ui-layout-templates",
  "changelog",
  "code-license"
]);
const phase5Controls = {
  "css-grid-generator": ["css-repeat-mode","css-named-areas","css-auto-columns","css-justify-items","css-breakpoint"],
  "tailwind-bento-generator": ["tw-version","tw-arbitrary-tracks","tw-dedupe","tw-example-scope","tw-config-notes"],
  "dashboard-layout-generator": ["dashboard-header","dashboard-charts","dashboard-table","dashboard-feed","dashboard-state"],
  "hero-section-generator": ["hero-badge","hero-heading-width","hero-secondary-cta","hero-social-proof","hero-background"],
  "pricing-table-generator": ["pricing-feature-groups","pricing-tooltips","pricing-enterprise","pricing-comparison"],
  "feature-section-generator": ["feature-layout","feature-align","feature-links"],
  "navbar-generator": ["nav-dropdowns","nav-state","nav-mobile-state","nav-focus-management","nav-keyboard"],
  "footer-generator": ["footer-mode","footer-legal","footer-social","footer-trust"],
  "testimonial-generator": ["testimonial-company","testimonial-avatar","testimonial-source","testimonial-reduced-motion"]
};

for (const route of registry.routes) {
  const file = path.join(root, route.outputPath);
  if (!fs.existsSync(file)) {
    errors.push(`Missing route file: ${route.outputPath}`);
    continue;
  }

  const html = fs.readFileSync(file, "utf8");
  if (route.indexable) {
    const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]?.trim();
    const description = (
      html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i) ||
      html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i) ||
      []
    )[1];
    if (!title) errors.push(`Missing title in ${route.outputPath}`);
    else if (titleOwners.has(title)) {
      errors.push(`Duplicate title: ${route.outputPath} and ${titleOwners.get(title)}`);
    } else titleOwners.set(title, route.outputPath);
    if (!description) errors.push(`Missing description in ${route.outputPath}`);
    else if (descriptionOwners.has(description)) {
      errors.push(
        `Duplicate description: ${route.outputPath} and ${descriptionOwners.get(description)}`
      );
    } else descriptionOwners.set(description, route.outputPath);
    const canonical = (
      html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i) ||
      html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i) ||
      []
    )[1];
    if (canonical !== route.canonical) {
      errors.push(
        `Incorrect canonical in ${route.outputPath}: ${canonical || "missing"}`
      );
    }
    if (!sitemapText.includes(`<loc>${route.canonical}</loc>`)) {
      errors.push(`Indexable route missing from sitemap: ${route.url}`);
    }
    if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) {
      errors.push(`Accidental noindex on indexable route: ${route.outputPath}`);
    }
  } else {
    if (sitemapText.includes(`<loc>${route.canonical}</loc>`)) {
      errors.push(`Noindex route included in sitemap: ${route.url}`);
    }
    if (!/<meta[^>]+name=["']robots["'][^>]+content=["']noindex,follow["']/i.test(html)) {
      errors.push(`Noindex directive missing from ${route.outputPath}`);
    }
  }

  if (resourceIds.has(route.id)) {
    for (const marker of [
      `data-resource-tool="${route.id}"`,
      'id="resource-lab"',
      'id="resource-search"',
      'id="resource-filter"',
      'id="resource-items"',
      'id="resource-preview"',
      'id="resource-copy"',
      'id="resource-download"',
      'id="resource-compare-output"',
      '/assets/js/resource-tools.js'
    ]) {
      if (!html.includes(marker)) errors.push(`Resource-page evidence missing in ${route.outputPath}: ${marker}`);
    }
  }

  if (route.section !== "root") {
    const openGraphUrl = (
      html.match(/<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:url["']/i) ||
      []
    )[1];
    if (openGraphUrl !== route.canonical) {
      errors.push(
        `Incorrect Open Graph URL in ${route.outputPath}: ${openGraphUrl || "missing"}`
      );
    }
    if (!html.includes('<script src="/assets/js/routes.js" defer></script>')) {
      errors.push(`Shared route registry missing from ${route.outputPath}`);
    }
    if (html.includes("window.BENTO_PAGES")) {
      errors.push(`Legacy inline search registry in ${route.outputPath}`);
    }
    if (focusIds.has(route.id)) {
      for (const marker of [
        `data-focus-tool="${route.id}"`,
        'id="focus-canvas"',
        'id="focus-code"',
        'id="focus-copy"',
        'id="focus-download"',
        'data-template-count="10"',
        'data-output="html"',
        'data-output="css"',
        'data-output="tailwind"',
        'data-output="react"',
        'id="recommended-tools-template"',
        'class="affiliate-disclosure"',
        '/assets/js/focus-tools.js'
      ]) {
        if (!html.includes(marker)) {
          errors.push(`Focus-page evidence missing in ${route.outputPath}: ${marker}`);
        }
      }
      for (const marker of ['id="focus-project-name"','id="focus-recent-projects"','id="focus-save-project"','id="focus-export-json"','id="focus-import-json"']) {
        if (!html.includes(marker)) errors.push(`Project workspace missing in ${route.outputPath}: ${marker}`);
      }
      if(route.id==="bento-grid-generator") for(const marker of ['/assets/js/advanced-bento.js','id="bento-validation"','id="bento-selection-panel"','id="bento-desktop-columns"','id="bento-tablet-columns"','id="bento-mobile-columns"']) if(!html.includes(marker)) errors.push(`Advanced bento evidence missing: ${marker}`);
      for(const marker of ['/assets/js/fullscreen-preview.js','id="focus-download"']) if(!html.includes(marker)) errors.push(`Shared preview evidence missing in ${route.outputPath}: ${marker}`);
      for(const control of phase5Controls[route.id]||[]) if(!html.includes(`id="${control}"`)) errors.push(`Specialized control missing in ${route.outputPath}: ${control}`);
      if(phase5Controls[route.id]&&!html.includes('/assets/js/specialized-tools.js')) errors.push(`Specialized runtime missing in ${route.outputPath}`);
      const guideBody = (
        html.match(/<div id="guide">([\s\S]*?)<section class="section container related">/) ||
        []
      )[1];
      if (!guideBody) errors.push(`Focus guide missing in ${route.outputPath}`);
      else {
        const normalized = guideBody.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
        if (normalized.split(" ").length < 350) {
          errors.push(`Focus guide is too thin in ${route.outputPath}`);
        }
        if (focusGuideBodies.has(normalized)) {
          errors.push(`Duplicate focus guide: ${route.outputPath}`);
        }
        focusGuideBodies.set(normalized, route.outputPath);
      }
    }
    const jsonLdBlocks = Array.from(
      html.matchAll(
        /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
      ),
      (match) => match[1].trim()
    );
    if (!jsonLdBlocks.length) {
      errors.push(`Missing JSON-LD in ${route.outputPath}`);
    } else {
      for (const block of jsonLdBlocks) {
        try {
          const data = JSON.parse(block);
          const nodes = data["@graph"] || [data];
          const webPage = nodes.find((node) => node["@type"] === "WebPage");
          if (webPage && (webPage.url !== route.canonical || webPage["@id"] !== route.canonical)) {
            errors.push(`Incorrect WebPage structured URL in ${route.outputPath}`);
          }
          const breadcrumbs = nodes.find(
            (node) => node["@type"] === "BreadcrumbList"
          );
          const finalCrumb = breadcrumbs?.itemListElement?.at(-1);
          if (breadcrumbs && finalCrumb?.item !== route.canonical) {
            errors.push(`Incorrect final structured breadcrumb in ${route.outputPath}`);
          }
        } catch {
          errors.push(`Invalid JSON-LD in ${route.outputPath}`);
        }
      }
    }
    for (const match of html.matchAll(/(?:href|src)=["']([^"'#]+)["']/gi)) {
      const target = match[1];
      if (aliasUrls.has(target)) {
        errors.push(`Old migrated link in ${route.outputPath}: ${target}`);
      }
      if (!target.startsWith("/") || target === "/") continue;
      const clean = target.split(/[?#]/)[0];
      if (
        clean.startsWith("/assets/") ||
        ["/robots.txt", "/sitemap.xml", "/llms.txt"].includes(clean)
      ) continue;
      if (routeByUrl.has(clean) || redirects.has(clean)) continue;
      const local = path.join(root, clean.slice(1));
      if (!fs.existsSync(local)) {
        errors.push(`Broken internal link in ${route.outputPath}: ${target}`);
      }
    }
  }
}

for (const route of registry.routes) {
  for (const alias of route.aliases || []) {
    const redirect = redirects.get(alias);
    if (!redirect) {
      errors.push(`Missing redirect: ${alias} -> ${route.url}`);
      continue;
    }
    if (redirect.to !== route.url || !redirect.status.startsWith("301")) {
      errors.push(
        `Incorrect redirect: ${alias} -> ${redirect.to} ${redirect.status}`
      );
    }
    if (redirects.has(redirect.to)) {
      errors.push(`Redirect chain: ${alias} -> ${redirect.to}`);
    }
    const destination = routeByUrl.get(redirect.to);
    if (!destination || !fs.existsSync(path.join(root, destination.outputPath))) {
      errors.push(`Redirect destination does not resolve locally: ${redirect.to}`);
    }
    if (sitemapText.includes(`<loc>${registry.domain}${alias}</loc>`)) {
      errors.push(`Redirect source included in sitemap: ${alias}`);
    }
  }
}

const sitemapUrls = Array.from(
  sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g),
  (match) => match[1]
);
if (new Set(sitemapUrls).size !== sitemapUrls.length) {
  errors.push("Duplicate URL in sitemap");
}
for (const canonical of sitemapUrls) {
  const url = canonical.replace(registry.domain, "");
  const route = routeByUrl.get(url);
  if (!route) errors.push(`Unknown sitemap URL: ${canonical}`);
  else if (!route.indexable) errors.push(`Noindex route in sitemap: ${canonical}`);
}
if (!robotsText.includes(`Sitemap: ${registry.domain}/sitemap.xml`)) {
  errors.push("robots.txt does not reference the canonical sitemap URL");
}
if (!/User-agent:\s*\*[\s\S]*?Allow:\s*\//i.test(robotsText)) {
  errors.push("robots.txt does not allow general crawling");
}

if (errors.length) {
  console.error(`Route validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      routes: registry.routes.length,
      indexableRoutes: registry.routes.filter((route) => route.indexable).length,
      noindexRoutes: registry.routes.filter((route) => !route.indexable).length,
      focusPagesWithInteractiveEvidence: focusIds.size,
      resourcePagesWithInteractiveEvidence: resourceIds.size,
      duplicateIndexableTitles: 0,
      duplicateIndexableDescriptions: 0,
      permanentRedirects: redirects.size,
      brokenInternalLinks: 0,
      incorrectCanonicals: 0,
      redirectChains: 0,
      sitemapErrors: 0
    },
    null,
    2
  )
);
