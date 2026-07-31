# Phase 08 — Real Templates, Marketplace, and Community Showcase

## Mission

Create the strongest bento template library in the niche: real responsive dashboards, websites, portfolios, product sections, galleries, and design-system patterns that open directly in the editor and export as production code.

## Product surfaces

### `/templates`

- Server-rendered featured and category collections.
- Search and filters for use case, component, framework, style, complexity, color mode, free/premium, and content type.
- Sort by curated, newest, most remixed, and trending with transparent definitions.
- Real desktop/tablet/mobile thumbnails.
- Quick preview, favorite, use template, and remix.
- Recently viewed locally.

### `/templates/[slug]`

- Live responsive preview and fullscreen device switcher.
- Desktop/tablet/mobile screenshots with reserved dimensions.
- “Use template” and “Remix” actions loading the versioned schema.
- Layout anatomy and design decisions.
- Responsive behavior and source-order explanation.
- Accessibility and performance notes.
- code preview and supported exports.
- creator, license, version, updated date, and compatibility.
- related templates, tool, example, and guide.
- changelog when the template schema/content changes.

### `/showcase`

- Moderated community layouts.
- creator profiles and project stories.
- before/after or design-to-code evidence.
- remix lineage and attribution.
- featured collections chosen editorially.
- report and moderation actions.

## Initial 20 production templates

### Dashboards

1. SaaS analytics dashboard — sidebar, KPIs, revenue chart, table, activity.
2. Developer observability dashboard — status, latency, logs, incidents, services.
3. Ecommerce operations dashboard — orders, revenue, inventory, fulfillment.
4. Marketing campaign dashboard — spend, ROAS, channels, funnel, creatives.

### Websites and landing pages

5. AI SaaS launch page — hero, product demo bento, proof, pricing, CTA.
6. Developer tool landing page — code demo, integrations, metrics, documentation CTA.
7. Agency website — services, selected work, process, testimonials, contact.
8. Mobile app website — screenshots, features, ratings, download CTA.

### Portfolios

9. Product designer portfolio — profile, case studies, process, tools, contact.
10. Frontend developer portfolio — projects, stack, GitHub activity, writing, contact.
11. Photographer portfolio — image bento, categories, feature story, booking CTA.
12. Creative studio portfolio — featured project, services, clients, awards, inquiry.

### Bento sections

13. SaaS feature bento — demo, automation, security, collaboration, integrations.
14. Product metrics bento — headline metric, trends, comparisons, narrative.
15. Team and culture bento — people, values, locations, openings, social proof.
16. Testimonial wall — featured quote, ratings, sourced customer stories.

### Product and commerce

17. Pricing and comparison — tiers, feature groups, enterprise CTA, FAQ.
18. Product gallery — media, variants, details, reviews, supporting stories.
19. Integration directory — featured integrations, categories, search, CTA.
20. Documentation homepage — search, quick starts, popular guides, SDKs, status.

Every template must contain real sample structure and believable neutral content, not repetitive “Feature 1” cards. Avoid unverified customer or usage claims.

## Template schema

- ID, slug, title, summary, full description.
- version and compatible project schema.
- creator/reviewer and license.
- use cases, industries, frameworks, complexity, styles, modes.
- required assets and fonts with licensing.
- project JSON.
- thumbnail/preview revision IDs.
- validation report.
- tested output formats.
- responsive screenshots.
- performance measurements.
- editorial status and indexation state.
- free/premium status and pack membership.
- related tool/template/example/guide IDs.

## Template production workflow

1. Define user job and distinct layout story.
2. Build in the same public BentoFlow editor.
3. Replace generic blocks with meaningful typed content.
4. Design desktop, tablet, and mobile intentionally.
5. Run long-copy, image-failure, reduced-motion, and 200%-zoom tests.
6. Resolve validation issues.
7. Compile supported exports.
8. Generate screenshots from the approved revision.
9. Write anatomy, responsive, accessibility, and performance notes.
10. Peer review and publish.

## Creator submissions

- Creator profile with verified identity/contact kept private as appropriate.
- Schema-based upload; never accept arbitrary executable code into the preview.
- license and asset-rights declaration.
- automated validation and moderation queue.
- editorial approval, rejection reason, and revision flow.
- creator attribution on every use/remix.
- report plagiarism, unsafe content, broken layout, or license issue.
- public indexing only after moderation and minimum evidence.

## Favorites, collections, and remix lineage

- Save template to personal collection.
- Open as a new project with origin metadata.
- Preserve creator attribution without controlling exported user code.
- Track aggregate remixes without exposing project content.
- Provide “similar templates” based on taxonomy and editorial relations, not only popularity.

## Marketplace

Do not launch paid submissions immediately. First prove template usage and creator quality. Later:

- premium packs with clear preview and license;
- one-time purchase or Pro inclusion;
- creator revenue share;
- refunds and takedown policy;
- verified version compatibility;
- no deceptive scarcity or inflated social proof.

## Template quality gate

- Opens and edits successfully.
- Valid current schema and migration path.
- All promised exports compile.
- Responsive screenshots match output.
- No blocking validator issues.
- Unique layout/content and clear target user.
- Creator/asset licenses recorded.
- Original documentation and at least four related routes.
- Moderation approved.

## Tests

- Filter/search URL and keyboard behavior.
- template-to-editor loading and remix attribution.
- screenshot determinism.
- broken/missing asset fallbacks.
- old template version migration.
- creator authorization and moderation transitions.
- unapproved content excluded from sitemap/search.
- purchase/entitlement tests deferred to Phase 09.

## AI-builder execution prompt

> Build BentoFlow’s real template library and moderated showcase. Implement server-rendered `/templates`, `/templates/[slug]`, and `/showcase` experiences; typed template metadata; responsive live previews; filters; favorites; collections; use/remix flow; schema compatibility; deterministic screenshots; creator attribution; license/asset declarations; submission moderation; reporting; and indexation controls. Create the twenty specified launch templates as real validation-clean BentoFlow projects with meaningful content, intentional desktop/tablet/mobile layouts, compiled exports, anatomy/responsive/accessibility/performance notes, and related routes. Never index unreviewed submissions or execute arbitrary creator code.

## Completion gate

- Twenty templates pass the full quality gate.
- Every template opens as an editable project and compiles in promised formats.
- No unmoderated community content appears in public search, sitemap, or showcase.
- Template browse-to-remix funnel is measurable.

