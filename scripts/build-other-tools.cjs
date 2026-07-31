const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "other-tools");
fs.mkdirSync(outputDir, { recursive: true });

const tools = [
  {
    id: "container-query-builder", name: "CSS Container Query Builder", keyword: "CSS container query generator",
    description: "Build CSS container queries visually with named containers, size conditions, container units, nested-context examples, fallbacks, and live component previews.",
    answer: "A CSS container query applies styles according to the size or state of a containing element rather than the viewport. This builder creates the containment context and matching @container rules, then lets you resize the component’s parent to verify when each condition applies.",
    problem: "Reusable cards often appear in a sidebar, modal, content grid, or full-width region. Viewport media queries cannot know how much space the component actually receives. Container queries allow the card to respond to its local context, but authors must coordinate container type, optional names, query syntax, units, and fallbacks.",
    features: ["Named inline-size, size, and name/style-query configurations", "Resizable sidebar, modal, content, and full-width component contexts", "CSS, HTML, Tailwind guidance, React, and Astro output with fallback notes"],
    uses: ["Reusable article and product cards", "Sidebar widgets and dashboard panels", "Components distributed inside an external design system"],
    mistakes: ["Putting container-type on the component that needs to query itself instead of an ancestor", "Using size containment without understanding its sizing effect", "Publishing unsupported style-query declarations without a fallback"],
    source: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries"
  },
  {
    id: "subgrid-generator", name: "CSS Subgrid Generator and Visualizer", keyword: "CSS subgrid generator",
    description: "Visualize CSS subgrid alignment across parent and child tracks, inherited gaps, named lines, card rows, and production-ready responsive code.",
    answer: "CSS subgrid lets a nested grid reuse the track sizing of its parent. This visualizer compares inherited column or row tracks with an independent nested grid and generates the parent placement, child span, subgrid declarations, and aligned content markup.",
    problem: "Independent nested grids calculate their own tracks, which makes headings, copy, prices, and actions drift out of alignment across sibling cards. Subgrid fixes that relationship, but the child’s span, inherited line numbering, explicit parent rows, and gap behavior must be understood together.",
    features: ["Column, row, or two-axis subgrid modes", "Parent line, child span, gap inheritance, and named-line visualization", "Aligned card, form, pricing, specification, and timeline presets"],
    uses: ["Cards whose internal rows need to align", "Forms with labels and controls aligned to an outer grid", "Pricing and specification comparisons"],
    mistakes: ["Expecting implicit parent tracks to provide every required row", "Forgetting that line numbering restarts inside the subgrid", "Adding subgrid when sibling alignment is not a requirement"],
    source: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Subgrid"
  },
  {
    id: "masonry-layout-generator", name: "CSS Masonry Layout and Fallback Generator", keyword: "CSS masonry layout generator",
    description: "Create responsive masonry layouts with production CSS-column or Grid fallbacks, experimental grid-lanes enhancement, source-order guidance, and previews.",
    answer: "A masonry layout keeps one axis in tracks while items pack along the other axis without equal row heights. Native CSS masonry remains limited, so this generator creates a production fallback first and optionally enhances it with grid-lanes inside @supports.",
    problem: "Masonry is visually attractive for galleries and variable-height cards, but implementations can reorder reading expectations, split items, create layout shifts, or depend on experimental syntax. A responsible generator must show fallback behavior and source order instead of copying only the newest declaration.",
    features: ["CSS columns and regular Grid production fallbacks", "Optional grid-lanes progressive enhancement with current support warning", "Variable-height gallery, editorial, article, and portfolio presets"],
    uses: ["Photo and media galleries", "Portfolio collections", "Editorial or note feeds where strict row alignment is unnecessary"],
    mistakes: ["Treating experimental grid-lanes as universally supported", "Ignoring vertical fill order in CSS columns", "Using masonry for sequential tasks or tabular information"],
    source: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Masonry_layout"
  },
  {
    id: "responsive-card-grid-generator", name: "Responsive Card Grid Generator", keyword: "responsive card grid generator",
    description: "Generate content-aware responsive card grids using auto-fit or auto-fill, safe minimum tracks, media ratios, aligned actions, and long-content tests.",
    answer: "A responsive card grid uses repeat(), auto-fit or auto-fill, and minmax() to create as many usable columns as the container can support. This generator previews real article, product, profile, and feature cards instead of empty numbered boxes.",
    problem: "Card grids fail when their minimum width is chosen from a device label rather than content. Long headings, untranslated text, images, buttons, and intrinsic minimum sizes expose overflow and uneven action placement that a rectangle-only preview cannot reveal.",
    features: ["Content-aware product, article, profile, and feature cards", "auto-fit/auto-fill comparison and safe minmax tracks", "Media aspect ratios, long-copy stress testing, and bottom-aligned actions"],
    uses: ["Product and integration directories", "Article and resource feeds", "Team profiles and SaaS feature collections"],
    mistakes: ["Using minmax(300px,1fr) without min(100%,...) on very narrow containers", "Fixing card height and clipping real copy", "Making the whole card clickable while nesting other buttons or links"],
    source: "https://developer.mozilla.org/en-US/docs/Web/CSS/repeat"
  },
  {
    id: "intrinsic-sidebar-generator", name: "Intrinsic Sidebar Layout Generator", keyword: "responsive sidebar layout generator",
    description: "Build content-safe responsive sidebar layouts with intrinsic, fixed, or fluid tracks, sticky behavior, mobile stacking, landmarks, and app-shell exports.",
    answer: "An intrinsic sidebar layout gives navigation a bounded useful width and lets the main region consume the remaining space with minmax(0,1fr). The generator creates the desktop track and an explicit mobile stack or drawer-ready state.",
    problem: "A sidebar width must balance label length, available content space, sticky scrolling, and mobile navigation. Fixed widths can waste space, fractional tracks can become too narrow, and hiding navigation without a replacement makes the page unusable.",
    features: ["Fixed, fractional, and clamp-based intrinsic sizing", "Sticky navigation with safe maximum height and overflow", "Documentation, dashboard, account, blog, and filter presets"],
    uses: ["Documentation navigation", "Application dashboards and account settings", "Filter panels and editorial category navigation"],
    mistakes: ["Hiding mobile navigation without an accessible trigger", "Omitting min-width:0 behavior from the content track", "Making a tall sticky sidebar impossible to scroll"],
    source: "https://developer.mozilla.org/en-US/docs/Web/CSS/minmax"
  },
  {
    id: "holy-grail-layout-generator", name: "Holy Grail Page Layout Generator", keyword: "holy grail layout generator",
    description: "Create accessible header, footer, main-content, and optional two-sidebar page shells with sticky regions, mobile source order, and complete CSS output.",
    answer: "The holy grail layout combines a header, footer, flexible main region, and optional sidebars. CSS Grid can express the complete shell without fixed content heights while an explicit mobile area map preserves a useful reading order.",
    problem: "Page shells often look correct on desktop but collapse into a confusing order on mobile. Sticky headers and sidebars can overlap content, and visually reordered areas can diverge from keyboard and screen-reader source order.",
    features: ["Zero, one, or two sidebars with bounded tracks", "Sticky header/sidebar options and full-height shell preview", "Explicit mobile priority and semantic landmark output"],
    uses: ["Documentation and news websites", "Community and admin shells", "Applications with primary and contextual navigation"],
    mistakes: ["Using 100vh without accounting for growing content", "Changing visual order without reviewing source order", "Allowing sticky regions to overlap focused elements"],
    source: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Realizing_common_layouts_using_grids"
  },
  {
    id: "grid-named-areas-designer", name: "CSS Grid Named Areas Designer", keyword: "CSS grid template areas generator",
    description: "Paint and validate CSS grid-template-areas, map semantic elements, catch non-rectangular regions, and generate desktop and mobile area layouts.",
    answer: "grid-template-areas provides a visual text map of named Grid regions. This designer validates equal row widths and rectangular named regions, maps names to semantic elements, and produces a separate mobile map.",
    problem: "Named areas are readable but easy to mistype. Every row must contain the same number of cells and each named region must form a rectangle. Responsive rearrangement can also hide a source-order problem when the visual map is reviewed alone.",
    features: ["Editable ASCII area map with rectangular-region validation", "Semantic header, main, nav, aside, and footer mapping", "Independent mobile map and source-order guidance"],
    uses: ["Page shells and dashboards", "Editorial and portfolio compositions", "Teaching and documenting layout intent"],
    mistakes: ["Creating L-shaped named regions", "Using inconsistent cell counts between rows", "Assuming the area map changes DOM order"],
    source: "https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas"
  },
  {
    id: "responsive-media-builder", name: "Responsive Media and Aspect-Ratio Layout Builder", keyword: "responsive aspect ratio generator",
    description: "Build responsive image, video, and iframe layouts with aspect ratios, focal points, object-fit, picture art direction, dimensions, captions, and CLS guidance.",
    answer: "The CSS aspect-ratio property gives a media container a preferred width-to-height relationship. This builder combines that relationship with object-fit, object-position, responsive picture sources, intrinsic dimensions, captions, and a real grid.",
    problem: "A ratio calculator alone does not prevent distorted crops, missing alt text, cumulative layout shift, oversized downloads, or unusable captions. Media behavior must be tested inside its final responsive grid and with meaningful performance attributes.",
    features: ["Image, video, and iframe modes with six common ratios", "Focal point, object-fit, picture art direction, and loading controls", "Responsive grids with captions, credits, intrinsic dimensions, and CLS warnings"],
    uses: ["Portfolio and product galleries", "Video and interactive embeds", "Hero banners, avatars, and editorial media"],
    mistakes: ["Using object-fit:fill and distorting content", "Lazy-loading the likely LCP hero image", "Omitting width and height attributes from images"],
    source: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Solve_CSS_problems/Fill_a_box_with_an_image"
  },
  {
    id: "container-unit-calculator", name: "CSS Container-Relative Unit Calculator", keyword: "container query units calculator",
    description: "Convert pixel design targets to cqi, cqw, cqb, cqh, cqmin, or cqmax values with bounded clamp tokens and resizable component previews.",
    answer: "One cqi is one percent of a query container’s inline size, while cqw uses physical width and cqb uses block size. This calculator converts a target value at a known container size and can bound the result with clamp().",
    problem: "Container units are powerful for local typography and spacing, but an unbounded percentage can become unreadably small or excessively large. Height/block units also need a definite container dimension, which a simple arithmetic converter rarely explains.",
    features: ["All six container-relative length units", "Pixel-to-unit calculation with resolved-value explanation", "Bounded clamp, CSS token output, and resizable component preview"],
    uses: ["Component-level fluid typography", "Local padding, gaps, radii, and dimensions", "Design-token scales for reusable cards"],
    mistakes: ["Using cqb/cqh without a useful query-container height", "Leaving fluid values unbounded", "Using physical width units when logical inline sizing is intended"],
    source: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Values_and_units/Numeric_data_types"
  },
  {
    id: "responsive-breakpoint-planner", name: "Responsive Layout Breakpoint Planner", keyword: "responsive breakpoint generator",
    description: "Plan content-driven CSS breakpoints by recording layout failure widths, testing component states, and exporting media queries, container queries, and tokens.",
    answer: "A breakpoint should be added when content or interaction no longer works, not because a popular device has a certain width. This planner records observed failure widths, visualizes their position across the tested range, and generates mobile-first, desktop-first, or container rules.",
    problem: "Device-based breakpoint lists age quickly and encourage unnecessary overrides. Teams need to record what failed, which component failed, and why each breakpoint exists so later developers can maintain the responsive system.",
    features: ["Content-failure markers across a defined test range", "Mobile-first, desktop-first, and container-query strategies", "Breakpoint tokens plus long-label, zoom, localization, and missing-media checklist"],
    uses: ["Card grids and navigation", "Dashboard and sidebar shells", "Reusable components whose failure points differ from page breakpoints"],
    mistakes: ["Choosing breakpoints only from device names", "Adding nearly identical breakpoints", "Testing empty rectangles instead of real content and interactive states"],
    source: "https://web.dev/articles/responsive-web-design-basics"
  }
];

const related = (current) => tools.filter((tool) => tool.id !== current.id).sort((a, b) => Math.abs(tools.indexOf(a) - tools.indexOf(current)) - Math.abs(tools.indexOf(b) - tools.indexOf(current))).slice(0, 5);
const faq = (tool) => [
  [`What does the ${tool.name} generate?`, `It generates a live preview and copy-ready HTML, CSS, React/JSX, Astro, and framework-guidance output for the exact ${tool.keyword} workflow.`],
  ["Does the generated layout work on mobile?", "The editor includes desktop, tablet, mobile, and full-screen views. The output includes an intentional responsive strategy, but you should still test it with your real content and target browsers."],
  ["Is the generated code accessible?", "BentoCSS uses semantic starting patterns and flags known layout or source-order risks. Automated guidance cannot guarantee conformance; keyboard, zoom, screen-reader, and manual content review remain necessary."],
  ["Does BentoCSS upload my configuration?", "The tool runs in the browser and saves its current configuration locally. Copy and download actions do not require an account or upload the generated project."],
  ["Can I use the generated code commercially?", "Yes, subject to the BentoCSS generated code license. Review third-party media, fonts, and content licenses separately."]
];

function schemas(tool) {
  const url = `https://bentocss.netlify.app/other-tools/${tool.id}.html`;
  return JSON.stringify({ "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": url, url, name: tool.name, description: tool.description, isPartOf: { "@id": "https://bentocss.netlify.app/#website" }, dateModified: "2026-07-31" },
    { "@type": "SoftwareApplication", "@id": `${url}#app`, name: tool.name, applicationCategory: "DeveloperApplication", operatingSystem: "Any modern web browser", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, featureList: tool.features },
    { "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://bentocss.netlify.app/" }, { "@type": "ListItem", position: 2, name: "Other Tools", item: "https://bentocss.netlify.app/other-tools/" }, { "@type": "ListItem", position: 3, name: tool.name, item: url }] },
    { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: faq(tool).map(([name, answer]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text: answer } })) }
  ]}).replace(/</g, "\\u003c");
}

function workspace(tool) {
  return `<section class="section container other-workspace" id="builder" aria-labelledby="builder-title">
    <div class="section-heading"><span class="eyebrow">Interactive workspace</span><h2 id="builder-title">Build and test ${tool.name.replace(/ Generator| and Visualizer| Builder| Designer| Calculator| Planner/g, "")}</h2><p>Keep the editor in view: controls, live preview, validation, and code share one compact dashboard.</p></div>
    <div class="other-editor">
      <aside class="other-panel" aria-label="Generator controls"><h2>Controls</h2><p class="other-panel-intro">Changes update the preview and output immediately.</p><div id="other-controls" class="other-controls"></div><div id="other-validation" class="other-validation" role="status" aria-live="polite"></div><div class="other-presets"><h3>8 real presets</h3><div id="other-presets" class="other-preset-list"></div></div></aside>
      <div class="other-main"><div class="other-toolbar" aria-label="Preview actions"><button class="btn btn-secondary" type="button" data-device="desktop" aria-pressed="true">Desktop</button><button class="btn btn-secondary" type="button" data-device="tablet" aria-pressed="false">Tablet</button><button class="btn btn-secondary" type="button" data-device="mobile" aria-pressed="false">Mobile</button><button id="other-open-fullscreen" class="btn btn-secondary" type="button">Full screen</button><span id="other-status" class="other-toolbar-status" role="status">Ready</span></div>
      <div class="other-preview-shell"><div id="other-preview-frame" class="other-preview-frame" data-device="desktop"><div id="other-preview" class="other-preview" aria-label="Generated layout preview"></div></div></div>
      <div class="other-output"><div class="other-output-tabs" role="group" aria-label="Output format"><button type="button" data-output-kind="css" aria-pressed="true">CSS</button><button type="button" data-output-kind="html" aria-pressed="false">HTML</button><button type="button" data-output-kind="tailwind" aria-pressed="false">Tailwind</button><button type="button" data-output-kind="react" aria-pressed="false">React</button><button type="button" data-output-kind="astro" aria-pressed="false">Astro</button><button id="other-copy" class="btn" type="button">Copy</button><button id="other-download" class="btn btn-secondary" type="button">Download</button></div><pre class="other-code"><code id="other-code"></code></pre></div></div>
    </div>
    <noscript><p class="editorial-note">This interactive generator requires JavaScript. The explanations and implementation guidance below remain available without it.</p></noscript>
  </section>`;
}

function content(tool) {
  const relatedCards = related(tool).map((item) => `<a href="/other-tools/${item.id}.html"><strong>${item.name}</strong><span class="muted">Open related tool →</span></a>`).join("");
  return `<article class="section container other-content" id="guide">
    <p class="other-answer"><strong>Direct answer:</strong> ${tool.answer}</p>
    <h2>What problem does this tool solve?</h2><p>${tool.problem}</p><p>The workspace is intentionally compact. It keeps the current configuration, responsive preview, validation result, and generated code within one editor-height surface so repeated changes do not require scrolling between distant controls and output. Presets are editable starting points rather than static screenshots.</p>
    <h2>Core capabilities</h2><div class="other-feature-grid">${tool.features.map((feature, i) => `<article><span class="eyebrow">Capability ${i + 1}</span><h3>${feature}</h3><p>Change the relevant controls, inspect the behavior at realistic widths, and compare the generated implementation before copying it.</p></article>`).join("")}</div>
    <h2>When should you use it?</h2><ul>${tool.uses.map((item) => `<li>${item}</li>`).join("")}</ul><p>Use the smallest layout system that clearly expresses the content relationship. A more advanced CSS feature is not automatically better. The preview and presets are designed to help you decide whether this pattern actually fits the job.</p>
    <h2>Recommended workflow</h2><ol><li>Choose the preset closest to the real component or page, then replace its assumptions through the controls.</li><li>Start with the narrowest meaningful state. Use long headings, real actions, missing-media behavior, and representative data.</li><li>Inspect tablet and desktop only after the narrow layout is understandable in source order.</li><li>Review every warning. Warnings explain experimental syntax, overflow, source-order, or configuration contradictions; they are not decorative notices.</li><li>Switch output formats and verify the generated CSS or component contract. Download the code and run it independently.</li><li>Test keyboard navigation, focus, 200% zoom, high contrast, reduced motion, and target-browser support before production release.</li></ol>
    <h2>Common mistakes</h2><div class="other-feature-grid">${tool.mistakes.map((mistake, i) => `<article><span class="eyebrow">Mistake ${i + 1}</span><h3>${mistake}</h3><p>Use the visual preview and validation message to catch this problem before it is copied into the application.</p></article>`).join("")}</div>
    <h2>Developer notes</h2><p>The preview is generated from the same configuration as the code output, but it is still a controlled demonstration. Fonts, real content, third-party components, browser support, and a surrounding application can change intrinsic sizes. Avoid fixed heights for content regions, keep DOM order meaningful, reserve image dimensions, and document why each responsive threshold exists.</p><p>Technical behavior was reviewed against current browser documentation. See the <a href="${tool.source}" target="_blank" rel="noopener">primary implementation reference</a>. Browser capabilities change, so confirm compatibility before relying on newer syntax. BentoCSS does not send the generated configuration to an API; local persistence is used for convenience.</p>
    <h2>Frequently asked questions</h2>${faq(tool).map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join("")}
    <h2>Related responsive tools</h2><div class="other-related">${relatedCards}<a href="/tools/bento-grid-generator.html"><strong>Advanced Bento Grid Generator</strong><span class="muted">Build a complete responsive composition →</span></a></div>
    <div class="editorial-note"><strong>Reviewed July 31, 2026.</strong> Built by the BentoCSS editorial and engineering team. Report an issue through the contact page. Generated code is provided under the BentoCSS generated code license.</div>
  </article>`;
}

function page(tool) {
  const canonical = `https://bentocss.netlify.app/other-tools/${tool.id}.html`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${tool.name} — Free Visual ${tool.keyword}</title><meta name="description" content="${tool.description}"><meta name="author" content="BentoCSS Editorial Team"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:site_name" content="BentoCSS"><meta property="og:title" content="${tool.name}"><meta property="og:description" content="${tool.description}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="https://bentocss.netlify.app/images/og-image.png"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${tool.name}"><meta name="twitter:description" content="${tool.description}"><meta name="twitter:image" content="https://bentocss.netlify.app/images/og-image.png"><link rel="icon" href="/images/favicon.ico"><link rel="stylesheet" href="/assets/css/styles.css"><link rel="stylesheet" href="/assets/css/tools.css"><link rel="stylesheet" href="/assets/css/animations.css"><link rel="stylesheet" href="/assets/css/other-tools.css"><script type="application/ld+json">${schemas(tool)}</script></head><body data-other-tool="${tool.id}"><div id="site-header"></div><main id="main"><section class="other-tool-hero"><div class="container hero-grid"><div><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/other-tools/">Other Tools</a><span>/</span><span aria-current="page">${tool.name}</span></nav><span class="eyebrow">Free browser-based developer tool</span><h1>${tool.name}</h1><p class="lead">${tool.description}</p><div class="hero-actions"><a class="btn" href="#builder">Open the tool</a><a class="btn btn-secondary" href="#guide">Read implementation guide</a></div><div class="other-tool-badges"><span>No signup</span><span>Local processing</span><span>5 output modes</span><span>8 editable presets</span><span>Responsive preview</span></div></div><div class="card"><h2>Designed for production decisions</h2><p>${tool.answer}</p><ul><li>Compact dashboard editor</li><li>Validation and limitations</li><li>Copy and downloadable output</li></ul></div></div></section>${workspace(tool)}${content(tool)}</main><div id="recommended-tools"></div><div id="site-footer"></div><dialog id="other-fullscreen" class="other-fullscreen"><div class="other-fullscreen-head"><strong>${tool.name} preview</strong><button type="button" data-full-device="desktop">Desktop</button><button type="button" data-full-device="tablet">Tablet</button><button type="button" data-full-device="mobile">Mobile</button><button id="other-close-fullscreen" type="button">Close</button></div><div class="other-fullscreen-stage"><div id="other-fullscreen-frame" class="other-fullscreen-frame" data-device="desktop"></div></div></dialog><script src="/assets/js/routes.js" defer></script><script src="/assets/js/components.js" defer></script><script src="/assets/js/seo.js" defer></script><script src="/assets/js/other-tools.js" defer></script><script src="/assets/js/main.js" defer></script></body></html>`;
}

function indexPage() {
  const cards = tools.map((tool, i) => `<article class="card"><span class="eyebrow">Tool ${String(i + 1).padStart(2, "0")}</span><h2><a href="/other-tools/${tool.id}.html">${tool.name}</a></h2><p>${tool.description}</p><a class="btn btn-secondary" href="/other-tools/${tool.id}.html">Open tool</a></article>`).join("");
  const itemList = JSON.stringify({ "@context": "https://schema.org", "@type": "CollectionPage", name: "Modern Responsive CSS Tools", url: "https://bentocss.netlify.app/other-tools/", mainEntity: { "@type": "ItemList", itemListElement: tools.map((tool, i) => ({ "@type": "ListItem", position: i + 1, name: tool.name, url: `https://bentocss.netlify.app/other-tools/${tool.id}.html` })) } }).replace(/</g, "\\u003c");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Modern Responsive CSS Tools — BentoCSS</title><meta name="description" content="Build and test container queries, subgrid, masonry, card grids, sidebars, named areas, media ratios, container units, and content-driven breakpoints."><meta name="robots" content="index,follow"><link rel="canonical" href="https://bentocss.netlify.app/other-tools/"><meta property="og:title" content="Modern Responsive CSS Tools"><meta property="og:description" content="Ten focused visual tools for production responsive CSS layouts."><meta property="og:url" content="https://bentocss.netlify.app/other-tools/"><meta property="og:type" content="website"><meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="/assets/css/styles.css"><link rel="stylesheet" href="/assets/css/tools.css"><link rel="stylesheet" href="/assets/css/animations.css"><link rel="stylesheet" href="/assets/css/other-tools.css"><script type="application/ld+json">${itemList}</script></head><body><div id="site-header"></div><main id="main"><section class="other-tool-hero"><div class="container"><span class="eyebrow">BentoCSS Other Tools</span><h1>Modern responsive CSS layout tools</h1><p class="lead">Ten focused visual workspaces for modern layout problems that deserve more than a one-field code calculator. Each tool includes real presets, validation, responsive previews, multiple outputs, and implementation guidance.</p><div class="other-tool-badges"><span>10 specialized tools</span><span>80 editable presets</span><span>Local processing</span><span>Production fallbacks</span></div></div></section><section class="section container"><div class="other-feature-grid">${cards}</div></section><article class="section container other-content"><h2>Why these tools are separate from the core generators</h2><p>The core BentoCSS tool family covers bento composition, general CSS Grid, Tailwind, dashboards, and common marketing sections. This collection focuses on narrower modern layout jobs: local container responsiveness, inherited subgrid alignment, responsible masonry enhancement, content-driven breakpoints, and media sizing. Keeping the family separate makes the primary navigation clearer while allowing every specialist tool to link back to the core editor.</p><h2>Quality standard</h2><p>Every tool performs its named job, generates downloadable code, explains limitations, includes at least eight editable presets, and provides desktop, tablet, mobile, and full-screen preview modes. Pages remain useful without JavaScript through server-rendered explanations, but JavaScript is required for the interactive workspace.</p></article></main><div id="site-footer"></div><script src="/assets/js/routes.js" defer></script><script src="/assets/js/components.js" defer></script><script src="/assets/js/seo.js" defer></script><script src="/assets/js/main.js" defer></script></body></html>`;
}

tools.forEach((tool) => fs.writeFileSync(path.join(outputDir, `${tool.id}.html`), page(tool)));
fs.writeFileSync(path.join(outputDir, "index.html"), indexPage());
console.log(`Generated ${tools.length} Other Tools pages plus index.`);
