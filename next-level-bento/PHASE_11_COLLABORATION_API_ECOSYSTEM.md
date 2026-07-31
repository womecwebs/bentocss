# Phase 11 — Collaboration, API, CLI, and Ecosystem

## Mission

Move BentoFlow from an individual generator into a professional design-to-code workflow through deliberate collaboration, governed libraries, and versioned integrations.

## Sequence rule

Start with asynchronous review and version control. Do not jump directly to multiplayer cursors before revisions, permissions, conflicts, and approvals are reliable.

## Workstream 1 — Comments and review

- Project/revision-level review request.
- comments anchored to card ID, breakpoint, validation issue, or whole project.
- thread, reply, resolve, reopen, mention.
- permission and notification preferences.
- proposed command/change attachment.
- approval, changes requested, and canceled states.
- archived comments preserved with revisions.

Do not put private comment text in analytics or public shares.

## Workstream 2 — Shared design systems

- Workspace token libraries with semantic naming.
- Draft/published/deprecated token versions.
- approved component recipes and templates.
- project pinning to a library version.
- preview and migration diff before upgrade.
- permission to publish or deprecate.
- audit log and rollback.

## Workstream 3 — Versioned public API

Start read-focused:

- fetch public template metadata;
- fetch a user-authorized project schema;
- render or convert a project through an export job;
- list workspace token libraries for authorized clients.

Requirements:

- version prefix;
- OpenAPI specification;
- scoped tokens/OAuth where appropriate;
- rate limits and quotas;
- pagination, idempotency for writes, request IDs;
- deprecation and migration policy;
- audit logs and revocation;
- no undocumented internal endpoints presented as public API.

## Workstream 4 — CLI

Commands:

```text
bentoflow login
bentoflow pull <project>
bentoflow validate <file>
bentoflow export <file> --format react
bentoflow tokens pull
bentoflow templates list
```

CLI uses the same schema, validator, and exporters. Support noninteractive CI tokens with narrow scopes and machine-readable output.

## Workstream 5 — GitHub integration

- Install through a GitHub App with minimal repository permissions.
- select repository, branch, and destination directory.
- preview files and diff.
- open a branch/pull request; never push to default branch without explicit intent.
- record schema/exporter version in generated files or manifest.
- refresh output through a new PR.
- revoke installation and delete cached credentials.

## Workstream 6 — Figma research/import

Treat this as research before promise:

- Define supported input: selected frames with auto layout and grid hints.
- map nodes to typed BentoFlow content blocks.
- show unsupported properties.
- create an import report and require review.
- never claim pixel-perfect round trip.
- explore a plugin only after the mapping prototype proves useful.

## Workstream 7 — Real-time collaboration, later

Only after asynchronous review succeeds:

- presence and selection awareness;
- conflict-free command synchronization;
- offline/reconnect reconciliation;
- permissions on every operation;
- stable undo semantics for local versus shared commands;
- performance and disconnect recovery.

## Security

- Least-privilege integration scopes.
- encrypted tokens and rotation.
- signed callbacks and state verification.
- audit external exports.
- workspace authorization on every API resource.
- rate limits, anomaly detection, and revocation.
- dependency and supply-chain review for CLI/plugin distribution.

## Tests

- comment/review role matrix.
- token/template version migration and rollback.
- API contract and backward compatibility tests.
- CLI Windows/macOS/Linux fixtures.
- GitHub install/revoke/PR and permission denial.
- offline and conflict tests before multiplayer release.

## AI-builder execution prompt

> Extend BentoFlow with asynchronous comments and approvals, revision-anchored discussions, governed workspace token/template versions, upgrade diffs and rollback, a documented versioned scoped API, a cross-platform CLI using the shared schema/validator/exporters, and a least-privilege GitHub App that previews files and opens pull requests. Prototype Figma-to-schema mapping with explicit unsupported-property reporting. Add auditing, revocation, rate limits, authorization, compatibility tests, and privacy controls. Do not add real-time multiplayer until versioning, review, conflict, and offline acceptance gates pass.

## Completion gate

- Integrations are scoped, revocable, observable, and documented.
- API and CLI share the canonical schema and exporter versions.
- GitHub never writes beyond explicitly approved repository/branch scope.
- Review history remains connected to immutable revisions.

