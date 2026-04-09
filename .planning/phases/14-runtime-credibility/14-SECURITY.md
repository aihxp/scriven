---
phase: 14
slug: runtime-credibility
status: verified
threats_open: 0
asvs_level: 1
created: 2026-04-09T09:25:40Z
---

# Phase 14 — Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| package metadata and installer output -> user expectations | Users infer Scriven's minimum Node baseline and runtime confidence from `package.json` and the installer's terminal copy. | Node baseline claims, installer-target support framing |
| runtime registry -> runtime policy docs | Runtime rows in `docs/runtime-support.md` must stay aligned with the installer registry and test-covered path shapes. | Runtime labels, install type, install path shapes, support and verification claims |
| launch and onboarding docs -> install expectations | Readers decide whether Scriven is credible based on `README.md` and `docs/getting-started.md` before reading source code. | Node prerequisite wording, installer-target framing, runtime-matrix links |
| root instruction docs -> future planning and implementation work | `AGENTS.md` and `CLAUDE.md` influence future plans and can reintroduce stale runtime claims if they drift. | Project policy wording, canonical-doc references, host-runtime parity caveats |

---

## Threat Register

| Threat ID | Category | Component | Disposition | Mitigation | Status |
|-----------|----------|-----------|-------------|------------|--------|
| T-14-01-01 | T | `package.json`, `bin/install.js`, `docs/runtime-support.md` | mitigate | Unified the supported installer floor on `>=20.0.0` / `Node 20+` in package metadata, installer guard/copy, and the canonical runtime doc. | closed |
| T-14-01-02 | R | `docs/runtime-support.md` | mitigate | Built the runtime matrix from the installer registry and documented registry-tested evidence separately from host-runtime parity. | closed |
| T-14-01-03 | I | `docs/architecture.md` | mitigate | Kept installer mechanics in architecture docs while deferring support levels and verification status to `docs/runtime-support.md`. | closed |
| T-14-02-01 | R | `README.md`, `docs/getting-started.md` | mitigate | Linked both launch/onboarding docs to `docs/runtime-support.md` and aligned them on the `Node 20+` baseline plus verification-status terminology. | closed |
| T-14-02-02 | T | `README.md`, `docs/getting-started.md` | mitigate | Replaced blanket runtime-support wording with installer-target language grounded in the canonical matrix. | closed |
| T-14-02-03 | R | `AGENTS.md`, `CLAUDE.md` | mitigate | Converted Node 20 from recommendation to policy and marked `docs/runtime-support.md` as the canonical runtime-credibility source. | closed |

*Status: open · closed*
*Disposition: mitigate (implementation required) · accept (documented risk) · transfer (third-party)*

---

## Accepted Risks Log

No accepted risks.

*Accepted risks do not resurface in future audit runs.*

---

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-04-09 | 6 | 6 | 0 | Codex `/gsd-secure-phase 14` |

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-04-09
