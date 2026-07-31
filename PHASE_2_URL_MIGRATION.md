# BentoCSS Phase 2 URL Migration Record

**Implemented:** 2026-07-30  
**Canonical host:** `https://bentocss.netlify.app`  
**Redirect policy:** Direct permanent `301` redirects, retained for at least one year.

## Frozen canonical destinations

| Previous URL | Canonical destination |
|---|---|
| `/tools/bento-grid-examples.html` | `/guides/bento-grid-examples.html` |
| `/tools/best-bento-layouts.html` | `/guides/best-bento-layouts.html` |
| `/tools/css-grid-cheatsheet.html` | `/guides/css-grid-cheatsheet.html` |
| `/tools/css-grid-examples.html` | `/guides/css-grid-examples.html` |
| `/tools/landing-page-layouts.html` | `/guides/landing-page-layouts.html` |
| `/tools/portfolio-layouts.html` | `/guides/portfolio-layouts.html` |
| `/tools/responsive-dashboard-layouts.html` | `/guides/responsive-dashboard-layouts.html` |
| `/tools/tailwind-grid-cheatsheet.html` | `/guides/tailwind-grid-cheatsheet.html` |
| `/tools/ui-layout-templates.html` | `/templates/ui-layout-templates.html` |
| `/templates` | `/templates.html` |

The `/templates` redirect resolves the collision between the original root-level `templates.html` page and the newer `/templates/` content directory.

## Single source of truth

`assets/js/routes.js` defines:

- route ID;
- title;
- section;
- public URL;
- source/output path;
- page type;
- primary keyword;
- indexability;
- last meaningful modification date;
- sitemap priority and frequency;
- previous aliases;
- canonical URL.

It drives:

- shared navigation and footer links;
- search autocomplete;
- future page generation;
- sitemap generation;
- redirect generation;
- route validation.

## Generated artifacts

Run:

```powershell
node scripts/build-route-artifacts.cjs
```

This regenerates:

- `_redirects`
- `sitemap.xml`

## Applying registry corrections

Run:

```powershell
node scripts/apply-route-registry.cjs
```

This updates platform pages without altering the homepage:

- canonical URL;
- Open Graph URL;
- structured-data page URL;
- structured-data breadcrumb parent;
- migrated internal links;
- shared search registry reference.

## Validation

Run:

```powershell
node scripts/validate-routes.cjs
```

The validation fails when it detects:

- a missing route file;
- a missing or incorrect canonical;
- a missing or incorrect Open Graph URL;
- an accidental `noindex`;
- a broken internal link;
- an old migrated internal link;
- a missing redirect;
- an incorrect redirect destination or status;
- a redirect chain;
- a missing redirect destination;
- a redirect source in the sitemap;
- an indexable route missing from the sitemap;
- a duplicate or unknown sitemap URL;
- a missing shared route registry;
- a legacy inline search registry;
- an incorrect robots sitemap reference;
- a general crawling block.

## Deployment and Search Console checklist

These steps require the repaired files to be deployed:

1. Deploy the site to Netlify.
2. Confirm `_redirects` is included in the published directory.
3. Request each old URL and confirm a single `301` response.
4. Confirm each destination returns `200`.
5. Confirm each destination’s canonical equals its final URL.
6. Submit `https://bentocss.netlify.app/sitemap.xml` in Google Search Console.
7. Inspect at least:
   - `/tools/css-grid-examples.html`
   - `/guides/css-grid-examples.html`
   - `/tools/ui-layout-templates.html`
   - `/templates/ui-layout-templates.html`
8. Monitor Page Indexing, Sitemaps, crawl errors, and canonical selection.
9. Keep all redirects active for at least one year.

Search Console submission cannot occur before the repaired deployment is live.
