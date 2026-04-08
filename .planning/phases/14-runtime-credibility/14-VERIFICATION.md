---
phase: 14-runtime-credibility
verified: 2026-04-08T01:58:00Z
status: passed
score: 3/3 must-haves verified
---

# Phase 14: Runtime Credibility Verification Report

**Phase Goal:** Users can tell exactly which Node.js baseline and runtime paths Scriven supports, and how confident they should be in each claim
**Verified:** 2026-04-08T01:58:00Z
**Status:** passed

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Package metadata, installer UX, and planning/docs all state the same minimum Node baseline. | ✓ VERIFIED | `package.json` now requires `>=20.0.0`, `bin/install.js` enforces `Node.js 20+`, and the same baseline appears in `docs/runtime-support.md`, `README.md`, `docs/getting-started.md`, `AGENTS.md`, `CLAUDE.md`, and planning docs. |
| 2 | The repo contains one canonical runtime matrix that names each claimed runtime, install path shape, support level, and verification status. | ✓ VERIFIED | `docs/runtime-support.md` defines the runtime compatibility matrix and the support-level / verification-status vocabulary used elsewhere. |
| 3 | A user can distinguish installer-target coverage from stronger host-runtime verification claims without reading source code. | ✓ VERIFIED | `README.md`, `docs/getting-started.md`, `AGENTS.md`, and `CLAUDE.md` all point to `docs/runtime-support.md` and use installer-target / reference-runtime language instead of blanket parity claims. |

**Score:** 3/3 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `docs/runtime-support.md` | Canonical runtime matrix and confidence vocabulary | ✓ EXISTS + SUBSTANTIVE | Defines Node baseline, evidence levels, support levels, verification status, and matrix rows for all claimed runtimes. |
| `package.json` | Node baseline aligned to runtime policy | ✓ EXISTS + SUBSTANTIVE | `engines.node` now requires `>=20.0.0`. |
| `bin/install.js` | Installer enforces and explains adopted baseline | ✓ EXISTS + SUBSTANTIVE | Early guard exits below Node 20 and installer copy distinguishes installer targets from parity proof. |
| `README.md` | Launch-facing runtime summary and matrix link | ✓ EXISTS + SUBSTANTIVE | Runtime section exposes Node 20+ baseline and points readers to the compatibility matrix. |
| `docs/getting-started.md` | Onboarding copy aligned to runtime evidence model | ✓ EXISTS + SUBSTANTIVE | Uses installer-target wording and links to the matrix without turning onboarding into a runtime deep dive. |
| `AGENTS.md` | Root instruction doc locked to the same runtime policy | ✓ EXISTS + SUBSTANTIVE | States Node 20+ as policy and references the canonical matrix. |
| `CLAUDE.md` | Mirrored root instruction doc locked to the same runtime policy | ✓ EXISTS + SUBSTANTIVE | Mirrors `AGENTS.md` runtime baseline and trust language. |

**Artifacts:** 7/7 verified

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|----|--------|---------|
| `README.md` | `docs/runtime-support.md` | runtime support link | ✓ WIRED | Launch-facing runtime section links directly to the canonical matrix. |
| `docs/getting-started.md` | `docs/runtime-support.md` | prerequisite guidance | ✓ WIRED | Users are pointed to the matrix before choosing a runtime. |
| `docs/architecture.md` | `docs/runtime-support.md` | runtime credibility section | ✓ WIRED | Architecture docs defer support-confidence details to the matrix. |
| `docs/shipped-assets.md` | `docs/runtime-support.md` | trust-critical launch file inventory | ✓ WIRED | Runtime matrix is inventoried as a trust-critical launch document. |
| `AGENTS.md` / `CLAUDE.md` | `docs/runtime-support.md` | runtime credibility note | ✓ WIRED | Future planning docs inherit the same source-of-truth policy. |

**Wiring:** 5/5 connections verified

## Requirements Coverage

| Requirement | Status | Blocking Issue |
|-------------|--------|----------------|
| `RUNTIME-01`: User sees a single, consistent minimum supported Node.js version across package metadata, installer guidance, and planning/docs | ✓ SATISFIED | - |
| `RUNTIME-02`: User can inspect a runtime compatibility matrix that states install path, support level, and verification status for each claimed runtime | ✓ SATISFIED | - |
| `RUNTIME-03`: User can distinguish verified runtime support from best-effort or generic compatibility | ✓ SATISFIED | - |

**Coverage:** 3/3 requirements satisfied

## Anti-Patterns Found

None.

## Human Verification Required

None — all phase requirements were checked through repository artifacts and automated verification commands.

## Gaps Summary

**No gaps found.** Phase goal achieved. Ready to proceed.

## Verification Metadata

**Verification approach:** Goal-backward (derived from phase goal and plan must-haves)  
**Must-haves source:** PLAN frontmatter (`14-01-PLAN.md`, `14-02-PLAN.md`)  
**Automated checks:** grep-based verification for Node baseline and matrix links, plus `npm test`  
**Human checks required:** 0  
**Total verification time:** ~6 min

---
*Verified: 2026-04-08T01:58:00Z*
*Verifier: Codex (inline verification)*
