---
description: Save your current work. Auto-generates a descriptive save message from context.
argument-hint: "[optional message]"
---

# Save

You are saving the writer's current work. Your job is to create a git commit with a writer-friendly message, without exposing any git terminology.

## What to do

1. **Check for `.manuscript/` directory.** If missing: "No manuscript found. Start with `/scr:new-work`."

2. **Check for `.git/` directory.** If missing:
   - Read `.manuscript/config.json` for `developer_mode`.
   - If `developer_mode: false` (writer mode): silently run `git init` in the project root. No output about this.
   - If `developer_mode: true`: tell the writer "Initializing version tracking for this project." then run `git init`.

3. **Check for changes to save.** Run `git status --porcelain .manuscript/`. If nothing has changed:
   - Look at the last entry in STATE.md "Last actions" table for the timestamp.
   - Tell the writer: "Nothing new to save. Your last save was [timestamp from last action]."
   - Stop here.

4. **Read `.manuscript/STATE.md`** to determine context:
   - Current stage (discuss/plan/draft/review/submit)
   - Current unit name and number (from config.json `command_unit` and STATE.md `Current unit`)
   - Last command run (from "Last actions" table)

5. **Auto-generate the commit message** based on context:
   - If the writer provided an optional message argument: `"Saved: {writer's message}"`
   - After drafting (last command was `draft`): `"Saved after drafting {unit_name} {N}"`
   - After review (last command was `editor-review`): `"Saved after editor review of {unit_name} {N}"`
   - After revision (last command was `revise`): `"Saved after revising {unit_name} {N}"`
   - After planning (last command was `plan`): `"Saved after planning {unit_name} {N}"`
   - After discussion (last command was `discuss`): `"Saved after discussing {unit_name} {N}"`
   - Default / manual save: `"Saved work in progress on {unit_name} {N}"`

6. **Update STATE.md** "Last actions" table with a new row:
   - Timestamp: current date/time
   - Command: `save`
   - Unit: current unit from STATE.md
   - Outcome: the generated message

7. **Execute the save:**
   ```
   git add .manuscript/
   git commit -m "{generated message}"
   ```
   This commit must include the `STATE.md` update from step 6 so the worktree is clean immediately after a successful save.

8. **Tell the writer** the result (see output section below).

## Writer mode output

- **Writer mode** (`developer_mode: false`): "Saved. You can see your save history with `/scr:history`."
- **Developer mode** (`developer_mode: true`): Show full git commit output including the short hash and message: "Committed: {hash} - {message}"

## Edge cases

- **No changes to save:** "Nothing new to save. Your last save was [timestamp]."
- **Not in a Scriven project** (no `.manuscript/` directory): "No manuscript found. Start with `/scr:new-work`."
- **Git repo corrupted or in bad state:** In writer mode, say "Something went wrong saving your work. Try again, or ask for help." In developer mode, show the git error.
- **Very first save** (no previous commits): Auto-generate message as "Initial save of {work title}" using the title from `.manuscript/WORK.md` if available.

## Tone

Brief. Reassuring. The writer should feel that their work is safely stored. Don't explain what git did -- just confirm it's saved.
