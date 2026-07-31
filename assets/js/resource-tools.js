(() => {
  const id = document.body.dataset.resourceTool;
  const root = document.querySelector("#resource-lab");
  if (!id || !root) return;
  const pageData = {
    "html-css-generators": ["Bento Grid","CSS Grid","Tailwind Bento","Dashboard Layout","Hero Section","Pricing Table","Feature Section","Navbar","Footer","Testimonial"],
    "css-grid-examples": ["Holy Grail","Editorial Sidebar","Responsive Gallery","Dashboard Shell","Card Collection","Documentation Layout","Product Grid","Article With Aside","Full-Bleed Feature","Dense Data Grid"],
    "best-bento-layouts": ["SaaS Feature Map","Portfolio Showcase","Analytics Summary","Product Launch","Agency Services","Creator Profile","Team Directory","Media Dashboard","App Overview","Minimal Bento"],
    "css-grid-cheatsheet": ["Grid Container","Track Sizing","Repeat and Minmax","Auto Fit vs Fill","Item Placement","Named Areas","Alignment","Implicit Grid","Responsive Grid","Debugging"],
    "tailwind-grid-cheatsheet": ["Grid Columns","Responsive Tracks","Column Span","Row Span","Gap Scale","Auto Rows","Place Items","Subgrid","Arbitrary Tracks","Safe Dynamic Classes"],
    "landing-page-layouts": ["SaaS Conversion","Product Launch","Lead Generation","App Download","Waitlist","Webinar","Ecommerce Product","Agency Service","Newsletter","Event Registration"],
    "portfolio-layouts": ["Product Designer","Frontend Developer","Photographer","Illustrator","Creative Agency","UX Researcher","Architect","Copywriter","Motion Designer","Freelancer"],
    "ui-layout-templates": ["Admin Dashboard","SaaS Marketing","Documentation","Portfolio","Ecommerce","Settings Screen","Analytics","Team Directory","Support Center","Project Workspace"],
    "changelog": ["Generator Template Library","React Output","Shareable Configurations","Indexation Controls","Route Registry","Canonical Repair","Accessibility Pass","Analytics Disclosure","Affiliate Disclosure","Initial BentoCSS Release"],
    "code-license": ["Commercial website","Client project","Open-source package","Internal company tool","Paid template","Course material","Generated component library","Resold snippet","Attribution question","Warranty question"]
  };
  const names = pageData[id] || [];
  const stateKey = `bentocss:resource:${id}`;
  let selected = 0;
  let compare = [];
  let favorites = new Set(JSON.parse(localStorage.getItem(`${stateKey}:favorites`) || "[]"));
  const category = (index) => ["Starter", "Production", "Advanced"][index % 3];
  const descriptions = {
    "html-css-generators": "Open a working BentoCSS builder with responsive preview and portable output.",
    "css-grid-examples": "A tested CSS Grid composition with semantic source order and a narrow-screen fallback.",
    "best-bento-layouts": "A bento composition selected for a specific content hierarchy rather than decoration alone.",
    "css-grid-cheatsheet": "A concise Grid reference with a copy-ready declaration and practical usage note.",
    "tailwind-grid-cheatsheet": "A statically discoverable Tailwind Grid pattern with responsive utility classes.",
    "landing-page-layouts": "A conversion layout mapped to one audience, one offer, and one measurable primary action.",
    "portfolio-layouts": "A portfolio structure designed around proof, case-study depth, and a clear contact path.",
    "ui-layout-templates": "A production-oriented interface shell with meaningful regions and responsive behavior.",
    "changelog": "A documented BentoCSS platform change with its user-facing reason and affected area.",
    "code-license": "A common generated-code usage scenario explained in plain language. Review the full license for binding terms."
  };
  function codeFor(index) {
    const name = names[index];
    if (id === "html-css-generators") return `Open ${name} from the directory and export HTML, CSS, or React.`;
    if (id === "css-grid-cheatsheet") return ["display: grid;","grid-template-columns: repeat(3, minmax(0, 1fr));","grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));","grid-column: 1 / -1;","grid-template-areas: 'nav main';","place-items: center;","grid-auto-rows: minmax(8rem, auto);","gap: 1rem;","min-width: 0;","@supports (grid-template-columns: subgrid) { }"][index];
    if (id === "tailwind-grid-cheatsheet") return ["grid grid-cols-3","grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4","col-span-2","row-span-2","gap-4 lg:gap-6","auto-rows-fr","place-items-center","grid-cols-subgrid","grid-cols-[240px_minmax(0,1fr)]","const variants = { three: 'grid-cols-3' }"][index];
    if (id === "code-license") return index === 7 ? "Not expressly covered: contact BentoCSS before reselling generated snippets substantially unchanged." : "Generally permitted by the published terms: use, modify, combine, and distribute generated output in a broader project.";
    if (id === "changelog") return `2026-${String(Math.max(1, 7 - Math.floor(index / 2))).padStart(2,"0")}: ${name}`;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g,"-");
    return `<section class="${slug}">\n  <header><h2>${name}</h2></header>\n  <div class="${slug}__grid">...</div>\n</section>\n\n.${slug}__grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));\n  gap: 1rem;\n}`;
  }
  function visibleItems() {
    const query = root.querySelector("#resource-search").value.trim().toLowerCase();
    const filter = root.querySelector("#resource-filter").value;
    return names.map((name,index)=>({name,index})).filter(item => (!query || item.name.toLowerCase().includes(query)) && (!filter || category(item.index) === filter));
  }
  function renderList() {
    const list = root.querySelector("#resource-items");
    const items = visibleItems();
    list.innerHTML = items.map(({name,index}) => `<article class="resource-item${index===selected?" is-selected":""}"><button type="button" class="resource-select" data-select="${index}"><span class="eyebrow">${category(index)}</span><strong>${name}</strong><small>${descriptions[id]}</small></button><button type="button" class="resource-favorite" data-favorite="${index}" aria-pressed="${favorites.has(index)}" aria-label="${favorites.has(index)?"Remove from":"Add to"} favorites">${favorites.has(index)?"★":"☆"}</button><label><input type="checkbox" data-compare="${index}" ${compare.includes(index)?"checked":""}> Compare</label></article>`).join("");
    root.querySelector("#resource-result-count").textContent = `${items.length} of ${names.length} resources shown`;
  }
  function renderPreview() {
    const name = names[selected];
    root.querySelector("#resource-preview-title").textContent = name;
    root.querySelector("#resource-preview-description").textContent = descriptions[id];
    root.querySelector("#resource-code").textContent = codeFor(selected);
    root.querySelector("#resource-progress").textContent = `${favorites.size} saved · ${compare.length} selected to compare`;
  }
  function renderCompare() {
    root.querySelector("#resource-compare-output").innerHTML = compare.length ? compare.map(index=>`<article><h4>${names[index]}</h4><p>${descriptions[id]}</p><code>${codeFor(index).replace(/</g,"&lt;")}</code></article>`).join("") : "<p class=\"muted\">Select up to three resources to compare their purpose and implementation.</p>";
  }
  root.querySelector("#resource-search").addEventListener("input", renderList);
  root.querySelector("#resource-filter").addEventListener("change", renderList);
  root.querySelector("#resource-items").addEventListener("click", event => {
    const select = event.target.closest("[data-select]");
    const favorite = event.target.closest("[data-favorite]");
    if (select) { selected=Number(select.dataset.select); renderList(); renderPreview(); }
    if (favorite) { const index=Number(favorite.dataset.favorite); favorites.has(index)?favorites.delete(index):favorites.add(index); localStorage.setItem(`${stateKey}:favorites`,JSON.stringify([...favorites])); renderList(); renderPreview(); }
  });
  root.querySelector("#resource-items").addEventListener("change", event => {
    if (!event.target.matches("[data-compare]")) return;
    const index=Number(event.target.dataset.compare);
    if(event.target.checked && compare.length<3) compare.push(index); else if(event.target.checked){event.target.checked=false;} else compare=compare.filter(item=>item!==index);
    if(compare.length>=3) [...root.querySelectorAll("[data-compare]:not(:checked)")].forEach(input=>input.disabled=true);
    renderCompare(); renderPreview();
  });
  root.querySelector("#resource-copy").addEventListener("click", async event => { await navigator.clipboard.writeText(codeFor(selected)); event.currentTarget.textContent="Copied"; setTimeout(()=>event.currentTarget.textContent="Copy code",1200); });
  root.querySelector("#resource-download").addEventListener("click", () => { const link=document.createElement("a"); link.href=URL.createObjectURL(new Blob([codeFor(selected)],{type:"text/plain"})); link.download=`${id}-${selected+1}.txt`; link.click(); URL.revokeObjectURL(link.href); });
  root.querySelector("#resource-random").addEventListener("click", () => { selected=Math.floor(Math.random()*names.length); renderList(); renderPreview(); });
  root.querySelector("#resource-theme").addEventListener("click", event => { const button=event.target.closest("[data-theme]"); if(button) root.querySelector("#resource-preview").dataset.theme=button.dataset.theme; });
  root.querySelector("#resource-clear").addEventListener("click", () => { favorites.clear(); compare=[]; localStorage.removeItem(`${stateKey}:favorites`); renderList(); renderPreview(); renderCompare(); });
  renderList(); renderPreview(); renderCompare();
})();
