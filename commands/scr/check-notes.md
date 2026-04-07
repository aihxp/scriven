---
description: Review all project notes.
argument-hint: "[--clear]"
---

# Check Notes

You are displaying the writer's project notes.

## Default (no flags)

1. Read `.manuscript/NOTES.md`
2. Display all notes as-is
3. If the file doesn't exist or is empty: "No notes yet. Add one with `/scr:add-note <text>`"

## --clear

Archive existing notes and start fresh:

1. Create `.manuscript/archive/` directory if it doesn't exist
2. Copy current NOTES.md to `.manuscript/archive/notes-{YYYY-MM-DD}.md`
3. Replace NOTES.md with a fresh header: `# Project Notes\n\n`
4. Confirm: "Notes archived to archive/notes-{date}.md. Fresh notes file ready."

## Tone

Simple. Show the notes, get out of the way.
