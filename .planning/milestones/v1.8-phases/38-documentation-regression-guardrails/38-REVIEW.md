---
phase: 38-documentation-regression-guardrails
reviewed: 2026-04-18T03:35:31Z
depth: standard
files_reviewed: 9
files_reviewed_list:
  - /Users/hprincivil/Projects/scriven/test/command-surface-coherence.test.js
  - /Users/hprincivil/Projects/scriven/test/commands.test.js
  - /Users/hprincivil/Projects/scriven/docs/command-reference.md
  - /Users/hprincivil/Projects/scriven/docs/sacred-texts.md
  - /Users/hprincivil/Projects/scriven/docs/work-types.md
  - /Users/hprincivil/Projects/scriven/docs/voice-dna.md
  - /Users/hprincivil/Projects/scriven/docs/contributing.md
  - /Users/hprincivil/Projects/scriven/commands/scr/help.md
  - /Users/hprincivil/Projects/scriven/commands/scr/do.md
findings:
  critical: 0
  warning: 2
  info: 1
  total: 3
status: issues_found
---
# Phase 38: Code Review Report

**Reviewed:** 2026-04-18T03:35:31Z
**Depth:** standard
**Files Reviewed:** 9
**Status:** issues_found

## Summary

Reviewed the changed docs, command instructions, and regression tests against the live command tree and `data/CONSTRAINTS.json`.

The main problems are contract drift and missing guardrails: the command reference is no longer complete even though it presents itself as the canonical auto-generated surface, and several docs/help examples describe sacred/academic command adaptations that the registry currently filters out. The targeted tests still pass, which confirms the new coverage is too narrow to catch these regressions.

## Warnings

### WR-01: Command reference is stale, but the new tests do not verify completeness

**File:** `/Users/hprincivil/Projects/scriven/docs/command-reference.md:3`, `/Users/hprincivil/Projects/scriven/docs/command-reference.md:2155`, `/Users/hprincivil/Projects/scriven/test/command-surface-coherence.test.js:37-78`, `/Users/hprincivil/Projects/scriven/test/commands.test.js:27-76`
**Issue:** `docs/command-reference.md` claims Scriven has 101 commands and says the file is auto-generated from `data/CONSTRAINTS.json` and `commands/scr/`, but the live command tree currently exposes 108 command refs. The reference omits at least `/scr:build-ebook`, `/scr:build-poetry-submission`, `/scr:build-print`, `/scr:build-smashwords`, `/scr:cleanup`, `/scr:sacred-verse-numbering`, and `/scr:validate`. The new tests still pass because they only ban bad aliases and check command-file structure; they never assert that every collected command entry is documented.
**Fix:**
```js
const entries = collectCommandEntries(path.join(ROOT, 'commands', 'scr'));
const advertised = extractCommandRefsFromReference('docs/command-reference.md');

assert.deepStrictEqual(
  new Set(advertised),
  new Set(entries.map((entry) => entry.commandRef)),
  'command-reference.md must document every runnable command ref'
);
```
Also either actually generate `docs/command-reference.md` from the command registry or remove the “auto-generated” claim.

### WR-02: Sacred and academic adaptation docs advertise commands that the registry marks unavailable

**File:** `/Users/hprincivil/Projects/scriven/docs/work-types.md:53`, `/Users/hprincivil/Projects/scriven/docs/work-types.md:289-317`, `/Users/hprincivil/Projects/scriven/docs/sacred-texts.md:182-201`, `/Users/hprincivil/Projects/scriven/docs/command-reference.md:2128-2149`, `/Users/hprincivil/Projects/scriven/commands/scr/help.md:42-48`, `/Users/hprincivil/Projects/scriven/commands/scr/do.md:24-41`
**Issue:** These files repeatedly describe adaptations such as `new-character -> new-figure/new-concept`, `plot-graph -> argument-map/theological-arc`, `discussion-questions -> study-questions`, and `character-ref -> figure-ref` as surfaced help/output behavior. In `data/CONSTRAINTS.json`, those base commands do not list `sacred` or `academic` in `available`, so `help.md`’s own filtering rule would hide them. This creates dead-end guidance for sacred and academic users and gives `/scr:do` contradictory routing instructions.
**Fix:** Pick one contract and enforce it consistently:
```text
Option A: If these commands are truly supported for sacred/academic projects,
add those groups to each command's `available` list in CONSTRAINTS.json.

Option B: If they are intentionally unavailable, remove them from the
adaptation tables and from the help/router examples, or mark them as
future/alias-only behavior instead of “applied automatically”.
```
Add a regression test that fails when docs claim a group adaptation for a group that is not in the command’s effective availability.

## Info

### IN-01: Contributing guide inventory counts are already stale

**File:** `/Users/hprincivil/Projects/scriven/docs/contributing.md:12-20`
**Issue:** The file structure overview says `commands/scr/` has 101 command files, `templates/` has 9 base templates, and `templates/sacred/` has 6 sacred templates. The current tree has 108 command markdown files, 8 base templates, and 7 sacred templates. This is lower severity than the public command-reference drift, but it still misleads contributors about the repo layout they are extending.
**Fix:** Replace hard-coded counts with descriptions that do not require manual syncing, or regenerate this block from the filesystem during docs updates.

---

_Reviewed: 2026-04-18T03:35:31Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
