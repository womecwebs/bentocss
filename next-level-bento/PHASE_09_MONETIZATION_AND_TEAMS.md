# Phase 09 — Monetization, Pro, and Team Plans

## Mission

Build sustainable revenue around repeated professional value while keeping BentoFlow’s core editor and basic code export genuinely useful for free users.

## Preconditions

Do not begin paid implementation until data shows:

- users complete useful layouts;
- meaningful code copy/export volume;
- project saves and 30-day return usage;
- repeated requests for private projects, history, advanced formats, teams, or premium templates;
- at least 10 willingness-to-pay conversations.

## Packaging hypothesis

### Free

- complete core editor;
- unlimited local projects;
- limited cloud projects;
- core templates;
- HTML/CSS, Tailwind, and React export;
- public/unlisted share and remix;
- core validation.

### Pro — validate approximately $12–$19/month

- unlimited private cloud projects;
- longer version history;
- all framework exports;
- downloadable repository archive;
- SVG/PNG/PDF visual export where available;
- premium templates and packs;
- custom presets and token libraries;
- AI allowance from Phase 10;
- private/expiring/password shares where validated;
- removal of BentoFlow share attribution.

### Team — validate approximately $39–$79/month plus seats

- team workspace;
- members and roles;
- shared token libraries and approved templates;
- comments/review when Phase 11 ships;
- centralized billing;
- organization activity and audit history;
- private team assets.

Do not advertise features as available until they meet acceptance and are enabled.

## Billing architecture

- Stripe Checkout for purchase.
- Stripe Customer Portal for payment method, invoice, and cancellation management.
- Signed webhooks.
- Idempotent webhook event storage.
- Internal product/price mapping; never use display names as entitlements.
- Auditable entitlement service.
- Grace period and payment-retry behavior.
- Tax/VAT handling based on business requirements and merchant setup.
- Currency and billing-period presentation without misleading conversions.

## Entitlement model

Capabilities, not plan-name conditionals:

```text
cloud_projects.max
private_projects.enabled
version_history.days
export.frameworks
export.visual_formats
templates.premium
shares.private
team.members.max
tokens.shared
ai.monthly_credits
```

UI can explain entitlements, but servers enforce them. Cache safely and invalidate on billing events.

## Upgrade UX

Ask only after value:

- fourth or configured cloud-project limit;
- premium export selection;
- premium template use;
- private share request;
- version-history request;
- team workspace creation;
- AI allowance exhaustion.

An upgrade panel must state the blocked action, included capability, exact price/period, renewal, cancellation path, and what happens on downgrade. Never block first creation or basic export.

## Team workspace

- Owner, admin, editor, viewer roles.
- Invite, resend, revoke, accept, and domain mismatch handling.
- Projects owned by workspace, not an individual member.
- Transfer ownership rules.
- shared template and token libraries.
- member removal without project deletion.
- seat limit and proration behavior clearly explained.
- activity log for membership, visibility, tokens, templates, and billing changes.

## Downgrade and cancellation

- Never delete projects immediately.
- Keep data readable and exportable for a documented retention window.
- Stop creating resources above entitlement, not viewing existing work.
- preserve current project revision.
- explain what becomes read-only or unavailable.
- allow data export and account deletion.

## Revenue validation

Initial $1,000 MRR paths:

- 67 Pro subscribers at $15.
- 40 Pro at $15 and 8 Team at $49 ≈ $992.
- mixed subscriptions and transparent premium template packs.

Track trial/checkout conversion, activation before purchase, MRR, net revenue retention, voluntary/involuntary churn, refund rate, support burden, and entitlement failures.

## Affiliate revenue

Keep contextual, disclosed recommendations after output or in learning content. Do not present an affiliate as required for export or imitate a product control. Measure outbound click only; do not compromise project privacy.

## Security and tests

- Signed webhook verification.
- Webhook replay and out-of-order events.
- Checkout success with delayed webhook.
- renewal, failure, grace, recovery, cancel, refund, charge dispute, plan change.
- unauthorized entitlement escalation.
- team invite and role matrix.
- seat changes and concurrent administration.
- billing pages excluded from index.

## AI-builder execution prompt

> Implement BentoFlow Free, Pro, and Team monetization only after the documented demand preconditions are satisfied. Use Stripe Checkout and Customer Portal, signed idempotent webhooks, internal product mapping, a server-enforced capability entitlement service, grace periods, downgrade-safe retention, invoices, and complete billing state UI. Add owner/admin/editor/viewer workspaces, invitations, workspace-owned projects, shared tokens/templates, seat handling, and audit events. Preserve the full free core editor and basic exports. Test purchase, delayed/replayed/out-of-order webhooks, renewal, failure, recovery, refund, cancellation, downgrade, role authorization, and seat changes end to end.

## Completion gate

- Billing state and server entitlements agree under every test.
- Payment failure cannot delete or expose data.
- Team authorization passes independently of UI.
- Free-user creation and basic export metrics do not materially deteriorate.

