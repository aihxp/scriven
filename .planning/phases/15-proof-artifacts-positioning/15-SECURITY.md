---
phase: 15
slug: proof-artifacts-positioning
status: verified
threats_open: 0
asvs_level: 1
created: 2026-04-09T14:21:00Z
---

# Phase 15 — Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| demo files -> proof narrative | The watchmaker walkthrough must stay anchored to shipped demo artifacts rather than inferred or invented steps. | Demo manuscript paths, proof narrative claims |
| proof artifacts -> launch surface | `docs/proof-artifacts.md` and the package-shipped proof files define what users believe Scriven can prove. | Canonical proof links, proof-surface scope claims |
| style guide excerpt -> guided sample | The Voice DNA comparison must trace back to explicit style-guide constraints, not vague quality claims. | Fixed brief, style dimensions, guided/unguided sample relationship |
| launch and onboarding copy -> user confidence | README and getting-started wording determine whether proof is encountered as evidence-first or as hype. | Wedge framing, proof-first routing, breadth ordering |

---

## Threat Register

| Threat ID | Category | Component | Disposition | Mitigation | Status |
|-----------|----------|-----------|-------------|------------|--------|
| T-15-01-01 | T | `data/proof/watchmaker-flow/README.md` | mitigate | The watchmaker proof README anchors each stage to concrete `data/demo/.manuscript/` file paths including `WORK.md`, `OUTLINE.md`, `STYLE-GUIDE.md`, draft files, review evidence, and the next-step plan. | closed |
| T-15-01-02 | R | `docs/proof-artifacts.md` | mitigate | The proof hub stays descriptive and auditable by identifying exactly what the watchmaker flow proves and where the canonical artifact lives. | closed |
| T-15-01-03 | R | `docs/shipped-assets.md` | mitigate | The trust inventory registers the proof hub and watchmaker flow as trust-critical launch material. | closed |
| T-15-02-01 | R | `data/proof/voice-dna/*` | mitigate | The Voice DNA bundle uses one fixed brief, an explicit style-guide excerpt, and concrete unguided/guided samples so the comparison remains inspectable. | closed |
| T-15-02-02 | I | `data/proof/voice-dna/README.md` | mitigate | The README calls out sentence rhythm, metaphor system, dialogue restraint, and physical grounding directly and avoids benchmark-style claims. | closed |
| T-15-02-03 | R | `docs/voice-dna.md`, `docs/proof-artifacts.md` | mitigate | Both docs route readers to the bundled proof files instead of trying to act as the evidence themselves. | closed |
| T-15-03-01 | R | `README.md` | mitigate | The README foregrounds the voice-preservation wedge and points readers to `docs/proof-artifacts.md` early in the launch narrative. | closed |
| T-15-03-02 | T | `README.md`, `docs/getting-started.md` | mitigate | Proof-first routing appears before breadth-first framing, keeping launch and onboarding copy grounded in evidence. | closed |
| T-15-03-03 | R | `docs/proof-artifacts.md` | mitigate | The proof hub remains the canonical landing page for both the watchmaker sample flow and the Voice DNA bundle. | closed |

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
| 2026-04-09 | 9 | 9 | 0 | Codex `/gsd-secure-phase 15` |

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-04-09
