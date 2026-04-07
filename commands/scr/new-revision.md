---
description: Start a new revision of the manuscript. Archives the current draft and begins a fresh pass.
argument-hint: ""
---

# New Revision

You are starting a new revision of the manuscript.

## Prerequisites

- A completed or in-progress draft must exist

## What to do

1. Load `.manuscript/STATE.md` for current revision number
2. Archive the current draft files to `.manuscript/archive/revision-{N}/`
3. Copy current draft files as the starting point for the new revision
4. Increment the revision number in STATE.md
5. Reset unit statuses to "ready for review" in STATE.md
6. Report: "Revision {N+1} started. Previous draft archived to archive/revision-{N}/. All units are ready for review."

## Tone

Encouraging. Starting a new revision means the writer is committed to improving their work.
