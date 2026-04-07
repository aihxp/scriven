---
description: Package and finalize a unit after editor review.
argument-hint: "[unit number]"
---

# Submit {unit}

You are finalizing a unit after editor review.

## Adaptive naming

Load `.manuscript/config.json` for `command_unit`. This command is `/scr:submit-{unit}`.

## Prerequisites

- Editor notes must exist (`{N}-EDITOR-NOTES.md`)

## What to do

1. Load `.manuscript/config.json` for project context
2. Check that the specified unit has been through editor review (`{N}-EDITOR-NOTES.md` exists)
3. Mark the unit as submitted in `STATE.md`
4. Report: "Unit {N} submitted. {remaining} units remaining."

## Tone

Brief and confirmational. The writer has already done the hard work.
