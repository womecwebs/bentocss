# Phase 02 — Layout Schema and Editor Engine

## Mission

Create BentoFlow’s versioned source of truth. Preview, persistence, collaboration, validation, exports, templates, and AI commands must all operate on this model.

## Domain boundaries

Packages:

- `layout-schema`: types, Zod schemas, IDs, migrations, serialization.
- `editor-core`: commands, history, selection, clipboard, calculations.
- `test-fixtures`: canonical projects and malformed inputs.

These packages contain no React components and no browser DOM dependencies.

## Step 1 — Define the project schema

Model:

- project identity, title, description, schema version, timestamps;
- canvases/pages and root grid;
- custom breakpoint definitions and cascade order;
- grid tracks, explicit/implicit tracks, gaps, padding, flow, named lines/areas;
- cards with stable IDs and DOM source order;
- per-breakpoint placement, span, order, visibility, alignment, and minimum sizes;
- nested grid references;
- content blocks: text, rich text, image, screenshot, metric, feature, CTA, testimonial, chart placeholder, code, logos, media, and custom slot;
- design tokens and component recipes;
- accessibility metadata;
- asset references, not raw unlimited data URLs;
- project settings and export preferences.

## Step 2 — Define invariants

- IDs are stable and unique.
- Breakpoint keys are ordered and cannot collide.
- A card has one source-order position independent of visual placement.
- Spans are positive and bounded or explicitly marked for auto behavior.
- Nested grids cannot create cycles.
- Token references resolve or use a documented fallback.
- Imported project size, depth, and item count are limited.
- Unknown schema versions fail safely with actionable messages.

## Step 3 — Command model

Implement commands for:

- add, duplicate, remove, restore;
- select, multi-select, focus parent/child;
- move in source order;
- set placement/span per breakpoint;
- group or convert to nested grid;
- update content and accessibility fields;
- update tokens and recipes;
- change tracks/breakpoints;
- apply preset;
- batch and transaction;
- undo and redo.

Each command has validation, deterministic output, an inverse or patch record, and an analytics-safe action name.

## Step 4 — Calculations

Implement pure functions for:

- effective value at a breakpoint;
- explicit and auto-placement calculation;
- collision and overflow detection;
- named-area validity;
- DOM/visual-order comparison;
- content minimum-risk hints;
- project normalization;
- stable project hashing;
- share-state size estimation.

## Step 5 — Persistence format

- Canonical, stable JSON serialization.
- Versioned migrations with fixture coverage.
- Forward-version rejection without data corruption.
- Export manifest that records schema and exporter versions.
- Optional compact URL representation for small projects.

## Step 6 — Testing strategy

- Unit tests for every schema and command.
- Property tests for random valid spans, moves, nested structures, and undo/redo round trips.
- Golden fixtures for all content block types.
- Malicious/oversized/cyclic import fixtures.
- Migration chain tests from every supported version to current.
- Determinism test: identical input always serializes and exports identically.

## Deliverables

- Published internal package API.
- Current schema and JSON Schema artifact.
- Command and history engine.
- Migration registry.
- Fixture library.
- Architecture decision record explaining invariants.

## AI-builder execution prompt

> Implement BentoFlow’s framework-independent layout schema and editor command engine. Use Zod and strict TypeScript to model projects, custom breakpoints, responsive grids, stable source order, nested grids, typed content blocks, design tokens, accessibility metadata, and export preferences. Add deterministic commands, transaction-safe undo/redo, normalization, collision and order calculations, stable serialization, schema-version migrations, import limits, malicious fixtures, and property tests. React components, DOM reads, preview scraping, database calls, and analytics payload content do not belong in these packages.

## Completion gate

- Every fixture round-trips without data loss.
- One thousand generated command sequences undo to the initial state.
- Nested-grid cycles and oversized imports are rejected.
- Package APIs are documented and consumed by a small non-React reference test.

