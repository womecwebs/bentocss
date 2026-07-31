# Phase 00 — Demand and Migration Baseline

## Mission

Prove what users and search engines already value, establish measurable baselines, and create a migration plan that protects BentoCSS while BentoFlow is developed.

## Why this comes first

A framework migration can erase ranking signals when URLs, content, canonicals, internal links, or functionality change together. Product development can also become expensive guesswork if it is not tied to real workflows. This phase creates the evidence needed to make safe decisions.

## Inputs

- Current BentoCSS repository and deployment.
- Search Console exports for at least 16 months where available.
- Analytics events and traffic reports.
- Backlink export from one reputable crawler.
- Current sitemaps, redirects, canonicals, robots directives, and structured data.
- User feedback, support messages, and interview notes.

## Workstream 1 — Inventory the current product

1. Crawl every local and deployed route.
2. Record status, canonical, robots directive, title, description, H1, word count, structured-data types, internal inlinks, sitemap status, and asset errors.
3. Record which controls, presets, exports, project actions, share actions, validations, and responsive modes work on every tool.
4. Capture desktop, tablet, and mobile screenshots of every ranking or high-value page.
5. Hash the current homepage and store its critical content, metadata, and interaction contract.
6. Classify every route: preserve, rebuild with parity, merge later, redirect later, or retire after evidence.

## Workstream 2 — Establish search demand

Create a query-page matrix containing clicks, impressions, CTR, average position, device, country, and date trend. Group queries by intent:

- visual bento generator;
- CSS Grid code generator;
- Tailwind bento layout;
- dashboard/landing/portfolio layouts;
- examples and templates;
- educational queries;
- brand queries.

Separate queries where the homepage already ranks from opportunities for a new specialized page. Avoid cannibalizing a strong homepage with a near-identical new route.

## Workstream 3 — User discovery

Interview at least:

- four frontend developers;
- two designers;
- two freelancers or agency developers;
- one marketer/founder;
- one learner.

Ask users to demonstrate their current workflow. Record the trigger, desired output, time spent, handoff problems, trust concerns, tools used afterward, and willingness to save or pay. Do not ask only whether they “like” a planned feature.

## Workstream 4 — Define the migration map

Create `migration/routes.csv` with:

```text
old_url,new_url,current_status,current_canonical,traffic_tier,
backlinks,current_function,new_function,parity_status,redirect_status,
launch_cohort,rollback_owner,notes
```

Rules:

- Every old URL has at most one direct destination.
- Do not redirect unrelated pages to the homepage.
- Do not migrate a route until the replacement returns 200, self-canonicalizes, contains equivalent or better functionality, and has correct internal links.
- Preserve query intent, not merely similar wording.
- Keep redirects indefinitely where practical.

## Workstream 5 — Metrics and thresholds

Baseline:

- organic clicks and impressions by route family;
- homepage query positions;
- indexed pages and crawl errors;
- editor-start, first-edit, copy, export, save, share, and repeat-use rates;
- Core Web Vitals;
- broken links and console errors.

Set cohort rollback thresholds before launch. Example: pause a migration cohort when 28-day clicks decline materially beyond normal variance, index coverage collapses, canonical selection becomes inconsistent, or product completion falls.

## Deliverables

- Current route and feature inventory.
- Search query-to-page opportunity map.
- Interview report and jobs-to-be-done ranking.
- Old-to-new route map with traffic tiers.
- Homepage preservation contract.
- Baseline dashboard and launch/rollback thresholds.
- Risk register with owners.

## Required tests

- Crawl produces no unknown URLs.
- Every sitemap URL is represented in the inventory.
- Every ranking URL has a recorded migration decision.
- Redirect map contains no chains, loops, or many-to-one intent mismatches.
- All metric definitions have data sources and owners.

## AI-builder execution prompt

> Audit the BentoCSS codebase, deployment, Search Console exports, analytics, sitemaps, redirects, canonicals, internal links, and existing generator functionality without changing production files. Produce a complete route/feature inventory, a query-page demand matrix, a homepage preservation contract, an old-to-new BentoFlow migration map, traffic-risk cohorts, measurable baselines, rollback thresholds, and a prioritized jobs-to-be-done report. Never recommend deleting or redirecting a ranking URL without a tested equivalent destination and evidence.

## Completion gate

Do not scaffold the production migration or change existing routes until the inventory, demand report, route map, and rollback thresholds are approved.

