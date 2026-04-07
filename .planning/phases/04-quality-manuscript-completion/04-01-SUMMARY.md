---
phase: 04-quality-manuscript-completion
plan: 01
subsystem: quality-review-commands
tags: [line-edit, copy-edit, voice-check, quality, review]
dependency_graph:
  requires: [agents/voice-checker.md, data/CONSTRAINTS.json, STYLE-GUIDE.md]
  provides: [line-edit-command, copy-edit-command, voice-check-command]
  affects: [polish-meta-command, autopilot-quality-gates]
tech_stack:
  added: []
  patterns: [command-wraps-agent, scoped-review-with-N-parameter, report-to-manuscript-dir]
key_files:
  created:
    - commands/scr/line-edit.md
    - commands/scr/copy-edit.md
    - commands/scr/voice-check.md
  modified: []
decisions:
  - "D-01 inline annotation format (original -> suggested) implemented in line-edit.md"
  - "Copy-edit explicitly excludes STYLE-GUIDE.md to stay mechanical"
  - "Voice-check thresholds: PASS 80+, WARNING 60-79, FAIL below 60 (aligned with voice-checker agent scoring)"
metrics:
  duration: 2min
  completed: "2026-04-07"
---

# Phase 04 Plan 01: Core Quality Review Commands Summary

Three quality review commands created: line-edit for prose quality with D-01 inline annotation format across 4 categories (rhythm, word choice, redundancy, cliches), copy-edit for mechanical correctness without voice influence, and voice-check wrapping the existing voice-checker agent with STYLE-GUIDE.md requirement and sacred adaptation to register-check.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create line-edit and copy-edit commands | ebe04c6 | commands/scr/line-edit.md, commands/scr/copy-edit.md |
| 2 | Create voice-check command wrapping voice-checker agent | 216c8cd | commands/scr/voice-check.md |

## What Was Built

### line-edit.md
Line-level prose quality pass with inline annotations. Four analysis categories per D-01: rhythm (sentence length, cadence, paragraph flow), word_choice (weak verbs, imprecise nouns, register mismatches), redundancy (repeated info, unnecessary modifiers, filler phrases), cliches (dead metaphors, overused phrases, genre stock phrases). Loads STYLE-GUIDE.md to preserve the writer's voice. Output format: Original -> Suggested with Type and Rationale. Saves to `.manuscript/{scope}-LINE-EDIT-REPORT.md`.

### copy-edit.md
Mechanical correctness pass. Four check categories: grammar (subject-verb agreement, tense, dangling modifiers, pronoun reference), spelling (typos, homophones, proper nouns), punctuation (commas, dialogue, em-dashes, quotes), consistency (character names, place names, terminology, hyphenation, number style). Explicitly does NOT load STYLE-GUIDE.md. Includes consistency reference table generation. Saves to `.manuscript/{scope}-COPY-EDIT-REPORT.md`.

### voice-check.md
Voice fidelity check wrapping agents/voice-checker.md. Requires STYLE-GUIDE.md -- directs writer to `/scr:profile-writer` if missing. Supports adapted name: sacred work types use "register-check" per CONSTRAINTS.json. Spawns voice-checker agent with STYLE-GUIDE.md and scoped prose. Score 0-100 with PASS (80+) / WARNING (60-79) / FAIL (below 60). Groups issues by structural voice, lexical voice, character voice, AI-slop indicators. Saves to `.manuscript/{scope}-VOICE-CHECK-REPORT.md`.

## Deviations from Plan

None -- plan executed exactly as written.

## Decisions Made

1. **D-01 format implemented literally** -- line-edit uses Original/Suggested/Type/Rationale annotation blocks exactly as specified in the locked decision.
2. **Copy-edit voice isolation** -- copy-edit explicitly instructs "Do NOT load STYLE-GUIDE.md" with rationale, keeping it purely mechanical.
3. **Voice-check scoring aligned with agent** -- thresholds (80/60) align with the voice-checker agent's own scoring bands (90-100 pass, 75-89 warning, 60-74 fail, below 60 severe) with slight broadening for the command-level classification.

## Known Stubs

None -- all three commands are complete instruction files with no placeholder data.

## Self-Check: PASSED

- commands/scr/line-edit.md: FOUND
- commands/scr/copy-edit.md: FOUND
- commands/scr/voice-check.md: FOUND
- Commit ebe04c6 (Task 1): FOUND
- Commit 216c8cd (Task 2): FOUND
