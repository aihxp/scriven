---
phase: 18-technical-writing-domain-modeling
researched: 2026-04-09
status: complete
requirements:
  - TECHDOC-01
  - TECHDOC-02
  - TECHDOC-03
  - TECHDOC-04
---

# Phase 18 Research: Technical Writing Domain Modeling

## Question

What is the smallest technical-writing expansion that feels real inside Scriven's adaptive model and does not inherit fiction or academic defaults that would confuse documentation work?

## Findings

- The most stable framing is a **technical-writing family**, not one generic `technical_writing` type.
- The first four high-value work types are:
  - Technical Guide / User Guide
  - Runbook / SOP
  - API or CLI Reference
  - Design Spec / Architecture Doc
- Technical docs need explicit support for:
  - audience contract
  - system or environment context
  - procedure flow
  - references / source of truth
- The product already has the right adaptation mechanism in `CONSTRAINTS.json`; the missing piece is a `technical` group plus the right files and names.

## Risks

- Reusing creative file names like `WORLD.md` or `PLOT-GRAPH.md` without adaptation makes the experience feel fake.
- Leaving KDP/query/submission exports visible would imply a publishing posture that Phase 18 does not support.
- Keeping the docs vague would recreate the trust problem that v1.3 just fixed.

## Recommended Plan Split

1. Define the technical group and work types in `CONSTRAINTS.json`
2. Add technical template variants and onboarding/scaffolding rules
3. Update public docs/help so the new family is discoverable and accurately scoped

## RESEARCH COMPLETE
