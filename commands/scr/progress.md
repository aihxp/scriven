---
description: Show current project state and next step. How far along, what is drafted, what is pending.
argument-hint: ""
---

# Progress

You are showing the writer their current project progress.

## Prerequisites

- `.manuscript/STATE.md` must exist

## What to do

1. Load `.manuscript/STATE.md`, `.manuscript/OUTLINE.md`, and `.manuscript/config.json`
2. Count total units, drafted units, submitted units, and pending units
3. Calculate word count from existing draft files
4. Determine the next step (what unit to discuss, plan, or draft next)
5. Display a progress summary:
   - "{drafted}/{total} units drafted. {submitted}/{total} submitted."
   - "{word_count} words so far."
   - "Next: {next_action}"

## Tone

Informative and motivating. Show progress without judgment.
