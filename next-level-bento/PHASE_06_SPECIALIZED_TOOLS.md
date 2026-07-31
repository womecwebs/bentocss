# Phase 06 — Fifteen Specialized Tools

## Mission

Launch a focused tool hub where each generator satisfies a different user job while sharing the BentoFlow schema, editor shell, projects, exporters, validator, templates, analytics, and responsive preview.

## Shared tool contract

Each tool must define:

- `ToolManifest` with intent, audience, controls, outputs, presets, validation, and documentation IDs;
- a tool-specific starting schema;
- distinct controls and preview behavior;
- at least ten real presets;
- desktop/tablet/mobile/fullscreen preview;
- applicable Phase 04 exporters;
- tool-specific validation and edge cases;
- local project persistence;
- direct share/remix state;
- five or more related routes;
- event instrumentation;
- unique public content and evidence.

Reject a tool when its control signature, preview, and output are materially the same as another tool.

## Tool 1 — Bento Grid Generator

Purpose: flagship free-form responsive bento creation.

Features:

- manual and intelligent auto-placement;
- nested grids, named areas, line overlays, source-order panel;
- content-aware cards and multi-selection;
- per-breakpoint spans/order/visibility;
- constraint validation and layout alternatives;
- all production exports.

Presets: SaaS features, product launch, metrics, portfolio, services, app capabilities, team, media, comparison, testimonials.

## Tool 2 — CSS Grid Generator

- explicit/implicit row and column tracks;
- `px`, `%`, `fr`, `auto`, intrinsic sizes, `minmax`, `fit-content`;
- auto-fit/auto-fill;
- named lines and areas;
- visual item placement and dense-flow warnings;
- alignment/content distribution;
- responsive and container-query output;
- learning overlay connecting controls to generated declarations.

## Tool 3 — Tailwind Bento Generator

- Tailwind 4 default and Tailwind 3 compatibility notes;
- standard and arbitrary track values;
- breakpoint and container-query variants;
- class deduplication and stable ordering;
- HTML, JSX, and complete component examples;
- token-to-theme mapping;
- warning when custom configuration is required.

## Tool 4 — Dashboard Layout Generator

- collapsible sidebar and mobile drawer;
- global header and command/search area;
- KPI cards, chart regions, tables, filters, and activity feed;
- content-density control;
- ready/loading/skeleton/empty/error/permission states;
- responsive priority and mobile navigation;
- dashboard accessibility and data-table guidance.

## Tool 5 — Landing Page Layout Generator

- page-level section ordering;
- hero, proof, features, use cases, comparison, testimonials, pricing, FAQ, and final CTA;
- audience and conversion-goal configuration;
- section visibility and alternate arrangements;
- mobile section-order review;
- complete-page HTML/React/Next/Astro export;
- performance budget hints for media-heavy sections.

## Tool 6 — Hero Section Generator

- badge, eyebrow, heading width, supporting copy;
- one/two CTAs and trust messaging;
- media position, aspect ratio, and mobile order;
- logos, rating, user count, and testimonial proof;
- split, centered, bento, product screenshot, and video variants;
- gradient, image, grid, glow, and neutral backgrounds;
- conversion and accessibility checks.

## Tool 7 — Pricing Table Generator

- two to five tiers;
- monthly/yearly toggle, currencies, localized number display;
- featured/recommended plan;
- grouped features, limits, tooltips, and unavailable states;
- enterprise/custom CTA;
- accessible comparison table and mobile alternative;
- pricing disclaimer and billing-copy validation.

## Tool 8 — Feature Section Generator

- grid, alternating, bento, tabs, metric, and documentation layouts;
- icon/screenshot/video/code content;
- feature count, emphasis, alignment, and CTA links;
- responsive media order;
- equal-height and long-copy stress tests;
- semantic section and heading export.

## Tool 9 — Navbar Generator

- wordmark/image logo;
- links, active state, dropdown and mega-menu;
- primary/secondary CTA;
- sticky/static and transparent/solid/scrolled states;
- accessible mobile menu or drawer;
- focus management, Escape behavior, outside click, and keyboard navigation;
- React state code and no-JS fallback guidance.

## Tool 10 — Footer Generator

- one to six navigation columns;
- compact/expanded/mega footer;
- newsletter form, social links, legal links, status/trust badges;
- contact/address and locale selector options;
- mobile accordion only when accessible;
- form states and privacy copy;
- user-facing information architecture checks.

## Tool 11 — Testimonial Generator

- quote, avatar, role, company, logo, rating, and source URL;
- card, grid, featured quote, wall, and carousel;
- verified/source attribution;
- static-first carousel and reduced-motion behavior;
- content-length stress tests;
- fake-claim warning in editorial mode.

## Tool 12 — Portfolio Bento Generator

- profile/about, skills, services, projects, experience, contact, and social blocks;
- project case-study metadata and media ratios;
- filterable project groups;
- developer, designer, photographer, architect, and agency presets;
- responsive project emphasis and accessible captions;
- full portfolio section/page export.

## Tool 13 — SaaS Feature Bento Generator

- product screenshots, feature copy, code/demo states, metrics, integrations, and CTA;
- featured card emphasis and product-story order;
- loading/empty/error demo variants;
- conversion goal and audience controls;
- app, developer tool, AI product, finance, and collaboration presets;
- screenshot aspect/performance guidance.

## Tool 14 — Image Bento Collage Generator

- upload/local preview with strict privacy notice;
- crop, focal point, object fit, caption, credit, and alt decision;
- grid ratios and art direction per breakpoint;
- image quality and file-size estimates;
- HTML/CSS responsive image export;
- PNG, SVG, and print export in later/premium scope;
- social, moodboard, portfolio, editorial, product, and gallery presets.

## Tool 15 — Design Token Generator

- primitive and semantic colors;
- spacing, radius, shadow, typography, and motion scales;
- light/dark/high-contrast mappings;
- contrast matrix and token dependency graph;
- import CSS variables or JSON;
- export CSS, Tailwind, JSON, Style Dictionary, and TypeScript;
- apply token set to any BentoFlow project.

## Implementation order

Wave A: Bento, CSS Grid, Tailwind, Dashboard, Hero.

Wave B: Landing, Pricing, Features, Navbar, Footer, Testimonials.

Wave C: Portfolio, SaaS Feature Bento, Image Collage, Design Tokens.

Complete a wave before starting the next. A manifest registry should enable a new tool without adding route-specific shell code.

## Tool acceptance template

- Exact title intent is fulfilled.
- At least five controls are genuinely tool-specific.
- Ten presets cover distinct real uses.
- Long content and three breakpoints pass.
- Applicable output formats compile.
- Keyboard and screen-reader core flow passes.
- Tool-specific errors are validated.
- Public page contains unique explanation, examples, evidence, and related links.
- Analytics covers start, meaningful edit, preset, validation, copy/export, save, and share.

## AI-builder execution prompt

> Build the fifteen specialized BentoFlow tools in the documented waves using shared schema, commands, editor surfaces, project storage, responsive preview, export, validation, content registry, search, and analytics. Implement each tool’s exact controls, states, presets, output rules, accessibility behavior, edge cases, and public documentation from this phase. Add manifest-driven registration and automated contract tests. Reject generic renames: no tool becomes indexable until it offers unique functionality, ten useful presets, compiled output, original evidence, and complete accessibility/product acceptance.

## Completion gate

Every tool independently passes the tool acceptance template. Metrics can distinguish usage and completion by tool and output format.

