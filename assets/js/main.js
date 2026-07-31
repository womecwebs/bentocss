document.addEventListener("DOMContentLoaded", () => {
  const registry = window.BENTO_ROUTE_REGISTRY || { routes: [] };
  const pages = registry.routes.filter((route) =>
    route.indexable && ["generator", "resource", "guide", "template"].includes(route.type)
  );
  const query = document.getElementById("site-search");
  const results = document.getElementById("search-results");

  if (query && results) {
    query.addEventListener("input", () => {
      const value = query.value.trim().toLowerCase();
      const hits = value
        ? pages.filter((route) =>
            `${route.title} ${route.keyword}`.toLowerCase().includes(value)
          ).slice(0, 7)
        : [];
      results.innerHTML = hits.map((route) =>
        `<a role="option" href="${route.url}">${route.title}<small class="muted"><br>${route.keyword}</small></a>`
      ).join("");
      results.classList.toggle("hide", !hits.length);
    });
    query.addEventListener("keydown", (event) => {
      if (event.key === "Escape") results.classList.add("hide");
    });
  }

  document.querySelectorAll("[data-copy]").forEach((button) =>
    button.addEventListener("click", async () => {
      const text = document.querySelector(button.dataset.copy)?.textContent || "";
      await navigator.clipboard.writeText(text);
      button.textContent = "Copied";
      setTimeout(() => {
        button.textContent = "Copy code";
      }, 1400);
      window.BentoSEO?.track("copy_code");
    })
  );

  const grid = document.querySelector(".preview-grid");
  if (grid) {
    document.querySelectorAll("[data-grid]").forEach((input) =>
      input.addEventListener("input", () => {
        grid.style.gridTemplateColumns =
          `repeat(${document.querySelector('[data-grid="columns"]').value},1fr)`;
        grid.style.gap =
          `${document.querySelector('[data-grid="gap"]').value}px`;
      })
    );
  }

  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) =>
        entry.target.classList.toggle("visible", entry.isIntersecting)
      ),
    { threshold: 0.08 }
  );
  document.querySelectorAll(".reveal").forEach((element) =>
    observer.observe(element)
  );
});
