# Phase 04 — Export and Validation Platform

## Mission

Make BentoFlow’s output credible enough for production. Generated code must be maintainable, responsive, accessible, deterministic, and portable.

## Architecture

Create independent packages:

- `exporters/core`: normalized intermediate representation and naming.
- one package/module per format.
- `validator`: project-level and output-level rules.
- `formatter`: stable formatting adapters.

Preview DOM is never an export input.

## Required exporters

1. Semantic HTML + modern CSS.
2. Tailwind CSS 4.
3. React/JSX.
4. Next.js component.
5. Vue Single File Component.
6. Astro component.
7. BentoFlow layout JSON.
8. CSS variables, Tailwind theme, JSON, and Style Dictionary token formats.

Later formats remain feature flagged: Svelte, CSS Modules, styled-components, SVG, PNG, PDF, and complete repository archives.

## Export quality rules

- Preserve semantic landmarks and source order.
- Generate maintainable stable names.
- Avoid unnecessary wrappers.
- Avoid fixed content heights by default.
- Include responsive behavior and content-safe minimums.
- Generate image dimensions, responsive patterns, and accessible attributes.
- Do not generate fake claims, inaccessible placeholder links, or invalid interactive nesting.
- Include comments only when they explain a non-obvious constraint.
- Record exporter and schema versions.

## Format-specific requirements

### HTML/CSS

- standards-valid markup;
- logical properties where helpful;
- custom properties for shared tokens;
- grid fallback only when justified;
- media or container query strategy explicitly selected.

### Tailwind

- Tailwind 4 default, documented Tailwind 3 compatibility where feasible;
- class deduplication and stable ordering;
- arbitrary values only when standard utilities cannot represent the token;
- full example and component-only modes.

### React/Next

- valid JSX attributes and mapped data for repeated structures;
- separate static content from client behavior;
- Next image/link usage only where configuration is known;
- no unnecessary `use client`.

### Vue/Astro

- compile-valid single-file output;
- idiomatic repeated content and props;
- no React-shaped artifacts.

## Validation rules

### Accessibility

- contrast combinations;
- missing accessible names and alt decisions;
- heading hierarchy and landmarks;
- visual versus DOM order;
- focusable hidden content;
- touch target and keyboard behavior hints;
- motion and reduced-motion support.

### Layout

- invalid spans and areas;
- collisions and overflow;
- fixed/minimum content risk;
- dense placement versus meaningful order;
- excessive breakpoint overrides;
- mobile density and horizontal scroll;
- nested-grid depth and cycle safety.

### Output

- HTML validation;
- CSS parse and lint;
- TypeScript/framework compilation;
- Tailwind class generation;
- internal link and asset checks.

## Validation UX

- Severity: blocking, warning, suggestion.
- Explain the affected breakpoint and card.
- Selecting a warning focuses the affected item/control.
- Offer one-click fixes only when deterministic and reversible.
- Show why a rule matters and how export changes.
- Allow documented intentional exceptions without suppressing unrelated rules.

## Export surfaces

- Code tabs with syntax highlighting.
- Copy component and copy complete example.
- Download file or project archive.
- Open in CodePen/StackBlitz where supported.
- Side-by-side preview/output and diff after settings changes.
- Export receipt with format, version, validation status, and included files.

## Testing

- Golden snapshots for every exporter and fixture.
- Parse/compile every output.
- Render exported fixtures independently from BentoFlow.
- Compare screenshots at three breakpoints.
- Run axe against representative interactive output.
- Mutation tests to ensure validators catch seeded failures.
- Determinism test across operating systems and repeated runs.

## AI-builder execution prompt

> Implement a deterministic multi-format export and validation platform that consumes only BentoFlow’s normalized Phase 02 schema. Generate production HTML/CSS, Tailwind 4, React/JSX, Next.js, Vue SFC, Astro, layout JSON, and design-token outputs. Add stable naming, formatting, compilation, independent rendering fixtures, responsive screenshot comparisons, HTML/CSS validation, framework linting, accessibility/layout/source-order/image/motion checks, focused warning UX, reversible safe fixes, copy/download/CodePen/StackBlitz surfaces, and exhaustive tests. Never scrape preview markup or allow format-specific business logic to change project state.

## Completion gate

- Every canonical fixture compiles and renders independently.
- Generated output matches the accepted responsive screenshots.
- Seeded accessibility and layout defects are detected.
- No blocking validation issue appears in launch presets.
- Copy and downloads work without console errors.

