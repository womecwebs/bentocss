# Phase 03 — Flagship Visual Bento Editor MVP

## Mission

Build the central product: a fast, accessible workspace that turns visual layout decisions into a valid responsive BentoFlow project.

## Primary workflow

1. Open editor without signup.
2. Choose a real preset or blank grid.
3. Add/select content-aware cards.
4. Drag, resize, and edit content.
5. inspect desktop, tablet, and mobile.
6. resolve blocking validation warnings.
7. copy or export basic code.
8. autosave locally and return later.

Target: first useful output in under two minutes.

## Editor layout

### Top command bar

- Project name and save status.
- Undo/redo.
- Breakpoint selector and custom dimensions.
- Preview, share placeholder, and export.
- Command palette and keyboard shortcut help.

### Left rail

- Add blocks.
- Layers/source-order tree.
- Presets.
- Searchable assets.

### Canvas

- Zoom, pan, fit-to-screen, rulers, grid lines, snap toggle.
- Selection outline and resize handles.
- drag target and collision feedback.
- multi-select and group selection.
- fullscreen desktop/tablet/mobile preview.
- long-content, missing-image, localization-expansion, and 200%-zoom stress modes.

### Inspector

- Selection-specific layout fields.
- Per-breakpoint placement and visibility.
- Content fields and accessible names.
- Surface, border, radius, shadow, typography, and spacing tokens.
- Convert to nested grid.

## Core interactions

- Add, duplicate, remove, lock, hide, and restore.
- Drag to reorder source or place visually with explicit mode labels.
- Resize with handles and direct numeric span inputs.
- Keyboard movement and resize with announced results.
- Multi-select, align, distribute, group, and ungroup.
- Named areas and auto-placement.
- Safe collision resolution: move, swap, auto-place, or cancel.
- Clipboard copy/paste inside a project.
- Undo/redo for every persistent mutation.

## Responsive behavior

- Desktop, tablet, mobile, and custom breakpoints.
- Base-first inherited values visibly distinguished from overrides.
- Per-breakpoint columns, tracks, spans, order, visibility, gaps, and padding.
- Side-by-side comparison mode.
- Mobile stacking-order panel tied to source order.
- Optional container-query preview planned behind a feature flag.

## Content-aware cards

MVP blocks:

- heading/text;
- image with focal point and alt field;
- product screenshot;
- feature/icon;
- KPI/metric;
- testimonial;
- CTA;
- chart placeholder;
- code snippet;
- logo cloud;
- nested grid.

Each block has useful default content, empty/error/loading appearance where relevant, accessible requirements, and export behavior.

## Presets

Ship at least ten:

- SaaS feature bento;
- analytics dashboard;
- portfolio projects;
- services overview;
- team directory;
- media gallery;
- product comparison;
- testimonials;
- metrics overview;
- app capabilities.

Presets must include meaningful content blocks, responsive overrides, tokens, and validation-clean output.

## Local projects

- Immediate local autosave with debounce outside interaction frames.
- Recent projects list.
- name, duplicate, archive, restore, clear confirmation.
- JSON import/export using Phase 02 schema.
- local storage quota warning and recovery.
- anonymous use with no account pressure.

## Accessibility

- Roving focus or documented canvas navigation model.
- Screen-reader status announcements for selection, move, resize, add, delete, undo, and breakpoint changes.
- Keyboard-accessible resize fields even if drag handles cannot be used.
- Focus return after dialogs and deletion.
- High-contrast selection and handles.
- Reduced motion and 200% zoom.

## Performance

- Ordinary command-to-preview target under 50 ms.
- 60 fps drag target on reference hardware.
- Do not rerender all cards for an inspector-field change.
- Measure 10, 50, and 100-card fixtures.
- Load optional panels and code editor lazily.

## Testing

- Component tests for each control and block.
- E2E blank-to-export and preset-to-edit flows.
- Keyboard-only creation flow.
- touch/mobile viewport flow.
- autosave/reload, storage failure, import corruption, and undo/redo tests.
- visual regression for every preset at three breakpoints.
- manual usability protocol with at least five representative users.

## AI-builder execution prompt

> Build BentoFlow’s flagship anonymous visual editor using only the Phase 02 schema and commands for persistent changes. Implement the documented shell, content-block tray, layer/source-order tree, contextual inspector, zoom/pan/fit canvas, selection, drag, resize, multi-select, add/duplicate/remove/lock/hide, nested grids, named areas, collision choices, desktop/tablet/mobile/custom breakpoints, inherited versus overridden values, stress modes, ten real presets, local projects, JSON import/export, fullscreen preview, keyboard equivalents, announcements, performance instrumentation, and complete tests. Optimize for a first valid export within two minutes; do not add authentication or billing yet.

## Completion gate

- Five new users complete the primary workflow in under two minutes median.
- Keyboard-only users can create and modify a layout.
- Refresh does not lose the project.
- Presets pass visual, responsive, schema, and accessibility tests.
- No editor interaction produces console errors.

