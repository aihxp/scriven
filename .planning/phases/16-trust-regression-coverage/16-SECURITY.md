---
phase: 16
slug: trust-regression-coverage
status: verified
threats_open: 0
asvs_level: 1
created: 2026-04-09T14:24:00Z
---

# Phase 16 — Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| canonical docs -> automated trust gates | Launch, proof, and runtime docs must stay aligned to what automated checks enforce. | Link presence, file paths, forbidden launch phrases, runtime-matrix claims |
| filesystem and package artifact -> release expectations | The npm package must continue to include the proof bundles and export templates promised on the launch surface. | Package file list, proof bundle paths, shipped template paths |

---

## Threat Register

| Threat ID | Category | Component | Disposition | Mitigation | Status |
|-----------|----------|-----------|-------------|------------|--------|
| T-16-01-01 | T | `docs/shipped-assets.md` vs `data/export-templates/` | mitigate | `test/phase16-trust-regression.test.js` asserts the shipped-template inventory matches the filesystem and that planned-but-unshipped templates remain absent. | closed |
| T-16-01-02 | R | `README.md`, `docs/getting-started.md` | mitigate | The trust-regression suite enforces proof/runtime link presence and forbids stale absolute launch claims from returning. | closed |
| T-16-01-03 | R | `docs/proof-artifacts.md`, `docs/runtime-support.md` | mitigate | Regression tests verify canonical proof artifact paths exist and that runtime-support rows stay aligned to the installer registry. | closed |
| T-16-02-01 | T | `package.json`, package artifact | mitigate | `test/package.test.js` enforces `npm pack --dry-run` inclusion of the watchmaker proof bundle, Voice DNA bundle, and the currently shipped export templates. | closed |
| T-16-02-02 | R | `test/package.test.js` | mitigate | Package assertions reuse a single `npm pack --dry-run` fixture and check direct paths so the release gate stays stable and readable. | closed |

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
| 2026-04-09 | 5 | 5 | 0 | Codex `/gsd-secure-phase 16` |

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-04-09
