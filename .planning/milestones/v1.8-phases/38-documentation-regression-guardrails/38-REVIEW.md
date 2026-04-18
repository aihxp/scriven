---
phase: 38-documentation-regression-guardrails
reviewed: 2026-04-18T03:56:03Z
depth: standard
files_reviewed: 13
files_reviewed_list:
  - README.md
  - commands/scr/do.md
  - commands/scr/help.md
  - commands/scr/next.md
  - docs/architecture.md
  - docs/command-reference.md
  - docs/contributing.md
  - docs/sacred-texts.md
  - docs/voice-dna.md
  - docs/work-types.md
  - test/command-surface-coherence.test.js
  - test/commands.test.js
  - test/installer.test.js
findings:
  critical: 0
  warning: 3
  info: 0
  total: 3
status: issues_found
---

# Phase 38: Code Review Report

**Reviewed:** 2026-04-18T03:56:03Z
**Depth:** standard
**Files Reviewed:** 13
**Status:** issues_found

## Summary

Reviewed the listed docs, command specs, and regression tests against the live command tree and installer helpers. The focused test suite passed, but the current state is not clean: the reviewed command/docs surface still advertises or routes to unit-suffixed commands that are not installed, and the coherence test does not guard that contract.

## Warnings

### WR-01: `next` and `do` still route through non-runnable unit aliases

**Files:**
`/Users/hprincivil/Projects/scriven/commands/scr/next.md:26-33`
`/Users/hprincivil/Projects/scriven/commands/scr/next.md:47`
`/Users/hprincivil/Projects/scriven/commands/scr/do.md:21`

**Issue:** The live command tree exposes canonical commands like `/scr:discuss`, `/scr:plan`, `/scr:draft`, and `/scr:submit`, but these command specs still tell the agent to execute `/scr:discuss-work`, `/scr:discuss-{unit}`, `/scr:plan-{unit}`, `/scr:draft-{unit}`, and `/scr:submit-{unit}`. `commands/scr/next.md` even contradicts itself by warning against invented aliases after instructing the agent to use them. In practice this can send the universal router to commands that do not exist.

**Fix:**
```md
1. **No OUTLINE.md** -> `/scr:discuss`
4. **No {unit} discussed** -> `/scr:discuss [unit number]`
5. **No {unit} planned** -> `/scr:plan [unit number]`
6. **No {unit} drafted** -> `/scr:draft [unit number]`
8. **Not submitted** -> `/scr:submit [unit number]`

Use canonical runnable commands, and adapt "chapter", "act", "surah", etc. only in user-facing phrasing.
```

### WR-02: Primary docs still advertise impossible `/scr:*-{unit}` commands

**Files:**
`/Users/hprincivil/Projects/scriven/README.md:103`
`/Users/hprincivil/Projects/scriven/docs/architecture.md:22`
`/Users/hprincivil/Projects/scriven/docs/architecture.md:220`
`/Users/hprincivil/Projects/scriven/docs/architecture.md:250-256`
`/Users/hprincivil/Projects/scriven/docs/contributing.md:96-106`
`/Users/hprincivil/Projects/scriven/docs/command-reference.md:54-62`
`/Users/hprincivil/Projects/scriven/docs/command-reference.md:72-80`
`/Users/hprincivil/Projects/scriven/docs/command-reference.md:90-98`
`/Users/hprincivil/Projects/scriven/docs/command-reference.md:133-141`
`/Users/hprincivil/Projects/scriven/docs/command-reference.md:2251`

**Issue:** The reviewed docs still present `/scr:plan-parashah`, `/scr:draft-chapter`, `/scr:submit-chapter`, and similar suffixed forms as if they were runnable commands. `collectCommandEntries()` reports the actual command refs as canonical base commands, so these examples/documented usages tell users to invoke commands that are not installed.

**Fix:**
```md
**Usage:** `/scr:draft [unit number]`

**Adaptive terminology:** In a novel project, Scriven frames this as drafting a chapter; in a Quranic project, it frames this as drafting a surah.

**Example:**
/scr:draft 5
```

### WR-03: The regression guard misses the alias drift it was added to prevent

**File:** `/Users/hprincivil/Projects/scriven/test/command-surface-coherence.test.js:47-57`
**File:** `/Users/hprincivil/Projects/scriven/test/command-surface-coherence.test.js:72-83`

**Issue:** The coherence test only forbids top-level sacred refs and adapted-label aliases. It never derives invalid refs from `renames_by_unit`, so docs can still advertise `/scr:draft-chapter`, `/scr:plan-act`, or `/scr:submit-surah` and the suite stays green. That leaves the current regression unprotected.

**Fix:**
```js
const units = Array.from(new Set(
  Object.values(constraints.work_types)
    .map((workType) => workType.command_unit)
    .filter(Boolean)
));

const invalidUnitAliasRefs = commandEntries
  .filter((entry) => entry.commandRef.includes('{unit}'))
  .flatMap((entry) => units.map((unit) => entry.commandRef.replace('{unit}', unit)));

for (const ref of invalidUnitAliasRefs) {
  assert.doesNotMatch(content, new RegExp(escapedPattern(ref)));
}
```

---

_Reviewed: 2026-04-18T03:56:03Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
