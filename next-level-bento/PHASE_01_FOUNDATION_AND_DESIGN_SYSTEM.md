# Phase 01 — Next.js Foundation and Design System

## Mission

Create a production-grade Next.js App Router foundation and a distinctive, accessible BentoFlow design system that can support the public website, editor, account application, templates, documentation, and future teams.

## Technical baseline

- Next.js App Router with strict TypeScript.
- Workspace structure from `NEXT_LEVEL_BENTO.md`.
- React Server Components by default; client components only for interaction.
- CSS variables for tokens and CSS Modules for owned component styles.
- Optional Tailwind 4 for application composition, not as the domain model.
- Vitest, Testing Library, Playwright, axe-core, ESLint, formatting, and CI.

## Step 1 — Create the repository safely

1. Build BentoFlow in a new directory/repository; do not convert the current production folder in place.
2. Establish `apps/web`, `packages`, `tooling`, `tests`, and `docs`.
3. Pin the runtime and package manager.
4. Configure path aliases, strict TypeScript, environment validation, and reproducible scripts.
5. Add contribution, architecture-decision, security, and release documentation.

## Step 2 — Establish visual language

Define token families:

- semantic backgrounds and surfaces;
- foreground and muted text;
- brand, accent, success, warning, and danger;
- borders and focus rings;
- spacing and container widths;
- radii and shadows;
- typography scale, line heights, and font weights;
- duration, easing, and reduced-motion behavior;
- editor grid, selection, handle, and breakpoint colors.

The interface should feel precise and technical, not like a generic gradient template. Use glass effects only where contrast and performance remain strong.

## Step 3 — Build primitives

Implement and document:

- Button, IconButton, LinkButton, ButtonGroup.
- Input, Textarea, Select, Checkbox, Switch, Slider, ColorField.
- Tabs, SegmentedControl, Accordion, Tooltip, Popover.
- Dialog, Drawer, DropdownMenu, CommandPalette, Toast.
- Card, Badge, Avatar, EmptyState, Alert, Skeleton.
- Table, Pagination, FilterBar, SearchCombobox.
- Container, Stack, Cluster, Grid, SidebarShell.

All components require keyboard behavior, visible focus, disabled/loading/error states, touch targets, high-contrast support, and tests.

## Step 4 — Build application shells

### Public shell

- Sticky responsive navbar.
- Product, Tools, Templates, Learn, Showcase, Pricing navigation.
- Search command with autocomplete.
- Sign-in and primary “Open editor” action.
- Rich footer for users; exclude machine-only links from prominent navigation.

### Editor shell

- Top command bar.
- Left assets/layers rail.
- Center canvas.
- Right contextual inspector.
- Bottom status/zoom/validation bar.
- Collapsible and resizable panels.
- Focus restoration and keyboard shortcuts.

### App shell

- Projects, templates, shared, team, and settings navigation.
- Responsive mobile navigation.
- Empty/loading/error/offline states.

## Step 5 — Create the first ten page frames

Create server-rendered structural pages for `/`, `/editor`, `/tools`, `/templates`, `/examples`, `/learn`, `/showcase`, `/pricing`, `/changelog`, and `/about`. Use real layout structure and meaningful placeholder copy, but keep routes `noindex` until content acceptance is reached.

## Step 6 — Cross-cutting systems

- Metadata helpers and canonical host configuration.
- Error boundaries and not-found pages.
- Analytics adapter with typed events and consent behavior.
- Sentry adapter with project-data redaction.
- Feature flags.
- Environment configuration schema.
- Security headers and Content Security Policy plan.
- Theme and reduced-motion persistence.

## Testing

- Component tests for every interactive primitive.
- Playwright tests for navbar, mobile menu, search, theme, dialogs, and keyboard traversal.
- axe scans for all ten page frames.
- visual snapshots at mobile, tablet, desktop, high contrast, and dark/light themes.
- bundle report verifying non-editor routes do not load editor code.

## Deliverables

- Buildable Next.js workspace.
- Design token package and component library.
- Public, editor, and authenticated app shells.
- Ten route frames.
- Storybook or internal `/design-system` reference route excluded from indexing.
- CI pipeline and release checks.

## AI-builder execution prompt

> Create the BentoFlow Next.js App Router foundation in a separate workspace using strict TypeScript and server components by default. Implement the documented repository structure, accessible design tokens and primitives, public/editor/app shells, ten core page frames, theme and reduced-motion support, typed analytics and error adapters, environment validation, security headers, Vitest, Playwright, axe tests, visual checks, and CI. Do not migrate BentoCSS URLs or copy its HTML architecture. Keep client JavaScript off noninteractive public content and prove the editor bundle is route-split.

## Completion gate

- Type checking, linting, unit, browser, and accessibility tests pass.
- No duplicated header/footer or token definitions.
- All critical flows are keyboard operable.
- Public page frames render useful HTML without client JavaScript.

