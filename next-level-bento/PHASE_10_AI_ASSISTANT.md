# Phase 10 — Schema-Constrained AI Assistant

## Mission

Add AI that accelerates layout work while preserving deterministic project state, code quality, privacy, cost control, and user authority.

## Product principles

- AI proposes; the user approves.
- Every proposal is a list of Phase 02 commands.
- Commands validate before preview or apply.
- Deterministic exporters remain the only source of production code.
- Users can inspect a diff and undo the entire application.
- No project content is retained for model improvement without explicit informed consent.

## Initial capabilities

### Prompt to layout

Example: “Create a six-card AI SaaS feature bento with a wide demo card, two metrics, integrations, security, and a mobile-first order.”

The model returns structured intent and commands, not JSX. The system fills safe defaults, validates, and shows a temporary preview.

### Layout alternatives

- Generate three meaningfully different arrangements.
- Preserve content and tokens unless the user requests changes.
- Explain emphasis, reading order, and responsive trade-offs.
- Apply chosen alternative as one undoable transaction.

### Responsive repair

- Input includes validator findings and minimal schema context.
- Suggest fixes for overflow, bad stacking, source-order conflict, excessive density, and touch targets.
- Never hide content silently.

### Accessibility copy

- Suggest image alt decisions, accessible labels, concise CTA copy, and heading improvements.
- Distinguish decorative images and ask for missing context.
- Do not invent verified claims, customer identities, metrics, or citations.

### Explain this layout

- Explain selected CSS Grid behavior, inherited breakpoint values, `minmax`, auto-placement, and source-order implications.
- Link to the relevant BentoFlow guide.

## AI command protocol

Define a versioned response schema:

- request ID and supported schema version;
- summary and assumptions;
- proposed commands;
- affected IDs and breakpoints;
- warnings and unresolved questions;
- estimated scope and confidence;
- no arbitrary executable code.

Server validates response shape, command permissions, project size/depth, token references, and resulting project invariants.

## Diff and approval UX

- Side-by-side current/proposed preview.
- List added, removed, moved, resized, content, token, and breakpoint changes.
- accept all, accept safe groups, reject, or refine.
- show validator before/after.
- never auto-save the proposal as current until accepted.
- one-click undo after acceptance.

## Privacy and safety

- Send only the minimum relevant project subset.
- Redact emails, URLs with tokens, private comments, and hidden metadata.
- No secrets or uploaded original image bytes in prompts.
- Clear disclosure of external model processing.
- retention controls and deletion.
- rate limiting and abuse handling.
- prompt-injection defenses for imported text: treat project content as data, not instructions.
- server-side provider keys only.

## Cost and latency

- Free trial allowance small but useful.
- Pro monthly credits and transparent usage.
- estimate tokens before sending.
- cancel and retry UX.
- cache explanations only when privacy-safe and input-identical.
- use smaller models for classification/explanation when quality meets evaluation.
- hard cost ceilings per user/workspace/day.

## Evaluation suite

Create at least 100 scenarios across:

- blank-to-layout prompts;
- modification prompts;
- ambiguous prompts;
- responsive defects;
- accessibility defects;
- nested grids;
- malformed/malicious embedded content;
- unsupported requests;
- long projects;
- schema-version mismatch.

Score schema validity, command validity, intent match, responsive quality, accessibility regression, destructive-change rate, latency, cost, and human acceptance.

## Failure handling

- Invalid output never changes the project.
- Explain when a request is unsupported.
- preserve typed prompt for retry.
- provider outage leaves the deterministic editor fully functional.
- never claim a fix succeeded until validators rerun.

## AI-builder execution prompt

> Implement BentoFlow’s optional AI assistant as a server-mediated, versioned, schema-constrained command proposal system. Support prompt-to-layout, three layout alternatives, responsive repair, accessibility copy suggestions, and contextual layout/CSS explanation. Validate every model response and resulting project, show current/proposed previews and a human-readable command diff, require explicit approval, apply as one undoable transaction, and rerun validation. Add data minimization, redaction, prompt-injection resistance, retention controls, rate and cost limits, provider-outage behavior, analytics without project content, and a 100+ scenario evaluation suite. AI must never become the exporter or silently mutate projects.

## Completion gate

- 100% of applied proposals pass schema and permission validation.
- No proposal applies without user action.
- Evaluation meets agreed intent, accessibility-regression, latency, and cost thresholds.
- Editor and exporters continue to work when AI is disabled or unavailable.

