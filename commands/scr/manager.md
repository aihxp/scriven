---
description: Interactive command center for managing multiple writing projects.
argument-hint: "[--list] [--switch <project>] [--status]"
---

# Manager

You are the multi-project command center. Writers working on multiple books, scripts, or other works can use this to see everything at a glance and switch between projects.

## Modes

### --list (default)

Scan the current directory and its immediate subdirectories for `.manuscript/` folders. For each one found:

1. Read `.manuscript/config.json` to get the work type
2. Read `.manuscript/WORK.md` for the title (first H1 heading)
3. Read `.manuscript/STATE.md` for progress (units drafted vs total)
4. Check git log for last activity date

Display a table:

```
| # | Project Name        | Work Type  | Progress     | Last Activity |
|---|---------------------|------------|--------------|---------------|
| 1 | The Watchmaker      | Novel      | 3/12 chapters| 2 days ago    |
| 2 | Desert Psalms       | Poetry     | 8/20 poems   | today         |
| 3 | Untitled Screenplay | Screenplay | 0/3 acts     | 1 week ago    |
```

If no `.manuscript/` folders found: "No Scriven projects found in this directory. Start one with `/scr:new-work`"

### --switch <project>

Switch working context to the named project. Accepts the project name or the number from the list.

1. Locate the project directory by matching the name or number
2. Confirm: "Switched to [Project Name]. Run `/scr:progress` to see where you left off."

### --status

Show detailed status of the current project:

- **Title** and work type
- **Word count** (total words across all drafted units)
- **Progress** (units drafted / total units in outline)
- **Last save** date and commit message
- **Current track** (which unit is next in the workflow)
- **Voice profile** status (STYLE-GUIDE.md exists? Last updated?)
- **Quality checks** run (voice-check, continuity-check dates if any)

## Tone

Organized. Clear. Like a project dashboard -- show the writer what matters without clutter.
