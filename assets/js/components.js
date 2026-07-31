(() => {
  const registry = window.BENTO_ROUTE_REGISTRY || { routes: [] };
  const routeById = new Map(registry.routes.map((route) => [route.id, route]));
  const url = (id) => routeById.get(id)?.url || "/";
  const groups = [
    ["Tools", [
      ["CSS Grid Generator", "css-grid-generator"],
      ["Tailwind Bento", "tailwind-bento-generator"],
      ["Dashboard Builder", "dashboard-layout-generator"],
      ["Hero Builder", "hero-section-generator"],
      ["Pricing Builder", "pricing-table-generator"],
      ["Navbar Builder", "navbar-generator"],
      ["Footer Builder", "footer-generator"]
    ]],
    ["Examples", [
      ["CSS Grid Examples", "css-grid-examples"],
      ["Bento Examples", "bento-grid-examples"],
      ["Best Bento Layouts", "best-bento-layouts"],
      ["Portfolio Layouts", "portfolio-layouts"]
    ]],
    ["Resources", [
      ["CSS Grid Cheatsheet", "css-grid-cheatsheet"],
      ["Tailwind Cheatsheet", "tailwind-grid-cheatsheet"],
      ["UI Templates", "ui-layout-templates"],
      ["HTML CSS Generators", "html-css-generators"]
    ]],
    ["Guides", [
      ["Responsive Dashboards", "responsive-dashboard-layouts"],
      ["Landing Page Layouts", "landing-page-layouts"],
      ["Feature Sections", "feature-section-generator"],
      ["Testimonials", "testimonial-generator"]
    ]]
  ];
  const el = (id) => document.getElementById(id);

  function header() {
    const target = el("site-header");
    if (!target) return;
    target.innerHTML = `<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="container nav-wrap"><a class="brand" href="/"><span class="brand-mark">Bento</span>CSS</a><div class="search-wrap"><label class="hide" for="site-search">Search tools</label><input id="site-search" class="search-input" type="search" placeholder="Search tools…" autocomplete="off" aria-controls="search-results"><div id="search-results" class="search-results hide" role="listbox"></div></div><button class="nav-menu-btn" aria-expanded="false" aria-controls="nav-links">Menu</button><nav id="nav-links" class="nav-links" aria-label="Primary"><a href="/">Home</a><a href="${url("bento-grid-generator")}">Bento</a><a href="${url("css-grid-examples")}">Examples</a><a href="${url("css-grid-cheatsheet")}">Guides</a><a class="btn ai-cta" href="https://readdy.ai/?via=joshua-eddy" target="_blank" rel="sponsored noopener">Build with AI</a></nav></div></header>`;
    document.querySelectorAll(".nav-links a").forEach((link) => {
      if (new URL(link.href).pathname === location.pathname) {
        link.setAttribute("aria-current", "page");
      }
    });
    const button = document.querySelector(".nav-menu-btn");
    button.onclick = () => {
      const navigation = el("nav-links");
      navigation.classList.toggle("open");
      button.setAttribute("aria-expanded", navigation.classList.contains("open"));
    };
  }

  function footer() {
    const target = el("site-footer");
    if (!target) return;
    target.innerHTML = `<footer class="site-footer"><div class="container"><div class="card"><span class="eyebrow">Developer recommendation</span><h2>Continue building with an AI workflow</h2><p class="muted">Take your generated layout from prototype to a complete, responsive interface.</p><a class="btn" href="https://bolt.cello.so/3ME6XnH5nD4" target="_blank" rel="sponsored noopener">Build faster with Bolt</a></div><div class="footer-grid section"><div><a class="brand" href="/"><span class="brand-mark">Bento</span>CSS</a><p class="muted">Practical CSS generators, layout builders, examples, and developer references.</p></div>${groups.map(([heading, links]) => `<div class="footer-col"><h3>${heading}</h3>${links.map(([name, id]) => `<a href="${url(id)}">${name}</a>`).join("")}</div>`).join("")}</div><div class="footer-grid"><div class="footer-col"><h3>Company</h3><a href="${url("about")}">About</a><a href="${url("contact")}">Contact</a><a href="${url("changelog")}">Changelog</a></div><div class="footer-col"><h3>Legal</h3><a href="${url("privacy-policy")}">Privacy</a><a href="${url("code-license")}">Generated code license</a></div><div class="footer-col"><h3>AI Resources</h3><a href="https://readdy.ai/?via=joshua-eddy" rel="sponsored noopener">Readdy AI</a><a href="https://bolt.cello.so/3ME6XnH5nD4" rel="sponsored noopener">Bolt</a></div><div class="footer-col"><h3>Quick Links</h3><a href="/">Homepage</a><a href="${url("html-css-generators")}">All generators</a></div></div><p class="muted">© ${new Date().getFullYear()} BentoCSS. Some recommendations use affiliate links at no extra cost to you.</p></div></footer>`;
  }

  function affiliate() {
    document.body.insertAdjacentHTML("beforeend", `<aside id="affiliate-bar" class="affiliate-bar" aria-label="Developer recommendation"><div class="container affiliate-inner"><p id="affiliate-copy"></p><a id="affiliate-link" class="btn" target="_blank" rel="sponsored noopener">Try AI builder</a></div></aside><div id="ai-popup" class="popup-backdrop hide" role="dialog" aria-modal="true" aria-labelledby="popup-title"><div class="popup"><button class="popup-close" aria-label="Close recommendation">×</button><span class="eyebrow">Next step</span><h2 id="popup-title">Turn your layout into a complete website</h2><p class="muted">Use an AI workflow to add content, responsive states, and production polish faster.</p><div class="hero-actions"><a class="btn" href="https://readdy.ai/?via=joshua-eddy" target="_blank" rel="sponsored noopener">Continue with Readdy</a><a class="btn btn-secondary" href="https://bolt.cello.so/3ME6XnH5nD4" target="_blank" rel="sponsored noopener">Build with Bolt</a></div></div></div>`);
    const messages = [
      ["Continue Building — turn this layout into a production-ready site.", "https://readdy.ai/?via=joshua-eddy"],
      ["AI Workflow — prototype and ship your next frontend faster.", "https://bolt.cello.so/3ME6XnH5nD4"],
      ["Developer Recommendation — keep building without starting over.", "https://readdy.ai/?via=joshua-eddy"]
    ];
    let index = 0;
    const copy = el("affiliate-copy");
    const link = el("affiliate-link");
    const rotate = () => {
      const message = messages[index++ % messages.length];
      copy.textContent = message[0];
      link.href = message[1];
    };
    rotate();
    setInterval(rotate, 7000);
    const popup = el("ai-popup");
    const bar = el("affiliate-bar");
    const close = () => {
      popup.classList.add("hide");
      bar.classList.remove("hide");
    };
    popup.querySelector("button").onclick = close;
    popup.onclick = (event) => {
      if (event.target === popup) close();
    };
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });
    if (!localStorage.getItem("bentoPopupSeen")) {
      setTimeout(() => {
        popup.classList.remove("hide");
        bar.classList.add("hide");
        localStorage.setItem("bentoPopupSeen", "1");
        popup.querySelector("button").focus();
      }, 10000);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    header();
    footer();
    affiliate();
  });
})();
