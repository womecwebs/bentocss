(() => {
  "use strict";
  const id = document.body.dataset.otherTool;
  if (!id) return;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const slug = (value, fallback = "layout") => String(value || fallback).trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "") || fallback;
  const range = (label, key, min, max, value, step = 1) => ({ type: "range", label, key, min, max, value, step });
  const number = (label, key, min, max, value, step = 1) => ({ type: "number", label, key, min, max, value, step });
  const text = (label, key, value, help = "") => ({ type: "text", label, key, value, help });
  const select = (label, key, value, options) => ({ type: "select", label, key, value, options });
  const check = (label, key, value = false) => ({ type: "checkbox", label, key, value });
  const textarea = (label, key, value, help = "") => ({ type: "textarea", label, key, value, help });
  const cardData = [
    ["Product analytics", "Understand activation and retention without losing the customer story."],
    ["Team workflow", "Keep decisions, tasks, and handoff details in one responsive surface."],
    ["Accessible output", "Semantic structure, useful labels, and logical reading order are built in."],
    ["Fast delivery", "Copy maintainable code and adapt tokens inside your existing project."],
    ["Responsive by content", "Layouts adapt when the component runs out of usable space."],
    ["Portable projects", "Generated files remain editable and do not require BentoCSS at runtime."],
    ["Design tokens", "Share spacing, radius, color, and typography decisions across components."],
    ["Production states", "Test long copy, missing media, and narrow containers before shipping."],
    ["Framework options", "Use the same layout intent in HTML, React, Tailwind, or Astro."],
    ["Measured quality", "Warnings explain overflow, order, and experimental browser behavior."],
    ["Content hierarchy", "Use spans and tracks to express importance without breaking source order."],
    ["Reusable patterns", "Save a strong starting point and remix it for the next project."]
  ];
  function formatOutputs(html, css, notes = "") {
    const classToReact = html.replace(/class=/g, "className=").replace(/for=/g, "htmlFor=");
    const complete = `<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Generated BentoCSS layout</title>\n  <style>\n${css.split("\n").map((line) => `    ${line}`).join("\n")}\n  </style>\n</head>\n<body>\n${html}\n</body>\n</html>`;
    return {
      html,
      css: `${css}${notes ? `\n\n/* ${notes} */` : ""}`,
      tailwind: `<!-- Tailwind translation starter. Preserve the semantic HTML and map the generated CSS tokens to utilities. -->\n${html}`,
      react: `export function GeneratedLayout() {\n  return (\n    ${classToReact.split("\n").join("\n    ")}\n  );\n}`,
      astro: `---\nconst title = "Generated layout";\n---\n${html}\n\n<style>\n${css}\n</style>`,
      complete
    };
  }
  function cards(count, className = "ot-card") {
    return Array.from({ length: count }, (_, index) => {
      const item = cardData[index % cardData.length];
      return `<article class="${className}"><h3>${item[0]}</h3><p>${item[1]}</p><a href="#">Learn more</a></article>`;
    }).join("");
  }
  function rectangularAreas(lines) {
    const rows = lines.map((line) => line.trim().split(/\s+/)).filter((row) => row.length && row[0]);
    if (!rows.length) return { valid: false, rows: [], issues: ["Add at least one row of area names."] };
    const width = rows[0].length;
    const issues = [];
    if (rows.some((row) => row.length !== width)) issues.push("Every named-area row must contain the same number of cells.");
    const names = [...new Set(rows.flat().filter((name) => name !== "."))];
    names.forEach((name) => {
      const coords = [];
      rows.forEach((row, r) => row.forEach((cell, c) => { if (cell === name) coords.push([r, c]); }));
      const r0 = Math.min(...coords.map((v) => v[0])), r1 = Math.max(...coords.map((v) => v[0]));
      const c0 = Math.min(...coords.map((v) => v[1])), c1 = Math.max(...coords.map((v) => v[1]));
      for (let r = r0; r <= r1; r += 1) for (let c = c0; c <= c1; c += 1) if (rows[r]?.[c] !== name) issues.push(`Area “${name}” is not rectangular.`);
    });
    return { valid: issues.length === 0, rows, width, names, issues };
  }
  const tools = {
    "container-query-builder": {
      controls: [text("Container name", "name", "card"), select("Container type", "type", "inline-size", ["inline-size", "size", "normal"]), number("Compact maximum", "compact", 220, 700, 360), number("Wide minimum", "wide", 360, 1200, 640), select("Condition syntax", "syntax", "range", [["range", "Modern range"], ["legacy", "min/max syntax"]]), select("Component", "component", "article", ["article", "profile", "product"]), check("Include style query example", "styleQuery", false), check("Include media-query fallback", "fallback", true)],
      presets: [["Article card", { name: "article", compact: 360, wide: 640, component: "article" }], ["Profile card", { name: "profile", compact: 300, wide: 520, component: "profile" }], ["Product tile", { name: "product", compact: 380, wide: 700, component: "product" }], ["Sidebar widget", { name: "widget", compact: 280, wide: 460 }], ["Modal content", { name: "dialog", compact: 420, wide: 680 }], ["Search result", { name: "result", compact: 340, wide: 620 }], ["Pricing card", { name: "plan", compact: 320, wide: 560 }], ["Nested panel", { name: "panel", compact: 400, wide: 760, styleQuery: true }]],
      build(s) {
        const name = slug(s.name, "card"), compact = +s.compact, wide = +s.wide;
        const queryCompact = s.syntax === "legacy" ? `(max-width: ${compact}px)` : `(width < ${compact}px)`;
        const queryWide = s.syntax === "legacy" ? `(min-width: ${wide}px)` : `(width >= ${wide}px)`;
        const html = `<div class="${name}-container">\n  <article class="${name}">\n    <div class="${name}__media" aria-hidden="true"></div>\n    <div><p class="eyebrow">Reusable component</p><h2>Container-aware ${esc(s.component)} card</h2><p>This card adapts to the space its parent gives it, not the viewport.</p><a href="#">Read the case study</a></div>\n  </article>\n</div>`;
        const css = `.${name}-container { container: ${name} / ${s.type}; }\n.${name} { display: grid; gap: 1rem; padding: 1rem; }\n@container ${name} ${queryCompact} { .${name} { font-size: .925rem; } }\n@container ${name} ${queryWide} { .${name} { grid-template-columns: minmax(10rem, .8fr) 1.2fr; align-items: center; } .${name} h2 { font-size: clamp(1.5rem, 5cqi, 2.5rem); } }${s.styleQuery ? `\n@container style(--theme: dark) { .${name} { color: white; background: #111827; } }` : ""}${s.fallback ? `\n@supports not (container-type: inline-size) { @media (min-width: ${wide}px) { .${name} { grid-template-columns: 1fr 1.2fr; } } }` : ""}`;
        const output = formatOutputs(html, css, "Style-query declarations beyond custom properties may have limited support; verify before production use.");
        const preview = `<div class="ot-container-stage"><article class="ot-container-card ot-card"><div class="ot-media-box"></div><div><p class="eyebrow">Resize this container</p><h3>One card, several contexts</h3><p>The layout responds near ${wide}px while the viewport remains unchanged.</p></div></article></div>`;
        const issues = compact >= wide ? ["The compact maximum must be smaller than the wide minimum."] : [];
        if (s.type === "normal") issues.push("`normal` supports name/style queries but is not a size query container.");
        return { preview, output, issues };
      }
    },
    "subgrid-generator": {
      controls: [range("Parent columns", "columns", 2, 8, 4), range("Parent gap", "gap", 0, 40, 16), range("Child span", "span", 2, 6, 3), range("Card count", "count", 2, 10, 4), check("Subgrid columns", "subColumns", true), check("Subgrid rows", "subRows", false), check("Override inherited gap", "overrideGap", false), check("Show named lines", "named", true)],
      presets: [["Aligned cards", { columns: 4, span: 4, count: 4, subColumns: true, subRows: true }], ["Feature list", { columns: 6, span: 4, count: 3 }], ["Form labels", { columns: 4, span: 3, count: 4 }], ["Product specs", { columns: 5, span: 4, count: 5 }], ["Article cards", { columns: 3, span: 3, count: 3, subRows: true }], ["Timeline", { columns: 6, span: 5, count: 4 }], ["Pricing features", { columns: 4, span: 4, count: 4, subRows: true }], ["Nested dashboard", { columns: 8, span: 6, count: 6 }]],
      build(s) {
        const cols = +s.columns, span = Math.min(+s.span, cols), count = +s.count, gap = +s.gap;
        const parentTracks = s.named ? `[content-start] repeat(${cols}, minmax(0, 1fr)) [content-end]` : `repeat(${cols}, minmax(0, 1fr))`;
        const childCols = s.subColumns ? "subgrid" : `repeat(${span}, minmax(0, 1fr))`;
        const childRows = s.subRows ? "subgrid" : "auto";
        const html = `<section class="parent-grid" aria-label="Aligned card collection">\n  <article class="child-grid">\n${Array.from({ length: count }, (_, i) => `    <div><h3>Detail ${i + 1}</h3><p>${cardData[i][1]}</p></div>`).join("\n")}\n  </article>\n</section>`;
        const css = `.parent-grid { display: grid; grid-template-columns: ${parentTracks}; grid-template-rows: repeat(3, auto); gap: ${gap}px; }\n.child-grid { display: grid; grid-column: span ${span};${s.subRows ? " grid-row: span 3;" : ""} grid-template-columns: ${childCols}; grid-template-rows: ${childRows};${s.overrideGap ? ` gap: ${Math.max(4, Math.round(gap / 2))}px;` : ""} }\n.child-grid > * { padding: 1rem; border: 1px solid #334155; }`;
        const output = formatOutputs(html, css);
        const previewItems = Array.from({ length: count }, (_, i) => `<div class="ot-card">${i + 1}<small>Aligned content</small></div>`).join("");
        const preview = `<div class="ot-subgrid-parent" style="--cols:${cols};--span:${span};--gap:${gap}px"><div class="ot-subgrid-child">${previewItems}</div></div>`;
        const issues = +s.span > cols ? ["Child span was capped to the available parent columns."] : [];
        if (s.subRows && count > 3) issues.push("Row subgrid requires the parent to provide enough explicit row tracks for this content.");
        return { preview, output, issues };
      }
    },
    "masonry-layout-generator": {
      controls: [range("Columns", "columns", 1, 6, 3), range("Gap", "gap", 0, 40, 16), range("Items", "count", 4, 18, 9), select("Production fallback", "fallback", "columns", [["columns", "CSS columns"], ["grid", "Regular CSS Grid"]]), check("Progressively enhance with grid-lanes", "native", true), check("Allow featured spans", "spans", false), select("Content", "content", "gallery", ["gallery", "articles", "portfolio"])],
      presets: [["Photo gallery", { columns: 4, count: 12, content: "gallery" }], ["Article feed", { columns: 3, count: 9, content: "articles" }], ["Portfolio", { columns: 3, count: 8, content: "portfolio", spans: true }], ["Two-column notes", { columns: 2, count: 8 }], ["Dense gallery", { columns: 5, gap: 8, count: 15 }], ["Editorial", { columns: 3, gap: 24, count: 10 }], ["Mobile first", { columns: 2, count: 6 }], ["Experimental lanes", { columns: 4, native: true, spans: true }]],
      build(s) {
        const cols = +s.columns, gap = +s.gap, count = +s.count;
        const itemMarkup = Array.from({ length: count }, (_, i) => `<article class="masonry__item${s.spans && i === 1 ? " masonry__item--wide" : ""}"><h2>${cardData[i][0]}</h2><p>${cardData[i][1]}${i % 3 === 0 ? " Add representative long content to verify the real stacking behavior." : ""}</p></article>`).join("\n  ");
        const html = `<section class="masonry" aria-label="${esc(s.content)} collection">\n  ${itemMarkup}\n</section>`;
        const fallback = s.fallback === "columns" ? `.masonry { columns: ${cols}; column-gap: ${gap}px; }\n.masonry__item { break-inside: avoid; margin-block-end: ${gap}px; }` : `.masonry { display: grid; grid-template-columns: repeat(${cols}, minmax(0,1fr)); gap: ${gap}px; align-items: start; }`;
        const native = s.native ? `\n@supports (display: grid-lanes) { .masonry { display: grid-lanes; columns: initial; grid-template-columns: repeat(${cols}, minmax(0,1fr)); gap: ${gap}px; } .masonry__item { margin: 0; } }` : "";
        const responsive = `\n@media (max-width: 760px) { .masonry { ${s.fallback === "columns" ? "columns: 2" : "grid-template-columns: repeat(2,1fr)"}; } }\n@media (max-width: 480px) { .masonry { ${s.fallback === "columns" ? "columns: 1" : "grid-template-columns: 1fr"}; } }`;
        const css = `${fallback}${native}${responsive}`;
        const preview = `<div class="ot-masonry" style="--cols:${cols};--gap:${gap}px">${Array.from({ length: count }, (_, i) => `<article class="ot-card" style="min-height:${90 + (i % 4) * 45}px"><strong>${cardData[i][0]}</strong><p>${i % 2 ? cardData[i][1] : "A variable-height item tests the packing pattern."}</p></article>`).join("")}</div>`;
        const issues = ["Native CSS masonry/grid-lanes has limited browser availability. The generated fallback is the production baseline."];
        if (s.fallback === "columns") issues.push("CSS columns fill vertically, so visual order can differ from row-wise reading expectations.");
        return { preview, output: formatOutputs(html, css, "Verify current grid-lanes support before relying on the enhancement."), issues };
      }
    },
    "responsive-card-grid-generator": {
      controls: [select("Repeat mode", "repeat", "auto-fit", ["auto-fit", "auto-fill"]), range("Minimum card width", "min", 140, 420, 230, 10), range("Gap", "gap", 0, 40, 16), range("Cards", "count", 2, 16, 6), select("Card type", "type", "product", ["product", "article", "profile", "feature"]), select("Media ratio", "ratio", "16/9", ["16/9", "4/3", "1/1", "3/2"]), check("Align actions to card bottom", "align", true), check("Test extra-long content", "long", false)],
      presets: [["Product cards", { type: "product", min: 240, count: 8 }], ["Blog feed", { type: "article", min: 280, ratio: "16/9" }], ["Team profiles", { type: "profile", min: 210, ratio: "1/1" }], ["Feature cards", { type: "feature", min: 230, ratio: "4/3" }], ["Compact directory", { min: 170, gap: 10, count: 12 }], ["Editorial cards", { min: 320, gap: 24, count: 6 }], ["Auto-fill shelf", { repeat: "auto-fill", min: 200, count: 7 }], ["Long content test", { min: 250, long: true, count: 8 }]],
      build(s) {
        const count = +s.count, min = +s.min, gap = +s.gap;
        const html = `<section class="card-grid" aria-label="${esc(s.type)} cards">\n  ${cards(count, "card-grid__card")}\n</section>`;
        const css = `.card-grid { display: grid; grid-template-columns: repeat(${s.repeat}, minmax(min(100%, ${min}px), 1fr)); gap: ${gap}px; }\n.card-grid__card { display: flex; flex-direction: column; min-width: 0; padding: 1rem; border: 1px solid #334155; border-radius: 1rem; }\n.card-grid__card::before { content: ""; display: block; aspect-ratio: ${s.ratio}; background: #334155; border-radius: .65rem; }${s.align ? "\n.card-grid__card a { margin-top: auto; }" : ""}`;
        const previewCards = Array.from({ length: count }, (_, i) => `<article class="ot-card"><div class="ot-media-box" style="--ratio:${s.ratio}"></div><h3>${cardData[i][0]}</h3><p>${cardData[i][1]}${s.long && i === 0 ? " This intentionally longer paragraph verifies that the card can grow without clipping or fixed heights." : ""}</p><a href="#">View details</a></article>`).join("");
        const preview = `<div class="ot-card-grid" style="--repeat:${s.repeat};--min:${min}px;--gap:${gap}px">${previewCards}</div>`;
        const issues = min < 180 ? ["Very narrow cards can create poor line lengths and undersized touch targets."] : [];
        return { preview, output: formatOutputs(html, css), issues };
      }
    },
    "intrinsic-sidebar-generator": {
      controls: [select("Sidebar sizing", "mode", "intrinsic", [["intrinsic", "Intrinsic clamp"], ["fixed", "Fixed width"], ["fluid", "Fluid fraction"]]), range("Sidebar width", "width", 160, 360, 240, 10), range("Gap", "gap", 0, 40, 20), number("Mobile breakpoint", "breakpoint", 420, 980, 720, 10), select("Mobile behavior", "mobile", "stack", [["stack", "Stack below content"], ["hide", "Hide (drawer trigger required)"], ["top", "Stack above content"]]), check("Sticky sidebar", "sticky", true), check("Include navigation landmarks", "nav", true), select("Preset content", "content", "docs", ["docs", "dashboard", "account", "blog"])],
      presets: [["Documentation", { content: "docs", width: 250, mobile: "top" }], ["Dashboard", { content: "dashboard", width: 230, mobile: "hide" }], ["Account settings", { content: "account", width: 220, mobile: "top" }], ["Blog categories", { content: "blog", width: 260, mobile: "stack" }], ["Compact rail", { mode: "fixed", width: 180, gap: 12 }], ["Fluid navigation", { mode: "fluid", width: 260 }], ["Wide filters", { mode: "intrinsic", width: 320 }], ["Non-sticky", { sticky: false, width: 240 }]],
      build(s) {
        const width = +s.width, gap = +s.gap, bp = +s.breakpoint;
        const track = s.mode === "fixed" ? `${width}px` : s.mode === "fluid" ? `minmax(12rem, .35fr)` : `clamp(12rem, 22vw, ${width}px)`;
        const sideTag = s.nav ? "nav" : "aside";
        const navContent = `<strong>${esc(s.content)} navigation</strong><a href="#">Overview</a><a href="#">Guides</a><a href="#">Reference</a>`;
        const mobileMenu = s.mobile === "hide" ? `\n  <details class="sidebar-mobile-menu"><summary>Open ${esc(s.content)} navigation</summary><nav aria-label="Mobile section navigation">${navContent}</nav></details>` : "";
        const html = `<div class="sidebar-layout">${mobileMenu}\n  <${sideTag} class="sidebar"${s.nav ? ' aria-label="Section navigation"' : ""}>${navContent}</${sideTag}>\n  <main class="content"><h1>Content-safe sidebar layout</h1><p>The main region uses minmax(0, 1fr), allowing long descendants to shrink without forcing horizontal overflow.</p>${cards(3)}</main>\n</div>`;
        let mobileRule = `.sidebar-layout { grid-template-columns: 1fr; }`;
        if (s.mobile === "hide") mobileRule += ` .sidebar { display: none; } .sidebar-mobile-menu { display: block; }`;
        if (s.mobile === "stack") mobileRule += ` .sidebar { order: 2; }`;
        const css = `.sidebar-layout { display: grid; grid-template-columns: ${track} minmax(0, 1fr); gap: ${gap}px; }\n.sidebar-mobile-menu { display: none; }\n.sidebar, .sidebar-mobile-menu nav { align-content: start; gap: .75rem; }\n.sidebar { display: grid;${s.sticky ? " position: sticky; top: 1rem; max-height: calc(100vh - 2rem); overflow: auto;" : ""} }\n.sidebar-mobile-menu nav { display: grid; padding: 1rem 0; }\n@media (max-width: ${bp}px) { ${mobileRule} .sidebar { position: static; max-height: none; } }`;
        const previewMenu = s.mobile === "hide" ? `<details class="ot-sidebar-mobile"><summary>Open navigation</summary><div>${navContent}</div></details>` : "";
        const preview = `<div class="ot-sidebar-layout" data-mobile="${esc(s.mobile)}" style="--side:${track};--gap:${gap}px">${previewMenu}<${sideTag} class="ot-sidebar" style="${s.sticky ? "position:sticky;top:0" : ""}"><strong>${esc(s.content)} navigation</strong><p>Overview</p><p>Components</p><p>Examples</p><p>Settings</p></${sideTag}><main>${cards(3)}</main></div>`;
        const issues = [];
        if (width < 190) issues.push("A sidebar below 190px may wrap navigation labels and reduce usable target width.");
        if (bp < 600 && s.mobile !== "hide") issues.push("This late stacking point may leave the main content too narrow between 600px and the selected breakpoint.");
        return { preview, output: formatOutputs(html, css), issues };
      }
    },
    "holy-grail-layout-generator": {
      controls: [select("Sidebars", "sidebars", "both", [["both", "Left and right"], ["left", "Left only"], ["right", "Right only"], ["none", "No sidebars"]]), range("Left width", "left", 140, 320, 220, 10), range("Right width", "right", 140, 320, 190, 10), range("Gap", "gap", 0, 32, 16), number("Stack breakpoint", "breakpoint", 480, 1000, 760, 10), select("Mobile priority", "priority", "main", [["main", "Main first"], ["left", "Left navigation first"]]), check("Sticky header", "stickyHeader", true), check("Sticky sidebars", "stickySides", false)],
      presets: [["Classic holy grail", { sidebars: "both" }], ["Documentation", { sidebars: "left", left: 250, stickySides: true }], ["News site", { sidebars: "right", right: 280 }], ["Admin shell", { sidebars: "left", left: 220 }], ["Community", { sidebars: "both", left: 190, right: 230 }], ["Reader mode", { sidebars: "none" }], ["Wide navigation", { sidebars: "left", left: 300 }], ["Mobile-main first", { priority: "main", breakpoint: 820 }]],
      build(s) {
        const hasLeft = ["both", "left"].includes(s.sidebars), hasRight = ["both", "right"].includes(s.sidebars);
        const columns = `${hasLeft ? `${+s.left}px ` : ""}minmax(0,1fr)${hasRight ? ` ${+s.right}px` : ""}`;
        const areas = hasLeft && hasRight ? `"head head head" "left main right" "foot foot foot"` : hasLeft ? `"head head" "left main" "foot foot"` : hasRight ? `"head head" "main right" "foot foot"` : `"head" "main" "foot"`;
        const html = `<div class="page-shell">\n  <header>Site header</header>\n  ${hasLeft ? '<nav class="left" aria-label="Primary">Primary navigation</nav>\n  ' : ""}<main><h1>Primary content</h1><p>Source order keeps the main story clear when the visual columns collapse.</p></main>\n  ${hasRight ? '<aside class="right">Related information</aside>\n  ' : ""}<footer>Site footer</footer>\n</div>`;
        const mobileAreas = s.priority === "left" && hasLeft ? `"head" "left" "main"${hasRight ? ' "right"' : ""} "foot"` : `"head" "main"${hasLeft ? ' "left"' : ""}${hasRight ? ' "right"' : ""} "foot"`;
        const css = `.page-shell { display: grid; grid-template-areas: ${areas}; grid-template-columns: ${columns}; gap: ${+s.gap}px; min-height: 100vh; }\n.page-shell > header { grid-area: head;${s.stickyHeader ? " position: sticky; top: 0; z-index: 2;" : ""} }\n.page-shell > main { grid-area: main; min-width: 0; }\n.left { grid-area: left; } .right { grid-area: right; } .page-shell > footer { grid-area: foot; }${s.stickySides ? "\n.left, .right { position: sticky; top: 5rem; align-self: start; }" : ""}\n@media (max-width: ${+s.breakpoint}px) { .page-shell { grid-template-columns: 1fr; grid-template-areas: ${mobileAreas}; } .left, .right { position: static; } }`;
        const preview = `<div class="ot-page-layout" style="--left:${hasLeft ? `${+s.left}px` : "0px"};--right:${hasRight ? `${+s.right}px` : "0px"};--gap:${+s.gap}px"><header>Header</header>${hasLeft ? '<nav class="left">Left navigation</nav>' : ""}<main><h2>Main content</h2><p>Long content remains fluid and takes priority on narrow screens.</p>${cards(2)}</main>${hasRight ? '<aside class="right">Related content</aside>' : ""}<footer>Footer</footer></div>`;
        return { preview, output: formatOutputs(html, css), issues: [] };
      }
    },
    "grid-named-areas-designer": {
      controls: [textarea("Area map", "areas", "header header header\nsidebar main main\nfooter footer footer", "Use spaces between cells and a dot for an empty cell."), range("Gap", "gap", 0, 32, 12), select("Column tracks", "tracks", "equal", [["equal", "Equal fractions"], ["sidebar", "Sidebar + fluid content"], ["content", "Content-centered"]]), check("Generate semantic element mapping", "semantic", true), check("Include mobile area map", "mobile", true), textarea("Mobile map", "mobileAreas", "header\nmain\nsidebar\nfooter")],
      presets: [["Holy grail", { areas: "header header header\nleft main right\nfooter footer footer" }], ["Dashboard", { areas: "sidebar header header\nsidebar main aside\nsidebar main aside" }], ["Article", { areas: "header header\nmain aside\nfooter footer" }], ["Portfolio", { areas: "profile feature feature\nprojects projects contact" }], ["App shell", { areas: "nav topbar\nnav content" }], ["Magazine", { areas: "lead lead side\nstory1 story2 side" }], ["Simple page", { areas: "header\nmain\nfooter" }], ["Empty cell", { areas: "header header\nmain .\nfooter footer" }]],
      build(s) {
        const parsed = rectangularAreas(String(s.areas).split(/\n/));
        const mobile = rectangularAreas(String(s.mobileAreas).split(/\n/));
        const cols = parsed.width || 1;
        const tracks = s.tracks === "sidebar" && cols > 1 ? `minmax(12rem, .35fr) repeat(${cols - 1}, minmax(0,1fr))` : s.tracks === "content" && cols > 2 ? `1fr minmax(0, 70rem) 1fr` : `repeat(${cols}, minmax(0,1fr))`;
        const tagFor = (name) => s.semantic ? ({ header: "header", main: "main", footer: "footer", nav: "nav", sidebar: "aside", aside: "aside" }[name] || "section") : "div";
        const html = `<div class="area-layout">\n${parsed.names.map((name) => `  <${tagFor(name)} class="area-${slug(name)}">${esc(name)}</${tagFor(name)}>`).join("\n")}\n</div>`;
        const rowsCss = parsed.rows.map((row) => `    "${row.join(" ")}"`).join("\n");
        const mobileCss = mobile.rows.map((row) => `      "${row.join(" ")}"`).join("\n");
        const css = `.area-layout { display: grid; grid-template-columns: ${tracks}; grid-template-areas:\n${rowsCss}; gap: ${+s.gap}px; }\n${parsed.names.map((name) => `.area-${slug(name)} { grid-area: ${name}; }`).join("\n")}${s.mobile && mobile.valid ? `\n@media (max-width: 720px) { .area-layout { grid-template-columns: 1fr; grid-template-areas:\n${mobileCss}; } }` : ""}`;
        const previewAreas = parsed.names.map((name) => {
          const cells = parsed.rows.flatMap((row, r) => row.map((cell, c) => cell === name ? [r, c] : null).filter(Boolean));
          const rowStart = Math.min(...cells.map(([r]) => r)) + 1, rowEnd = Math.max(...cells.map(([r]) => r)) + 2;
          const colStart = Math.min(...cells.map(([, c]) => c)) + 1, colEnd = Math.max(...cells.map(([, c]) => c)) + 2;
          return `<div class="ot-area-cell" style="grid-column:${colStart}/${colEnd};grid-row:${rowStart}/${rowEnd}">${esc(name)}</div>`;
        }).join("");
        const preview = parsed.rows.length ? `<div class="ot-area-grid" style="grid-template-columns:repeat(${cols},minmax(70px,1fr));grid-template-rows:repeat(${parsed.rows.length},minmax(70px,1fr))">${previewAreas}</div>` : "<p>Add a valid area map.</p>";
        const issues = [...parsed.issues];
        parsed.names.filter((name) => !/^-?[a-zA-Z_][a-zA-Z0-9_-]*$/.test(name)).forEach((name) => issues.push(`Area name “${name}” is not a valid CSS identifier.`));
        if (s.mobile && !mobile.valid) issues.push(...mobile.issues.map((issue) => `Mobile: ${issue}`));
        return { preview, output: formatOutputs(html, css), issues };
      }
    },
    "responsive-media-builder": {
      controls: [select("Media ratio", "ratio", "16/9", ["16/9", "4/3", "3/2", "1/1", "9/16", "21/9"]), select("Object fit", "fit", "cover", ["cover", "contain", "fill", "scale-down"]), select("Focal point", "position", "center", ["center", "top", "bottom", "left", "right"]), range("Items", "count", 1, 10, 4), range("Grid columns", "columns", 1, 4, 2), select("Media type", "type", "image", ["image", "video", "iframe"]), check("Include caption and credit", "caption", true), check("Include width and height attributes", "dimensions", true), check("Lazy load non-primary media", "lazy", true), check("Generate picture art direction", "picture", true)],
      presets: [["Video embeds", { type: "iframe", ratio: "16/9", count: 2 }], ["Photo grid", { type: "image", ratio: "3/2", columns: 3, count: 6 }], ["Profile avatars", { ratio: "1/1", columns: 4, count: 8 }], ["Stories", { ratio: "9/16", columns: 4, count: 4 }], ["Hero banner", { ratio: "21/9", columns: 1, count: 1, lazy: false }], ["Product media", { ratio: "4/3", columns: 2, count: 5 }], ["Contain logos", { ratio: "16/9", fit: "contain", columns: 3 }], ["Top focal portraits", { ratio: "3/2", position: "top", count: 6 }]],
      build(s) {
        const count = +s.count, cols = +s.columns;
        const [ratioWidth, ratioHeight] = String(s.ratio).split("/").map(Number), intrinsicWidth = 1200, intrinsicHeight = Math.round(intrinsicWidth * ratioHeight / ratioWidth);
        const imageMarkup = (i) => s.picture ? `<picture><source media="(max-width: 600px)" srcset="image-${i + 1}-mobile.webp 640w" sizes="100vw"><img src="image-${i + 1}.webp" srcset="image-${i + 1}-small.webp 640w, image-${i + 1}.webp 1200w" sizes="(max-width: 640px) 100vw, ${Math.round(100 / Math.max(1, cols))}vw" alt="Describe the meaningful subject"${s.dimensions ? ` width="${intrinsicWidth}" height="${intrinsicHeight}"` : ""}${s.lazy && i > 0 ? ' loading="lazy" decoding="async"' : ' fetchpriority="high"'}></picture>` : `<img src="image-${i + 1}.webp" alt="Describe the meaningful subject"${s.dimensions ? ` width="${intrinsicWidth}" height="${intrinsicHeight}"` : ""}${s.lazy && i > 0 ? ' loading="lazy" decoding="async"' : ""}>`;
        const media = (i) => s.type === "image" ? imageMarkup(i) : s.type === "video" ? `<video controls preload="metadata" poster="poster-${i + 1}.webp"><source src="video-${i + 1}.mp4" type="video/mp4"><track kind="captions" src="captions-${i + 1}.vtt" srclang="en" label="English"></video>` : `<iframe src="https://example.com/embed/${i + 1}" title="Embedded media ${i + 1}" loading="lazy" allow="fullscreen" allowfullscreen></iframe>`;
        const html = `<section class="media-grid" aria-label="Responsive media collection">\n${Array.from({ length: count }, (_, i) => `  <figure><div class="media-frame">${media(i)}</div>${s.caption ? `<figcaption>Media ${i + 1} <small>Credit or source</small></figcaption>` : ""}</figure>`).join("\n")}\n</section>`;
        const css = `.media-grid { display: grid; grid-template-columns: repeat(${cols}, minmax(0,1fr)); gap: 1rem; }\n.media-frame { aspect-ratio: ${s.ratio}; overflow: hidden; background: #e2e8f0; }\n.media-frame > * { width: 100%; height: 100%; object-fit: ${s.fit}; object-position: ${s.position}; border: 0; }\n@media (max-width: 640px) { .media-grid { grid-template-columns: 1fr; } }`;
        const preview = `<div class="ot-media-grid" style="--cols:${cols}">${Array.from({ length: count }, (_, i) => `<figure><div class="ot-media-box" style="--ratio:${s.ratio}"></div>${s.caption ? `<figcaption>Media ${i + 1} · source</figcaption>` : ""}</figure>`).join("")}</div>`;
        const issues = [];
        if (!s.dimensions && s.type === "image") issues.push("Images without intrinsic width/height can cause layout shift before they load.");
        if (s.fit === "fill") issues.push("`object-fit: fill` can distort media; use only when distortion is intentional.");
        return { preview, output: formatOutputs(html, css), issues };
      }
    },
    "container-unit-calculator": {
      controls: [number("Container inline size (px)", "container", 160, 1800, 640, 10), number("Container block size (px)", "block", 120, 1200, 400, 10), number("Target value (px)", "target", 4, 600, 32, 1), select("Unit", "unit", "cqi", ["cqi", "cqw", "cqb", "cqh", "cqmin", "cqmax"]), select("CSS property", "property", "font-size", ["font-size", "padding", "gap", "border-radius", "inline-size"]), number("Minimum value (px)", "min", 0, 200, 18, 1), number("Maximum value (px)", "max", 4, 640, 56, 1), check("Generate bounded clamp", "clamp", true), text("Token name", "token", "fluid-title")],
      presets: [["Fluid heading", { target: 42, property: "font-size", min: 28, max: 64 }], ["Card padding", { target: 24, property: "padding", min: 16, max: 36 }], ["Grid gap", { target: 20, property: "gap", min: 12, max: 32 }], ["Fluid radius", { target: 18, property: "border-radius", min: 8, max: 28 }], ["Component width", { target: 320, property: "inline-size", min: 240, max: 480 }], ["Block-relative", { unit: "cqb", target: 24 }], ["Small container", { container: 320, target: 20 }], ["Large canvas", { container: 1200, target: 64 }]],
      build(s) {
        const container = +s.container, block = +s.block, target = +s.target;
        const reference = ["cqb", "cqh"].includes(s.unit) ? block : s.unit === "cqmin" ? Math.min(container, block) : s.unit === "cqmax" ? Math.max(container, block) : container;
        const value = +(target / reference * 100).toFixed(4), min = Math.min(+s.min, +s.max), max = Math.max(+s.min, +s.max), token = `--${slug(s.token, "fluid-value")}`;
        const fluid = s.clamp ? `clamp(${min / 16}rem, ${value}${s.unit}, ${max / 16}rem)` : `${value}${s.unit}`;
        const html = `<div class="unit-container"><div class="unit-sample">Container-relative ${esc(s.property)}</div></div>`;
        const needsBlock = ["cqb", "cqh", "cqmin", "cqmax"].includes(s.unit);
        const css = `.unit-container { container: unit-demo / ${needsBlock ? "size" : "inline-size"};${needsBlock ? ` block-size: ${block}px;` : ""} resize: horizontal; overflow: auto; }\n:root { ${token}: ${fluid}; }\n.unit-sample { ${s.property}: var(${token}); }`;
        const resolved = Math.round(reference * value / 100);
        const preview = `<div class="ot-unit-demo"><div class="ot-unit-sample" style="--fluid:${fluid}">${esc(s.property)}: ${fluid}</div><p>At ${container}px × ${block}px, ${value}${s.unit} resolves to approximately ${resolved}px.</p></div>`;
        const issues = [];
        if (needsBlock) issues.push("Size containment affects intrinsic sizing. Keep the generated block size only when the real component has a deliberate definite height.");
        if (+s.min > +s.max) issues.push("Minimum and maximum were normalized in the generated clamp value.");
        return { preview, output: formatOutputs(html, css), issues };
      }
    },
    "responsive-breakpoint-planner": {
      controls: [select("Component", "component", "card-grid", [["card-grid", "Card grid"], ["sidebar", "Sidebar shell"], ["navigation", "Navigation"], ["dashboard", "Dashboard"], ["article", "Article layout"]]), number("Minimum tested width", "min", 240, 800, 320, 10), number("Maximum tested width", "max", 800, 2560, 1440, 10), number("First failure width", "first", 320, 1400, 560, 10), number("Second failure width", "second", 480, 1800, 900, 10), number("Third enhancement width", "third", 600, 2200, 1200, 10), select("Strategy", "strategy", "mobile-first", [["mobile-first", "Mobile first (min-width)"], ["desktop-first", "Desktop first (max-width)"], ["container", "Container queries"]]), check("Export breakpoint tokens", "tokens", true), check("Include content-test checklist", "checklist", true)],
      presets: [["Card grid", { component: "card-grid", first: 520, second: 820, third: 1180 }], ["Sidebar", { component: "sidebar", first: 680, second: 960, third: 1280 }], ["Navigation", { component: "navigation", first: 740, second: 980, third: 1280 }], ["Dashboard", { component: "dashboard", first: 620, second: 960, third: 1360 }], ["Article", { component: "article", first: 580, second: 860, third: 1120 }], ["Container card", { strategy: "container", first: 360, second: 560, third: 760 }], ["Compact app", { first: 480, second: 760, third: 1040 }], ["Wide data UI", { first: 720, second: 1100, third: 1500 }]],
      build(s) {
        const min = +s.min, max = +s.max, points = [+s.first, +s.second, +s.third].sort((a, b) => a - b);
        const prefix = s.strategy === "container" ? "@container" : "@media";
        const condition = (width) => s.strategy === "desktop-first" ? `(max-width: ${width}px)` : `(min-width: ${width}px)`;
        const tokens = s.tokens ? `:root { --breakpoint-compact: ${points[0] / 16}rem; --breakpoint-comfortable: ${points[1] / 16}rem; --breakpoint-expanded: ${points[2] / 16}rem; }\n` : "";
        const className = `responsive-${slug(s.component)}`;
        const rules = s.strategy === "desktop-first"
          ? `.${className} { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 1rem; }\n${prefix} ${condition(points[2])} { .${className} { grid-template-columns: repeat(3, minmax(0,1fr)); } }\n${prefix} ${condition(points[1])} { .${className} { grid-template-columns: repeat(2, minmax(0,1fr)); } }\n${prefix} ${condition(points[0])} { .${className} { grid-template-columns: 1fr; } }`
          : `.${className} { display: grid; grid-template-columns: 1fr; gap: 1rem; }\n${prefix} ${condition(points[0])} { .${className} { grid-template-columns: repeat(2, minmax(0,1fr)); } }\n${prefix} ${condition(points[1])} { .${className} { grid-template-columns: repeat(3, minmax(0,1fr)); } }\n${prefix} ${condition(points[2])} { .${className} { grid-template-columns: repeat(4, minmax(0,1fr)); } }`;
        const css = `${tokens}${s.strategy === "container" ? `.${className}-container { container: ${slug(s.component)} / inline-size; }\n` : ""}${rules}`;
        const gridHtml = `<section class="${className}" aria-label="Responsive ${esc(s.component)}">${cards(8)}</section>`;
        const html = s.strategy === "container" ? `<div class="${className}-container">${gridHtml}</div>` : gridHtml;
        const span = Math.max(1, max - min);
        const markers = points.map((point) => `<div class="ot-breakpoint-mark" style="left:${Math.max(0, Math.min(100, (point - min) / span * 100))}%"><span>${point}px</span></div>`).join("");
        const preview = `<p>Test range: ${min}px–${max}px. Breakpoints represent observed content failures, not device brands.</p><div class="ot-breakpoint-bar">${markers}</div><div class="ot-breakpoint-preview" style="--cols:3">${cards(6)}</div>`;
        const issues = [];
        if (min >= max) issues.push("Maximum tested width must be greater than minimum tested width.");
        if (new Set(points).size < 3) issues.push("Breakpoints should be distinct to avoid redundant rules.");
        if (points.some((point) => point <= min || point >= max)) issues.push("All breakpoints should fall inside the tested width range.");
        return { preview, output: formatOutputs(html, css, s.checklist ? "Test long labels, 200% zoom, localization, missing media, and real navigation states at each failure width." : ""), issues };
      }
    }
  };
  const tool = tools[id];
  if (!tool) return;
  const outputBadge = $$(".other-tool-badges span").find((item) => item.textContent.trim() === "5 output modes");
  if (outputBadge) outputBadge.textContent = "6 output modes";
  const controlsRoot = $("#other-controls"), presetRoot = $("#other-presets"), preview = $("#other-preview"), code = $("#other-code"), validation = $("#other-validation"), status = $("#other-status");
  let outputKind = "css", device = "desktop", currentResult;
  const storageKey = `bentocss:other-tool:${id}:v1`;
  function optionMarkup(option, selected) {
    const value = Array.isArray(option) ? option[0] : option, label = Array.isArray(option) ? option[1] : option;
    return `<option value="${esc(value)}"${String(value) === String(selected) ? " selected" : ""}>${esc(label)}</option>`;
  }
  function renderControl(control) {
    const key = esc(control.key), common = `id="ot-${key}" data-key="${key}"`;
    if (control.type === "checkbox") return `<label class="other-control other-check"><input ${common} type="checkbox"${control.value ? " checked" : ""}><span>${esc(control.label)}</span></label>`;
    let field = "";
    if (control.type === "select") field = `<select ${common}>${control.options.map((option) => optionMarkup(option, control.value)).join("")}</select>`;
    else if (control.type === "textarea") field = `<textarea ${common} rows="4" spellcheck="false">${esc(control.value)}</textarea>`;
    else field = `<input ${common} type="${control.type}" value="${esc(control.value)}"${control.min != null ? ` min="${control.min}"` : ""}${control.max != null ? ` max="${control.max}"` : ""}${control.step != null ? ` step="${control.step}"` : ""}>`;
    const liveValue = control.type === "range" ? `<output class="other-range-value" for="ot-${key}" data-value-for="${key}">${esc(control.value)}</output>` : "";
    return `<label class="other-control" for="ot-${key}"><span>${esc(control.label)}${liveValue}</span>${field}${control.help ? `<small>${esc(control.help)}</small>` : ""}</label>`;
  }
  controlsRoot.innerHTML = tool.controls.map(renderControl).join("");
  presetRoot.innerHTML = tool.presets.map(([name], index) => `<button class="other-preset" type="button" data-preset="${index}">${String(index + 1).padStart(2, "0")} · ${esc(name)}</button>`).join("");
  const initialValues = Object.fromEntries(tool.controls.map((control) => [control.key, control.value]));
  const completeButton = document.createElement("button");
  completeButton.type = "button";
  completeButton.dataset.outputKind = "complete";
  completeButton.setAttribute("aria-pressed", "false");
  completeButton.textContent = "Complete HTML";
  $(".other-output-tabs").insertBefore(completeButton, $("#other-copy"));
  function state() {
    return Object.fromEntries(tool.controls.map((control) => {
      const field = $(`[data-key="${control.key}"]`);
      return [control.key, control.type === "checkbox" ? field.checked : field.value];
    }));
  }
  function apply(values) {
    Object.entries(values).forEach(([key, value]) => {
      const field = $(`[data-key="${key}"]`);
      if (!field) return;
      if (field.type === "checkbox") field.checked = Boolean(value); else field.value = value;
    });
    update();
  }
  function update() {
    currentResult = tool.build(state());
    $$('[data-value-for]').forEach((output) => { const field = $(`[data-key="${output.dataset.valueFor}"]`); if (field) output.value = field.value; });
    preview.innerHTML = currentResult.preview;
    if (typeof dialog !== "undefined" && dialog.open) fullFrame.innerHTML = currentResult.preview;
    code.textContent = currentResult.output[outputKind] || currentResult.output.css;
    validation.innerHTML = currentResult.issues.length ? `<strong>${currentResult.issues.length} review item${currentResult.issues.length === 1 ? "" : "s"}</strong><ul>${currentResult.issues.map((issue) => `<li>${esc(issue)}</li>`).join("")}</ul>` : "<strong>No blocking configuration issues detected.</strong><p>Test the exported component with real content, browsers, zoom, keyboard controls, and assistive technology.</p>";
    localStorage.setItem(storageKey, JSON.stringify(state()));
    status.textContent = "Saved locally";
    window.BentoSEO?.track("other_tool_changed", { tool: id });
  }
  controlsRoot.addEventListener("input", update);
  presetRoot.addEventListener("click", (event) => {
    const button = event.target.closest("[data-preset]"); if (!button) return;
    apply(tool.presets[+button.dataset.preset][1]);
    window.BentoSEO?.track("other_tool_preset_loaded", { tool: id, preset: button.dataset.preset });
  });
  const resetButton = document.createElement("button");
  resetButton.type = "button";
  resetButton.className = "btn btn-secondary other-project-action";
  resetButton.textContent = "Reset";
  resetButton.addEventListener("click", () => { apply(initialValues); status.textContent = "Defaults restored"; });
  const projectButton = document.createElement("button");
  projectButton.type = "button";
  projectButton.className = "btn btn-secondary other-project-action";
  projectButton.textContent = "Project JSON";
  projectButton.addEventListener("click", () => {
    const blob = new Blob([JSON.stringify({ version: 1, tool: id, settings: state() }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob), anchor = document.createElement("a");
    anchor.href = url; anchor.download = `${id}-project.json`; anchor.click(); URL.revokeObjectURL(url);
    status.textContent = "Project downloaded";
  });
  const toolbar = $(".other-toolbar");
  toolbar.insertBefore(resetButton, status);
  toolbar.insertBefore(projectButton, status);
  $$("[data-device]").forEach((button) => button.addEventListener("click", () => {
    device = button.dataset.device;
    $$("[data-device]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    $("#other-preview-frame").dataset.device = device;
    status.textContent = `${device[0].toUpperCase()}${device.slice(1)} preview`;
  }));
  $$("[data-output-kind]").forEach((button) => button.addEventListener("click", () => {
    outputKind = button.dataset.outputKind;
    $$("[data-output-kind]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    code.textContent = currentResult.output[outputKind] || currentResult.output.css;
  }));
  $("#other-copy").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(code.textContent); status.textContent = "Code copied"; window.BentoSEO?.track("other_tool_code_copied", { tool: id, format: outputKind }); }
    catch { status.textContent = "Select and copy the code manually"; }
  });
  $("#other-download").addEventListener("click", () => {
    const ext = ({ css: "css", html: "html", tailwind: "html", react: "jsx", astro: "astro", complete: "html" })[outputKind] || "txt";
    const blob = new Blob([code.textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob), anchor = document.createElement("a");
    anchor.href = url; anchor.download = `${id}.${ext}`; anchor.click(); URL.revokeObjectURL(url);
    window.BentoSEO?.track("other_tool_downloaded", { tool: id, format: outputKind });
  });
  const dialog = $("#other-fullscreen"), fullFrame = $("#other-fullscreen-frame");
  $("#other-open-fullscreen").addEventListener("click", () => { fullFrame.dataset.device = device; fullFrame.innerHTML = preview.innerHTML; dialog.showModal(); });
  $("#other-close-fullscreen").addEventListener("click", () => dialog.close());
  $$('[data-full-device]').forEach((button) => button.addEventListener("click", () => { fullFrame.dataset.device = button.dataset.fullDevice; fullFrame.innerHTML = preview.innerHTML; }));
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  try { const saved = JSON.parse(localStorage.getItem(storageKey)); if (saved) apply(saved); else update(); } catch { update(); }
})();
