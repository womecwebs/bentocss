# BentoCSS Phase 3 Content and Indexation Inventory

**Reviewed:** 2026-07-30  
**Editorial owner:** BentoCSS Editorial Team

## Decision rules

- **Keep and improve:** The page fulfills a real user need and may remain indexable.
- **Merge:** Useful material should be consolidated into a stronger canonical page.
- **Redirect:** A previous URL permanently points to its replacement.
- **Noindex until finished:** The page remains crawlable and usable as a preview, but is excluded from search and the sitemap.
- **Remove after redirect:** The old file should not be restored because its URL is handled by a permanent redirect.

## Page decisions

| Route | Decision | Reason |
|---|---|---|
| `/` | Keep and improve | Established ranked homepage and working visual generator. Protected during Phase 3. |
| `/about.html` | Keep and improve | Supports creator and product trust. |
| `/contact.html` | Keep and improve | Provides issue reporting and direct contact. |
| `/design-guide.html` | Keep and improve | Established, topic-relevant guide. |
| `/privacy-policy.html` | Keep and improve | Required trust page; analytics and affiliate wording corrected. |
| `/tailwind-bento-generator.html` | Keep and improve | Existing specialized generator predating the platform pages. |
| `/tailwind-guide.html` | Keep and improve | Established supporting guide. |
| `/templates.html` | Keep and improve | Existing template index; canonical collision repaired. |
| `/tools/bento-grid-generator.html` | Keep and improve — focus page | Rebuilt with card count, tracks, gap, feature span, responsive preview, copy, and download. |
| `/tools/css-grid-generator.html` | Keep and improve — focus page | Rebuilt for explicit CSS track, row, and gap design. |
| `/tools/tailwind-bento-generator.html` | Keep and improve — focus page | Rebuilt for Tailwind grid, spacing, breakpoint, and markup generation. |
| `/tools/dashboard-layout-generator.html` | Keep and improve — focus page | Rebuilt around sidebar, KPI, overview, activity, and responsive dashboard states. |
| `/guides/bento-grid-examples.html` | Keep and improve | Contains expanded, original example material beyond the generated baseline. |
| `/guides/responsive-dashboard-layouts.html` | Keep and improve | Contains expanded, dashboard-specific examples and implementation material. |
| `/tools/hero-section-generator.html` | Keep and improve — focus page | Rebuilt with editable content, alignment, media, CTA, trust, templates, and three output formats. |
| `/tools/pricing-table-generator.html` | Keep and improve — focus page | Rebuilt with plan count, billing period, currency, featured tier, templates, and accessible output. |
| `/tools/feature-section-generator.html` | Keep and improve — focus page | Rebuilt with feature density, column, marker, template, and semantic output controls. |
| `/tools/navbar-generator.html` | Keep and improve — focus page | Rebuilt with brand, navigation density, CTA, sticky behavior, templates, and responsive output. |
| `/tools/footer-generator.html` | Keep and improve — focus page | Rebuilt with link groups, theme, newsletter, templates, and semantic navigation output. |
| `/tools/testimonial-generator.html` | Keep and improve — focus page | Rebuilt with real quote, identity, role, rating, verification, layout, template, responsive preview, and export controls. |
| `/tools/html-css-generators.html` | Keep and improve — interactive directory | Now provides searchable intent-based discovery, saved tools, comparison, previews, and direct generator paths. |
| `/guides/css-grid-examples.html` | Keep and improve — interactive reference | Provides ten problem-specific examples with search, comparison, copy, download, and saved candidates. |
| `/guides/best-bento-layouts.html` | Keep and improve — interactive reference | Provides ten goal-specific bento compositions and criteria for hierarchy, responsiveness, and content fit. |
| `/guides/css-grid-cheatsheet.html` | Keep and improve — interactive reference | Provides searchable, copyable declarations organized by implementation complexity. |
| `/guides/tailwind-grid-cheatsheet.html` | Keep and improve — interactive reference | Provides static, build-discoverable Tailwind combinations with responsive and advanced patterns. |
| `/guides/landing-page-layouts.html` | Keep and improve — interactive reference | Provides ten campaign-intent layouts with save, compare, copy, and download workflows. |
| `/guides/portfolio-layouts.html` | Keep and improve — interactive reference | Provides role-specific portfolio structures centered on proof, case studies, and contact paths. |
| `/templates/ui-layout-templates.html` | Keep and improve — template library | Provides ten responsive product shells with local favorites, comparison, preview, and downloads. |
| `/changelog.html` | Noindex support page | Useful for transparency but not intended as an SEO landing page. |
| `/code-license.html` | Noindex support page | Clarifies generated-code usage without targeting search demand. |

## Redirect decisions

The following previous routes remain removed after their one-to-one redirects:

- `/tools/bento-grid-examples.html`
- `/tools/best-bento-layouts.html`
- `/tools/css-grid-cheatsheet.html`
- `/tools/css-grid-examples.html`
- `/tools/landing-page-layouts.html`
- `/tools/portfolio-layouts.html`
- `/tools/responsive-dashboard-layouts.html`
- `/tools/tailwind-grid-cheatsheet.html`
- `/tools/ui-layout-templates.html`
- `/templates`

Do not restore duplicate files at these locations.

## Focus-page quality standard

The homepage and four non-homepage focus tools must contain:

- a real task-specific interaction;
- task-specific generated code;
- desktop, tablet, and mobile preview evidence;
- copy and download actions;
- a unique explanation;
- design decisions;
- accessibility guidance;
- responsive behavior;
- framework notes;
- common mistakes;
- tested edge cases;
- a relevant FAQ;
- related resources;
- editorial ownership and review date;
- issue-reporting and license links.

## Reindexing checklist for unfinished pages

A noindexed page may become indexable only when all answers are “yes”:

1. Does the page solve the real problem promised by its title?
2. Are its controls materially different from unrelated generators?
3. Is its generated code valid, maintainable, and responsive?
4. Does it contain original examples or evidence?
5. Has keyboard and mobile behavior been tested?
6. Is the written content unique to the tool?
7. Are title, description, canonical, Open Graph, and structured data correct?
8. Does it contain editorial ownership, a review date, reporting, disclosure, and license links?
9. Do automated route, link, schema, and indexation checks pass?
10. Has a human reviewer approved it for indexing?

After approval:

1. Change `indexable` to `true` in `assets/js/routes.js`.
2. Update its meaningful `lastModified` date.
3. Run `node scripts/apply-route-registry.cjs`.
4. Run `node scripts/build-route-artifacts.cjs`.
5. Run `node scripts/validate-routes.cjs`.
6. Deploy and request indexing in Search Console.

## Editorial workflow

### Draft

- Define the user, job, and primary query.
- Build the actual functionality before writing SEO copy.
- Collect original examples, screenshots, tests, and design decisions.

### Technical review

- Validate generated code.
- Test responsive behavior.
- Test keyboard use, focus, zoom, and contrast.
- Confirm no console errors.

### Editorial review

- Remove repeated or generic paragraphs.
- Verify every claim.
- Confirm title and description match the actual product.
- Add reviewed date and owner.

### SEO review

- Verify indexation decision.
- Verify self-canonical URL.
- Verify unique title and description.
- Verify internal links and structured data.
- Include the page in the sitemap only after approval.

### Post-publication review

- Review Search Console after discovery.
- Review completion, copy, download, and return rates.
- Improve the product when users fail to complete the intended task.

## Editorial questions required for every new indexable page

1. What real user problem does this page solve?
2. What functionality or information is unique?
3. What original evidence demonstrates its value?
4. Why would a user bookmark, share, cite, or return to it?
5. Does the title precisely describe what the page delivers?
