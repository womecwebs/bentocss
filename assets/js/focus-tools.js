(() => {
  const tool = document.body.dataset.focusTool;
  const sharedRecommendationTemplate = document.querySelector("#recommended-tools-template");
  const sharedRecommendationSlot = document.querySelector("#recommended-tools-slot");
  if (sharedRecommendationTemplate && sharedRecommendationSlot) {
    sharedRecommendationSlot.append(sharedRecommendationTemplate.content.cloneNode(true));
  }
  if (!tool) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const canvas = $("#focus-canvas");
  const code = $("#focus-code");
  const storageKey = `bentocss:${tool}:project`;
  let outputType = "html";
  let history = [];
  let historyIndex = -1;
  let bentoItems = [];
  let selectedBentoId = null;
  let draggedBentoId = null;
  let currentViewport = "desktop";
  const schemaVersion = 2;
  const projectsKey = `bentocss:${tool}:projects:v${schemaVersion}`;

  const templateNames = {
    "bento-grid-generator": ["SaaS Features", "Analytics Dashboard", "Portfolio", "Services", "Team", "Media Gallery", "Product Comparison", "Testimonials", "Metrics", "Minimal"],
    "css-grid-generator": ["Holy Grail", "Sidebar", "Magazine", "Gallery", "Docs", "Dashboard", "Split Screen", "Cards", "Masonry-like", "Article"],
    "tailwind-bento-generator": ["Startup", "Portfolio", "AI Product", "Metrics", "Features", "Creator", "Storefront", "Community", "Launch", "Minimal"],
    "dashboard-layout-generator": ["SaaS", "Finance", "Marketing", "Ecommerce", "CRM", "Projects", "Support", "Analytics", "Operations", "Creator"],
    "hero-section-generator": ["SaaS Split", "Centered Launch", "App Product", "Developer API", "Agency", "Portfolio", "Waitlist", "Ecommerce", "AI Product", "Minimal"],
    "pricing-table-generator": ["SaaS 3-tier", "Simple 2-tier", "Enterprise", "Usage Based", "Creator", "Agency", "Lifetime", "Freemium", "Team Plans", "Minimal"],
    "feature-section-generator": ["Icon Grid", "Alternating", "Bento Features", "Product Tour", "Benefits", "Integrations", "Security", "Workflow", "Metrics", "Minimal"],
    "navbar-generator": ["SaaS", "Docs", "Ecommerce", "Agency", "Portfolio", "Dashboard", "Centered", "Mega Menu", "Minimal", "Dark Glass"],
    "footer-generator": ["SaaS", "Product", "Developer", "Ecommerce", "Agency", "Newsletter", "Compact", "Enterprise", "Community", "Minimal"],
    "testimonial-generator": ["Customer Quote", "Case Study", "Founder Story", "Enterprise", "Creator", "Agency", "Product Review", "Verified Buyer", "Featured Quote", "Minimal"]
  };

  const controlIds = () => $$("[data-focus-control]").map((el) => el.id);
  const readState = () => Object.fromEntries(controlIds().map((id) => {
    const el = document.getElementById(id);
    return [id, el.type === "checkbox" ? el.checked : el.value];
  }));
  const applyState = (state) => {
    Object.entries(state || {}).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el) el.type === "checkbox" ? (el.checked = Boolean(value)) : (el.value = value);
    });
  };
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const value = (id, fallback = "") => document.getElementById(id)?.value ?? fallback;
  const checked = (id) => Boolean(document.getElementById(id)?.checked);

  const templates = () => templateNames[tool].map((name, index) => {
    const base = readState();
    Object.keys(base).forEach((id, position) => {
      const el = document.getElementById(id);
      if (el?.type === "range") {
        const min = Number(el.min);
        const max = Number(el.max);
        base[id] = String(Math.round(min + ((index + position * 2) % 10) / 9 * (max - min)));
      } else if (el?.tagName === "SELECT") {
        base[id] = el.options[(index + position) % el.options.length].value;
      } else if (el?.type === "checkbox") base[id] = index % 2 === 0;
    });
    if (base["hero-heading"]) base["hero-heading"] = ["Ship better interfaces", "Turn ideas into products", "Design without limits", "Build your next launch"][index % 4];
    if (base["nav-brand"]) base["nav-brand"] = ["Bento", "Northstar", "Orbit", "Pixel"][index % 4];
    return { name, state: base };
  });

  function markupToReact(html) {
    return html
      .replace(/\bclass=/g, "className=")
      .replace(/\bfor=/g, "htmlFor=")
      .replace(/<!--([\s\S]*?)-->/g, "{/*$1*/}");
  }
  function markupToTailwind(html) {
    const classMap = {
      "layout": "grid grid-cols-1 gap-4 md:grid-cols-3",
      "dashboard": "grid grid-cols-1 gap-4 lg:grid-cols-[220px_minmax(0,1fr)]",
      "product-hero": "grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2",
      "pricing-grid": "grid grid-cols-1 gap-4 md:grid-cols-3",
      "featured": "rounded-2xl border border-violet-500 bg-slate-900 p-6 text-slate-100",
      "feature-grid": "grid grid-cols-1 gap-4 md:grid-cols-3",
      "site-nav": "flex items-center gap-6 border-b border-slate-800 bg-slate-950 p-4 text-slate-100",
      "brand": "font-bold text-white",
      "menu": "ml-auto rounded-lg border border-slate-700 px-3 py-2 md:hidden",
      "cta": "rounded-lg bg-violet-600 px-4 py-2 font-semibold text-white",
      "site-footer": "grid grid-cols-1 gap-8 bg-slate-950 p-10 text-slate-200 sm:grid-cols-2 lg:grid-cols-5",
      "testimonials": "mx-auto max-w-5xl px-6 py-16"
    };
    return html.replace(/class="([^"]+)"/g, (_, classes) => `class="${classes.split(/\s+/).map(name => classMap[name] || name).join(" ")}"`);
  }

  function renderBento() {
    const columns = Number(value("bento-columns", 4));
    const gap = Number(value("bento-gap", 16));
    if (!bentoItems.length) {
      const count = Number(value("bento-items", 6));
      const feature = Math.min(Number(value("bento-span", 2)), columns);
      bentoItems = Array.from({ length: count }, (_, index) => ({ col: index ? 1 : feature, row: index ? 1 : 2 }));
    }
    $(".bento-focus-grid").style.cssText = `--preview-columns:${columns};--preview-gap:${gap}px`;
    $(".bento-focus-grid").innerHTML = bentoItems.map((item, index) => `<article class="focus-tile editable-tile" style="grid-column:span ${Math.min(item.col, columns)};grid-row:span ${item.row}"><span>${index ? `Card ${index + 1}` : "Featured project"}</span><span class="tile-tools"><button type="button" data-tile="${index}" data-resize="col-down" aria-label="Make card narrower">−W</button><button type="button" data-tile="${index}" data-resize="col-up" aria-label="Make card wider">+W</button><button type="button" data-tile="${index}" data-resize="row-up" aria-label="Make card taller">+H</button><button type="button" data-tile="${index}" data-remove aria-label="Remove card">×</button></span></article>`).join("");
    const html = `<section class="bento-grid">\n${bentoItems.map((_, i) => `  <article class="bento-card">Card ${i + 1}</article>`).join("\n")}\n</section>`;
    const css = `.bento-grid {\n  display: grid;\n  grid-template-columns: repeat(${columns}, minmax(0, 1fr));\n  gap: ${gap}px;\n}\n${bentoItems.map((item, i) => `.bento-card:nth-child(${i + 1}) { grid-column: span ${Math.min(item.col, columns)}; grid-row: span ${item.row}; }`).join("\n")}\n@media (max-width: 720px) {\n  .bento-grid { grid-template-columns: 1fr; }\n  .bento-card { grid-column: auto !important; grid-row: auto !important; }\n}`;
    return { html, css, react: `export function BentoGrid() {\n  return (\n${markupToReact(html).split("\n").map((line) => `    ${line}`).join("\n")}\n  );\n}` };
  }

  function renderCssGrid() {
    const repeatMode=value("css-repeat-mode","manual"),minTrack=value("css-min-track","14rem");
    const columns = repeatMode==="manual"?(value("css-columns", "2fr 1fr 1fr")):`repeat(${repeatMode}, minmax(min(100%, ${minTrack}), 1fr))`;
    const rows = value("css-rows", "auto auto");
    const cg = value("css-column-gap", 16);
    const rg = value("css-row-gap", 16);
    const areaLines=value("css-named-areas","header header header\nmain main aside\nfooter footer footer").split(/\n+/).map(line=>line.trim()).filter(Boolean),areaNames=[...new Set(areaLines.join(" ").split(/\s+/).filter(name=>name!=="."))];
    const preview=$(".css-focus-grid");preview.style.cssText=`--css-columns:${columns};--css-rows:${rows};column-gap:${cg}px;row-gap:${rg}px;grid-auto-columns:${value("css-auto-columns","1fr")};grid-auto-rows:${value("css-auto-rows","minmax(6rem, auto)")};justify-items:${value("css-justify-items","stretch")};align-items:${value("css-align-items","stretch")}`;preview.innerHTML=(areaNames.length?areaNames:["primary","secondary","supporting","extra"]).map((name,index)=>`<article class="focus-tile${index===0?" featured":""}" style="grid-area:${repeatMode==="manual"&&areaNames.length?name:"auto"}">${escapeHtml(name)}</article>`).join("");
    const html = `<section class="layout" aria-label="Page layout">\n${(areaNames.length?areaNames:["primary","secondary","supporting"]).map(name=>`  <article class="layout__${name}"><h2>${name[0].toUpperCase()+name.slice(1)}</h2></article>`).join("\n")}\n</section>`;
    const areas=areaLines.length?`\n  grid-template-areas:\n${areaLines.map(line=>`    "${line}"`).join("\n")};`:"";
    const placements=areaNames.map(name=>`.layout__${name} { grid-area: ${name}; }`).join("\n");
    const css = `.layout {\n  display: grid;\n  grid-template-columns: ${columns};\n  grid-template-rows: ${rows};${areas}\n  grid-auto-columns: ${value("css-auto-columns","1fr")};\n  grid-auto-rows: ${value("css-auto-rows","minmax(6rem, auto)")};\n  column-gap: ${cg}px;\n  row-gap: ${rg}px;\n  justify-items: ${value("css-justify-items","stretch")};\n  align-items: ${value("css-align-items","stretch")};\n}\n${placements}\n@media (max-width: ${value("css-breakpoint",720)}px) { .layout { grid-template-columns: 1fr; grid-template-areas:none; } .layout > * { grid-area:auto; } }`;
    return { html, css, react: `export const GridLayout = () => (\n${markupToReact(html)}\n);` };
  }

  function renderTailwind() {
    const columns = value("tw-columns", 3);
    const gap = value("tw-gap", 4);
    const arbitrary=value("tw-arbitrary-tracks","").trim(),version=value("tw-version","4"),scope=value("tw-example-scope","component");
    let cls = arbitrary?`grid grid-cols-[${arbitrary}] gap-${gap}`:checked("tw-responsive") ? `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-${gap}` : `grid grid-cols-${columns} gap-${gap}`;
    if(checked("tw-dedupe"))cls=[...new Set(cls.split(/\s+/))].join(" ");
    $(".tailwind-focus-grid").style.cssText = `--tw-columns:${columns};--preview-gap:${Number(gap) * 4}px`;
    const component = `<section class="${cls}" aria-label="Feature overview">\n  <article class="md:col-span-2 md:row-span-2 rounded-2xl border border-slate-700 bg-slate-900 p-6">Featured project</article>\n  <article class="rounded-2xl border border-slate-700 bg-slate-900 p-6">Card 2</article>\n  <article class="rounded-2xl border border-slate-700 bg-slate-900 p-6">Card 3</article>\n</section>`;
    const html=scope==="complete"?`<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Tailwind Bento</title></head><body class="bg-slate-950 p-6 text-slate-100">\n${component}\n</body></html>`:component;
    const notes=checked("tw-config-notes")?`/* Tailwind ${version}: classes are static so the content scanner can discover them.${arbitrary?" Arbitrary track syntax is intentionally kept in full.":""} */\n`:"";
    return { html, tailwind: `${notes}${html}`, css: `${notes}/* Utility-first output: no component CSS required. */`, react: `${notes}export const TailwindBento = () => (\n${markupToReact(component)}\n);` };
  }

  function renderDashboard() {
    const sidebar = value("dashboard-sidebar", 220), gap = value("dashboard-gap", 16), cards = Number(value("dashboard-cards", 4));
    $(".dashboard-focus-grid").style.cssText = `--sidebar-width:${sidebar}px;--preview-gap:${gap}px`;
    const state=value("dashboard-state","ready"),charts=Number(value("dashboard-charts",2));
    const stateBlock=state==="loading"?'<article class="focus-tile dashboard-state">Loading dashboard…</article>':state==="empty"?'<article class="focus-tile dashboard-state">No data yet. Connect a source to begin.</article>':state==="error"?'<article class="focus-tile dashboard-state">Dashboard unavailable. <button>Try again</button></article>':"";
    $(".dashboard-main").innerHTML = `${checked("dashboard-header")?'<header class="focus-tile dashboard-header">Overview <button aria-label="Account menu">Account</button></header>':""}${stateBlock}${state==="ready"?`${Array.from({ length: cards }, (_, i) => `<article class="focus-tile">KPI ${i + 1}</article>`).join("")}${Array.from({length:charts},(_,i)=>`<article class="focus-tile dashboard-chart">Chart ${i+1}</article>`).join("")}${checked("dashboard-table")?'<article class="focus-tile dashboard-table">Data table</article>':""}${checked("dashboard-feed")?'<article class="focus-tile">Activity feed</article>':""}`:""}`;
    const html = `<div class="dashboard">${checked("dashboard-mobile-nav")?'<button class="dashboard-menu" aria-expanded="false" aria-controls="dashboard-nav">Menu</button>':""}<aside id="dashboard-nav"><nav aria-label="Dashboard">Overview · Reports · Team</nav></aside><main>${checked("dashboard-header")?'<header><h1>Overview</h1><button aria-label="Account menu">Account</button></header>':"<h1>Overview</h1>"}${state!=="ready"?`<section class="dashboard-status" role="status">${stateBlock.replace(/<[^>]+>/g," ")}</section>`:`${Array.from({ length: cards }, (_, i) => `<article class="kpi"><h2>KPI ${i + 1}</h2><strong>${[42,18,76,94,31,63][i]}%</strong></article>`).join("")}${Array.from({length:charts},(_,i)=>`<section class="chart" aria-label="Chart ${i+1}"><h2>Chart ${i+1}</h2></section>`).join("")}${checked("dashboard-table")?'<section class="data-table"><h2>Recent records</h2><table><thead><tr><th scope="col">Name</th><th scope="col">Status</th></tr></thead><tbody><tr><th scope="row">Example</th><td>Active</td></tr></tbody></table></section>':""}${checked("dashboard-feed")?'<aside class="activity"><h2>Activity</h2><ol><li>Project updated</li></ol></aside>':""}`}</main></div>`;
    const css = `.dashboard { display:grid; grid-template-columns:${sidebar}px minmax(0,1fr); gap:${gap}px; }\n.dashboard main { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; }\n.dashboard main>header,.dashboard-status,.data-table{grid-column:1/-1}.chart{min-height:16rem}.dashboard-menu{display:none}\n@media(max-width:800px){.dashboard{grid-template-columns:1fr}.dashboard>aside{display:none}.dashboard main{grid-template-columns:1fr}.dashboard-menu{display:block}.dashboard main>*{grid-column:auto}}`;
    return { html, css, react: `export const Dashboard = () => (\n${markupToReact(html)}\n);` };
  }

  function renderHero() {
    const heading = escapeHtml(value("hero-heading", "Ship better interfaces"));
    const alignment = value("hero-align", "left");
    const media = value("hero-media", "right");
    const cta = escapeHtml(value("hero-cta", "Start building"));
    const secondary=escapeHtml(value("hero-secondary-cta","View documentation")),badge=escapeHtml(value("hero-badge","New release")),background=value("hero-background","gradient"),width=value("hero-heading-width","medium");
    const trust = checked("hero-trust");
    $(".hero-generator-preview").style.setProperty("--hero-align", alignment);
    $(".hero-generator-preview").className = `hero-generator-preview media-${media} bg-${background} heading-${width}`;
    $(".hero-generator-preview").innerHTML = `<div><span class="eyebrow">${badge}</span><h2>${heading}</h2><p>Build responsive product experiences with clean, portable code.</p><div class="hero-preview-actions"><a class="btn">${cta}</a><a>${secondary}</a></div>${trust ? "<small>Northstar · Orbit · Pixel</small>" : ""}${checked("hero-social-proof")?'<p class="hero-proof">★★★★★ 4.9 from verified teams</p>':""}</div><div class="hero-media-placeholder">Product preview</div>`;
    const html = `<section class="product-hero"><div><p class="eyebrow">${badge}</p><h1>${heading}</h1><p>Build responsive product experiences with clean, portable code.</p><div class="hero-actions"><a href="#start">${cta}</a><a href="/docs">${secondary}</a></div>${trust ? '<ul class="trust-logos" aria-label="Trusted by"><li>Northstar</li><li>Orbit</li><li>Pixel</li></ul>' : ""}${checked("hero-social-proof")?'<p aria-label="Rated 4.9 out of 5 by verified teams">★★★★★ 4.9 from verified teams</p>':""}</div><div class="hero-media" role="img" aria-label="Product interface preview"></div></section>`;
    const css = `.product-hero{display:grid;grid-template-columns:${media === "none" ? "1fr" : "minmax(0,1fr) minmax(18rem,.8fr)"};gap:clamp(2rem,6vw,6rem);align-items:center;text-align:${alignment}}\n@media(max-width:720px){.product-hero{grid-template-columns:1fr;text-align:left}}`;
    return { html, css, react: `export const ProductHero = () => (\n${markupToReact(html)}\n);` };
  }

  function renderPricing() {
    const count = Number(value("pricing-plans", 3)), currency = escapeHtml(value("pricing-currency", "$")), featured = Number(value("pricing-featured", 2)), annual = checked("pricing-annual");
    const names = ["Starter", "Pro", "Scale", "Enterprise"];
    $(".pricing-generator-preview").innerHTML = Array.from({ length: count }, (_, i) => `<article class="pricing-preview-card${i + 1 === featured ? " featured" : ""}"><h3>${names[i]}</h3><strong>${currency}${annual ? [90, 290, 790, 1490][i] : [9, 29, 79, 149][i]}<small>/${annual ? "yr" : "mo"}</small></strong><p>${i + 2} projects · Email support</p><button class="btn">Choose ${names[i]}</button></article>`).join("");
    const html = `<section class="pricing-grid">\n${Array.from({ length: count }, (_, i) => `  <article${i + 1 === featured ? ' class="featured"' : ""}><h2>${names[i]}</h2><p><strong>${currency}${annual ? [90, 290, 790, 1490][i] : [9, 29, 79, 149][i]}</strong>/${annual ? "year" : "month"}</p><a href="/signup">Choose ${names[i]}</a></article>`).join("\n")}\n</section>`;
    const css = `.pricing-grid{display:grid;grid-template-columns:repeat(${count},minmax(0,1fr));gap:1rem}.pricing-grid article{padding:1.5rem;border:1px solid #334155;border-radius:1rem}.pricing-grid .featured{border-color:#8b5cf6;transform:translateY(-.5rem)}@media(max-width:760px){.pricing-grid{grid-template-columns:1fr}.pricing-grid .featured{transform:none}}`;
    return { html, css, react: `export const Pricing = () => (\n${markupToReact(html)}\n);` };
  }

  function renderFeatures() {
    const count = Number(value("feature-count", 6)), columns = value("feature-columns", 3), style = value("feature-style", "icons");
    $(".feature-generator-preview").style.setProperty("--feature-columns", columns);
    $(".feature-generator-preview").innerHTML = Array.from({ length: count }, (_, i) => `<article><span>${style === "numbers" ? String(i + 1).padStart(2, "0") : "✦"}</span><h3>Feature ${i + 1}</h3><p>A clear outcome-focused benefit.</p></article>`).join("");
    const html = `<section class="feature-grid">${Array.from({ length: count }, (_, i) => `<article><span aria-hidden="true">${style === "numbers" ? i + 1 : "✦"}</span><h2>Feature ${i + 1}</h2><p>A clear outcome-focused benefit.</p></article>`).join("")}</section>`;
    const css = `.feature-grid{display:grid;grid-template-columns:repeat(${columns},minmax(0,1fr));gap:1rem}.feature-grid article{padding:1.5rem;border:1px solid #334155;border-radius:1rem}@media(max-width:720px){.feature-grid{grid-template-columns:1fr}}`;
    return { html, css, react: `export const Features = () => (\n${markupToReact(html)}\n);` };
  }

  function renderNavbar() {
    const brand = escapeHtml(value("nav-brand", "Bento")), items = Number(value("nav-items", 4)), cta = escapeHtml(value("nav-cta", "Get started")), sticky = checked("nav-sticky");
    const links = ["Product", "Solutions", "Resources", "Pricing", "Company"].slice(0, items);
    $(".navbar-generator-preview").innerHTML = `<nav><strong>${brand}</strong><div>${links.map((link) => `<a>${link}</a>`).join("")}</div><button class="btn">${cta}</button><button class="nav-preview-menu" aria-label="Open menu">☰</button></nav>`;
    const html = `<nav class="site-nav" aria-label="Primary"><a class="brand" href="/">${brand}</a><button class="menu" aria-expanded="false" aria-controls="nav-links">Menu</button><div id="nav-links">${links.map((link) => `<a href="/">${link}</a>`).join("")}</div><a class="cta" href="/signup">${cta}</a></nav>`;
    const css = `.site-nav{${sticky ? "position:sticky;top:0;" : ""}display:flex;align-items:center;gap:1.5rem;padding:1rem}.site-nav #nav-links{display:flex;gap:1rem;margin-left:auto}.menu{display:none}@media(max-width:720px){.menu{display:block;margin-left:auto}.site-nav #nav-links,.site-nav>.cta{display:none}}`;
    return { html, css, react: `export const Navbar = () => {\n  const [open, setOpen] = React.useState(false);\n  return (\n${markupToReact(html).replace('aria-expanded="false"', "aria-expanded={open}")}\n  );\n};` };
  }

  function renderFooter() {
    const columns = Number(value("footer-columns", 4)), newsletter = checked("footer-newsletter"), theme = value("footer-theme", "dark");
    $(".footer-generator-preview").className = `footer-generator-preview theme-${theme}`;
    $(".footer-generator-preview").innerHTML = `<div class="footer-preview-brand"><strong>Bento</strong><p>Tools for better interfaces.</p>${newsletter ? '<label>Email updates <input type="email" placeholder="you@example.com"></label>' : ""}</div>${Array.from({ length: columns }, (_, i) => `<nav aria-label="Footer group ${i + 1}"><strong>${["Product", "Resources", "Company", "Legal", "Community"][i]}</strong><a>Overview</a><a>Guides</a><a>Support</a></nav>`).join("")}`;
    const html = `<footer class="site-footer"><div><a href="/">Bento</a><p>Tools for better interfaces.</p>${newsletter ? '<form><label for="email">Email updates</label><input id="email" type="email" autocomplete="email"><button>Subscribe</button></form>' : ""}</div>${Array.from({ length: columns }, (_, i) => `<nav aria-label="Footer group ${i + 1}"><h2>${["Product", "Resources", "Company", "Legal", "Community"][i]}</h2><a href="/">Overview</a><a href="/">Guides</a><a href="/">Support</a></nav>`).join("")}</footer>`;
    const css = `.site-footer{display:grid;grid-template-columns:1.4fr repeat(${columns},1fr);gap:2rem;padding:3rem;background:${theme === "light" ? "#f8fafc;color:#0f172a" : "#0f172a;color:#e2e8f0"}}.site-footer nav{display:grid;align-content:start;gap:.75rem}@media(max-width:760px){.site-footer{grid-template-columns:1fr 1fr}}`;
    return { html, css, react: `export const Footer = () => (\n${markupToReact(html)}\n);` };
  }

  function renderTestimonial() {
    const quote = escapeHtml(value("testimonial-quote", "A clear, useful customer result."));
    const name = escapeHtml(value("testimonial-name", "Customer name"));
    const role = escapeHtml(value("testimonial-role", "Customer role"));
    const rating = Number(value("testimonial-rating", 0));
    const layout = value("testimonial-layout", "card");
    const verified = checked("testimonial-verified");
    const stars = rating ? `<p class="testimonial-stars" aria-label="${rating} out of 5 stars">${"★".repeat(rating)}${"☆".repeat(5-rating)}</p>` : "";
    $(".testimonial-generator-preview").className = `testimonial-generator-preview layout-${layout}`;
    $(".testimonial-generator-preview").innerHTML = `<figure>${stars}<blockquote>“${quote}”</blockquote><figcaption><strong>${name}</strong><span>${role}</span>${verified ? "<small>Verified customer</small>" : ""}</figcaption></figure>${layout === "split" ? '<aside><strong>Proof belongs here</strong><p>Add a real metric, case-study link, or source—not a decorative claim.</p></aside>' : ""}`;
    const html = `<section class="testimonials" aria-labelledby="testimonials-title"><h2 id="testimonials-title">What customers say</h2><figure>${stars}<blockquote><p>“${quote}”</p></blockquote><figcaption><strong>${name}</strong><span>${role}</span>${verified ? "<small>Verified customer</small>" : ""}</figcaption></figure></section>`;
    const css = `.testimonials{max-width:70rem;margin:auto;padding:clamp(2rem,6vw,5rem)}.testimonials figure{margin:0;padding:2rem;border:1px solid #334155;border-radius:1.25rem;background:#0f172a;color:#e2e8f0}.testimonials blockquote{font-size:clamp(1.2rem,3vw,2rem);line-height:1.45}.testimonials figcaption{display:grid;gap:.25rem}.testimonial-stars{color:#fbbf24}@media(max-width:600px){.testimonials figure{padding:1.25rem}}`;
    return { html, css, react: `export const Testimonial = () => (\n${markupToReact(html)}\n);` };
  }

  const renderers = {
    "bento-grid-generator": renderBento, "css-grid-generator": renderCssGrid,
    "tailwind-bento-generator": renderTailwind, "dashboard-layout-generator": renderDashboard,
    "hero-section-generator": renderHero, "pricing-table-generator": renderPricing,
    "feature-section-generator": renderFeatures, "navbar-generator": renderNavbar,
    "footer-generator": renderFooter,
    "testimonial-generator": renderTestimonial
  };

  function update({ record = false } = {}) {
    const outputs = renderers[tool]();
    code.textContent = outputs[outputType] || (outputType === "tailwind" ? markupToTailwind(outputs.html) : outputs.html);
    $$("[data-output]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.output === outputType)));
    if (record) pushHistory();
    localStorage.setItem(storageKey, JSON.stringify({ state: readState(), bentoItems, outputType }));
    const status = $("#focus-save-status");
    if (status) status.textContent = "Saved locally";
  }
  function snapshot() { return JSON.stringify({ version: schemaVersion, tool, state: readState(), bentoItems, outputType }); }
  function pushHistory() {
    const next = snapshot();
    if (history[historyIndex] === next) return;
    history = history.slice(0, historyIndex + 1);
    history.push(next);
    if (history.length > 30) history.shift();
    historyIndex = history.length - 1;
  }
  function restore(snapshotValue) {
    const data = JSON.parse(snapshotValue);
    if (data.tool && data.tool !== tool) throw new Error("This project belongs to a different generator.");
    if (data.version && data.version > schemaVersion) throw new Error("This project was created with a newer BentoCSS version.");
    applyState(data.state);
    bentoItems = data.bentoItems || [];
    outputType = data.outputType || outputType;
    update();
  }
  const projectStatus = message => { const status=$("#focus-project-status"); if(status)status.textContent=message; };
  const projectName = () => $("#focus-project-name")?.value.trim() || "Untitled layout";
  const projectSnapshot = () => window.BentoAdvanced?.snapshot?.() || snapshot();
  const projects = () => { try{return JSON.parse(localStorage.getItem(projectsKey)||"[]");}catch(_){return[];} };
  function refreshProjects(){const select=$("#focus-recent-projects");if(!select)return;select.innerHTML='<option value="">Select a saved project</option>'+projects().sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt)).slice(0,12).map(project=>`<option value="${project.id}">${escapeHtml(project.name)} · ${new Date(project.updatedAt).toLocaleDateString()}</option>`).join("");}
  function saveNamedProject(name=projectName()){const list=projects(),now=new Date().toISOString(),existing=list.find(project=>project.name===name);const entry={id:existing?.id||`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,name,tool,version:schemaVersion,updatedAt:now,data:projectSnapshot()};const next=[entry,...list.filter(project=>project.id!==entry.id)].slice(0,20);localStorage.setItem(projectsKey,JSON.stringify(next));refreshProjects();projectStatus(`Saved “${name}” locally.`);window.BentoSEO?.track("project_saved",{tool});return entry;}
  function loadProjectData(raw){if(window.BentoAdvanced?.restore)window.BentoAdvanced.restore(raw);else restore(raw);}
  function downloadText(text,name,type="application/json"){const link=document.createElement("a");link.href=URL.createObjectURL(new Blob([text],{type}));link.download=name;link.click();URL.revokeObjectURL(link.href);}

  templates().forEach((template, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "generator-template-card";
    button.dataset.templateIndex = index;
    button.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><strong>${template.name}</strong><small>Load and customize</small>`;
    $("#focus-templates")?.append(button);
  });

  $$("[data-viewport]").forEach((button) => button.addEventListener("click", () => {
    canvas.dataset.viewport = button.dataset.viewport;
    $$("[data-viewport]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
  }));
  $$("[data-output]").forEach((button) => button.addEventListener("click", () => { outputType = button.dataset.output; update(); }));
  $$("[data-focus-control]").forEach((control) => control.addEventListener("input", () => {
    if (tool === "bento-grid-generator" && control.id === "bento-items") {
      const count = Number(control.value);
      while (bentoItems.length < count) bentoItems.push({ col: 1, row: 1 });
      bentoItems.length = count;
    }
    update({ record: true });
  }));
  $("#focus-templates")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-template-index]");
    if (!button) return;
    applyState(templates()[Number(button.dataset.templateIndex)].state);
    bentoItems = [];
    update({ record: true });
    $("#focus-template-status").textContent = `${button.querySelector("strong").textContent} loaded. You can edit every control.`;
  });
  $(".bento-focus-grid")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-tile]");
    if (!button) return;
    const index = Number(button.dataset.tile);
    if (button.hasAttribute("data-remove") && bentoItems.length > 1) bentoItems.splice(index, 1);
    if (button.dataset.resize === "col-up") bentoItems[index].col += 1;
    if (button.dataset.resize === "col-down") bentoItems[index].col = Math.max(1, bentoItems[index].col - 1);
    if (button.dataset.resize === "row-up") bentoItems[index].row = bentoItems[index].row === 1 ? 2 : 1;
    $("#bento-items").value = bentoItems.length;
    update({ record: true });
  });
  $("#focus-add-box")?.addEventListener("click", () => { bentoItems.push({ col: 1, row: 1 }); $("#bento-items").value = bentoItems.length; update({ record: true }); });
  $("#focus-undo")?.addEventListener("click", () => { if (historyIndex > 0) restore(history[--historyIndex]); });
  $("#focus-redo")?.addEventListener("click", () => { if (historyIndex < history.length - 1) restore(history[++historyIndex]); });
  $("#focus-reset")?.addEventListener("click", () => { if(!confirm("Clear this unsaved project and restore the default layout?"))return;localStorage.removeItem(storageKey);localStorage.removeItem(`bentocss:bento-grid-generator:advanced:v2`);location.hash="";location.reload(); });
  $("#focus-randomize")?.addEventListener("click", () => {
    const list = templates();
    applyState(list[Math.floor(Math.random() * list.length)].state);
    bentoItems = [];
    update({ record: true });
  });
  $("#focus-share")?.addEventListener("click", async () => {
    const url = new URL(location.href);
    const encoded=btoa(unescape(encodeURIComponent(projectSnapshot())));
    if(encoded.length>7000){projectStatus("This project is too large for a reliable URL. Export JSON instead.");return;}
    url.hash = `preview=${encoded}`;
    await navigator.clipboard.writeText(url.href);
    $("#focus-share").textContent = "Link copied";
    setTimeout(() => $("#focus-share").textContent = "Share configuration", 1400);
  });
  $("#focus-save-project")?.addEventListener("click",()=>saveNamedProject());
  $("#focus-duplicate-project")?.addEventListener("click",()=>{const name=`${projectName()} copy`;$("#focus-project-name").value=name;saveNamedProject(name);});
  $("#focus-recent-projects")?.addEventListener("change",event=>{const project=projects().find(item=>item.id===event.target.value);if(!project)return;$("#focus-project-name").value=project.name;try{loadProjectData(project.data);projectStatus(`Loaded “${project.name}”.`);}catch(error){projectStatus(error.message);}});
  $("#focus-export-json")?.addEventListener("click",()=>{const payload={schema:"bentocss-project",version:schemaVersion,tool,name:projectName(),exportedAt:new Date().toISOString(),data:JSON.parse(projectSnapshot())};downloadText(JSON.stringify(payload,null,2),`${projectName().toLowerCase().replace(/[^a-z0-9]+/g,"-")||tool}.bentocss.json`);projectStatus("Project JSON exported.");window.BentoSEO?.track("project_json_exported",{tool});});
  $("#focus-import-json")?.addEventListener("change",async event=>{const file=event.target.files?.[0];if(!file)return;try{const payload=JSON.parse(await file.text());if(payload.schema!=="bentocss-project")throw new Error("This is not a BentoCSS project file.");if(payload.tool!==tool)throw new Error("This project belongs to a different generator.");if(payload.version>schemaVersion)throw new Error("This project requires a newer BentoCSS version.");$("#focus-project-name").value=payload.name||"Imported layout";loadProjectData(JSON.stringify(payload.data));projectStatus("Project imported. Save it to add it to recent projects.");}catch(error){projectStatus(`Import failed: ${error.message}`);}finally{event.target.value="";}});
  $("#focus-copy")?.addEventListener("click", async (event) => {
    await navigator.clipboard.writeText(code.textContent);
    event.currentTarget.textContent = "Copied";
    setTimeout(() => event.currentTarget.textContent = "Copy code", 1400);
    window.BentoSEO?.track("focus_tool_code_copied", { tool, outputType });
  });
  $("#focus-download")?.addEventListener("click", () => {
    const extension = outputType === "react" ? "jsx" : outputType;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([code.textContent], { type: "text/plain" }));
    link.download = `${tool}.${extension}`;
    link.click();
    URL.revokeObjectURL(link.href);
  });

  try {
    if (location.hash.startsWith("#config=") && tool!=="bento-grid-generator") restore(decodeURIComponent(escape(atob(location.hash.slice(8)))));
    else if(location.hash.startsWith("#preview=") && tool!=="bento-grid-generator") restore(decodeURIComponent(escape(atob(location.hash.slice(9)))));
    else {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (saved) { applyState(saved.state); bentoItems = saved.bentoItems || []; outputType = saved.outputType || "html"; }
    }
  } catch (_) {}
  canvas.dataset.viewport = "desktop";
  update();
  pushHistory();
  refreshProjects();
  window.BentoSEO?.track("tool_started",{tool,schemaVersion});
  if(location.hash.startsWith("#preview=")){
    document.body.classList.add("is-readonly-preview");
    const banner=document.createElement("aside");banner.className="container readonly-banner";banner.innerHTML='<strong>Read-only shared preview</strong><span>Inspect the responsive layout and generated code.</span><button id="focus-remix" class="btn" type="button">Remix this layout</button>';
    document.querySelector("main")?.prepend(banner);
    $$('[data-focus-control],#focus-add-box,#focus-undo,#focus-redo,#focus-randomize,#focus-reset,#focus-save-project,#focus-duplicate-project,#focus-import-json').forEach(control=>control.disabled=true);
    $("#focus-remix")?.addEventListener("click",()=>{location.hash="";location.reload();});
  }
})();
