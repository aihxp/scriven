---
phase: 24-frontmatter-parsing
plan: 01
subsystem: installer
tags: [parser, frontmatter, installer, regression-tests]
requires:
  - bin/install.js (pre-existing stripWrappingQuotes, collectCommandEntries)
provides:
  - readFrontmatterValue(content, key) -> string (signature preserved)
  - readFrontmatterValues(content) -> object (new, exported)
  - extractFrontmatterBlock (internal helper)
affects:
  - collectCommandEntries (now receives colon-safe, body-safe values)
  - Codex skill manifest generation
  - Claude command content generation
tech-stack:
  added: []
  patterns: [line-based-parsing, fenced-block-scoping]
key-files:
  created: []
  modified:
    - bin/install.js
    - test/install.test.js
decisions:
  - "Line-based parser scoped to fenced `---` block replaces body-reaching regex"
  - "Block scalar introducers (`|`, `>`) surfaced verbatim rather than parsed (no shipped command uses them)"
  - "First-occurrence wins for duplicate keys inside frontmatter"
metrics:
  duration: ~8min
  completed: 2026-04-16
requirements-completed: [PARSE-01, PARSE-02, PARSE-03]
---

# Phase 24 Plan 01: Frontmatter Parser Refactor Summary

Replaced the single-regex `readFrontmatterValue` with a line-based parser scoped strictly to the YAML frontmatter fence so values containing colons, array literals, and whitespace survive extraction; added 16 regression tests covering PARSE-01/02/03 and related edge cases.

## Functions Added / Modified in `bin/install.js`

| Function | Status | Purpose |
|----------|--------|---------|
| `extractFrontmatterBlock(content)` | added (internal) | Strips optional BOM, validates first line is `---`, returns lines between opening and closing fence (`---` or `...`) or `null` if malformed / missing. |
| `stripInlineComment(rawValue)` | added (internal) | Removes trailing ` #...` from unquoted values; leaves `#` intact inside quoted values. |
| `readFrontmatterValues(content)` | added, exported | Returns `{ [key]: string }` for every `key: value` pair inside the block. First occurrence wins; YAML comment lines and keyless lines skipped. |
| `readFrontmatterValue(content, key)` | rewritten, signature preserved | Delegates to `readFrontmatterValues`; returns `''` when key missing. |
| `stripWrappingQuotes` | unchanged | Still trims matching `"`/`'` pairs. |

`module.exports` now additionally surfaces `readFrontmatterValue` and `readFrontmatterValues`.

## Test Coverage in `test/install.test.js`

New `describe('readFrontmatterValue', ...)` block with **16 cases** (plan called for 10+; split for clarity):

| # | Case | Requirement |
|---|------|-------------|
| 1 | Extracts a simple value | baseline |
| 2 | Preserves colons in quoted values | PARSE-01 |
| 3 | Preserves colons in unquoted values (splits on first colon only) | PARSE-01 |
| 4 | Ignores body text that looks like a key line | PARSE-02 |
| 5 | Key that exists only in body returns `''` | PARSE-02 |
| 6 | Array-style value returned intact as string | PARSE-03 |
| 7 | Bracketed value containing colons preserved | PARSE-03 |
| 8 | Missing key returns `''` | correctness |
| 9 | File without frontmatter returns `''` | correctness |
| 10 | Empty string input returns `''` | defensive |
| 11 | Strips wrapping double quotes | backward-compat |
| 12 | Strips wrapping single quotes | backward-compat |
| 13 | Strips unquoted trailing inline comment | robustness |
| 14 | Preserves `#` inside quoted value | robustness |
| 15 | Malformed (no closing fence) returns `''` | T-24-03 |
| 16 | `readFrontmatterValues` returns full object; body does not leak | PARSE-02 + aggregator contract |

### Test Result Counts

- `node --test test/install.test.js` → **33 pass, 0 fail** (17 pre-existing + 16 new)
- `npm test` (full suite: `test/*.test.js`) → **1009 pass, 0 fail**

## Command Files Exercised During Smoke Test

`collectCommandEntries('./commands/scr')` now returns **101 entries, 0 with missing `description`**. Spot-checked samples:

- `/scr:add-note` → "Add a quick note or reminder to the project notes file."
- `/scr:add-unit` → "Add a new unit to the end of the outline."
- `/scr:art-direction` → "Generate or refine the visual style bible for illustrations and cover art."

No shipped command file under `commands/scr/` currently uses colon-containing or array-literal frontmatter values that would have hit the old regex bug, so there were no latent pre-existing manifests that change output — but the parser is now resilient against future command files that do.

## Confirmation: `package.json` Unchanged

`git diff HEAD~2 HEAD -- package.json` returns empty. Zero new npm dependencies. Node built-ins only (`String#split`, `String#indexOf`, `String#slice`, `String#trim`).

## Threat Register Outcome

| Threat ID | Disposition Implemented |
|-----------|-------------------------|
| T-24-01 (body-line tampering) | Mitigated — `extractFrontmatterBlock` hard-stops scan at closing fence (tests 4, 5) |
| T-24-02 (information disclosure via manifests) | Mitigated — values are returned verbatim strings; no interpolation / exec path added |
| T-24-03 (DoS from pathological input) | Mitigated — no regex, O(n) line scan, missing-fence returns `{}` not hang (test 15) |
| T-24-04 (silent truncation) | Mitigated — regression tests fail loudly on drift |

## Commits

| Task | Commit | Scope |
|------|--------|-------|
| 1 | `829d4f5` | `refactor(24-01): line-based frontmatter parser with readFrontmatterValues helper` |
| 2 | `64efffc` | `test(24-01): regression tests for PARSE-01/02/03 frontmatter parsing` |

## Self-Check: PASSED

- `bin/install.js` exists and exports `readFrontmatterValue`, `readFrontmatterValues`
- `test/install.test.js` contains `describe('readFrontmatterValue'` block
- Commit `829d4f5` present in `git log`
- Commit `64efffc` present in `git log`
- `package.json` byte-identical to pre-plan state
- `node --test test/install.test.js` exits 0
- `npm test` exits 0 (1009 tests pass)
