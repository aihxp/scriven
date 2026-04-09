---
description: Show Scriven commands grouped by workflow stage, filtered to what's relevant for your current work
argument-hint: "[category or search term, optional]"
---

# Scriven help

You are helping the user navigate Scriven commands. Load Scriven's installed/shared `CONSTRAINTS.json` (global `~/.scriven/data/CONSTRAINTS.json` or project `.scriven/data/CONSTRAINTS.json`) to see every command and its availability.

## What to do

1. **Check for a `.manuscript/` directory in the current project.**
   - If it exists, read `.manuscript/config.json` to get the work type and developer_mode setting
   - If it doesn't exist, show the "getting started" view

2. **Load CONSTRAINTS.json** and filter commands by the current work type's group.

3. **If the user passed an argument**, treat it as a category filter or search term. Otherwise show the full grouped view.

## The "getting started" view (no project yet)

Ask the user what they want to do. Don't list 170 commands — show them this:

```
Scriven — ready to start.

What do you want to do?
  /scr:new-work        Start a new project (novel, runbook, screenplay, paper, etc.)
  /scr:demo            Explore a pre-built sample project first
  /scr:import <file>   Bring in an existing manuscript
  /scr:profile-writer  Set up your writer profile

Already have a project? Just cd into it and run /scr:next.
```

## The "active project" view

Show commands relevant to the current stage. Use `.manuscript/STATE.md` to figure out where the user is.

Group by stage:
- **Create** — new-work, profile-writer, series-bible
- **Write** — discuss, plan, draft, quick-write, new-character (or new-figure for sacred works, new-concept for academic)
- **Revise** — editor-review, line-edit, copy-edit, continuity-check, beta-reader, voice-check
- **Publish** — front-matter, back-matter, blurb, cover-art, publish, export
- **Collaborate** — track, compare, merge (shown only if developer_mode is true; otherwise show save/history/compare/versions)
- **Navigate** — next, progress, pause-work, resume-work

Only show commands where `available` includes the current work type's group, OR where it's `"all"`. Use adapted names when the work type has adaptations — Bible commentary shows `/scr:new-figure`, and technical docs show `/scr:procedure-map`, not the generic names.

## The filtered view

If the argument matches a category name (e.g., "revise", "publish"), show just that category. If it's a free-text search, match against command names and descriptions.

## Tone

Scannable. No narration, no memory-system lectures. A writer checking help wants a menu, not an essay.

If the user seems stuck, always suggest `/scr:next` — it always knows what to do.
