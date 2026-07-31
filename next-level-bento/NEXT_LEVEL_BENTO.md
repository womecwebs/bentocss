# BentoFlow — Next-Level Product and Engineering Specification

**Document purpose:** define the product, architecture, route system, implementation phases, quality gates, and reusable build prompts for evolving BentoCSS into **BentoFlow**, a professional visual layout SaaS and searchable frontend-tool platform.

**Positioning:** BentoFlow is the fastest way for designers and developers to design, validate, export, share, and reuse responsive bento interfaces as production code.

**North-star promise:** a first-time user can create a polished, accessible, responsive bento component and export usable code in under two minutes; a professional team can save it as a reusable design-system asset without rebuilding it elsewhere.

---

## 1. Strategic decision

### Recommended framework: Next.js App Router

Build BentoFlow as one **Next.js App Router + TypeScript** application using static generation for public search pages and client-side React only where the visual editor needs it.

Why this is the recommended fit:

- The product is no longer only a content site. It needs an advanced React editor, authentication, billing, cloud projects, share links, team libraries, APIs, and eventually real-time collaboration.
- `generateStaticParams` can create tool, template, example, comparison, and guide routes from typed data during the build. Next.js also has first-class metadata, sitemap, robots, Open Graph image, redirect, and permanent redirect conventions.
- Public pages can return complete HTML. The editor can be a client component inside an otherwise server-rendered page.
- One application avoids cross-app authentication, analytics fragmentation, duplicated navigation, conflicting canonicals, and two separate deployments.
- Route handlers and server actions are available when BentoFlow adds project persistence, feedback, billing webhooks, or export jobs.

Next.js does **not** automatically make a site rank or index faster. Ranking still depends on intent satisfaction, crawlable HTML, internal linking, unique usefulness, reputation, speed, and demand. The framework makes those requirements easier to implement consistently.

### Where Astro would fit

Astro is a strong alternative for a content-first static website. Its content collections can validate Markdown/MDX data and feed `getStaticPaths()` for generated HTML routes. It is attractive when almost every page is static and interactivity is limited to a few islands.

Do not operate an Astro marketing site and a Next.js application at separate public paths for the first BentoFlow release. That introduces more operational complexity than value. Reconsider Astro only if BentoFlow later creates a separately deployed documentation property with a distinct team and release cycle.

### Proposed stack

| Concern | Choice | Reason |
|---|---|---|
| Application | Next.js App Router, TypeScript, React | Unified static site and SaaS editor |
| Styling | CSS variables + CSS Modules; Tailwind 4 for app composition if desired | Portable design tokens without forcing generated output to use Tailwind |
| Editor state | Zustand + Immer | Small predictable state, undo/redo patches, selectors |
| Drag/resize | dnd-kit + custom CSS Grid resize handles | Keyboard-aware dragging and precise span changes |
| Validation | Zod schemas + axe-core + custom layout rules | Shared runtime, import, API, and build validation |
| Code generation | Framework-independent TypeScript package | One canonical layout schema and testable exporters |
| Content | Typed MDX/content registry validated by Zod | Hundreds of pages without handwritten HTML |
| Database | PostgreSQL through Supabase or Neon | Projects, versions, teams, templates, favorites |
| Authentication | Auth.js or Clerk | Passwordless and OAuth flows |
| Billing | Stripe | Subscriptions, customer portal, webhooks |
| Storage | S3-compatible object storage | Thumbnails and optional PNG/SVG exports |
| Analytics | PostHog or Plausible plus Search Console | Product funnels without invasive advertising |
| Errors | Sentry | Editor and export reliability |
| Tests | Vitest, Testing Library, Playwright, axe-core | Unit, component, browser, and accessibility gates |
| Deployment | Vercel initially | Preview deployments, Next integration, edge caching |

---

## 2. Existing BentoCSS value that must be carried forward

The migration must preserve proven value instead of restarting from an empty redesign.

- Drag-and-drop ordering and visible card selection.
- Add, duplicate, resize, reorder, and remove card actions.
- Keyboard ordering and keyboard span resizing.
- Desktop, tablet, mobile, and full-screen previews.
- Custom breakpoint values and per-breakpoint spans.
- Configurable columns, rows, gap, radius, auto-placement, flexible tracks, named areas, and nested grids.
- Long-content stress testing and overflow warnings.
- Background, surface, text, border, radius, shadow, typography, spacing, light, and dark controls.
- Ten editable presets per existing generator.
- HTML, modern CSS, Tailwind, and React/JSX output.
- Undo/redo, surprise mode, code copy, and file download.
- Local projects, autosave, recent projects, duplication, JSON import/export, URL sharing, read-only previews, and remixing.
- Contrast, invalid-span, dense-placement, source-order, mobile-density, empty-state, and accessible-name validation.
- Specialized CSS Grid, Tailwind Bento, dashboard, hero, pricing, feature, navbar, footer, and testimonial tools.
- Search, related tools, templates, guides, affiliate recommendations, semantic content, structured data, and route validation.

The existing `bentocss.netlify.app` URLs should remain available during migration. Create a one-to-one redirect map only after the equivalent BentoFlow route has passed product and SEO acceptance.

---

## 3. Brand and product model

### Brand

- **Name:** BentoFlow
- **Tagline:** Design responsive bento layouts. Export production code.
- **Short description:** A visual workspace for building accessible bento grids, responsive interface sections, and reusable frontend layouts.
- **Voice:** expert, direct, practical, encouraging, never exaggerated.
- **Visual character:** deep neutral canvas, vivid but restrained gradient accents, precise grid lines, excellent focus states, and a code-oriented interface.

### Primary audiences

1. Frontend developers who need correct responsive HTML, CSS, React, and Tailwind output.
2. UI/UX designers who need a visual layout system that translates into implementation.
3. freelancers and agencies who need reusable client-ready sections and exports.
4. SaaS founders and marketers who need landing-page and product-section layouts.
5. students who need to see the relationship between visual placement and CSS Grid concepts.

### Jobs to be done

- “Help me turn a layout idea into maintainable code.”
- “Help me explore several balanced bento arrangements quickly.”
- “Help me prove the design works at real breakpoints and with long content.”
- “Help me hand a designer’s layout to a developer without losing intent.”
- “Help my team save and reuse approved responsive patterns.”
- “Teach me why the generated Grid or Tailwind code behaves as it does.”

### Product moat

BentoFlow should not compete by owning the largest collection of thin generators. Its moat is the combination of:

- one versioned layout schema;
- visual editing tied directly to clean code;
- responsive constraints rather than decorative screenshots;
- automated accessibility and layout validation;
- reusable real-world presets and templates;
- team-ready design tokens and component libraries;
- framework exports that remain editable outside BentoFlow;
- original benchmark, tutorial, and example evidence that earns links.

---

## 4. Core information architecture

### Ten core product pages

These are the permanent, highest-quality pages users should understand from the main navigation.

| # | Route | Purpose | Primary intent |
|---|---|---|---|
| 1 | `/` | Brand homepage, proof, featured templates, editor entry | bento grid generator |
| 2 | `/editor` | Flagship visual bento workspace | visual bento grid builder |
| 3 | `/tools` | Searchable tool directory with filters | CSS layout generators |
| 4 | `/templates` | Curated reusable template library | bento grid templates |
| 5 | `/examples` | Real rendered examples with code | bento grid examples |
| 6 | `/learn` | Learning paths and guides | learn CSS grid and bento layouts |
| 7 | `/showcase` | Community layouts and remix flow | bento website inspiration |
| 8 | `/pricing` | Free, Pro, and Team plan comparison | BentoFlow pricing |
| 9 | `/changelog` | Product releases and credibility | BentoFlow updates |
| 10 | `/about` | Creator, methodology, editorial trust, contact | about BentoFlow |

Account routes such as `/login`, `/signup`, `/app/projects`, `/app/settings`, and `/app/team` are important application screens but should normally be `noindex` and are not counted as core search pages.

### Fifteen defining tools

Launch the brand around these tools. Each must solve a distinct job and use tool-specific controls rather than a renamed generic editor.

| # | Route | Defining capabilities |
|---|---|---|
| 1 | `/tools/bento-grid-generator` | Flagship responsive editor, nested grids, presets, validation, all exports |
| 2 | `/tools/css-grid-generator` | Explicit/implicit tracks, named areas, visual placement, alignment, minmax, auto-fit/fill |
| 3 | `/tools/tailwind-bento-generator` | Tailwind 3/4, responsive/arbitrary classes, JSX, deduplication, config notes |
| 4 | `/tools/dashboard-layout-generator` | Sidebar, header, KPIs, charts, tables, feeds, loading/empty/error states |
| 5 | `/tools/landing-page-layout-generator` | Section ordering, conversion hierarchy, responsive composition, complete page export |
| 6 | `/tools/hero-section-generator` | Badge, content, CTA, media, logos, social proof, backgrounds, responsive media order |
| 7 | `/tools/pricing-table-generator` | Billing periods, currencies, feature groups, tooltips, enterprise CTA, comparison table |
| 8 | `/tools/feature-section-generator` | Grid, alternating, bento, icon, metric, and documentation-oriented feature patterns |
| 9 | `/tools/navbar-generator` | Dropdowns, sticky/transparent states, mobile navigation, keyboard and focus management |
| 10 | `/tools/footer-generator` | Columns, newsletter, social/legal/trust content, compact/expanded variants |
| 11 | `/tools/testimonial-generator` | Cards, grids, carousel, source links, ratings, avatars, reduced motion |
| 12 | `/tools/portfolio-bento-generator` | Project cards, case studies, media ratios, filters, profile/sidebar variations |
| 13 | `/tools/saas-feature-bento-generator` | Product screenshots, metrics, feature emphasis, demo states, conversion CTA |
| 14 | `/tools/image-bento-collage-generator` | Image crop/focal point, aspect ratios, captions, responsive art direction, PNG/SVG export |
| 15 | `/tools/design-token-generator` | Color, spacing, radius, shadow, typography tokens; CSS, Tailwind, JSON, Style Dictionary export |

Later candidates should be selected from verified Search Console and keyword-demand evidence: card grid, masonry fallback, team section, logo cloud, stats section, comparison table, FAQ section, timeline, gallery, blog layout, product page, admin shell, email-safe layout, social image bento, and design-system documentation generators.

### Initial page count

The first production version should have **approximately 70 deliberate indexable pages**, not 200 near-duplicates.

| Page family | Initial count |
|---|---:|
| Core product pages | 10 |
| Tool detail pages | 15 |
| Curated template detail pages | 20 |
| Example/case-study pages | 10 |
| Learning guides | 10 |
| Comparisons | 3 |
| Trust/legal editorial pages | 2 |
| **Initial indexable total** | **70** |

Add 130+ more only through typed entries that pass a quality gate. A scalable renderer is permission to create useful pages efficiently; it is not permission to publish programmatic doorway pages.

### Long-term 200-page model

- 30 specialized tools.
- 80 template pages.
- 30 example and case-study pages.
- 30 learning guides and glossary entries.
- 15 framework-specific implementation guides.
- 10 comparisons and alternative pages.
- 5 research, benchmark, and annual trend reports.

Every page must have an owner, intent, unique demo/evidence, canonical, update date, related route set, and indexation state in the registry.

---

## 5. Route and content registry

All public pages must be produced from a typed registry rather than copied HTML.

```ts
export const RouteSchema = z.object({
  id: z.string(),
  slug: z.string(),
  kind: z.enum(["tool", "template", "example", "guide", "comparison", "page"]),
  title: z.string().min(20).max(65),
  description: z.string().min(110).max(165),
  h1: z.string(),
  intent: z.string(),
  primaryKeyword: z.string(),
  secondaryKeywords: z.array(z.string()),
  canonicalPath: z.string(),
  indexable: z.boolean(),
  publishedAt: z.string().date(),
  reviewedAt: z.string().date(),
  authorId: z.string(),
  reviewerId: z.string(),
  relatedIds: z.array(z.string()).min(4).max(8),
  schemaTypes: z.array(z.enum([
    "WebPage", "SoftwareApplication", "HowTo", "FAQPage", "BreadcrumbList"
  ])),
  evidence: z.array(z.object({ type: z.string(), asset: z.string() })).min(1),
  qualityStatus: z.enum(["draft", "review", "indexable", "retired"]),
  lastModified: z.string().date()
});
```

This registry drives:

- static route generation;
- metadata and canonical URLs;
- Open Graph images;
- navigation and footer groups;
- breadcrumbs;
- search autocomplete;
- related tools/templates/guides;
- sitemap partitions;
- structured data;
- RSS/changelog references;
- indexation rules;
- redirect validation;
- content freshness dashboards.

Build scripts must fail on duplicate titles, duplicate descriptions, duplicate canonical paths, missing related routes, missing evidence, orphan pages, invalid schema, or an indexable draft.

---

## 6. Flagship editor specification

### Canvas and interaction

- Infinite-feeling bounded canvas with zoom, pan, fit, rulers, grid overlays, and snap controls.
- Drag cards from a component tray or add them with keyboard-accessible actions.
- Resize using visible handles, direct span fields, or keyboard shortcuts.
- Multi-select, group, duplicate, lock, hide, reorder, and convert selection into a nested grid.
- Layers/source-order panel that makes DOM order explicit.
- Grid auto-placement and manual placement modes.
- Named areas and line-name editing with visual overlays.
- Collision detection with clear resolution choices.
- Smart layout suggestions, not silent destructive rearrangement.
- Command palette for actions and tool navigation.
- Contextual inspector that displays only controls relevant to the current selection.

### Responsive system

- Default desktop, tablet, and mobile breakpoints plus custom breakpoints.
- Base-first cascade model visible to the user.
- Per-breakpoint columns, tracks, spans, order, visibility, gaps, and padding.
- Content-aware container preview and optional container-query export.
- Side-by-side multi-device comparison.
- Overflow, truncation, touch-target, source-order, and mobile-density warnings.
- Stress modes for long text, missing images, localization expansion, 200% zoom, and reduced motion.

### Component-aware bento cards

Cards should not remain empty rectangles. Support typed content blocks:

- text and rich text;
- image with focal point and responsive source;
- product screenshot;
- icon and feature;
- KPI/metric;
- chart placeholder/data visualization;
- testimonial;
- CTA;
- video/embed placeholder;
- code snippet;
- logo cloud;
- nested grid;
- custom HTML/React slot for advanced users.

Each block defines accessible-name requirements, content constraints, preview fallbacks, and export behavior.

### Design system

- Global tokens for colors, semantic surfaces, spacing, radii, shadows, type scale, line height, and motion.
- Component variants and card recipes.
- Light, dark, and high-contrast modes.
- Import tokens from JSON or CSS custom properties.
- Export CSS variables, Tailwind theme, JSON, and Style Dictionary-compatible tokens.
- Detect contrast across token combinations, not only the currently selected card.

### Export engine

Required launch exporters:

- semantic HTML + modern CSS;
- Tailwind 4;
- React/JSX;
- Next.js component;
- Vue SFC;
- Astro component;
- layout JSON schema;
- design tokens.

Later exports:

- Svelte;
- CSS Modules;
- styled-components;
- shadcn-compatible composition;
- CodePen and StackBlitz projects;
- PNG, SVG, and PDF presentation assets;
- GitHub pull request or downloadable project archive.

All exporters consume the same normalized layout schema. Exporters must never scrape preview HTML.

### Validation engine

- WCAG contrast and accessible-name checks.
- Heading-order and landmark guidance.
- DOM source order versus visual order warnings.
- Keyboard and focus-order checks for interactive blocks.
- Invalid or overlapping spans.
- overflow and minimum-content issues.
- fixed-height content risks.
- excessive breakpoint overrides.
- excessive motion and missing reduced-motion handling.
- image alt, dimensions, lazy loading, and aspect-ratio guidance.
- generated HTML validation and framework linting.

### Projects and collaboration

- Anonymous local mode with seamless account upgrade.
- Cloud autosave and named versions.
- Folder, tag, favorite, duplicate, archive, and restore.
- Share as read-only, comment, or remix.
- Version history and visual diff.
- Team workspace, roles, approved templates, and shared tokens.
- Presence and multiplayer editing only after single-user reliability is proven.

### AI features with real value

AI should be constrained by the layout schema and never replace deterministic editing.

- Natural-language layout creation: “Create a six-card SaaS feature bento with one wide demo card.”
- Screenshot-to-structure suggestion with explicit user confirmation.
- Responsive repair suggestions for overflow or bad stacking.
- Accessible copy and alt-text suggestions.
- Explain generated CSS in the context of the selected card.
- Generate three layout alternatives while preserving content and tokens.
- Convert layout output between CSS, Tailwind, React, Vue, and Astro through deterministic exporters, using AI only for explanation or optional refactoring.

---

## 7. Template, example, and learning systems

### Template detail page requirements

Every indexable template has:

- a live interactive preview;
- desktop/tablet/mobile screenshots;
- “Use template” and “Remix” actions;
- layout anatomy explanation;
- responsive decisions;
- accessibility notes;
- HTML/CSS or framework snippet;
- intended use and when not to use it;
- performance notes;
- creator/license attribution;
- at least four related routes;
- unique FAQ only when real questions exist.

### Template taxonomy

- use case: SaaS, portfolio, dashboard, agency, personal, ecommerce, media;
- component: hero, feature, metric, comparison, gallery, testimonial, team;
- framework: CSS, Tailwind, React, Next.js, Vue, Astro;
- complexity: beginner, intermediate, advanced;
- visual style: minimal, editorial, glass, colorful, monochrome;
- behavior: static, interactive, data-heavy, media-heavy.

### Learning moat

Create learning paths, not generic 1,500-word filler:

- CSS Grid foundations.
- Bento layout composition.
- Responsive source order.
- Accessible visual reordering.
- Intrinsic sizing and `minmax()`.
- `auto-fit` versus `auto-fill`.
- Nested grid and subgrid.
- Container queries for reusable cards.
- Translating Figma grids to code.
- Production Tailwind grid patterns.
- Dashboard density and mobile prioritization.
- Performance-safe image bento layouts.

Each guide should embed a small editable demo and link directly into the editor with the lesson state loaded.

---

## 8. SEO, AEO, and indexation architecture

### Rendering and discovery

- Return meaningful server-rendered or statically generated HTML for all indexable routes.
- Do not require JavaScript to reveal the title, explanation, links, FAQ, or primary preview description.
- Use stable clean URLs without `.html` on the new brand.
- Generate one canonical host and protocol.
- Maintain one-hop permanent redirects from every migrated BentoCSS route.
- Partition sitemaps by tools, templates, examples, and learning content when scale requires it.
- Use accurate `lastModified`; do not rewrite every date on every deployment.

### Metadata

- Unique title, description, canonical, Open Graph, and Twitter metadata.
- Generated Open Graph image based on the real layout thumbnail.
- `WebPage` and `BreadcrumbList` on public pages.
- `SoftwareApplication` on working tools.
- `HowTo` only when the visible page genuinely presents a supported process.
- FAQ markup only for visible, useful FAQs; never mass-generate questions merely to add schema.
- Organization/site search structured data only where valid under current search-engine guidance.

### Page quality gate

An indexable route must answer:

1. What exact job does this page solve?
2. What working interaction or original evidence exists here?
3. Why is it better than opening the general editor with no context?
4. What query intent is unique to this route?
5. Would a developer bookmark, share, or cite it?
6. Does its title fully describe what works today?
7. Is it materially different from sibling routes?

If any answer is weak, keep the route in draft or `noindex,follow` and exclude it from the sitemap.

### Programmatic page safeguards

- Never publish every keyword/framework/use-case permutation.
- Require unique demo state and reviewed prose.
- Cap repeated template copy to shared UI labels and factual technical definitions.
- Compare page embeddings or text similarity at build time and block near duplicates.
- Record impressions, clicks, engagement, exports, and backlinks by page family.
- Merge or retire pages that do not earn impressions or user value after a reasonable evaluation period.
- Do not promise a number-one ranking. Optimize for the most useful answer and strongest product in the query class.

### Internal linking

Use the route registry to create intent-aware paths:

`Guide → editable example → template → specialized tool → export documentation`

Each indexable page links to the appropriate core hub, four to eight related pages, one next learning step, and one product action. Avoid sitewide links to hundreds of low-priority URLs.

---

## 9. Performance and accessibility budgets

### Public page budgets

- LCP target: under 2.5 seconds at the 75th percentile.
- INP target: under 200 ms at the 75th percentile.
- CLS target: under 0.1.
- Initial JavaScript on non-editor pages: target under 100 KB compressed.
- Reserve image dimensions and use responsive optimized images.
- Self-host or carefully subset fonts.
- Load the editor bundle only on editor-bearing routes.

### Editor budgets

- Input-to-preview update target: under 50 ms for ordinary projects.
- Drag preview target: 60 fps on a representative mid-range laptop.
- Project load target: under one second for 50 cards.
- Autosave must run off the critical interaction path.
- Use selectors and normalized state to avoid rerendering the entire canvas.
- Virtualize only panels that demonstrate a measured need.

### Accessibility release gate

- Full keyboard creation, selection, movement, resize, duplication, and export.
- Visible focus and logical focus return after dialogs.
- Screen-reader announcements for canvas mutations.
- Touch targets at least 44 by 44 CSS pixels where practical.
- Forced-colors and high-contrast support.
- Reduced-motion support.
- 200% browser zoom and reflow testing.
- Automated axe tests plus manual NVDA/VoiceOver checks for critical flows.

---

## 10. Monetization without display ads

### Free plan

- Full core editor.
- Unlimited local projects.
- A limited number of cloud projects.
- HTML/CSS, Tailwind, and React export.
- Public share and remix links.
- Core templates and validation.

The free product must remain useful enough to rank, earn links, and build trust.

### Pro plan — suggested validation range: $12–$19/month

- Unlimited private cloud projects.
- Version history.
- All framework exports.
- PNG, SVG, PDF, and project archive exports.
- Premium templates.
- custom presets and token libraries.
- AI layout alternatives and responsive repair allowance.
- remove BentoFlow attribution from public shares.

### Team plan — suggested validation range: $39–$79/month plus seats

- Shared workspace and roles.
- Approved template library.
- Shared design tokens.
- Comments, version review, and team activity.
- private share links and access controls.
- organization billing.

### Additional revenue

- One-time lifetime or desktop-style license only as an early validation offer, not a permanent promise.
- Curated premium template packs with creator revenue share.
- Agency export pack and client handoff reports.
- Education licenses and classroom material.
- API access for schema conversion and rendering.
- Paid implementation workshops or design-system audits.
- Clearly disclosed, context-relevant affiliate recommendations after export; never disguise them as generated output.

### First $1,000 monthly target examples

- 67 Pro users at $15/month ≈ $1,005 MRR.
- 40 Pro users at $15 plus 8 Team accounts at $49 ≈ $992 MRR.
- 25 Pro users at $15 plus 5 Team accounts at $59 plus 7 monthly template-pack sales at $49 ≈ $1,013 monthly revenue.

Pricing must be validated with actual activation, repeat-use, and willingness-to-pay interviews before finalizing packages.

### Upgrade moments

Ask for payment after value is experienced:

- saving a fourth cloud project;
- requesting version history;
- exporting a premium format;
- creating a private share;
- applying a team token set;
- using a premium template;
- exceeding an AI allowance.

Do not interrupt first creation, first preview, first code copy, or first basic export.

---

## 11. Analytics and product metrics

### North-star metric

**Weekly successful layouts:** unique users who create or remix a layout, resolve blocking validation problems, and copy/export/share usable output.

### Funnel

1. Search or referral landing.
2. Editor started.
3. First meaningful edit.
4. Breakpoint inspected.
5. Validation checked.
6. Code copied/exported/shared.
7. Project saved.
8. User returns within 30 days.
9. Upgrade intent encountered.
10. Paid conversion and retention.

### Required events

- `tool_viewed`
- `editor_started`
- `preset_loaded`
- `card_added`
- `card_resized`
- `breakpoint_viewed`
- `validation_opened`
- `validation_resolved`
- `output_format_selected`
- `code_copied`
- `export_completed`
- `project_saved`
- `share_created`
- `remix_started`
- `signup_completed`
- `upgrade_prompt_viewed`
- `checkout_started`
- `subscription_started`

Do not send card content, project JSON, email addresses, or other private design data through analytics events.

---

## 12. Repository architecture

```text
bentoflow/
├─ apps/
│  └─ web/
│     ├─ src/app/
│     │  ├─ (marketing)/
│     │  ├─ (content)/tools/[slug]/
│     │  ├─ (content)/templates/[slug]/
│     │  ├─ (content)/examples/[slug]/
│     │  ├─ (content)/learn/[slug]/
│     │  ├─ editor/
│     │  ├─ share/[shareId]/
│     │  ├─ app/
│     │  ├─ api/
│     │  ├─ sitemap.ts
│     │  ├─ robots.ts
│     │  └─ opengraph-image.tsx
│     ├─ src/components/
│     ├─ src/content/
│     └─ public/
├─ packages/
│  ├─ layout-schema/
│  ├─ editor-core/
│  ├─ exporters/
│  ├─ validator/
│  ├─ design-system/
│  ├─ content-registry/
│  ├─ analytics/
│  └─ test-fixtures/
├─ tooling/
│  ├─ seo-audit/
│  ├─ content-quality/
│  └─ migration/
├─ tests/
│  ├─ e2e/
│  ├─ accessibility/
│  └─ visual/
└─ docs/
```

Keep the preview renderer and all exporters downstream of `layout-schema`. Tool pages should provide different initial schemas and control modules, not fork the entire editor.

---

## 13. Twelve implementation phases with reusable prompts

The prompts below are implementation briefs for future development sessions. Before each session, add the relevant repository context and require the implementer to preserve unrelated work.

### Phase 0 — Demand and migration baseline

**Goal:** prove the demand, establish current performance, and prevent a migration from destroying existing rankings.

Steps:

1. Export Search Console pages, queries, devices, countries, and date comparisons.
2. Record current URLs, canonicals, backlinks, rankings, clicks, impressions, CTR, and indexed status.
3. Interview at least 10 active users or target users.
4. Identify the three workflows with the strongest repeated demand.
5. Freeze the old route map and define new destinations.
6. Define success and rollback thresholds.

**Implementation prompt:**

> Audit the current BentoCSS repository and Search Console exports without modifying production files. Produce a migration inventory containing every current URL, status, canonical, sitemap presence, internal-link count, target BentoFlow URL, redirect status, and traffic risk. Identify the top three proven user workflows and define baseline product and SEO metrics. Do not recommend deleting or redirecting a ranking URL without evidence and an equivalent tested destination.

**Gate:** no framework migration until the route and traffic baseline is approved.

### Phase 1 — Foundation and design system

**Goal:** establish the Next.js monorepo, quality tooling, shared tokens, and accessible application shell.

Steps:

1. Create the workspace and strict TypeScript configuration.
2. Configure linting, formatting, unit tests, Playwright, axe, and CI.
3. Implement tokens, typography, buttons, cards, forms, dialogs, tooltips, tabs, toasts, and focus styles.
4. Build server-rendered header/footer/search shell.
5. Add error boundaries, logging, analytics consent, and environment validation.

**Implementation prompt:**

> Create the BentoFlow Next.js App Router foundation in TypeScript. Implement a reusable accessible design system using CSS variables and component-level styles, a server-rendered marketing shell, dark/light/high-contrast themes, keyboard navigation, analytics and error-reporting adapters, Vitest, Playwright, axe checks, and CI. Keep client components narrowly scoped. Enforce performance budgets and include component tests for every interactive primitive.

**Gate:** zero critical axe findings, zero TypeScript errors, and no duplicated shell markup.

### Phase 2 — Layout schema and editor engine

**Goal:** create the stable domain model before building more UI.

Steps:

1. Define versioned project, breakpoint, grid, item, content-block, token, and export schemas.
2. Implement migration functions between schema versions.
3. Implement commands, undo/redo, selection, history, and normalized state.
4. Create deterministic layout calculations and fixtures.
5. Property-test span, order, and serialization invariants.

**Implementation prompt:**

> Build a framework-independent `layout-schema` package and editor command engine. Model responsive breakpoints, grids, nested grids, cards, typed content blocks, design tokens, named areas, source order, and metadata. Use Zod for runtime validation. Add version migrations, deterministic serialization, undo/redo patches, import failure messages, and extensive unit/property tests. No visual editor components should contain business logic that belongs in this package.

**Gate:** projects round-trip through JSON without data loss and all schema fixtures pass.

### Phase 3 — Flagship visual Bento editor MVP

**Goal:** beat the current editor while maintaining a two-minute first-success flow.

Steps:

1. Implement canvas, inspector, layer list, selection, drag, resize, add, duplicate, remove, and nested grid.
2. Add keyboard equivalents and screen-reader announcements.
3. Add responsive previews and breakpoint overrides.
4. Add token controls and real content blocks.
5. Port the strongest existing presets.
6. Add local autosave and JSON import/export.

**Implementation prompt:**

> Implement BentoFlow’s flagship editor on top of the shared schema and command engine. Include visual selection, drag-and-drop, resize handles, direct span fields, keyboard movement and resizing, add/duplicate/remove, layers and DOM order, nested grids, named areas, desktop/tablet/mobile/custom breakpoints, token controls, long-content stress mode, ten production presets, local autosave, and JSON import/export. Every mutation must use commands, support undo/redo, announce important changes, and avoid rerendering unrelated cards.

**Gate:** five usability testers can create and export a responsive layout in under two minutes.

### Phase 4 — Export and validation platform

**Goal:** make BentoFlow output trustworthy enough for production.

Steps:

1. Implement semantic HTML/CSS, Tailwind 4, React, Next.js, Vue, Astro, JSON, and token exporters.
2. Format and syntax-test output.
3. Add accessibility, layout, source-order, image, motion, and responsive validation.
4. Connect warnings to the selected card and one-click safe fixes.
5. Add CodePen/StackBlitz and downloadable project options.

**Implementation prompt:**

> Create deterministic BentoFlow exporters that consume only the normalized layout schema. Generate semantic accessible HTML/CSS, Tailwind 4, React/JSX, Next.js, Vue SFC, Astro, JSON, and design tokens. Add formatting, snapshot tests, compilation tests, and representative browser fixtures. Build a validation engine for contrast, names, heading/landmark use, source order, overflow, invalid spans, fixed-height risk, images, touch targets, motion, and breakpoints. Never generate code by scraping the preview DOM.

**Gate:** every example export compiles, renders at three breakpoints, and passes the agreed automated accessibility checks.

### Phase 5 — Public route and content platform

**Goal:** generate valuable crawlable pages from one registry.

Steps:

1. Build typed route/content schemas.
2. Generate tool, template, example, guide, and comparison routes.
3. Generate metadata, canonicals, schema, breadcrumbs, related links, OG images, robots, and sitemaps.
4. Implement search autocomplete and filters.
5. Add duplicate-content, orphan-page, and indexation checks.

**Implementation prompt:**

> Implement BentoFlow’s typed public content platform. Use one validated route registry to statically generate tools, templates, examples, guides, and comparisons. Generate unique metadata, canonical URLs, breadcrumbs, structured data, Open Graph images, related links, search data, sitemap partitions, and robots rules. Build failures must occur for duplicate metadata, missing evidence, orphan routes, invalid relations, indexable drafts, canonical mismatches, or excessive content similarity.

**Gate:** all sitemap URLs return 200 and self-canonicalize; no generated route is thin or duplicated.

### Phase 6 — Fifteen specialized tools

**Goal:** create distinct query-satisfying tools on the shared platform.

Steps:

1. Build tool manifests and control modules.
2. Implement the fifteen tools listed in this specification.
3. Give each at least ten tested presets and unique documentation.
4. Add tool-specific exporter rules and validation.
5. Instrument start, completion, copy, save, and cross-tool usage.

**Implementation prompt:**

> Build the fifteen BentoFlow tools defined in `NEXT_LEVEL_BENTO.md` using the shared editor, schema, project, export, validation, and analytics packages. Each tool must have a unique manifest, controls, default schema, at least ten useful presets, tool-specific validation, working production exports, an interactive public page, and original documentation. Reject any tool whose controls and output merely rename another generator.

**Gate:** every tool passes product, content, accessibility, export, and indexation acceptance.

### Phase 7 — Accounts, cloud projects, and sharing

**Goal:** convert repeat local use into durable user value.

Steps:

1. Add passwordless/OAuth authentication.
2. Migrate anonymous local projects into an account with consent.
3. Add cloud autosave, folders, tags, favorites, archive, and versions.
4. Add read-only, remix, and private share permissions.
5. Add abuse protection, rate limits, deletion, export, and privacy controls.

**Implementation prompt:**

> Add BentoFlow authentication and cloud projects without breaking anonymous use. Implement secure ownership, autosave conflict handling, folders, tags, favorites, duplicate, archive/restore, version history, project export/deletion, and share permissions for public read-only, unlisted, private, and remixable states. Provide a consent-based local-to-cloud migration and test authorization at the database and API layers.

**Gate:** no cross-user data access; refresh, offline interruption, and concurrent-tab scenarios do not lose work.

### Phase 8 — Template marketplace and community showcase

**Goal:** create a high-quality library and organic distribution loop.

Steps:

1. Add creator profiles and submissions.
2. Moderate every public template.
3. Generate verified thumbnails and live previews.
4. Add favorites, collections, remix attribution, and reporting.
5. Add paid packs only after free-library engagement is proven.

**Implementation prompt:**

> Implement a curated BentoFlow template and showcase system. Include creator attribution, schema-validated submissions, moderation status, license fields, live previews, responsive thumbnails, favorites, collections, remix lineage, abuse reports, and quality scoring. Public routes must be server-rendered and only indexable after moderation and evidence checks. Do not create automated public pages for unreviewed submissions.

**Gate:** no unreviewed user content is indexed and every public template is usable in the editor.

### Phase 9 — Paid Pro and Team plans

**Goal:** monetize repeat professional value without weakening the free product.

Steps:

1. Validate packaging with interviews and behavior data.
2. Add Stripe Checkout, portal, webhook idempotency, and entitlements.
3. Add Pro exports, private projects, premium templates, and version history.
4. Add team workspaces, roles, tokens, and approved templates.
5. Measure conversion, retention, cancellation, and entitlement errors.

**Implementation prompt:**

> Implement BentoFlow billing only for validated Pro and Team capabilities. Use Stripe Checkout, customer portal, signed idempotent webhooks, an auditable entitlement service, grace periods, and downgrade-safe data retention. Keep the core editor and basic code export free. Add end-to-end tests for purchase, renewal, cancellation, payment failure, refund, plan change, and webhook replay.

**Gate:** free users retain core value; billing failures cannot delete or expose project data.

### Phase 10 — Constrained AI assistant

**Goal:** accelerate expert workflows without making output unpredictable.

Steps:

1. Add schema-constrained natural-language layout creation.
2. Add alternatives and responsive repair suggestions.
3. Add contextual CSS explanation and copy/alt suggestions.
4. Show diffs and require approval before mutations.
5. Add prompt safety, cost limits, evaluations, and privacy controls.

**Implementation prompt:**

> Build an optional BentoFlow AI assistant that can only propose validated layout-schema commands. Support prompt-to-layout, three alternatives, responsive repair, accessibility copy suggestions, and contextual CSS explanations. Display a human-readable diff before applying changes, never silently overwrite a project, redact private content from logs, enforce per-plan cost limits, and maintain an evaluation suite for schema validity, accessibility, responsiveness, latency, and user acceptance.

**Gate:** AI proposals cannot bypass schema validation or mutate projects without explicit approval.

### Phase 11 — Collaboration, APIs, and ecosystem

**Goal:** turn BentoFlow from a tool into a professional workflow platform.

Steps:

1. Add comments and approval before real-time multiplayer.
2. Add team template governance and versioned token libraries.
3. Publish a documented layout JSON schema and read API.
4. Add Figma import research, GitHub export, CLI, and package integrations.
5. Add audit logs, organization controls, and enterprise security as demand requires.

**Implementation prompt:**

> Extend BentoFlow with comments, approvals, team template governance, shared token versioning, audit logs, a documented versioned layout API, CLI import/export, and GitHub integration. Design collaboration around explicit project revisions and conflict resolution before adding multiplayer cursors. Gate every integration with scoped permissions, revocation, rate limits, and end-to-end authorization tests.

**Gate:** ecosystem features are versioned, permissioned, observable, and reversible.

### Phase 12 — Scale, research, and defensibility

**Goal:** grow to 200+ valuable pages and a defensible professional product.

Steps:

1. Use Search Console and product analytics to choose the next tools and content.
2. Publish original layout benchmarks and annual bento reports.
3. Create public examples from real tested implementations.
4. Add internationalization only with reviewed native-quality content.
5. Continuously merge, improve, noindex, or retire weak pages.

**Implementation prompt:**

> Use BentoFlow Search Console, product analytics, support requests, and user interviews to propose the next quarterly tool and content portfolio. Score each candidate by verified demand, product differentiation, development cost, retention potential, linkability, and monetization fit. Generate no new public route until it has a unique interactive asset, reviewed content, owner, related-route plan, and measurable acceptance criteria. Include a consolidation plan for weak existing pages.

**Gate:** scale page count only when usefulness and authority grow with it.

---

## 14. Migration strategy from BentoCSS

1. Keep the current site live while BentoFlow is developed in a separate repository or isolated application directory.
2. Port the route registry and layout schema first.
3. Reproduce the current ranking homepage’s intent, metadata, content, and core generator behavior before changing its destination.
4. Compare old and new pages with visual, content, structured-data, performance, and link crawls.
5. Release BentoFlow to a small beta URL and collect product evidence.
6. Migrate route families gradually, beginning with low-risk non-ranking pages.
7. Use one-hop permanent redirects only when the new route is complete.
8. Keep redirects indefinitely when practical and at minimum through a full search reprocessing period.
9. Submit new sitemaps, inspect representative URLs, and monitor traffic by route cohort.
10. Roll back a route cohort if indexing, errors, or engagement materially deteriorate.

Do not redesign and migrate the homepage, domain, URLs, editor, content, and brand simultaneously. Separate the variables so losses can be diagnosed.

---

## 15. Launch acceptance criteria

### Product

- A new user creates and exports a responsive layout in under two minutes.
- A returning user can reopen the last project without data loss.
- All launch exporters compile and match the preview at defined breakpoints.
- Every flagship action has a keyboard equivalent.
- Validation identifies seeded failures and explains resolution.

### SEO and content

- Every indexable route returns meaningful HTML and a 200 status.
- Every sitemap URL self-canonicalizes.
- No duplicate titles, descriptions, canonicals, or near-duplicate bodies.
- No orphan pages or redirect chains.
- Every tool page contains a working tool and original evidence.
- Existing ranking URLs have tested one-to-one migration behavior.

### Reliability and security

- Authorization tests prevent access across accounts and teams.
- Import files are schema-validated and size-limited.
- Share permissions are tested for every role.
- Billing webhooks are signed and idempotent.
- Error reporting contains no private project content.
- Recovery exists for failed saves and incompatible schema versions.

### Performance and accessibility

- Public routes meet the stated Core Web Vitals targets in field data after sufficient traffic.
- No critical or serious axe violations in primary flows.
- Manual keyboard and screen-reader tests pass.
- Editor interaction stays within the defined latency budget on the reference device.

---

## 16. Competitive research conclusions

The market shows several useful patterns BentoFlow should learn from without copying:

- Layoutit exposes explicit and implicit grids, placement, named areas, and direct HTML/CSS output. BentoFlow should match that technical depth while adding responsive content-aware testing and modern framework exports.
- Bento Grid Generator demonstrates demand for palette management, image/vector exports, project files, zoom/pan, keyboard shortcuts, and a premium feature layer.
- Tailwind’s official bento examples validate demand for polished, copyable marketing patterns with immediate preview/code switching.
- BentoGrid.js demonstrates the appeal of lightweight automatic placement and a small reusable runtime.
- Community tools repeatedly emphasize random generation and high-quality image export, indicating two distinct intents: production frontend code and shareable visual compositions. BentoFlow can serve both through separate tool modes without confusing their outputs.
- Professional visual builders increasingly provide custom breakpoints, reusable design systems, code inspection, and design-to-development workflows. BentoFlow should specialize deeply in grid layout and code quality rather than trying to become a complete website CMS.

### Sources reviewed

- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js `generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- [Next.js project and route conventions](https://nextjs.org/docs/app/getting-started/project-structure)
- [Astro content collections](https://v6.docs.astro.build/en/guides/content-collections/)
- [Layoutit CSS Grid Generator](https://grid.layoutit.com/)
- [Layoutit frontend tools](https://layoutit.com/)
- [Bento Grid Generator](https://bento.samolevsky.com/)
- [Tailwind CSS bento grid examples](https://tailwindcss.com/plus/ui-blocks/marketing/sections/bento-grids)
- [BentoGrid.js](https://bentogrid.mariohamann.com/)

---

## 17. Final product rule

**BentoFlow must grow by increasing successful user outcomes, not by increasing URL count.**

The platform is ready to add another tool or page only when it introduces a distinct job, working functionality, original evidence, production-quality output, accessibility, internal links, analytics, and an accountable review process. If BentoFlow maintains that standard, the same architecture can support hundreds of pages while the brand remains trusted, useful, and commercially sustainable.
