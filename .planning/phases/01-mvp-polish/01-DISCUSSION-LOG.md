# Phase 1: MVP Polish - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-06
**Phase:** 01-mvp-polish
**Areas discussed:** Demo story content, Test strategy, npm publishing setup, Demo architecture

---

## Demo Story Content

### Q1: How deep should the demo story prose be?

| Option | Description | Selected |
|--------|-------------|----------|
| Full drafted scenes | 4 complete scenes (~800-1200 words each) of actual literary prose | ✓ |
| Short scenes | 4 brief scenes (~300-500 words each) | |
| Outlines only | Scene plans and character profiles only — no actual prose | |

**User's choice:** Full drafted scenes
**Notes:** None

### Q2: Should the demo STYLE-GUIDE.md be hand-crafted or realistic?

| Option | Description | Selected |
|--------|-------------|----------|
| Hand-crafted showcase | Carefully written voice profile demonstrating every dimension | ✓ |
| Realistic but typical | What a real profile-writer run would produce | |

**User's choice:** Hand-crafted showcase
**Notes:** None

### Q3: Ship genre alternatives from day one?

| Option | Description | Selected |
|--------|-------------|----------|
| Watchmaker only | Ship one polished demo — add alternatives later | ✓ |
| All 6 genres | Watchmaker + thriller + romance + sci-fi + fantasy + horror | |

**User's choice:** Watchmaker only
**Notes:** None

---

## Test Strategy

### Q4: What test framework?

| Option | Description | Selected |
|--------|-------------|----------|
| Node test runner | Built-in node:test — zero dependencies | ✓ |
| Vitest | Fast, modern — adds a dev dependency | |
| Jest | Industry standard — heavy for this project | |

**User's choice:** Node test runner
**Notes:** None

### Q5: What should the test suite validate?

| Option | Description | Selected |
|--------|-------------|----------|
| All four | CONSTRAINTS.json, command structure, installer dry-run, demo completeness | ✓ |
| Just constraints + installer | Minimal validation | |
| Constraints only | Internal consistency only | |

**User's choice:** All four
**Notes:** None

---

## npm Publishing Setup

### Q6: Scoped or unscoped package name?

| Option | Description | Selected |
|--------|-------------|----------|
| Unscoped: scriven | Clean npx scriven@latest | ✓ |
| Scoped: @scriven/scriven | Guaranteed available, longer invocation | |

**User's choice:** Unscoped: scriven
**Notes:** None

### Q7: Node.js minimum version?

| Option | Description | Selected |
|--------|-------------|----------|
| Node 18+ | Current LTS, broad compatibility | ✓ |
| Node 20+ | Latest LTS, fewer edge cases | |

**User's choice:** Node 18+
**Notes:** None

---

## Demo Architecture

### Q8: Ship in package or generate at runtime?

| Option | Description | Selected |
|--------|-------------|----------|
| Ship in package | Pre-baked files in data/demo/ — instant, consistent | ✓ |
| Generate at runtime | AI creates files on /scr:demo — variable quality | |
| Hybrid | Ship metadata, AI generates prose on demand | |

**User's choice:** Ship in package
**Notes:** None

### Q9: Where should the demo project be created?

| Option | Description | Selected |
|--------|-------------|----------|
| ./scriven-demo/ | Sibling directory — easy to find and delete | ✓ |
| Temporary directory | OS temp dir — auto-cleaned but harder to find | |
| Current directory | .manuscript/ in CWD — could conflict | |

**User's choice:** ./scriven-demo/
**Notes:** None

---

## Claude's Discretion

- Prose style for watchmaker story scenes
- Exact test assertions and error messages
- Package.json field ordering and metadata
- Demo directory internal structure

## Deferred Ideas

None — discussion stayed within phase scope.
