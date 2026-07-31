const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const slugs = [
  "container-query-builder",
  "subgrid-generator",
  "masonry-layout-generator",
  "responsive-card-grid-generator",
  "intrinsic-sidebar-generator",
  "holy-grail-layout-generator",
  "grid-named-areas-designer",
  "responsive-media-builder",
  "container-unit-calculator",
  "responsive-breakpoint-planner",
];

const failures = [];
const titles = new Set();
const descriptions = new Set();
const fail = (slug, message) => failures.push(`${slug}: ${message}`);

for (const slug of slugs) {
  const file = path.join(root, "other-tools", `${slug}.html`);
  if (!fs.existsSync(file)) {
    fail(slug, "page is missing");
    continue;
  }

  const html = fs.readFileSync(file, "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta\s+name="description"\s+content="([^"]+)"/s)?.[1];
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/s)?.[1];

  if (!title) fail(slug, "title is missing");
  else if (titles.has(title)) fail(slug, "title is duplicated");
  else titles.add(title);

  if (!description) fail(slug, "meta description is missing");
  else if (descriptions.has(description)) fail(slug, "meta description is duplicated");
  else descriptions.add(description);

  const expectedCanonical = `https://bentocss.netlify.app/other-tools/${slug}.html`;
  if (canonical !== expectedCanonical) fail(slug, `canonical must be ${expectedCanonical}`);

  const requirements = [
    [`data-other-tool="${slug}"`, "tool runtime identifier"],
    ["/assets/css/other-tools.css", "shared tool stylesheet"],
    ["/assets/js/other-tools.js", "shared tool runtime"],
    ["id=\"other-controls\"", "controls mount"],
    ["id=\"other-preview\"", "preview mount"],
    ["id=\"other-code\"", "code output mount"],
    ["id=\"other-fullscreen\"", "full-screen preview"],
    ["Frequently asked questions", "FAQ content"],
    ["Related responsive tools", "related-tool links"],
    ["application/ld+json", "structured data"],
  ];
  for (const [needle, label] of requirements) {
    if (!html.includes(needle)) fail(slug, `${label} is missing`);
  }

  const related = (html.match(/href="\/other-tools\/[^"]+\.html"/g) || []).length;
  if (related < 5) fail(slug, `only ${related} related Other Tools links found; expected at least 5`);

  const faqs = (html.match(/<details>/g) || []).length;
  if (faqs < 5) fail(slug, `only ${faqs} visible FAQs found; expected at least 5`);
}

const indexHtml = fs.readFileSync(path.join(root, "other-tools", "index.html"), "utf8");
for (const slug of slugs) {
  if (!indexHtml.includes(`/other-tools/${slug}.html`)) fail("index", `missing link to ${slug}`);
}

const runtime = fs.readFileSync(path.join(root, "assets", "js", "other-tools.js"), "utf8");
for (const slug of slugs) {
  if (!runtime.includes(`"${slug}"`)) fail(slug, "shared runtime engine is missing");
}
[
  ["other-range-value", "live range values"],
  ["Project JSON", "project JSON export"],
  ["Defaults restored", "reset behavior"],
  ["sidebar-mobile-menu", "accessible mobile sidebar navigation"],
  ["grid-template-columns: 1fr; } }", "narrow breakpoint output"],
].forEach(([needle, label]) => {
  if (!runtime.includes(needle)) fail("runtime", `${label} is missing`);
});

const toolCss = fs.readFileSync(path.join(root, "assets", "css", "other-tools.css"), "utf8");
[
  ["[data-device=mobile] .ot-sidebar-layout", "mobile sidebar preview rules"],
  ["[data-device=mobile] .ot-card-grid", "mobile card preview rules"],
  ["[data-device=mobile] .ot-media-grid", "mobile media preview rules"],
].forEach(([needle, label]) => {
  if (!toolCss.includes(needle)) fail("styles", `${label} are missing`);
});

if (failures.length) {
  console.error(`Other Tools validation failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(JSON.stringify({
  pages: slugs.length,
  uniqueTitles: titles.size,
  uniqueDescriptions: descriptions.size,
  indexLinks: slugs.length,
  errors: 0,
}, null, 2));
