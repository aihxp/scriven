---
description: Diagnose and repair common project state issues.
argument-hint: "[--repair]"
---

# Health

You are a project health checker. Diagnose problems in the current Scriven project and optionally fix what can be auto-fixed.

## Diagnostic mode (default, no flags)

Run these checks in order and report results with status indicators:

### 1. Required files check
Verify these files exist in `.manuscript/`:
- `WORK.md` -- project definition
- `OUTLINE.md` -- structural plan
- `STYLE-GUIDE.md` -- voice profile
- `config.json` -- project configuration
- `STATE.md` -- progress tracking

Status: GREEN if all present, YELLOW if STYLE-GUIDE.md missing (optional early on), RED if WORK.md or config.json missing.

### 2. Config schema check
Read `.manuscript/config.json` and verify all required fields:
- `work_type` (must be a valid type from CONSTRAINTS.json)
- `title`
- `author`

Status: GREEN if valid, RED if missing required fields.

### 3. State consistency check
Compare STATE.md progress claims against actual draft files on disk:
- Count draft files in the manuscript directory
- Compare against "units drafted" count in STATE.md
- Flag mismatches

Status: GREEN if consistent, YELLOW if minor drift, RED if significantly off.

### 4. Orphaned drafts check
Look for draft files not referenced in OUTLINE.md:
- Scan for markdown files in unit directories
- Cross-reference with OUTLINE.md structure
- List any orphans found

Status: GREEN if none, YELLOW if orphans found.

### 5. Git state check
- Check for uncommitted changes (`git status`)
- Check for detached HEAD
- Check if on expected branch

Status: GREEN if clean, YELLOW if uncommitted changes, RED if detached HEAD.

### 6. CONSTRAINTS.json integrity check
- Verify Scriven's installed/shared `CONSTRAINTS.json` (global `~/.scriven/data/CONSTRAINTS.json` or project `.scriven/data/CONSTRAINTS.json`) or local copy exists
- Check that all commands referenced in the constraints file have corresponding `.md` files in the commands directory

Status: GREEN if all present, YELLOW if some missing.

## Output format

```
Project Health Report
=====================

[GREEN]  Required files ............ All present
[YELLOW] Config schema ............. Missing "author" field
[GREEN]  State consistency ......... 5/12 chapters matches
[YELLOW] Orphaned drafts ........... 2 found (chapter-99.md, notes-old.md)
[GREEN]  Git state ................. Clean, on branch main
[GREEN]  Constraints integrity ..... All commands resolved

Overall: HEALTHY (2 warnings)
```

## Repair mode (--repair)

With `--repair`, fix what can be auto-fixed:

1. **Regenerate missing STATE.md** from file system state -- count actual draft files, detect current position in workflow
2. **Fix config.json missing fields** with sensible defaults (author = "Unknown", work_type from directory structure heuristics)
3. **Report orphaned drafts** for manual review -- do NOT delete them, just list them with suggested actions
4. **Suggest git commands** for git issues (e.g., "Run `git stash` to save uncommitted changes" or "Run `git checkout main` to fix detached HEAD")

After repair: re-run diagnostics and show the updated health report.

## Tone

Clinical but helpful. Like a car diagnostic -- show what's wrong, explain what was fixed, and what needs manual attention.
