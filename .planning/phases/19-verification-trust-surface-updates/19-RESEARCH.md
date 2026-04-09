---
phase: 19-verification-trust-surface-updates
researched: 2026-04-09
status: complete
requirements:
  - QA-03
  - TRUST-04
---

# Phase 19 Research: Verification & Trust Surface Updates

## Question

What should fail automatically if the new Perplexity or technical-writing surfaces drift away from the live repo?

## Findings

- Phase 17 already extended runtime trust tests. Phase 19 should preserve that and add technical-writing checks.
- The highest-signal checks are:
  - work-type/group counts
  - technical group membership
  - file adaptations and template shipping
  - root/onboarding/instruction-doc count alignment
  - guardrails against overclaiming later-scope technical publishing features

## Recommended Plan Split

1. Add targeted tests for technical taxonomy, templates, exports, and package contents
2. Update launch/trust docs and phase-13 count checks to the new count surface

## RESEARCH COMPLETE
