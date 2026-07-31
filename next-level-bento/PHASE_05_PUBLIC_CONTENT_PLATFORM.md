# Phase 05 — Public Route and Content Platform

## Mission

Create one typed system that can publish dozens and eventually hundreds of useful, crawlable pages without duplicated React, SEO, navigation, or structured-data code.

## Public page families

- 10 core pages.
- Tool pages.
- Template index and detail pages.
- Example/case-study pages.
- Learning hubs and guides.
- Comparison pages.
- Changelog and trust pages.

Account, project, preview-token, and admin routes are separate and normally `noindex`.

## Step 1 — Typed registries

Implement Zod-validated registries for:

- routes;
- authors/reviewers;
- tools and capabilities;
- templates and taxonomy;
- examples and performance evidence;
- guides and learning paths;
- comparisons;
- redirects;
- structured-data eligibility.

Each indexable entry requires a unique intent, title, description, H1, canonical path, evidence asset, reviewed date, owner, related IDs, and quality status.

## Step 2 — Route generation

Use App Router dynamic routes and `generateStaticParams` for approved public entries. Set unknown unregistered slugs to 404. Drafts can be previewed through protected preview mode but must not leak into sitemaps or production navigation.

Shared page composition:

1. Breadcrumb.
2. intent-matched hero and direct answer.
3. working interactive tool/example/template preview.
4. original explanation and evidence.
5. responsive and accessibility notes.
6. examples, edge cases, and output.
7. related routes selected by intent.
8. appropriate CTA.
9. editorial metadata and changelog.

Do not force every family into an identical article body.

## Step 3 — Ten core pages

### `/`

Preserve the proven “bento grid generator” intent. Show an immediate lightweight creation experience or strong editor entry, proof through real outputs, featured templates, key benefits, and paths for developers/designers. Do not bury the product under marketing.

### `/editor`

Full editor landing/workspace. Server-render a concise product explanation and supported output summary around the client editor shell.

### `/tools`

Searchable/filterable directory grouped by layout, component, framework, and output. Include comparison guidance and recently used tools locally.

### `/templates`

Rich library with live thumbnails, use case, framework, complexity, style, responsive behavior, free/premium, and sort filters. Details are specified in Phase 08.

### `/examples`

Real rendered implementations and annotated code, not decorative mockups.

### `/learn`

Learning paths for beginner, working frontend developer, designer-to-code, and advanced Grid.

### `/showcase`

Moderated creator work, remix lineage, and project stories. No automatic indexation of submissions.

### `/pricing`

Clear Free/Pro/Team comparison, FAQ, billing terms, and feature ownership. Do not publish paid promises before Phase 09.

### `/changelog`

Date, version, additions, fixes, migrations, and links to affected documentation.

### `/about`

Brand mission, creator/company identity, editorial standards, testing methodology, contact, affiliate disclosure, and code/template licensing.

## Step 4 — Metadata and discovery

- Central `generateMetadata` helpers.
- self-canonicals and canonical host enforcement.
- real Open Graph images generated from template/tool preview state.
- robots and sitemap partitions generated from registry state.
- accurate `lastModified` values.
- breadcrumbs and related links.
- WebPage/SoftwareApplication/BreadcrumbList and only eligible additional schemas.
- JSON-LD serialization protected from injection.

## Step 5 — Search

- Build-time public search index containing title, aliases, category, outputs, difficulty, and route.
- keyboard-accessible autocomplete.
- tool/template/guide filters.
- query analytics without recording sensitive editor content.
- zero-results suggestions and popular task shortcuts.
- server-rendered directory results for crawlability; client filters progressively enhance.

## Step 6 — Content quality pipeline

Block builds for:

- duplicate title, description, H1, or canonical;
- orphan routes;
- broken related IDs;
- indexable draft or missing evidence;
- near-duplicate body similarity over the approved threshold;
- missing reviewed date or owner;
- FAQ/schema mismatch;
- sitemap URL that is not indexable and canonical.

Provide an editorial preview containing headings, metadata length, schema, related links, screenshots, content similarity, and indexation state.

## Step 7 — Initial 70-page allocation

- 10 core pages.
- 15 tools.
- 20 template details.
- 10 examples/case studies.
- 10 guides.
- 3 comparisons.
- 2 additional trust/editorial pages.

Only publish entries that meet their quality gate; the launch total may be smaller if work is incomplete.

## Tests

- Crawl production build and assert status/canonical/indexation.
- Verify no broken internal links or assets.
- validate JSON-LD.
- snapshot metadata and OG image generation.
- test sitemap membership against registry.
- keyboard-test search and filters.
- render pages with JavaScript disabled.
- performance-test pages with and without an editor embed.

## AI-builder execution prompt

> Implement BentoFlow’s public Next.js content platform from typed Zod registries. Generate the ten core pages plus tool, template, example, guide, and comparison routes through shared family layouts and `generateStaticParams`. Add unique metadata, canonicals, safe JSON-LD, breadcrumbs, intent-aware related links, generated Open Graph images, accurate robots/sitemap partitions, an accessible server-backed search directory, editorial preview, and build gates for duplicates, similarity, orphans, broken relations, missing evidence, and indexable drafts. Public content must render as useful HTML without client JavaScript.

## Completion gate

- Every sitemap URL returns 200 and self-canonicalizes.
- Zero broken internal links, orphan routes, or duplicate metadata.
- Search opens valid routes and works with keyboard controls.
- Every indexable route includes a working asset or original evidence.

