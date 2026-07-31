# Phase 07 — Accounts, Cloud Projects, and Sharing

## Mission

Turn successful anonymous use into durable value through secure accounts, reliable cloud projects, version history, and controlled sharing—without forcing signup before first value.

## User states

- Anonymous local user.
- Authenticated Free user.
- Pro user reserved for Phase 09 entitlements.
- Team member reserved for Phase 09/11.
- Public/unlisted preview visitor.

## Authentication

- Passwordless email and selected OAuth providers.
- Verified email rules and secure session handling.
- Account linking and duplicate identity protection.
- Rate limits and abuse detection.
- recovery, logout-all-sessions, account export, and deletion.
- Auth routes and account application are `noindex`.

Choose Auth.js or Clerk through an architecture decision based on ownership, cost, database needs, and deployment—not convenience alone.

## Anonymous-to-account migration

1. Keep all core creation and basic export available anonymously.
2. After signup, show the local projects that can be imported.
3. Explain what moves to the cloud.
4. Require explicit confirmation.
5. Deduplicate by stable project ID/hash.
6. Preserve local recovery until cloud confirmation succeeds.
7. Never transmit projects as an analytics event.

## Project data model

- user/workspace owner;
- title, slug/ID, schema version, current revision;
- content hash and preview metadata;
- folder, tags, favorite, archive timestamps;
- public/unlisted/private visibility;
- remix permission and origin attribution;
- created/updated/opened timestamps;
- soft deletion and retention window.

Store immutable revisions or efficient diffs with clear compaction rules. Validate every write with the shared schema.

## Cloud autosave

- optimistic local update;
- debounced background save;
- explicit saving/saved/offline/conflict/error states;
- retry with backoff;
- idempotency key;
- concurrent-tab revision comparison;
- conflict UI with local/cloud timestamps and safe duplicate option;
- offline queue with size limits;
- never block dragging on network activity.

## Project library

- grid/list view;
- search, filter, sort;
- folders/tags/favorites;
- duplicate, rename, move, archive, restore, permanent delete confirmation;
- preview thumbnail derived from a trusted renderer;
- recent and shared-with-me groups;
- empty, loading, offline, and error states.

## Version history

- named checkpoints and automatic revisions;
- creator/time/change summary;
- preview and restore-as-new-version;
- schema migration record;
- visual and structured diff later, but data model must support it;
- retention based on plan without deleting the current project.

## Sharing model

Visibility:

- private;
- unlisted read-only;
- public read-only;
- public/unlisted remixable;
- password/expiry can be later Pro options.

The share page must use a dedicated immutable revision reference, show owner/attribution, never expose edit credentials, and provide “Remix” only when allowed. Public project pages are `noindex` by default until Phase 08 moderation creates a showcase entry.

## Security

- Database row-level ownership rules.
- Server-side authorization on every project/revision/share action.
- Non-enumerable share IDs.
- rate limits on import, thumbnail, and share endpoints.
- strict JSON size/depth/item limits.
- output/content escaping.
- audit high-risk visibility and deletion changes.
- privacy export and deletion processes.

## Tests

- Cross-user and cross-workspace authorization matrix.
- Anonymous migration success/failure/retry.
- offline edits, reconnect, concurrent tabs, stale revision, and conflict resolution.
- share visibility and remix permission matrix.
- deleted/expired/revoked share behavior.
- database policy tests independent of UI.
- load test project list and autosave.

## AI-builder execution prompt

> Implement BentoFlow authentication, secure cloud projects, and sharing while preserving the complete anonymous workflow. Add passwordless/OAuth auth, explicit local-project migration, schema-validated PostgreSQL models, row-level ownership, optimistic offline-aware autosave, idempotency, conflict handling, folders/tags/favorites/archive/restore, immutable revisions, project library states, private/unlisted/public read-only and remix permissions, non-enumerable shares, account export/deletion, abuse limits, and exhaustive authorization and failure tests. Keep public user shares `noindex` unless separately moderated in Phase 08.

## Completion gate

- No authorization test permits cross-user access.
- Refresh, offline interruption, and concurrent tabs do not silently lose work.
- Anonymous users are not forced to sign up before core export.
- Visibility changes and share revocation take effect immediately.

