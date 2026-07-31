# BentoFlow Build Program

This folder is the executable planning system for building BentoFlow. `NEXT_LEVEL_BENTO.md` is the product constitution; the phase documents below are implementation contracts.

## How to use these documents

1. Read `NEXT_LEVEL_BENTO.md` once before starting.
2. Execute phases in order. Do not skip a completion gate because a later feature looks more exciting.
3. At the beginning of a phase, convert its workstreams into tracked issues with an owner and acceptance criteria.
4. At the end of a phase, attach test output, screenshots, performance results, migration notes, and unresolved risks to its evidence checklist.
5. Update documentation when implementation decisions change. Do not let code and specifications silently diverge.
6. Keep the existing BentoCSS production site intact until a specific migration cohort is approved.

## Phase map

| File | Outcome |
|---|---|
| [PHASE_00_DEMAND_AND_MIGRATION.md](PHASE_00_DEMAND_AND_MIGRATION.md) | Demand, traffic, route, and migration baseline |
| [PHASE_01_FOUNDATION_AND_DESIGN_SYSTEM.md](PHASE_01_FOUNDATION_AND_DESIGN_SYSTEM.md) | Production Next.js foundation and BentoFlow design system |
| [PHASE_02_LAYOUT_SCHEMA_AND_EDITOR_ENGINE.md](PHASE_02_LAYOUT_SCHEMA_AND_EDITOR_ENGINE.md) | Versioned layout domain model and command engine |
| [PHASE_03_FLAGSHIP_EDITOR_MVP.md](PHASE_03_FLAGSHIP_EDITOR_MVP.md) | Best-in-class responsive visual bento editor MVP |
| [PHASE_04_EXPORT_AND_VALIDATION.md](PHASE_04_EXPORT_AND_VALIDATION.md) | Trustworthy multi-framework output and validation |
| [PHASE_05_PUBLIC_CONTENT_PLATFORM.md](PHASE_05_PUBLIC_CONTENT_PLATFORM.md) | Scalable SEO-safe public route and content system |
| [PHASE_06_SPECIALIZED_TOOLS.md](PHASE_06_SPECIALIZED_TOOLS.md) | Fifteen genuinely different production tools |
| [PHASE_07_ACCOUNTS_PROJECTS_SHARING.md](PHASE_07_ACCOUNTS_PROJECTS_SHARING.md) | Secure accounts, cloud projects, versions, and sharing |
| [PHASE_08_TEMPLATES_AND_SHOWCASE.md](PHASE_08_TEMPLATES_AND_SHOWCASE.md) | Real template library, creator system, and showcase |
| [PHASE_09_MONETIZATION_AND_TEAMS.md](PHASE_09_MONETIZATION_AND_TEAMS.md) | Pro and Team subscriptions with reliable entitlements |
| [PHASE_10_AI_ASSISTANT.md](PHASE_10_AI_ASSISTANT.md) | Safe, schema-constrained AI layout assistance |
| [PHASE_11_COLLABORATION_API_ECOSYSTEM.md](PHASE_11_COLLABORATION_API_ECOSYSTEM.md) | Collaboration, API, CLI, GitHub, and integrations |
| [PHASE_12_SCALE_RESEARCH_DEFENSIBILITY.md](PHASE_12_SCALE_RESEARCH_DEFENSIBILITY.md) | Controlled growth to 200+ valuable pages and durable authority |

## Global rules

- Server-render all useful public content. The editor is an interactive client surface, not the source of SEO copy.
- One versioned layout schema powers the preview, persistence, validation, and every exporter.
- One typed route registry powers metadata, navigation, search, related links, structured data, and sitemaps.
- No indexable route without working functionality or original evidence.
- No paid gate before the user experiences the core creation and basic export value.
- No homepage or route migration without baseline evidence, parity testing, redirects, and rollback criteria.
- No user-generated content becomes indexable without moderation.
- No AI action mutates a project without schema validation and explicit user approval.

## Definition of done for every phase

- Scope and non-goals were respected.
- Required tests pass in CI.
- Accessibility acceptance passes.
- Security and privacy implications are documented.
- Product analytics are defined without collecting project content.
- Performance budgets are measured.
- Documentation and migration notes are current.
- All completion-gate evidence is attached.

